import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { LocalLinter } from "harper.js";
import { afterEach, describe, expect, test, vi } from "vitest";
import { proseSource, reviewProse } from "../../../../scripts/review-prose/utils";

let fixtureDirectory: string | undefined;

afterEach(() => {
  vi.restoreAllMocks();
  if (fixtureDirectory) rmSync(fixtureDirectory, { recursive: true, force: true });
  fixtureDirectory = undefined;
});

describe("local prose review", () => {
  test("excludes MDX and technical material while retaining original offsets", () => {
    const source = [
      "---",
      "title: Hidden title",
      "---",
      "",
      'import Thing from "./hidden.js";',
      "",
      'export const data = "hidden export";',
      "",
      "# Visible heading",
      "",
      "😀 Visible **words** and [link label](https://example.com/hidden-url).",
      "",
      '`hidden code` and {"hidden expression"}',
      "",
      "```js",
      'throw new Error("hidden fence")',
      "```",
      "",
      '<Thing title="hidden attribute">Hidden component text</Thing>',
      "",
      "![Hidden image](https://example.com/image.png)",
      "",
      "> Hidden quotation",
      "",
      "| Hidden table |",
      "| --- |",
      "| Hidden cell |",
      "",
      "https://example.com/hidden-autolink",
    ].join("\r\n");
    const prose = proseSource(source, true);
    expect(prose).not.toMatch(/hidden/i);
    expect(prose).toHaveLength(source.length);
    expect(prose.split("\r\n")).toHaveLength(source.split("\r\n").length);
    expect(prose.indexOf("words")).toBe(source.indexOf("words"));
    expect(prose.indexOf("link label")).toBe(source.indexOf("link label"));
  });

  test("parses ordinary Markdown without interpreting it as MDX", () => {
    const source = "Use {braces} and compare 1 < 2.\n\n<div>Hidden HTML</div>";
    expect(proseSource(source, false)).toContain("Use {braces} and compare 1 < 2.");
    expect(proseSource(source, false)).not.toContain("Hidden HTML");
  });

  test("reports real grammar and style findings at Unicode source positions", async () => {
    const source = "---\ntitle: Test\n---\n\n😀 This is a a test. It was very unique.";
    const findings = await reviewProse(source, true);
    const grammar = findings.find((item) => item.source === "Harper");
    const style = findings.find((item) => item.source === "write-good");
    expect(source.slice(grammar!.start, grammar!.end)).toBe("a a");
    expect(source.slice(style!.start, style!.end)).toBe("a");
    expect(grammar!.start).toBe(source.indexOf("a a"));
  });

  test("does not report grammar findings caused by masking syntax", async () => {
    const findings = await reviewProse("This is **a** test.", true);
    expect(findings).toEqual([]);
  });

  test("surfaces checker failures and disposes the local linter", async () => {
    vi.spyOn(LocalLinter.prototype, "lint").mockRejectedValue(new Error("WASM unavailable"));
    const dispose = vi.spyOn(LocalLinter.prototype, "dispose");
    await expect(reviewProse("A test.", false)).rejects.toThrow("WASM unavailable");
    expect(dispose).toHaveBeenCalledOnce();
  });

  test("CLI reports advisory findings without changing a file with spaces in its name", () => {
    const source = "😀 This is a a test.";
    const file = fixture(source);
    const result = runCli([file]);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain(`${file}:1:`);
    expect(result.stdout).toContain("[Harper]");
    expect(result.stdout).toContain("[write-good]");
    expect(readFileSync(file, "utf8")).toBe(source);
  });

  test("CLI fails clearly on invalid MDX rather than reporting completion", () => {
    const file = fixture("<Thing>");
    const result = runCli([file]);
    expect(result.status).toBe(2);
    expect(result.stderr).toContain("Prose review incomplete");
    expect(result.stdout).not.toContain("Review complete");
  });

  test("CLI rejects a missing file or missing arguments", () => {
    expect(runCli(["does-not-exist.mdx"]).status).toBe(2);
    expect(runCli([]).status).toBe(2);
  });
});

function fixture(source: string) {
  mkdirSync(".cache", { recursive: true });
  fixtureDirectory = mkdtempSync(resolve(".cache/prose-test-"));
  const file = resolve(fixtureDirectory, "post with spaces.mdx");
  writeFileSync(file, source);
  return file;
}

function runCli(args: string[]) {
  const command = ["--import", "tsx", "scripts/review-prose/index.ts"].concat(args);
  return spawnSync(process.execPath, command, { encoding: "utf8", timeout: 10_000 });
}
