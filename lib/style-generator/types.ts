export type CSSProperties = Record<string, string>;

export interface BEMBlock {
  base?: CSSProperties;
  elements?: Record<string, CSSProperties>;
  modifiers?: Record<string, CSSProperties>;
}