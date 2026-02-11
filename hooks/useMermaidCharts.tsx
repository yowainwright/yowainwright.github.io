"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import { Maximize2 } from "lucide-react";
import { MermaidDialog, PROCESSING_DELAYS, MERMAID_SELECTORS } from "../components/mermaid";

const extractTitleFromContent = (chartParent: Element): string => {
  let currentElement = chartParent.previousElementSibling;

  while (currentElement) {
    if (currentElement.tagName && /^H[1-6]$/.test(currentElement.tagName)) {
      return currentElement.textContent?.trim() || '';
    }
    currentElement = currentElement.previousElementSibling;
  }

  return '';
};

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
  } catch (e) {
    const computedStyle = window.getComputedStyle(textElement);
    const fontSize = parseFloat(computedStyle.fontSize) || 14;
    const textContent = textElement.textContent || '';
    const textLength = textContent.length;
    const lineHeight = fontSize * 1.2;
    const estimatedWidth = textLength * fontSize * 0.6;

    return {
      height: lineHeight,
      width: estimatedWidth
    };
  }
  return { height: 0, width: 0 };
};

const calculateNodeDimensions = (textElements: NodeListOf<Element>) => {
  const textArray = Array.from(textElements);
  const dimensions = textArray.map(textEl => getTextDimensions(textEl));

  const heights = dimensions.map(d => d.height);
  const widths = dimensions.map(d => d.width);

  const maxTextHeight = Math.max(...heights, 20);
  const maxTextWidth = Math.max(...widths, 80);

  const padding = 32;
  const minWidth = 120;
  const minHeight = 80;

  return {
    height: Math.max(minHeight, maxTextHeight + padding),
    width: Math.max(minWidth, maxTextWidth + padding)
  };
};

const adjustRectDimensions = (rect: Element, requiredDimensions: { height: number; width: number }) => {
  const currentHeight = parseFloat(rect.getAttribute('height') || '0');
  const currentWidth = parseFloat(rect.getAttribute('width') || '0');

  const heightNeedsAdjustment = currentHeight < requiredDimensions.height;
  const widthNeedsAdjustment = currentWidth < requiredDimensions.width;

  if (heightNeedsAdjustment) {
    rect.setAttribute('height', requiredDimensions.height.toString());
  }

  if (widthNeedsAdjustment) {
    const newWidth = requiredDimensions.width.toString();
    const currentX = parseFloat(rect.getAttribute('x') || '0');
    const widthDifference = requiredDimensions.width - currentWidth;
    const xOffset = widthDifference / 2;
    const newX = currentX - xOffset;

    rect.setAttribute('width', newWidth);
    rect.setAttribute('x', newX.toString());
  }

  return { heightAdjusted: heightNeedsAdjustment, widthAdjusted: widthNeedsAdjustment };
};

const adjustTextPosition = (node: Element, rectDimensions: { height: number; width: number }) => {
  const textElements = Array.from(node.querySelectorAll('text, .label, .nodeLabel'));
  const rect = node.querySelector('rect');

  if (!rect) return;

  const rectX = parseFloat(rect.getAttribute('x') || '0');
  const rectY = parseFloat(rect.getAttribute('y') || '0');
  const centerX = rectX + rectDimensions.width / 2;
  const centerY = rectY + rectDimensions.height / 2;

  textElements.forEach(textEl => {
    textEl.setAttribute('x', centerX.toString());
    textEl.setAttribute('y', centerY.toString());
    textEl.setAttribute('text-anchor', 'middle');
    textEl.setAttribute('dominant-baseline', 'central');
  });
};

