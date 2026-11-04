import { readFileSync } from "node:fs";
import { afterEach, expect, test, vi } from "vitest";
import React, { act, type ReactElement } from "react";
import { PastoralistStudyCharts } from "../../../../../../lib/components/content/why-pastoralist/PastoralistStudyCharts";
import { pastoralistCleanupMetrics } from "../../../../../../lib/components/content/why-pastoralist/PastoralistStudyCharts/constants";
import { cleanupMountedRoots, createMountedRoot, setupDom } from "../../../../test-utils/react-dom";

vi.mock("recharts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("recharts")>();
  function ResponsiveContainer({
    children,
  }: {
    children: ReactElement<{ width?: number; height?: number }>;
  }) {
    return React.cloneElement(children, { width: 800, height: 480 });
  }
  return Object.assign({}, actual, { ResponsiveContainer });
});

afterEach(async () => {
  await act(async () => vi.runOnlyPendingTimers());
  await cleanupMountedRoots();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

test("uses the cleanup tables’ five projects and counts on one shared scale", async () => {
  vi.useFakeTimers();
  const dom = setupDom("");
  vi.stubGlobal("cancelAnimationFrame", dom.window.cancelAnimationFrame.bind(dom.window));
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal("ResizeObserver", ResizeObserver);
  await createMountedRoot(<PastoralistStudyCharts />);
  expect(document.querySelectorAll(".recharts-wrapper")).toHaveLength(1);
  expect(document.querySelectorAll(".recharts-xAxis")).toHaveLength(1);
  const article = readFileSync("content/why-pastoralist.mdx", "utf8");
  const cleanupSection = article.split("### Unused Override Cleanup Sample")[1];
  const table = cleanupSection.split("\n\n")[1];
  const rows = table.trim().split("\n").slice(2);
  const tableMetrics = rows.map((row) => {
    const cells = row.split("|");
    const project = cells[1].match(/\*\*([^*]+)\*\*/)?.[1];
    const overrides = Number(cells[2]);
    const unused = Number(cells[3]);
    return { project, overrides, unused };
  });
  const chartMetrics = pastoralistCleanupMetrics.map(({ project, overrides, unused }) => ({
    project,
    overrides,
    unused,
  }));
  expect(chartMetrics).toEqual(tableMetrics);
  const labels = document.querySelectorAll(".recharts-yAxis text");
  expect(Array.from(labels).map((label) => label.textContent)).toEqual(
    chartMetrics.map((metric) => metric.project),
  );
  expect(document.querySelectorAll(".study-unused .recharts-bar-rectangle")).toHaveLength(5);
  expect(document.querySelectorAll(".study-overrides .recharts-bar-rectangle")).toHaveLength(5);
});
