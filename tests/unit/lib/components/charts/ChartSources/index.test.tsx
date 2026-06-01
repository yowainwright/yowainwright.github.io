import { describe, expect, test } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ChartSources } from "../../../../../../lib/components/charts/ChartSources";

describe("ChartSources", () => {
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
});
