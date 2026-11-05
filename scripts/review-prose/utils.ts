import type { Text } from "mdast";
import { LocalLinter, type Lint } from "harper.js";
import { binary } from "harper.js/binary";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { SKIP, visit } from "unist-util-visit";
import writeGood from "write-good";

type Finding = {
  source: string;
  start: number;
  end: number;
  message: string;
};

const EXCLUDED_NODES = ["blockquote", "table", "mdxJsxFlowElement", "mdxJsxTextElement"];

export async function reviewProse(source: string, mdx: boolean) {
  const prose = proseSource(source, mdx);
  const grammar = await checkGrammar(prose);
  const style = writeGood(prose).map(({ index, offset, reason }) => {
    const end = index + offset;
    return { source: "write-good", start: index, end, message: reason };
  });
  return grammar.concat(style).filter((finding) => {
    const original = source.slice(finding.start, finding.end);
    const checked = prose.slice(finding.start, finding.end);
    const hasProse = checked.trim().length > 0;
    const unchanged = original === checked;
    return unchanged && hasProse;
  });
}

export function proseSource(source: string, mdx: boolean) {
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkFrontmatter);
  if (mdx) processor.use(remarkMdx);
  const tree = processor.parse(source);
  let texts: Text[] = [];
  visit(tree, (node) => {
    if (EXCLUDED_NODES.includes(node.type)) return SKIP;
    if (node.type !== "text") return;
    const isUrl = /^(?:https?:\/\/|mailto:|www\.)\S+$/.test(node.value);
    if (!isUrl) texts = texts.concat(node);
  });
  return maskSource(source, texts);
}

function maskSource(source: string, texts: Text[]) {
  const parts = texts.map((node, index) => {
    const start = node.position!.start.offset!;
    const end = node.position!.end.offset!;
    const previousEnd = texts[index - 1]?.position?.end.offset ?? 0;
    const gap = blank(source.slice(previousEnd, start));
    return gap + source.slice(start, end);
  });
  const lastEnd = texts.at(-1)?.position?.end.offset ?? 0;
  return parts.join("") + blank(source.slice(lastEnd));
}

async function checkGrammar(prose: string): Promise<Finding[]> {
  const linter = new LocalLinter({ binary });
  try {
    const lints = await linter.lint(prose, { language: "plaintext" });
    return lints.map(grammarFinding);
  } finally {
    await linter.dispose();
  }
}

function grammarFinding(lint: Lint): Finding {
  const span = lint.span();
  try {
    const { start, end } = span;
    const message = lint.message();
    return { source: "Harper", start, end, message };
  } finally {
    span.free();
    lint.free();
  }
}

function blank(value: string) {
  return value.replace(/[^\r\n]/g, " ");
}
