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

function transformerDiffLines() {
  return {
    name: 'diff-lines',
    code(node: any) {
      // Process each line in the code block
      node.children?.forEach((line: any) => {
        if (!line.children || line.children.length === 0) return;
        
        // Get the text content of the first child
        let firstText = '';
        const getFirstText = (element: any): string => {
          if (element.type === 'text') return element.value;
          if (element.children && element.children.length > 0) {
            return getFirstText(element.children[0]);
          }
          return '';
        };
        
        firstText = getFirstText(line.children[0]);
        
        // Check if line starts with + or -
        if (firstText.startsWith('+')) {
          // Add diff add class
          if (!line.properties) line.properties = {};
          if (!line.properties.class) line.properties.class = [];
          if (Array.isArray(line.properties.class)) {
            line.properties.class.push('diff', 'add');
          } else {
            line.properties.class = [line.properties.class, 'diff', 'add'];
          }
        } else if (firstText.startsWith('-')) {
          // Add diff remove class
          if (!line.properties) line.properties = {};
          if (!line.properties.class) line.properties.class = [];
          if (Array.isArray(line.properties.class)) {
            line.properties.class.push('diff', 'remove');
          } else {
            line.properties.class = [line.properties.class, 'diff', 'remove'];
          }
        }
      });
    },
    pre(node: any, options: any) {
      // Add data-language attribute for CSS targeting
      if (options?.lang === 'diff') {
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
      let codeBlockId = 0;
      
      root.children = root.children.map(node => {
        if (node.type !== 'element' || node.tagName !== 'pre') return node;
        if (!node.properties?.class?.includes('shiki')) return node;
        
        // Generate unique ID for this code block
        const blockId = `code-block-${++codeBlockId}`;
        
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
        
        // Rebuild the pre with only code content and add ID
        node.children = codeChildren;
        node.properties = { ...node.properties, id: blockId };
        
        // Build header if we have title or language
        const headerChildren = [];
        if (titleElement) headerChildren.push(titleElement);
        if (langElement) headerChildren.push(langElement);
        
        // Create a placeholder for the copy button
        const copyButtonPlaceholder = {
          type: 'element',
          tagName: 'div',
          properties: { 
            class: 'copy-button-placeholder',
            'data-code-id': blockId
          },
          children: []
        };
        
        // Build wrapper structure
        const wrapperChildren = [];
        
        if (headerChildren.length > 0) {
          const header = {
            type: 'element',
            tagName: 'div',
            properties: { class: 'shiki-header' },
            children: headerChildren
          };
          wrapperChildren.push(header);
        }
        
        wrapperChildren.push(copyButtonPlaceholder); // Add placeholder for copy button
        wrapperChildren.push(node); // Add the pre element
        
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
        transformerDiffLines(),
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
