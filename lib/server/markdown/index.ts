import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import rehypeShiki, { type RehypeShikiOptions } from "@shikijs/rehype";
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
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import customDark from "../themes/dark.json" with { type: "json" };
import customLight from "../themes/light.json" with { type: "json" };
import { TOOLTIP_PATTERN, HEADING_REGEX, COMMENT_PREFIXES } from "./constants";
import type {
  MarkdownCodeOptions,
  MarkdownContent,
  MarkdownElement,
  MarkdownElementContent,
  MarkdownPropertyValue,
  MarkdownRoot,
  MarkdownTextNode,
  MarkdownTheme,
  MarkdownTransformer,
  TooltipEntry,
} from "./types";
import {
  getMarkdownFiles,
  getDraftFiles,
  getPath,
  parsePost,
  parseSinglePost,
  filterPublishedPosts,
  sortPostsByDate,
} from "./utils";

const MARKDOWN_CACHE_VERSION = "markdown-html-v3";
const MARKDOWN_CACHE_DIR = path.join(process.cwd(), ".cache", "markdown-html");
let codeBlockUid = 0;

const isElement = (node: MarkdownContent): node is MarkdownElement => node.type === "element";

const isTextNode = (node: MarkdownElementContent): node is MarkdownTextNode => node.type === "text";

const getPropertyStrings = (value: MarkdownPropertyValue | undefined): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  return typeof value === "string" ? [value] : [];
};

const getPropertyString = (value: MarkdownPropertyValue | undefined): string | undefined => {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return undefined;
};

const hasClass = (node: MarkdownElement, className: string) => {
  const classes = [
    ...getPropertyStrings(node.properties.class),
    ...getPropertyStrings(node.properties.className),
  ];

  return classes.includes(className);
};

const appendClassName = (node: MarkdownElement, className: string) => {
  node.properties.className = [...getPropertyStrings(node.properties.className), className];
};

const getFirstText = (element: MarkdownElementContent): string => {
  if (isTextNode(element)) return element.value;
  if (isElement(element)) {
    const firstChild = element.children[0];
    return firstChild ? getFirstText(firstChild) : "";
  }

  return "";
};

export const getAllPosts = (folder: string) => {
  const files = getMarkdownFiles(folder);
  const draftFiles = getDraftFiles();
  const allFiles = files.concat(draftFiles);

  const isDev = process.env.NODE_ENV === "development";

  return allFiles.map((fileName) => {
    let fileFolder = folder;

    const draftPath = path.join(getPath("drafts"), fileName);
    const isInDrafts = isDev && fs.existsSync(draftPath);
    if (isInDrafts) {
      fileFolder = "drafts";
    }

    return parsePost(fileName, fileFolder);
  });
};

export const getAllPostsArchive = (folder: string) => {
  const posts = getAllPosts(folder);
  const publishedPosts = filterPublishedPosts(posts);
  return sortPostsByDate(publishedPosts);
};

export const getAllNewPosts = (folder: string) => {
  const posts = getAllPosts(folder);
  const publishedPosts = filterPublishedPosts(posts);
  const sortedPosts = sortPostsByDate(publishedPosts);
  return sortedPosts.slice(0, 10);
};

export const getSinglePost = (slug: string, folder: string) => {
  return parseSinglePost(slug, folder);
};

function transformerDiffLines(): MarkdownTransformer {
  return {
    name: "diff-lines",
    code(node) {
      node.children.forEach((line) => {
        if (!isElement(line)) return;
        const firstChild = line.children[0];
        if (!firstChild) return;

        const firstText = getFirstText(firstChild);

        const isAddition = firstText.startsWith("+");
        const isRemoval = firstText.startsWith("-");
        const shouldProcessDiff = isAddition || isRemoval;

        if (!shouldProcessDiff) return;

        const diffType = isAddition ? "add" : "remove";
        this.addClassToHast(line, ["diff", diffType]);
      });
    },
    pre(node) {
      const isDiffLanguage = this.options.lang === "diff";
      if (isDiffLanguage) {
        node.properties = {
          ...node.properties,
          "data-language": "diff",
        };
      }
    },
  };
}

