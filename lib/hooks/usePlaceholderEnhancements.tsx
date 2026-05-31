"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { PlaceholderEnhancementOptions, PlaceholderTarget } from "./types";

const getPlaceholderTargets = (
  contentElement: HTMLElement,
  selector: string,
): PlaceholderTarget[] =>
  Array.from(contentElement.querySelectorAll<HTMLElement>(selector)).map((element, index) => ({
    element,
    index,
  }));

export function usePlaceholderEnhancements({
  contentElement,
  contentKey,
  render,
  selector,
}: PlaceholderEnhancementOptions) {
  const [targets, setTargets] = useState<PlaceholderTarget[]>([]);

  useEffect(() => {
    setTargets(contentElement ? getPlaceholderTargets(contentElement, selector) : []);
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
