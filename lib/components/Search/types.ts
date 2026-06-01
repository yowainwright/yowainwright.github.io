import type { SearchResultData } from "../../client/data/search";

export type SearchResult = SearchResultData;

export interface SearchState {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  selectedIndex: number;
  searchData: SearchResult[];
}
