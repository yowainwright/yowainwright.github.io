import { afterEach, expect, test } from "vitest";
import React, { act } from "react";
import { useCodeTooltips } from "../../../../lib/hooks/useCodeTooltips";
import { cleanupMountedRoots, createMountedRoot, setupDom } from "../../test-utils/react-dom";

afterEach(cleanupMountedRoots);

test("shows the active field during scrolling without stealing focus and respects Escape until the next step", async () => {
  const dom = setupDom(`<article id="post"><div class="scrolly-code">
    <div class="scrolly-code__frames"><section>
      <span class="line scrolly-code-highlight"><button class="shiki-tooltip">first</button></span>
      <span class="line"><button class="shiki-tooltip">second</button></span>
    </section></div>
    <span class="shiki-tooltip" data-tooltip-auto data-tooltip-step="0" data-tooltip="First explanation"></span>
  </div></article>`);
  const content = document.querySelector<HTMLElement>("#post");
  const viewport = document.querySelector<HTMLElement>(".scrolly-code__frames")!;
  viewport.getBoundingClientRect = () => new dom.window.DOMRect(0, 150, 500, 450);
  const fields = document.querySelectorAll<HTMLElement>(".line .shiki-tooltip");
  fields.forEach((field, index) => {
    field.getBoundingClientRect = () => new dom.window.DOMRect(50, 200 + index * 100, 100, 20);
  });
  function Probe() {
    useCodeTooltips(content);
    return null;
  }
  await createMountedRoot(<Probe />);
  const tip = document.querySelector<HTMLElement>("[data-tooltip-auto]")!;
  expect(tip.hasAttribute("data-tooltip-open")).toBe(true);
  expect(tip.dataset.tooltipPlacement).toBe("right");
  expect(tip.style.getPropertyValue("--tooltip-x")).toBe("162px");
  const firstPosition = tip.style.getPropertyValue("--tooltip-y");
  window.dispatchEvent(new dom.window.Event("scroll"));
  expect(tip.hasAttribute("data-tooltip-open")).toBe(true);
  document.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Escape" }));
  window.dispatchEvent(new dom.window.Event("scroll"));
  expect(tip.hasAttribute("data-tooltip-open")).toBe(false);
  const lines = document.querySelectorAll(".line");
  lines[0].classList.remove("scrolly-code-highlight");
  lines[1].classList.add("scrolly-code-highlight");
  tip.dataset.tooltipStep = "1";
  tip.dataset.tooltip = "Second explanation";
  content?.dispatchEvent(new dom.window.Event("code-tooltip-step"));
  expect(tip.hasAttribute("data-tooltip-open")).toBe(true);
  expect(tip.dataset.tooltip).toBe("Second explanation");
  expect(tip.style.getPropertyValue("--tooltip-y")).not.toBe(firstPosition);
  expect(document.activeElement).toBe(document.body);
  tip.dataset.tooltipAnchor = "first";
  content?.dispatchEvent(new dom.window.Event("code-tooltip-step"));
  expect(tip.style.getPropertyValue("--tooltip-y")).toBe(firstPosition);
  delete tip.dataset.tooltipAnchor;
  content?.dispatchEvent(new dom.window.Event("code-tooltip-step"));
  expect(tip.style.getPropertyValue("--tooltip-y")).not.toBe(firstPosition);
  Object.defineProperty(dom.window, "innerWidth", { value: 320, configurable: true });
  window.dispatchEvent(new dom.window.Event("resize"));
  expect(tip.dataset.tooltipPlacement).toBe("top");
  expect(tip.style.getPropertyValue("--tooltip-width")).toBe("288px");
  Object.defineProperty(dom.window, "matchMedia", {
    value: () => ({ matches: true }),
    configurable: true,
  });
  window.dispatchEvent(new dom.window.Event("resize"));
  expect(tip.hasAttribute("data-tooltip-open")).toBe(false);
  Object.defineProperty(dom.window, "matchMedia", {
    value: () => ({ matches: false }),
    configurable: true,
  });
  window.dispatchEvent(new dom.window.Event("resize"));
  expect(tip.hasAttribute("data-tooltip-open")).toBe(true);
  fields[1].getBoundingClientRect = () => new dom.window.DOMRect(50, -100, 100, 20);
  window.dispatchEvent(new dom.window.Event("scroll"));
  expect(tip.hasAttribute("data-tooltip-open")).toBe(false);
});

test("hover, focus, and tapping a code token do not open a tooltip", async () => {
  const dom = setupDom('<article id="post"></article>');
  const content = document.querySelector<HTMLElement>("#post");
  function Probe() {
    useCodeTooltips(content);
    return null;
  }
  await createMountedRoot(<Probe />);
  const trigger = document.createElement("button");
  trigger.className = "shiki-tooltip";
  trigger.dataset.tooltip = "Tracks the override";
  trigger.textContent = "appendix";
  content?.append(trigger);
  trigger.dispatchEvent(new dom.window.Event("pointerover", { bubbles: true }));
  expect(trigger.hasAttribute("data-tooltip-open")).toBe(false);
  await act(async () => trigger.focus());
  expect(trigger.hasAttribute("data-tooltip-open")).toBe(false);
  trigger.click();
  expect(trigger.hasAttribute("data-tooltip-open")).toBe(false);
  window.dispatchEvent(new dom.window.Event("scroll"));
  expect(trigger.hasAttribute("data-tooltip-open")).toBe(false);
});
