'use client';

import React from 'react';
import { LINK_GRID, GRID_COLUMNS, GRID_ROWS } from './constants';

interface PixelLinkProps {
  size?: number;
  color?: string;
  className?: string;
}

export const PixelLink = ({
  size = 2,
  color = 'currentColor',
  className = '',
}: PixelLinkProps) => {
  return (
    <div
      className={`pixel-icon ${className}`}
      style={{
        '--pixel-size': `${size}px`,
        '--icon-color': color,
        '--grid-columns': GRID_COLUMNS,
        '--grid-rows': GRID_ROWS,
      } as React.CSSProperties}
      aria-hidden="true"
    >
      {LINK_GRID.map((row, y) =>
        row.map((pixel, x) => (
          <span
            key={`${x}-${y}`}
            className={`pixel-icon__pixel ${pixel ? 'pixel-icon__pixel--on' : ''}`}
          />
        ))
      )}
    </div>
  );
};
