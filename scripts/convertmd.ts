#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs";
import path from "path";

const program = new Command();

function convertMdToMdx(directory: string) {
  // Check if the directory exists
  if (!fs.existsSync(directory)) {
    console.error(`The directory '${directory}' does not exist.`);
    process.exit(1);
  }

  try {
    const files = fs.readdirSync(directory);
    const mdFiles = Array.from(files).filter(
      (file) => path.extname(file) === ".mdx",
    );

    if (mdFiles.length === 0) {
      console.log("No .md files found in the directory.");
      return;
    }

    Array.from(mdFiles).forEach((file) => {
      const fullPath = path.join(directory, file);
      const newFilePath = fullPath.replace(/\.mdx$/, ".md");

      try {
        fs.renameSync(fullPath, newFilePath);
      } catch (err) {
        console.error(
          `Error renaming file '${file}': ${(err as Error).message}`,
        );
      }
    });
  } catch (err) {
    console.error(`Error reading the directory: ${(err as Error).message}`);
  }
}

program
  .name("converttomdx")
  .description(
    "CLI tool to convert .md files to .mdx by renaming their extensions.",
  )
  .argument("<directory>", "Directory containing .md files")
  .action(convertMdToMdx);

program.parse(process.argv);
