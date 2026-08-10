import { describe, expect, test } from "vitest";
import { Effect, Exit } from "effect";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  PostUI,
  PostUIRenderer,
  buildPostUIPrompt,
  decodePostUISpec,
} from "../../../../../lib/components/PostUI";
import expensiveAiTokenCost from "../../../../../lib/components/PostUI/specs/expensive-ai-token-cost.json";
import { generatePostUIPrompt } from "../../../../../scripts/generate-post-ui-prompt";
import { validatePostUISpecFile } from "../../../../../scripts/validate-post-ui-spec";

const validSpec = {
  root: "layout",
  elements: {
    layout: {
      type: "Stack",
      props: { gap: "medium" },
      children: ["summary"],
    },
    summary: {
      type: "Text",
      props: { text: "Generated from the post catalog." },
      children: [],
    },
  },
};

describe("decodePostUISpec", () => {
  test("decodes a catalog-constrained spec with Effect Schema", () => {
    const spec = Effect.runSync(decodePostUISpec(validSpec));

    expect(spec.root).toBe("layout");
    expect(spec.elements.summary?.type).toBe("Text");
  });

  test("rejects components outside the catalog", () => {
    const summaryOverride = { type: "Script" };
    const invalidSummary = Object.assign({}, validSpec.elements.summary, summaryOverride);
    const elementsOverride = { summary: invalidSummary };
    const invalidElements = Object.assign({}, validSpec.elements, elementsOverride);
    const invalidSpec = Object.assign({}, validSpec, { elements: invalidElements });
    const exit = Effect.runSyncExit(decodePostUISpec(invalidSpec));

    expect(Exit.isFailure(exit)).toBe(true);
  });

  test("rejects missing child references", () => {
    const layoutOverride = { children: ["missing"] };
    const invalidLayout = Object.assign({}, validSpec.elements.layout, layoutOverride);
    const elementsOverride = { layout: invalidLayout };
    const invalidElements = Object.assign({}, validSpec.elements, elementsOverride);
    const invalidSpec = Object.assign({}, validSpec, { elements: invalidElements });
    const exit = Effect.runSyncExit(decodePostUISpec(invalidSpec));

    expect(Exit.isFailure(exit)).toBe(true);
  });

  test("rejects cyclic element graphs", () => {
    const layoutOverride = { children: ["layout"] };
    const invalidLayout = Object.assign({}, validSpec.elements.layout, layoutOverride);
    const elementsOverride = { layout: invalidLayout };
    const invalidElements = Object.assign({}, validSpec.elements, elementsOverride);
    const invalidSpec = Object.assign({}, validSpec, { elements: invalidElements });
    const exit = Effect.runSyncExit(decodePostUISpec(invalidSpec));

    expect(Exit.isFailure(exit)).toBe(true);
  });

  test("rejects arrays used as component props", () => {
    const layoutOverride = { props: [] };
    const invalidLayout = Object.assign({}, validSpec.elements.layout, layoutOverride);
    const elementsOverride = { layout: invalidLayout };
    const invalidElements = Object.assign({}, validSpec.elements, elementsOverride);
    const invalidSpec = Object.assign({}, validSpec, { elements: invalidElements });
    const exit = Effect.runSyncExit(decodePostUISpec(invalidSpec));

    expect(Exit.isFailure(exit)).toBe(true);
  });
});

describe("PostUIRenderer", () => {
  test("renders a decoded spec through json-render", () => {
    const spec = Effect.runSync(decodePostUISpec(validSpec));
    const markup = renderToStaticMarkup(<PostUIRenderer spec={spec} />);

    expect(markup).toContain("post-ui__stack--medium");
    expect(markup).toContain("Generated from the post catalog.");
  });

  test("renders a committed expensive-ai spec", () => {
    const markup = renderToStaticMarkup(<PostUI spec={expensiveAiTokenCost} />);

    expect(markup).toContain("post-ui__stack--small");
    expect(markup).toContain("Approximate Cost Per Query");
    expect(markup).toContain("Sources: Artificial Analysis");
  });
});

describe("buildPostUIPrompt", () => {
  test("gives AI the Effect schema and available components", () => {
    const prompt = buildPostUIPrompt({
      slug: "expensive-ai",
      content: "Compare single-agent and multi-agent token costs.",
    });

    expect(prompt).toContain("expensive-ai");
    expect(prompt).toContain("BarChart");
    expect(prompt).toContain("MetricGrid");
    expect(prompt).toContain('"root"');
  });

  test("builds a prompt from an existing post slug", () => {
    const prompt = generatePostUIPrompt("expensive-ai");

    expect(prompt).toContain("When the AI Token Gravy Train Stops");
    expect(prompt).toContain('"models"');
  });

  test("rejects paths outside the content directory", () => {
    expect(() => generatePostUIPrompt("../package")).toThrow();
  });
});

describe("validatePostUISpecFile", () => {
  test("validates a committed AI-generated spec", () => {
    const spec = validatePostUISpecFile("expensive-ai-token-cost.json");

    expect(spec.root).toBe("token-cost-layout");
  });

  test("rejects paths outside the specs directory", () => {
    expect(() => validatePostUISpecFile("../package.json")).toThrow();
  });
});
