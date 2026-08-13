import { describe, expect, test } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SearchEmpty, SearchResultItem, SearchSuggestions, SearchTrigger } from "./index";
import type { SearchResult } from "./types";

const postResult: SearchResult = {
  title: "A Post",
  description: "Post description",
  slug: "a-post",
  tags: ["Testing"],
  type: "post",
  url: "/a-post/",
};

const projectResult: SearchResult = {
  title: "A Project",
  description: "Project description",
  slug: "a-project",
  tags: [],
  type: "project",
  url: "https://jeffry.in/projects/a-project/",
};

describe("Search components", () => {
  test("renders the search trigger", () => {
    const markup = renderToStaticMarkup(<SearchTrigger onClick={() => undefined} />);

    expect(markup).toContain("Search (⌘K)");
  });

  test("renders the empty state", () => {
    const markup = renderToStaticMarkup(<SearchEmpty />);

    expect(markup).toContain("No results found");
  });

  test("renders a selected result", () => {
    const markup = renderToStaticMarkup(
      <SearchResultItem result={postResult} isSelected onSelect={() => undefined} />,
    );

    expect(markup).toContain("search-result--selected");
    expect(markup).toContain("A Post");
  });

  test("renders post and project suggestions", () => {
    const searchData = [postResult, projectResult];
    const markup = renderToStaticMarkup(
      <SearchSuggestions searchData={searchData} onSelect={() => undefined} />,
    );

    expect(markup).toContain("Recent Posts");
    expect(markup).toContain("Projects");
  });
});
