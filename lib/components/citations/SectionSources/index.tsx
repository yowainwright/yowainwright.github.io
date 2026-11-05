"use client";

import React from "react";
import { Ellipsis } from "lucide-react";
import type { SectionSourcesProps, Source } from "./types";

export const SectionSources = ({ sources }: SectionSourcesProps) => {
  const sourceList = parseSources(sources);
  if (sourceList.length === 0) return null;

  return (
    <div className="sources">
      <ol className="sources__list" role="list">
        {sourceList.slice(0, 3).map((source, i) => (
          <SourceItem key={i} source={source} number={i + 1} />
        ))}
      </ol>
      {sourceList.length > 3 && (
        <details className="sources__more" onToggle={updateDisclosureLabel}>
          <summary aria-label="view all" title="view all">
            <Ellipsis size={24} aria-hidden="true" />
          </summary>
          <ol className="sources__list" role="list" start={4}>
            {sourceList.slice(3).map((source, i) => (
              <SourceItem key={i} source={source} number={i + 4} />
            ))}
          </ol>
        </details>
      )}
    </div>
  );
};

function updateDisclosureLabel({ currentTarget }: React.SyntheticEvent<HTMLDetailsElement>) {
  const summary = currentTarget.querySelector("summary");
  if (!summary) return;
  const label = currentTarget.open ? "collapse" : "view all";
  summary.title = label;
  summary.setAttribute("aria-label", label);
}

function SourceItem({ source, number }: { source: Source; number: number }) {
  const domain = new URL(source.url, "https://jeffry.in").hostname.replace(/^www\./, "");
  const name = source.publication || source.author || source.title;
  const author = source.author !== name ? source.author : undefined;
  const metadata = [`${name}, ${domain}`, author, source.date].filter(Boolean).join(" · ");
  return (
    <li id={`source-${number}`} className="sources__item">
      <span className="sources__number" aria-hidden="true">{number}</span>
      <div className="sources__body">
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="sources__link">
          {source.title}
        </a>
        <p className="sources__metadata">{metadata}</p>
        {source.description && <p className="sources__description">{source.description}</p>}
      </div>
    </li>
  );
}

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
