export interface SearchResult {
  title: string;
  description: string;
  slug: string;
  type: "post" | "project";
  url: string;
}

export interface SearchState {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  selectedIndex: number;
  searchData: SearchResult[];
}
