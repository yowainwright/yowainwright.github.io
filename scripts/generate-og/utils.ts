import { readFileSync } from "fs";
import { join } from "path";
import { MERMAID_REGEX, CODE_BLOCK_REGEX } from "./constants";
import { MermaidData, CodeBlockData, ExtractedContent } from "./types";

function getContentPath(slug: string): string {
  return join(process.cwd(), "content", `${slug}.mdx`);
}

function extractMermaidDiagram(content: string): MermaidData | null {
  const match = content.match(MERMAID_REGEX);
  const mermaidContent = match?.[1]?.trim();

  if (!mermaidContent) {
    return null;
  }

  return {
    type: "mermaid",
    content: mermaidContent,
  };
}

function extractFirstCodeBlock(content: string): CodeBlockData | null {
  const match = content.match(CODE_BLOCK_REGEX);
  const language = match?.[1];
  const codeContent = match?.[2]?.trim();

  if (!language || !codeContent) {
    return null;
  }

  return {
    type: "code",
    language,
    content: codeContent,
  };
}

function extractAllMermaidDiagrams(content: string): MermaidData[] {
  const diagrams: MermaidData[] = [];
  const regex = new RegExp(MERMAID_REGEX, "g");
  let match;
  let index = 1;

  while ((match = regex.exec(content)) !== null) {
    const mermaidContent = match[1]?.trim();
    if (mermaidContent) {
      diagrams.push({
        type: "mermaid",
        content: mermaidContent,
        index,
      });
      index++;
    }
  }

  return diagrams;
}

function extractAllCodeBlocks(content: string): CodeBlockData[] {
  const blocks: CodeBlockData[] = [];
  const regex = new RegExp(CODE_BLOCK_REGEX, "g");
  let match;
  let index = 1;

  while ((match = regex.exec(content)) !== null) {
    const language = match[1];
    const codeContent = match[2]?.trim();

    if (language && codeContent && language !== "mermaid") {
      blocks.push({
        type: "code",
        language,
        content: codeContent,
        index,
      });
      index++;
    }
  }

  return blocks;
}

export function extractAllContentForOg(slug: string): ExtractedContent[] {
  try {
    const content = readFileSync(getContentPath(slug), "utf8");
    const allContent: ExtractedContent[] = [];

    const mermaidDiagrams = extractAllMermaidDiagrams(content);
    const codeBlocks = extractAllCodeBlocks(content);

    allContent.push(...mermaidDiagrams, ...codeBlocks);

    return allContent;
  } catch {
    return [];
  }
}

export function extractContentForOg(slug: string): ExtractedContent {
  try {
    const content = readFileSync(getContentPath(slug), "utf8");

    const mermaidData = extractMermaidDiagram(content);
    if (mermaidData) {
      return mermaidData;
    }

    const codeData = extractFirstCodeBlock(content);
    if (codeData) {
      return codeData;
    }

    return null;
  } catch {
    return null;
  }
}
