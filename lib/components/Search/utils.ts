import type Fuse from "fuse.js";
import { MAX_RESULTS, SEARCH_KEYS } from "./constants";
import type {
  SearchContentData,
  SearchKeyboardActions,
  SearchResult,
  SearchShortcutEvent,
  SearchState,
} from "./types";

export const createInitialState = (): SearchState => ({
  query: "",
  results: [],
  selectedIndex: 0,
});

export const clampIndex = (index: number, max: number): number => {
  const upperBound = Math.min(index, max);
  return Math.max(0, upperBound);
};

export const updateSearchState = (state: SearchState, updates: Partial<SearchState>): SearchState =>
  Object.assign({}, state, updates);

export const isSearchShortcut = (event: SearchShortcutEvent): boolean => {
  const hasModifier = event.metaKey || event.ctrlKey;
  const isShortcutKey = event.key === SEARCH_KEYS.shortcut;
  return hasModifier && isShortcutKey;
};

export const getSelectedClass = (isSelected: boolean): string => {
  if (!isSelected) return "";
  return "search-result--selected";
};

export const getRecentItems = (
  searchData: SearchResult[],
  type: SearchResult["type"],
  count: number,
): SearchResult[] => searchData.filter((item) => item.type === type).slice(0, count);

const normalizeQuery = (query: string): string => query.trim().replace(/\s+/g, " ").toLowerCase();

const getMetadataMatches = (fuse: Fuse<SearchResult>, query: string): SearchResult[] =>
  fuse.search(query).map(({ item }) => item);

const getMatchingContentUrls = (searchContent: SearchContentData, query: string): Set<string> => {
  const entries = Object.entries(searchContent);
  const matches = entries.filter(([, content]) => content.includes(query));
  return new Set(matches.map(([url]) => url));
};

const getContentMatches = (
  searchData: SearchResult[],
  matchingContentUrls: Set<string>,
  matchedUrls: Set<string>,
): SearchResult[] =>
  searchData.filter(({ url }) => {
    if (matchedUrls.has(url)) return false;
    return matchingContentUrls.has(url);
  });

export const searchItems = (
  fuse: Fuse<SearchResult>,
  searchData: SearchResult[],
  searchContent: SearchContentData,
  query: string,
): SearchResult[] => {
  const normalizedQuery = normalizeQuery(query);
  if (!normalizedQuery) return [];

  const metadataMatches = getMetadataMatches(fuse, normalizedQuery);
  const matchedUrls = new Set(metadataMatches.map(({ url }) => url));
  const contentUrls = getMatchingContentUrls(searchContent, normalizedQuery);
  const contentMatches = getContentMatches(searchData, contentUrls, matchedUrls);
  return metadataMatches.concat(contentMatches).slice(0, MAX_RESULTS);
};

const handleArrowKey = (event: KeyboardEvent, actions: SearchKeyboardActions): boolean => {
  const isNext = event.key === SEARCH_KEYS.arrowDown;
  const isPrevious = event.key === SEARCH_KEYS.arrowUp;
  const isArrowKey = isNext || isPrevious;
  if (!isArrowKey) return false;

  event.preventDefault();
  if (isNext) actions.selectNext();
  if (isPrevious) actions.selectPrev();
  return true;
};

export const handleSearchKeyDown = (event: KeyboardEvent, actions: SearchKeyboardActions): void => {
  if (event.key === SEARCH_KEYS.escape) {
    actions.close();
    return;
  }

  if (!actions.canNavigateResults) return;
  if (handleArrowKey(event, actions)) return;
  if (event.key !== SEARCH_KEYS.enter) return;

  const selected = actions.getSelectedResult();
  if (selected) actions.navigate(selected.url);
};
