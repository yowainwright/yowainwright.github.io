import { forwardRef } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange }, ref) => {
    return (
      <div className="search-input-wrapper">
        <Search size={20} className="search-input-icon" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search posts and projects..."
          className="search-input"
        />
        <kbd className="search-esc">ESC</kbd>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
