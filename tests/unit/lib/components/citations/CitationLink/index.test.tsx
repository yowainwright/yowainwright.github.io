import { describe, expect, test } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  CitationLink,
  isCitationLink,
} from "../../../../../../lib/components/citations/CitationLink";

const getCitationLabels = (markup: string) =>
  Array.from(markup.matchAll(/\[(\d+)\]/g), ([, label]) => label);

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
