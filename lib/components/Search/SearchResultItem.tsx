import { BookOpen, Code, FileText } from "lucide-react";
import type { SearchResult } from "./types";

interface SearchResultItemProps {
  result: SearchResult;
  isSelected: boolean;
  onSelect: () => void;
}

const ICONS = {
  page: FileText,
  post: BookOpen,
  project: Code,
} as const;

const SearchResultDescription = ({ description }: { description: string }) => {
  if (!description) return null;
  return <div className="search-result__description">{description}</div>;
};

const getSelectedClass = (isSelected: boolean) => {
  if (!isSelected) return "";
  return "search-result--selected";
};

export function SearchResultItem({ result, isSelected, onSelect }: SearchResultItemProps) {
  const Icon = ICONS[result.type];
  const selectedClass = getSelectedClass(isSelected);

  return (
    <a href={result.url} className={`search-result ${selectedClass}`} onClick={onSelect}>
      <div className="search-result__icon">
        <Icon size={20} />
      </div>
      <div className="search-result__content">
        <div className="search-result__title">{result.title}</div>
        <SearchResultDescription description={result.description} />
      </div>
      <span className="search-result__type">{result.type}</span>
    </a>
  );
}
