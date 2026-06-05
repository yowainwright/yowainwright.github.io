import { afterEach, describe, expect, test } from "bun:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  buildSearchData,
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

    fs.mkdirSync(contentDir);
    fs.mkdirSync(projectsDir);
    fs.writeFileSync(
      path.join(contentDir, "first-post.mdx"),
      "---\ntitle: First Post\nmeta: Searchable post\n---\nBody",
    );
    fs.writeFileSync(
      path.join(contentDir, "resume.md"),
      "---\ntitle: Resume\n---\nHidden",
    );
    fs.writeFileSync(
      path.join(projectsDir, "first-project.md"),
      "---\ntitle: First Project\ntagline: Searchable project\n---\nBody",
    );

    const posts = getPostsSearchData(contentDir);
    const projects = getProjectsSearchData(projectsDir);
    const searchData = buildSearchData(contentDir, projectsDir);

    writeSearchData(searchData, outputPath);

    expect(posts).toHaveLength(1);
    expect(projects).toHaveLength(1);
    expect(searchData.map((item) => item.slug)).toEqual([
      "first-post",
      "first-project",
    ]);
    expect(JSON.parse(fs.readFileSync(outputPath, "utf8"))).toEqual(searchData);
  });

  test("returns no project results when the projects directory is absent", () => {
    const rootDir = makeTempDir();
    const missingDir = path.join(rootDir, "missing");

    expect(getProjectsSearchData(missingDir)).toEqual([]);
  });
});
