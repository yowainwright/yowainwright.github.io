#!/usr/bin/env -S pnpm exec tsx

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  lstatSync,
  mkdirSync,
  readFileSync,
  readlinkSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import manifest from "../lib/agents/sources.json";
import { createLogger } from "../lib/server/logger";

type Source = (typeof manifest.sources)[number];
type Skill = Source["skills"][number];
type FileEntry = Skill["files"][number];
type Download = typeof fetch;
type PlannedFile = { path: string; url: string; entry: FileEntry };
type SkillLink = { path: string; target: string };

const log = createLogger("install-skills");
const MAX_BYTES = 64 * 1024;
const REPOSITORIES = new Set([
  "walterwritesai/no-slop-ai-humanizer-rewriter",
  "walterwritesai/walter-skills",
]);

const digest = (bytes: Uint8Array) => createHash("sha256").update(bytes).digest("hex");
const stat = (path: string) => lstatSync(path, { throwIfNoEntry: false });

const checkDirectory = (path: string) => {
  const entry = stat(path);
  if (!entry) return;
  assert(entry.isDirectory(), `Expected a directory, not a symlink or file: ${path}`);
};

const directories = (root: string, path: string): string[] => {
  const parent = dirname(path);
  if (parent === ".") return [root];
  return directories(root, parent).concat(join(root, parent));
};

const checkParents = (root: string, path: string) => {
  directories(root, path).forEach(checkDirectory);
};

const makeParents = (root: string, path: string) => {
  directories(root, path).forEach((directory) => {
    checkDirectory(directory);
    if (!stat(directory)) mkdirSync(directory);
  });
};

const checkFile = (root: string, file: PlannedFile) => {
  checkParents(root, file.path);
  const path = join(root, file.path);
  const entry = stat(path);
  if (!entry) return false;
  assert(entry.isFile(), `Refusing to replace a symlink or directory: ${path}`);
  assert.equal(digest(readFileSync(path)), file.entry.sha256, `Local file differs: ${path}`);
  return true;
};

const checkLink = (root: string, link: SkillLink) => {
  checkParents(root, link.path);
  const path = join(root, link.path);
  const entry = stat(path);
  if (!entry) return;
  assert(entry.isSymbolicLink(), `Refusing to replace an existing skill: ${path}`);
  assert.equal(readlinkSync(path), link.target, `Existing skill link differs: ${path}`);
};

const validateFile = (entry: FileEntry) => {
  assert(/^[a-f0-9]{64}$/.test(entry.sha256), "Expected a SHA-256 checksum");
  assert(Number.isInteger(entry.bytes), "Expected a file size in bytes");
  assert(entry.bytes > 0 && entry.bytes <= MAX_BYTES, "File exceeds the size limit");
  assert(/^(SKILL\.md|LICENSE|references\/[a-z-]+\.md)$/.test(entry.target), "Unexpected target");
  const parts = entry.source.split("/");
  const safeSource = parts.every((part) => /^[a-zA-Z0-9_-][a-zA-Z0-9_.-]*$/.test(part));
  assert(safeSource, "Unsafe source path");
};

const planSkill = (source: Source, skill: Skill): PlannedFile[] => {
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill.name), "Unsafe skill name");
  assert(skill.name.length <= 64, "Skill name is too long");
  const targets = skill.files.map((entry) => entry.target);
  assert(targets.includes("SKILL.md"), "Missing SKILL.md");
  assert(targets.includes("LICENSE"), "Missing license");
  return skill.files.map((entry) => {
    validateFile(entry);
    const path = `.agents/skills/${skill.name}/${entry.target}`;
    const url = `https://raw.githubusercontent.com/${source.repository}/${source.revision}/${entry.source}`;
    return { path, url, entry };
  });
};

const sourceFiles = (source: Source): PlannedFile[] => {
  assert(REPOSITORIES.has(source.repository), "Repository is not approved");
  assert(/^[a-f0-9]{40}$/.test(source.revision), "Expected a pinned commit");
  return source.skills.flatMap((skill) => planSkill(source, skill));
};

const appendChunk = (buffer: Buffer, chunk: Uint8Array, offset: number) => {
  const length = offset + chunk.byteLength;
  assert(length <= buffer.length, "Download exceeds the reviewed file size");
  buffer.set(chunk, offset);
  return length;
};

