import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

interface SearchItem {
  title: string;
  description: string;
  slug: string;
  type: "post" | "project";
  url: string;
}

const PROJECT_ROOT = process.cwd();
const CONTENT_DIR = path.join(PROJECT_ROOT, "content");
const PROJECTS_DIR = "/Users/jeffrywainwright/code/oss/projects/content";
const OUTPUT_PATH = path.join(PROJECT_ROOT, "public", "search-data.json");

function getPostsSearchData(): SearchItem[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  return files
    .map((fileName) => {
      const filePath = path.join(CONTENT_DIR, fileName);
      const source = fs.readFileSync(filePath, "utf8");
      const slug = fileName.replace(/\.(md|mdx)$/, "");
      const { data: frontmatter } = matter(source);

      const isExcluded = ["404", "resume"].includes(slug);
      if (isExcluded) return null;

      return {
        title: frontmatter.title || slug,
        description: frontmatter.meta || frontmatter.description || "",
        slug,
        type: "post" as const,
        url: `/${slug}/`,
      };
    })
    .filter((item): item is SearchItem => item !== null);
}

function getProjectsSearchData(): SearchItem[] {
  const projectsExist = fs.existsSync(PROJECTS_DIR);
  if (!projectsExist) {
    console.log("Projects directory not found, skipping projects.");
    return [];
  }

  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  return files.map((fileName) => {
    const filePath = path.join(PROJECTS_DIR, fileName);
    const source = fs.readFileSync(filePath, "utf8");
    const slug = fileName.replace(/\.(md|mdx)$/, "");
    const { data: frontmatter } = matter(source);

    return {
      title: frontmatter.title || slug,
      description: frontmatter.description || frontmatter.tagline || "",
      slug,
      type: "project" as const,
      url: `https://jeffry.in/projects/${slug}/`,
    };
  });
}

function main() {
  const posts = getPostsSearchData();
  const projects = getProjectsSearchData();
  const searchData = [...posts, ...projects];

  const publicDir = path.dirname(OUTPUT_PATH);
  const publicExists = fs.existsSync(publicDir);
  if (!publicExists) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(searchData, null, 2));
  console.log(`Generated search data: ${searchData.length} items`);
  console.log(`  - Posts: ${posts.length}`);
  console.log(`  - Projects: ${projects.length}`);
}

main();
