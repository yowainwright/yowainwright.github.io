import { afterEach, expect, test, vi } from "vitest";
import React, { act } from "react";
import { HeartButton } from "../../../../lib/components/HeartButton";
import { cleanupMountedRoots, createMountedRoot, setupDom } from "../../test-utils/react-dom";

const snapshot = vi.hoisted(() => ({ count: 0 }));

vi.mock("firebase/database", () => ({
  ref: () => ({}),
  runTransaction: vi.fn().mockResolvedValue(undefined),
  onValue: (_ref: unknown, notify: (value: { val: () => number }) => void) => {
    notify({ val: () => snapshot.count });
    return vi.fn();
  },
}));
vi.mock("../../../../lib/client/auth", () => ({ db: {} }));
vi.mock("../../../../lib/client/analytics", () => ({ trackLove: vi.fn() }));
vi.mock("@sentry/nextjs", () => ({ captureException: vi.fn() }));

afterEach(async () => {
  await cleanupMountedRoots();
  vi.unstubAllGlobals();
});

test.each([
  [0, 0, false],
  [7, 0, true],
  [0, 1, true],
])("activates Love for count %i and stored clicks %i", async (count, clicks, active) => {
  const dom = setupDom("");
  vi.stubGlobal("localStorage", dom.window.localStorage);
  localStorage.setItem("heart-test-post", String(clicks));
  snapshot.count = count;
  await createMountedRoot(<HeartButton slug="test-post" />);
  const button = document.querySelector("button")!;
  expect(button.classList.contains("heart-button--active")).toBe(active);
  expect(button.querySelector(".share__count")?.textContent ?? "").toBe(count ? "7" : "");
  expect(button.querySelector("svg rect")?.getAttribute("fill")).toBe("currentColor");
});

test("activates Love immediately after a click before the remote count updates", async () => {
  const dom = setupDom("");
  vi.stubGlobal("localStorage", dom.window.localStorage);
  snapshot.count = 0;
  await createMountedRoot(<HeartButton slug="test-post" />);
  const button = document.querySelector("button")!;
  await act(async () => button.click());
  expect(button.classList.contains("heart-button--active")).toBe(true);
  expect(localStorage.getItem("heart-test-post")).toBe("1");
});
