#!/usr/bin/env bun

import { existsSync, readdirSync, renameSync } from "fs";
import { extname, join } from "path";
import { createLogger } from "../lib/logger";

const log = createLogger("convertmd");

const directory = process.argv[2];

if (!directory) {
  log.error("usage: bun scripts/convertmd.ts <directory>");
  process.exit(1);
}

if (!existsSync(directory)) {
  log.error({ directory }, "directory does not exist");
  process.exit(1);
}

const files = readdirSync(directory);
const mdxFiles = files.filter((file) => extname(file) === ".mdx");

if (mdxFiles.length === 0) {
  log.info("no .mdx files found in the directory");
  process.exit(0);
}

for (const file of mdxFiles) {
  const fullPath = join(directory, file);
  const newFilePath = fullPath.replace(/\.mdx$/, ".md");

  try {
    renameSync(fullPath, newFilePath);
    log.info({ from: file, to: file.replace(/\.mdx$/, ".md") }, "renamed");
  } catch (err) {
    log.error({ file, error: (err as Error).message }, "rename failed");
  }
}
