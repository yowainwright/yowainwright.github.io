import { describe, expect, test } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SearchEmpty } from "../../../../../lib/components/Search/SearchEmpty";

describe("SearchEmpty", () => {
  test("renders the empty search state", () => {
    const markup = renderToStaticMarkup(<SearchEmpty />);

    expect(markup).toContain("No results found");
  });
});