const adjustNodeHeights = (svg: SVGElement) => {
  const nodes = Array.from(svg.querySelectorAll('.node'));

  const adjustableNodes = nodes.filter(node => {
    const foreignObjects = node.querySelectorAll('foreignObject');
    const rectElements = node.querySelectorAll('rect');
    const hasForeignObjects = foreignObjects.length > 0;
    const hasRectElements = rectElements.length > 0;
    return hasForeignObjects && hasRectElements;
  });

  const nodesWithDimensions = adjustableNodes.map(node => {
    const foreignObjects = Array.from(node.querySelectorAll('foreignObject'));
    const rectElements = Array.from(node.querySelectorAll('rect'));

    const textContent = Array.from(node.querySelectorAll('p')).map(p => p.textContent || '').join(' ');
    const estimatedWidth = textContent.length * 7.5;
    const estimatedHeight = 60;

    const requiredDimensions = {
      height: Math.max(80, estimatedHeight),
      width: Math.max(120, estimatedWidth + 32)
    };

    return { node, rectElements, foreignObjects, requiredDimensions };
  });

  const validNodes = nodesWithDimensions.filter(({ requiredDimensions }) =>
    requiredDimensions.height > 0
  );

  validNodes.forEach(({ rectElements, foreignObjects, requiredDimensions }) => {
    rectElements.forEach(rect => {
      adjustRectDimensions(rect, requiredDimensions);
    });

    foreignObjects.forEach(foreignObj => {
      foreignObj.setAttribute('width', requiredDimensions.width.toString());
      foreignObj.setAttribute('height', requiredDimensions.height.toString());

      const currentX = parseFloat(foreignObj.getAttribute('x') || '0');
      const currentY = parseFloat(foreignObj.getAttribute('y') || '0');
      const newX = currentX - (requiredDimensions.width / 2);
      const newY = currentY - (requiredDimensions.height / 2);

      foreignObj.setAttribute('x', newX.toString());
      foreignObj.setAttribute('y', newY.toString());
    });
  });
};

export function useMermaidCharts() {
  const [dialogState, setDialogState] = useState<{ isOpen: boolean; svgContent: string; title?: string }>({
    isOpen: false,
    svgContent: '',
    title: undefined
  });
  const observerRef = useRef<MutationObserver | null>(null);

  const openDialog = useCallback((svgContent: string, title?: string) => {
    setDialogState({ isOpen: true, svgContent, title });
  }, []);

  const closeDialog = useCallback(() => {
    setDialogState({ isOpen: false, svgContent: '', title: undefined });
  }, []);

  const processMermaidCharts = useCallback(() => {
    const allSvgs = document.querySelectorAll(MERMAID_SELECTORS.ALL_SVGS);

    const mermaidSvgs = Array.from(allSvgs).filter(svg => {
      const parent = svg.parentElement;

      if (!parent || parent.classList.contains(MERMAID_SELECTORS.MERMAID_PROCESSED)) {
        return false;
      }

      if (parent.classList.contains('mermaid-chart')) {
        return false;
      }

      const id = svg.getAttribute('id');
      const ariaRoledescription = svg.getAttribute('aria-roledescription');
      const hasNodes = svg.querySelector('.node, .edgePath, .flowchart-link');

      const isRecharts = parent.className?.includes('recharts-wrapper');

      const isMermaidChart = (
        (id && id.includes('mermaid')) ||
        ariaRoledescription === 'flowchart-v2' ||
        hasNodes
      );


      return isMermaidChart && !isRecharts;
    });


    mermaidSvgs.forEach((svg) => {
      const parent = svg.parentElement;

      if (!parent) {
        return;
      }

      if (parent.classList.contains('mermaid-processed')) {
        return;
      }

      const originalSvgClone = svg.cloneNode(true) as SVGElement;

      parent.classList.add('mermaid-chart', 'mermaid-processed');

      const titleText = '';

      if (titleText) {
        const chartTitle = document.createElement('div');
        chartTitle.className = 'chart-title';
        chartTitle.textContent = titleText;
        parent.insertBefore(chartTitle, svg);
      }

      const expandHint = document.createElement('div');
      expandHint.className = 'mermaid-chart__expand-hint';

      const iconRoot = createRoot(expandHint);
      iconRoot.render(React.createElement(Maximize2, { size: 16 }));

      parent.appendChild(expandHint);

      parent.addEventListener('click', () => {
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
    const initialTimer = setTimeout(processMermaidCharts, PROCESSING_DELAYS.INITIAL);

    const delayedTimer = setTimeout(processMermaidCharts, PROCESSING_DELAYS.DELAYED);

    let timeoutId: NodeJS.Timeout;
    const debouncedProcess = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(processMermaidCharts, PROCESSING_DELAYS.DEBOUNCE);
    };

    if (!observerRef.current) {
      const contentArea = document.querySelector(MERMAID_SELECTORS.POST_CONTENT);
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
    cleanup
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