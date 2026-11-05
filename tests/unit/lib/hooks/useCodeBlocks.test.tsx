import { afterEach, describe, expect, test, vi } from "vitest";
import React, { act } from "react";
import { useCodeBlocks } from "../../../../lib/hooks/useCodeBlocks";
import { cleanupMountedRoots, createMountedRoot, setupDom } from "../../test-utils/react-dom";

afterEach(async () => {
  await cleanupMountedRoots();
  vi.restoreAllMocks();
});

describe("useCodeBlocks", () => {
  test("enhances code mounted later and stops observing when unmounted", async () => {
    const dom = setupDom('<article class="post__content"></article>');
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(dom.window.navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    const disconnect = vi.spyOn(dom.window.MutationObserver.prototype, "disconnect");
    const contentElement = document.querySelector<HTMLElement>(".post__content")!;
    function Probe() {
      return useCodeBlocks("delayed-post", contentElement);
    }
    const root = await createMountedRoot(<Probe />);
    expect(document.querySelector(".shiki-copy-button")).toBeNull();
    const code =
      '<div class="shiki-wrapper"><pre class="shiki"><code>late code</code></pre><span class="copy-button-placeholder"></span></div>';
    await act(async () => {
      contentElement.innerHTML = code;
    });
    const button = contentElement.querySelector<HTMLButtonElement>(".shiki-copy-button");
    expect(button).not.toBeNull();
    await act(async () => button?.click());
    expect(writeText).toHaveBeenCalledWith("late code");
    await act(async () => {
      contentElement.append(document.createElement("p"));
    });
    expect(contentElement.querySelectorAll(".shiki-copy-button")).toHaveLength(1);
    expect(contentElement.querySelector(".shiki-copy-button")).toBe(button);
    await act(async () => {
      contentElement.querySelector(".shiki-wrapper")?.remove();
    });
    expect(contentElement.querySelector(".shiki-copy-button")).toBeNull();
    await act(async () => {
      root.unmount();
    });
    expect(disconnect).toHaveBeenCalledOnce();
    await act(async () => {
      contentElement.innerHTML = code;
    });
    expect(contentElement.querySelector(".shiki-copy-button")).toBeNull();
  });

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
