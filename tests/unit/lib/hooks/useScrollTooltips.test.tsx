import { afterEach, expect, test, vi } from "vitest";
import React, { act } from "react";
import { Tooltip } from "../../../../lib/components/Tooltip";
import { useScrollTooltips } from "../../../../lib/hooks/useScrollTooltips";
import { cleanupMountedRoots, createMountedRoot, setupDom } from "../../test-utils/react-dom";

afterEach(async () => {
  await cleanupMountedRoots();
  vi.restoreAllMocks();
});

test("anchors shared tooltips to table cells and SVG chart marks as they scroll into view", async () => {
  const dom = setupDom("");
  const content = document.body;
  function Example() {
    useScrollTooltips(content);
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td id="entry-count">89</td>
            </tr>
          </tbody>
        </table>
        <svg>
          <rect id="manifest-count" width="100" height="20" />
        </svg>
        <Tooltip step="entries" targetId="entry-count">
          Recorded entries
        </Tooltip>
        <Tooltip step="manifests" targetId="manifest-count">
          Scanned manifests
        </Tooltip>
      </>
    );
  }
  const root = await createMountedRoot(<Example />);
  const cell = document.getElementById("entry-count")!;
  const mark = document.getElementById("manifest-count")!;
  cell.getBoundingClientRect = () => new dom.window.DOMRect(40, 200, 80, 24);
  mark.getBoundingClientRect = () => new dom.window.DOMRect(40, 1000, 200, 20);
  await scrollWindow(dom);
  const tips = document.querySelectorAll<HTMLElement>(".scroll-tooltip");
  expect(tips[0].hasAttribute("data-tooltip-open")).toBe(true);
  expect(tips[0].style.getPropertyValue("--tooltip-x")).toBe("132px");
  expect(tips[1].hasAttribute("data-tooltip-open")).toBe(false);
  mark.getBoundingClientRect = () => new dom.window.DOMRect(40, 370, 200, 20);
  await scrollWindow(dom);
  expect(document.querySelectorAll("[data-tooltip-open]")).toHaveLength(1);
  expect(tips[1].hasAttribute("data-tooltip-open")).toBe(true);
  mark.getBoundingClientRect = () => new dom.window.DOMRect(40, 1000, 200, 20);
  await scrollWindow(dom);
  expect(tips[0].hasAttribute("data-tooltip-open")).toBe(true);
  cell.getBoundingClientRect = () => new dom.window.DOMRect(40, -30, 80, 24);
  mark.getBoundingClientRect = () => new dom.window.DOMRect(40, 220, 200, 20);
  await scrollWindow(dom);
  expect(tips[0].hasAttribute("data-tooltip-open")).toBe(false);
  expect(tips[1].hasAttribute("data-tooltip-open")).toBe(true);
  expect(tips[1].style.getPropertyValue("--tooltip-x")).toBe("252px");
  expect(document.activeElement).toBe(document.body);
  document.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Escape" }));
  await scrollWindow(dom);
  expect(tips[1].hasAttribute("data-tooltip-open")).toBe(false);
  tips[1].dataset.tooltipStep = "next";
  content?.dispatchEvent(new dom.window.Event("scroll-tooltip-step"));
  expect(tips[1].hasAttribute("data-tooltip-open")).toBe(true);
  await act(async () => root.unmount());
  await scrollWindow(dom);
  expect(document.querySelector(".scroll-tooltip")).toBeNull();
});

test("resolves a table or chart selector inside the article only", async () => {
  const dom = setupDom('<div class="snapshot"></div>');
  function Example() {
    const [article, setArticle] = React.useState<HTMLElement | null>(null);
    useScrollTooltips(article);
    return (
      <article ref={setArticle}>
        <table className="snapshot"><tbody><tr><td>58</td></tr></tbody></table>
        <Tooltip step="table" targetSelector=".snapshot">Unexplained overrides</Tooltip>
      </article>
    );
  }
  const root = await createMountedRoot(<Example />);
  const table = document.querySelector("table")!;
  table.getBoundingClientRect = () => new dom.window.DOMRect(40, 200, 200, 100);
  const tip = document.querySelector<HTMLElement>(".scroll-tooltip")!;
  await scrollWindow(dom);
  expect(tip.hasAttribute("data-tooltip-open")).toBe(true);
  expect(tip.style.getPropertyValue("--tooltip-x")).toBe("252px");
  await act(async () => root.unmount());
});

test("coalesces scroll events into one frame and cancels pending work on unmount", async () => {
  const dom = setupDom('<div id="anchor"></div>');
  let frame: FrameRequestCallback = () => {};
  const request = vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    frame = callback;
    return 42;
  });
  const cancel = vi.spyOn(window, "cancelAnimationFrame");
  function Example() {
    useScrollTooltips(document.body);
    return <Tooltip step="test" targetId="anchor">Explanation</Tooltip>;
  }
  const root = await createMountedRoot(<Example />);
  document.getElementById("anchor")!.getBoundingClientRect = () => new dom.window.DOMRect(40, 200, 100, 20);
  window.dispatchEvent(new dom.window.Event("scroll"));
  window.dispatchEvent(new dom.window.Event("scroll"));
  window.dispatchEvent(new dom.window.Event("scroll"));
  expect(request).toHaveBeenCalledOnce();
  expect(document.querySelector("[data-tooltip-open]")).toBeNull();
  frame(0);
  expect(document.querySelector("[data-tooltip-open]")).not.toBeNull();
  window.dispatchEvent(new dom.window.Event("scroll"));
  expect(request).toHaveBeenCalledTimes(2);
  await act(async () => root.unmount());
  expect(cancel).toHaveBeenCalledWith(42);
});

test("opens an annotation when its deferred chart mounts without another scroll", async () => {
  const dom = setupDom("");
  function Example() {
    useScrollTooltips(document.body);
    return <Tooltip step="chart" targetSelector=".chart">Chart findings</Tooltip>;
  }
  await createMountedRoot(<Example />);
  expect(document.querySelector("[data-tooltip-open]")).toBeNull();
  const chart = document.createElement("div");
  chart.className = "chart";
  chart.getBoundingClientRect = () => new dom.window.DOMRect(40, 200, 200, 100);
  document.body.appendChild(chart);
  await new Promise<void>((resolve) => window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => resolve());
  }));
  expect(document.querySelector("[data-tooltip-open]")?.textContent).toBe("Chart findings");
});

async function scrollWindow(dom: ReturnType<typeof setupDom>) {
  window.dispatchEvent(new dom.window.Event("scroll"));
  await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
}
