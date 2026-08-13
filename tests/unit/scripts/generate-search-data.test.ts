import { afterEach, describe, expect, test } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  buildSearchData,
  getSearchContentData,
  getSearchMetadata,
  getPostsSearchData,
  getProjectsSearchData,
  writeSearchData,
} from "../../../scripts/generate-search-data";

let tempDirs: string[] = [];

const makeTempDir = () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "blog-tests-"));
  tempDirs = tempDirs.concat(dir);
  return dir;
};

afterEach(() => {
  const dirsToRemove = tempDirs;
  tempDirs = [];

  for (const dir of dirsToRemove) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("search data generation helpers", () => {
  test("reads posts and projects, excludes reserved slugs, and writes JSON", () => {
    const rootDir = makeTempDir();
    const contentDir = path.join(rootDir, "content");
    const projectsDir = path.join(rootDir, "projects");
    const outputPath = path.join(rootDir, "public", "search-data.json");
    const contentOutputPath = path.join(rootDir, "public", "search-content.json");

    fs.mkdirSync(contentDir);
    fs.mkdirSync(projectsDir);
    fs.writeFileSync(
      path.join(contentDir, "first-post.mdx"),
      [
        "---",
        "title: First Post",
        "meta: Searchable post",
        "tags: [Search, TypeScript]",
        "---",
        'import { Hidden } from "./hidden";',
        "",
        "## Body heading",
        "",
        "A unique phrase with [linked text](https://example.com).",
        "",
        "```ts",
        "const indexedCode = true;",
        "```",
      ].join("\n"),
    );
    fs.writeFileSync(path.join(contentDir, "404.md"), "---\ntitle: Missing\n---\nHidden");
    fs.writeFileSync(
      path.join(contentDir, "resume.md"),
      "---\ntitle: Resume\ncategories: [Career]\n---\nPlatform architecture",
    );
    fs.writeFileSync(
      path.join(projectsDir, "first-project.md"),
      "---\ntitle: First Project\ntagline: Searchable project\ntags: [OSS]\n---\nProject body",
    );

    const posts = getPostsSearchData(contentDir);
    const projects = getProjectsSearchData(projectsDir);
    const searchData = buildSearchData(contentDir, projectsDir);

    writeSearchData(searchData, outputPath);

    const post = posts.find((item) => item.slug === "first-post");
    const resume = posts.find((item) => item.slug === "resume");

    expect(posts).toHaveLength(2);
    expect(projects).toHaveLength(1);
    expect(searchData.map((item) => item.slug)).toEqual(["first-post", "resume", "first-project"]);
    expect(post?.content).toContain("Body heading A unique phrase with linked text");
    expect(post?.content).toContain("const indexedCode = true;");
    expect(post?.content).not.toContain("Hidden");
    expect(post?.tags).toEqual(["Search", "TypeScript"]);
    expect(resume?.type).toBe("page");
    expect(resume?.tags).toEqual(["Career"]);
    expect(projects[0]?.content).toBe("Project body");
    expect(projects[0]?.tags).toEqual(["OSS"]);
    expect(JSON.parse(fs.readFileSync(outputPath, "utf8"))).toEqual(getSearchMetadata(searchData));
    expect(JSON.parse(fs.readFileSync(contentOutputPath, "utf8"))).toEqual(
      getSearchContentData(searchData),
    );
  });

  test("returns no project results when the projects directory is absent", () => {
    const rootDir = makeTempDir();
    const missingDir = path.join(rootDir, "missing");

    expect(getProjectsSearchData(missingDir)).toEqual([]);
  });
});
