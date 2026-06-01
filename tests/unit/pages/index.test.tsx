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

describe("Home page", () => {
  test("renders the home page from generated post props", async () => {
    const { Home, getStaticProps } = await import("../../../pages/index");
    const result = await getStaticProps();
    const posts = result.props.posts.slice(0, 2).map((post) =>
      Object.assign({}, post, {
        frontmatter: Object.assign({}, post.frontmatter, {
          meta: post.frontmatter.meta || "",
        }),
      }),
    );
    const markup = renderToStaticMarkup(<Home posts={posts} />);

    expect(posts.length).toBeGreaterThan(0);
    expect(markup).toContain("section--posts");
    expect(markup).toContain("post--article");
    expect(markup).toContain(posts[0]?.frontmatter.title);
  });
});
