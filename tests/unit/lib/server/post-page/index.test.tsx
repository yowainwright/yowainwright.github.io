import { describe, expect, test } from "bun:test";
import {
  buildPostStaticPaths,
  buildPostStaticProps,
  getMdxAstText,
  hasMdxClassName,
  isMdxTableTitle,
  remarkMdxTableTitles,
  type MdxAstNode,
} from "../../../../../lib/server/post-page";

const tableTitleNode: MdxAstNode = {
  type: "mdxJsxFlowElement",
  name: "p",
  attributes: [{ name: "className", value: "post__table-title is-compact" }],
  children: [
    { type: "text", value: "Pastoralist" },
    {
      type: "emphasis",
      children: [{ type: "text", value: " Study" }],
    },
  ],
};

const tableHeadingNode: MdxAstNode = {
  type: "heading",
  depth: 3,
  children: [{ type: "text", value: "Initial Override Snapshot" }],
};

describe("post page static helpers", () => {
  test("builds static paths from content posts", () => {
    const result = buildPostStaticPaths("content");

    expect(result.fallback).toBe(false);
    expect(result.paths).toContain("/why-pastoralist");
    expect(result.paths).toContain("/first-post-in-a-bit");
  });

  test("builds markdown post props with rendered HTML and sanitized frontmatter", async () => {
    const result = await buildPostStaticProps("first-post-in-a-bit", "content");
    const props = result.props;

    expect(props.slug).toBe("first-post-in-a-bit");
    expect(props.isMdx).toBe(false);
    expect(props.mdxSource).toBeNull();
    expect(props.content).toContain("content-header");
    expect(props.content).toContain('loading="lazy"');
    expect(props.frontmatter.description).toBeNull();
    expect(props.frontmatter.meta).toContain("I stopped posting on this blog");
    expect(props.frontmatter.tags).toEqual([]);
    expect(props.wordCount).toBeGreaterThan(100);
    expect(props.ogImagePath).toMatch(/\.png$/);
  });

  test("builds MDX post props with heading ids and anchor placeholders", async () => {
    const result = await buildPostStaticProps("why-pastoralist", "content");
    const props = result.props;
    const compiledSource = props.mdxSource?.compiledSource || "";

    expect(props.slug).toBe("why-pastoralist");
    expect(props.isMdx).toBe(true);
    expect(props.content).toBeNull();
    expect(compiledSource).toContain('id: "the-problem"');
    expect(compiledSource).toContain('className: "content-header"');
    expect(compiledSource).toContain("heading-icon-placeholder");
  });

  test("attaches MDX table title metadata only to the following table", () => {
    const titledTable: MdxAstNode = { type: "table" };
    const orphanTitle: MdxAstNode = Object.assign({}, tableTitleNode, {
      children: [{ type: "text", value: "Orphan Title" }],
    });
    const paragraph: MdxAstNode = {
      type: "paragraph",
      children: [{ type: "text", value: "Body" }],
    };
    const tree: MdxAstNode = {
      type: "root",
      children: [tableTitleNode, titledTable, orphanTitle, paragraph],
    };

    remarkMdxTableTitles()(tree);

    expect(getMdxAstText(tableTitleNode)).toBe("Pastoralist Study");
    expect(hasMdxClassName(tableTitleNode, "post__table-title")).toBe(true);
    expect(isMdxTableTitle(tableTitleNode)).toBe(true);
    expect(tree.children?.[0]).toBe(titledTable);
    expect(titledTable.data?.hProperties?.["data-title"]).toBe(
      "Pastoralist Study",
    );
    expect(tree.children?.[1]).toBe(orphanTitle);
    expect(tree.children?.[2]).toBe(paragraph);
  });

  test("attaches a preceding h3 heading as table title metadata", () => {
    const titledTable: MdxAstNode = { type: "table" };
    const paragraph: MdxAstNode = {
      type: "paragraph",
      children: [{ type: "text", value: "Body" }],
    };
    const tree: MdxAstNode = {
      type: "root",
      children: [tableHeadingNode, titledTable, paragraph],
    };

    remarkMdxTableTitles()(tree);

    expect(getMdxAstText(tableHeadingNode)).toBe("Initial Override Snapshot");
    expect(isMdxTableTitle(tableHeadingNode)).toBe(true);
    expect(tree.children?.[0]).toBe(titledTable);
    expect(titledTable.data?.hProperties?.["data-title"]).toBe(
      "Initial Override Snapshot",
    );
    expect(tree.children?.[1]).toBe(paragraph);
  });
});
