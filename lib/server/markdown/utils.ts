import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sanitize from "sanitize-filename";
import {
  PROJECT_ROOT,
  CONTENT_DIR,
  DRAFTS_DIR,
  EXCLUDED_SLUGS,
  DATE_FORMAT_OPTIONS,
  MARKDOWN_EXT_REGEX,
} from "./constants";
import { Post } from "./types";

const PATH_MAP = new Map([
  ["content", CONTENT_DIR],
  ["drafts", DRAFTS_DIR],
]);

export const getPath = (folder: string) => {
  const mappedDir = PATH_MAP.get(folder);
  return path.join(PROJECT_ROOT, mappedDir || folder);
};

const tryReadFile = (filePath: string): string | null => {
  try {
    return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
  } catch {
    return null;
  }
};

export const getFileContent = (filename: string, folder: string): string => {
  const contentDir = getPath(folder);
  const file = sanitize(filename);

  const directPath = path.join(contentDir, file);
  const directContent = tryReadFile(directPath);
  if (directContent) return directContent;

  const withoutExt = file.replace(MARKDOWN_EXT_REGEX, "");
  const extensions = [".mdx", ".md"];

  for (const ext of extensions) {
    const filePath = path.join(contentDir, `${withoutExt}${ext}`);
    const content = tryReadFile(filePath);
    if (content) return content;
  }

  throw new Error(`File not found: ${filename} in ${folder}`);
};

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", DATE_FORMAT_OPTIONS);

export const extractSlugFromFilename = (fileName: string): string => {
  return fileName.split(".")[0];
};

export const parsePost = (fileName: string, fileFolder: string) => {
  const source = getFileContent(fileName, fileFolder);
  const slug = extractSlugFromFilename(fileName);
  const { data: frontmatter } = matter(source);
  const { date, ...rest } = frontmatter;

  return {
    frontmatter: {
      ...rest,
      date: formatDate(date),
    },
    slug,
  };
};

const determineFileFolder = (slug: string, folder: string): string => {
  const isDev = process.env.NODE_ENV === "development";
  if (!isDev) return folder;

  const draftsPath = getPath("drafts");
  const draftExists =
    fs.existsSync(path.join(draftsPath, `${slug}.mdx`)) ||
    fs.existsSync(path.join(draftsPath, `${slug}.md`));

  return draftExists ? "drafts" : folder;
};

const detectMarkdownType = (
  slug: string,
  folder: string,
): { fileName: string; isMdx: boolean } => {
  const mdxPath = path.join(getPath(folder), `${slug}.mdx`);
  const isMdx = fs.existsSync(mdxPath);
  const fileName = `${slug}.${isMdx ? "mdx" : "md"}`;

  return { fileName, isMdx };
};

const trimPostPath = (postPath: string): string => {
  return `/${postPath.split("/")[1]}`;
};

export const parseSinglePost = (slug: string, folder: string) => {
  const fileFolder = determineFileFolder(slug, folder);
  const { fileName, isMdx } = detectMarkdownType(slug, fileFolder);

  const source = getFileContent(fileName, fileFolder);
  const { data: frontmatter, content } = matter(source);
  const {
    date,
    path: postPath,
    meta,
    description,
    title,
    tags,
    ...rest
  } = frontmatter;

  return {
    frontmatter: {
      ...rest,
      description,
      meta,
      title,
      tags,
      date: formatDate(date),
      path: trimPostPath(postPath),
    },
    content,
    slug,
    isMdx,
  };
};

export const getMarkdownFiles = (folder: string) => {
  const contentDir = getPath(folder);
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
};

export const getDraftFiles = () => {
  const draftsDir = getPath("drafts");
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev || !fs.existsSync(draftsDir)) {
    return [];
  }

  return fs
    .readdirSync(draftsDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
};

export const filterPublishedPosts = (posts: Post[]) => {
  return posts.filter(({ slug }: Post) => !EXCLUDED_SLUGS.has(slug));
};

export const sortPostsByDate = (posts: Post[]) => {
  return [...posts].sort(
    (a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date),
  );
};
