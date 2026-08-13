import { describe, expect, test } from "vitest";
import Fuse from "fuse.js";
import { FUSE_OPTIONS } from "../../../../../lib/components/Search/constants";
import { searchItems } from "../../../../../lib/components/Search/searchItems";
import type { SearchResult } from "../../../../../lib/components/Search/types";

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

describe("search options", () => {
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
