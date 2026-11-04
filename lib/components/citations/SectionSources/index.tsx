"use client";

import React from "react";
import type { SectionSourcesProps, Source } from "./types";

export const SectionSources = ({ sources }: SectionSourcesProps) => {
  const sourceList = parseSources(sources);
  if (sourceList.length === 0) return null;

  return (
    <div className="sources">
      <ol className="sources__list">
        {sourceList.map((source, i) => (
          <li key={i} id={`source-${i + 1}`} className="sources__item">
            {source.author && <span className="sources__author">{source.author}. </span>}
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="sources__link"
            >
              "{source.title}"
            </a>
            {source.publication && (
              <span className="sources__publication">. {source.publication}</span>
            )}
            {source.date && <span className="sources__date">, {source.date}</span>}.
          </li>
        ))}
      </ol>
    </div>
  );
};

function parseSources(sources: Source[] | string | undefined): Source[] {
  if (!sources) return [];
  const parsed: unknown = typeof sources === "string" ? JSON.parse(sources) : sources;
  const valid = Array.isArray(parsed) && parsed.every(isSource);
  if (!valid) throw new Error("Sources require a title and URL.");
  return parsed as Source[];
}

function isSource(source: unknown): source is Source {
  const isObject = source && typeof source === "object";
  if (!isObject) return false;
  const value = source as Partial<Source>;
  const hasTitle = typeof value.title === "string";
  const hasUrl = typeof value.url === "string";
  return hasTitle && hasUrl;
}
