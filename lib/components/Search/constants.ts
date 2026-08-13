import type { IFuseOptions } from "fuse.js";
import type { SearchResult } from "./types";

export const FUSE_OPTIONS: IFuseOptions<SearchResult> = {
  keys: [
    { name: "title", weight: 0.45 },
    { name: "description", weight: 0.25 },
    { name: "tags", weight: 0.15 },
    { name: "content", weight: 0.1 },
    { name: "slug", weight: 0.05 },
  ],
  threshold: 0.3,
  ignoreLocation: true,
  includeScore: true,
};

export const MAX_RESULTS = 8;
export const RECENT_ITEMS_COUNT = 2;
export const SEARCH_DATA_PATH = "/search-data.json";
