import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Root } from "mdast";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { getBuildCacheKey, hasDiagramAssets, withBuildCache } from "../../../../../lib/server/markdown/build-cache";
import { remarkMermaidAssets } from "../../../../../lib/server/markdown/remark-mermaid-assets";

const render = vi.hoisted(() => vi.fn());
vi.mock("mermaid-isomorphic", () => ({ createMermaidRenderer: () => render }));
vi.mock("../../../../../lib/server/markdown/mermaid-theme", () => ({
  getMermaidThemeCss: (theme: string) => `text { color: ${theme}; }`,
}));

let directory: string;

beforeEach(() => {
  mkdirSync(path.join(process.cwd(), "tmp"), { recursive: true });
  directory = mkdtempSync(path.join(process.cwd(), "tmp", "build-cache-test-"));
  ["lib/server/markdown", "lib/server/themes", "lib/server/post-page", "lib/client/styles/scss", "public/assets/mermaid"]
    .forEach((folder) => mkdirSync(path.join(directory, folder), { recursive: true }));
  ["lib/server/markdown/index.ts", "lib/server/themes/light.json", "lib/server/post-page/index.ts", "lib/client/styles/scss/_variables.scss", "pnpm-lock.yaml"]
    .forEach((file) => writeFileSync(path.join(directory, file), "initial"));
  vi.spyOn(process, "cwd").mockReturnValue(directory);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  rmSync(directory, { recursive: true, force: true });
});

test("reuses compiled output, rebuilds changed content, and recovers from corrupt JSON", async () => {
  const build = vi.fn(async () => "compiled");
  const valid = (value: unknown): value is string => typeof value === "string";
  await expect(withBuildCache("mdx", "first", build, valid)).resolves.toBe("compiled");
  await expect(withBuildCache("mdx", "first", build, valid)).resolves.toBe("compiled");
  expect(build).toHaveBeenCalledTimes(1);
  await withBuildCache("mdx", "changed", build, valid);
  expect(build).toHaveBeenCalledTimes(2);
  const key = getBuildCacheKey("mdx", "first");
  writeFileSync(path.join(directory, ".cache/compiled-content", `${key}.json`), "{");
  await withBuildCache("mdx", "first", build, valid);
  expect(build).toHaveBeenCalledTimes(3);
});

test.each(["lib/server/markdown/index.ts", "lib/server/post-page/index.ts", "lib/server/themes/light.json", "lib/client/styles/scss/_variables.scss", "pnpm-lock.yaml"])(
  "invalidates compiled output when %s changes", (file) => {
    const before = getBuildCacheKey("mdx", "post");
    writeFileSync(path.join(directory, file), "changed");
    expect(getBuildCacheKey("mdx", "post")).not.toBe(before);
  },
);

test("keeps development and production compilation separate", () => {
  vi.stubEnv("NODE_ENV", "development");
  const before = getBuildCacheKey("mdx", "post");
  vi.stubEnv("NODE_ENV", "production");
  expect(getBuildCacheKey("mdx", "post")).not.toBe(before);
});

test("rebuilds MDX when a referenced SVG disappears", async () => {
  const source = 'src: "/assets/mermaid/abcd.svg", "data-dark-src": "/assets/mermaid/def0.svg"';
  const light = path.join(directory, "public/assets/mermaid/abcd.svg");
  const dark = path.join(directory, "public/assets/mermaid/def0.svg");
  const build = vi.fn(async () => {
    writeFileSync(light, "light");
    writeFileSync(dark, "dark");
    return source;
  });
  const valid = (value: unknown): value is string => {
    if (typeof value !== "string") return false;
    return hasDiagramAssets(value);
  };
  await withBuildCache("mdx", "post", build, valid);
  await withBuildCache("mdx", "post", build, valid);
  expect(build).toHaveBeenCalledTimes(1);
  rmSync(dark);
  await withBuildCache("mdx", "post", build, valid);
  expect(build).toHaveBeenCalledTimes(2);
  expect(readFileSync(dark, "utf8")).toBe("dark");
});

test("does not cache failed compilation", async () => {
  const build = vi.fn(async () => { throw new Error("Invalid MDX"); });
  const valid = (value: unknown): value is string => typeof value === "string";
  await expect(withBuildCache("mdx", "post", build, valid)).rejects.toThrow("Invalid MDX");
  await expect(withBuildCache("mdx", "post", build, valid)).rejects.toThrow("Invalid MDX");
  expect(build).toHaveBeenCalledTimes(2);
});

test("reuses Mermaid metadata without rendering and restores a missing SVG", async () => {
  render.mockResolvedValue([{ status: "fulfilled", value: {
    svg: '<svg id="diagram"></svg>', id: "diagram", width: 100, height: 50,
  } }]);
  const transform = remarkMermaidAssets();
  const first = diagramTree();
  await transform(first);
  const second = diagramTree();
  await transform(second);
  expect(second).toEqual(first);
  expect(render).toHaveBeenCalledTimes(1);
  const serialized = JSON.stringify(first);
  const asset = serialized.match(/\/assets\/mermaid\/[a-f0-9]+\.svg/)?.[0];
  expect(asset).toBeDefined();
  const file = path.join(directory, "public", asset!);
  rmSync(file);
  const third = diagramTree();
  await transform(third);
  expect(third).toEqual(first);
  expect(readFileSync(file, "utf8")).toContain("<svg");
  expect(render).toHaveBeenCalledTimes(1);
});

function diagramTree(): Root {
  return { type: "root", children: [{ type: "code", lang: "mermaid", value: "graph TD; A-->B" }] };
}
