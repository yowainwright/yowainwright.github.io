import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { main } from "../../../../scripts/install";
import { installHooks, installSkills } from "../../../../scripts/install/utils";

vi.mock("../../../../scripts/install/utils", async (importOriginal) => {
  const original = await importOriginal<typeof import("../../../../scripts/install/utils")>();
  const mocks = {
    installHooks: vi.fn(),
    installSkills: vi.fn(),
  };
  return Object.assign({}, original, mocks);
});

beforeEach(() => {
  vi.stubEnv("CI", "false");
  vi.mocked(installSkills).mockResolvedValue([]);
});

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

describe("package installation setup", () => {
  test("installs hooks and the default skills without opting in to Walter MCP", async () => {
    await main(["all"]);
    expect(installHooks).toHaveBeenCalledOnce();
    expect(installSkills).toHaveBeenCalledOnce();
    const sources = vi.mocked(installSkills).mock.calls[0][1];
    expect(sources.length).toBeGreaterThan(0);
    expect(sources.every((source) => !source.requiresWalterMcp)).toBe(true);
  });

  test("skips hooks and skills in CI", async () => {
    vi.stubEnv("CI", "true");
    await main(["all"]);
    expect(installHooks).not.toHaveBeenCalled();
    expect(installSkills).not.toHaveBeenCalled();
  });

  test("preserves explicit skill installation in CI", async () => {
    vi.stubEnv("CI", "true");
    await main(["skills"]);
    expect(installHooks).not.toHaveBeenCalled();
    expect(installSkills).toHaveBeenCalledOnce();
  });

  test("reports a skill failure to the package lifecycle", async () => {
    vi.mocked(installSkills).mockRejectedValueOnce(new Error("Checksum differs"));
    await expect(main(["all"])).rejects.toThrow("Checksum differs");
  });
});
