import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { useSearchData } from "../../hooks/useSearchData";
import { FUSE_OPTIONS, SEARCH_FOCUS_DELAY_MS } from "./constants";
import type {
  ResultNavigation,
  SearchKeyboardActions,
  SearchResult,
  SearchState,
  SearchStateSetter,
} from "./types";
import {
  clampIndex,
  createInitialState,
  handleSearchKeyDown,
  isSearchShortcut,
  searchItems,
  updateSearchState,
} from "./utils";

const useOpenShortcut = (open: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isSearchShortcut(event)) return;
      event.preventDefault();
      open();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);
};

export function useSearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useOpenShortcut(open);

  return { isOpen, open, close };
}

const useSearchResults = (state: SearchState, setState: SearchStateSetter) => {
  const hasQuery = state.query.trim().length > 0;
  const { searchData, searchContent } = useSearchData(hasQuery);
  const fuse = useMemo(() => new Fuse(searchData, FUSE_OPTIONS), [searchData]);

  useEffect(() => {
    const results = hasQuery ? searchItems(fuse, searchData, searchContent, state.query) : [];
    setState((current) => updateSearchState(current, { results, selectedIndex: 0 }));
  }, [state.query, fuse, hasQuery, searchData, searchContent, setState]);

  return searchData;
};

const useSearchFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), SEARCH_FOCUS_DELAY_MS);
    return () => window.clearTimeout(focusTimer);
  }, []);

  return inputRef;
};

const useSelectNext = (setState: SearchStateSetter) =>
  useCallback(() => {
    setState((current) => {
      const maxIndex = current.results.length - 1;
      const nextIndex = clampIndex(current.selectedIndex + 1, maxIndex);
      return updateSearchState(current, { selectedIndex: nextIndex });
    });
  }, [setState]);

const useSelectPrev = (setState: SearchStateSetter) =>
  useCallback(() => {
    setState((current) => {
      const previousIndex = clampIndex(current.selectedIndex - 1, current.results.length - 1);
      return updateSearchState(current, { selectedIndex: previousIndex });
    });
  }, [setState]);

const useSelectedResult = (state: SearchState) =>
  useCallback(
    (): SearchResult | null => state.results[state.selectedIndex] ?? null,
    [state.results, state.selectedIndex],
  );

const useResultNavigation = (state: SearchState, setState: SearchStateSetter): ResultNavigation => {
  const selectNext = useSelectNext(setState);
  const selectPrev = useSelectPrev(setState);
  const getSelectedResult = useSelectedResult(state);
  return useMemo(
    () => ({ selectNext, selectPrev, getSelectedResult }),
    [selectNext, selectPrev, getSelectedResult],
  );
};

const useKeyboardActions = (
  canNavigateResults: boolean,
  close: () => void,
  navigation: ResultNavigation,
): SearchKeyboardActions => {
  const navigate = useCallback((url: string) => {
    window.location.href = url;
  }, []);

  return useMemo(() => {
    const actions = { canNavigateResults, close, navigate };
    return Object.assign({}, actions, navigation);
  }, [canNavigateResults, close, navigate, navigation]);
};

const useSearchKeyboard = (actions: SearchKeyboardActions) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => handleSearchKeyDown(event, actions);
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [actions]);
};

const useClickOutside = (modalRef: React.RefObject<HTMLDivElement | null>, close: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = modalRef.current && !modalRef.current.contains(event.target as Node);
      if (clickedOutside) close();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [close, modalRef]);
};

export function useSearch(close: () => void) {
  const [state, setState] = useState<SearchState>(createInitialState);
  const inputRef = useSearchFocus();
  const modalRef = useRef<HTMLDivElement>(null);
  const searchData = useSearchResults(state, setState);
  const navigation = useResultNavigation(state, setState);
  const keyboardActions = useKeyboardActions(state.results.length > 0, close, navigation);

  useSearchKeyboard(keyboardActions);
  useClickOutside(modalRef, close);

  const setQuery = useCallback((query: string) => {
    setState((current) => updateSearchState(current, { query }));
  }, []);

  return { state, searchData, inputRef, modalRef, close, setQuery };
}
