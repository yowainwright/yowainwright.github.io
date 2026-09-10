import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  chmodSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readlinkSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import manifest from "../../lib/agents/sources.json";
import { createLogger } from "../../lib/server/logger";
import {
  CHECKSUM_PRIME,
  CHECKSUM_SEED,
  DOWNLOAD_TIMEOUT_MS,
  HOOKS,
  HOOKS_DIR,
  INSTALL_USAGE,
  LEGACY_HOOK_FINGERPRINTS,
  MANAGED_HOOK_MARKER,
  MAX_BYTES,
  MAX_SKILL_NAME_LENGTH,
  REPOSITORIES,
} from "./constants";
import type {
  Download,
  FileEntry,
  HookAction,
  HookFingerprint,
  HookName,
  InstallOptions,
  LocalSkill,
  PlannedFile,
  Skill,
  SkillFile,
  SkillLink,
  Source,
  VerifiedFile,
} from "./types";

const log = createLogger("install-hooks");

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

const checkFile = (root: string, file: SkillFile) => {
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
  assert(skill.name.length <= MAX_SKILL_NAME_LENGTH, "Skill name is too long");
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

const verifyBytes = (bytes: Buffer, entry: FileEntry) => {
  assert.equal(bytes.length, entry.bytes, `File size differs: ${entry.source}`);
  assert.equal(digest(bytes), entry.sha256, `Checksum differs: ${entry.source}`);
};

export const downloadFile = async (file: PlannedFile, download: Download = fetch) => {
  const signal = AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS);
  const response = await download(file.url, { redirect: "error", signal });
  assert(response.ok, `Download failed (${response.status}): ${file.entry.source}`);
  const bytes = await readBody(response, file.entry.bytes);
  verifyBytes(bytes, file.entry);
  return { file, bytes };
};

const skillNames = (source: Source) => source.skills.map((skill) => skill.name);

const claudeLink = (name: string): SkillLink => {
  const path = `.claude/skills/${name}`;
  const target = `../../.agents/skills/${name}`;
  return { path, target };
};

const skillLinks = (sources: Source[]): SkillLink[] => {
  const names = sources.flatMap(skillNames);
  assert.equal(new Set(names).size, names.length, "Duplicate skill names");
  const humanizer = { path: ".agents/skills/humanizer", target: "../../lib/agents/humanizer" };
  const links = names.concat("humanizer").map(claudeLink);
  return [humanizer].concat(links);
};

const writeDownload = (root: string, result: VerifiedFile) => {
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

const readLocalFile = (sourceRoot: string, name: string, entry: FileEntry): VerifiedFile => {
  validateFile(entry);
  checkParents(sourceRoot, entry.source);
  const source = join(sourceRoot, entry.source);
  const sourceStat = stat(source);
  assert(sourceStat, `Missing reviewed global skill: ${source}`);
  assert(sourceStat.isFile(), `Expected a regular skill file: ${source}`);
  assert.equal(sourceStat.size, entry.bytes, `File size differs: ${entry.source}`);
  const bytes = readFileSync(source);
  verifyBytes(bytes, entry);
  const path = `.agents/skills/${name}/${entry.target}`;
  const file = { path, entry };
  return { file, bytes };
};

const readLocalSkill = (sourceRoot: string, skill: LocalSkill) => {
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill.name), "Unsafe local skill name");
  assert(skill.name.length <= MAX_SKILL_NAME_LENGTH, "Skill name is too long");
  return skill.files.map((entry) => readLocalFile(sourceRoot, skill.name, entry));
};

export const installLocalSkills = (
  root: string,
  sourceRoot: string,
  skills = manifest.localSkills,
) => {
  const verified = skills.flatMap((skill) => readLocalSkill(sourceRoot, skill));
  const names = skills.map((skill) => skill.name);
  const links = names.map(claudeLink);
  verified.forEach(({ file }) => checkFile(root, file));
  links.forEach((link) => checkLink(root, link));
  verified.forEach((result) => writeDownload(root, result));
  links.forEach((link) => writeLink(root, link));
  return names;
};

const writeHook = (hookPath: string, hookContent: string) => {
  writeFileSync(hookPath, hookContent, { mode: 0o755 });
  chmodSync(hookPath, 0o755);
};

const updateChecksum = (checksum: number, character: string) => {
  const characterCode = character.charCodeAt(0);
  const mixedChecksum = checksum ^ characterCode;
  const multipliedChecksum = Math.imul(mixedChecksum, CHECKSUM_PRIME);

  return multipliedChecksum >>> 0;
};

const getHookFingerprint = (hookContent: string): HookFingerprint => {
  const characters = Array.from(hookContent);
  const checksum = characters.reduce(updateChecksum, CHECKSUM_SEED);

  return { checksum, length: hookContent.length };
};

const matchesFingerprint = (fingerprint: HookFingerprint, candidate: HookFingerprint) => {
  const hasMatchingChecksum = fingerprint.checksum === candidate.checksum;
  const hasMatchingLength = fingerprint.length === candidate.length;

  return hasMatchingChecksum && hasMatchingLength;
};

export const isManagedHook = (hookName: HookName, hookContent: string) => {
  const isCurrentHook = hookContent.includes(MANAGED_HOOK_MARKER);
  const hookFingerprint = getHookFingerprint(hookContent);
  const legacyFingerprints = LEGACY_HOOK_FINGERPRINTS[hookName];
  const isKnownLegacyHook = legacyFingerprints.some((legacyFingerprint) =>
    matchesFingerprint(hookFingerprint, legacyFingerprint),
  );

  return isCurrentHook || isKnownLegacyHook;
};

const syncHook = (hookName: HookName): HookAction => {
  const hookPath = join(HOOKS_DIR, hookName);
  const hookContent = HOOKS[hookName];

  if (!existsSync(hookPath)) {
    writeHook(hookPath, hookContent);
    return "installed";
  }

  const existingContent = readFileSync(hookPath, "utf8");
  const shouldUpdate = isManagedHook(hookName, existingContent) && existingContent !== hookContent;

  if (!shouldUpdate) return "skipped";

  writeHook(hookPath, hookContent);
  return "updated";
};

const shouldInstallHooks = () => {
  if (process.env.CI === "true") {
    log.info("CI detected, skipping hook installation");
    return false;
  }
  if (!existsSync(".git")) {
    log.info("not a git repository, skipping hook installation");
    return false;
  }
  return true;
};

const summarizeHooks = (actions: HookAction[]) => {
  const installed = actions.filter((action) => action === "installed").length;
  const updated = actions.filter((action) => action === "updated").length;
  const skipped = actions.filter((action) => action === "skipped").length;
  return { installed, updated, skipped };
};

export const installHooks = (): void => {
  if (!shouldInstallHooks()) return;
  mkdirSync(HOOKS_DIR, { recursive: true });
  const hookNames = Object.keys(HOOKS) as HookName[];
  const actions = hookNames.map(syncHook);
  const summary = summarizeHooks(actions);
  log.info(summary, "synchronized git hooks");
};

export const readOptions = ([target, ...args]: string[]): InstallOptions => {
  const singleTarget = target === "hooks" || target === "skills";
  const validTarget = target === "all" || singleTarget;
  assert(validTarget, INSTALL_USAGE);
  const validFlags = args.every((arg) => arg === "--include-walter-mcp");
  const skillFlags = target === "skills" && validFlags;
  assert(args.length === 0 || skillFlags, INSTALL_USAGE);
  const includeWalter = args.includes("--include-walter-mcp");
  return { target, includeWalter };
};
