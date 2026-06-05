import { describe, expect, test } from "bun:test";
import { getAllNewPosts } from "../../../../../lib/server/markdown";
import {
  extractSlugFromFilename,
  filterPublishedPosts,
  formatDate,
  getFrontmatterDateValue,
  parsePost,
  parseSinglePost,
  sortPostsByDate,
} from "../../../../../lib/server/markdown/utils";

describe("markdown utils", () => {
  test("parses list and single post metadata from content files", () => {
    const post = parsePost("why-pastoralist.mdx", "content");
    const singlePost = parseSinglePost("why-pastoralist", "content");

    expect(extractSlugFromFilename("why-pastoralist.mdx")).toBe(
      "why-pastoralist",
    );
    expect(post.slug).toBe("why-pastoralist");
    expect(post.frontmatter.path).toBe("/why-pastoralist");
    expect(singlePost.content).toContain("Pastoralist");
    expect(singlePost.isMdx).toBe(true);
  });

  test("formats date-only strings and YAML Date objects without shifting days", () => {
    const yamlDate = new Date("2025-11-03T00:00:00.000Z");

    expect(getFrontmatterDateValue(yamlDate)).toBe("2025-11-03T00:00:00.000Z");
    expect(formatDate("2025-11-03")).toBe("November 3, 2025");
    expect(formatDate(yamlDate)).toBe("November 3, 2025");
  });

  test("includes the software engineering economy post in newest posts", () => {
    const posts = getAllNewPosts("content");
    const swePost = posts.find((post) => post.slug === "us-swe-economy-2025");

    expect(swePost?.frontmatter.date).toBe("November 3, 2025");
  });

  test("filters excluded posts and sorts newest first", () => {
    const posts = [
      {
        slug: "older",
        frontmatter: {
          title: "Older",
          path: "/older",
          date: "January 1, 2024",
        },
      },
      {
        slug: "404",
        frontmatter: {
          title: "Not Found",
          path: "/404",
          date: "January 1, 2026",
        },
      },
      {
        slug: "newer",
        frontmatter: {
          title: "Newer",
          path: "/newer",
          date: "January 1, 2025",
        },
      },
    ];

    const publishedPosts = filterPublishedPosts(posts);
    const sortedSlugs = sortPostsByDate(publishedPosts).map(
      (post) => post.slug,
    );

    expect(publishedPosts.map((post) => post.slug)).toEqual(["older", "newer"]);
    expect(sortedSlugs).toEqual(["newer", "older"]);
  });
});