function transformerTitle(): MarkdownTransformer {
  return {
    name: "title",
    preprocess(code: string, options: MarkdownCodeOptions) {
      const hasTitle = code.includes("[title:");
      if (!hasTitle) return code;

      const lines = code.split("\n");
      const firstLine = lines[0] ?? "";

      const titleStart = firstLine.indexOf("[title:");
      const titleEnd = firstLine.indexOf("]", titleStart);

      const hasTitleBounds = titleStart !== -1 && titleEnd > titleStart;
      if (!hasTitleBounds) return code;

      const isComment = COMMENT_PREFIXES.some((prefix) => firstLine.startsWith(prefix));

      const shouldProcessTitle = isComment && options;
      if (!shouldProcessTitle) return code;

      const title = firstLine.slice(titleStart + 7, titleEnd).trim();
      options.meta = { ...options.meta, title };
      return lines.slice(1).join("\n");
    },
    pre(node) {
      const title = getPropertyString(node.properties.title);
      if (!title) return;

      const titleNode: MarkdownElement = {
        type: "element",
        tagName: "div",
        properties: { class: "shiki-title" },
        children: [{ type: "text", value: title }],
      };

      node.children = [titleNode, ...node.children];
      delete node.properties?.title;
    },
  };
}

function transformerLanguageBadge(): MarkdownTransformer {
  return {
    name: "language-badge",
    root(root) {
      root.children = root.children.map((node) => {
        const isPreElement = isElement(node) && node.tagName === "pre";
        const hasShikiClass = isPreElement && hasClass(node, "shiki");
        const shouldProcess = isPreElement && hasShikiClass;
        if (!shouldProcess) return node;

        const lang =
          getPropertyString(node.properties["data-language"]) || this.options.lang || "text";
        node.properties["data-language"] = lang;

        return node;
      });

      return root;
    },
  };
}

function transformerCodeWrapper(): MarkdownTransformer {
  return {
    name: "code-wrapper",
    root(root) {
      root.children = root.children.map((node) => {
        const isPreElement = isElement(node) && node.tagName === "pre";
        const hasShikiClass = isPreElement && hasClass(node, "shiki");
        const shouldProcess = isPreElement && hasShikiClass;
        if (!shouldProcess) return node;

        const blockId = `code-block-${++codeBlockUid}`;
        const lang =
          getPropertyString(node.properties["data-language"]) || this.options.lang || "text";

        let titleElement: MarkdownElementContent | null = null;
        const codeChildren: MarkdownElementContent[] = [];

        node.children.forEach((child) => {
          const isTitle = isElement(child) && hasClass(child, "shiki-title");
          if (isTitle) {
            titleElement = child;
          } else {
            codeChildren.push(child);
          }
        });

        node.children = codeChildren;
        node.properties = { ...node.properties, id: blockId };

        const headerChildren: MarkdownElementContent[] = [];

        if (titleElement) {
          headerChildren.push(titleElement);
        }

        const languageBadge: MarkdownElement = {
          type: "element",
          tagName: "div",
          properties: { class: "shiki-language" },
          children: [{ type: "text", value: lang.toUpperCase() }],
        };

        const copyButtonPlaceholder: MarkdownElement = {
          type: "element",
          tagName: "div",
          properties: {
            class: "copy-button-placeholder",
            "data-code-id": blockId,
          },
          children: [],
        };

        const wrapperChildren: MarkdownElementContent[] = [];

        if (titleElement) {
          const header: MarkdownElement = {
            type: "element",
            tagName: "div",
            properties: { class: "shiki-header" },
            children: headerChildren,
          };
          wrapperChildren.push(header);
        }

        wrapperChildren.push(languageBadge);
        wrapperChildren.push(copyButtonPlaceholder);
        wrapperChildren.push(node);

        return {
          type: "element",
          tagName: "div",
          properties: { class: "shiki-wrapper" },
          children: wrapperChildren,
        } satisfies MarkdownElement;
      });

      return root;
    },
  };
}

