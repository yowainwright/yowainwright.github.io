export interface SearchResult {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  type: "page" | "post" | "project";
  url: string;
}

export type SearchContentData = Record<string, string>;

export interface SearchState {
  query: string;
  results: SearchResult[];
  selectedIndex: number;
}
