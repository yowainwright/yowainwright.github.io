"use client";

import React from "react";
import type { PixelGrid } from "./constants";
import { LINK_GRID, COMMENT_GRID, HEART_GRID, HEART_OUTLINE_GRID } from "./constants";

export type IconName = "link" | "comment" | "heart" | "heart-outline";

interface PixelIconProps {
  name?: IconName;
  grid?: PixelGrid;
  size?: number;
  color?: string;
  className?: string;
}

const GRIDS: Record<IconName, PixelGrid> = {
  link: LINK_GRID,
  comment: COMMENT_GRID,
  heart: HEART_GRID,
  "heart-outline": HEART_OUTLINE_GRID,
};

const isRectElement = (
  rect: React.ReactElement<SVGElement> | null,
): rect is React.ReactElement<SVGElement> => rect !== null;

const getPixelRect = (pixel: number, x: number, y: number, color: string) => {
  if (!pixel) return null;

  return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />;
};

const getRowRects = (row: number[], y: number, color: string) =>
  row.map((pixel, x) => getPixelRect(pixel, x, y, color)).filter(isRectElement);

const appendRowRects = (
  rects: React.ReactElement<SVGElement>[],
  rowRects: React.ReactElement<SVGElement>[],
) => rects.concat(rowRects);

const getGridRects = (grid: PixelGrid, color: string) =>
  grid
    .map((row, y) => getRowRects(row, y, color))
    .reduce<React.ReactElement<SVGElement>[]>(appendRowRects, []);

export const PixelIcon = ({
  name,
  grid: customGrid,
  size = 2,
  color = "currentColor",
  className = "",
}: PixelIconProps) => {
  const grid = customGrid ?? (name ? GRIDS[name] : LINK_GRID);
  const rows = grid.length;
  const cols = grid[0].length;
  const width = cols * size;
  const height = rows * size;
  const rects = getGridRects(grid, color);

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${cols} ${rows}`}
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {rects}
    </svg>
  );
};

export { LINK_GRID, COMMENT_GRID, HEART_GRID, HEART_OUTLINE_GRID };
export type { PixelGrid };
