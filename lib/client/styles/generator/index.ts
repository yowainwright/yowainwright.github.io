import type { BEMBlock, CSSProperties } from "./types";

export * from "./constants";
export * from "./types";

export function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function propsToCSS(props: CSSProperties): string {
  return Object.entries(props)
    .map(([key, value]) => `${toKebabCase(key)}: ${value}`)
    .join("; ");
}

export function bemToCSS(blockName: string, block: BEMBlock): string {
  const rules: string[] = [];

  if (block.base) {
    rules.push(`.${blockName} { ${propsToCSS(block.base)}; }`);
  }

  if (block.elements) {
    for (const [elementName, props] of Object.entries(block.elements)) {
      rules.push(`.${blockName}__${elementName} { ${propsToCSS(props)}; }`);
    }
  }

  if (block.modifiers) {
    for (const [modifierName, props] of Object.entries(block.modifiers)) {
      rules.push(`.${blockName}--${modifierName} { ${propsToCSS(props)}; }`);
    }
  }

  return rules.join("\n");
}

export function rulesToCSS(selector: string, props: CSSProperties): string {
  return `${selector} { ${propsToCSS(props)}; }`;
}
