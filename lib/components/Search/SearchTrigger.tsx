import { Search } from "lucide-react";

interface SearchTriggerProps {
  onClick: () => void;
}

export function SearchTrigger({ onClick }: SearchTriggerProps) {
  return (
    <button onClick={onClick} className="search-trigger" aria-label="Search (⌘K)">
      <Search className="search-trigger__icon" />
    </button>
  );
}
