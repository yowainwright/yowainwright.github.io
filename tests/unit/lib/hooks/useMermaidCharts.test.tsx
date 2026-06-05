import { afterEach, describe, expect, mock, test } from "bun:test";
import React, { act } from "react";
import { useMermaidCharts } from "../../../../lib/hooks/useMermaidCharts";
import {
  cleanupMountedRoots,
  createMountedRoot,
  setupDom,
} from "../../test-utils/react-dom";

mock.module("next/dynamic", () => ({
  default: () => () => null,
}));

afterEach(async () => {
  await cleanupMountedRoots();
});

describe("useMermaidCharts", () => {
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
    const rechartsShell =
      document.querySelector<HTMLElement>(".recharts-wrapper");

    expect(mermaidShell?.classList.contains("mermaid-chart")).toBe(true);
    expect(mermaidShell?.classList.contains("mermaid-processed")).toBe(true);
    expect(
      mermaidShell?.querySelector(".mermaid-chart__expand-hint"),
    ).not.toBeNull();
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
