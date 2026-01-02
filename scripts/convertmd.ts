#!/usr/bin/env bun

import { existsSync, readdirSync, renameSync } from "fs";
import { extname, join } from "path";

const directory = process.argv[2];

if (!directory) {
  console.error("Usage: bun scripts/convertmd.ts <directory>");
  process.exit(1);
}

if (!existsSync(directory)) {
  console.error(`The directory '${directory}' does not exist.`);
  process.exit(1);
}

const files = readdirSync(directory);
const mdxFiles = files.filter((file) => extname(file) === ".mdx");

if (mdxFiles.length === 0) {
  console.log("No .mdx files found in the directory.");
  process.exit(0);
}

for (const file of mdxFiles) {
  const fullPath = join(directory, file);
  const newFilePath = fullPath.replace(/\.mdx$/, ".md");

  try {
    renameSync(fullPath, newFilePath);
    console.log(`✓ Renamed ${file} → ${file.replace(/\.mdx$/, ".md")}`);
  } catch (err) {
    console.error(`Error renaming file '${file}': ${(err as Error).message}`);
  }
}
