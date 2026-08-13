import type { IFuseOptions } from "fuse.js";
import type { SearchResult } from "./types";

export const FUSE_OPTIONS: IFuseOptions<SearchResult> = {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "description", weight: 0.28 },
    { name: "tags", weight: 0.17 },
    { name: "slug", weight: 0.05 },
  ],
  threshold: 0.3,
  ignoreLocation: true,
  includeScore: true,
};

export const MAX_RESULTS = 8;
export const RECENT_ITEMS_COUNT = 2;
export const SEARCH_FOCUS_DELAY_MS = 100;
export const SEARCH_DATA_PATH = "/search-data.json";
export const SEARCH_CONTENT_PATH = "/search-content.json";

export const SEARCH_KEYS = {
  arrowDown: "ArrowDown",
  arrowUp: "ArrowUp",
  enter: "Enter",
  escape: "Escape",
  shortcut: "k",
} as const;
