import { describe, expect, test } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PixelIcon } from "../../../../../lib/components/PixelIcon";

describe("PixelIcon", () => {
  test("renders pixel icons from named and custom grids", () => {
    const namedMarkup = renderToStaticMarkup(
      <PixelIcon name="heart" size={3} color="#f00" />,
    );
    const customMarkup = renderToStaticMarkup(
      <PixelIcon
        grid={[
          [1, 0],
          [0, 1],
        ]}
      />,
    );

    expect(namedMarkup).toContain("<svg");
    expect(namedMarkup).toContain('fill="#f00"');
    expect(customMarkup.match(/<rect/g)?.length).toBe(2);
  });
});
