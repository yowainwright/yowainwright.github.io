import { createHash } from "node:crypto";
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

const PUBLIC_ASSET_PATH = "/assets/mermaid";
const MERMAID_CONFIG = {
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

const getAssetName = (source: string) => {
  const hash = createHash("sha256")
    .update(source)
    .update(JSON.stringify(MERMAID_CONFIG))
    .digest("hex")
    .slice(0, 16);
  return `${hash}.svg`;
};

const getAltText = (result: RenderResult) =>
  result.title || result.description || "Mermaid diagram";

const createDiagramImage = (assetUrl: string, result: RenderResult): Image => ({
  type: "image",
  url: assetUrl,
  alt: getAltText(result),
  data: {
    hProperties: {
      className: ["post__image", "mermaid-diagram"],
      decoding: "async",
      height: result.height,
      loading: "lazy",
      width: result.width,
    },
  },
});

const createDiagramLink = (assetUrl: string, image: Image): Link => ({
  type: "link",
  url: assetUrl,
  title: "Open diagram in a new tab",
  children: [image],
  data: {
    hProperties: {
      className: ["mermaid-chart"],
      rel: "noopener noreferrer",
      target: "_blank",
    },
  },
});

const createDiagramNode = (assetUrl: string, result: RenderResult) => {
  const image = createDiagramImage(assetUrl, result);
  const link = createDiagramLink(assetUrl, image);
  const paragraph: Paragraph = { type: "paragraph", children: [link] };
  return paragraph;
};

const getRenderResult = (result: PromiseSettledResult<RenderResult>, index: number) => {
  if (result.status === "fulfilled") return result.value;
  throw new Error(`Unable to render Mermaid diagram ${index + 1}`, {
    cause: result.reason,
  });
};

const writeDiagramAsset = async (assetDirectory: string, source: string, result: RenderResult) => {
  const assetName = getAssetName(source);
  const assetPath = path.join(assetDirectory, assetName);
  const assetUrl = `${PUBLIC_ASSET_PATH}/${assetName}`;
  await writeFile(assetPath, result.svg, "utf8");
  return createDiagramNode(assetUrl, result);
};

const writeDiagramAssets = (
  assetDirectory: string,
  sources: string[],
  results: PromiseSettledResult<RenderResult>[],
) =>
  Promise.all(
    results.map((result, index) => {
      const renderResult = getRenderResult(result, index);
      const source = sources[index] || "";
      return writeDiagramAsset(assetDirectory, source, renderResult);
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

  const sources = instances.map(({ node }) => node.value);
  const results = await render(sources, { mermaidConfig: MERMAID_CONFIG });
  const assetDirectory = path.join(process.cwd(), "public", PUBLIC_ASSET_PATH);
  await mkdir(assetDirectory, { recursive: true });
  const diagrams = await writeDiagramAssets(assetDirectory, sources, results);
  replaceDiagramNodes(instances, diagrams);
};

export const remarkMermaidAssets = (options: CreateMermaidRendererOptions = {}) => {
  const render = createMermaidRenderer(options);
  return (tree: Root) => renderMermaidAssets(tree, render);
};
