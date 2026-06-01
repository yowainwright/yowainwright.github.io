import { describe, expect, mock, test } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

mock.module("next/head", () => ({
  default: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

mock.module("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

describe("Archive page", () => {
  test("renders the archive page from generated archive props", async () => {
    const { default: Archive, getStaticProps } = await import("../../../pages/archive");
    const result = await getStaticProps();
    const posts = result.props.posts.slice(0, 2).map((post) =>
      Object.assign({}, post, {
        frontmatter: Object.assign({}, post.frontmatter, {
          meta: post.frontmatter.meta || "",
        }),
      }),
    );
    const markup = renderToStaticMarkup(<Archive posts={posts} title="Archive Test" />);

    expect(posts.length).toBeGreaterThan(0);
    expect(markup).toContain("Archive Test");
    expect(markup).toContain("posts--basic");
    expect(markup).toContain(posts[0]?.frontmatter.title);
  });
});
