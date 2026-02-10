"use client";

import React from 'react';
import { Maximize2 } from 'lucide-react';

interface MermaidChartProps {
  svgContent: string;
  onClick: () => void;
}

export function MermaidChart({ svgContent, onClick }: MermaidChartProps) {
  return (
    <div className="mermaid-chart" onClick={onClick}>
      <div className="mermaid-chart__expand-hint">
        <Maximize2 size={16} />
      </div>
      <div
        className="mermaid-chart__content"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
}