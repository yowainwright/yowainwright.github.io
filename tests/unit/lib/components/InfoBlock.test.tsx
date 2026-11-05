import { expect, test } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { JSDOM } from "jsdom";
import { InfoBlock } from "../../../../lib/components/InfoBlock";

test("works in another MDX post and gives repeated titles distinct accessible labels", async () => {
  const source = `<InfoBlock title="Installation">

Run the installer.

</InfoBlock>

<InfoBlock title="Installation">

Then check the result.

</InfoBlock>`;
  const compiled = await serialize(source);
  const markup = renderToStaticMarkup(<MDXRemote {...compiled} components={{ InfoBlock }} />);
  const dom = new JSDOM(markup);
  const document = dom.window.document;
  const blocks = document.querySelectorAll(".info-block");
  expect(blocks).toHaveLength(2);
  const labels = Array.from(blocks, (block: Element) => block.getAttribute("aria-labelledby"));
  expect(new Set(labels).size).toBe(2);
  labels.forEach((id) => expect(document.getElementById(id!)?.textContent).toBe("Installation"));
  expect(blocks[0].querySelector("p")?.textContent).toBe("Run the installer.");
  expect(blocks[1].querySelector("p")?.textContent).toBe("Then check the result.");
  dom.window.close();
});
