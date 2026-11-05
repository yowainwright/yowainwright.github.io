import { log } from "node:console";
import { readFile } from "node:fs/promises";
import { extname } from "node:path";
import { location } from "vfile-location";
import { reviewProse } from "./utils";

async function main() {
  const args = process.argv.slice(2);
  const file = args[0];
  const extension = extname(file ?? "");
  const validFile = [".md", ".mdx"].includes(extension);
  const validArgs = args.length === 1 && validFile;
  if (!validArgs) throw new Error("Usage: pnpm run review:prose <post.md|post.mdx>");
  const source = await readFile(file, "utf8");
  const positions = location(source);
  const findings = await reviewProse(source, extension === ".mdx");
  findings.forEach(({ start, message, source: checker }) => {
    const point = positions.toPoint(start);
    if (!point) throw new Error(`${checker} returned an invalid location`);
    log(`${file}:${point.line}:${point.column} [${checker}] ${message}`);
  });
  log(`${findings.length} advisory finding(s). Review complete; no files changed.`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Prose review incomplete: ${message}\n`);
  process.exitCode = 2;
});
