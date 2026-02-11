"use client";

import React from 'react';
import { Maximize2 } from 'lucide-react';
import type { MermaidChartProps } from '../types';

export const MermaidChart: React.FC<MermaidChartProps> = ({
  children,
  onClick,
  className = ''
}) => {
  return (
    <div
      className={`mermaid-chart ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label="Click to expand diagram"
    >
      <div className="mermaid-chart-expand-hint">
        <Maximize2 size={16} />
      </div>
      <div className="mermaid-chart-content">
        {children}
      </div>
    </div>
  );
};