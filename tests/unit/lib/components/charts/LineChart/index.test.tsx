import { describe, expect, test } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LineChart } from "../../../../../../lib/components/charts/LineChart";

const chartData = [
  {
    label: "Series A",
    data: [
      { primary: "A", secondary: 1 },
      { primary: "B", secondary: 2 },
    ],
  },
];

describe("LineChart", () => {
  test("renders normalized chart containers and titles", () => {
    const markup = renderToStaticMarkup(
      <LineChart data={chartData} title="Line Title" />,
    );

    expect(markup).toContain("post__chart");
    expect(markup).toContain("Line Title");
  });
});
