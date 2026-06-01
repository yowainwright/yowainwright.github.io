import { beforeEach, describe, expect, mock, test } from "bun:test";
import { JSDOM } from "jsdom";

mock.module("firebase/app", () => ({
  getApps: () => [],
  initializeApp: () => ({}),
}));

mock.module("firebase/database", () => ({
  Database: class Database {},
  getDatabase: () => ({}),
  get: async () => ({ val: () => null }),
  off: () => undefined,
  onValue: (
    _reference: unknown,
    callback: (snapshot: { val: () => Record<string, unknown> }) => void,
  ) => {
    callback({ val: () => ({}) });
    return () => undefined;
  },
  ref: (_database: unknown, path: string) => ({ path }),
  runTransaction: async (_reference: unknown, updater: (current: number | null) => number) => {
    updater(0);
  },
}));

const setupBrowser = () => {
  const dom = new JSDOM("", { url: "https://jeffry.in/admin" });
  Object.defineProperty(globalThis, "window", {
    value: dom.window,
    configurable: true,
  });
  Object.defineProperty(globalThis, "document", {
    value: dom.window.document,
    configurable: true,
  });
  Object.defineProperty(globalThis, "sessionStorage", {
    value: dom.window.sessionStorage,
    configurable: true,
  });
};

describe("analytics helpers", () => {
  beforeEach(() => {
    setupBrowser();
  });

  test("returns empty analytics and records session-only events without Firebase", async () => {
    const analytics = await import("../../../../../lib/client/analytics");
    const slug = "posts/example";

    await analytics.trackView(slug);
    await analytics.trackView(slug);
    await analytics.trackComment(slug);
    await analytics.trackLove(slug);
    await analytics.trackShare(slug);

    expect(sessionStorage.getItem(`viewed-${slug}`)).toBe("true");
    expect(sessionStorage.getItem(`commented-${slug}`)).toBe("true");
    expect(await analytics.getAnalytics(slug)).toEqual({
      slug,
      views: 0,
      shares: 0,
      comments: 0,
      loves: 0,
    });

    const unsubscribe = analytics.subscribeToAllAnalytics((data) => {
      expect(data).toEqual({});
    });

    unsubscribe();
  });
});
