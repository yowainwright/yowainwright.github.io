import { from, Observable } from "rxjs";
import {
  mergeMap,
  map,
  finalize,
  catchError,
  concatMap,
  toArray,
  tap,
} from "rxjs/operators";
import { getAllPosts } from "../../lib/server/markdown";
import { PostScreenshotResult, ScreenshotResult } from "./types";
import { CONTENT_SELECTORS, DEFAULT_CONFIG } from "./constants";
import {
  validateEnvironment,
  createBrowser,
  createPage,
  navigateToPost,
  ensureOutputDir,
  logResults,
  checkServerRunning,
  startDevServer,
} from "./utils";
import { join } from "path";
import { existsSync, readdirSync, rmSync } from "fs";
import { execSync } from "child_process";

const DEV_SERVER_PORT = new URL(DEFAULT_CONFIG.devServerUrl).port;
const SERVER_STARTUP_DELAY = 3000;

function generateScreenshotsForPost(
  slug: string,
): Observable<PostScreenshotResult> {
  const outputDir = ensureOutputDir(slug, DEFAULT_CONFIG);

  if (existsSync(outputDir)) {
    const existingFiles = readdirSync(outputDir).filter((file) =>
      file.endsWith(".png"),
    );
    existingFiles.forEach((file) => {
      rmSync(join(outputDir, file));
    });
  }

  return validateEnvironment(DEFAULT_CONFIG).pipe(
    mergeMap(() => createBrowser()),
    mergeMap((browser) =>
      createPage(browser, DEFAULT_CONFIG).pipe(
        mergeMap((page) => navigateToPost(page, slug, DEFAULT_CONFIG)),
        mergeMap((page) => {
          const outputDir = ensureOutputDir(slug, DEFAULT_CONFIG);
          let screenshotCounter = 0;

          const screenshots$ = from(CONTENT_SELECTORS).pipe(
            concatMap(({ selector }) =>
              from(page.$$(selector)).pipe(
                tap((elements) =>
                  console.log(
                    `Found ${elements.length} elements for ${selector}`,
                  ),
                ),
                mergeMap((elements) =>
                  from(elements).pipe(
                    concatMap((element) => {
                      screenshotCounter++;
                      const filename = `${screenshotCounter}.png`;
                      const outputPath = join(outputDir, filename);

                      return from(
                        element.screenshot({
                          path: outputPath,
                          type: "png",
                        }),
                      ).pipe(
                        map(
                          () =>
                            ({
                              filename,
                              type: selector,
                              success: true,
                            }) as ScreenshotResult,
                        ),
                        catchError((error) =>
                          of({
                            filename: "",
                            type: selector,
                            success: false,
                            error: error.message,
                          } as ScreenshotResult),
                        ),
                      );
                    }),
                  ),
                ),
              ),
            ),
          );

          return screenshots$.pipe(
            toArray(),
            map((results: ScreenshotResult[]) => ({
              slug,
              screenshots: results,
              totalCount: results.length,
              successCount: results.filter((r) => r.success).length,
            })),
          );
        }),
        finalize(() => browser.close()),
      ),
    ),
    catchError((error) => {
      console.error(`❌ Error processing ${slug}:`, error.message);
      return from([
        {
          slug,
          screenshots: [],
          totalCount: 0,
          successCount: 0,
        },
      ]);
    }),
  );
}

function getChangedContentFiles() {
  try {
    const stagedFiles = execSync("git diff --cached --name-only", {
      encoding: "utf-8"
    }).trim();

    if (!stagedFiles) return [];

    return stagedFiles
      .split("\n")
      .filter((file) => file.startsWith("content/") && file.endsWith(".mdx"))
      .map((file) => file.replace("content/", "").replace(".mdx", ""));
  } catch {
    return [];
  }
}

function getMdxPostsNeedingScreenshots() {
  const changedSlugs = getChangedContentFiles();
  const posts = getAllPosts("content");

  return posts
    .filter((post) => {
      const postPath = join(process.cwd(), "content", `${post.slug}.mdx`);
      if (!existsSync(postPath)) return false;

      const outputDir = ensureOutputDir(post.slug, DEFAULT_CONFIG);
      const existingFiles = existsSync(outputDir)
        ? readdirSync(outputDir).filter((file) => file.endsWith(".png"))
        : [];

      const hasNoScreenshots = existingFiles.length === 0;
      const isChanged = changedSlugs.includes(post.slug);

      return hasNoScreenshots || isChanged;
    });
}

async function main(): Promise<void> {
  const mdxPosts = getMdxPostsNeedingScreenshots();

  console.log("🎯 Starting OG screenshot generation...");
  console.log(`📝 Processing ${mdxPosts.length} MDX posts`);

  if (mdxPosts.length === 0) {
    console.log("✅ No screenshots needed, all up to date!");
    return;
  }

  const port = parseInt(DEV_SERVER_PORT);
  let serverCleanup: (() => void) | null = null;

  try {
    const isServerRunning = await checkServerRunning(port);

    if (!isServerRunning) {
      console.log("📡 No dev server detected, starting one...");
      const { cleanup } = await startDevServer(port);
      serverCleanup = cleanup;

      await new Promise(resolve => setTimeout(resolve, SERVER_STARTUP_DELAY));
    } else {
      console.log("📡 Dev server already running");
    }

    await new Promise<void>((resolve, reject) => {
      from(mdxPosts).pipe(
        concatMap((post) => generateScreenshotsForPost(post.slug)),
        map(logResults),
        toArray(),
        finalize(() => console.log("✨ Screenshot generation complete!")),
      ).subscribe({
        next: () => {},
        error: reject,
        complete: resolve,
      });
    });

  } catch (error) {
    console.error("Error in screenshot generation:", error);
    throw error;
  } finally {
    if (serverCleanup) {
      console.log("🛑 Shutting down dev server...");
      serverCleanup();
    }
  }
}

if (require.main === module) {
  main()
    .then(() => {
      console.log("🎉 All done!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Generation failed:", error);
      process.exit(1);
    });
}

export { main as generateOgScreenshots };
