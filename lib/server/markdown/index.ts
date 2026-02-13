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
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import type { Element } from "hast";
import { TransformerNode } from "./types";
import customDark from "../../../themes/dark.json" with { type: "json" };
import customLight from "../../../themes/light.json" with { type: "json" };
import { TOOLTIP_PATTERN, HEADING_REGEX, COMMENT_PREFIXES } from "./constants";
import {
  getMarkdownFiles,
  getDraftFiles,
  getPath,
  parsePost,
  parseSinglePost,
  filterPublishedPosts,
  sortPostsByDate,
} from "./utils";

export const getAllPosts = (folder: string) => {
  const files = getMarkdownFiles(folder);
  const draftFiles = getDraftFiles();
  const allFiles = files.concat(draftFiles);

  const isDev = process.env.NODE_ENV === "development";

  return allFiles.map((fileName) => {
    let fileFolder = folder;

    const draftPath = require("path").join(getPath("drafts"), fileName);
    const isInDrafts = isDev && require("fs").existsSync(draftPath);
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

function transformerDiffLines() {
  return {
    name: "diff-lines",
    code(node: TransformerNode) {
      node.children?.forEach((line: TransformerNode) => {
        const hasNoChildren = !line.children || line.children?.length === 0;
        if (hasNoChildren) return;

        let firstText = "";
        const getFirstText = (element: TransformerNode): string => {
          const isText = element.type === "text";
          if (isText) return element.value;
          const hasChildren = element.children?.length > 0;
          if (hasChildren) {
            return getFirstText(element.children?.[0]);
          }
          return "";
        };

        firstText = getFirstText(line.children[0]);

        const isAddition = firstText.startsWith("+");
        const isRemoval = firstText.startsWith("-");
        const shouldProcessDiff = isAddition || isRemoval;

        if (!shouldProcessDiff) return;

        if (!line.properties) line.properties = {};
        if (!line.properties?.class) line.properties.class = [];

        const isClassArray = Array.isArray(line.properties?.class);
        const diffType = isAddition ? "add" : "remove";

        if (isClassArray) {
          line.properties?.class?.push("diff", diffType);
        } else {
          line.properties.class = [line.properties?.class, "diff", diffType];
        }
      });
    },
    pre(node: TransformerNode, options: { lang?: string }) {
      const isDiffLanguage = options?.lang === "diff";
      if (isDiffLanguage) {
        node.properties = {
          ...node.properties,
          "data-language": "diff",
        };
      }
    },
  };
}

function transformerTitle() {
  return {
    name: "title",
    preprocess(code, options) {
      const hasTitle = code.includes("[title:");
      if (!hasTitle) return code;

      const lines = code.split("\n");
      const firstLine = lines[0];

      const titleStart = firstLine.indexOf("[title:");
      const titleEnd = firstLine.indexOf("]", titleStart);

      const hasTitleBounds = titleStart !== -1 && titleEnd > titleStart;
      if (!hasTitleBounds) return code;

      const isComment = COMMENT_PREFIXES.some((prefix) =>
        firstLine.startsWith(prefix),
      );

      const shouldProcessTitle = isComment && options;
      if (!shouldProcessTitle) return code;

      const title = firstLine.slice(titleStart + 7, titleEnd).trim();
      options.meta = { ...options.meta, title };
      return lines.slice(1).join("\n");
    },
    pre(node) {
      if (!node.properties) node.properties = {};

      const title = node.properties?.title;
      if (!title) return;

      const titleNode = {
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

function transformerLanguageBadge() {
  return {
    name: "language-badge",
    root(root) {
      root.children = root.children.map((node) => {
        const isPreElement = node.type === "element" && node.tagName === "pre";
        const hasShikiClass = node.properties?.class?.includes("shiki");
        const shouldProcess = isPreElement && hasShikiClass;
        if (!shouldProcess) return node;

        const lang =
          node.properties["data-language"] || this.options?.lang || "text";
        node.properties["data-language"] = lang;

        return node;
      });

      return root;
    },
  };
}

function transformerCodeWrapper() {
  return {
    name: "code-wrapper",
    root(root) {
      let codeBlockId = 0;

      root.children = root.children.map((node) => {
        const isPreElement = node.type === "element" && node.tagName === "pre";
        const hasShikiClass = node.properties?.class?.includes("shiki");
        const shouldProcess = isPreElement && hasShikiClass;
        if (!shouldProcess) return node;

        const blockId = `code-block-${++codeBlockId}`;
        const lang =
          node.properties["data-language"] || this.options?.lang || "text";

        let titleElement = null;
        const codeChildren = [];

        node.children.forEach((child) => {
          const isTitle = child.properties?.class === "shiki-title";
          if (isTitle) {
            titleElement = child;
          } else {
            codeChildren.push(child);
          }
        });

        node.children = codeChildren;
        node.properties = { ...node.properties, id: blockId };

        const headerChildren = [];

        if (titleElement) {
          headerChildren.push(titleElement);
        }

        const languageBadge = {
          type: "element",
          tagName: "div",
          properties: { class: "shiki-language" },
          children: [{ type: "text", value: lang.toUpperCase() }],
        };

        const copyButtonPlaceholder = {
          type: "element",
          tagName: "div",
          properties: {
            class: "copy-button-placeholder",
            "data-code-id": blockId,
          },
          children: [],
        };
        headerChildren.push(copyButtonPlaceholder);

        const wrapperChildren = [];

        if (titleElement) {
          const header = {
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
        };
      });

      return root;
    },
  };
}

function transformerTooltip() {
  return {
    name: "tooltip",
    preprocess(code) {
      const tooltips = [];
      let match;

      while ((match = TOOLTIP_PATTERN.exec(code)) !== null) {
        tooltips.push({
          word: match[1],
          tooltip: match[2].trim(),
          full: match[0],
        });
      }

      this.tooltips = tooltips;
      return code.replace(TOOLTIP_PATTERN, "$1");
    },
    span(node) {
      const tooltips = this.tooltips || [];
      const nodeText = node.children?.[0]?.value;

      if (!nodeText) return;

      const matchingTooltip = tooltips.find((t) => nodeText.includes(t.word));
      if (!matchingTooltip) return;

      const wrapper = {
        type: "element",
        tagName: "span",
        properties: {
          class: "shiki-tooltip",
          "data-tooltip": matchingTooltip.tooltip,
          role: "tooltip",
          "aria-label": matchingTooltip.tooltip,
          tabindex: "0",
        },
        children: node.children,
      };

      node.type = wrapper.type;
      node.tagName = wrapper.tagName;
      node.properties = { ...node.properties, ...wrapper.properties };
    },
  };
}

function addHeadingClass() {
  return (tree: Element) => {
    visit(tree, "element", (node: Element) => {
      const isHeading = HEADING_REGEX.test(node.tagName);
      if (!isHeading) return;

      node.properties = node.properties || {};
      const classes = node.properties.className || [];
      const isClassArray = Array.isArray(classes);
      node.properties.className = isClassArray
        ? [...classes, "content-header"]
        : [classes, "content-header"];
    });
  };
}

function addLazyLoadingToImages() {
  return (tree: Element) => {
    visit(tree, "element", (node: Element) => {
      const isImage = node.tagName === "img";
      if (!isImage) return;

      node.properties = node.properties || {};
      node.properties.loading = "lazy";
      node.properties.decoding = "async";
    });
  };
}

let cachedProcessor: ReturnType<typeof unified> | null = null;

function getProcessor() {
  if (cachedProcessor) {
    return cachedProcessor;
  }

  cachedProcessor = unified()
    .use(remarkParse, { allowDangerousHtml: true })
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
    .use(rehypeShiki, {
      themes: {
        dark: customDark,
        light: customLight,
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
    })
    .use(rehypeStringify);

  return cachedProcessor;
}

export const markdownToHtml = async (markdown: string) => {
  const processor = getProcessor();
  const result = await processor.process(markdown);
  return result.toString();
};
