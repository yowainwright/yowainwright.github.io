import { forwardRef } from "react";
import type { ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { BookOpen, Clock, Code, FileText, Search as SearchIcon } from "lucide-react";
import { RECENT_ITEMS_COUNT } from "./constants";
import type {
  SearchDialogProps,
  SearchInputProps,
  SearchModalProps,
  SearchResultContentProps,
  SearchResultItemProps,
  SearchResultsProps,
  SearchSuggestionProps,
  SearchSuggestionsProps,
  SearchTriggerProps,
  SuggestionSectionProps,
} from "./types";
import { getRecentItems, getSelectedClass } from "./utils";
import { useSearch, useSearchDialog } from "./useSearch";

const RESULT_ICONS = {
  page: FileText,
  post: BookOpen,
  project: Code,
} as const;

export function SearchTrigger({ onClick }: SearchTriggerProps) {
  return (
    <button onClick={onClick} className="search-trigger" aria-label="Search (⌘K)">
      <SearchIcon className="search-trigger__icon" />
    </button>
  );
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
  const { value, onChange } = props;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value);

  return (
    <div className="search-input-wrapper">
      <SearchIcon size={20} className="search-input-icon" />
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search posts and projects..."
        className="search-input"
      />
      <kbd className="search-esc">ESC</kbd>
    </div>
  );
});

SearchInput.displayName = "SearchInput";

const getResultDescription = (description: string) => {
  if (!description) return null;
  return <div className="search-result__description">{description}</div>;
};

export function SearchResultItem({ result, isSelected, onSelect }: SearchResultItemProps) {
  const Icon = RESULT_ICONS[result.type];
  const selectedClass = getSelectedClass(isSelected);
  const className = `search-result ${selectedClass}`;
  const description = getResultDescription(result.description);

  return (
    <a href={result.url} className={className} onClick={onSelect}>
      <div className="search-result__icon">
        <Icon size={20} />
      </div>
      <div className="search-result__content">
        <div className="search-result__title">{result.title}</div>
        {description}
      </div>
      <span className="search-result__type">{result.type}</span>
    </a>
  );
}

export function SearchResults({ results, selectedIndex, onSelect }: SearchResultsProps) {
  const resultItems = results.map((result, index) => {
    const isSelected = selectedIndex === index;
    return (
      <SearchResultItem
        key={result.slug}
        result={result}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    );
  });

  return <div className="search-results-list">{resultItems}</div>;
}

const SearchSuggestion = ({ item, icon: Icon, onSelect }: SearchSuggestionProps) => (
  <a href={item.url} className="search-suggestion" onClick={onSelect}>
    <Icon size={16} />
    <span>{item.title}</span>
  </a>
);

const SuggestionSection = ({ label, items, icon, onSelect }: SuggestionSectionProps) => {
  if (items.length === 0) return null;

  const suggestions = items.map((item) => (
    <SearchSuggestion key={item.slug} item={item} icon={icon} onSelect={onSelect} />
  ));

  return (
    <div className="search-suggestions__section">
      <div className="search-suggestions__label">{label}</div>
      {suggestions}
    </div>
  );
};

export function SearchSuggestions({ searchData, onSelect }: SearchSuggestionsProps) {
  const posts = getRecentItems(searchData, "post", RECENT_ITEMS_COUNT);
  const projects = getRecentItems(searchData, "project", RECENT_ITEMS_COUNT);

  return (
    <div className="search-suggestions">
      <div className="search-suggestions__hint">Start typing to search</div>
      <SuggestionSection label="Recent Posts" items={posts} icon={Clock} onSelect={onSelect} />
      <SuggestionSection label="Projects" items={projects} icon={Code} onSelect={onSelect} />
    </div>
  );
}

export function SearchEmpty() {
  return (
    <div className="search-empty">
      <div className="search-empty__title">No results found</div>
      <div className="search-empty__subtitle">Try searching for something else</div>
    </div>
  );
}

const SearchResultContent = (props: SearchResultContentProps) => {
  const { query, results, searchData, selectedIndex, onClose } = props;
  if (!query) return <SearchSuggestions searchData={searchData} onSelect={onClose} />;
  if (results.length === 0) return <SearchEmpty />;
  return <SearchResults results={results} selectedIndex={selectedIndex} onSelect={onClose} />;
};

export const SearchModal = forwardRef<HTMLDivElement, SearchModalProps>((props, ref) => {
  const { query, results, searchData, selectedIndex, inputRef, onQueryChange, onClose } = props;
  const contentProps = { query, results, searchData, selectedIndex, onClose };
  const resultContent = <SearchResultContent {...contentProps} />;

  return (
    <div ref={ref} className="search-modal">
      <SearchInput ref={inputRef} value={query} onChange={onQueryChange} />
      <div className="search-results">{resultContent}</div>
    </div>
  );
});

SearchModal.displayName = "SearchModal";

const SearchDialog = ({ onClose }: SearchDialogProps) => {
  const { state, searchData, inputRef, modalRef, close, setQuery } = useSearch(onClose);
  const modal = (
    <SearchModal
      ref={modalRef}
      query={state.query}
      results={state.results}
      searchData={searchData}
      selectedIndex={state.selectedIndex}
      inputRef={inputRef}
      onQueryChange={setQuery}
      onClose={close}
    />
  );

  return createPortal(
    <>
      <div className="search-backdrop" onClick={close} />
      <div className="search-modal-container">{modal}</div>
    </>,
    document.body,
  );
};

export function Search() {
  const { isOpen, open, close } = useSearchDialog();
  const dialog = isOpen ? <SearchDialog onClose={close} /> : null;

  return (
    <>
      <SearchTrigger onClick={open} />
      {dialog}
    </>
  );
}

export default Search;
