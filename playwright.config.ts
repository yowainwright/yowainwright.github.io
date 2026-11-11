import { defineConfig } from "playwright/test";

const siteDirectory = process.env.RUNTIME_SITE_DIR || "dist/client";
const supportedDirectories = new Set(["out", "dist/client"]);
if (!supportedDirectories.has(siteDirectory)) throw new Error("Unsupported runtime test directory");

const runningServer = process.env.RUNTIME_SITE_URL;
const baseURL = runningServer || "http://127.0.0.1:34733";
const serverURL = new URL(baseURL);
const isLocalServer = ["localhost", "127.0.0.1"].includes(serverURL.hostname);
if (!isLocalServer) throw new Error("Runtime tests require a local server");
const command = `python3 -m http.server 34733 --bind 127.0.0.1 --directory ${siteDirectory}`;
const executablePath = process.env.RUNTIME_BROWSER_PATH;
const webServer = runningServer ? undefined : { command, url: baseURL };

export default defineConfig({
  testDir: "./tests/integration",
  testMatch: "**/*.e2e.ts",
  workers: 1,
  use: {
    baseURL,
    permissions: ["clipboard-read", "clipboard-write"],
    launchOptions: { executablePath },
  },
  webServer,
});
