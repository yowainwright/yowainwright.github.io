import { afterEach, describe, expect, mock, test } from "bun:test";
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { JSDOM } from "jsdom";
import { useCodeBlocks } from "../lib/hooks/useCodeBlocks";
import { useHeadingAnchors } from "../lib/hooks/useHeadingAnchors";

mock.module("next/dynamic", () => ({
  default: () => () => null,
}));

let mountedRoots: Root[] = [];

const defineGlobal = (name: string, value: unknown) => {
  Object.defineProperty(globalThis, name, {
    value,
    configurable: true,
  });
};

const setupDom = (bodyHtml: string, url = "https://jeffry.in/post") => {
  const dom = new JSDOM(`<!doctype html><html><body>${bodyHtml}</body></html>`, {
    pretendToBeVisual: true,
    url,
  });

  defineGlobal("window", dom.window);
  defineGlobal("document", dom.window.document);
  defineGlobal("navigator", dom.window.navigator);
  defineGlobal("MutationObserver", dom.window.MutationObserver);
  defineGlobal("HTMLElement", dom.window.HTMLElement);
  defineGlobal("SVGElement", dom.window.SVGElement);
  defineGlobal("Node", dom.window.Node);
  defineGlobal("Event", dom.window.Event);
  defineGlobal("MouseEvent", dom.window.MouseEvent);
  defineGlobal("IS_REACT_ACT_ENVIRONMENT", true);

  return dom;
};

const createMountedRoot = async (element: React.ReactNode) => {
  const mount = document.createElement("div");
  document.body.appendChild(mount);

  const root = createRoot(mount);
  mountedRoots = mountedRoots.concat(root);

  await act(async () => {
    root.render(element);
  });

  return root;
};

afterEach(async () => {
  const roots = mountedRoots;
  mountedRoots = [];

  await Promise.all(
    roots.map((root) =>
      act(async () => {
        root.unmount();
      }),
    ),
  );
});

describe("DOM enhancement hooks", () => {
  test("renders copy buttons and heading anchors into markdown placeholders", async () => {
    const dom = setupDom(`
      <article class="post__content">
        <div class="shiki-wrapper">
          <pre class="shiki"><code>const value = 1;</code></pre>
          <span class="copy-button-placeholder"></span>
        </div>
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
      const codeBlockControls = useCodeBlocks("post-a", contentElement);
      const headingAnchorControls = useHeadingAnchors("post-a", contentElement);

      return (
        <>
          {codeBlockControls}
          {headingAnchorControls}
        </>
      );
    }

    await createMountedRoot(<Probe />);

    const copyButton = document.querySelector<HTMLButtonElement>(
      ".copy-button-placeholder .shiki-copy-button",
    );
    const headingAnchor = document.querySelector<HTMLElement>(
      ".heading-icon-placeholder .heading-link-icon",
    );

    expect(copyButton).not.toBeNull();
    expect(headingAnchor).not.toBeNull();

    await act(async () => {
      copyButton?.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
      headingAnchor?.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
      await Promise.resolve();
    });

    expect(clipboardWrites).toContain("const value = 1;");
    expect(clipboardWrites).toContain("https://jeffry.in/post#intro");
    expect(dom.window.location.hash).toBe("#intro");
  });

  test("detects Mermaid SVGs, adds chrome, and opens dialog state from click", async () => {
    setupDom(`
      <article class="post__content">
        <div class="diagram-shell">
          <svg id="mermaid-test" aria-roledescription="flowchart-v2">
            <g class="node"></g>
          </svg>
        </div>
        <div class="recharts-wrapper">
          <svg id="chart-svg" aria-roledescription="flowchart-v2">
            <g class="node"></g>
          </svg>
        </div>
      </article>
    `);

    const { useMermaidCharts } = await import("../lib/hooks/useMermaidCharts");
    type MermaidHookApi = ReturnType<typeof useMermaidCharts>;
    let hookApi: MermaidHookApi | null = null;
    const getHookApi = (): MermaidHookApi => {
      if (!hookApi) {
        throw new Error("Mermaid hook did not mount");
      }

      return hookApi;
    };

    function Probe() {
      hookApi = useMermaidCharts();
      return null;
    }

    await createMountedRoot(<Probe />);

    await act(async () => {
      getHookApi().processMermaidCharts();
      await Promise.resolve();
    });

    const mermaidShell = document.querySelector<HTMLElement>(".diagram-shell");
    const rechartsShell = document.querySelector<HTMLElement>(".recharts-wrapper");

    expect(mermaidShell?.classList.contains("mermaid-chart")).toBe(true);
    expect(mermaidShell?.classList.contains("mermaid-processed")).toBe(true);
    expect(mermaidShell?.querySelector(".mermaid-chart__expand-hint")).not.toBeNull();
    expect(rechartsShell?.classList.contains("mermaid-chart")).toBe(false);

    await act(async () => {
      mermaidShell?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await Promise.resolve();
    });

    expect(getHookApi().dialogState.isOpen).toBe(true);
    expect(getHookApi().dialogState.svgContent).toContain("mermaid-test");

    await act(async () => {
      getHookApi().closeDialog();
      await Promise.resolve();
    });

    expect(getHookApi().dialogState.isOpen).toBe(false);
  });
});
