import { describe, expect, test } from "bun:test";
import {
  extractSlugFromFilename,
  filterPublishedPosts,
  parsePost,
  parseSinglePost,
  sortPostsByDate,
} from "../../../../../lib/server/markdown/utils";

describe("markdown utils", () => {
  test("parses list and single post metadata from content files", () => {
    const post = parsePost("why-pastoralist.mdx", "content");
    const singlePost = parseSinglePost("why-pastoralist", "content");

    expect(extractSlugFromFilename("why-pastoralist.mdx")).toBe("why-pastoralist");
    expect(post.slug).toBe("why-pastoralist");
    expect(post.frontmatter.path).toBe("/why-pastoralist");
    expect(singlePost.content).toContain("Pastoralist");
    expect(singlePost.isMdx).toBe(true);
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
    const sortedSlugs = sortPostsByDate(publishedPosts).map((post) => post.slug);

    expect(publishedPosts.map((post) => post.slug)).toEqual(["older", "newer"]);
    expect(sortedSlugs).toEqual(["newer", "older"]);
  });
});
