import { createPortal } from "react-dom";
import { SearchModal } from "./SearchModal";
import { useSearch } from "./useSearch";

interface SearchDialogProps {
  onClose: () => void;
}

export default function SearchDialog({ onClose }: SearchDialogProps) {
  const { state, searchData, inputRef, modalRef, close, setQuery } = useSearch(onClose);

  return createPortal(
    <>
      <div className="search-backdrop" onClick={close} />
      <div className="search-modal-container">
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
      </div>
    </>,
    document.body,
  );
}
