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
    // First check for code blocks that haven't been processed yet
    const codeBlocks = document.querySelectorAll('pre code.language-mermaid, code.language-mermaid');
    console.log('Found mermaid code blocks:', codeBlocks.length);

    codeBlocks.forEach((code, index) => {
      console.log(`Code block ${index}:`, code.textContent?.substring(0, 50) + '...');
    });

    const allSvgs = document.querySelectorAll(MERMAID_SELECTORS.ALL_SVGS);

    const mermaidSvgs = Array.from(allSvgs).filter(svg => {
      const parent = svg.parentElement;

      // Skip if already processed or no parent
      if (!parent || parent.classList.contains(MERMAID_SELECTORS.MERMAID_PROCESSED)) {
        return false;
      }

      // Skip if parent is already our mermaid-chart container
      if (parent.classList.contains('mermaid-chart')) {
        return false;
      }

      const id = svg.getAttribute('id');
      const ariaRoledescription = svg.getAttribute('aria-roledescription');
      const hasNodes = svg.querySelector('.node, .edgePath, .flowchart-link');

      // Exclude recharts (those are your chart components, not mermaid)
      const isRecharts = parent?.className?.includes('recharts-wrapper');

      // Mermaid charts have specific characteristics
      const isMermaidChart = (
        (id && id.includes('mermaid')) ||
        ariaRoledescription === 'flowchart-v2' ||
        hasNodes
      );

      if (isMermaidChart) {
        console.log('Found mermaid SVG:', { id, ariaRoledescription, parent: parent?.tagName, isRecharts, willInclude: !isRecharts });
      }

      return isMermaidChart && !isRecharts;
    });

    console.log('Filtered mermaid SVGs:', mermaidSvgs.length);

    mermaidSvgs.forEach((svg, index) => {
      console.log(`Processing mermaid SVG ${index}:`, svg.id);
      const parent = svg.parentElement;

      if (!parent) {
        console.log(`Skipping SVG ${index} - no parent`);
        return;
      }

      // Mark parent as processed to avoid reprocessing
      if (parent.classList.contains('mermaid-processed')) {
        console.log(`Skipping SVG ${index} - already processed`);
        return;
      }

      try {
        const svgClone = svg.cloneNode(true) as SVGElement;

        // Add interactive styling directly to the parent instead of replacing
        parent.classList.add('mermaid-chart', 'mermaid-processed');
        parent.style.position = 'relative';
        parent.style.cursor = 'pointer';
        parent.style.padding = '1.5rem';
        parent.style.border = '1px solid var(--color-border-light)';
        parent.style.borderRadius = '8px';
        parent.style.background = 'var(--color-bg-primary)';
        parent.style.margin = '2rem 0';

        // Create expand hint with Lucide icon
        const expandHint = document.createElement('div');
        expandHint.className = 'mermaid-chart__expand-hint';
        expandHint.style.position = 'absolute';
        expandHint.style.top = '12px';
        expandHint.style.right = '12px';
        expandHint.style.opacity = '0.6';
        expandHint.style.zIndex = '10';

        // Render Lucide icon using React
        const iconRoot = createRoot(expandHint);
        iconRoot.render(React.createElement(Maximize2, { size: 16 }));

        parent.appendChild(expandHint);

        parent.addEventListener('click', () => {
          console.log('Mermaid container clicked!');
          openDialog(svgClone.outerHTML);
        });

        console.log(`SVG ${index} successfully enhanced`);
      } catch (error) {
        console.error(`Error enhancing SVG ${index}:`, error);
      }
    });
  }, [openDialog]);

  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Run immediately
    const initialTimer = setTimeout(processMermaidCharts, PROCESSING_DELAYS.INITIAL);

    // Also run after a longer delay to catch late-loading content
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