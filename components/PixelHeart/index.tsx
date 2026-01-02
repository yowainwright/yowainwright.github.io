'use client';

import React from 'react';
import { HEART_GRID } from './constants';
import { createGridStyle, createPixelStyle, createCssVars } from './utils';

interface PixelHeartProps {
  filled?: boolean;
  size?: number;
  color?: string;
  filledColor?: string;
  className?: string;
  useTailwind?: boolean;
}

export const PixelHeart = ({
  filled = false,
  size = 3,
  color = '#000',
  filledColor = '#e25555',
  className = '',
  useTailwind = false,
}: PixelHeartProps) => {
  const activeColor = filled ? filledColor : color;

  if (!useTailwind) {
    return (
      <div
        className={`pixel-heart ${filled ? 'pixel-heart--filled' : ''} ${className}`}
        style={createCssVars(size, color, filledColor)}
        aria-hidden="true"
      >
        {HEART_GRID.map((row, y) =>
          row.map((pixel, x) => (
            <span
              key={`${x}-${y}`}
              className={`pixel-heart__pixel ${pixel ? 'pixel-heart__pixel--on' : ''}`}
            />
          ))
        )}
      </div>
    );
  }

  return (
    <div style={createGridStyle(size)} className={className} aria-hidden="true">
      {HEART_GRID.map((row, y) =>
        row.map((pixel, x) => (
          <span key={`${x}-${y}`} style={createPixelStyle(size, pixel === 1, activeColor)} />
        ))
      )}
    </div>
  );
};
