import { ContentSelector, ScreenshotConfig } from "./types";

export const CONTENT_SELECTORS: ContentSelector[] = [
  { selector: ".post__chart", name: "chart", type: "chart" },
  { selector: ".post__code", name: "code", type: "code" },
  { selector: ".post__table", name: "table", type: "table" },
  { selector: ".post__image", name: "image", type: "image" },
  { selector: ".mermaid-processed", name: "mermaid", type: "mermaid" },
];

export const DEFAULT_CONFIG: ScreenshotConfig = {
  viewport: { width: 1200, height: 800 },
  devServerUrl: "http://localhost:34729",
  outputDir: "public/assets/og",
  waitTime: 3000,
  onlyInDevelopment: true,
};

export const SCREENSHOT_FORMAT = "png" as const;

export const ENVIRONMENT_CHECK = {
  isDevelopment: () => process.env.NODE_ENV !== "production",
  isProduction: () => process.env.NODE_ENV === "production",
};
