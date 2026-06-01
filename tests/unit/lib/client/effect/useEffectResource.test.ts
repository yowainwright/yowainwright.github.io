import { describe, expect, test } from "bun:test";
import { Effect } from "effect";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import {
  matchEffectResource,
  useEffectResource,
  type EffectResourceState,
} from "../../../../../lib/client/effect/useEffectResource";

describe("matchEffectResource", () => {
  const handlers = {
    onLoading: () => "loading",
    onFailure: (error: string) => `failure:${error}`,
    onSuccess: (data: string) => `success:${data}`,
  };

  test("matches loading, failure, and success resource states", () => {
    const loading: EffectResourceState<string> = {
      status: "loading",
      data: null,
      error: null,
    };
    const failure: EffectResourceState<string> = {
      status: "failure",
      data: null,
      error: "boom",
    };
    const success: EffectResourceState<string> = {
      status: "success",
      data: "ready",
      error: null,
    };

    expect(matchEffectResource(loading, handlers)).toBe("loading");
    expect(matchEffectResource(failure, handlers)).toBe("failure:boom");
    expect(matchEffectResource(success, handlers)).toBe("success:ready");
  });
});

describe("useEffectResource", () => {
  test("runs Effect resources into React success and failure states", async () => {
    const dom = new JSDOM('<div id="root"></div>');
    Object.defineProperty(globalThis, "window", {
      value: dom.window,
      configurable: true,
    });
    Object.defineProperty(globalThis, "document", {
      value: dom.window.document,
      configurable: true,
    });
    Object.defineProperty(globalThis, "IS_REACT_ACT_ENVIRONMENT", {
      value: true,
      configurable: true,
    });

    let states: Array<EffectResourceState<string>> = [];

    function Probe({ resource }: { resource: Effect.Effect<string, string, never> }) {
      const state = useEffectResource(resource);
      states = states.concat(state);
      return null;
    }

    const container = document.getElementById("root");
    expect(container).not.toBeNull();
    const root = createRoot(container!);

    await act(async () => {
      root.render(React.createElement(Probe, { resource: Effect.succeed("ready") }));
    });
    await act(async () => {
      await Promise.resolve();
    });
    await act(async () => {
      root.render(React.createElement(Probe, { resource: Effect.fail("boom") }));
    });
    await act(async () => {
      await Promise.resolve();
    });

    expect(states.some((state) => state.status === "success" && state.data === "ready")).toBe(true);
    expect(states.some((state) => state.status === "failure" && state.error.includes("boom"))).toBe(
      true,
    );

    await act(async () => {
      root.unmount();
    });
  });
});
