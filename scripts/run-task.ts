#!/usr/bin/env -S pnpm exec tsx

import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";

const run = (command: string, args: string[]): void => {
  execFileSync(command, args, { stdio: "inherit" });
};

const runScript = (script: string): void => {
  run("pnpm", ["run", script]);
};

const runFile = (file: string): void => {
  run("pnpm", ["exec", "tsx", file]);
};

const runBinary = (binary: string, args: string[]): void => {
  const commandArgs = ["exec", binary].concat(args);
  run("pnpm", commandArgs);
};

const build = (): void => {
  runScript("update-pricing");
  runScript("build:css");
  runScript("build:search");
  runBinary("next", ["build"]);
  runScript("build:rss");
};

const buildLocal = (): void => {
  runScript("build:css");
  runBinary("next", ["build"]);
  runScript("build:rss");
};

const buildCss = (): void => {
  runFile("scripts/generate-component-styles.ts");
  runBinary("sass", [
    "--style=compressed",
    "lib/client/styles/scss/main.scss",
    "public/assets/jeffry.in.css",
  ]);
};

const devCss = (): void => {
  runBinary("sass", [
    "--watch",
    "--style=compressed",
    "lib/client/styles/scss/main.scss:public/assets/jeffry.in.css",
  ]);
};

const update = (): void => {
  runScript("update:packages");
  runScript("update:actions");
};

const fullRebuild = (): void => {
  rmSync(".next", { force: true, recursive: true });
  rmSync("out", { force: true, recursive: true });
  build();
};

const runTask = (task: string | undefined): void => {
  if (task === "build") return build();
  if (task === "build-local") return buildLocal();
  if (task === "build-css") return buildCss();
  if (task === "dev-css") return devCss();
  if (task === "update") return update();
  if (task === "full-rebuild") return fullRebuild();
  throw new Error(`Unknown task: ${task || "missing"}`);
};

runTask(process.argv[2]);
