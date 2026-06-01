import { describe, expect, test } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { InlineSource } from "../../../../../../lib/components/citations/InlineSource";

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
