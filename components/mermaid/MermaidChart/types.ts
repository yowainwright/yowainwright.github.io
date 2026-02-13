import React from "react";
export type MermaidChartProps = {
  children: React.ReactElement;
  onClick:
    | React.MouseEventHandler<HTMLDivElement>
    | React.KeyboardEventHandler<HTMLDivElement>;
  className?: string;
};
