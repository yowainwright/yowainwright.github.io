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
  let rules: string[] = [];

  if (block.base) {
    rules = rules.concat(`.${blockName} { ${propsToCSS(block.base)}; }`);
  }

  if (block.elements) {
    for (const [elementName, props] of Object.entries(block.elements)) {
      rules = rules.concat(
        `.${blockName}__${elementName} { ${propsToCSS(props)}; }`,
      );
    }
  }

  if (block.modifiers) {
    for (const [modifierName, props] of Object.entries(block.modifiers)) {
      rules = rules.concat(
        `.${blockName}--${modifierName} { ${propsToCSS(props)}; }`,
      );
    }
  }

  return rules.join("\n");
}

export function rulesToCSS(selector: string, props: CSSProperties): string {
  return `${selector} { ${propsToCSS(props)}; }`;
}
