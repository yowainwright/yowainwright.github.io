import { useEffect, useState } from "react";
import { SEARCH_CONTENT_PATH, SEARCH_DATA_PATH } from "../components/Search/constants";
import type { SearchContentData, SearchResult } from "../components/Search/types";

const SEARCH_RESULT_TYPES = new Set(["page", "post", "project"]);
let searchDataPromise: Promise<SearchResult[]> | null = null;
let searchContentPromise: Promise<SearchContentData> | null = null;

const isSearchResult = (value: unknown): value is SearchResult => {
  const isObject = Boolean(value) && typeof value === "object";
  if (!isObject) return false;

  const result = value as Record<string, unknown>;
  const hasValidType = typeof result.type === "string" && SEARCH_RESULT_TYPES.has(result.type);
  const stringFields = ["title", "description", "slug", "url"];
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

const parseSearchContent = (value: unknown): SearchContentData => {
  const isObject = Boolean(value) && typeof value === "object" && !Array.isArray(value);
  if (!isObject) throw new Error("Search content is invalid");

  const content = value as Record<string, unknown>;
  const hasValidValues = Object.values(content).every((item) => typeof item === "string");
  if (!hasValidValues) throw new Error("Search content is invalid");
  return content as SearchContentData;
};

const fetchSearchJson = async <T>(path: string, parse: (value: unknown) => T): Promise<T> => {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Search data returned ${response.status}`);

  const data: unknown = await response.json();
  return parse(data);
};

const loadSearchData = () => {
  if (searchDataPromise) return searchDataPromise;

  searchDataPromise = fetchSearchJson(SEARCH_DATA_PATH, parseSearchData).catch((error) => {
    searchDataPromise = null;
    throw error;
  });
  return searchDataPromise;
};

const loadSearchContent = () => {
  if (searchContentPromise) return searchContentPromise;

  searchContentPromise = fetchSearchJson(SEARCH_CONTENT_PATH, parseSearchContent).catch((error) => {
    searchContentPromise = null;
    throw error;
  });
  return searchContentPromise;
};

const useLoadedData = <T>(shouldLoad: boolean, loadData: () => Promise<T>, initialData: T): T => {
  const [data, setData] = useState<T>(initialData);

  useEffect(() => {
    if (!shouldLoad) return;

    let isActive = true;

    void loadData().then(
      (loadedData) => isActive && setData(loadedData),
      (error) => console.error(error),
    );

    return () => {
      isActive = false;
    };
  }, [loadData, shouldLoad]);

  return data;
};

export function useSearchData(shouldLoadContent: boolean) {
  const searchData = useLoadedData(true, loadSearchData, [] as SearchResult[]);
  const searchContent = useLoadedData(
    shouldLoadContent,
    loadSearchContent,
    {} as SearchContentData,
  );
  return { searchData, searchContent };
}
