"use client";

import { useEffect, useRef, useCallback } from "react";
import { createRoot, Root } from "react-dom/client";
import CopyButton from "../components/CopyButton";

export function useCodeBlocks() {
  const rootsRef = useRef<Map<HTMLElement, Root>>(new Map());
  const observerRef = useRef<MutationObserver | null>(null);

  const mountCopyButtons = useCallback(() => {
    const placeholders = document.querySelectorAll(".copy-button-placeholder");

    placeholders.forEach((placeholder) => {
      const element = placeholder as HTMLElement;
      const codeId = element.getAttribute("data-code-id");

      if (!codeId || rootsRef.current.has(element)) return;

      const root = createRoot(element);
      root.render(<CopyButton codeId={codeId} />);
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
    mountCopyButtons();

    let timeoutId: NodeJS.Timeout;
    const debouncedMount = (mutations: MutationRecord[]) => {
      const hasRelevantChanges = mutations.some((mutation) => {
        const hasAddedNodes = mutation.addedNodes.length > 0;
        if (!hasAddedNodes) return false;

        return Array.from(mutation.addedNodes).some((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return false;
          const element = node as HTMLElement;
          return (
            element.querySelector?.(".copy-button-placeholder") ||
            element.classList?.contains("copy-button-placeholder")
          );
        });
      });

      if (hasRelevantChanges) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(mountCopyButtons, 100);
      }
    };

    if (!observerRef.current) {
      // Scope observer to content area instead of entire document.body
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

  return { mountCopyButtons, cleanup };
}

export function withCodeBlocks<T extends {}>(
  Component: React.ComponentType<T>,
) {
  return function WrappedComponent(props: T) {
    useCodeBlocks();
    return <Component {...props} />;
  };
}
