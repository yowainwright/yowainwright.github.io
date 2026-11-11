import { defineConfig } from "vitest/config";
import vinext from "vinext";
import { sentryVitePlugin } from "@sentry/bundler-plugins/vite";

const devServerExternals = [
  "debug",
  "extend",
  "gray-matter",
  "sanitize-filename",
  "pino",
  "mermaid-isomorphic",
  "@sentry/nextjs",
  "@next/third-parties",
];

export default defineConfig(({ command }) => {
  const isTesting = Boolean(process.env.VITEST);
  if (isTesting) {
    const testTimeout = process.env.CI ? 15_000 : 5_000;
    return { test: { testTimeout } };
  }

  const { CI, SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT } = process.env;
  const uploadSourceMaps = Boolean(CI && SENTRY_AUTH_TOKEN && SENTRY_ORG && SENTRY_PROJECT);
  const sentryPlugins = uploadSourceMaps
    ? [
        sentryVitePlugin({
          org: SENTRY_ORG,
          project: SENTRY_PROJECT,
          authToken: SENTRY_AUTH_TOKEN,
          telemetry: false,
          sourcemaps: { filesToDeleteAfterUpload: ["./dist/**/*.map"] },
        }),
      ]
    : [];
  const plugins = [vinext()].concat(sentryPlugins);
  const sourcemap = uploadSourceMaps ? "hidden" : false;
  const external = command === "serve" ? devServerExternals : [];
  return { plugins, build: { sourcemap }, ssr: { external } };
});
