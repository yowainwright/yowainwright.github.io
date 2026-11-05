#!/usr/bin/env -S pnpm exec tsx

import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
import { openSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { createInterface } from "node:readline/promises";
import { ReadStream, WriteStream } from "node:tty";
import { fileURLToPath, pathToFileURL } from "node:url";

type Mode = "skip" | "quick" | "deep";
type ReviewMode = Exclude<Mode, "skip">;
type GitRead = (args: string[]) => string;

const log = (message: string) => process.stdout.write(`${message}\n`);
const ROOT = fileURLToPath(new URL("../", import.meta.url));
const MAX_PROMPT_BYTES = 256 * 1024;
const CONTENT_PATHS = ["content/*.md", "content/*.mdx"];
const VOICE_SAMPLES = [
  "content/us-swe-economy-2025.mdx",
  "content/lightweight-intelligent-completion-in-zsh.md",
  "content/js-node-strange-place.md",
  "content/build-your-own-dependabot.md",
  "content/document-cookie-nuances.md",
  "content/cli-program-basic-parts.md",
  "content/if-i-had-a-highlighter.md",
  "content/let-the-dream-live.md",
];
const REVIEW_SKILLS = [
  "lib/agents/humanizer/SKILL.md",
  "lib/agents/humanizer/references/voice.md",
  ".agents/skills/walter-writes-humanizer/SKILL.md",
];
const DEEP_REFERENCES = [
  "lib/agents/humanizer/references/humanizer.md",
  ".agents/skills/walter-writes-humanizer/references/phrases.md",
  ".agents/skills/walter-writes-humanizer/references/structures.md",
  ".agents/skills/walter-writes-humanizer/references/examples.md",
];

export const parseMode = (value: string): Mode => {
  const mode = value.toLowerCase().trim();
  if (["s", "skip", ""].includes(mode)) return "skip";
  if (["q", "quick"].includes(mode)) return "quick";
  if (["d", "deep"].includes(mode)) return "deep";
  throw new Error(`Unknown writing review mode: ${value}`);
};

export const configuredMode = (value: string | undefined, interactive: boolean) => {
  if (value !== undefined) return parseMode(value);
  if (!interactive) return "skip";
  return undefined;
};

const terminalQuestion = async (input: ReadStream, output: WriteStream) => {
  const terminal = createInterface({ input, output });
  try {
    const signal = AbortSignal.timeout(30_000);
    const prompt = "Writing review: [S]kip, [Q]uick (2 min limit), [D]eep (10 min limit)? [S] ";
    return parseMode(await terminal.question(prompt, { signal }));
  } finally {
    terminal.close();
    output.destroy();
  }
};

const askMode = async (): Promise<Mode> => {
  const input = new ReadStream(openSync("/dev/tty", "r"));
  try {
    const output = new WriteStream(openSync("/dev/tty", "w"));
    return await terminalQuestion(input, output);
  } finally {
    input.destroy();
  }
};

const chooseMode = async (value: string | undefined): Promise<Mode> => {
  const interactive = Boolean(process.stdout.isTTY && !process.env.CI);
  const configured = configuredMode(value, interactive);
  if (configured !== undefined) return configured;
  try {
    return await askMode();
  } catch {
    log("No writing review selected; skipping.");
    return "skip";
  }
};

const gitRead =
  (root: string): GitRead =>
  (args) => {
    return execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: MAX_PROMPT_BYTES });
  };

export const stagedPosts = (git: GitRead) => {
  const args = ["diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z", "--"];
  const paths = git(args.concat(CONTENT_PATHS)).split("\0").filter(Boolean);
  return paths.filter((path) => /^content\/.+\.mdx?$/.test(path));
};

const stagedDiff = (git: GitRead, paths: string[]) => {
  const args = ["diff", "--cached", "--no-ext-diff", "--no-textconv", "--unified=8", "--"];
  return git(args.concat(paths));
};

const sourceBlock = (path: string, content: string) => JSON.stringify({ path, content });

const readGuidance = (root: string, path: string) => {
  try {
    return sourceBlock(path, readFileSync(join(root, path), "utf8"));
  } catch {
    throw new Error(`Missing writing guidance: ${path}. Run pnpm run skills:install first.`);
  }
};

