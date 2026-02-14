import { BookOpen, Code } from "lucide-react";
import type { SearchResult } from "./types";

interface SearchResultItemProps {
  result: SearchResult;
  isSelected: boolean;
  onSelect: () => void;
}

const ICONS = {
  post: BookOpen,
  project: Code,
} as const;

export function SearchResultItem({
  result,
  isSelected,
  onSelect,
}: SearchResultItemProps) {
  const Icon = ICONS[result.type];
  const selectedClass = isSelected ? "search-result--selected" : "";

  return (
    <a
      href={result.url}
      className={`search-result ${selectedClass}`}
      onClick={onSelect}
    >
      <div className="search-result__icon">
        <Icon size={20} />
      </div>
      <div className="search-result__content">
        <div className="search-result__title">{result.title}</div>
        {result.description && (
          <div className="search-result__description">{result.description}</div>
        )}
      </div>
      <span className="search-result__type">{result.type}</span>
    </a>
  );
}
