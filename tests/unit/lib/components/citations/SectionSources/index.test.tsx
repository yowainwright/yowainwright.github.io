import { describe, expect, test } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MDXRemote } from "next-mdx-remote";
import { JSDOM } from "jsdom";
import { readFileSync } from "node:fs";
import { buildPostStaticProps } from "../../../../../../lib/server/post-page";
import { ScrollyCode } from "../../../../../../lib/components/ScrollyCode";
import { OverrideExample } from "../../../../../../lib/components/content/why-pastoralist/OverrideExample";
import { AppendixExample } from "../../../../../../lib/components/content/why-pastoralist/AppendixExample";
import { BeforeAfterExample } from "../../../../../../lib/components/content/why-pastoralist/BeforeAfterExample";
import { InfoBlock } from "../../../../../../lib/components/InfoBlock";
import { Tooltip } from "../../../../../../lib/components/Tooltip";
import { CitationLink } from "../../../../../../lib/components/citations/CitationLink";
import { SectionSources } from "../../../../../../lib/components/citations/SectionSources";
import { InlineSource } from "../../../../../../lib/components/citations/InlineSource";
import type { Source } from "../../../../../../lib/components/citations/SectionSources/types";

const getCitationLabels = (markup: string) =>
  Array.from(markup.matchAll(/\[(\d+)\]/g), ([, label]) => label);

describe("SectionSources", () => {
  test.each([
    ["us-swe-economy-2025", 10],
    ["why-pastoralist", 9],
    ["expensive-ai", 9],
  ] as const)("renders %s sources through the actual MDX compiler", async (slug, count) => {
    const { props } = await buildPostStaticProps(slug, "content");
    if (!props.mdxSource) throw new Error("Expected compiled MDX");
    const components = {
      SectionSources,
      InlineSource,
      ScrollyCode,
      OverrideExample,
      AppendixExample,
      BeforeAfterExample,
      InfoBlock,
      Tooltip,
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
    expect(document.querySelectorAll(".sources__description")).toHaveLength(count);
    expect(document.querySelector(".sources > .sources__list")?.children).toHaveLength(3);
    expect(document.querySelector(".sources__more[open]")).toBeNull();
    expect(document.querySelector(".sources__more ol")?.getAttribute("start")).toBe("4");
    const numbers = Array.from(document.querySelectorAll(".sources__number"), (item: Element) => item.textContent);
    expect(numbers).toEqual(Array.from({ length: count }, (_, index) => String(index + 1)));
    document.querySelectorAll(".sources__link").forEach((link: HTMLAnchorElement) => {
      const domain = new URL(link.href).hostname.replace(/^www\./, "");
      expect(link.nextElementSibling?.textContent).toContain(domain);
    });
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
        description: "Evidence for the first claim.",
      },
      {
        title: "Second Source",
        publication: "Example Journal",
        url: "https://example.com/second",
      },
      {
        title: "Third Source",
        url: "https://example.com/third",
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
    expect(markup).toContain('<ol class="sources__list" role="list">');
    expect(markup).toContain('href="https://example.com/first"');
    expect(markup).toContain('href="https://example.com/second"');
    expect(markup).toContain("Evidence for the first claim.");
    expect(markup).toContain("Example Journal, example.com");
    expect(markup).not.toContain("sources__more");
  });
});
