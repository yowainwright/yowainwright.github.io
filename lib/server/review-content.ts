import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import type { Node } from "unist";
import { getSinglePost } from "./markdown";

interface ImageNode extends Node {
  type: "image";
  url: string;
  alt: string;
}

interface TableNode extends Node {
  type: "table";
  children: Array<{
    type: "tableRow";
    children: Array<{
      type: "tableCell";
      children: Array<{ type: "text"; value: string }>;
    }>;
  }>;
}

interface CodeNode extends Node {
  type: "code";
  lang: string;
  value: string;
}

interface ChartMatch {
  name: string;
  component: string;
  type: "chart" | "graph";
}

export interface ContentAnalysis {
  images: Array<{ url: string; alt: string }>;
  charts: ChartMatch[];
  tables: Array<{ rows: string[][]; headers?: string[] }>;
  codeBlocks: Array<{ language: string; lineCount: number }>;
  strategy: "image" | "chart" | "table" | "code" | "text";
}

const CHART_PATTERNS = [
  /(<(\w+Chart|Chart\w+|Recharts\w+)[^>]*>)/gi,
  /(import.*Chart.*from)/gi,
  /(LineChart|BarChart|PieChart|AreaChart|ScatterChart|ComposedChart)/gi,
  /(TokenCostChart|AgentTaskCostChart|ProjectCostComparisonChart)/gi,
];

const extractImages = (
  content: string,
): Array<{ url: string; alt: string }> => {
  const images: Array<{ url: string; alt: string }> = [];

  const tree = unified().use(remarkParse).parse(content);

  visit(tree, "image", (node: ImageNode) => {
    images.push({
      url: node.url,
      alt: node.alt || "",
    });
  });

  return images;
};

const extractTables = (
  content: string,
): Array<{ rows: string[][]; headers?: string[] }> => {
  const tables: Array<{ rows: string[][]; headers?: string[] }> = [];

  const tree = unified().use(remarkParse).parse(content);

  visit(tree, "table", (node: TableNode) => {
    const rows: string[][] = [];
    let headers: string[] | undefined;

    node.children?.forEach((row, rowIndex) => {
      const cells: string[] = [];
      row.children?.forEach((cell) => {
        const text =
          cell.children
            ?.map((child) => (child.type === "text" ? child.value : ""))
            .join("") || "";
        cells.push(text);
      });

      if (rowIndex === 0) {
        headers = cells;
      } else {
        rows.push(cells);
      }
    });

    tables.push({ rows, headers });
  });

  return tables;
};

const extractCodeBlocks = (
  content: string,
): Array<{ language: string; lineCount: number }> => {
  const codeBlocks: Array<{ language: string; lineCount: number }> = [];

  const tree = unified().use(remarkParse).parse(content);

  visit(tree, "code", (node: CodeNode) => {
    codeBlocks.push({
      language: node.lang || "text",
      lineCount: node.value?.split("\n").length || 0,
    });
  });

  return codeBlocks;
};

const extractCharts = (content: string): ChartMatch[] => {
  const charts: ChartMatch[] = [];

  CHART_PATTERNS.forEach((pattern) => {
    const matches = content.match(pattern);
    matches?.forEach((match) => {
      const componentName = match.match(/(\w*Chart\w*)/i)?.[1] || "Chart";
      charts.push({
        name: componentName,
        component: match,
        type: "chart",
      });
    });
  });

  return charts;
};

const determineStrategy = (
  analysis: ContentAnalysis,
): ContentAnalysis["strategy"] => {
  if (analysis.images.length > 0) return "image";
  if (analysis.charts.length > 0) return "chart";
  if (analysis.tables.length > 0) return "table";
  if (analysis.codeBlocks.length > 0) return "code";
  return "text";
};

export const analyzePostContent = (slug: string): ContentAnalysis => {
  const post = getSinglePost(slug, "content");
  const content = post.content;

  const images = extractImages(content);
  const charts = extractCharts(content);
  const tables = extractTables(content);
  const codeBlocks = extractCodeBlocks(content);

  const analysis: ContentAnalysis = {
    images,
    charts,
    tables,
    codeBlocks,
    strategy: "text",
  };

  analysis.strategy = determineStrategy(analysis);

  return analysis;
};

export const getPostSummary = (slug: string) => {
  const post = getSinglePost(slug, "content");
  const analysis = analyzePostContent(slug);

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description || "",
    date: post.frontmatter.date,
    tags: post.frontmatter.tags || [],
    analysis,
  };
};
