import { expect, test, vi } from "vitest";
import { getMermaidThemeCss } from "../../../../../lib/server/markdown/mermaid-theme";

const readTheme = vi.hoisted(() => vi.fn());
vi.mock("node:fs", () => ({ readFileSync: readTheme }));

test("takes diagram colors from both site palettes instead of hard-coded Mermaid colors", () => {
  readTheme.mockReturnValue(`
    --color-text-primary: #123456;
    --color-text-secondary: #234567;
    --color-bg-primary: #345678;
    --color-bg-secondary: #456789;
    // Dark Mode Theme
    --color-text-primary: #abcdef;
    --color-text-secondary: #bcdef0;
    --color-bg-primary: #cdef01;
    --color-bg-secondary: #def012;
  `);
  const css = getMermaidThemeCss("light");
  expect(css).toContain("--diagram-text: #123456");
  expect(css).toContain("--diagram-line: #234567");
  expect(css).toContain("--diagram-background: #345678");
  expect(css).toContain("--diagram-surface: #456789");
  const dark = getMermaidThemeCss("dark");
  expect(dark).toContain("--diagram-text: #abcdef");
  expect(dark).toContain("--diagram-line: #bcdef0");
  expect(dark).toContain("--diagram-background: #cdef01");
  expect(dark).toContain("--diagram-surface: #def012");
});

test("reports a missing site color rather than silently using mismatched defaults", () => {
  readTheme.mockReturnValue("// Dark Mode Theme");
  expect(() => getMermaidThemeCss("light")).toThrow(
    "Missing Mermaid theme color: color-text-primary",
  );
});
