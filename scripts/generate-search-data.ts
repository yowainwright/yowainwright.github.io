import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface SearchItem {
  title: string;
  description: string;
  slug: string;
  type: "post" | "project";
  url: string;
}

const PROJECT_ROOT = process.cwd();
const CONTENT_DIR = path.join(PROJECT_ROOT, "content");
const PROJECTS_DIR =
  process.env.PROJECTS_CONTENT_DIR ||
  path.join(PROJECT_ROOT, "..", "projects", "content");
const OUTPUT_PATH = path.join(PROJECT_ROOT, "public", "search-data.json");

export function getPostsSearchData(contentDir = CONTENT_DIR): SearchItem[] {
  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts: Array<SearchItem | null> = files.map((fileName) => {
    const filePath = path.join(contentDir, fileName);
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
  });

  return posts.filter((item): item is SearchItem => item !== null);
}

export function getProjectsSearchData(
  projectsDir = PROJECTS_DIR,
): SearchItem[] {
  const projectsExist = fs.existsSync(projectsDir);
  if (!projectsExist) {
    console.log("Projects directory not found, skipping projects.");
    return [];
  }

  const files = fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  return files.map((fileName) => {
    const filePath = path.join(projectsDir, fileName);
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

export function buildSearchData(
  contentDir = CONTENT_DIR,
  projectsDir = PROJECTS_DIR,
) {
  const posts = getPostsSearchData(contentDir);
  const projects = getProjectsSearchData(projectsDir);
  return posts.concat(projects);
}

export function writeSearchData(
  searchData: SearchItem[],
  outputPath = OUTPUT_PATH,
) {
  const publicDir = path.dirname(outputPath);
  const publicExists = fs.existsSync(publicDir);
  if (!publicExists) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(searchData, null, 2));
}

export function main() {
  const posts = getPostsSearchData();
  const projects = getProjectsSearchData();
  const searchData = posts.concat(projects);

  writeSearchData(searchData);
  console.log(`Generated search data: ${searchData.length} items`);
  console.log(`  - Posts: ${posts.length}`);
  console.log(`  - Projects: ${projects.length}`);
}

if (import.meta.main) {
  main();
}
