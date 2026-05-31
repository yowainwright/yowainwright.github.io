import fs from "node:fs";
import path from "node:path";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ensureArray } from "../../client/utils";
import { DEFAULT_OG_IMAGE, OG_IMAGE_DIR } from "../../components/OgMeta/constants";
import { getAllPosts, getSinglePost, getShikiRehypeOptions, markdownToHtml } from "../markdown";
import type { PostFrontmatter } from "../markdown/types";

export type PostPageFrontmatter = Omit<PostFrontmatter, "description" | "meta"> & {
  description: string | null;
  meta: string | null;
  tags: string[];
};

export type PostPageProps = {
  content: string | null;
  frontmatter: PostPageFrontmatter;
  isMdx: boolean;
  mdxSource: MDXRemoteSerializeResult | null;
  ogImagePath: string;
  slug: string;
  wordCount: number;
};

export type MdxAstNode = {
  attributes?: Array<{
    name?: string;
    type?: string;
    value?: unknown;
  }>;
  children?: MdxAstNode[];
  data?: {
    hProperties?: Record<string, unknown>;
  };
  name?: string;
  type?: string;
  value?: string;
};

export const getMdxAstText = (node: MdxAstNode): string => {
  if (typeof node.value === "string") return node.value;
  if (!node.children) return "";

  return node.children.map(getMdxAstText).join("");
};

export const hasMdxClassName = (node: MdxAstNode, className: string) =>
  node.attributes?.some(
    (attribute) =>
      attribute.name === "className" &&
      typeof attribute.value === "string" &&
      attribute.value.split(/\s+/).includes(className),
  ) || false;

export const isMdxTableTitle = (node: MdxAstNode) =>
  node.type === "mdxJsxFlowElement" &&
  node.name === "p" &&
  hasMdxClassName(node, "post__table-title");

type MdxTableTitleState = {
  children: MdxAstNode[];
  pendingTitle: string;
  pendingTitleNode: MdxAstNode | null;
};

const attachTableTitle = (node: MdxAstNode, pendingTitle: string) => {
  node.data = Object.assign({}, node.data, {
    hProperties: Object.assign({}, node.data?.hProperties, {
      "data-title": pendingTitle,
    }),
  });
};

const flushPendingTitle = (state: MdxTableTitleState): MdxTableTitleState => {
  if (!state.pendingTitleNode) return state;

  return {
    children: state.children.concat(state.pendingTitleNode),
    pendingTitle: "",
    pendingTitleNode: null,
  };
};

const processMdxTableTitleNode = (
  state: MdxTableTitleState,
  node: MdxAstNode,
): MdxTableTitleState => {
  if (isMdxTableTitle(node)) {
    const flushedState = flushPendingTitle(state);

    return {
      children: flushedState.children,
      pendingTitle: getMdxAstText(node).trim(),
      pendingTitleNode: node,
    };
  }

  const isTitledTable = state.pendingTitleNode !== null && node.type === "table";
  if (isTitledTable) {
    attachTableTitle(node, state.pendingTitle);

    return {
      children: state.children.concat(node),
      pendingTitle: "",
      pendingTitleNode: null,
    };
  }

  const flushedState = flushPendingTitle(state);
  return Object.assign({}, flushedState, {
    children: flushedState.children.concat(node),
  });
};

export function remarkMdxTableTitles() {
  return (tree: MdxAstNode) => {
    if (!tree.children) return;

    const initialState: MdxTableTitleState = {
      children: [],
      pendingTitle: "",
      pendingTitleNode: null,
    };
    const finalState = flushPendingTitle(
      tree.children.reduce(processMdxTableTitleNode, initialState),
    );

    tree.children = finalState.children;
  };
}

const getPostOgImagePath = (slug: string) => {
  const candidateOgImagePath = `${OG_IMAGE_DIR}/${slug}/1.png`;
  const candidatePublicPath = path.join(
    process.cwd(),
    "public",
    candidateOgImagePath.replace(/^\//, ""),
  );

  return fs.existsSync(candidatePublicPath) ? candidateOgImagePath : DEFAULT_OG_IMAGE;
};

const sanitizeFrontmatter = (frontmatter: PostFrontmatter): PostPageFrontmatter =>
  Object.assign({}, frontmatter, {
    description: frontmatter.description || null,
    meta: frontmatter.meta || null,
    tags: ensureArray(frontmatter.tags),
  });

export const buildPostStaticPaths = (contentDir = "content") => {
  const paths = getAllPosts(contentDir).map(({ slug }) => `/${slug}`);
  return {
    paths,
    fallback: false,
  };
};

export const buildPostStaticProps = async (
  slug: string,
  contentDir = "content",
): Promise<{ props: PostPageProps }> => {
  const data = getSinglePost(slug, contentDir);
  const ogImagePath = getPostOgImagePath(slug);
  const wordCount = (data.content || "").split(/\s+/).filter(Boolean).length;
  const frontmatter = sanitizeFrontmatter(data.frontmatter);

  if (data.isMdx) {
    const rehypeShiki = (await import("@shikijs/rehype")).default;
    const remarkGfm = (await import("remark-gfm")).default;
    const remarkMermaidjs = (await import("remark-mermaidjs")).default;
    const mdxSource = await serialize(data.content || "", {
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkMdxTableTitles,
          [
            remarkMermaidjs,
            {
              theme: "base",
              themeVariables: {
                primaryColor: "#f2f2f2",
                primaryTextColor: "#000000",
                primaryBorderColor: "#0000ff",
                lineColor: "#0000ff",
                secondaryColor: "#f9f9f9",
                tertiaryColor: "#ffffff",
                background: "#ffffff",
                mainBkg: "#f2f2f2",
                secondBkg: "#f9f9f9",
                tertiaryBkg: "#ffffff",
                nodeBorder: "#0000ff",
                clusterBkg: "#f9f9f9",
                clusterBorder: "#999999",
                defaultLinkColor: "#0000ff",
                titleColor: "#000000",
                edgeLabelBackground: "#ffffff",
              },
            },
          ],
        ],
        rehypePlugins: [[rehypeShiki, getShikiRehypeOptions()]],
      },
    });

    return {
      props: Object.assign({}, data, {
        content: null,
        frontmatter,
        isMdx: true,
        mdxSource,
        ogImagePath,
        wordCount,
      }),
    };
  }

  const content = await markdownToHtml(data.content || "");
  return {
    props: Object.assign({}, data, {
      content,
      frontmatter,
      isMdx: false,
      mdxSource: null,
      ogImagePath,
      wordCount,
    }),
  };
};
