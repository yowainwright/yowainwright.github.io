export const FUSE_OPTIONS = {
  keys: ["title", "description"],
  threshold: 0.3,
  includeScore: true,
} as const;

export const MAX_RESULTS = 8;
export const RECENT_ITEMS_COUNT = 2;
export const SEARCH_DATA_PATH = "/search-data.json";
