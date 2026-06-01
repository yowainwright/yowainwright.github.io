import { describe, expect, test } from "bun:test";
import { markdownToHtml } from "../lib/server/markdown";
import {
  extractSlugFromFilename,
  filterPublishedPosts,
  parsePost,
  parseSinglePost,
  sortPostsByDate,
} from "../lib/server/markdown/utils";

describe("markdownToHtml", () => {
  test("adds heading classes and lazy image attributes", async () => {
    const heading = `Test Heading ${crypto.randomUUID()}`;
    const html = await markdownToHtml(`
# ${heading}

![A chart](/chart.png)
`);

    expect(html).toContain(heading);
    expect(html).toContain("content-header");
    expect(html).toContain('loading="lazy"');
    expect(html).toContain('decoding="async"');
  });

  test("wraps shiki code blocks with title and language UI", async () => {
    const title = `sample-${crypto.randomUUID()}.ts`;
    const html = await markdownToHtml(`
\`\`\`ts
// [title: ${title}]
const value = 1;
\`\`\`
`);

    expect(html).toContain("shiki");
    expect(html).toContain("shiki-title");
    expect(html).toContain(title);
    expect(html).toContain("<code>");
  });
});

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
