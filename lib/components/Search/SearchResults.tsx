import type { SearchResult } from "./types";
import { SearchResultItem } from "./SearchResultItem";

interface SearchResultsProps {
  results: SearchResult[];
  selectedIndex: number;
  onSelect: () => void;
}

export function SearchResults({
  results,
  selectedIndex,
  onSelect,
}: SearchResultsProps) {
  return (
    <div className="search-results-list">
      {results.map((result, index) => (
        <SearchResultItem
          key={result.slug}
          result={result}
          isSelected={selectedIndex === index}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
