import { describe, expect, test } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SearchResultItem } from "../../../../../lib/components/Search/SearchResultItem";
import type { SearchResult } from "../../../../../lib/components/Search/types";

const postResult: SearchResult = {
  title: "A Post",
  description: "Post description",
  slug: "a-post",
  type: "post",
  url: "/a-post/",
};

describe("SearchResultItem", () => {
  test("renders selected search result state", () => {
    const markup = renderToStaticMarkup(
      <SearchResultItem result={postResult} isSelected onSelect={() => undefined} />,
    );

    expect(markup).toContain("search-result--selected");
    expect(markup).toContain("A Post");
  });
});
