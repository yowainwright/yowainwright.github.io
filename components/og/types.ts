export interface ChartData {
  type: string;
  data: unknown;
  source: string;
}

export interface MermaidData {
  type: "mermaid";
  content: string;
  index?: number;
}

export interface CodeBlockData {
  type: "code";
  language: string;
  content: string;
  index?: number;
}

export type ExtractedContent = ChartData | MermaidData | CodeBlockData | null;

export interface OgImageProps {
  title: string;
  slug: string;
  type?: string;
  content?: ExtractedContent;
}
