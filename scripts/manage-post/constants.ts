export const FILE_EXTENSIONS = {
  MDX: ".mdx",
  TS: ".ts",
  TSX: ".tsx",
  JSON: ".json",
  MD: ".md",
} as const;

export const DIRECTORIES = {
  CONTENT: "content",
  COMPONENTS: "components/content",
  DATA: "public/data",
  ASSETS: "public/assets",
  OG: "public/assets/og",
  SCRIPTS: "scripts/content",
} as const;

export const PROMPTS = {
  ACTION: "What would you like to do? (c)reate, (r)ename, (l)ist: ",
  SLUG: 'Enter post slug (e.g., "my-new-post"): ',
  TITLE: "Enter post title: ",
  DESCRIPTION: "Enter post description: ",
  TAGS: "Enter tags (comma-separated, optional): ",
  OLD_SLUG: "Enter current post slug: ",
  NEW_SLUG: "Enter new post slug: ",
} as const;

export const MESSAGES = {
  SLUG_REQUIRED: "Slug is required",
  POST_EXISTS: "Post already exists",
  POST_NOT_FOUND: "Post not found",
  NO_POSTS: "No posts found",
  INVALID_ACTION: "Invalid action",
  POST_CREATED: "Post created successfully",
  POST_RENAMED: "Post renamed successfully",
} as const;
