import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sanitize from "sanitize-filename";
import {
  CONTENT_DIR,
  DRAFTS_DIR,
  EXCLUDED_SLUGS,
  DATE_FORMAT_OPTIONS,
  MARKDOWN_EXT_REGEX,
} from "./constants";
import { Post } from "./types";

const CONTENT_PATH = path.join(process.cwd(), "content");
const DRAFTS_PATH = path.join(process.cwd(), "drafts");
const DATE_ONLY_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;
const UTC_MIDNIGHT_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T00:00:00\.000Z$/;

export const getPath = (folder: string) => {
  if (folder === CONTENT_DIR) {
    return CONTENT_PATH;
  }

  if (folder === DRAFTS_DIR) {
    return DRAFTS_PATH;
  }

  throw new Error(`Unsupported markdown folder: ${folder}`);
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

export const getFrontmatterDateValue = (date: unknown): string => {
  if (typeof date === "string") return date;

  const isValidDate = date instanceof Date && !Number.isNaN(date.getTime());

  if (isValidDate) {
    return date.toISOString();
  }

  return "";
};

export const formatDate = (date: unknown) => {
  const dateValue = getFrontmatterDateValue(date);
  const dateOnlyMatch =
    dateValue.match(DATE_ONLY_REGEX) ||
    dateValue.match(UTC_MIDNIGHT_DATE_REGEX);

  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;
    const localDate = new Date(Number(year), Number(month) - 1, Number(day));
    return localDate.toLocaleDateString("en-US", DATE_FORMAT_OPTIONS);
  }

  return new Date(dateValue).toLocaleDateString("en-US", DATE_FORMAT_OPTIONS);
};

export const extractSlugFromFilename = (fileName: string): string => {
  return fileName.split(".")[0] ?? fileName;
};

export const parsePost = (fileName: string, fileFolder: string): Post => {
  const source = getFileContent(fileName, fileFolder);
  const slug = extractSlugFromFilename(fileName);
  const { data: frontmatter } = matter(source);
  const { date, path: postPath, title, ...rest } = frontmatter;
  const pathValue = typeof postPath === "string" ? postPath : `/${slug}`;
  const titleValue = typeof title === "string" ? title : slug;

  return {
    frontmatter: Object.assign({}, rest, {
      date: formatDate(date),
      path: pathValue,
      title: titleValue,
    }),
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
  return `/${postPath.split("/")[1] ?? postPath}`;
};

export const parseSinglePost = (slug: string, folder: string): Post => {
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
  const pathValue = typeof postPath === "string" ? postPath : `/${slug}`;
  const titleValue = typeof title === "string" ? title : slug;

  return {
    frontmatter: Object.assign({}, rest, {
      description,
      meta,
      title: titleValue,
      tags,
      date: formatDate(date),
      path: trimPostPath(pathValue),
    }),
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

  if (!isDev) {
    return [];
  }

  const hasDraftsDir = fs.existsSync(draftsDir);
  if (!hasDraftsDir) {
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
  return posts
    .slice()
    .sort(
      (a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date),
    );
};
