#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { createLogger } from "../lib/logger";
import {
  OG_WIDTH,
  OG_HEIGHT,
  buildTitleCardHtml,
  buildChartCardHtml,
  buildDefaultOgHtml,
} from "./og-templates";

const log = createLogger("og-preview");

const OUTPUT_DIR = path.join(process.cwd(), "public/og");
const PREVIEW_DIR = path.join(process.cwd(), ".og-preview");

interface PreviewOptions {
  slug?: string;
  title?: string;
  date?: string;
  open?: boolean;
}

const parseArgs = (): PreviewOptions => {
  const args = process.argv.slice(2);
  const options: PreviewOptions = { open: true };

  args.forEach((arg, i) => {
    if (arg === "--slug" && args[i + 1]) options.slug = args[i + 1];
    if (arg === "--title" && args[i + 1]) options.title = args[i + 1];
    if (arg === "--date" && args[i + 1]) options.date = args[i + 1];
    if (arg === "--no-open") options.open = false;
  });

  return options;
};

const generatePreviewHtml = (images: string[]): string => `
<!DOCTYPE html>
<html>
<head>
  <title>OG Image Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, sans-serif;
      background: #1a1a2e;
      color: #fff;
      padding: 40px;
    }
    h1 { margin-bottom: 20px; font-size: 24px; color: #94a3b8; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 30px;
    }
    .card {
      background: #16213e;
      border-radius: 12px;
      overflow: hidden;
    }
    .card img {
      width: 100%;
      height: auto;
      display: block;
    }
    .card-info {
      padding: 16px;
      font-size: 14px;
      color: #64748b;
    }
    .card-info strong { color: #94a3b8; }
    .platforms {
      margin-top: 40px;
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
    .platform {
      background: #16213e;
      border-radius: 12px;
      padding: 20px;
      width: 400px;
    }
    .platform h3 {
      font-size: 14px;
      color: #64748b;
      margin-bottom: 12px;
    }
    .platform-preview {
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
    }
    .platform-preview img {
      width: 100%;
      height: auto;
    }
    .platform-preview .meta {
      padding: 12px;
      background: #f8f9fa;
    }
    .platform-preview .site { font-size: 12px; color: #65676b; }
    .platform-preview .title { font-size: 16px; font-weight: 600; color: #1c1e21; margin: 4px 0; }
    .platform-preview .desc { font-size: 14px; color: #65676b; }
  </style>
</head>
<body>
  <h1>OG Image Preview (${OG_WIDTH}x${OG_HEIGHT})</h1>
  <div class="grid">
    ${images.map((img, i) => `
      <div class="card">
        <img src="${img}" alt="OG Image ${i + 1}" />
        <div class="card-info">
          <strong>img-${i + 1}.png</strong> &middot; ${OG_WIDTH}x${OG_HEIGHT}
        </div>
      </div>
    `).join("")}
  </div>
  <div class="platforms">
    <div class="platform">
      <h3>Facebook / LinkedIn Preview</h3>
      <div class="platform-preview">
        <img src="${images[0]}" alt="Facebook preview" />
        <div class="meta">
          <div class="site">JEFFRY.IN</div>
          <div class="title">Article Title Here</div>
          <div class="desc">Article description would appear here...</div>
        </div>
      </div>
    </div>
    <div class="platform">
      <h3>Twitter/X Preview</h3>
      <div class="platform-preview">
        <img src="${images[0]}" alt="Twitter preview" style="border-radius: 16px;" />
      </div>
    </div>
  </div>
</body>
</html>
`;

const main = async () => {
  const options = parseArgs();

  if (!fs.existsSync(PREVIEW_DIR)) {
    fs.mkdirSync(PREVIEW_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const images: string[] = [];

  if (options.slug) {
    const postDir = path.join(OUTPUT_DIR, options.slug);
    if (fs.existsSync(postDir)) {
      const files = fs.readdirSync(postDir).filter((f) => f.endsWith(".png"));
      files.forEach((file) => {
        const src = path.join(postDir, file);
        const dest = path.join(PREVIEW_DIR, `${options.slug}-${file}`);
        fs.copyFileSync(src, dest);
        images.push(`${options.slug}-${file}`);
      });
      log.info({ slug: options.slug, count: images.length }, "loaded existing images");
    } else {
      log.info({ slug: options.slug }, "no existing images, generating preview");
    }
  }

  if (images.length === 0) {
    const title = options.title || "Sample Article Title for Preview";
    const date = options.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const page = await browser.newPage();
    await page.setViewportSize({ width: OG_WIDTH, height: OG_HEIGHT });

    const html = buildTitleCardHtml(title, date);
    await page.setContent(html);
    await page.screenshot({ path: path.join(PREVIEW_DIR, "preview-title.png") });
    images.push("preview-title.png");

    const defaultHtml = buildDefaultOgHtml();
    await page.setContent(defaultHtml);
    await page.screenshot({ path: path.join(PREVIEW_DIR, "preview-default.png") });
    images.push("preview-default.png");

    await page.close();
    log.info("generated preview images");
  }

  await browser.close();

  const previewHtml = generatePreviewHtml(images);
  const previewPath = path.join(PREVIEW_DIR, "index.html");
  fs.writeFileSync(previewPath, previewHtml);

  log.info({ path: previewPath }, "preview ready");

  if (options.open) {
    const { exec } = await import("node:child_process");
    exec(`open ${previewPath}`);
  }
};

main().catch((err) => log.error({ error: String(err) }, "preview failed"));
