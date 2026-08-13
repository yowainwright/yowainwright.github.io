import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import remarkParse from "remark-parse";
import { unified } from "unified";
import type { Node } from "unist";

export interface SearchItem {
  content: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  type: "page" | "post" | "project";
  url: string;
}

export type SearchMetadata = Omit<SearchItem, "content">;
export type SearchContentData = Record<string, string>;

type SearchNode = Node & {
  alt?: unknown;
  children?: SearchNode[];
  value?: unknown;
};

const PAGE_SLUGS = new Set(["about", "resume"]);
const SEARCHABLE_NODE_TYPES = new Set(["code", "inlineCode", "text"]);
const EMBEDDED_HTML_PATTERN = /<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi;
const HTML_ALT_PATTERN = /\balt=(["'])(.*?)\1/gi;
const HTML_TAG_PATTERN = /<[^>]+>/g;

const PROJECT_ROOT = process.cwd();
const CONTENT_DIR = path.join(PROJECT_ROOT, "content");
const PROJECTS_DIR =
  process.env.PROJECTS_CONTENT_DIR || path.join(PROJECT_ROOT, "projects", "content");
const SEARCH_DATA_OUTPUT_PATH = path.join(PROJECT_ROOT, "public", "search-data.json");
const SEARCH_CONTENT_OUTPUT_PATH = path.join(PROJECT_ROOT, "public", "search-content.json");

const getLiteralText = (node: SearchNode): string =>
  typeof node.value === "string" ? node.value : "";

const getHtmlText = (html: string): string => {
  const altText = Array.from(html.matchAll(HTML_ALT_PATTERN), (match) => match[2] || "").join(" ");
  const visibleText = html.replace(EMBEDDED_HTML_PATTERN, " ").replace(HTML_TAG_PATTERN, " ");
  return `${visibleText} ${altText}`;
};

const getNodeText = (node: SearchNode): string => {
  if (SEARCHABLE_NODE_TYPES.has(node.type)) return getLiteralText(node);
  if (node.type === "html") return getHtmlText(getLiteralText(node));

  const isImageNode = node.type === "image";
  if (!isImageNode) return "";
  if (typeof node.alt !== "string") return "";
  return node.alt;
};

const isMdxEsmParagraph = (node: SearchNode, isMdx: boolean): boolean => {
  if (!isMdx) return false;

  const isParagraph = node.type === "paragraph";
  if (!isParagraph) return false;

  const statement = (node.children || []).map(getLiteralText).join(" ").trim();
  const isImport = statement.startsWith("import ");
  if (isImport) return true;
  return statement.startsWith("export ");
};

const getSearchNodeText = (node: SearchNode, isMdx: boolean): string => {
  if (isMdxEsmParagraph(node, isMdx)) return "";

  const nodeText = getNodeText(node);
  const childText = (node.children || []).map((child) => getSearchNodeText(child, isMdx)).join(" ");
  return [nodeText, childText].filter(Boolean).join(" ");
};

export const extractSearchText = (markdown: string, isMdx = false): string => {
  const tree = unified().use(remarkParse).parse(markdown) as SearchNode;
  return getSearchNodeText(tree, isMdx).replace(/\s+/g, " ").trim();
};

const getStringValues = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
};

const getSearchTags = (frontmatter: Record<string, unknown>): string[] => {
  const tags = getStringValues(frontmatter.tags);
  const categories = getStringValues(frontmatter.categories);
  return Array.from(new Set(tags.concat(categories)));
};

const getContentType = (slug: string): SearchItem["type"] => {
  if (PAGE_SLUGS.has(slug)) return "page";
  return "post";
};

const readSearchFile = (directory: string, fileName: string) => {
  const filePath = path.join(directory, fileName);
  const source = fs.readFileSync(filePath, "utf8");
  const slug = fileName.replace(/\.(md|mdx)$/, "");
  return Object.assign({ slug }, matter(source));
};

const getPostSearchItem = (contentDir: string, fileName: string): SearchItem | null => {
  const { content, data: frontmatter, slug } = readSearchFile(contentDir, fileName);
  if (slug === "404") return null;

  const description = frontmatter.meta || frontmatter.description || "";
  const title = frontmatter.title || slug;
  const tags = getSearchTags(frontmatter);
  const isMdx = fileName.endsWith(".mdx");
  const searchContent = extractSearchText(content, isMdx);
  const type = getContentType(slug);
  const url = `/${slug}/`;
  return { content: searchContent, title, description, slug, tags, type, url };
};

const getProjectSearchItem = (projectsDir: string, fileName: string): SearchItem => {
  const { content, data: frontmatter, slug } = readSearchFile(projectsDir, fileName);
  const description = frontmatter.description || frontmatter.tagline || "";
  const title = frontmatter.title || slug;
  const tags = getSearchTags(frontmatter);
  const isMdx = fileName.endsWith(".mdx");
  const searchContent = extractSearchText(content, isMdx);
  const url = `https://jeffry.in/projects/${slug}/`;
  return { content: searchContent, title, description, slug, tags, type: "project", url };
};

export function getPostsSearchData(contentDir = CONTENT_DIR): SearchItem[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts = files.map((fileName) => getPostSearchItem(contentDir, fileName));

  return posts.filter((item): item is SearchItem => item !== null);
}

export function getProjectsSearchData(projectsDir = PROJECTS_DIR): SearchItem[] {
  const projectsExist = fs.existsSync(projectsDir);
  if (!projectsExist) {
    console.log("Projects directory not found, skipping projects.");
    return [];
  }

  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  return files.map((fileName) => getProjectSearchItem(projectsDir, fileName));
}

export function buildSearchData(contentDir = CONTENT_DIR, projectsDir = PROJECTS_DIR) {
  const posts = getPostsSearchData(contentDir);
  const projects = getProjectsSearchData(projectsDir);
  return posts.concat(projects);
}

const toSearchMetadata = (item: SearchItem): SearchMetadata => ({
  title: item.title,
  description: item.description,
  slug: item.slug,
  tags: item.tags,
  type: item.type,
  url: item.url,
});

const toSearchContentEntry = ({ url, content }: SearchItem): [string, string] => {
  const normalizedContent = content.toLowerCase();
  return [url, normalizedContent];
};

export const getSearchMetadata = (searchData: SearchItem[]): SearchMetadata[] =>
  searchData.map(toSearchMetadata);

export const getSearchContentData = (searchData: SearchItem[]): SearchContentData =>
  Object.fromEntries(searchData.map(toSearchContentEntry));

const writeJson = (value: unknown, outputPath: string) => {
  const publicDir = path.dirname(outputPath);
  const publicExists = fs.existsSync(publicDir);
  if (!publicExists) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(value));
};

export function writeSearchData(
  searchData: SearchItem[],
  outputPath = SEARCH_DATA_OUTPUT_PATH,
  contentOutputPath = path.join(
    path.dirname(outputPath),
    path.basename(SEARCH_CONTENT_OUTPUT_PATH),
  ),
) {
  writeJson(getSearchMetadata(searchData), outputPath);
  writeJson(getSearchContentData(searchData), contentOutputPath);
}

export function main() {
  const posts = getPostsSearchData();
  const projects = getProjectsSearchData();
  const searchData = posts.concat(projects);

  writeSearchData(searchData);
  console.log(`Generated search data: ${searchData.length} items`);
  console.log(`  - Posts: ${posts.length}`);
  console.log(`  - Projects: ${projects.length}`);
}

if (import.meta.main) {
  main();
}
