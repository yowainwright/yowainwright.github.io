#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";
import { chromium, type Browser } from "playwright";
import { createLogger } from "../lib/logger";

const log = createLogger("generate-og");

const OUTPUT_DIR = path.join(process.cwd(), "public/og");
const MANIFEST_PATH = path.join(OUTPUT_DIR, "manifest.json");
const OUT_DIR = path.join(process.cwd(), "out");
const PORT = 34731;

interface PostAnalysis {
  slug: string;
  title: string;
  date: string;
  isMdx: boolean;
  charts: { name: string; component: string }[];
  codeBlocks: { language: string; lineCount: number; hasTitle: boolean }[];
  hasImages: boolean;
  strategy: "chart" | "code" | "title-card";
  primaryAsset?: string;
}

interface Manifest {
  generatedAt: string;
  posts: PostAnalysis[];
}

interface PostOgManifest {
  slug: string;
  title: string;
  images: string[];
  primary: string;
  generatedAt: string;
}

const startStaticServer = async (): Promise<Bun.Server> => {
  const server = Bun.serve({
    port: PORT,
    async fetch(req) {
      const url = new URL(req.url);
      let filePath = path.join(OUT_DIR, url.pathname);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }

      if (!filePath.endsWith(".html") && !path.extname(filePath)) {
        filePath = filePath + ".html";
      }

      if (!fs.existsSync(filePath)) {
        return new Response("Not Found", { status: 404 });
      }

      const content = fs.readFileSync(filePath);
      const ext = path.extname(filePath);
      const contentType =
        ext === ".html"
          ? "text/html"
          : ext === ".css"
            ? "text/css"
            : ext === ".js"
              ? "application/javascript"
              : "application/octet-stream";

      return new Response(content, {
        headers: { "Content-Type": contentType },
      });
    },
  });

  log.info({ port: PORT }, "static server started");
  return server;
};

