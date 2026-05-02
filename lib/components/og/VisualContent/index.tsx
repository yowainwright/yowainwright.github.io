import React from "react";
import { VisualContentProps } from "./types";
import { ChartDisplay } from "../ChartDisplay";
import { CodeDisplay } from "../CodeDisplay";
import { MermaidDisplay } from "../MermaidDisplay";
import { OG_STYLES } from "../constants";
import { ExtractedContent } from "../types";

function OgSubtitle({ children }: { children: React.ReactNode }) {
  return <div style={OG_STYLES.subtitle}>{children}</div>;
}

function renderContentDisplay(content: ExtractedContent) {
  const isCodeType = content?.type === "code";
  const isMermaidType = content?.type === "mermaid";
  const hasData = Boolean(content?.data);

  if (isCodeType) {
    return (
      <CodeDisplay language={content.language} content={content.content} />
    );
  }

  if (isMermaidType) {
    return <MermaidDisplay content={content.content} />;
  }

  if (hasData) {
    return <ChartDisplay data={content.data} />;
  }

  return null;
}

export function VisualContent({ content, slug }: VisualContentProps) {
  const visualContent = renderContentDisplay(content);

  return visualContent || <OgSubtitle>jeffry.in/{slug}</OgSubtitle>;
}
