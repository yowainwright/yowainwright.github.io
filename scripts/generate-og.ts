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

const getContentType = (ext: string): string => {
  const isHtml = ext === ".html";
  if (isHtml) return "text/html";

  const isCss = ext === ".css";
  if (isCss) return "text/css";

  const isJs = ext === ".js";
  if (isJs) return "application/javascript";

  return "application/octet-stream";
};

const startStaticServer = async (): Promise<Bun.Server> => {
  const server = Bun.serve({
    port: PORT,
    async fetch(req) {
      const url = new URL(req.url);
      let filePath = path.join(OUT_DIR, url.pathname);

      const pathExists = fs.existsSync(filePath);
      const isDirectory = pathExists && fs.statSync(filePath).isDirectory();
      if (isDirectory) {
        filePath = path.join(filePath, "index.html");
      }

      const hasHtmlExtension = filePath.endsWith(".html");
      const hasExtension = path.extname(filePath) !== "";
      const needsHtmlExtension = !hasHtmlExtension && !hasExtension;
      if (needsHtmlExtension) {
        filePath = filePath + ".html";
      }

      const fileExists = fs.existsSync(filePath);
      if (!fileExists) {
        return new Response("Not Found", { status: 404 });
      }

      const content = fs.readFileSync(filePath);
      const ext = path.extname(filePath);
      const contentType = getContentType(ext);

      return new Response(content, {
        headers: { "Content-Type": contentType },
      });
    },
  });

  log.info({ port: PORT }, "static server started");
  return server;
};

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const OG_GRADIENT = "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)";

const BASE_STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
`;

const getTitleFontSize = (titleLength: number): number => {
  const isVeryLong = titleLength > 60;
  if (isVeryLong) return 42;

  const isLong = titleLength > 40;
  if (isLong) return 52;

  return 64;
};

const buildTitleCardHtml = (title: string, date: string, fontSize: number): string => `
  <!DOCTYPE html>
  <html>
  <head><style>${BASE_STYLES}</style></head>
  <body>
    <div style="
      width: ${OG_WIDTH}px;
      height: ${OG_HEIGHT}px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: ${OG_GRADIENT};
      padding: 60px;
      position: relative;
    ">
      <h1 style="
        font-size: ${fontSize}px;
        font-weight: 700;
        color: #ffffff;
        text-align: center;
        line-height: 1.2;
        max-width: 1000px;
      ">${title}</h1>
      <p style="
        font-size: 24px;
        color: #94a3b8;
        margin-top: 24px;
      ">${date}</p>
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
`;

const buildDefaultOgHtml = (): string => `
  <!DOCTYPE html>
  <html>
  <head><style>${BASE_STYLES}</style></head>
  <body>
    <div style="
      width: ${OG_WIDTH}px;
      height: ${OG_HEIGHT}px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: ${OG_GRADIENT};
    ">
      <h1 style="font-size: 96px; font-weight: 700; color: #ffffff; margin: 0;">jeffry.in</h1>
      <p style="font-size: 28px; color: #94a3b8; margin-top: 20px;">Engineering notes & thoughts</p>
    </div>
  </body>
  </html>
