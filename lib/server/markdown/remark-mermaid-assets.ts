import { existsSync, readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  createMermaidRenderer,
  type CreateMermaidRendererOptions,
  type MermaidRenderer,
  type RenderResult,
} from "mermaid-isomorphic";
import type { Code, Image, Link, Paragraph, Parent, Root } from "mdast";
import type { Node } from "unist";
import { getMermaidThemeCss } from "./mermaid-theme";
import { isRecord, withBuildCache } from "./build-cache";

const PUBLIC_ASSET_PATH = "/assets/mermaid";
const MERMAID_CONFIG = {
  deterministicIds: true,
  deterministicIDSeed: "mermaid",
  theme: "base" as const,
  themeVariables: {
    primaryColor: "#f2f2f2",
    primaryTextColor: "#000000",
    primaryBorderColor: "#0000ff",
    lineColor: "#0000ff",
    secondaryColor: "#f9f9f9",
    tertiaryColor: "#ffffff",
    background: "#ffffff",
    mainBkg: "#f2f2f2",
    secondBkg: "#f9f9f9",
    tertiaryBkg: "#ffffff",
    nodeBorder: "#0000ff",
    clusterBkg: "#f9f9f9",
    clusterBorder: "#999999",
    defaultLinkColor: "#0000ff",
    titleColor: "#000000",
    edgeLabelBackground: "#ffffff",
  },
};

type MermaidInstance = {
  index: number;
  node: Code;
  parent: Parent;
};

const isParent = (node: Node): node is Parent => "children" in node && Array.isArray(node.children);

const isMermaidCode = (node: Node): node is Code => {
  if (node.type !== "code") return false;
  return (node as Code).lang === "mermaid";
};

const getNestedInstances = (node: Node): MermaidInstance[] => {
  if (!isParent(node)) return [];
  return getMermaidInstances(node);
};

const getDirectInstance = (node: Node, parent: Parent, index: number): MermaidInstance[] => {
  if (!isMermaidCode(node)) return [];
  return [{ index, node, parent }];
};

const getMermaidInstances = (parent: Parent): MermaidInstance[] =>
  parent.children.flatMap((node, index) => {
    const directInstances = getDirectInstance(node, parent, index);
    const nestedInstances = getNestedInstances(node);
    return directInstances.concat(nestedInstances);
  });

const getDiagramName = ({ node }: MermaidInstance) => {
  const name = (node.meta || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const normalized = name.replace(/^-|-$/g, "");
  if (!normalized) throw new Error("Give each Mermaid code fence a descriptive name after mermaid");
  return normalized;
};

const getAltText = (result: RenderResult) =>
  result.title || result.description || "Mermaid diagram";

const createDiagramImage = (
  assetUrl: string,
  darkAssetUrl: string,
  result: RenderResult,
): Image => ({
  type: "image",
  url: assetUrl,
  alt: getAltText(result),
  data: {
    hProperties: {
      className: ["post__image", "mermaid-diagram"],
      "data-dark-src": darkAssetUrl,
      decoding: "async",
      height: result.height,
      loading: "lazy",
      width: result.width,
    },
  },
});

const createDiagramLink = (assetUrl: string, darkAssetUrl: string, image: Image): Link => ({
  type: "link",
  url: assetUrl,
  title: "Open diagram in a new tab",
  children: [image],
  data: {
    hProperties: {
      className: ["mermaid-chart"],
      "data-dark-href": darkAssetUrl,
      rel: ["noopener", "noreferrer"],
      target: "_blank",
    },
  },
});

const createDiagramNode = (assetUrl: string, darkAssetUrl: string, result: RenderResult) => {
  const image = createDiagramImage(assetUrl, darkAssetUrl, result);
  const link = createDiagramLink(assetUrl, darkAssetUrl, image);
  const paragraph: Paragraph = { type: "paragraph", children: [link] };
  return paragraph;
};

const getRenderResult = (result: PromiseSettledResult<RenderResult>, index: number) => {
  if (result.status === "fulfilled") return result.value;
  throw new Error(`Unable to render Mermaid diagram ${index + 1}`, {
    cause: result.reason,
  });
};

const writeDiagramAsset = async (
  assetDirectory: string,
  assetName: string,
  result: RenderResult,
  themeCss: string,
) => {
  const assetPath = path.join(assetDirectory, assetName);
  const assetUrl = `${PUBLIC_ASSET_PATH}/${assetName}`;
  const svg = result.svg.replace("</svg>", `<style>${themeCss}</style></svg>`);
  const unchanged = existsSync(assetPath) && readFileSync(assetPath, "utf8") === svg;
  if (unchanged) return assetUrl;
  await writeFile(assetPath, svg, "utf8");
  return assetUrl;
};

const writeDiagramAssets = (
  assetDirectory: string,
  names: string[],
  results: RenderResult[],
  themeCss: { light: string; dark: string },
) =>
  Promise.all(
    results.map(async (renderResult, index) => {
      const name = names[index];
      const lightName = `${name}-light.svg`;
      const darkName = `${name}-dark.svg`;
      const [light, dark] = await Promise.all([
        writeDiagramAsset(assetDirectory, lightName, renderResult, themeCss.light),
        writeDiagramAsset(assetDirectory, darkName, renderResult, themeCss.dark),
      ]);
      return createDiagramNode(light, dark, renderResult);
    }),
  );

const replaceDiagramNodes = (instances: MermaidInstance[], diagrams: Paragraph[]) => {
  diagrams.forEach((diagram, index) => {
    const instance = instances[index];
    if (!instance) return;
    instance.parent.children[instance.index] = diagram;
  });
};

const renderMermaidAssets = async (tree: Root, render: MermaidRenderer) => {
  const instances = getMermaidInstances(tree);
  if (instances.length === 0) return;

  const names = instances.map(getDiagramName);
  if (new Set(names).size !== names.length) throw new Error("Mermaid diagram names must be unique");
  const sources = instances.map(({ node }) => node.value);
  const light = getMermaidThemeCss("light");
  const dark = getMermaidThemeCss("dark");
  const themeCss = { light, dark };
  const input = JSON.stringify([sources, MERMAID_CONFIG]);
  const results = await withBuildCache(
    "mermaid",
    input,
    async () => {
      const rendered = await render(sources, { mermaidConfig: MERMAID_CONFIG });
      return rendered.map(getRenderResult);
    },
    (value): value is RenderResult[] => isCachedRenderResults(value, sources.length),
  );
  const assetDirectory = path.join(process.cwd(), "public", PUBLIC_ASSET_PATH);
  await mkdir(assetDirectory, { recursive: true });
  const diagrams = await writeDiagramAssets(assetDirectory, names, results, themeCss);
  replaceDiagramNodes(instances, diagrams);
};

export const remarkMermaidAssets = (options: CreateMermaidRendererOptions = {}) => {
  const render = createMermaidRenderer(options);
  return (tree: Root) => renderMermaidAssets(tree, render);
};

function isCachedRenderResults(value: unknown, count: number): value is RenderResult[] {
  if (!Array.isArray(value)) return false;
  const valid = value.length === count && value.every(isCachedRenderResult);
  return valid;
}

function isCachedRenderResult(result: unknown): result is RenderResult {
  if (!isRecord(result)) return false;
  const hasSvg = typeof result.svg === "string";
  const hasId = typeof result.id === "string";
  const hasDimensions = typeof result.width === "number" && typeof result.height === "number";
  const valid = hasSvg && hasId && hasDimensions;
  return valid;
}
