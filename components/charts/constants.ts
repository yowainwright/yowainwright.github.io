export const CHART_COLORS = {
  light: {
    primary: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    purple: '#8b5cf6',
    pink: '#ec4899',
  },
  dark: {
    primary: '#60a5fa',
    success: '#34d399',
    warning: '#fbbf24',
    danger: '#f87171',
    purple: '#a78bfa',
    pink: '#f472b6',
  },
};

const backgroundColor = 'var(--color-bg-primary)';
const color = 'var(--color-text-primary)';
const fontSize = 12;
const position = 'top';
const borderRadius = '5px';

export const CHART_STYLES = {
  margin: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  grid: {
    strokeDasharray: '3 3',
  },
  line: {
    strokeWidth: 1,
    dotRadius: 2,
    fontSize,
    position,
  },
  bar: {
    maxBarSize: 100,
  },
  label: {
    fontSize,
  },
  legend: {
    fontSize,
    content: {
      fontSize,
    }
  },
  axis: {
    fontSize,
  },
  tooltip: {
    content: {
      backgroundColor,
      borderRadius,
      color,
      border: '.1rem solid var(--color-text-primary)',
      padding: '4px 8px',
    },
    item: {
      fontSize,
      lineHeight: 1.8,
      padding: 0,
      margin: 0,
    },
    label: {
      fontSize,
      lineHeight: 1.8,
      margin: 0,
    },
  },
};