function transformerTooltip(): MarkdownTransformer {
  let tooltips: TooltipEntry[] = [];

  return {
    name: "tooltip",
    preprocess(code: string) {
      tooltips = [];
      let match: RegExpExecArray | null;

      TOOLTIP_PATTERN.lastIndex = 0;
      while ((match = TOOLTIP_PATTERN.exec(code)) !== null) {
        const word = match[1];
        const tooltip = match[2];
        if (!word || !tooltip) continue;

        tooltips.push({
          word,
          tooltip: tooltip.trim(),
          full: match[0],
        });
      }

      TOOLTIP_PATTERN.lastIndex = 0;
      return code.replace(TOOLTIP_PATTERN, "$1");
    },
    span(node) {
      const firstChild = node.children[0];
      const nodeText = firstChild && isTextNode(firstChild) ? firstChild.value : "";

      if (!nodeText) return;

      const matchingTooltip = tooltips.find((tooltip) => nodeText.includes(tooltip.word));
      if (!matchingTooltip) return;

      node.tagName = "span";
      node.properties = {
        ...node.properties,
        class: [...getPropertyStrings(node.properties.class), "shiki-tooltip"],
        "data-tooltip": matchingTooltip.tooltip,
        role: "tooltip",
        "aria-label": matchingTooltip.tooltip,
        tabindex: "0",
      };
    },
  };
}

function addHeadingClass() {
  return (tree: MarkdownRoot) => {
    visit(tree, "element", (node: MarkdownElement) => {
      const isHeading = HEADING_REGEX.test(node.tagName);
      if (!isHeading) return;

      appendClassName(node, "content-header");
    });
  };
}

function addLazyLoadingToImages() {
  return (tree: MarkdownRoot) => {
    visit(tree, "element", (node: MarkdownElement) => {
      const isImage = node.tagName === "img";
      if (!isImage) return;

      node.properties.loading = "lazy";
      node.properties.decoding = "async";
    });
  };
}

export function getShikiRehypeOptions(): RehypeShikiOptions {
  return {
    themes: {
      dark: customDark as MarkdownTheme,
      light: customLight as MarkdownTheme,
    },
    transformers: [
      transformerTitle(),
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      transformerNotationFocus(),
      transformerNotationErrorLevel(),
      transformerMetaHighlight(),
      transformerMetaWordHighlight(),
      transformerColorizedBrackets(),
      transformerDiffLines(),
      transformerTooltip(),
      transformerLanguageBadge(),
      transformerCodeWrapper(),
    ],
  };
}

function createProcessor() {
  return unified()
    .use(remarkParse, { allowDangerousHtml: true })
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(addHeadingClass)
    .use(addLazyLoadingToImages)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        className: ["heading-icon-placeholder"],
        ariaLabel: "Link to section",
      },
      content: [],
    })
    .use(rehypeShiki, getShikiRehypeOptions())
    .use(rehypeStringify);
}

let cachedProcessor: ReturnType<typeof createProcessor> | null = null;

function getProcessor(): ReturnType<typeof createProcessor> {
  if (!cachedProcessor) {
    cachedProcessor = createProcessor();
  }

  return cachedProcessor;
}

export const markdownToHtml = async (markdown: string) => {
  const cacheKey = crypto
    .createHash("sha256")
    .update(MARKDOWN_CACHE_VERSION)
    .update(markdown)
    .digest("hex");
  const cachePath = path.join(MARKDOWN_CACHE_DIR, `${cacheKey}.html`);
  const cachedHtml = fs.existsSync(cachePath) ? fs.readFileSync(cachePath, "utf8") : null;

  if (cachedHtml) return cachedHtml;

  const processor = getProcessor();
  const result = await processor.process(markdown);
  const html = result.toString();

  fs.mkdirSync(MARKDOWN_CACHE_DIR, { recursive: true });
  fs.writeFileSync(cachePath, html);

  return html;
};
