import { describe, expect, test } from "bun:test";
import { markdownToHtml } from "../../../../../lib/server/markdown";

describe("markdownToHtml", () => {
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
