import React from "react";
import { CodeDisplayProps } from "./types";
import { CODE_STYLES, CODE_CONFIG } from "./constants";

function CodeHeader({ children }: { children: React.ReactNode }) {
  return <div style={CODE_STYLES.header}>{children}</div>;
}

function CodeLine({ line }: { line: string }) {
  return <div style={CODE_STYLES.line}>{line}</div>;
}

function CodeLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <CodeLine key={i} line={line} />
      ))}
    </>
  );
}

export function CodeDisplay({ language, content }: CodeDisplayProps) {
  if (!content) {
    return null;
  }

  const lines = content.split("\n").slice(0, CODE_CONFIG.MAX_LINES);

  return (
    <div style={CODE_STYLES.container}>
      <CodeHeader>{language}</CodeHeader>
      <CodeLines lines={lines} />
    </div>
  );
}
