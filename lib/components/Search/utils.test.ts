import { describe, expect, test } from "vitest";
import Fuse from "fuse.js";
import { FUSE_OPTIONS } from "./constants";
import type { SearchResult } from "./types";
import { isSearchShortcut, searchItems } from "./utils";

const createResult = (updates: Partial<SearchResult>): SearchResult =>
  Object.assign(
    {
      title: "",
      description: "",
      slug: "",
      tags: [],
      type: "post" as const,
      url: "/",
    },
    updates,
  );

describe("Search utilities", () => {
  test("recognizes the search keyboard shortcut", () => {
    const event = { ctrlKey: false, key: "k", metaKey: true };

    expect(isSearchShortcut(event)).toBe(true);
  });

  test("matches tags and slugs", () => {
    const result = createResult({
      slug: "why-pastoralist",
      tags: ["Security"],
      title: "Pastoralist",
    });
    const fuse = new Fuse([result], FUSE_OPTIONS);

    expect(fuse.search("security")[0]?.item).toBe(result);
    expect(fuse.search("why-pastoralist")[0]?.item).toBe(result);
  });

  test("ranks title matches above body-only matches", () => {
    const titleMatch = createResult({ slug: "title", title: "Dependency audit" });
    const bodyMatch = createResult({ slug: "body", url: "/body/" });
    const fuse = new Fuse([bodyMatch, titleMatch], FUSE_OPTIONS);
    const searchContent = { "/body/": "a buried dependency audit phrase" };
    const results = searchItems(fuse, [bodyMatch, titleMatch], searchContent, "Dependency audit");

    expect(results).toEqual([titleMatch, bodyMatch]);
  });
});
