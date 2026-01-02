import React from 'react';
import { ChartSourcesProps } from '../types';

export const ChartSources = ({ sources }: ChartSourcesProps) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div>
      <span style={{ fontSize: '12px' }}>Chart Sources:</span>
      <ul>
        {sources.map((source, i) => (
          <li key={i} style={{ fontSize: '12px' }}>
            <a href={source.link} target="_blank" rel="noopener noreferrer">
              {source.author} - {source.publication}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
