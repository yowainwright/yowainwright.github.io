export const OUTPUT_FORMATS = ["og.png", "favicon.png"] as const;

export const CHART_IMPORT_REGEX = /import\s+{[^}]+}\s+from\s+["']([^"']+)["']/g;
export const CHART_PATH_PATTERNS = ["Chart", "-charts", "-econ"];
export const DATA_KEY_PATTERNS = [
  "data",
  "chartdata",
  "costdata",
  "tokencostdata",
];

export const MERMAID_REGEX = /```mermaid\n([\s\S]*?)```/;
export const CODE_BLOCK_REGEX = /```(\w+)\n([\s\S]*?)```/;
