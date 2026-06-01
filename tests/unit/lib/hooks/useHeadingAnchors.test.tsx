import { afterEach, describe, expect, test } from "bun:test";
import React, { act } from "react";
import { useHeadingAnchors } from "../../../../lib/hooks/useHeadingAnchors";
import { cleanupMountedRoots, createMountedRoot, setupDom } from "../../test-utils/react-dom";

afterEach(async () => {
  await cleanupMountedRoots();
});

describe("useHeadingAnchors", () => {
  test("renders heading anchors into markdown placeholders", async () => {
    const dom = setupDom(`
      <article class="post__content">
        <h2 id="intro">
          Intro
          <a class="heading-icon-placeholder" href="#intro"></a>
        </h2>
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
      return useHeadingAnchors("post-a", contentElement);
    }

    await createMountedRoot(<Probe />);

    const headingAnchor = document.querySelector<HTMLElement>(
      ".heading-icon-placeholder .heading-link-icon",
    );

    expect(headingAnchor).not.toBeNull();

    await act(async () => {
      headingAnchor?.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
      await Promise.resolve();
    });

    expect(dom.window.location.hash).toBe("#intro");
    expect(clipboardWrites).toContain("https://jeffry.in/post#intro");
  });
});
