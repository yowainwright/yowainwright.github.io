'use client';

import React from 'react';
import type { InlineSourceProps } from './types';

/**
 * InlineSource component for inline citations
 *
 * Usage:
 * <InlineSource url="https://example.com/source">1</InlineSource>
 *
 * Renders as a superscript link with small font size: [1]
 */
export const InlineSource = ({ url, children }: InlineSourceProps) => (
  <sup style={{ fontSize: '0.7em' }}>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: '#0066cc' }}
    >
      [{children}]
    </a>
  </sup>
);
