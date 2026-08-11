import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";

type InstallHooksModule = typeof import("../../../scripts/install-hooks");

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

let isManagedHook: InstallHooksModule["isManagedHook"];

beforeAll(async () => {
  vi.stubEnv("CI", "true");
  const installHooksModule = await import("../../../scripts/install-hooks");
  isManagedHook = installHooksModule.isManagedHook;
});

afterAll(() => {
  vi.unstubAllEnvs();
});

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
