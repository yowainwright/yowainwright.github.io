import { describe, expect, test } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SearchSuggestions } from "../../../../../lib/components/Search/SearchSuggestions";
import type { SearchResult } from "../../../../../lib/components/Search/types";

const searchData: SearchResult[] = [
  {
    title: "A Post",
    description: "Post description",
    slug: "a-post",
    tags: [],
    type: "post",
    url: "/a-post/",
  },
  {
    title: "A Project",
    description: "Project description",
    slug: "a-project",
    tags: [],
    type: "project",
    url: "https://jeffry.in/projects/a-project/",
  },
];

describe("SearchSuggestions", () => {
  test("renders post and project suggestions", () => {
    const markup = renderToStaticMarkup(
      <SearchSuggestions searchData={searchData} onSelect={() => undefined} />,
    );

    expect(markup).toContain("Recent Posts");
    expect(markup).toContain("Projects");
  });
});
