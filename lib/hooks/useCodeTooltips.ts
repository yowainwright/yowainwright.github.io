"use client";

import { useScrollTooltips } from "./useScrollTooltips";

export function useCodeTooltips(contentElement: HTMLElement | null) {
  useScrollTooltips(contentElement, getCodeTooltipAnchor);
}

function getCodeTooltipAnchor(trigger: HTMLElement) {
  const walk = trigger.closest(".scrolly-code");
  const frame = walk?.querySelector(".scrolly-code__frames section:not([hidden])");
  const anchor =
    getCustomAnchor(frame, trigger.dataset.tooltipAnchor) ??
    frame?.querySelector<HTMLElement>(".scrolly-code-highlight .shiki-tooltip") ??
    frame?.querySelector<HTMLElement>(".scrolly-code-highlight") ??
    frame?.querySelector<HTMLElement>(".diff.add .shiki-tooltip") ??
    frame?.querySelector<HTMLElement>(".line");
  if (!anchor) return null;
  const viewport = walk?.querySelector(".scrolly-code__frames");
  const custom = Boolean(trigger.dataset.tooltipAnchor);
  const line = anchor.closest(".line") ?? anchor;
  const textEnd = custom ? anchor : line;
  return { anchor, viewport, textEnd };
}

function getCustomAnchor(frame: Element | null | undefined, label?: string) {
  const canSearch = frame && label;
  if (!canSearch) return;
  const tokens = Array.from(frame.querySelectorAll<HTMLElement>(".line span, .line button"));
  return tokens.find((token) => {
    const text = token.textContent?.trim();
    const matches = text === label || text === `"${label}"`;
    return matches;
  });
}
