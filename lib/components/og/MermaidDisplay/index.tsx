import React from "react";
import { MermaidDisplayProps } from "./types";
import { MERMAID_STYLES } from "./constants";

function MermaidTitle({ children }: { children: React.ReactNode }) {
  return <div style={MERMAID_STYLES.title}>{children}</div>;
}

function MermaidContent({ children }: { children: React.ReactNode }) {
  return <div style={MERMAID_STYLES.content}>{children}</div>;
}

export function MermaidDisplay({ content }: MermaidDisplayProps) {
  if (!content) {
    return null;
  }

  return (
    <div style={MERMAID_STYLES.container}>
      <MermaidTitle>Mermaid Diagram</MermaidTitle>
      <MermaidContent>{content}</MermaidContent>
    </div>
  );
}
