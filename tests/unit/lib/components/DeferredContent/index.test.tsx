import React, { act } from "react";
import { afterEach, expect, test, vi } from "vitest";
import { DeferredContent } from "../../../../../lib/components/DeferredContent";
import { cleanupMountedRoots, createMountedRoot, setupDom } from "../../../test-utils/react-dom";

afterEach(async () => {
  await cleanupMountedRoots();
  vi.unstubAllGlobals();
});

test("mounts expensive content only when near the viewport and keeps it mounted", async () => {
  setupDom("");
  let notify: IntersectionObserverCallback = () => {};
  const disconnect = vi.fn();
  const observe = vi.fn();
  class Observer {
    constructor(callback: IntersectionObserverCallback) { notify = callback; }
    observe = observe;
    disconnect = disconnect;
  }
  vi.stubGlobal("IntersectionObserver", Observer);
  await createMountedRoot(<DeferredContent><span>Chart content</span></DeferredContent>);
  expect(document.querySelector("span")).toBeNull();
  expect(observe).toHaveBeenCalledOnce();
  await act(async () => notify([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver));
  expect(document.querySelector("span")).toBeNull();
  await act(async () => notify([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
  expect(document.querySelector("span")?.textContent).toBe("Chart content");
  expect(disconnect).toHaveBeenCalled();
  await act(async () => notify([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver));
  expect(document.querySelector("span")?.textContent).toBe("Chart content");
});

test("disconnects observation if unmounted before becoming visible", async () => {
  setupDom("");
  const disconnect = vi.fn();
  vi.stubGlobal("IntersectionObserver", class { observe() {} disconnect = disconnect; });
  const root = await createMountedRoot(<DeferredContent>Chart content</DeferredContent>);
  await act(async () => root.unmount());
  expect(disconnect).toHaveBeenCalledOnce();
});

test("loads content when IntersectionObserver is unavailable", async () => {
  setupDom("");
  vi.stubGlobal("IntersectionObserver", undefined);
  await createMountedRoot(<DeferredContent>Chart content</DeferredContent>);
  expect(document.body.textContent).toBe("Chart content");
});