const screenshotTitleCard = async (
  browser: Browser,
  post: PostAnalysis,
  outputPath: string
): Promise<void> => {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });

  const titleFontSize =
    post.title.length > 60 ? 42 : post.title.length > 40 ? 52 : 64;

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      </style>
    </head>
    <body>
      <div style="
        width: 1200px;
        height: 630px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        padding: 60px;
        position: relative;
      ">
        <h1 style="
          font-size: ${titleFontSize}px;
          font-weight: 700;
          color: #ffffff;
          text-align: center;
          line-height: 1.2;
          max-width: 1000px;
        ">${post.title}</h1>
        <p style="
          font-size: 24px;
          color: #94a3b8;
          margin-top: 24px;
        ">${post.date}</p>
        <div style="
          position: absolute;
          bottom: 20px;
          right: 30px;
          font-size: 20px;
          color: #64748b;
          font-weight: 600;
        ">jeffry.in</div>
      </div>
    </body>
    </html>
  `);

  await page.screenshot({ path: outputPath });
  await page.close();
};

const generateForPost = async (
  browser: Browser,
  post: PostAnalysis
): Promise<void> => {
  const postDir = path.join(OUTPUT_DIR, post.slug);
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }

  const images: string[] = [];
  let imageIndex = 1;

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });

  try {
    await page.goto(`http://localhost:${PORT}/${post.slug}`, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    await page.waitForTimeout(1000);

    const viewport = page.viewportSize();
    const viewportWidth = viewport?.width || 1400;
    const viewportHeight = viewport?.height || 900;

    const safeScreenshot = async (
      element: any,
      imgPath: string,
      padding: number
    ): Promise<boolean> => {
      const box = await element.boundingBox();
      if (!box) return false;

      const isVisible = box.width > 50 && box.height > 50;
      if (!isVisible) return false;

      const x = Math.max(0, box.x - padding);
      const y = Math.max(0, box.y - padding);
      const width = Math.min(1200, box.width + padding * 2);
      const height = Math.min(630, box.height + padding * 2);

      const isInViewport = x + width <= viewportWidth && y + height <= viewportHeight;
      if (!isInViewport) {
        await element.scrollIntoViewIfNeeded();
        const newBox = await element.boundingBox();
        if (!newBox) return false;

        const newX = Math.max(0, newBox.x - padding);
        const newY = Math.max(0, newBox.y - padding);
        const newWidth = Math.min(1200, newBox.width + padding * 2);
        const newHeight = Math.min(630, newBox.height + padding * 2);

        try {
          await page.screenshot({
            path: imgPath,
            clip: { x: newX, y: newY, width: newWidth, height: newHeight },
          });
          return true;
        } catch {
          return false;
        }
      }

      try {
        await page.screenshot({
          path: imgPath,
          clip: { x, y, width, height },
        });
        return true;
      } catch {
        return false;
      }
    };

    if (post.strategy === "chart") {
      const chartContainers = await page.$$(".recharts-responsive-container");
      for (let i = 0; i < chartContainers.length; i++) {
        const imgName = `img-${imageIndex}.png`;
        const imgPath = path.join(postDir, imgName);
        const captured = await safeScreenshot(chartContainers[i], imgPath, 20);
        if (captured) {
          images.push(imgName);
          imageIndex++;
          log.debug({ slug: post.slug, chart: i }, "chart captured");
        }
      }
    }

    if (post.strategy === "code" || images.length === 0) {
      const codeBlocks = await page.$$(".shiki-wrapper");
      const maxCodeBlocks = Math.min(3, codeBlocks.length);

      for (let i = 0; i < maxCodeBlocks; i++) {
        const imgName = `img-${imageIndex}.png`;
        const imgPath = path.join(postDir, imgName);
        const captured = await safeScreenshot(codeBlocks[i], imgPath, 10);
        if (captured) {
          images.push(imgName);
          imageIndex++;
          log.debug({ slug: post.slug, codeBlock: i }, "code block captured");
        }
      }
    }
  } catch (err) {
    log.warn({ slug: post.slug, error: String(err) }, "page load failed");
  } finally {
    await page.close();
  }

  if (images.length === 0) {
    const imgName = `img-${imageIndex}.png`;
    const imgPath = path.join(postDir, imgName);
    await screenshotTitleCard(browser, post, imgPath);
    images.push(imgName);
    log.debug({ slug: post.slug }, "title card generated");
  }

  const postManifest: PostOgManifest = {
    slug: post.slug,
    title: post.title,
    images,
    primary: images[0],
    generatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join(postDir, "manifest.json"),
    JSON.stringify(postManifest, null, 2)
  );

  log.debug({ slug: post.slug, images: images.length }, "OG images generated");
};

const generateDefaultImage = async (browser: Browser): Promise<void> => {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      </style>
    </head>
    <body>
      <div style="
        width: 1200px;
        height: 630px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      ">
        <h1 style="font-size: 96px; font-weight: 700; color: #ffffff; margin: 0;">jeffry.in</h1>
        <p style="font-size: 28px; color: #94a3b8; margin-top: 20px;">Engineering notes & thoughts</p>
      </div>
    </body>
    </html>
  `);

  await page.screenshot({ path: path.join(OUTPUT_DIR, "default.png") });
  await page.close();
  log.info("default OG image generated");
};

const main = async () => {
  log.info("starting OG image generation");

  if (!fs.existsSync(OUT_DIR)) {
    log.error("out/ directory not found. Run 'next build' first.");
    process.exit(1);
  }

  if (!fs.existsSync(MANIFEST_PATH)) {
    log.error("manifest not found. Run 'bun scripts/og-analyze.ts' first.");
    process.exit(1);
  }

  const manifest: Manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  log.info({ posts: manifest.posts.length }, "loaded manifest");

  let server: Bun.Server | null = null;
  let browser: Browser | null = null;

  try {
    server = await startStaticServer();
    browser = await chromium.launch({ headless: true });

    await generateDefaultImage(browser);

    let completed = 0;
    for (const post of manifest.posts) {
      try {
        await generateForPost(browser, post);
        completed++;

        if (completed % 10 === 0) {
          log.info({ completed, total: manifest.posts.length }, "progress");
        }
      } catch (err) {
        log.error({ slug: post.slug, error: String(err) }, "failed");
      }
    }

    log.info({ total: completed }, "OG image generation complete");
  } catch (error) {
    log.error({ error: String(error) }, "generation failed");
    process.exit(1);
  } finally {
    if (browser) await browser.close();
    if (server) server.stop();
  }
};

main();
