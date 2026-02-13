import { mkdirSync } from "fs";
import { join } from "path";
import { spawn, ChildProcess } from "child_process";
import { promisify } from "util";
import { exec } from "child_process";
import { from, Observable, of, throwError } from "rxjs";
import { map, mergeMap, catchError, tap } from "rxjs/operators";
import { chromium, Browser, Page } from "playwright";
import {
  PostScreenshotResult,
  ScreenshotResult,
  ScreenshotConfig,
} from "./types";
import { ENVIRONMENT_CHECK } from "./constants";

export function ensureOutputDir(
  slug: string,
  config: ScreenshotConfig,
): string {
  const outputDir = join(process.cwd(), config.outputDir, slug);
  mkdirSync(outputDir, { recursive: true });
  return outputDir;
}

export function validateEnvironment(
  config: ScreenshotConfig,
): Observable<boolean> {
  if (config.onlyInDevelopment && !ENVIRONMENT_CHECK.isDevelopment()) {
    return throwError(
      () => new Error("Screenshot generation is disabled in production"),
    );
  }
  return of(true);
}

export function createBrowser(): Observable<Browser> {
  return from(chromium.launch()).pipe(
    tap(() => console.log("🚀 Browser launched")),
  );
}

export function createPage(
  browser: Browser,
  config: ScreenshotConfig,
): Observable<Page> {
  return from(browser.newPage()).pipe(
    mergeMap((page) =>
      from(page.setViewportSize(config.viewport)).pipe(map(() => page)),
    ),
    tap(() => console.log("📄 Page created")),
  );
}

export function navigateToPost(
  page: Page,
  slug: string,
  config: ScreenshotConfig,
): Observable<Page> {
  const postUrl = `${config.devServerUrl}/${slug}`;
  console.log(`🌐 Navigating to: ${postUrl}`);

  return from(page.goto(postUrl, { waitUntil: "networkidle" })).pipe(
    mergeMap(() =>
      from(
        page.evaluate(() => {
          document.body.classList.add("js-is-darkmode");

          const postImages = document.querySelectorAll(".post__content img");
          postImages.forEach((img) => img.classList.add("post__image"));
        }),
      ),
    ),
    mergeMap(() => from(page.waitForTimeout(5000))),
    map(() => page),
    tap(() => console.log("✅ Page loaded")),
  );
}

export function screenshotElement(
  page: Page,
  selector: string,
  outputPath: string,
  index: number,
): Observable<ScreenshotResult> {
  return from(page.$$(selector)).pipe(
    mergeMap((elements) => {
      if (elements.length === 0 || !elements[index]) {
        return of({
          filename: "",
          type: selector,
          success: false,
          error: "Element not found",
        });
      }

      return from(
        elements[index].screenshot({
          path: outputPath,
          type: "png",
        }),
      ).pipe(
        map(() => ({
          filename: outputPath.split("/").pop() || "",
          type: selector,
          success: true,
        })),
        catchError((error) =>
          of({
            filename: "",
            type: selector,
            success: false,
            error: error.message,
          }),
        ),
      );
    }),
  );
}

export function logResults(result: PostScreenshotResult): PostScreenshotResult {
  console.log(`📊 Results for ${result.slug}:`);
  console.log(
    `   ✅ ${result.successCount}/${result.totalCount} screenshots generated`,
  );

  result.screenshots.forEach((screenshot) => {
    if (screenshot.success) {
      console.log(`   ✓ ${screenshot.filename}`);
    } else {
      console.log(`   ✗ ${screenshot.type}: ${screenshot.error}`);
    }
  });

  return result;
}

const execAsync = promisify(exec);

export async function checkServerRunning(port: number): Promise<boolean> {
  try {
    await execAsync(`curl -f http://localhost:${port} --max-time 3 --silent`);
    return true;
  } catch {
    return false;
  }
}

export function startDevServer(port: number): Promise<{ server: ChildProcess; cleanup: () => void }> {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Starting dev server on port ${port}...`);

    const server = spawn("bunx", ["next", "dev", "--port", port.toString()], {
      stdio: ["ignore", "pipe", "pipe"],
    });

    let isReady = false;
    let output = "";

    const cleanup = () => {
      if (!server.killed) {
        server.kill("SIGTERM");
        setTimeout(() => {
          if (!server.killed) {
            server.kill("SIGKILL");
          }
        }, 5000);
      }
    };

    server.stdout?.on("data", (data) => {
      output += data.toString();
      if (output.includes("Ready in") && !isReady) {
        isReady = true;
        console.log("✅ Dev server ready");
        resolve({ server, cleanup });
      }
    });

    server.stderr?.on("data", (data) => {
      console.error("Server error:", data.toString());
    });

    server.on("error", (error) => {
      reject(error);
    });

    server.on("exit", (code) => {
      if (!isReady) {
        reject(new Error(`Server exited with code ${code}`));
      }
    });

    setTimeout(() => {
      if (!isReady) {
        cleanup();
        reject(new Error("Server startup timeout"));
      }
    }, 30000);
  });
}
