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

test("uses the snapshot table’s five projects and totals on one shared scale", async () => {
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
  const snapshotSection = article.split("### Initial Override Snapshot")[1];
  const table = snapshotSection.split("\n\n")[1];
  const rows = table.trim().split("\n").slice(2);
  const tableMetrics = rows.map((row) => {
    const cells = row.split("|");
    const project = cells[1].match(/\*\*([^*]+)\*\*/)?.[1];
    const overrides = Number(cells[3]);
    return { project, overrides };
  });
  const chartMetrics = pastoralistCleanupMetrics.map(({ project, overrides }) => ({
    project,
    overrides,
  }));
  expect(chartMetrics).toEqual(tableMetrics);
  expect(pastoralistCleanupMetrics.map(({ unused }) => unused)).toEqual([56, 41, 35, 3, 5]);
  expect(article).not.toContain("### Unused Override Cleanup Sample");
  const labels = document.querySelectorAll(".recharts-yAxis-tick-labels text");
  expect(Array.from(labels).map((label) => label.textContent)).toEqual(
    chartMetrics.map((metric) => metric.project),
  );
  expect(document.querySelectorAll(".study-unused .recharts-bar-rectangle")).toHaveLength(5);
  expect(document.querySelectorAll(".study-overrides .recharts-bar-rectangle")).toHaveLength(5);
});
