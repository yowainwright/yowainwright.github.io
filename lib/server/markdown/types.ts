export interface PostFrontmatter {
  date: string;
  title: string;
  meta?: string;
  description?: string;
  path: string;
  tags?: string[];
}

export interface Post {
  frontmatter: PostFrontmatter;
  slug: string;
  content?: string;
  isMdx?: boolean;
}

export interface TransformerNode {
  type: string;
  tagName?: string;
  properties?: Record<string, string | string[] | boolean | number>;
  children?: TransformerNode[];
  value?: string;
}
