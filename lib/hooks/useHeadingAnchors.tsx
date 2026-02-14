"use client";

import { useEffect, useRef, useCallback } from "react";
import { createRoot, Root } from "react-dom/client";
import HeadingAnchor from "../components/HeadingAnchor";

export function useHeadingAnchors() {
  const rootsRef = useRef<Map<HTMLElement, Root>>(new Map());
  const observerRef = useRef<MutationObserver | null>(null);

  const mountHeadingIcons = useCallback(() => {
    const placeholders = document.querySelectorAll(".heading-icon-placeholder");

    placeholders.forEach((placeholder) => {
      const element = placeholder as HTMLElement;
      const headingId = element.getAttribute("href")?.replace("#", "");

      if (!headingId || rootsRef.current.has(element)) return;

      const root = createRoot(element);
      root.render(<HeadingAnchor headingId={headingId} />);
      rootsRef.current.set(element, root);
    });
  }, []);

  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    rootsRef.current.forEach((root) => root.unmount());
    rootsRef.current.clear();
  }, []);

  useEffect(() => {
    mountHeadingIcons();

    let timeoutId: NodeJS.Timeout;
    const debouncedMount = (mutations: MutationRecord[]) => {
      const hasRelevantChanges = mutations.some((mutation) => {
        const hasAddedNodes = mutation.addedNodes.length > 0;
        if (!hasAddedNodes) return false;

        return Array.from(mutation.addedNodes).some((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return false;
          const element = node as HTMLElement;
          return (
            element.querySelector?.(".heading-icon-placeholder") ||
            element.classList?.contains("heading-icon-placeholder")
          );
        });
      });

      if (hasRelevantChanges) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(mountHeadingIcons, 100);
      }
    };

    if (!observerRef.current) {
      const contentArea = document.querySelector(".post__content");
      const targetNode = contentArea || document.body;

      observerRef.current = new MutationObserver(debouncedMount);
      observerRef.current.observe(targetNode, {
        childList: true,
        subtree: true,
      });
    }

    return cleanup;
  }, []);

  return { mountHeadingIcons, cleanup };
}
