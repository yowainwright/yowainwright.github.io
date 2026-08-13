import type Fuse from "fuse.js";
import { MAX_RESULTS } from "./constants";
import type { SearchContentData, SearchResult } from "./types";

const normalizeQuery = (query: string): string => query.trim().replace(/\s+/g, " ").toLowerCase();

const getMetadataMatches = (fuse: Fuse<SearchResult>, query: string): SearchResult[] =>
  fuse.search(query).map(({ item }) => item);

const contentContainsQuery = (content: string, query: string): boolean => content.includes(query);

const getMatchingContentUrls = (searchContent: SearchContentData, query: string): Set<string> => {
  const entries = Object.entries(searchContent);
  const matches = entries.filter(([, content]) => contentContainsQuery(content, query));
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
