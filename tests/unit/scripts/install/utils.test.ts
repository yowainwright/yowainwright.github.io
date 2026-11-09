import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readlinkSync,
  renameSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { installSkills, isManagedHook, readOptions } from "../../../../scripts/install/utils";

const name = "walter-writes-writer";
const text = `---\nname: ${name}\ndescription: A fixture skill.\n---\n`;
const bytes = Buffer.from(text);
const sha256 = createHash("sha256").update(bytes).digest("hex");
const revision = "ef668580dc8782b7241b16ea77ae513737602616";
const repository = "walterwritesai/no-slop-ai-humanizer-rewriter";
const targets = ["SKILL.md", "LICENSE", "references/phrases.md"];
const sources = () => {
  const files = targets.map((target) => {
    const source = `writer/${target}`;
    return { source, target, sha256, bytes: bytes.length };
  });
  const skills = [{ name, files }];
  return [{ repository, revision, license: "CC-BY-ND-4.0", requiresWalterMcp: false, skills }];
};

let root: string;
const download = vi.fn<typeof fetch>();
const skillPath = (file = "SKILL.md") => join(root, ".agents/skills", name, file);

describe("installer options", () => {
  test("selects hooks or skills without opting in to Walter MCP", () => {
    expect(readOptions(["all"])).toEqual({ target: "all", includeWalter: false });
    expect(readOptions(["hooks"])).toEqual({ target: "hooks", includeWalter: false });
    expect(readOptions(["skills"])).toEqual({ target: "skills", includeWalter: false });
    expect(readOptions(["skills", "--include-walter-mcp"])).toEqual({
      target: "skills",
      includeWalter: true,
    });
  });

  test.each([
    [],
    ["unknown"],
    ["hooks", "--include-walter-mcp"],
    ["all", "--include-walter-mcp"],
    ["skills", "--unknown"],
  ])("rejects invalid installer arguments: %j", (...args) => {
    expect(() => readOptions(args)).toThrow("Usage:");
  });
});

