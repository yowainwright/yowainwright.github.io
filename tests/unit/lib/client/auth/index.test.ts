import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import { JSDOM } from "jsdom";

const originalFetch = globalThis.fetch;

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
  Object.defineProperty(globalThis, "localStorage", {
    value: dom.window.localStorage,
    configurable: true,
  });
  Object.defineProperty(globalThis, "sessionStorage", {
    value: dom.window.sessionStorage,
    configurable: true,
  });
};

const mockFetch = (response: Response) =>
  (() => Promise.resolve(response)) as unknown as typeof fetch;

describe("client auth helpers", () => {
  beforeEach(() => {
    setupBrowser();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("stores, reads, clears, and authorizes GitHub auth state", async () => {
    const auth = await import("../../../../../lib/client/auth");
    const user = {
      login: "yowainwright",
      name: "Jeff",
      email: "jeff@example.com",
      avatar_url: "https://example.com/avatar.png",
    };

    auth.setAuth(user, "token-123");

    expect(auth.getStoredUser()).toEqual(user);
    expect(auth.getStoredToken()).toBe("token-123");
    expect(auth.isAuthenticated()).toBe(true);
    expect(auth.isAllowedUser(user)).toBe(true);
    expect(auth.isAllowedUser(Object.assign({}, user, { login: "someone-else" }))).toBe(false);

    auth.clearAuth();

    expect(auth.getStoredUser()).toBeNull();
    expect(auth.getStoredToken()).toBeNull();
  });

  test("exchanges an OAuth code only when state matches", async () => {
    const auth = await import("../../../../../lib/client/auth");
    const user = {
      login: "yowainwright",
      name: "Jeff",
      email: "jeff@example.com",
      avatar_url: "https://example.com/avatar.png",
    };

    sessionStorage.setItem("oauth_state", "state-123");
    globalThis.fetch = mockFetch(Response.json({ user, token: "token-123" }));

    await expect(auth.handleOAuthCallback("code", "wrong-state")).rejects.toThrow(
      "Invalid OAuth state",
    );

    const result = await auth.handleOAuthCallback("code", "state-123");

    expect(result).toEqual({ user, token: "token-123" });
  });
});
