import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sanitize from "sanitize-filename";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import rehypeShiki from "@shikijs/rehype";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from "@shikijs/transformers";
import { rendererClassic, transformerTwoslash } from "@shikijs/twoslash";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import customDark from "./themes/dark.json";
import customLight from "./themes/light.json";

export const getPath = (folder: string) =>
  path.join(process.cwd(), `/${folder}`);

export const getFileContent = (filename: string, folder: string) => {
  const contentDir = getPath(folder);
  const file = sanitize(filename);
  return fs.readFileSync(path.join(contentDir, file), "utf8");
};

export const getAllPosts = (folder: string) => {
  const contentDir = getPath(folder);
  const files = fs.readdirSync(contentDir);
  return files.map((fileName) => {
    const source = getFileContent(fileName, folder);
    const slug = fileName.split(".")[0];
    const { data: frontmatter } = matter(source);
    const { date, ...rest } = frontmatter;
    const prettyDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return {
      frontmatter: {
        ...rest,
        date: prettyDate,
      },
      slug,
    };
  });
};

export const getAllPostsArchive = (folder: string) => {
  const posts = getAllPosts(folder);
  return posts
    .filter(({ slug }: any) => !["404", "about", "resume"].includes(slug))
    .sort(
      (a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date),
    );
};

export const getAllNewPosts = (folder: string) => {
  const posts = getAllPosts(folder);
  return posts
    .filter(({ slug }: any) => !["404", "about", "resume"].includes(slug))
    .sort(
      (a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date),
    )
    .slice(0, 10);
};

export const getSinglePost = (slug: string, folder: string) => {
  const source = getFileContent(`${slug}.md`, folder);
  const { data: frontmatter, content } = matter(source);
  const { date, path, ...rest } = frontmatter;
  const prettyDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const trimmedPath = `/${path.split("/")[1]}`;
  return {
    frontmatter: {
      ...rest,
      date: prettyDate,
      path: trimmedPath,
    },
    content,
    slug,
  };
};

export const markdownToHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse, { allowDangerousHtml: true })
    .use(remarkRehype)
    .use(rehypeShiki, {
      themes: {
        dark: customDark,
        light: customLight,
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
        transformerMetaHighlight(),
        transformerMetaWordHighlight(),
        transformerColorizedBrackets(),
        transformerTwoslash({
          explicitTrigger: true,
          renderer: rendererClassic(),
        }),
      ],
    })
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
};
