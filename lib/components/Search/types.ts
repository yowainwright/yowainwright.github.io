export interface SearchResult {
  content: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  type: "page" | "post" | "project";
  url: string;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  selectedIndex: number;
}
