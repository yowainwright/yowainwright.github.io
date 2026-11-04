import { afterEach, expect, test, vi } from "vitest";
import React, { type ReactElement } from "react";
import { PastoralistStudyCharts } from "../../../../../../lib/components/content/why-pastoralist/PastoralistStudyCharts";
import { pastoralistStudyMetrics } from "../../../../../../lib/components/content/why-pastoralist/PastoralistStudyCharts/constants";
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
  await cleanupMountedRoots();
  vi.unstubAllGlobals();
});

test("uses one shared scale with repository and PR axis links", async () => {
  setupDom("");
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal("ResizeObserver", ResizeObserver);
  await createMountedRoot(<PastoralistStudyCharts />);
  expect(document.querySelectorAll(".recharts-wrapper")).toHaveLength(1);
  expect(document.querySelectorAll(".recharts-xAxis")).toHaveLength(1);
  const axisLinks = Array.from(document.querySelectorAll<SVGAElement>(".study-project-link"));
  const prLinks = Array.from(document.querySelectorAll<SVGAElement>(".study-pr-link"));
  expect(axisLinks).toHaveLength(12);
  expect(prLinks).toHaveLength(12);
  const axisByName = new Map(
    axisLinks.map((link) => {
      const name = link.textContent;
      return [name, link] as const;
    }),
  );
  const prByUrl = new Map(
    prLinks.map((link) => {
      const href = link.getAttribute("href");
      return [href, link] as const;
    }),
  );
  pastoralistStudyMetrics.forEach((metric) => {
    const axisLink = axisByName.get(metric.project);
    const repository = metric.upstreamRef.split("@")[0];
    expect(axisLink?.getAttribute("href")).toBe(`https://github.com/${repository}`);
    const prLink = prByUrl.get(metric.prUrl);
    expect(prLink?.getAttribute("aria-label")).toContain(metric.upstreamRef);
  });
  expect(document.querySelectorAll(".study-entries .recharts-bar-rectangle")).toHaveLength(12);
  expect(document.querySelectorAll(".study-manifests .recharts-bar-rectangle")).toHaveLength(12);
});
