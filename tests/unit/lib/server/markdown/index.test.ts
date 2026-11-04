import { describe, expect, test } from "vitest";
import { markdownToHtml } from "../../../../../lib/server/markdown";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";

describe("markdownToHtml", () => {
  test("renders the post examples with clean code, accessible tooltips, and normal highlights", async () => {
    const post = readFileSync("content/why-pastoralist.mdx", "utf8");
    const blocks = Array.from(post.matchAll(/```(json|bash)\n([\s\S]*?)```/g));
    const rendered = await Promise.all(blocks.map((block) => markdownToHtml(block[0])));
    const dom = new JSDOM(rendered.join("\n"));
    const codes = dom.window.document.querySelectorAll("pre code");
    const tips = dom.window.document.querySelectorAll("button.shiki-tooltip");
    expect(tips.length).toBe(15);
    tips.forEach((tip: Element) =>
      expect(tip.getAttribute("aria-label")).toContain(tip.getAttribute("data-tooltip")),
    );
    codes.forEach((code: Element) => {
      expect(code.textContent).not.toContain("[tooltip:");
      expect(code.textContent).not.toContain("[!code");
    });
    expect(JSON.parse(codes[0].textContent || "").overrides).toEqual({
      semver: "^7.5.4",
      ws: ">=8.17.1",
      axios: "1.12.0",
      lodash: ">=4.17.23",
    });
    const after = JSON.parse(codes[4].textContent || "");
    expect(after.pastoralist.appendix["qs@6.11.2"].dependents).toEqual({
      "shepherd-cli": "qs (required by express)",
    });
    expect(dom.window.document.querySelectorAll(".line.diff.add")).toHaveLength(0);
    expect(dom.window.document.querySelectorAll(".line.highlighted").length).toBeGreaterThan(0);
    dom.window.close();
  });
  test("adds heading classes and lazy image attributes", async () => {
    const heading = `Test Heading ${crypto.randomUUID()}`;
    const html = await markdownToHtml(`
# ${heading}

![A chart](/chart.png)
`);

    expect(html).toContain(heading);
    expect(html).toContain("content-header");
    expect(html).toContain('loading="lazy"');
    expect(html).toContain('decoding="async"');
  });

  test("wraps shiki code blocks with title and language UI", async () => {
    const title = `sample-${crypto.randomUUID()}.ts`;
    const html = await markdownToHtml(`
\`\`\`ts
// [title: ${title}]
const value = 1;
\`\`\`
`);

    expect(html).toContain("shiki");
    expect(html).toContain("shiki-title");
    expect(html).toContain(title);
    expect(html).toContain("<code>");
  });
});
