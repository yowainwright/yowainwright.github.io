import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Fuse from "fuse.js";
import type { SearchResult, SearchState } from "./types";
import { FUSE_OPTIONS, MAX_RESULTS, SEARCH_DATA_PATH } from "./constants";

const createInitialState = (): SearchState => ({
  isOpen: false,
  query: "",
  results: [],
  selectedIndex: 0,
  searchData: [],
});

const clampIndex = (index: number, max: number): number =>
  Math.max(0, Math.min(index, max));

const searchItems = (
  fuse: Fuse<SearchResult>,
  query: string
): SearchResult[] => {
  const searchResults = fuse.search(query);
  return searchResults.slice(0, MAX_RESULTS).map((r) => r.item);
};

const isOpenShortcut = (e: KeyboardEvent): boolean =>
  (e.metaKey || e.ctrlKey) && e.key === "k";

const isEscapeKey = (e: KeyboardEvent): boolean => e.key === "Escape";
const isArrowDown = (e: KeyboardEvent): boolean => e.key === "ArrowDown";
const isArrowUp = (e: KeyboardEvent): boolean => e.key === "ArrowUp";
const isEnterKey = (e: KeyboardEvent): boolean => e.key === "Enter";

export function useSearch() {
  const [state, setState] = useState<SearchState>(createInitialState);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () => new Fuse(state.searchData, FUSE_OPTIONS),
    [state.searchData]
  );

  const hasQuery = state.query.length > 0;
  const hasResults = state.results.length > 0;
  const canNavigateResults = state.isOpen && hasResults;

  useEffect(() => {
    fetch(SEARCH_DATA_PATH)
      .then((res) => res.json())
      .then((data: SearchResult[]) =>
        setState((prev) => ({ ...prev, searchData: data }))
      )
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!hasQuery) {
      setState((prev) => ({ ...prev, results: [], selectedIndex: 0 }));
      return;
    }

    const results = searchItems(fuse, state.query);
    setState((prev) => ({ ...prev, results, selectedIndex: 0 }));
  }, [state.query, fuse, hasQuery]);

  const open = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: true }));
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false, query: "" }));
  }, []);

  const setQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, query }));
  }, []);

  const selectNext = useCallback(() => {
    setState((prev) => {
      const maxIndex = prev.results.length - 1;
      const nextIndex = clampIndex(prev.selectedIndex + 1, maxIndex);
      return { ...prev, selectedIndex: nextIndex };
    });
  }, []);

  const selectPrev = useCallback(() => {
    setState((prev) => {
      const prevIndex = clampIndex(prev.selectedIndex - 1, prev.results.length - 1);
      return { ...prev, selectedIndex: prevIndex };
    });
  }, []);

  const getSelectedResult = useCallback(
    (): SearchResult | null => state.results[state.selectedIndex] ?? null,
    [state.results, state.selectedIndex]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const shouldOpen = isOpenShortcut(e);
      if (shouldOpen) {
        e.preventDefault();
        open();
        return;
      }

      const shouldClose = isEscapeKey(e);
      if (shouldClose) {
        close();
        return;
      }

      if (!canNavigateResults) return;

      const shouldSelectNext = isArrowDown(e);
      if (shouldSelectNext) {
        e.preventDefault();
        selectNext();
        return;
      }

      const shouldSelectPrev = isArrowUp(e);
      if (shouldSelectPrev) {
        e.preventDefault();
        selectPrev();
        return;
      }

      const shouldNavigate = isEnterKey(e);
      if (shouldNavigate) {
        const selected = getSelectedResult();
        if (selected) {
          window.location.href = selected.url;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [canNavigateResults, open, close, selectNext, selectPrev, getSelectedResult]);

  useEffect(() => {
    if (!state.isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const clickedOutside =
        modalRef.current && !modalRef.current.contains(e.target as Node);
      if (clickedOutside) close();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [state.isOpen, close]);

  return {
    state,
    inputRef,
    modalRef,
    open,
    close,
    setQuery,
  };
}
