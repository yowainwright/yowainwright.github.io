import { forwardRef } from "react";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";
import { SearchSuggestions } from "./SearchSuggestions";
import { SearchEmpty } from "./SearchEmpty";
import type { SearchResult } from "./types";

interface SearchModalProps {
  query: string;
  results: SearchResult[];
  searchData: SearchResult[];
  selectedIndex: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onQueryChange: (value: string) => void;
  onClose: () => void;
}

export const SearchModal = forwardRef<HTMLDivElement, SearchModalProps>(
  (
    {
      query,
      results,
      searchData,
      selectedIndex,
      inputRef,
      onQueryChange,
      onClose,
    },
    ref
  ) => {
    const hasQuery = query.length > 0;
    const hasResults = results.length > 0;
    const showEmpty = hasQuery && !hasResults;
    const showResults = hasResults;
    const showSuggestions = !hasQuery;

    return (
      <div ref={ref} className="search-modal">
        <SearchInput ref={inputRef} value={query} onChange={onQueryChange} />
        <div className="search-results">
          {showEmpty && <SearchEmpty />}
          {showResults && (
            <SearchResults
              results={results}
              selectedIndex={selectedIndex}
              onSelect={onClose}
            />
          )}
          {showSuggestions && (
            <SearchSuggestions searchData={searchData} onSelect={onClose} />
          )}
        </div>
      </div>
    );
  }
);

SearchModal.displayName = "SearchModal";
