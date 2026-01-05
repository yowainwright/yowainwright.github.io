'use client';

import React from 'react';
import type { PixelGrid } from './constants';
import {
  LINK_GRID,
  COMMENT_GRID,
  HEART_GRID,
  HEART_OUTLINE_GRID,
} from './constants';

export type IconName = 'link' | 'comment' | 'heart' | 'heart-outline';

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
  'heart-outline': HEART_OUTLINE_GRID,
};

export const PixelIcon = ({
  name,
  grid: customGrid,
  size = 2,
  color = 'currentColor',
  className = '',
}: PixelIconProps) => {
  const grid = customGrid ?? (name ? GRIDS[name] : LINK_GRID);
  const rows = grid.length;
  const cols = grid[0].length;
  const width = cols * size;
  const height = rows * size;

  const rects: React.ReactNode[] = [];
  grid.forEach((row, y) => {
    row.forEach((pixel, x) => {
      if (pixel) {
        rects.push(
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={1}
            height={1}
            fill={color}
          />
        );
      }
    });
  });

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
