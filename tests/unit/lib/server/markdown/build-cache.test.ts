import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Root } from "mdast";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import {
  getBuildCacheKey,
  hasDiagramAssets,
  withBuildCache,
} from "../../../../../lib/server/markdown/build-cache";
import { remarkMermaidAssets } from "../../../../../lib/server/markdown/remark-mermaid-assets";

const render = vi.hoisted(() => vi.fn());
const themeCss = vi.hoisted(() => vi.fn());
vi.mock("mermaid-isomorphic", () => ({ createMermaidRenderer: () => render }));
vi.mock("../../../../../lib/server/markdown/mermaid-theme", () => ({
  getMermaidThemeCss: themeCss,
}));

let directory: string;

beforeEach(() => {
  render.mockReset();
  themeCss.mockImplementation((theme: string) => `text { color: ${theme}; }`);
  render.mockResolvedValue([
    {
      status: "fulfilled",
      value: {
        svg: '<svg id="diagram"></svg>',
        id: "diagram",
        width: 100,
        height: 50,
      },
    },
  ]);
  mkdirSync(path.join(process.cwd(), "tmp"), { recursive: true });
  directory = mkdtempSync(path.join(process.cwd(), "tmp", "build-cache-test-"));
  [
    "lib/server/markdown",
    "lib/server/themes",
    "lib/server/post-page",
    "lib/client/styles/scss",
    "public/assets/mermaid",
  ].forEach((folder) => mkdirSync(path.join(directory, folder), { recursive: true }));
  [
    "lib/server/markdown/index.ts",
    "lib/server/themes/light.json",
    "lib/server/post-page/index.ts",
    "lib/client/styles/scss/_variables.scss",
    "pnpm-lock.yaml",
  ].forEach((file) => writeFileSync(path.join(directory, file), "initial"));
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

test.each([
  "lib/server/markdown/index.ts",
  "lib/server/post-page/index.ts",
  "lib/server/themes/light.json",
  "lib/client/styles/scss/_variables.scss",
  "pnpm-lock.yaml",
])("invalidates compiled output when %s changes", (file) => {
  const before = getBuildCacheKey("mdx", "post");
  writeFileSync(path.join(directory, file), "changed");
  expect(getBuildCacheKey("mdx", "post")).not.toBe(before);
});

test("keeps development and production compilation separate", () => {
  vi.stubEnv("NODE_ENV", "development");
  const before = getBuildCacheKey("mdx", "post");
  vi.stubEnv("NODE_ENV", "production");
  expect(getBuildCacheKey("mdx", "post")).not.toBe(before);
});

test("rebuilds MDX when a referenced SVG disappears", async () => {
  const source =
    'src: "/assets/mermaid/sample-diagram-light.svg", "data-dark-src": "/assets/mermaid/sample-diagram-dark.svg"';
  const light = path.join(directory, "public/assets/mermaid/sample-diagram-light.svg");
  const dark = path.join(directory, "public/assets/mermaid/sample-diagram-dark.svg");
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
  const build = vi.fn(async () => {
    throw new Error("Invalid MDX");
  });
  const valid = (value: unknown): value is string => typeof value === "string";
  await expect(withBuildCache("mdx", "post", build, valid)).rejects.toThrow("Invalid MDX");
  await expect(withBuildCache("mdx", "post", build, valid)).rejects.toThrow("Invalid MDX");
  expect(build).toHaveBeenCalledTimes(2);
});

test("reuses Mermaid metadata without rendering and restores a missing SVG", async () => {
  const transform = remarkMermaidAssets();
  const first = diagramTree();
  await transform(first);
  const second = diagramTree();
  await transform(second);
  expect(second).toEqual(first);
  expect(render).toHaveBeenCalledTimes(1);
  const serialized = JSON.stringify(first);
  const asset = serialized.match(/\/assets\/mermaid\/[a-z0-9-]+\.svg/)?.[0];
  expect(asset).toBeDefined();
  const file = path.join(directory, "public", asset!);
  rmSync(file);
  const third = diagramTree();
  await transform(third);
  expect(third).toEqual(first);
  expect(readFileSync(file, "utf8")).toContain("<svg");
  expect(render).toHaveBeenCalledTimes(1);
});

test.each([
  "pnpm-lock.yaml",
  "lib/server/markdown/index.ts",
  "lib/server/post-page/index.ts",
  "lib/server/themes/light.json",
  "lib/client/styles/scss/_variables.scss",
])("keeps Mermaid asset URLs stable when %s changes", async (file) => {
  const transform = remarkMermaidAssets();
  const first = diagramTree();
  await transform(first);
  writeFileSync(path.join(directory, file), "unrelated change");
  const second = diagramTree();
  await transform(second);
  expect(second).toEqual(first);
  expect(render).toHaveBeenCalledTimes(2);
});

test.each(["NODE_ENV", "MERMAID_BROWSER_PATH"])(
  "keeps Mermaid asset URLs stable when %s changes",
  async (variable) => {
    const transform = remarkMermaidAssets();
    vi.stubEnv(variable, "first");
    const first = diagramTree();
    await transform(first);
    vi.stubEnv(variable, "second");
    const second = diagramTree();
    await transform(second);
    expect(second).toEqual(first);
  },
);

test("updates the named Mermaid SVG when diagram source changes", async () => {
  const transform = remarkMermaidAssets();
  const first = diagramTree();
  await transform(first);
  const second: Root = {
    type: "root",
    children: [{ type: "code", lang: "mermaid", meta: "Sample Diagram", value: "graph TD; A-->C" }],
  };
  render.mockResolvedValue([
    {
      status: "fulfilled",
      value: {
        svg: '<svg id="updated"></svg>',
        id: "updated",
        width: 100,
        height: 50,
      },
    },
  ]);
  await transform(second);
  expect(second).toEqual(first);
  const file = path.join(directory, "public/assets/mermaid/sample-diagram-light.svg");
  expect(readFileSync(file, "utf8")).toContain('id="updated"');
});

test("updates the named Mermaid SVG when diagram colors change", async () => {
  const transform = remarkMermaidAssets();
  const first = diagramTree();
  await transform(first);
  themeCss.mockReturnValue("text { color: blue; }");
  const second = diagramTree();
  await transform(second);
  expect(second).toEqual(first);
  const file = path.join(directory, "public/assets/mermaid/sample-diagram-light.svg");
  expect(readFileSync(file, "utf8")).toContain("text { color: blue; }");
});

test("uses normalized descriptive names with explicit theme suffixes", async () => {
  const tree: Root = {
    type: "root",
    children: [
      {
        type: "code",
        lang: "mermaid",
        meta: "  Sample / Diagram!  ",
        value: "graph TD; A-->B",
      },
    ],
  };
  await remarkMermaidAssets()(tree);
  expect(JSON.stringify(tree)).toContain("/assets/mermaid/sample-diagram-light.svg");
  expect(JSON.stringify(tree)).toContain("/assets/mermaid/sample-diagram-dark.svg");
});

test("rejects diagrams without a descriptive name", async () => {
  const tree: Root = {
    type: "root",
    children: [
      {
        type: "code",
        lang: "mermaid",
        value: "graph TD; A-->B",
      },
    ],
  };
  await expect(remarkMermaidAssets()(tree)).rejects.toThrow("descriptive name");
});

test("rejects duplicate normalized diagram names", async () => {
  const tree: Root = {
    type: "root",
    children: [
      { type: "code", lang: "mermaid", meta: "Sample Diagram", value: "graph TD; A-->B" },
      { type: "code", lang: "mermaid", meta: "sample-diagram", value: "graph TD; A-->C" },
    ],
  };
  await expect(remarkMermaidAssets()(tree)).rejects.toThrow("must be unique");
});

function diagramTree(): Root {
  return {
    type: "root",
    children: [
      {
        type: "code",
        lang: "mermaid",
        meta: "Sample Diagram",
        value: "graph TD; A-->B",
      },
    ],
  };
}
