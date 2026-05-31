import type React from "react";

export type PlaceholderRenderer = (element: HTMLElement, index: number) => React.ReactNode | null;

export type PlaceholderEnhancementOptions = {
  contentElement: HTMLElement | null;
  contentKey: string;
  render: PlaceholderRenderer;
  selector: string;
};

export type PlaceholderTarget = {
  element: HTMLElement;
  index: number;
};
