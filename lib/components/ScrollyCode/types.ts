import type { ReactElement, ReactNode } from "react";

export type StepProps = {
  "data-title": string;
  "data-note": string;
  "data-lines"?: number[];
  "data-anchor"?: string;
  children: ReactNode;
};

export type FieldStep = { title: string; note: string; lines: number[]; anchor?: string };

export type ScrollyCodeProps = { children: ReactNode; title?: string; steps?: FieldStep[] | string };

export type ScrollyCodeViewProps = {
  title?: string;
  frames: ReactElement<StepProps>[];
  activeIndex: number;
  panelId: string;
  onSelect: (index: number) => void;
  sharedCode: boolean;
};

export type StepButtonProps = {
  title: string;
  index: number;
  activeIndex: number;
  panelId: string;
  onSelect: (index: number) => void;
};
