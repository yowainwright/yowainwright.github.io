"use client";

import { useEffect } from "react";

export type TooltipAnchor = { anchor: Element; viewport?: Element | null; textEnd?: Node };
type AnchorResolver = (trigger: HTMLElement) => TooltipAnchor | null;

const TOOLTIP_SELECTOR = ".scroll-tooltip";
const OPEN_SELECTOR = ".scroll-tooltip[data-tooltip-open]";

export function useScrollTooltips(
  contentElement: HTMLElement | null,
  resolveAnchor?: AnchorResolver,
) {
  useEffect(() => {
    if (!contentElement) return;
    return attachTooltips(contentElement, resolveAnchor);
  }, [contentElement, resolveAnchor]);
}

function attachTooltips(root: HTMLElement, resolveAnchor?: AnchorResolver) {
  const dismissed = new WeakMap<HTMLElement, string>();
  const close = () => closeTooltips(root);
  const refresh = () => refreshAutoTooltip(root, dismissed, resolveAnchor);
  let frame = 0;
  const scroll = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      refresh();
    });
  };
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
  root.addEventListener("scroll-tooltip-step", refresh);
  window.addEventListener("scroll", scroll, true);
  window.addEventListener("resize", refresh);
  const observer = new MutationObserver(scroll);
  observer.observe(root, { childList: true, subtree: true });
  refresh();
  return () => {
    observer.disconnect();
    window.cancelAnimationFrame(frame);
    detachTooltips(root, { close, keydown, outside, refresh, scroll });
  };
}

function detachTooltips(
  root: HTMLElement,
  handlers: {
    close: () => void;
    keydown: (event: KeyboardEvent) => void;
    outside: (event: PointerEvent) => void;
    refresh: () => void;
    scroll: () => void;
  },
) {
  const { close, keydown, outside, refresh, scroll } = handlers;
  document.removeEventListener("keydown", keydown);
  document.removeEventListener("pointerdown", outside);
  root.removeEventListener("scroll-tooltip-step", refresh);
  window.removeEventListener("scroll", scroll, true);
  window.removeEventListener("resize", refresh);
  close();
}

function refreshAutoTooltip(
  root: HTMLElement,
  dismissed: WeakMap<HTMLElement, string>,
  resolveAnchor?: AnchorResolver,
) {
  const compact = window.matchMedia?.("(max-width: 599px)").matches ?? false;
  if (compact) return closeTooltips(root);
  const tips = Array.from(root.querySelectorAll<HTMLElement>("[data-tooltip-auto]"));
  const candidates = tips.flatMap((trigger) => {
    const item = getTooltipAnchor(trigger, root, resolveAnchor);
    return item ? [item] : [];
  });
  const visible = candidates.filter(isVisibleAnchor);
  const [candidate] = visible.toSorted((a, b) => getCenterDistance(a) - getCenterDistance(b));
  if (!candidate) return closeTooltips(root);
  const { trigger } = candidate;
  const isDismissed = dismissed.get(trigger) === trigger.dataset.tooltipStep;
  if (isDismissed) return closeTooltips(root);
  closeTooltips(root, trigger);
  positionTooltip(trigger, candidate);
  trigger.setAttribute("data-tooltip-open", "");
}

function getCenterDistance({ anchor }: TooltipAnchor) {
  const rect = anchor.getBoundingClientRect();
  const center = rect.top + rect.height / 2;
  const distance = Math.abs(center - window.innerHeight / 2);
  return distance;
}

function getTooltipAnchor(trigger: HTMLElement, root: HTMLElement, resolveAnchor?: AnchorResolver) {
  const id = trigger.dataset.tooltipTarget;
  const selector = trigger.dataset.tooltipSelector;
  const selected = selector ? root.querySelector(selector) : null;
  const anchor = id ? trigger.ownerDocument.getElementById(id) : selected;
  const resolved = anchor ? { anchor } : resolveAnchor?.(trigger);
  if (!resolved) return null;
  return Object.assign({ trigger }, resolved);
}

function isVisibleAnchor({ anchor, viewport }: TooltipAnchor) {
  const bounds = viewport?.getBoundingClientRect();
  const rect = anchor.getBoundingClientRect();
  const top = Math.max(bounds?.top ?? 0, 128);
  const bottom = Math.min(bounds?.bottom ?? window.innerHeight, window.innerHeight);
  const left = bounds?.left ?? 0;
  const right = bounds?.right ?? window.innerWidth;
  const vertical = rect.bottom > top && rect.top < bottom;
  const horizontal = rect.right > left && rect.left < right;
  return vertical && horizontal;
}

function positionTooltip(trigger: HTMLElement, { anchor, textEnd }: TooltipAnchor) {
  const fallback = anchor.getBoundingClientRect();
  const rect = textEnd ? getEndCharacterRect(textEnd, fallback) : fallback;
  const popup = trigger.querySelector<HTMLElement>(".scroll-tooltip__content");
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
