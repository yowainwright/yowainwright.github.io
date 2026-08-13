import type { Dispatch, RefObject, SetStateAction } from "react";
import type { LucideIcon } from "lucide-react";

export interface SearchResult {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  type: "page" | "post" | "project";
  url: string;
}

export type SearchContentData = Record<string, string>;

export interface SearchShortcutEvent {
  ctrlKey: boolean;
  key: string;
  metaKey: boolean;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  selectedIndex: number;
}

export type SearchStateSetter = Dispatch<SetStateAction<SearchState>>;

export interface ResultNavigation {
  getSelectedResult: () => SearchResult | null;
  selectNext: () => void;
  selectPrev: () => void;
}

export interface SearchDialogProps {
  onClose: () => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface SearchModalProps {
  query: string;
  results: SearchResult[];
  searchData: SearchResult[];
  selectedIndex: number;
  inputRef: RefObject<HTMLInputElement | null>;
  onQueryChange: (value: string) => void;
  onClose: () => void;
}

export interface SearchResultItemProps {
  result: SearchResult;
  isSelected: boolean;
  onSelect: () => void;
}

export interface SearchResultContentProps {
  query: string;
  results: SearchResult[];
  searchData: SearchResult[];
  selectedIndex: number;
  onClose: () => void;
}

export interface SearchResultsProps {
  results: SearchResult[];
  selectedIndex: number;
  onSelect: () => void;
}

export interface SearchSuggestionsProps {
  searchData: SearchResult[];
  onSelect: () => void;
}

export interface SearchSuggestionProps {
  item: SearchResult;
  icon: LucideIcon;
  onSelect: () => void;
}

export interface SuggestionSectionProps {
  label: string;
  items: SearchResult[];
  icon: LucideIcon;
  onSelect: () => void;
}

export interface SearchTriggerProps {
  onClick: () => void;
}

export interface SearchKeyboardActions {
  canNavigateResults: boolean;
  close: () => void;
  getSelectedResult: () => SearchResult | null;
  navigate: (url: string) => void;
  selectNext: () => void;
  selectPrev: () => void;
}
