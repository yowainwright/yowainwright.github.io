import { readFileSync } from "fs";
import { join } from "path";
import {
  CHART_IMPORT_REGEX,
  CHART_PATH_PATTERNS,
  DATA_KEY_PATTERNS,
} from "./constants";
import { ChartData } from "./types";

function getContentPath(slug: string): string {
  return join(process.cwd(), "content", `${slug}.mdx`);
}

function extractImportPath(importLine: string): string | null {
  const match = importLine.match(/from\s+["']([^"']+)["']/);
  return match?.[1] ?? null;
}

function isChartImport(path: string): boolean {
  return CHART_PATH_PATTERNS.some((pattern) => path.includes(pattern));
}

function getDataKeyFromConstants(
  constantsData: Record<string, unknown>,
): string | null {
  return (
    Object.keys(constantsData).find((key) => {
      const isDataKey = DATA_KEY_PATTERNS.some((pattern) =>
        key.toLowerCase().includes(pattern),
      );
      const isNotSource = !key.toLowerCase().includes("source");
      return isDataKey && isNotSource;
    }) || null
  );
}

function extractChartNames(importLine: string): string[] {
  const match = importLine.match(/import\s+{\s*([^}]+)\s*}/);
  if (!match) return [];

  return match[1]
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name.includes("Chart"));
}

function loadChartConstants(
  importPath: string,
  importLine: string,
): Record<string, unknown> | null {
  const componentPath = join(process.cwd(), importPath.replace("../", ""));
  const chartNames = extractChartNames(importLine);

  for (const chartName of chartNames) {
    try {
      const constantsPath = join(componentPath, chartName, "constants.ts");
      const constants = require(constantsPath);
      const dataKey = getDataKeyFromConstants(constants);
      if (dataKey) {
        return constants;
      }
    } catch {
      continue;
    }
  }

  return null;
}

function extractChartFromImport(
  importLine: string,
  slug: string,
): ChartData | null {
  const importPath = extractImportPath(importLine);

  if (!importPath || !isChartImport(importPath)) {
    return null;
  }

  const constantsData = loadChartConstants(importPath, importLine);
  if (!constantsData) {
    return null;
  }

  const dataKey = getDataKeyFromConstants(constantsData);
  if (!dataKey) {
    return null;
  }

  return {
    type: slug,
    data: constantsData[dataKey],
    source: importPath,
  };
}

export function extractChartData(slug: string): ChartData | null {
  try {
    const content = readFileSync(getContentPath(slug), "utf8");
    const importMatches = content.match(CHART_IMPORT_REGEX);

    if (!importMatches) {
      return null;
    }

    return (
      importMatches
        .map((importLine) => extractChartFromImport(importLine, slug))
        .find((chart) => chart !== null) || null
    );
  } catch {
    return null;
  }
}
