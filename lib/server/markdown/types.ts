import type { Element, ElementContent, Root } from "hast";
import type {
  CodeToHastOptions,
  ShikiTransformer,
  ThemeRegistrationAny,
} from "shiki";

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

export type MarkdownRoot = Root;
export type MarkdownElement = Element;
export type MarkdownRootContent = Root["children"][number];
export type MarkdownElementContent = ElementContent;
export type MarkdownContent = MarkdownRootContent | MarkdownElementContent;
export type MarkdownPropertyValue = Element["properties"][string];
export type MarkdownCodeOptions = CodeToHastOptions;
export type MarkdownTransformer = ShikiTransformer;
export type MarkdownTheme = ThemeRegistrationAny;

export type MarkdownTextNode = ElementContent & {
  type: "text";
  value: string;
};

export interface TooltipEntry {
  word: string;
  tooltip: string;
  full: string;
}
