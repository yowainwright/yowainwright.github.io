import { Clock, Code } from "lucide-react";
import type { SearchResult } from "./types";
import { RECENT_ITEMS_COUNT } from "./constants";

interface SearchSuggestionsProps {
  searchData: SearchResult[];
  onSelect: () => void;
}

interface SuggestionSectionProps {
  label: string;
  items: SearchResult[];
  icon: typeof Clock;
  onSelect: () => void;
}

function SuggestionSection({
  label,
  items,
  icon: Icon,
  onSelect,
}: SuggestionSectionProps) {
  const hasItems = items.length > 0;
  if (!hasItems) return null;

  return (
    <div className="search-suggestions__section">
      <div className="search-suggestions__label">{label}</div>
      {items.map((item) => (
        <a
          key={item.slug}
          href={item.url}
          className="search-suggestion"
          onClick={onSelect}
        >
          <Icon size={16} />
          <span>{item.title}</span>
        </a>
      ))}
    </div>
  );
}

export function SearchSuggestions({
  searchData,
  onSelect,
}: SearchSuggestionsProps) {
  const recentPosts = searchData
    .filter((item) => item.type === "post")
    .slice(0, RECENT_ITEMS_COUNT);

  const recentProjects = searchData
    .filter((item) => item.type === "project")
    .slice(0, RECENT_ITEMS_COUNT);

  return (
    <div className="search-suggestions">
      <div className="search-suggestions__hint">Start typing to search</div>
      <SuggestionSection
        label="Recent Posts"
        items={recentPosts}
        icon={Clock}
        onSelect={onSelect}
      />
      <SuggestionSection
        label="Projects"
        items={recentProjects}
        icon={Code}
        onSelect={onSelect}
      />
    </div>
  );
}
