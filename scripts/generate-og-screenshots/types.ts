export interface ContentSelector {
  selector: string;
  name: string;
  type: "chart" | "mermaid" | "code" | "table" | "image";
}

export interface ScreenshotResult {
  filename: string;
  type: string;
  success: boolean;
  error?: string;
}

export interface PostScreenshotResult {
  slug: string;
  screenshots: ScreenshotResult[];
  totalCount: number;
  successCount: number;
}

export interface ScreenshotConfig {
  viewport: { width: number; height: number };
  devServerUrl: string;
  outputDir: string;
  waitTime: number;
  onlyInDevelopment: boolean;
}
