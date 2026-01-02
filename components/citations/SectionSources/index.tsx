'use client';

import React from 'react';
import type { SectionSourcesProps } from './types';

export const SectionSources = ({ sources }: SectionSourcesProps) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="sources">
      <ol className="sources__list">
        {sources.map((source, i) => (
          <li key={i} className="sources__item">
            {source.author && <span className="sources__author">{source.author}. </span>}
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="sources__link"
            >
              "{source.title}"
            </a>
            {source.publication && <span className="sources__publication">. {source.publication}</span>}
            {source.date && <span className="sources__date">, {source.date}</span>}
            .
          </li>
        ))}
      </ol>
    </div>
  );
};
