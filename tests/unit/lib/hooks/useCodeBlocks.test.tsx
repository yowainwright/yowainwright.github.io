import { afterEach, describe, expect, test } from "bun:test";
import React, { act } from "react";
import { useCodeBlocks } from "../../../../lib/hooks/useCodeBlocks";
import { cleanupMountedRoots, createMountedRoot, setupDom } from "../../test-utils/react-dom";

afterEach(async () => {
  await cleanupMountedRoots();
});

describe("useCodeBlocks", () => {
  test("renders copy buttons into markdown placeholders", async () => {
    const dom = setupDom(`
      <article class="post__content">
        <div class="shiki-wrapper">
          <pre class="shiki"><code>const value = 1;</code></pre>
          <span class="copy-button-placeholder"></span>
        </div>
      </article>
    `);
    let clipboardWrites: string[] = [];
    Object.defineProperty(dom.window.navigator, "clipboard", {
      value: {
        writeText: async (text: string) => {
          clipboardWrites = clipboardWrites.concat(text);
        },
      },
      configurable: true,
    });

    const contentElement = document.querySelector<HTMLElement>(".post__content");
    expect(contentElement).not.toBeNull();

    function Probe() {
      return useCodeBlocks("post-a", contentElement);
    }

    await createMountedRoot(<Probe />);

    const copyButton = document.querySelector<HTMLButtonElement>(
      ".copy-button-placeholder .shiki-copy-button",
    );

    expect(copyButton).not.toBeNull();

    await act(async () => {
      copyButton?.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
      await Promise.resolve();
    });

    expect(clipboardWrites).toContain("const value = 1;");
  });
});
