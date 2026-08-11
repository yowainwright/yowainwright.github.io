import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SearchTrigger } from "./SearchTrigger";

const SearchDialog = dynamic(() => import("./SearchDialog"), { ssr: false });

const isSearchShortcut = (event: KeyboardEvent) =>
  (event.metaKey || event.ctrlKey) && event.key === "k";

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isSearchShortcut(event)) return;

      event.preventDefault();
      open();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <SearchTrigger onClick={open} />
      {isOpen && <SearchDialog onClose={close} />}
    </>
  );
}

export default Search;
