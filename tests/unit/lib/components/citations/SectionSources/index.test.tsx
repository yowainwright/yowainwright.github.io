import { describe, expect, test } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CitationLink } from "../../../../../../lib/components/citations/CitationLink";
import { SectionSources } from "../../../../../../lib/components/citations/SectionSources";
import type { Source } from "../../../../../../lib/components/citations/SectionSources/types";

const getCitationLabels = (markup: string) =>
  Array.from(markup.matchAll(/\[(\d+)\]/g), ([, label]) => label);

describe("SectionSources", () => {
  test("renders a source list alongside markdown-link citations", () => {
    const sources: Source[] = [
      {
        title: "First Source",
        url: "https://example.com/first",
      },
      {
        title: "Second Source",
        publication: "Example Journal",
        url: "https://example.com/second",
      },
    ];

    const markup = renderToStaticMarkup(
      <>
        <p>
          First fact
          <CitationLink href={sources[0].url}>1</CitationLink>. Second fact
          <CitationLink href={sources[1].url}>2</CitationLink>.
        </p>
        <SectionSources sources={sources} />
      </>,
    );

    expect(getCitationLabels(markup)).toEqual(["1", "2"]);
    expect(markup).toContain('<ol class="sources__list">');
    expect(markup).toContain('href="https://example.com/first"');
    expect(markup).toContain('href="https://example.com/second"');
  });
});
