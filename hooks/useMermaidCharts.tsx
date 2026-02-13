"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import { Maximize2 } from "lucide-react";
import {
  MermaidDialog,
  PROCESSING_DELAYS,
  MERMAID_SELECTORS,
} from "../components/mermaid";

const getTextDimensions = (textElement: Element) => {
  try {
    const bbox = (textElement as SVGTextElement).getBBox();
    const bboxExists = bbox !== null;
    const heightIsValid = bbox?.height > 0;
    const widthIsValid = bbox?.width > 0;
    const validDimensions = [bboxExists, heightIsValid, widthIsValid];
    const hasBbox = validDimensions.every(Boolean);

    if (hasBbox) {
      return { height: bbox.height, width: bbox.width };
    }
  } catch {
    const computedStyle = window.getComputedStyle(textElement);
    const fontSize = parseFloat(computedStyle.fontSize) || 14;
    const textContent = textElement.textContent || "";
    const textLength = textContent.length;
    const lineHeight = fontSize * 1.2;
    const estimatedWidth = textLength * fontSize * 0.6;

    return {
      height: lineHeight,
      width: estimatedWidth,
    };
  }
  return { height: 0, width: 0 };
};

const adjustRectDimensions = (
  rect: Element,
  requiredDimensions: { height: number; width: number },
) => {
  const currentHeight = parseFloat(rect.getAttribute("height") || "0");
  const currentWidth = parseFloat(rect.getAttribute("width") || "0");

  const heightNeedsAdjustment = currentHeight < requiredDimensions.height;
  const widthNeedsAdjustment = currentWidth < requiredDimensions.width;

  if (heightNeedsAdjustment) {
    rect.setAttribute("height", requiredDimensions.height.toString());
  }

  if (widthNeedsAdjustment) {
    const newWidth = requiredDimensions.width.toString();
    const currentX = parseFloat(rect.getAttribute("x") || "0");
    const widthDifference = requiredDimensions.width - currentWidth;
    const xOffset = widthDifference / 2;
    const newX = currentX - xOffset;

    rect.setAttribute("width", newWidth);
    rect.setAttribute("x", newX.toString());
  }

  return {
    heightAdjusted: heightNeedsAdjustment,
    widthAdjusted: widthNeedsAdjustment,
  };
};

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
