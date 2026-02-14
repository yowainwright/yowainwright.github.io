import { bemToCSS } from "../../lib/client/styles";
import type { BEMBlock } from "../../lib/client/styles";

export const PROCESSING_DELAYS = {
  INITIAL: 200,
  DELAYED: 1000,
  DEBOUNCE: 200,
  OBSERVER_ROOT_MARGIN: "300px",
} as const;

export const MERMAID_SELECTORS = {
  ALL_SVGS: "svg",
  POST_CONTENT: ".post__content",
  MERMAID_CODE: "pre code.language-mermaid, code.language-mermaid",
  MERMAID_PROCESSED: "mermaid-processed",
  MERMAID_CONTAINER: "mermaid-container",
} as const;

export const MERMAID_BEM: BEMBlock = {
  base: {
    position: "relative",
    margin: "2rem 0",
    padding: "1.5rem",
    border: "1px solid var(--color-border-light)",
    borderRadius: "8px",
    background: "var(--color-bg-primary)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    overflow: "hidden",
  },
  elements: {
    "expand-hint": {
      position: "absolute",
      top: "12px",
      right: "12px",
      opacity: "0.6",
      transition: "opacity 0.2s ease",
      pointerEvents: "none",
      zIndex: "10",
    },
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      minHeight: "200px",
      overflow: "auto",
    },
  },
  modifiers: {
    hover: {
      borderColor: "var(--color-link-primary)",
      boxShadow: "0 4px 12px rgba(0, 0, 255, 0.15)",
    },
  },
};

export const MERMAID_DIALOG_BEM: BEMBlock = {
  base: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background: "rgba(0, 0, 0, 0.85)",
    zIndex: "1000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },
  elements: {
    content: {
      position: "relative",
      background: "var(--color-bg-primary)",
      borderRadius: "12px",
      width: "95vw",
      height: "95vh",
      maxWidth: "95vw",
      maxHeight: "95vh",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      display: "flex",
      flexDirection: "column",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem",
      borderBottom: "1px solid var(--color-border-light)",
      background: "var(--color-bg-secondary)",
    },
    controls: {
      display: "flex",
      gap: "0.5rem",
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      border: "1px solid var(--color-border-light)",
      borderRadius: "6px",
      background: "var(--color-bg-primary)",
      color: "var(--color-text-primary)",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontSize: "0",
    },
    close: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      border: "1px solid var(--color-border-light)",
      borderRadius: "6px",
      background: "var(--color-bg-primary)",
      color: "var(--color-text-primary)",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontSize: "0",
    },
    "svg-container": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    },
  },
  modifiers: {
    "button-hover": {
      background: "var(--color-bg-hover)",
      transform: "scale(1.05)",
    },
  },
};

export function generateMermaidCSS(): string {
  const mermaidCSS = bemToCSS("mermaid-chart", MERMAID_BEM);
  const dialogCSS = bemToCSS("mermaid-dialog", MERMAID_DIALOG_BEM);

  const additionalCSS = `
.mermaid-chart:hover .mermaid-chart__expand-hint {
  opacity: 1;
}

.mermaid-dialog__button:hover {
  background: var(--color-bg-hover);
  transform: scale(1.05);
}

.mermaid-transform-wrapper {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: hidden;
  min-height: 0;
  position: relative;
}

.mermaid-transform-wrapper .mermaid-chart__expand-hint {
  display: none !important;
}

.mermaid-dialog__svg-container {
  border: none !important;
  background: transparent !important;
}

.mermaid-dialog__svg-container svg {
  width: 100% !important;
  height: 100% !important;
  max-width: none !important;
  max-height: none !important;
  object-fit: contain;
  border: none !important;
  background: transparent !important;
}

.mermaid-chart__content svg {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.react-transform-wrapper {
  width: 100% !important;
  height: 100% !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
}

.react-transform-component {
  width: 100% !important;
  height: 100% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

@media (max-width: 768px) {
  .mermaid-chart {
    padding: 1rem;
    margin: 1rem 0;
  }

  .mermaid-dialog__content {
    max-width: 95vw;
    max-height: 95vh;
  }
}
`;

  return [mermaidCSS, dialogCSS, additionalCSS].join("\n\n");
}
