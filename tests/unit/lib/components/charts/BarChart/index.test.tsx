import { describe, expect, test } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BarChart } from "../../../../../../lib/components/charts/BarChart";

const chartData = [
  {
    label: "Series A",
    data: [
      { primary: "A", secondary: 1 },
      { primary: "B", secondary: 2 },
    ],
  },
];

describe("BarChart", () => {
  test("renders normalized chart containers and titles", () => {
    const markup = renderToStaticMarkup(
      <BarChart data={chartData} title="Bar Title" />,
    );

    expect(markup).toContain("post__chart");
    expect(markup).toContain("Bar Title");
  });
});
