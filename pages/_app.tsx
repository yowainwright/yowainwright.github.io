import React, { createContext, useEffect, useReducer } from "react";
import type { AppProps } from "next/app";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../styles/main.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  usePageViews,
  useExternalLinks,
  useCodeBlockCopy,
} from "../hooks/useAnalytics";

interface AppState {
  isDarkMode: boolean;
  isLoaded: boolean;
}

type AppAction =
  | { type: "SET_IS_DARKMODE"; payload: boolean }
  | { type: "SET_IS_LOADED"; payload: boolean };

export const GlobalState = createContext<AppState | null>(null);
export const DispatchStore = createContext<React.Dispatch<AppAction> | null>(
  null,
);

export function isLoadingDarkmode(): boolean {
  if (typeof window === "undefined") return false;

  const storedPreference = localStorage.getItem("darkMode");
  if (storedPreference !== null) {
    return storedPreference === "true";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export const initialState: AppState = {
  isDarkMode: false,
  isLoaded: false,
};

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_IS_DARKMODE":
      return { ...state, isDarkMode: action.payload };
    case "SET_IS_LOADED":
      return { ...state, isLoaded: action.payload };
    default:
      return state;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  usePageViews();
  useExternalLinks();
  useCodeBlockCopy();

  useEffect(() => {
    if (state.isLoaded) return;
    dispatch({ type: "SET_IS_LOADED", payload: true });
    dispatch({ type: "SET_IS_DARKMODE", payload: isLoadingDarkmode() });
  }, [state.isLoaded]);

  useEffect(() => {
    const body = document.querySelector("body");

    if (state.isDarkMode) {
      body?.classList.add("js-is-darkmode");
    } else {
      body?.classList.remove("js-is-darkmode");
    }

    if (state.isLoaded) {
      localStorage.setItem("darkMode", String(state.isDarkMode));
    }
  }, [state.isDarkMode, state.isLoaded]);

  return (
    <DispatchStore.Provider value={dispatch}>
      <GlobalState.Provider value={state}>
        <Header />
        <Component {...pageProps} />
        <Footer />
        <GoogleAnalytics gaId="G-5BH1F8XBX5" />
      </GlobalState.Provider>
    </DispatchStore.Provider>
  );
}
