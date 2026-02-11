"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import { Maximize2 } from "lucide-react";
import { MermaidDialog, PROCESSING_DELAYS, MERMAID_SELECTORS } from "../components/mermaid";

export function useMermaidCharts() {
  const [dialogState, setDialogState] = useState<{ isOpen: boolean; svgContent: string }>({
    isOpen: false,
    svgContent: ''
  });
  const observerRef = useRef<MutationObserver | null>(null);

  const openDialog = useCallback((svgContent: string) => {
    setDialogState({ isOpen: true, svgContent });
  }, []);

  const closeDialog = useCallback(() => {
    setDialogState({ isOpen: false, svgContent: '' });
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

      const svgClone = svg.cloneNode(true) as SVGElement;

      parent.classList.add('mermaid-chart', 'mermaid-processed');
      parent.style.position = 'relative';
      parent.style.cursor = 'pointer';
      parent.style.padding = '1.5rem';
      parent.style.border = '1px solid var(--color-border-light)';
      parent.style.borderRadius = '8px';
      parent.style.background = 'var(--color-bg-primary)';
      parent.style.margin = '2rem 0';

      const expandHint = document.createElement('div');
      expandHint.className = 'mermaid-chart__expand-hint';
      expandHint.style.position = 'absolute';
      expandHint.style.top = '12px';
      expandHint.style.right = '12px';
      expandHint.style.opacity = '0.6';
      expandHint.style.zIndex = '10';

      const iconRoot = createRoot(expandHint);
      iconRoot.render(React.createElement(Maximize2, { size: 16 }));

      parent.appendChild(expandHint);

      parent.addEventListener('click', () => {
        openDialog(svgClone.outerHTML);
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
        />
      </>
    );
  };
}