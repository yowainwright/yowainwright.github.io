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
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import type { Element } from "hast";
import customDark from "./themes/dark.json";
import customLight from "./themes/light.json";

export const getPath = (folder: string) =>
  path.join(process.cwd(), `/${folder}`);

export const getFileContent = (filename: string, folder: string) => {
  const contentDir = getPath(folder);
  const file = sanitize(filename);
  const filePath = path.join(contentDir, file);

  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, "utf8");
  }

  const withoutExt = file.replace(/\.(md|mdx)$/, '');
  const mdPath = path.join(contentDir, `${withoutExt}.md`);
  const mdxPath = path.join(contentDir, `${withoutExt}.mdx`);

  if (fs.existsSync(mdxPath)) {
    return fs.readFileSync(mdxPath, "utf8");
  }
  if (fs.existsSync(mdPath)) {
    return fs.readFileSync(mdPath, "utf8");
  }

  throw new Error(`File not found: ${filename} in ${folder}`);
};

export const getAllPosts = (folder: string) => {
  const contentDir = getPath(folder);
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

  const isDev = process.env.NODE_ENV === 'development';
  let allFiles = files;

  const draftsDir = getPath('drafts');
  const draftsExist = isDev && fs.existsSync(draftsDir);
  const shouldIncludeDrafts = draftsExist;
  if (shouldIncludeDrafts) {
    const draftFiles = fs.readdirSync(draftsDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    allFiles = files.concat(draftFiles);
  }

  return allFiles.map((fileName) => {
    let fileFolder = folder;

    const draftPath = path.join(getPath('drafts'), fileName);
    const isInDrafts = isDev && fs.existsSync(draftPath);
    if (isInDrafts) {
      fileFolder = 'drafts';
    }

    const source = getFileContent(fileName, fileFolder);
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
  const isDev = process.env.NODE_ENV === 'development';
  let fileFolder = folder;

  const draftMdxPath = path.join(getPath('drafts'), `${slug}.mdx`);
  const draftMdPath = path.join(getPath('drafts'), `${slug}.md`);
  const isInDrafts = isDev && (fs.existsSync(draftMdxPath) || fs.existsSync(draftMdPath));
  if (isInDrafts) {
    fileFolder = 'drafts';
  }

  const mdxPath = path.join(getPath(fileFolder), `${slug}.mdx`);
  const isMdx = fs.existsSync(mdxPath);
  const fileName = isMdx ? `${slug}.mdx` : `${slug}.md`;

  const source = getFileContent(fileName, fileFolder);
  const { data: frontmatter, content } = matter(source);
  const { date, path: postPath, ...rest } = frontmatter;
  const prettyDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const trimmedPath = `/${postPath.split("/")[1]}`;
  return {
    frontmatter: {
      ...rest,
      date: prettyDate,
      path: trimmedPath,
    },
    content,
    slug,
    isMdx,
  };
};

function transformerDiffLines() {
  return {
    name: 'diff-lines',
    code(node: any) {
      node.children?.forEach((line: any) => {
        const hasNoChildren = !line.children || line.children.length === 0;
        if (hasNoChildren) return;

        let firstText = '';
        const getFirstText = (element: any): string => {
          const isText = element.type === 'text';
          if (isText) return element.value;
          const hasChildren = element.children && element.children.length > 0;
          if (hasChildren) {
            return getFirstText(element.children[0]);
          }
          return '';
        };

        firstText = getFirstText(line.children[0]);

        const isAddition = firstText.startsWith('+');
        const isRemoval = firstText.startsWith('-');
        const shouldProcessDiff = isAddition || isRemoval;

        if (!shouldProcessDiff) return;

        if (!line.properties) line.properties = {};
        if (!line.properties.class) line.properties.class = [];

        const isClassArray = Array.isArray(line.properties.class);
        const diffType = isAddition ? 'add' : 'remove';

        if (isClassArray) {
          line.properties.class.push('diff', diffType);
        } else {
          line.properties.class = [line.properties.class, 'diff', diffType];
        }
      });
    },
    pre(node: any, options: any) {
      const isDiffLanguage = options?.lang === 'diff';
      if (isDiffLanguage) {
        node.properties = {
          ...node.properties,
          'data-language': 'diff'
        };
      }
    }
  };
}


function transformerTitle() {
  return {
    name: 'title',
    preprocess(code, options) {
      const hasTitle = code.includes('[title:');
      if (!hasTitle) return code;

      const lines = code.split('\n');
      const firstLine = lines[0];

      const titleStart = firstLine.indexOf('[title:');
      const titleEnd = firstLine.indexOf(']', titleStart);

      const hasTitleBounds = titleStart !== -1 && titleEnd > titleStart;
      if (!hasTitleBounds) return code;

      const isComment = firstLine.startsWith('//') ||
                       firstLine.startsWith('#') ||
                       firstLine.startsWith('/*');

      const shouldProcessTitle = isComment && options;
      if (!shouldProcessTitle) return code;

      const title = firstLine.slice(titleStart + 7, titleEnd).trim();
      options.meta = { ...options.meta, title };
      return lines.slice(1).join('\n');
    },
    pre(node) {
      if (!node.properties) node.properties = {};
      
      const title = node.properties.title;
      if (!title) return;
      
      const titleNode = {
        type: 'element',
        tagName: 'div',
        properties: { class: 'shiki-title' },
        children: [{ type: 'text', value: title }]
      };
      
      node.children = [titleNode, ...node.children];
      delete node.properties.title;
    }
  };
}

function transformerLanguageBadge() {
  return {
    name: 'language-badge',
    root(root) {
      root.children = root.children.map(node => {
        const isPreElement = node.type === 'element' && node.tagName === 'pre';
        const hasShikiClass = node.properties?.class?.includes('shiki');
        const shouldProcess = isPreElement && hasShikiClass;
        if (!shouldProcess) return node;

        const lang = node.properties['data-language'] || this.options?.lang || 'text';
        node.properties['data-language'] = lang;

        return node;
      });

      return root;
    }
  };
}

function transformerCodeWrapper() {
  return {
    name: 'code-wrapper',
    root(root) {
      let codeBlockId = 0;

      root.children = root.children.map(node => {
        const isPreElement = node.type === 'element' && node.tagName === 'pre';
        const hasShikiClass = node.properties?.class?.includes('shiki');
        const shouldProcess = isPreElement && hasShikiClass;
        if (!shouldProcess) return node;

        const blockId = `code-block-${++codeBlockId}`;
        const lang = node.properties['data-language'] || this.options?.lang || 'text';

        let titleElement = null;
        const codeChildren = [];

        node.children.forEach(child => {
          const isTitle = child.properties?.class === 'shiki-title';
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
          type: 'element',
          tagName: 'div',
          properties: { class: 'shiki-language' },
          children: [{ type: 'text', value: lang.toUpperCase() }]
        };

        const copyButtonPlaceholder = {
          type: 'element',
          tagName: 'div',
          properties: {
            class: 'copy-button-placeholder',
            'data-code-id': blockId
          },
          children: []
        };
        headerChildren.push(copyButtonPlaceholder);

        const wrapperChildren = [];

        if (titleElement) {
          const header = {
            type: 'element',
            tagName: 'div',
            properties: { class: 'shiki-header' },
            children: headerChildren
          };
          wrapperChildren.push(header);
        }

        wrapperChildren.push(languageBadge);
        wrapperChildren.push(copyButtonPlaceholder);
        wrapperChildren.push(node);

        return {
          type: 'element',
          tagName: 'div',
          properties: { class: 'shiki-wrapper' },
          children: wrapperChildren
        };
      });

      return root;
    }
  };
}


function transformerTooltip() {
  return {
    name: 'tooltip',
    preprocess(code) {
      const tooltipPattern = /(\S+)\[tooltip:([^\]]+)\]/g;
      const tooltips = [];
      let match;

      while ((match = tooltipPattern.exec(code)) !== null) {
        tooltips.push({
          word: match[1],
          tooltip: match[2].trim(),
          full: match[0]
        });
      }

      this.tooltips = tooltips;
      return code.replace(tooltipPattern, '$1');
    },
    span(node) {
      const tooltips = this.tooltips || [];
      const nodeText = node.children?.[0]?.value;

      if (!nodeText) return;

      const matchingTooltip = tooltips.find(t => nodeText.includes(t.word));
      if (!matchingTooltip) return;

      const wrapper = {
        type: 'element',
        tagName: 'span',
        properties: {
          class: 'shiki-tooltip',
          'data-tooltip': matchingTooltip.tooltip,
          'role': 'tooltip',
          'aria-label': matchingTooltip.tooltip,
          'tabindex': '0'
        },
        children: node.children
      };

      node.type = wrapper.type;
      node.tagName = wrapper.tagName;
      node.properties = { ...node.properties, ...wrapper.properties };
    }
  };
}

function addHeadingClass() {
  return (tree: Element) => {
    visit(tree, 'element', (node: Element) => {
      const isHeading = /^h[1-6]$/.test(node.tagName);
      if (!isHeading) return;

      node.properties = node.properties || {};
      const classes = node.properties.className || [];
      const isClassArray = Array.isArray(classes);
      node.properties.className = isClassArray
        ? [...classes, 'content-header']
        : [classes, 'content-header'];
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
