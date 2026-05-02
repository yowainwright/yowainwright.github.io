import React from "react";
import { OG_STYLES } from "./constants";
import { OgImageProps } from "./types";
import { VisualContent } from "./VisualContent";

function OgTitle({ children }: { children: React.ReactNode }) {
  return <div style={OG_STYLES.title}>{children}</div>;
}

export default function OgImage({ title, slug, content }: OgImageProps) {
  return (
    <div style={OG_STYLES.container}>
      <OgTitle>{title}</OgTitle>
      <VisualContent content={content} slug={slug} />
    </div>
  );
}
