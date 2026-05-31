import { describe, expect, test } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BarChart, ChartSources, LineChart } from "../lib/components/charts";
import { PixelIcon } from "../lib/components/PixelIcon";
import { SearchEmpty } from "../lib/components/Search/SearchEmpty";
import { SearchResultItem } from "../lib/components/Search/SearchResultItem";
import { SearchSuggestions } from "../lib/components/Search/SearchSuggestions";
import type { SearchResult } from "../lib/components/Search/types";

const searchData: SearchResult[] = [
  {
    title: "A Post",
    description: "Post description",
    slug: "a-post",
    type: "post",
    url: "/a-post/",
  },
  {
    title: "A Project",
    description: "Project description",
    slug: "a-project",
    type: "project",
    url: "https://jeffry.in/projects/a-project/",
  },
];

const chartData = [
  {
    label: "Series A",
    data: [
      { primary: "A", secondary: 1 },
      { primary: "B", secondary: 2 },
    ],
  },
];

describe("presentational components", () => {
  test("renders chart sources and omits empty sources", () => {
    const emptyMarkup = renderToStaticMarkup(<ChartSources sources={[]} />);
    const sourceMarkup = renderToStaticMarkup(
      <ChartSources
        sources={[
          {
            link: "https://example.com",
            author: "Researcher",
            publication: "Journal",
          },
        ]}
      />,
    );

    expect(emptyMarkup).toBe("");
    expect(sourceMarkup).toContain("Chart Sources");
    expect(sourceMarkup).toContain("Researcher - Journal");
  });

  test("renders normalized chart containers and titles", () => {
    const barMarkup = renderToStaticMarkup(<BarChart data={chartData} title="Bar Title" />);
    const lineMarkup = renderToStaticMarkup(<LineChart data={chartData} title="Line Title" />);

    expect(barMarkup).toContain("post__chart");
    expect(barMarkup).toContain("Bar Title");
    expect(lineMarkup).toContain("post__chart");
    expect(lineMarkup).toContain("Line Title");
  });

  test("renders pixel icons from named and custom grids", () => {
    const namedMarkup = renderToStaticMarkup(<PixelIcon name="heart" size={3} color="#f00" />);
    const customMarkup = renderToStaticMarkup(
      <PixelIcon
        grid={[
          [1, 0],
          [0, 1],
        ]}
      />,
    );

    expect(namedMarkup).toContain("<svg");
    expect(namedMarkup).toContain('fill="#f00"');
    expect(customMarkup.match(/<rect/g)?.length).toBe(2);
  });

  test("renders search states and suggestions", () => {
    const postResult = searchData[0]!;
    const selectedMarkup = renderToStaticMarkup(
      <SearchResultItem result={postResult} isSelected onSelect={() => undefined} />,
    );
    const suggestionsMarkup = renderToStaticMarkup(
      <SearchSuggestions searchData={searchData} onSelect={() => undefined} />,
    );
    const emptyMarkup = renderToStaticMarkup(<SearchEmpty />);

    expect(selectedMarkup).toContain("search-result--selected");
    expect(selectedMarkup).toContain("A Post");
    expect(suggestionsMarkup).toContain("Recent Posts");
    expect(suggestionsMarkup).toContain("Projects");
    expect(emptyMarkup).toContain("No results found");
  });
});
