export const CONTENT_DIR = "content";
export const DRAFTS_DIR = "drafts";
export const EXCLUDED_SLUGS = new Set(["404", "about", "resume"]);
export const MARKDOWN_EXTENSIONS = [".md", ".mdx"];
export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const MARKDOWN_EXT_REGEX = /\.(md|mdx)$/;
export const TOOLTIP_PATTERN = /(\S+)\[tooltip:([^\]]+)\]/g;
export const HEADING_REGEX = /^h[1-6]$/;
export const COMMENT_PREFIXES = ["//", "#", "/*"];
