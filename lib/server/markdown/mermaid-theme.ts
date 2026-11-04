import { readFileSync } from "node:fs";
import path from "node:path";

export function getMermaidThemeCss(theme: "light" | "dark") {
  const file = path.join(process.cwd(), "lib/client/styles/scss/_variables.scss");
  const stylesheet = readFileSync(file, "utf8");
  const [light, dark] = stylesheet.split("// Dark Mode Theme");
  const palette = theme === "dark" ? dark : light;
  const colors = getThemeColors(palette);
  return `
    :root { ${colors} }
    text, tspan, .nodeLabel, .nodeLabel *, .label, .label *,
    .edgeLabel, .edgeLabel *, .messageText, .noteText {
      color: var(--diagram-text) !important;
      fill: var(--diagram-text) !important;
    }
    .node rect, .node circle, .node ellipse, .node polygon, .node path,
    rect.actor, .actor rect, .labelBox, .note,
    .activation0, .activation1, .activation2, .cluster rect {
      fill: var(--diagram-surface) !important;
      stroke: var(--diagram-line) !important;
    }
    .flowchart-link, .edgePath path, .messageLine0, .messageLine1,
    .actor-line, .loopLine, .separator {
      stroke: var(--diagram-line) !important;
    }
    marker path, marker polygon, .marker, .arrowheadPath {
      fill: var(--diagram-line) !important;
      stroke: var(--diagram-line) !important;
    }
    .edgeLabel rect, .labelBkg {
      fill: var(--diagram-background) !important;
    }
    .edgeLabel, .edgeLabel * {
      background: var(--diagram-background) !important;
    }
  `;
}

function getThemeColors(stylesheet: string) {
  const text = getColor(stylesheet, "color-text-primary");
  const line = getColor(stylesheet, "color-text-secondary");
  const surface = getColor(stylesheet, "color-bg-secondary");
  const background = getColor(stylesheet, "color-bg-primary");
  return `--diagram-text: ${text}; --diagram-line: ${line};
    --diagram-surface: ${surface}; --diagram-background: ${background};`;
}

function getColor(stylesheet: string, name: string) {
  const pattern = new RegExp(`--${name}:\\s*(#[\\da-fA-F]{3,8})\\s*;`);
  const color = stylesheet.match(pattern)?.[1];
  if (!color) throw new Error(`Missing Mermaid theme color: ${name}`);
  return color;
}
