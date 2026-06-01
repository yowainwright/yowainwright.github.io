"use client";

import React from "react";
import { Maximize2 } from "lucide-react";
import type { MermaidChartProps } from "./types";

export const MermaidChart: React.FC<MermaidChartProps> = ({
  children,
  onClick,
  className = "",
}: MermaidChartProps) => {
  return (
    <div
      className={`mermaid-chart ${className}`}
      onClick={onClick as React.MouseEventHandler}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if ((e.key === "Enter" || e.key === " ") && onClick) {
          e.preventDefault();
          onClick(
            e as React.MouseEvent<HTMLDivElement> &
              React.KeyboardEvent<HTMLDivElement>,
          );
        }
      }}
      aria-label="Click to expand diagram"
    >
      <div className="mermaid-chart-expand-hint">
        <Maximize2 size={16} />
      </div>
      <div className="mermaid-chart-content">{children}</div>
    </div>
  );
};
