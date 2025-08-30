import React, { createContext, useEffect, useReducer } from "react";
import type { AppProps } from "next/app";
import "../styles/main.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const GlobalState = createContext<any>(null);
export const DispatchStore = createContext<any>(null);

export function isLoadingDarkmode() {
  if (typeof window === "undefined") return false;
  
  const storedPreference = localStorage.getItem("darkMode");
  if (storedPreference !== null) {
    return storedPreference === "true";
  }
  
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? true
    : false;
}

export const initialState = {
  isDarkMode: false,
  isLoaded: false,
};

export function reducer(state: any, { payload, type }: any) {
  switch (type) {
    case "SET_IS_DARKMODE":
      return { ...state, isDarkMode: payload };
    case "SET_IS_LOADED":
      return { ...state, isLoaded: payload };
    default:
      return state;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
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
  }, [state]);

  return (
    <DispatchStore.Provider value={dispatch}>
      <GlobalState.Provider value={state}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </GlobalState.Provider>
    </DispatchStore.Provider>
  );
}
