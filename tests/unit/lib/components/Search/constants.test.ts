import { describe, expect, test } from "vitest";
import Fuse from "fuse.js";
import { FUSE_OPTIONS } from "../../../../../lib/components/Search/constants";
import type { SearchResult } from "../../../../../lib/components/Search/types";

const createResult = (updates: Partial<SearchResult>): SearchResult =>
  Object.assign(
    {
      content: "",
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
  test("matches article body, tags, and slugs", () => {
    const result = createResult({
      content: "A buried phrase about dependency audit trails",
      slug: "why-pastoralist",
      tags: ["Security"],
      title: "Pastoralist",
    });
    const fuse = new Fuse([result], FUSE_OPTIONS);

    expect(fuse.search("audit trails")[0]?.item).toBe(result);
    expect(fuse.search("security")[0]?.item).toBe(result);
    expect(fuse.search("why-pastoralist")[0]?.item).toBe(result);
  });

  test("ranks title matches above body-only matches", () => {
    const titleMatch = createResult({ slug: "title", title: "Dependency audit" });
    const bodyMatch = createResult({ slug: "body", content: "Dependency audit" });
    const fuse = new Fuse([bodyMatch, titleMatch], FUSE_OPTIONS);

    expect(fuse.search("dependency audit")[0]?.item).toBe(titleMatch);
  });
});
