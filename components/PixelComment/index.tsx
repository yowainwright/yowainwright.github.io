'use client';

import React from 'react';
import { COMMENT_GRID, GRID_COLUMNS, GRID_ROWS } from './constants';

interface PixelCommentProps {
  size?: number;
  color?: string;
  className?: string;
}

export const PixelComment = ({
  size = 2,
  color = 'currentColor',
  className = '',
}: PixelCommentProps) => {
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
      {COMMENT_GRID.map((row, y) =>
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