describe("installSkills", () => {
  beforeEach(() => {
    const cache = join(process.cwd(), ".cache");
    mkdirSync(cache, { recursive: true });
    root = mkdtempSync(join(cache, "install-skills-test-"));
    const humanizer = join(root, ".agents/skills/humanizer");
    mkdirSync(humanizer, { recursive: true });
    writeFileSync(join(humanizer, "SKILL.md"), "Keep Jeff's custom skill");
    const siteQuality = join(root, ".agents/skills/site-quality");
    mkdirSync(siteQuality, { recursive: true });
    writeFileSync(join(siteQuality, "SKILL.md"), "Review site quality locally");
    download.mockReset().mockImplementation(async () => new Response(bytes));
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  test("installs exact bytes and provider links, then reruns without downloads", async () => {
    await expect(installSkills(root, sources(), download)).resolves.toEqual([name]);
    expect(readFileSync(skillPath(), "utf8")).toBe(text);
    expect(readFileSync(skillPath("LICENSE"), "utf8")).toBe(text);
    expect(readFileSync(skillPath("references/phrases.md"), "utf8")).toBe(text);
    expect(readlinkSync(join(root, ".claude/skills", name))).toBe(`../../.agents/skills/${name}`);
    expect(readFileSync(join(root, ".agents/skills/humanizer/SKILL.md"), "utf8")).toBe(
      "Keep Jeff's custom skill",
    );
    expect(readFileSync(join(root, ".agents/skills/site-quality/SKILL.md"), "utf8")).toBe(
      "Review site quality locally",
    );
    expect(readlinkSync(join(root, ".claude/skills/site-quality"))).toBe(
      "../../.agents/skills/site-quality",
    );
    const url = `https://raw.githubusercontent.com/${repository}/${revision}/writer/SKILL.md`;
    expect(download).toHaveBeenCalledWith(url, expect.objectContaining({ redirect: "error" }));
    download.mockClear();
    await installSkills(root, sources(), download);
    expect(download).not.toHaveBeenCalled();
  });

  test.each(["checksum", "oversized", "truncated", "http"])(
    "rejects a %s failure before installing any files",
    async (failure) => {
      const responses = {
        checksum: new Response(Buffer.alloc(bytes.length, 120)),
        oversized: new Response(Buffer.alloc(bytes.length + 1)),
        truncated: new Response(bytes.subarray(1)),
        http: new Response("Unavailable", { status: 503 }),
      };
      download.mockResolvedValueOnce(responses[failure as keyof typeof responses]);
      await expect(installSkills(root, sources(), download)).rejects.toThrow("nothing installed");
      expect(existsSync(skillPath())).toBe(false);
      expect(existsSync(join(root, ".claude"))).toBe(false);
    },
  );

  test("preserves locally edited files and stops before downloading", async () => {
    await installSkills(root, sources(), download);
    writeFileSync(skillPath(), "My local changes");
    download.mockClear();
    await expect(installSkills(root, sources(), download)).rejects.toThrow("Local file differs");
    expect(readFileSync(skillPath(), "utf8")).toBe("My local changes");
    expect(download).not.toHaveBeenCalled();
  });

  test.each([
    ".agents",
    `.agents/skills/${name}`,
    `.agents/skills/${name}/references`,
    `.agents/skills/${name}/SKILL.md`,
    `.claude/skills/${name}`,
  ])("rejects a symlink at %s without writing through it", async (relativePath) => {
    const elsewhere = join(root, "elsewhere");
    mkdirSync(elsewhere);
    const link = join(root, relativePath);
    mkdirSync(dirname(link), { recursive: true });
    if (relativePath === ".agents") {
      rmSync(elsewhere, { recursive: true });
      renameSync(link, elsewhere);
    }
    symlinkSync(elsewhere, link, "dir");
    await expect(installSkills(root, sources(), download)).rejects.toThrow();
    expect(download).not.toHaveBeenCalled();
    expect(existsSync(join(elsewhere, "SKILL.md"))).toBe(false);
    expect(readlinkSync(link)).toBe(elsewhere);
  });

  test("preserves an existing Claude skill directory", async () => {
    const claude = join(root, ".claude/skills", name);
    mkdirSync(claude, { recursive: true });
    writeFileSync(join(claude, "SKILL.md"), "Existing skill");
    await expect(installSkills(root, sources(), download)).rejects.toThrow("existing skill");
    expect(readFileSync(join(claude, "SKILL.md"), "utf8")).toBe("Existing skill");
    expect(download).not.toHaveBeenCalled();
  });

  test("rejects traversal in a destination before creating downloaded files", async () => {
    const unsafe = sources();
    unsafe[0].skills[0].files[2].target = "../../outside.md";
    await expect(installSkills(root, unsafe, download)).rejects.toThrow("Unexpected target");
    expect(download).not.toHaveBeenCalled();
    expect(existsSync(skillPath())).toBe(false);
  });

  test("rejects an unpinned revision before downloading", async () => {
    const unsafe = sources();
    unsafe[0].revision = "main";
    await expect(installSkills(root, unsafe, download)).rejects.toThrow("pinned commit");
    expect(download).not.toHaveBeenCalled();
  });
});

const checkMark = String.fromCharCode(0x2713);
const legacyPostMerge = [
  "#!/usr/bin/env bun",
  "",
  "import { $ } from 'bun';",
  "",
  "console.log('Running post-merge checks...');",
  "",
  "const lockfileChanged = await $`git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD`.text();",
  "",
  "if (lockfileChanged.includes('bun.lock') || lockfileChanged.includes('package.json')) {",
  "  console.log('Dependencies changed, running bun install...');",
  "  await $`bun install`;",
  `  console.log('${checkMark} Dependencies updated');`,
  "} else {",
  `  console.log('${checkMark} No dependency changes detected');`,
  "}",
  "",
].join("\n");

describe("isManagedHook", () => {
  test("recognizes an unmodified legacy hook", () => {
    expect(isManagedHook("post-merge", legacyPostMerge)).toBe(true);
  });

  test("preserves a customized legacy hook", () => {
    const customHook = `${legacyPostMerge}pnpm run custom-check\n`;

    expect(isManagedHook("post-merge", customHook)).toBe(false);
  });

  test("recognizes hooks with the current marker", () => {
    const hookContent = ["#!/usr/bin/env sh", "managed_by=scripts/install-hooks.ts"].join("\n");

    expect(isManagedHook("pre-commit", hookContent)).toBe(true);
  });

  test("preserves custom shell hooks", () => {
    const hookContent = ["#!/usr/bin/env sh", "pnpm run test"].join("\n");

    expect(isManagedHook("pre-commit", hookContent)).toBe(false);
  });
});
