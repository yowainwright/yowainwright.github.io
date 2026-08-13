import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Fuse from "fuse.js";
import { useSearchData } from "../../hooks/useSearchData";
import type { SearchResult, SearchState } from "./types";
import { FUSE_OPTIONS } from "./constants";
import { searchItems } from "./searchItems";

const createInitialState = (): SearchState => ({
  query: "",
  results: [],
  selectedIndex: 0,
});

const clampIndex = (index: number, max: number): number => Math.max(0, Math.min(index, max));

const updateSearchState = (state: SearchState, updates: Partial<SearchState>): SearchState =>
  Object.assign({}, state, updates);

const isEscapeKey = (e: KeyboardEvent): boolean => e.key === "Escape";
const isArrowDown = (e: KeyboardEvent): boolean => e.key === "ArrowDown";
const isArrowUp = (e: KeyboardEvent): boolean => e.key === "ArrowUp";
const isEnterKey = (e: KeyboardEvent): boolean => e.key === "Enter";

export function useSearch(onClose: () => void) {
  const [state, setState] = useState<SearchState>(createInitialState);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const hasQuery = state.query.trim().length > 0;
  const { searchData, searchContent } = useSearchData(hasQuery);

  const fuse = useMemo(() => new Fuse(searchData, FUSE_OPTIONS), [searchData]);

  const hasResults = state.results.length > 0;
  const canNavigateResults = hasResults;

  useEffect(() => {
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 100);
    return () => window.clearTimeout(focusTimer);
  }, []);

  useEffect(() => {
    if (!hasQuery) {
      setState((prev) => updateSearchState(prev, { results: [], selectedIndex: 0 }));
      return;
    }

    const results = searchItems(fuse, searchData, searchContent, state.query);
    setState((prev) => updateSearchState(prev, { results, selectedIndex: 0 }));
  }, [state.query, fuse, hasQuery, searchData, searchContent]);

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  const setQuery = useCallback((query: string) => {
    setState((prev) => updateSearchState(prev, { query }));
  }, []);

  const selectNext = useCallback(() => {
    setState((prev) => {
      const maxIndex = prev.results.length - 1;
      const nextIndex = clampIndex(prev.selectedIndex + 1, maxIndex);
      return updateSearchState(prev, { selectedIndex: nextIndex });
    });
  }, []);

  const selectPrev = useCallback(() => {
    setState((prev) => {
      const prevIndex = clampIndex(prev.selectedIndex - 1, prev.results.length - 1);
      return updateSearchState(prev, { selectedIndex: prevIndex });
    });
  }, []);

  const getSelectedResult = useCallback(
    (): SearchResult | null => state.results[state.selectedIndex] ?? null,
    [state.results, state.selectedIndex],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [canNavigateResults, close, selectNext, selectPrev, getSelectedResult]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const clickedOutside = modalRef.current && !modalRef.current.contains(e.target as Node);
      if (clickedOutside) close();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [close]);

  return {
    state,
    searchData,
    inputRef,
    modalRef,
    close,
    setQuery,
  };
}
