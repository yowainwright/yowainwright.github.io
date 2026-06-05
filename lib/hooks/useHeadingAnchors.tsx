"use client";

import { useCallback } from "react";
import HeadingAnchor from "../components/HeadingAnchor";
import { HEADING_ANCHOR_PLACEHOLDER_SELECTOR } from "./constants";
import { usePlaceholderEnhancements } from "./usePlaceholderEnhancements";

export function useHeadingAnchors(contentKey: string, contentElement: HTMLElement | null) {
  const renderHeadingAnchor = useCallback((element: HTMLElement) => {
    const headingId = element.getAttribute("href")?.replace("#", "");

    if (!headingId) return null;
    return <HeadingAnchor headingId={headingId} />;
  }, []);

  return usePlaceholderEnhancements({
    contentElement,
    contentKey,
    render: renderHeadingAnchor,
    selector: HEADING_ANCHOR_PLACEHOLDER_SELECTOR,
  });
}