const readBody = async (response: Response, limit: number) => {
  assert(response.body, "Empty download response");
  const reader = response.body.getReader();
  const buffer = Buffer.alloc(limit);
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return buffer.subarray(0, length);
      length = appendChunk(buffer, value, length);
    }
  } finally {
    await reader.cancel();
  }
};

export const downloadFile = async (file: PlannedFile, download: Download = fetch) => {
  const signal = AbortSignal.timeout(15_000);
  const response = await download(file.url, { redirect: "error", signal });
  assert(response.ok, `Download failed (${response.status}): ${file.entry.source}`);
  const bytes = await readBody(response, file.entry.bytes);
  assert.equal(bytes.length, file.entry.bytes, `File size differs: ${file.entry.source}`);
  assert.equal(digest(bytes), file.entry.sha256, `Checksum differs: ${file.entry.source}`);
  return { file, bytes };
};

const skillNames = (source: Source) => source.skills.map((skill) => skill.name);

const skillLinks = (sources: Source[]): SkillLink[] => {
  const names = sources.flatMap(skillNames);
  assert.equal(new Set(names).size, names.length, "Duplicate skill names");
  const humanizer = { path: ".agents/skills/humanizer", target: "../../lib/agents/humanizer" };
  const links = names.concat("humanizer").map((name) => {
    const path = `.claude/skills/${name}`;
    const target = `../../.agents/skills/${name}`;
    return { path, target };
  });
  return [humanizer].concat(links);
};

const writeDownload = (root: string, result: Awaited<ReturnType<typeof downloadFile>>) => {
  const { file, bytes } = result;
  if (checkFile(root, file)) return;
  makeParents(root, file.path);
  writeFileSync(join(root, file.path), bytes, { flag: "wx", mode: 0o644 });
};

const writeLink = (root: string, link: SkillLink) => {
  checkLink(root, link);
  const path = join(root, link.path);
  if (stat(path)) return;
  makeParents(root, link.path);
  symlinkSync(link.target, path, "dir");
};

const fetchMissing = async (files: PlannedFile[], download: Download) => {
  const results = await Promise.allSettled(files.map((file) => downloadFile(file, download)));
  const failures = results.filter((result) => result.status === "rejected");
  const errors = failures.map((failure) => failure.reason);
  assert.equal(
    errors.length,
    0,
    new AggregateError(errors, "Skill downloads failed; nothing installed"),
  );
  return results.flatMap((result) => {
    if (result.status === "fulfilled") return [result.value];
    return [];
  });
};

export const installSkills = async (
  root: string,
  sources: Source[],
  download: Download = fetch,
) => {
  const files = sources.flatMap(sourceFiles);
  assert.equal(new Set(files.map((file) => file.path)).size, files.length, "Duplicate targets");
  const links = skillLinks(sources);
  assert(stat(join(root, "lib/agents/humanizer/SKILL.md"))?.isFile(), "Missing blog Humanizer");
  files.forEach((file) => checkFile(root, file));
  links.forEach((link) => checkLink(root, link));
  const missing = files.filter((file) => !checkFile(root, file));
  const results = await fetchMissing(missing, download);
  results.forEach((result) => writeDownload(root, result));
  links.forEach((link) => writeLink(root, link));
  return sources.flatMap(skillNames);
};

const main = async () => {
  const args = process.argv.slice(2);
  assert(
    args.every((arg) => arg === "--include-walter-mcp"),
    "Unknown option",
  );
  const includeWalter = args.includes("--include-walter-mcp");
  const sources = manifest.sources.filter((source) => !source.requiresWalterMcp || includeWalter);
  const root = fileURLToPath(new URL("../", import.meta.url));
  const installed = await installSkills(root, sources);
  log.info({ installed }, "Skills installed in ignored provider directories");
  if (includeWalter)
    log.warn(
      "Walter workflows require a separately configured MCP service; using it sends drafts to Walter",
    );
};

const entryPoint = process.argv[1] && pathToFileURL(resolve(process.argv[1])).href;
if (entryPoint === import.meta.url) {
  main().catch((error: Error) => {
    log.error(error, "Skill installation failed");
    process.exitCode = 1;
  });
}
