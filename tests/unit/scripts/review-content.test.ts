import { EventEmitter } from "node:events";
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { PassThrough } from "node:stream";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {
  buildReviewPrompt,
  configuredMode,
  parseMode,
  reviewArguments,
  runReview,
  stagedPosts,
} from "../../../scripts/review-content";

vi.mock("node:child_process", () => ({ spawn: vi.fn(), execFileSync: vi.fn() }));

const GUIDANCE = [
  "lib/agents/review.md",
  ".agents/skills/orwell-writing/SKILL.md",
  "lib/agents/humanizer/SKILL.md",
  "lib/agents/humanizer/references/voice.md",
  ".agents/skills/walter-writes-humanizer/SKILL.md",
  "lib/agents/humanizer/references/humanizer.md",
  ".agents/skills/walter-writes-humanizer/references/phrases.md",
  ".agents/skills/walter-writes-humanizer/references/structures.md",
  ".agents/skills/walter-writes-humanizer/references/examples.md",
];

let root: string;
const git = vi.fn<(args: string[]) => string>();
const putFile = (path: string, content: string) => {
  const target = join(root, path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content);
};

beforeEach(() => {
  const cache = join(process.cwd(), ".cache");
  mkdirSync(cache, { recursive: true });
  root = mkdtempSync(join(cache, "review-content-test-"));
  GUIDANCE.forEach((path) => putFile(path, `Guidance: ${path}`));
  git.mockReset().mockImplementation((args) => {
    if (args[0] === "diff") return "STAGED DIFF";
    if (args[1].startsWith("HEAD:")) return "COMMITTED VOICE SAMPLE";
    return "STAGED POST";
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
  rmSync(root, { force: true, recursive: true });
});

describe("review selection", () => {
  test("defaults to skip without a terminal and prompts with one", () => {
    expect(configuredMode(undefined, false)).toBe("skip");
    expect(configuredMode(undefined, true)).toBeUndefined();
    expect(configuredMode("skip", true)).toBe("skip");
    expect(configuredMode("deep", false)).toBe("deep");
    expect(parseMode("")).toBe("skip");
    expect(parseMode("Q")).toBe("quick");
    expect(() => parseMode("yes")).toThrow("Unknown");
  });

  test("reads staged post paths with spaces without shell parsing", () => {
    git.mockReturnValue("content/my post.mdx\0content/note.md\0package.json\0");
    expect(stagedPosts(git)).toEqual(["content/my post.mdx", "content/note.md"]);
    expect(git.mock.calls[0][0]).toContain("--cached");
    expect(git.mock.calls[0][0]).toContain("-z");
  });
});

describe("review context", () => {
  test("quick mode uses the staged diff and omits unstaged working content", () => {
    putFile("content/my post.mdx", "UNSTAGED PRIVATE DRAFT");
    const prompt = buildReviewPrompt(root, "quick", ["content/my post.mdx"], git);
    expect(prompt).toContain("STAGED DIFF");
    expect(prompt).toContain("orwell-writing");
    expect(prompt).not.toContain("UNSTAGED PRIVATE DRAFT");
    expect(prompt).not.toContain("STAGED POST");
    expect(git).toHaveBeenCalledTimes(1);
    expect(git.mock.calls[0][0]).toContain("--no-ext-diff");
    expect(git.mock.calls[0][0]).toContain("--no-textconv");
  });

  test("deep mode uses the index and committed voice samples, excluding its target", () => {
    const path = "content/document-cookie-nuances.md";
    putFile(path, "UNSTAGED PRIVATE DRAFT");
    const prompt = buildReviewPrompt(root, "deep", [path], git);
    expect(prompt).toContain("STAGED POST");
    expect(prompt).toContain("COMMITTED VOICE SAMPLE");
    expect(prompt).not.toContain("UNSTAGED PRIVATE DRAFT");
    expect(git).toHaveBeenCalledWith(["show", `:${path}`]);
    expect(git).not.toHaveBeenCalledWith(["show", `HEAD:${path}`]);
  });

  test("requires installed writing guidance", () => {
    rmSync(join(root, ".agents/skills/orwell-writing/SKILL.md"));
    expect(() => buildReviewPrompt(root, "quick", ["content/post.md"], git)).toThrow(
      "skills:install",
    );
  });

  test("rejects excessive context instead of silently truncating it", () => {
    git.mockReturnValue("x".repeat(256 * 1024));
    expect(() => buildReviewPrompt(root, "quick", ["content/post.md"], git)).toThrow("256 KiB");
  });
});

const fakeChild = () => {
  const child = Object.assign(new EventEmitter(), { stdin: new PassThrough(), kill: vi.fn() });
  vi.mocked(spawn).mockReturnValue(child as unknown as ReturnType<typeof spawn>);
  return child;
};

describe("review runner", () => {
  test("uses read-only Codex with tools restricted and the prompt on stdin", async () => {
    const child = fakeChild();
    const result = runReview(root, "quick", "Review this staged text");
    expect(spawn).toHaveBeenCalledWith(
      "codex",
      reviewArguments(root, "quick"),
      expect.objectContaining({ cwd: root }),
    );
    expect(child.stdin.read().toString()).toBe("Review this staged text");
    expect(reviewArguments(root, "quick")).toContain("read-only");
    expect(reviewArguments(root, "quick")).toContain("--ephemeral");
    expect(reviewArguments(root, "quick")).not.toContain("--ignore-rules");
    child.emit("close", 0, null);
    await expect(result).resolves.toBeUndefined();
  });

  test("reports a failed review rather than claiming it passed", async () => {
    const child = fakeChild();
    const result = runReview(root, "deep", "Review");
    const checked = expect(result).rejects.toThrow("BLOG_REVIEW=skip");
    child.emit("close", 1, null);
    await checked;
  });

  test("stops a quick review at its time limit", async () => {
    vi.useFakeTimers();
    const child = fakeChild();
    const result = runReview(root, "quick", "Review");
    const checked = expect(result).rejects.toThrow("incomplete");
    await vi.advanceTimersByTimeAsync(120_000);
    expect(child.kill).toHaveBeenCalledWith("SIGKILL");
    child.emit("close", null, "SIGKILL");
    await checked;
  });
});
