"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import { Maximize2 } from "lucide-react";
import {
  MermaidDialog,
  PROCESSING_DELAYS,
  MERMAID_SELECTORS,
} from "../components/mermaid";


export function useMermaidCharts() {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    svgContent: string;
    title?: string;
  }>({
    isOpen: false,
    svgContent: "",
    title: undefined,
  });
  const observerRef = useRef<MutationObserver | null>(null);

  const openDialog = useCallback((svgContent: string, title?: string) => {
    setDialogState({ isOpen: true, svgContent, title });
  }, []);

  const closeDialog = useCallback(() => {
    setDialogState({ isOpen: false, svgContent: "", title: undefined });
  }, []);

  const processMermaidCharts = useCallback(() => {
    const allSvgs = document.querySelectorAll(MERMAID_SELECTORS.ALL_SVGS);

    const mermaidSvgs = Array.from(allSvgs).filter((svg) => {
      const parent = svg.parentElement;

      if (
        !parent ||
        parent.classList.contains(MERMAID_SELECTORS.MERMAID_PROCESSED)
      ) {
        return false;
      }

      if (parent.classList.contains("mermaid-chart")) {
        return false;
      }

      const id = svg.getAttribute("id");
      const ariaRoledescription = svg.getAttribute("aria-roledescription");
      const hasNodes = svg.querySelector(".node, .edgePath, .flowchart-link");

      const isRecharts = parent.className?.includes("recharts-wrapper");

      const isMermaidChart =
        (id && id.includes("mermaid")) ||
        ariaRoledescription === "flowchart-v2" ||
        hasNodes;

      return isMermaidChart && !isRecharts;
    });

    mermaidSvgs.forEach((svg) => {
      const parent = svg.parentElement;

      if (!parent) {
        return;
      }

      if (parent.classList.contains("mermaid-processed")) {
        return;
      }

      const originalSvgClone = svg.cloneNode(true) as SVGElement;

      parent.classList.add("mermaid-chart", "mermaid-processed");

      const titleText = "";

      if (titleText) {
        const chartTitle = document.createElement("div");
        chartTitle.className = "chart-title";
        chartTitle.textContent = titleText;
        parent.insertBefore(chartTitle, svg);
      }

      const expandHint = document.createElement("div");
      expandHint.className = "mermaid-chart__expand-hint";

      const iconRoot = createRoot(expandHint);
      iconRoot.render(React.createElement(Maximize2, { size: 16 }));

      parent.appendChild(expandHint);

      parent.addEventListener("click", () => {
        openDialog(originalSvgClone.outerHTML, titleText);
      });
    });
  }, [openDialog]);

  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const initialTimer = setTimeout(
      processMermaidCharts,
      PROCESSING_DELAYS.INITIAL,
    );

    const delayedTimer = setTimeout(
      processMermaidCharts,
      PROCESSING_DELAYS.DELAYED,
    );

    let timeoutId: NodeJS.Timeout;
    const debouncedProcess = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(processMermaidCharts, PROCESSING_DELAYS.DEBOUNCE);
    };

    if (!observerRef.current) {
      const contentArea = document.querySelector(
        MERMAID_SELECTORS.POST_CONTENT,
      );
      const targetNode = contentArea || document.body;

      observerRef.current = new MutationObserver(debouncedProcess);
      observerRef.current.observe(targetNode, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(delayedTimer);
      cleanup();
    };
  }, [processMermaidCharts, cleanup]);

  return {
    dialogState,
    closeDialog,
    processMermaidCharts,
    cleanup,
  };
}

export function withMermaidCharts<T extends {}>(
  Component: React.ComponentType<T>,
) {
  return function WrappedComponent(props: T) {
    const { dialogState, closeDialog } = useMermaidCharts();

    return (
      <>
        <Component {...props} />
        <MermaidDialog
          isOpen={dialogState.isOpen}
          onClose={closeDialog}
          svgContent={dialogState.svgContent}
          title={dialogState.title}
        />
      </>
    );
  };
}
