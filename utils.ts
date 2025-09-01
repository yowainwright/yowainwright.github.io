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
    preprocess(code, options) {
      if (!code.includes('[title:')) return code;
      
      const lines = code.split('\n');
      const firstLine = lines[0];
      
      const titleStart = firstLine.indexOf('[title:');
      const titleEnd = firstLine.indexOf(']', titleStart);
      
      if (titleStart === -1 || titleEnd <= titleStart) return code;
      
      const isComment = firstLine.startsWith('//') || 
                       firstLine.startsWith('#') || 
                       firstLine.startsWith('/*');
      
      if (!isComment || !options) return code;
      
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

function transformerCodeWrapper() {
  return {
    name: 'code-wrapper',
    root(root) {
      root.children = root.children.map(node => {
        if (node.type !== 'element' || node.tagName !== 'pre') return node;
        if (!node.properties?.class?.includes('shiki')) return node;
        
        // Extract title and language from the pre's children
        let titleElement = null;
        let langElement = null;
        const codeChildren = [];
        
        node.children.forEach(child => {
          if (child.properties?.class === 'shiki-title') {
            titleElement = child;
          } else if (child.properties?.class === 'shiki-language-badge') {
            langElement = child;
          } else {
            codeChildren.push(child);
          }
        });
        
        // Rebuild the pre with only code content
        node.children = codeChildren;
        
        // Build header if we have title or language
        const headerChildren = [];
        if (titleElement) headerChildren.push(titleElement);
        if (langElement) headerChildren.push(langElement);
        
        if (headerChildren.length === 0) return node;
        
        const header = {
          type: 'element',
          tagName: 'div',
          properties: { class: 'shiki-header' },
          children: headerChildren
        };
        
        return {
          type: 'element',
          tagName: 'div',
          properties: { class: 'shiki-wrapper' },
          children: [header, node]
        };
      });
      
      return root;
    }
  };
}

function transformerLanguageBadge() {
  return {
    name: 'language-badge',
    pre(node, options) {
      // Try to find language from various sources
      let lang = null;
      
      // Check the code element inside pre for language class
      const codeElement = node.children?.find(child => 
        child.type === 'element' && child.tagName === 'code'
      );
      
      if (codeElement?.properties?.class) {
        const classes = Array.isArray(codeElement.properties.class) 
          ? codeElement.properties.class 
          : [codeElement.properties.class];
        
        const langClass = classes.find(c => 
          typeof c === 'string' && c.startsWith('language-')
        );
        
        if (langClass) {
          lang = langClass.replace('language-', '');
        }
      }
      
      // Check data-language attribute
      if (!lang) {
        lang = node.properties?.['data-language'];
      }
      
      // Check options.lang directly
      if (!lang && options?.lang) {
        lang = options.lang;
      }
      
      if (!lang || lang === 'text') return;
      
      const badge = {
        type: 'element',
        tagName: 'div',
        properties: { class: 'shiki-language-badge' },
        children: [{ type: 'text', value: lang.toUpperCase() }]
      };
      
      node.children.push(badge);
    }
  };
}

function transformerTooltip() {
  return {
    name: 'tooltip',
    code(node) {
      node.children.forEach(line => {
        if (!line.children) return;
        
        line.children = line.children.map(child => {
          if (child.type !== 'text') return child;
          
          const tooltipIndex = child.value.indexOf('[tooltip:');
          if (tooltipIndex === -1) return child;
          
          const endIndex = child.value.indexOf(']', tooltipIndex);
          if (endIndex === -1) return child;
          
          const tooltip = child.value.slice(tooltipIndex + 9, endIndex).trim();
          const beforeTooltip = child.value.slice(0, tooltipIndex).trimEnd();
          
          return {
            type: 'element',
            tagName: 'span',
            properties: {
              class: 'shiki-tooltip',
              'data-tooltip': tooltip
            },
            children: [{ type: 'text', value: beforeTooltip }]
          };
        });
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
        transformerTitle(),
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
        transformerMetaHighlight(),
        transformerMetaWordHighlight(),
        transformerColorizedBrackets(),
        transformerCopyButton(),
        {
          name: 'store-language',
          preprocess(code, options) {
            if (options?.lang && options.lang !== 'text') {
              options.meta = { ...options.meta, __lang: options.lang };
            }
            return code;
          },
          pre(node, options) {
            const lang = options?.meta?.__lang;
            if (!lang) return;
            
            node.properties = {
              ...node.properties,
              'data-language': lang
            };
          }
        },
        transformerLanguageBadge(),
        transformerTooltip(),
        transformerCodeWrapper(), // Run last to wrap everything
      ],
    })
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
};
