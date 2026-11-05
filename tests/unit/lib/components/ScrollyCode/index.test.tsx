import { afterEach, expect, test, vi } from "vitest";
import React, { act } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeShiki from "@shikijs/rehype";
import { getShikiRehypeOptions } from "../../../../../lib/server/markdown";
import { buildPostStaticProps } from "../../../../../lib/server/post-page";
import { ScrollyCode } from "../../../../../lib/components/ScrollyCode";
import { InfoBlock } from "../../../../../lib/components/InfoBlock";
import { Tooltip } from "../../../../../lib/components/Tooltip";
import { cleanupMountedRoots, createMountedRoot, setupDom } from "../../../test-utils/react-dom";

afterEach(async () => {
  await cleanupMountedRoots();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

test("works in an unrelated MDX post with only the shared component registered", async () => {
  setupDom("");
  const source = `<ScrollyCode steps='[{"title":"Name","note":"The name is Ada.","lines":[1]}]'>

\`\`\`ts
const name = "Ada";
\`\`\`

</ScrollyCode>`;
  const shikiOptions = getShikiRehypeOptions();
  const compiled = await serialize(source, {
    mdxOptions: { rehypePlugins: [[rehypeShiki, shikiOptions]] },
  });
  await createMountedRoot(<MDXRemote {...compiled} components={{ ScrollyCode }} />);
  expect(document.querySelector('[aria-label="Code walkthrough"]')).not.toBeNull();
  expect(document.querySelector("nav button")?.textContent).toBe("Name");
  expect(document.querySelector("pre code")?.textContent).toBe('const name = "Ada";');
  expect(document.querySelectorAll(".scrolly-code-highlight")).toHaveLength(1);
});

test("fades the previous explanation before showing the next and highlights code identifiers", async () => {
  setupDom("");
  vi.useFakeTimers();
  const steps = [
    { title: "semver", note: "semver starts here.", lines: [1] },
    { title: "axios", note: "axios is pinned.", lines: [2] },
  ];
  await createMountedRoot(
    <ScrollyCode steps={steps}>
      <pre>
        <code>
          <span className="line">{'"semver": "^7.5.4"'}</span>
          <span className="line">{'"axios": "1.12.0"'}</span>
        </code>
      </pre>
    </ScrollyCode>,
  );
  const popup = document.querySelector<HTMLElement>(".scroll-tooltip__content")!;
  const buttons = document.querySelectorAll<HTMLButtonElement>("nav button");
  expect(popup.querySelector(".code-tooltip-token")?.textContent).toBe("semver");
  await act(async () => buttons[1].click());
  expect(popup.dataset.exiting).toBe("true");
  expect(popup.textContent).toBe("semver starts here.");
  await act(async () => vi.advanceTimersByTime(180));
  expect(popup.dataset.exiting).toBe("false");
  expect(popup.textContent).toBe("axios is pinned.");
  expect(popup.querySelector(".code-tooltip-token")?.textContent).toBe("axios");
  await act(async () => buttons[0].click());
  await act(async () => buttons[1].click());
  await act(async () => vi.advanceTimersByTime(250));
  expect(popup.textContent).toBe("axios is pinned.");
});

test("renders the actual post with two field walkthroughs and the before/after walkthrough", async () => {
  setupDom("");
  const { props } = await buildPostStaticProps("why-pastoralist", "content");
  const components = {
    ScrollyCode,
    InfoBlock,
    Tooltip,
    PastoralistStudyCharts: () => null,
    SectionSources: () => null,
  };
  if (!props.mdxSource) throw new Error("Expected compiled MDX");
  await createMountedRoot(<MDXRemote {...props.mdxSource} components={components} />);
  const walks = Array.from(document.querySelectorAll(".scrolly-code"));
  expect(walks).toHaveLength(3);
  expect(walks.map((walk) => walk.querySelector(".scrolly-code__panel > h3")?.textContent)).toEqual([
    "Let’s Observe Some Overrides and See How It’s Unclear Why They’re There",
    "Pastoralist Records Why Each Override Exists and What Depends on It",
    "With the Following Flow, Observe How Pastoralist Adds Context for Why Each Override Exists",
  ]);
  expect(walks.map((walk) => walk.querySelectorAll("nav button").length)).toEqual([5, 5, 3]);
  expect(walks[0].querySelectorAll("pre code")).toHaveLength(1);
  expect(walks[1].querySelectorAll("pre code")).toHaveLength(1);
  expect(walks[0].querySelectorAll(".copy-button-placeholder")).toHaveLength(1);
  expect(walks[1].querySelectorAll(".copy-button-placeholder")).toHaveLength(1);
  expect(walks[0].querySelectorAll(".scrolly-code-highlight")).toHaveLength(1);
  const firstCode = walks[0].querySelector("pre code")?.textContent;
  expect(JSON.parse(firstCode || "").overrides.axios).toBe("1.12.0");
});

test("walks through fields without duplicating or changing the shared code", async () => {
  setupDom("");
  const steps = [
    { title: "Override", note: "Version constraint", lines: [1] },
    { title: "Ledger", note: "Tracking details", lines: [2] },
  ];
  await createMountedRoot(
    <ScrollyCode steps={steps}>
      <pre>
        <code>
          <span className="line">override</span>
          {"\n"}
          <span className="line">ledger</span>
        </code>
      </pre>
    </ScrollyCode>,
  );
  const code = document.querySelector("pre");
  const originalText = code?.textContent;
  const lines = document.querySelectorAll(".line");
  expect(document.querySelectorAll("pre")).toHaveLength(1);
  expect(lines[0].classList.contains("scrolly-code-highlight")).toBe(true);
  const buttons = document.querySelectorAll<HTMLButtonElement>("nav button");
  await act(async () => buttons[1].click());
  expect(document.querySelector("pre")).toBe(code);
  expect(code?.textContent).toBe(originalText);
  expect(lines[0].classList.contains("scrolly-code-highlight")).toBe(false);
  expect(lines[1].classList.contains("scrolly-code-highlight")).toBe(true);
  expect(document.querySelector("[aria-live]")?.textContent).toBe("Tracking details");
});

test("selects frames by click, keyboard, and scroll; disconnects on unmount", async () => {
  const dom = setupDom("");
  const disconnect = vi.fn();
  const observe = vi.fn();
  let notify: IntersectionObserverCallback = () => {};
  class Observer {
    constructor(callback: IntersectionObserverCallback) {
      notify = callback;
    }
    observe = observe;
    disconnect = disconnect;
  }
  vi.stubGlobal("IntersectionObserver", Observer);
  const root = await createMountedRoot(
    <ScrollyCode>
      <section data-title="Before" data-note="Original override">
        <pre>before</pre>
      </section>
      <section data-title="Command" data-note="Record dependents">
        <pre>npx pastoralist</pre>
      </section>
      <section data-title="After" data-note="Tracked override">
        <pre>after</pre>
      </section>
    </ScrollyCode>,
  );
  const buttons = document.querySelectorAll<HTMLButtonElement>("nav button");
  const frames = document.querySelectorAll<HTMLElement>(".scrolly-code__frames section");
  expect(observe).toHaveBeenCalledTimes(3);
  expect(frames[0].hidden).toBe(false);
  await act(async () => buttons[1].click());
  expect(frames[0].hidden).toBe(true);
  expect(frames[1].hidden).toBe(false);
  expect(document.querySelector("[aria-live]")?.textContent).toBe("Record dependents");
  await act(async () => {
    buttons[1].dispatchEvent(
      new dom.window.KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
    );
  });
  expect(frames[2].hidden).toBe(false);
  expect(document.activeElement).toBe(buttons[2]);
  await act(async () => {
    buttons[2].dispatchEvent(
      new dom.window.KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }),
    );
  });
  expect(frames[1].hidden).toBe(false);
  expect(document.activeElement).toBe(buttons[1]);
  await act(async () => {
    buttons[1].dispatchEvent(
      new dom.window.KeyboardEvent("keydown", { key: "End", bubbles: true }),
    );
  });
  expect(frames[2].hidden).toBe(false);
  expect(document.activeElement).toBe(buttons[2]);
  const marker = document.querySelector('[data-scrolly-step="0"]');
  await act(async () => {
    notify(
      [{ isIntersecting: true, target: marker } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
  expect(frames[0].hidden).toBe(false);
  await act(async () => root.unmount());
  expect(disconnect).toHaveBeenCalledOnce();
});
