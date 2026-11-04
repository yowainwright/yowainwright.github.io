import { describe, expect, test } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MDXRemote } from "next-mdx-remote";
import { JSDOM } from "jsdom";
import { readFileSync } from "node:fs";
import { buildPostStaticProps } from "../../../../../../lib/server/post-page";
import { ScrollyCode } from "../../../../../../lib/components/ScrollyCode";
import { InfoBlock } from "../../../../../../lib/components/InfoBlock";
import { CitationLink } from "../../../../../../lib/components/citations/CitationLink";
import { SectionSources } from "../../../../../../lib/components/citations/SectionSources";
import { InlineSource } from "../../../../../../lib/components/citations/InlineSource";
import type { Source } from "../../../../../../lib/components/citations/SectionSources/types";

const getCitationLabels = (markup: string) =>
  Array.from(markup.matchAll(/\[(\d+)\]/g), ([, label]) => label);

describe("SectionSources", () => {
  test.each([
    ["us-swe-economy-2025", 10],
    ["why-pastoralist", 12],
    ["expensive-ai", 9],
  ] as const)("renders %s sources through the actual MDX compiler", async (slug, count) => {
    const { props } = await buildPostStaticProps(slug, "content");
    if (!props.mdxSource) throw new Error("Expected compiled MDX");
    const components = {
      SectionSources,
      InlineSource,
      ScrollyCode,
      InfoBlock,
      a: CitationLink,
      RiseAndFallChart: () => null,
      GlobalGrowthChart: () => null,
      WageStagnationChart: () => null,
      SWEMetricsGrid: () => null,
      PastoralistStudyCharts: () => null,
      TokenCostChart: () => null,
      AgentTaskCostChart: () => null,
      ProjectCostComparisonChart: () => null,
      TokenCostCalculator: () => null,
    };
    const markup = renderToStaticMarkup(<MDXRemote {...props.mdxSource} components={components} />);
    const dom = new JSDOM(markup);
    const document = dom.window.document;
    expect(document.querySelectorAll(".sources__item")).toHaveLength(count);
    expect(document.querySelectorAll(".sources__link")).toHaveLength(count);
    document.querySelectorAll('.citation__link[href^="#"]').forEach((link: Element) => {
      const href = link.getAttribute("href") ?? "";
      expect(document.querySelector(href)).not.toBeNull();
      expect(link.getAttribute("target")).toBe("_self");
    });
    if (slug === "us-swe-economy-2025") {
      expect(document.querySelector("#source-1")?.textContent).toContain("Industry's Impact");
    }
    if (slug === "why-pastoralist") {
      expect(document.querySelectorAll('a[href^="https:"]:not(.sources__link)')).toHaveLength(0);
      expect(document.querySelector(".citation__link")?.textContent).toBe("[1]");
    }
    if (slug === "expensive-ai") {
      const diagrams = document.querySelectorAll("img.mermaid-diagram");
      expect(diagrams).toHaveLength(2);
      diagrams.forEach((image: Element) => {
        const light = image.getAttribute("src");
        const dark = image.getAttribute("data-dark-src");
        expect(dark).not.toBe(light);
        expect(image.closest("a")?.getAttribute("data-dark-href")).toBe(dark);
        expect(readFileSync(`public${light}`, "utf8")).toContain("--diagram-text: #000000");
        expect(readFileSync(`public${dark}`, "utf8")).toContain("--diagram-text: #ffffff");
      });
    }
    dom.window.close();
  });

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
