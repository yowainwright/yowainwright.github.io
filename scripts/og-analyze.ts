#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { createLogger } from "../lib/logger";

const log = createLogger("og-analyze");

const CONTENT_DIR = path.join(process.cwd(), "content");
const OUTPUT_DIR = path.join(process.cwd(), "public/og");
const MANIFEST_PATH = path.join(OUTPUT_DIR, "manifest.json");

interface ChartInfo {
  name: string;
  component: string;
}

interface CodeBlockInfo {
  language: string;
  lineCount: number;
  hasTitle: boolean;
}

interface PostAnalysis {
  slug: string;
  title: string;
  date: string;
  isMdx: boolean;
  charts: ChartInfo[];
  codeBlocks: CodeBlockInfo[];
  hasImages: boolean;
  strategy: "chart" | "code" | "title-card";
  primaryAsset?: string;
}

interface Manifest {
  generatedAt: string;
  posts: PostAnalysis[];
}

const KNOWN_CHART_COMPONENTS = [
  "RiseAndFallChart",
  "GlobalGrowthChart",
  "WageStagnationChart",
  "IndustrialRevolutionChart",
  "SWEMetricsGrid",
];

const detectCharts = (content: string, isMdx: boolean): ChartInfo[] => {
  if (!isMdx) return [];

  const charts: ChartInfo[] = [];

  for (const component of KNOWN_CHART_COMPONENTS) {
    const usagePattern = new RegExp(`<${component}\\s*/?\\s*>`, "g");
    const matches = content.match(usagePattern);
    if (matches) {
      charts.push({ name: component, component });
    }
  }

  return charts;
};

const detectCodeBlocks = (content: string): CodeBlockInfo[] => {
  const codeBlocks: CodeBlockInfo[] = [];
  const codeBlockPattern = /```(\w+)?\s*\n([\s\S]*?)```/g;

  let match;
  while ((match = codeBlockPattern.exec(content)) !== null) {
    const language = match[1] || "text";
    const code = match[2];
    const lineCount = code.split("\n").length;
    const hasTitle = code.includes("[title:");

    const isSubstantial = lineCount >= 3;
    if (isSubstantial) {
      codeBlocks.push({ language, lineCount, hasTitle });
    }
  }

  return codeBlocks;
};

const detectImages = (content: string): boolean => {
  const imgPattern = /<img\s+[^>]*src=|!\[.*?\]\(.*?\)/i;
  return imgPattern.test(content);
};

const determineStrategy = (
  charts: ChartInfo[],
  codeBlocks: CodeBlockInfo[],
): "chart" | "code" | "title-card" => {
  if (charts.length > 0) return "chart";
  if (codeBlocks.length > 0) return "code";
  return "title-card";
};

const selectPrimaryAsset = (
  strategy: "chart" | "code" | "title-card",
  charts: ChartInfo[],
  codeBlocks: CodeBlockInfo[],
): string | undefined => {
  if (strategy === "chart" && charts.length > 0) {
    const randomIndex = Math.floor(Math.random() * charts.length);
    return `chart-${charts[randomIndex].name}`;
  }

  if (strategy === "code" && codeBlocks.length > 0) {
    const titledBlocks = codeBlocks.filter((b) => b.hasTitle);
    const preferredBlocks = titledBlocks.length > 0 ? titledBlocks : codeBlocks;
    const bestBlock = preferredBlocks.reduce((best, current) =>
      current.lineCount > best.lineCount ? current : best
    );
    const index = codeBlocks.indexOf(bestBlock);
    return `code-${index}`;
  }

  return undefined;
};

const analyzePost = (fileName: string): PostAnalysis | null => {
  const filePath = path.join(CONTENT_DIR, fileName);
  const content = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content: body } = matter(content);

  const slug = fileName.replace(/\.(md|mdx)$/, "");
  const isMdx = fileName.endsWith(".mdx");

  const isExcluded = ["404", "about", "resume"].includes(slug);
  if (isExcluded) return null;

  const charts = detectCharts(body, isMdx);
  const codeBlocks = detectCodeBlocks(body);
  const hasImages = detectImages(body);
  const strategy = determineStrategy(charts, codeBlocks);
  const primaryAsset = selectPrimaryAsset(strategy, charts, codeBlocks);

  return {
    slug,
    title: frontmatter.title || slug,
    date: frontmatter.date
      ? new Date(frontmatter.date).toISOString().split("T")[0]
      : "",
    isMdx,
    charts,
    codeBlocks,
    hasImages,
    strategy,
    primaryAsset,
  };
};

const main = () => {
  log.info("analyzing posts for OG image generation");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts: PostAnalysis[] = [];
  const stats = { chart: 0, code: 0, "title-card": 0 };

  for (const file of files) {
    const analysis = analyzePost(file);
    if (analysis) {
      posts.push(analysis);
      stats[analysis.strategy]++;
    }
  }

  const manifest: Manifest = {
    generatedAt: new Date().toISOString(),
    posts,
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  log.info(
    { total: posts.length, charts: stats.chart, code: stats.code, titleCards: stats["title-card"] },
    "analysis complete"
  );
  log.info({ path: MANIFEST_PATH }, "manifest written");
};

main();
