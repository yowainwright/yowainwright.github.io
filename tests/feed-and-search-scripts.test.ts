import { afterEach, describe, expect, test } from "bun:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  buildAtomXml,
  buildJsonFeed,
  buildRobotsTxt,
  buildRssXml,
  buildSitemapXml,
  escapeXml,
  getPosts,
  getSitemapEntries,
} from "../scripts/rss";
import type { Post } from "../scripts/rss/types";
import {
  buildSearchData,
  getPostsSearchData,
  getProjectsSearchData,
  writeSearchData,
} from "../scripts/generate-search-data";

const tempDirs: string[] = [];

const makeTempDir = () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "blog-tests-"));
  tempDirs.push(dir);
  return dir;
};

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("RSS, Atom, JSON feed, and sitemap builders", () => {
  const posts: Post[] = [
    {
      slug: "first",
      title: "First & Best",
      description: "A <great> post",
      date: new Date("2026-01-02T00:00:00.000Z"),
      url: "https://jeffry.in/first",
      content: "First content",
    },
    {
      slug: "404",
      title: "Hidden",
      description: "Excluded from sitemap",
      date: new Date("2026-01-01T00:00:00.000Z"),
      url: "https://jeffry.in/404",
      content: "Hidden content",
    },
  ];

  test("escapes XML-sensitive characters", () => {
    expect(escapeXml(`A & "B" <C>`)).toBe("A &amp; &quot;B&quot; &lt;C&gt;");
  });

  test("builds RSS, Atom, JSON feed, sitemap, and robots output", () => {
    const rss = buildRssXml(posts);
    const atom = buildAtomXml(posts);
    const jsonFeed = JSON.parse(buildJsonFeed(posts));
    const sitemap = buildSitemapXml(getSitemapEntries(posts));
    const robots = buildRobotsTxt();

    expect(rss).toContain("First &amp; Best");
    expect(rss).toContain("A &lt;great&gt; post");
    expect(atom).toContain("<feed");
    expect(jsonFeed.items[0].id).toBe("https://jeffry.in/first");
    expect(sitemap).toContain("https://jeffry.in/first");
    expect(sitemap).not.toContain("https://jeffry.in/404");
    expect(robots).toContain("Sitemap: https://jeffry.in/sitemap.xml");
  });

  test("loads published content posts in newest-first order", () => {
    const contentPosts = getPosts();
    const timestamps = contentPosts.map((post) => post.date.getTime());
    const sortedTimestamps = timestamps.toSorted((a, b) => b - a);

    expect(contentPosts.length).toBeGreaterThan(0);
    expect(contentPosts.some((post) => post.slug === "404")).toBe(false);
    expect(timestamps).toEqual(sortedTimestamps);
  });
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
