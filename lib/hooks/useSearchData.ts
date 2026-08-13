import { useEffect, useState } from "react";
import type { SearchResult } from "../components/Search/types";

const SEARCH_DATA_PATH = "/search-data.json";
const SEARCH_RESULT_TYPES = new Set(["page", "post", "project"]);
let searchDataPromise: Promise<SearchResult[]> | null = null;

const isSearchResult = (value: unknown): value is SearchResult => {
  const isObject = Boolean(value) && typeof value === "object";
  if (!isObject) return false;

  const result = value as Record<string, unknown>;
  const hasValidType = typeof result.type === "string" && SEARCH_RESULT_TYPES.has(result.type);
  const stringFields = ["content", "title", "description", "slug", "url"];
  const hasValidStrings = stringFields.every((field) => typeof result[field] === "string");
  const hasValidTags =
    Array.isArray(result.tags) && result.tags.every((tag) => typeof tag === "string");

  if (!hasValidType) return false;
  if (!hasValidStrings) return false;
  return hasValidTags;
};

const parseSearchData = (value: unknown): SearchResult[] => {
  const isValid = Array.isArray(value) && value.every(isSearchResult);
  if (!isValid) throw new Error("Search data is invalid");
  return value;
};

const fetchSearchData = async (): Promise<SearchResult[]> => {
  const response = await fetch(SEARCH_DATA_PATH);
  if (!response.ok) throw new Error(`Search data returned ${response.status}`);

  const data: unknown = await response.json();
  return parseSearchData(data);
};

const loadSearchData = () => {
  if (searchDataPromise) return searchDataPromise;

  searchDataPromise = fetchSearchData().catch((error) => {
    searchDataPromise = null;
    throw error;
  });
  return searchDataPromise;
};

export function useSearchData() {
  const [searchData, setSearchData] = useState<SearchResult[]>([]);

  useEffect(() => {
    let isActive = true;

    void loadSearchData().then(
      (data) => isActive && setSearchData(data),
      (error) => console.error(error),
    );

    return () => {
      isActive = false;
    };
  }, []);

  return searchData;
}
