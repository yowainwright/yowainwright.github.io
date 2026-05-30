"use client";

import { useCallback } from "react";
import CopyButton from "../components/CopyButton";
import {
  COPY_BUTTON_PLACEHOLDER_SELECTOR,
  SHIKI_CODE_SELECTOR,
  SHIKI_WRAPPER_SELECTOR,
} from "./constants";
import { usePlaceholderEnhancements } from "./usePlaceholderEnhancements";

export function useCodeBlocks(
  contentKey: string,
  contentElement: HTMLElement | null,
) {
  const renderCopyButton = useCallback((element: HTMLElement) => {
    const codeElement = element
      .closest(SHIKI_WRAPPER_SELECTOR)
      ?.querySelector(SHIKI_CODE_SELECTOR);

    if (!codeElement) return null;
    return <CopyButton container={element} />;
  }, []);

  return usePlaceholderEnhancements({
    contentElement,
    contentKey,
    render: renderCopyButton,
    selector: COPY_BUTTON_PLACEHOLDER_SELECTOR,
  });
}
