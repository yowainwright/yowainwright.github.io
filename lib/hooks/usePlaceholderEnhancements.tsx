"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { PlaceholderEnhancementOptions, PlaceholderTarget } from "./types";

export function usePlaceholderEnhancements({
  contentElement,
  contentKey,
  render,
  selector,
}: PlaceholderEnhancementOptions) {
  const [targets, setTargets] = useState<PlaceholderTarget[]>([]);

  useEffect(() => {
    if (!contentElement) {
      setTargets([]);
      return;
    }
    const refresh = () => {
      const next = getPlaceholderTargets(contentElement, selector);
      setTargets((previous) => {
        const sameElements =
          previous.length === next.length &&
          previous.every((target, index) => target.element === next[index].element);
        return sameElements ? previous : next;
      });
    };
    refresh();
    const observer = new MutationObserver(refresh);
    observer.observe(contentElement, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [contentElement, contentKey, selector]);

  return useMemo(
    () =>
      targets.flatMap(({ element, index }) => {
        const child = render(element, index);
        if (!child) return [];

        return [createPortal(child, element, `${contentKey}:${selector}:${index}`)];
      }),
    [contentKey, render, selector, targets],
  );
}

const getPlaceholderTargets = (
  contentElement: HTMLElement,
  selector: string,
): PlaceholderTarget[] =>
  Array.from(contentElement.querySelectorAll<HTMLElement>(selector)).map((element, index) => ({
    element,
    index,
  }));
