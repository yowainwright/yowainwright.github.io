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

function transformerCopyButton() {
  return {
    name: 'copy-button',
    pre(node: any) {
      // Create copy icon SVG as HAST nodes
      const copyIcon = {
        type: 'element',
        tagName: 'svg',
        properties: {
          class: 'copy-icon',
          xmlns: 'http://www.w3.org/2000/svg',
          width: '16',
          height: '16',
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2',
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        },
        children: [
          {
            type: 'element',
            tagName: 'rect',
            properties: {
              width: '14',
              height: '14',
              x: '8',
              y: '8',
              rx: '2',
              ry: '2'
            },
            children: []
          },
          {
            type: 'element',
            tagName: 'path',
            properties: {
              d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'
            },
            children: []
          }
        ]
      };

      // Create check icon SVG as HAST nodes
      const checkIcon = {
        type: 'element',
        tagName: 'svg',
        properties: {
          class: 'check-icon',
          xmlns: 'http://www.w3.org/2000/svg',
          width: '16',
          height: '16',
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2',
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        },
        children: [
          {
            type: 'element',
            tagName: 'path',
            properties: {
              d: 'M20 6 9 17l-5-5'
            },
            children: []
          }
        ]
      };
      
      const button = {
        type: 'element',
        tagName: 'button',
        properties: {
          class: 'shiki-copy-button',
          'aria-label': 'Copy code',
          'data-copied': 'false',
          title: 'Copy code',
          onclick: `
            const code = this.parentElement.querySelector('code').textContent;
            navigator.clipboard.writeText(code);
            this.setAttribute('data-copied', 'true');
            this.setAttribute('aria-label', 'Copied!');
            this.setAttribute('title', 'Copied!');
            setTimeout(() => {
              this.setAttribute('data-copied', 'false');
              this.setAttribute('aria-label', 'Copy code');
              this.setAttribute('title', 'Copy code');
            }, 2000);
          `.replace(/\s+/g, ' ').trim()
        },
        children: [copyIcon, checkIcon]
      };

      node.children = [button, ...node.children];
    }
  };
}

function transformerTitle() {
  return {
    name: 'title',
    preprocess(code: string, options: any) {
      const match = code.match(/^\/\/\s*@title:\s*(.+)\n/);
      if (match && options) {
        options.meta = { ...options.meta, title: match[1] };
        return code.replace(match[0], '');
      }
      return code;
    },
    pre(node: any, options: any) {
      if (!options) return;
      const meta = options.meta;
      if (meta?.title) {
        const titleNode = {
          type: 'element',
          tagName: 'div',
          properties: { class: 'shiki-title' },
          children: [{ type: 'text', value: meta.title }]
        };
        node.children = [titleNode, ...node.children];
      }
    }
  };
}

function transformerLanguageBadge() {
  return {
    name: 'language-badge',
    pre(node: any, options: any) {
      if (!options) return;
      const lang = options.lang;
      if (lang && lang !== 'text') {
        const badge = {
          type: 'element',
          tagName: 'div',
          properties: { class: 'shiki-language-badge' },
          children: [{ type: 'text', value: lang.toUpperCase() }]
        };
        node.children = [...node.children, badge];
      }
    }
  };
}

function transformerTooltip() {
  return {
    name: 'tooltip',
    code(node: any) {
      node.children = node.children.map((line: any) => {
        if (line.type === 'element' && line.children) {
          line.children = line.children.map((child: any) => {
            if (child.type === 'text') {
              const tooltipMatch = child.value.match(/\/\/\s*\[([^\]]+)\]:\s*(.+)$/);
              if (tooltipMatch) {
                const [, text, tooltip] = tooltipMatch;
                return {
                  type: 'element',
                  tagName: 'span',
                  properties: {
                    class: 'shiki-tooltip',
                    'data-tooltip': tooltip.trim()
                  },
                  children: [{ type: 'text', value: text }]
                };
              }
            }
            return child;
          });
        }
        return line;
      });
    }
  };
}

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
        transformerCopyButton(),
        transformerTitle(),
        transformerLanguageBadge(),
        transformerTooltip(),
      ],
    })
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
};
