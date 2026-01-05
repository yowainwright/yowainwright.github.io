import path from "node:path";

export const SITE_URL = "https://jeffry.in";
export const SITE_TITLE = "Jeffry.in";
export const SITE_DESCRIPTION = "Jeff Wainwright's blog about software engineering, life, and everything in between.";
export const AUTHOR_NAME = "Jeff Wainwright";
export const AUTHOR_EMAIL = "yowainwright@gmail.com";

export const CONTENT_DIR = path.join(process.cwd(), "content");
export const OUTPUT_DIR = path.join(process.cwd(), "public");

export const EXCLUDE_SLUGS = ["404"];
export const SITEMAP_EXCLUDE = ["404", "keystatic"];
export const MAX_ITEMS = 50;