const voiceSamples = (git: GitRead, paths: string[]) => {
  return VOICE_SAMPLES.filter((path) => !paths.includes(path)).map((path) => {
    return sourceBlock(path, git(["show", `HEAD:${path}`]));
  });
};

const deepContext = (root: string, paths: string[], git: GitRead) => {
  const references = DEEP_REFERENCES.map((path) => readGuidance(root, path));
  const posts = paths.map((path) => sourceBlock(path, git(["show", `:${path}`])));
  return references.concat(posts, voiceSamples(git, paths));
};

export const buildReviewPrompt = (
  root: string,
  mode: ReviewMode,
  paths: string[],
  git: GitRead,
) => {
  const instructions = readFileSync(join(root, "lib/agents/review.md"), "utf8");
  const guidance = REVIEW_SKILLS.map((path) => readGuidance(root, path));
  const diff = sourceBlock("staged diff", stagedDiff(git, paths));
  const context = mode === "deep" ? deepContext(root, paths, git) : [];
  const parts = [instructions, `Selected mode: ${mode}`].concat(guidance, diff, context);
  const prompt = parts.join("\n\n");
  assert(
    Buffer.byteLength(prompt) <= MAX_PROMPT_BYTES,
    "Review exceeds 256 KiB; stage fewer posts",
  );
  return prompt;
};

export const reviewArguments = (root: string, mode: ReviewMode) => {
  const effort = mode === "deep" ? "high" : "medium";
  return [
    "-a",
    "never",
    "exec",
    "--sandbox",
    "read-only",
    "--ephemeral",
    "--ignore-user-config",
    "--cd",
    root,
    "--color",
    "never",
    "--disable",
    "apps",
    "--disable",
    "plugins",
    "--disable",
    "shell_tool",
    "--disable",
    "multi_agent",
    "--disable",
    "browser_use",
    "--disable",
    "computer_use",
    "--disable",
    "skill_mcp_dependency_install",
    "-c",
    'web_search="disabled"',
    "-c",
    `model_reasoning_effort="${effort}"`,
    "-",
  ];
};

export const runReview = (root: string, mode: ReviewMode, prompt: string) => {
  return new Promise<void>((accept, reject) => {
    const timeout = mode === "deep" ? 600_000 : 120_000;
    const args = reviewArguments(root, mode);
    const child = spawn("codex", args, { cwd: root, stdio: ["pipe", "inherit", "inherit"] });
    const timer = setTimeout(() => child.kill("SIGKILL"), timeout);
    child.on("error", reject);
    child.stdin.on("error", (error: NodeJS.ErrnoException) => {
      if (error.code !== "EPIPE") reject(error);
    });
    child.on("close", (code, signal) => {
      clearTimeout(timer);
      if (code === 0) return accept();
      reject(
        new Error(
          `Writing review incomplete (${signal || code}). Use BLOG_REVIEW=skip to bypass it.`,
        ),
      );
    });
    child.stdin.end(prompt);
  });
};

const selectedMode = (args: string[]) => {
  const modes = args.filter((arg) => arg !== "--prompt-only");
  assert(modes.length <= 1, "Usage: review:content [skip|quick|deep] [--prompt-only]");
  return modes[0] ?? process.env.BLOG_REVIEW;
};

const main = async () => {
  const args = process.argv.slice(2);
  const configured = selectedMode(args);
  const skip = configured !== undefined && parseMode(configured) === "skip";
  if (skip) return;
  const git = gitRead(ROOT);
  const paths = stagedPosts(git);
  if (!paths.length) return;
  const mode = await chooseMode(configured);
  if (mode === "skip") return log("Writing review skipped.");
  const prompt = buildReviewPrompt(ROOT, mode, paths, git);
  if (args.includes("--prompt-only")) return log(prompt);
  log(`Reviewing ${paths.length} staged post(s) with Codex (${mode}); findings are advisory.`);
  await runReview(ROOT, mode, prompt);
};

const entryPoint = process.argv[1] && pathToFileURL(resolve(process.argv[1])).href;
if (entryPoint === import.meta.url) {
  main().catch((error: Error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
