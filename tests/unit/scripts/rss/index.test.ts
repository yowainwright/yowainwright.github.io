import { describe, expect, test } from "bun:test";
import {
  buildAtomXml,
  buildJsonFeed,
  buildRobotsTxt,
  buildRssXml,
  buildSitemapXml,
  escapeXml,
  getPosts,
  getSitemapEntries,
} from "../../../../scripts/rss";
import type { Post } from "../../../../scripts/rss/types";

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
