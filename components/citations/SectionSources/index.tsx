'use client';

import React from 'react';
import type { SectionSourcesProps } from './types';

/**
 * SectionSources component for displaying a list of sources at the end of a section
 *
 * Usage:
 * <SectionSources
 *   title="Sources" // optional, defaults to "Sources"
 *   sources={[
 *     {
 *       url: "https://example.com",
 *       title: "Article Title",
 *       author: "John Doe", // optional
 *       publication: "Publication Name", // optional
 *       date: "2024-01-01" // optional
 *     }
 *   ]}
 * />
 */
export const SectionSources = ({ sources, title = 'Sources' }: SectionSourcesProps) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div style={{ fontSize: '0.875rem', marginTop: '1.5rem', color: '#666' }}>
      <strong>{title}:</strong>
      <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
        {sources.map((source, i) => (
          <li key={i}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0066cc', textDecoration: 'none' }}
            >
              {source.title}
            </a>
            {source.author && <span> - {source.author}</span>}
            {source.publication && <span>, {source.publication}</span>}
            {source.date && <span> ({source.date})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};
