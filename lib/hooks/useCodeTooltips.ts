"use client";

import { useEffect } from "react";

const TOOLTIP_SELECTOR = ".shiki-tooltip";
const OPEN_SELECTOR = ".shiki-tooltip[data-tooltip-open]";

export function useCodeTooltips(contentElement: HTMLElement | null) {
  useEffect(() => {
    if (!contentElement) return;
    return attachTooltips(contentElement);
  }, [contentElement]);
}

function attachTooltips(root: HTMLElement) {
  const dismissed = new WeakMap<HTMLElement, string>();
  const close = () => closeTooltips(root);
  const refresh = () => refreshAutoTooltip(root, dismissed);
  const dismiss = () => {
    root.querySelectorAll<HTMLElement>("[data-tooltip-auto][data-tooltip-open]").forEach((tip) => {
      dismissed.set(tip, tip.dataset.tooltipStep ?? "");
    });
    close();
  };
  const keydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") dismiss();
  };
  const outside = (event: PointerEvent) => {
    const target = event.target instanceof HTMLElement ? event.target : null;
    const isTooltip = target?.closest(TOOLTIP_SELECTOR);
    if (!isTooltip) dismiss();
  };
  document.addEventListener("keydown", keydown);
  document.addEventListener("pointerdown", outside);
  root.addEventListener("code-tooltip-step", refresh);
  window.addEventListener("scroll", refresh, true);
  window.addEventListener("resize", refresh);
  refresh();
  return () => detachTooltips(root, { close, keydown, outside, refresh });
}

function detachTooltips(
  root: HTMLElement,
  handlers: {
    close: () => void;
    keydown: (event: KeyboardEvent) => void;
    outside: (event: PointerEvent) => void;
    refresh: () => void;
  },
) {
  const { close, keydown, outside, refresh } = handlers;
  document.removeEventListener("keydown", keydown);
  document.removeEventListener("pointerdown", outside);
  root.removeEventListener("code-tooltip-step", refresh);
  window.removeEventListener("scroll", refresh, true);
  window.removeEventListener("resize", refresh);
  close();
}

function refreshAutoTooltip(root: HTMLElement, dismissed: WeakMap<HTMLElement, string>) {
  const compact = window.matchMedia?.("(max-width: 599px)").matches ?? false;
  if (compact) return closeTooltips(root);
  const tips = Array.from(root.querySelectorAll<HTMLElement>("[data-tooltip-auto]"));
  const candidates = tips.map(getAutoTooltipAnchor);
  const candidate = candidates.find((item) => item && isVisibleAnchor(item.anchor));
  if (!candidate) return closeTooltips(root);
  const { trigger, anchor } = candidate;
  const isDismissed = dismissed.get(trigger) === trigger.dataset.tooltipStep;
  if (isDismissed) return closeTooltips(root);
  closeTooltips(root, trigger);
  positionTooltip(trigger, anchor);
  trigger.setAttribute("data-tooltip-open", "");
}

function getAutoTooltipAnchor(trigger: HTMLElement) {
  const walk = trigger.closest(".scrolly-code");
  const frame = walk?.querySelector(".scrolly-code__frames section:not([hidden])");
  const anchor =
    getCustomAnchor(frame, trigger.dataset.tooltipAnchor) ??
    frame?.querySelector<HTMLElement>(".scrolly-code-highlight .shiki-tooltip") ??
    frame?.querySelector<HTMLElement>(".scrolly-code-highlight") ??
    frame?.querySelector<HTMLElement>(".diff.add .shiki-tooltip") ??
    frame?.querySelector<HTMLElement>(".line");
  if (!anchor) return null;
  return { trigger, anchor };
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

function isVisibleAnchor(anchor: HTMLElement) {
  const viewport = anchor.closest(".scrolly-code__frames");
  if (!viewport) return false;
  const bounds = viewport.getBoundingClientRect();
  const rect = anchor.getBoundingClientRect();
  const top = Math.max(bounds.top, 128);
  const bottom = Math.min(bounds.bottom, window.innerHeight);
  const vertical = rect.bottom > top && rect.top < bottom;
  const horizontal = rect.right > bounds.left && rect.left < bounds.right;
  return vertical && horizontal;
}

function positionTooltip(trigger: HTMLElement, anchor = trigger) {
  const custom = Boolean(trigger.dataset.tooltipAnchor);
  const line = anchor.closest(".line") ?? anchor;
  const target = custom ? anchor : line;
  const fallback = anchor.getBoundingClientRect();
  const rect = getEndCharacterRect(target, fallback);
  const popup = trigger.querySelector<HTMLElement>(".code-tooltip-content");
  const height = popup?.offsetHeight ?? 0;
  const position = getTooltipPosition(rect, height);
  const { width, left, arrowLeft, top, placement, arrowTop } = position;
  trigger.style.setProperty("--tooltip-width", `${width}px`);
  trigger.style.setProperty("--tooltip-x", `${left}px`);
  trigger.style.setProperty("--tooltip-arrow-x", `${arrowLeft}px`);
  trigger.style.setProperty("--tooltip-y", `${top}px`);
  trigger.style.setProperty("--tooltip-arrow-y", `${arrowTop}px`);
  trigger.setAttribute("data-tooltip-placement", placement);
}

function getEndCharacterRect(root: Node, fallback: DOMRect) {
  const text = getLastTextNode(root);
  if (!text) return fallback;
  const end = text.textContent?.trimEnd().length ?? 0;
  const range = document.createRange();
  const start = Math.max(0, end - 1);
  range.setStart(text, start);
  range.setEnd(text, end);
  const rect = range.getBoundingClientRect?.();
  const hasSize = rect && rect.width > 0;
  if (!hasSize) return fallback;
  return rect;
}

function getLastTextNode(root: Node): Text | null {
  const last = Array.from(root.childNodes).findLast((node) => node.textContent?.trim());
  if (!last) return null;
  if (last.nodeType === Node.TEXT_NODE) return last as Text;
  return getLastTextNode(last);
}

function getTooltipPosition(rect: DOMRect, height: number) {
  const left = rect.right + 12;
  const availableWidth = window.innerWidth - left - 16;
  if (availableWidth >= 180) {
    const width = Math.min(288, availableWidth);
    const center = rect.top + rect.height / 2;
    const topLimit = 136 + height / 2;
    const bottomLimit = window.innerHeight - height / 2 - 16;
    const top = Math.max(topLimit, Math.min(center, bottomLimit));
    const arrowLeft = left + 2;
    return { width, left, arrowLeft, top, arrowTop: center, placement: "right" };
  }
  return getVerticalTooltipPosition(rect, height);
}

function getVerticalTooltipPosition(rect: DOMRect, height: number) {
  const width = Math.min(288, window.innerWidth - 32);
  const center = rect.left + rect.width / 2;
  const rightLimit = window.innerWidth - width / 2 - 16;
  const left = Math.max(width / 2 + 16, Math.min(center, rightLimit));
  const arrowLeft = Math.max(left - width / 2 + 16, Math.min(center, left + width / 2 - 16));
  const below = rect.top < height + 144;
  const top = below ? rect.bottom + 8 : rect.top - 8;
  const placement = below ? "bottom" : "top";
  return { width, left, arrowLeft, top, arrowTop: top, placement };
}

function closeTooltips(root: HTMLElement, except?: HTMLElement) {
  root.querySelectorAll(OPEN_SELECTOR).forEach((element) => {
    if (element !== except) element.removeAttribute("data-tooltip-open");
  });
}
