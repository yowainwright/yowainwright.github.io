import { afterEach, expect, test } from "vitest";
import React, { act } from "react";
import { Tooltip } from "../../../../lib/components/Tooltip";
import { useScrollTooltips } from "../../../../lib/hooks/useScrollTooltips";
import { cleanupMountedRoots, createMountedRoot, setupDom } from "../../test-utils/react-dom";

afterEach(cleanupMountedRoots);

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
  window.dispatchEvent(new dom.window.Event("scroll"));
  const tips = document.querySelectorAll<HTMLElement>(".scroll-tooltip");
  expect(tips[0].hasAttribute("data-tooltip-open")).toBe(true);
  expect(tips[0].style.getPropertyValue("--tooltip-x")).toBe("132px");
  expect(tips[1].hasAttribute("data-tooltip-open")).toBe(false);
  cell.getBoundingClientRect = () => new dom.window.DOMRect(40, -30, 80, 24);
  mark.getBoundingClientRect = () => new dom.window.DOMRect(40, 220, 200, 20);
  window.dispatchEvent(new dom.window.Event("scroll"));
  expect(tips[0].hasAttribute("data-tooltip-open")).toBe(false);
  expect(tips[1].hasAttribute("data-tooltip-open")).toBe(true);
  expect(tips[1].style.getPropertyValue("--tooltip-x")).toBe("252px");
  expect(document.activeElement).toBe(document.body);
  document.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Escape" }));
  window.dispatchEvent(new dom.window.Event("scroll"));
  expect(tips[1].hasAttribute("data-tooltip-open")).toBe(false);
  tips[1].dataset.tooltipStep = "next";
  content?.dispatchEvent(new dom.window.Event("scroll-tooltip-step"));
  expect(tips[1].hasAttribute("data-tooltip-open")).toBe(true);
  await act(async () => root.unmount());
  window.dispatchEvent(new dom.window.Event("scroll"));
  expect(document.querySelector(".scroll-tooltip")).toBeNull();
});