`;

const screenshotTitleCard = async (
  browser: Browser,
  post: PostAnalysis,
  outputPath: string
): Promise<void> => {
  const page = await browser.newPage();
  await page.setViewportSize({ width: OG_WIDTH, height: OG_HEIGHT });

  const titleFontSize = getTitleFontSize(post.title.length);
  const html = buildTitleCardHtml(post.title, post.date, titleFontSize);
  await page.setContent(html);

  await page.screenshot({ path: outputPath });
  await page.close();
};

interface ScreenshotClip {
  x: number;
  y: number;
  width: number;
  height: number;
}

const calculateClip = (
  box: { x: number; y: number; width: number; height: number },
  padding: number
): ScreenshotClip => ({
  x: Math.max(0, box.x - padding),
  y: Math.max(0, box.y - padding),
  width: Math.min(1200, box.width + padding * 2),
  height: Math.min(630, box.height + padding * 2),
});

const isElementVisible = (box: { width: number; height: number } | null): boolean => {
  const hasBox = box !== null;
  if (!hasBox) return false;

  const hasMinWidth = box.width > 50;
  const hasMinHeight = box.height > 50;
  return hasMinWidth && hasMinHeight;
};

const isClipInViewport = (
  clip: ScreenshotClip,
  viewportWidth: number,
  viewportHeight: number
): boolean => {
  const fitsHorizontally = clip.x + clip.width <= viewportWidth;
  const fitsVertically = clip.y + clip.height <= viewportHeight;
  return fitsHorizontally && fitsVertically;
};

const hasExistingImages = (slug: string): boolean => {
  const postDir = path.join(OUTPUT_DIR, slug);
  const manifestPath = path.join(postDir, "manifest.json");

  const manifestExists = fs.existsSync(manifestPath);
  if (!manifestExists) return false;

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const hasImages = manifest.images && manifest.images.length > 0;
    if (!hasImages) return false;

    const primaryPath = path.join(postDir, manifest.primary);
    const primaryExists = fs.existsSync(primaryPath);
    return primaryExists;
  } catch {
    return false;
  }
};

const generateForPost = async (
  browser: Browser,
  post: PostAnalysis,
  force: boolean = false
): Promise<boolean> => {
  const alreadyGenerated = hasExistingImages(post.slug);
  const shouldSkip = alreadyGenerated && !force;
  if (shouldSkip) {
    log.debug({ slug: post.slug }, "skipped (already exists)");
    return false;
  }

  const postDir = path.join(OUTPUT_DIR, post.slug);
  const postDirExists = fs.existsSync(postDir);
  if (!postDirExists) {
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
      const isVisible = isElementVisible(box);
      if (!isVisible) return false;

      const clip = calculateClip(box, padding);
      const inViewport = isClipInViewport(clip, viewportWidth, viewportHeight);

      if (!inViewport) {
        await element.scrollIntoViewIfNeeded();
        const newBox = await element.boundingBox();
        const isStillVisible = isElementVisible(newBox);
        if (!isStillVisible) return false;

        const newClip = calculateClip(newBox, padding);
        try {
          await page.screenshot({ path: imgPath, clip: newClip });
          return true;
        } catch {
          return false;
        }
      }

      try {
        await page.screenshot({ path: imgPath, clip });
        return true;
      } catch {
        return false;
      }
    };

    const isChartStrategy = post.strategy === "chart";
    if (isChartStrategy) {
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

    const isCodeStrategy = post.strategy === "code";
    const hasNoImages = images.length === 0;
    const shouldCaptureCode = isCodeStrategy || hasNoImages;
    if (shouldCaptureCode) {
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

  const needsTitleCard = images.length === 0;
  if (needsTitleCard) {
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
  return true;
};

const generateDefaultImage = async (browser: Browser): Promise<void> => {
  const page = await browser.newPage();
  await page.setViewportSize({ width: OG_WIDTH, height: OG_HEIGHT });

  const html = buildDefaultOgHtml();
  await page.setContent(html);

  const outputPath = path.join(OUTPUT_DIR, "default.png");
  await page.screenshot({ path: outputPath });
  await page.close();
  log.info("default OG image generated");
};

const main = async () => {
  log.info("starting OG image generation");

  const outDirExists = fs.existsSync(OUT_DIR);
  if (!outDirExists) {
    log.error("out/ directory not found. Run 'next build' first.");
    process.exit(1);
  }

  const manifestExists = fs.existsSync(MANIFEST_PATH);
  if (!manifestExists) {
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

    const forceRegenerate = process.argv.includes("--force");
    let generated = 0;
    let skipped = 0;

    for (const post of manifest.posts) {
      try {
        const wasGenerated = await generateForPost(browser, post, forceRegenerate);
        if (wasGenerated) {
          generated++;
        } else {
          skipped++;
        }

        const total = generated + skipped;
        const shouldLogProgress = total % 10 === 0;
        if (shouldLogProgress) {
          log.info({ generated, skipped, total: manifest.posts.length }, "progress");
        }
      } catch (err) {
        log.error({ slug: post.slug, error: String(err) }, "failed");
      }
    }

    log.info({ generated, skipped, total: manifest.posts.length }, "OG image generation complete");
  } catch (error) {
    log.error({ error: String(error) }, "generation failed");
    process.exit(1);
  } finally {
    if (browser) await browser.close();
    if (server) server.stop();
  }
};

main();
