import { GRID_COLUMNS, GRID_ROWS } from './constants';

export const createGridStyle = (size: number): React.CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${GRID_COLUMNS}, ${size}px)`,
  gridTemplateRows: `repeat(${GRID_ROWS}, ${size}px)`,
  gap: 0,
});

export const createPixelStyle = (
  size: number,
  isOn: boolean,
  color: string
): React.CSSProperties => ({
  width: size,
  height: size,
  background: isOn ? color : 'transparent',
  transition: 'background-color 0.15s ease',
});

export const createCssVars = (
  size: number,
  color: string,
  filledColor: string
): React.CSSProperties => ({
  '--pixel-size': `${size}px`,
  '--heart-color': color,
  '--heart-color-filled': filledColor,
} as React.CSSProperties);
