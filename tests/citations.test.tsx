import { describe, expect, test } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  CitationLink,
  InlineSource,
  isCitationLink,
  SectionSources,
  type Source,
} from "../lib/components/citations";

const getCitationLabels = (markup: string) =>
  Array.from(markup.matchAll(/\[(\d+)\]/g), ([, label]) => label);

describe("InlineSource", () => {
  test("renders explicit citation labels", () => {
    const markup = renderToStaticMarkup(
      <InlineSource url="https://example.com/manual">7</InlineSource>,
    );

    expect(getCitationLabels(markup)).toEqual(["7"]);
  });
});

describe("CitationLink", () => {
  test("detects numeric markdown links as citations", () => {
    expect(isCitationLink("1")).toBe(true);
    expect(isCitationLink("10")).toBe(true);
    expect(isCitationLink("Pastoralist")).toBe(false);
  });

  test("renders numeric links as citations", () => {
    const markup = renderToStaticMarkup(
      <p>
        A cited fact
        <CitationLink href="https://example.com/source">1</CitationLink>.
      </p>,
    );

    expect(markup).toContain('<sup class="citation">');
    expect(markup).toContain('class="citation__link"');
    expect(markup).toContain('href="https://example.com/source"');
    expect(getCitationLabels(markup)).toEqual(["1"]);
  });

  test("leaves ordinary links unchanged", () => {
    const markup = renderToStaticMarkup(
      <CitationLink href="https://example.com/docs">Pastoralist</CitationLink>,
    );

    expect(markup).toBe('<a href="https://example.com/docs">Pastoralist</a>');
  });
});

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
