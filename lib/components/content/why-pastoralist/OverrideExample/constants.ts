export const TITLE = "Why Are These Overrides Here?";

export const STEPS = [
  {
    title: "Overrides",
    note: "These rules tell the package manager which dependency versions to use but they do not explain why each override was added.",
    lines: [2],
  },
  {
    title: "semver",
    note: "This allows semver 7.5.4 through the remaining 7.x releases but we do not know which dependency needed this override.",
    lines: [3],
  },
  {
    title: "ws",
    note: "This allows ws 8.17.1 or later but the minimum version does not tell us what issue it addressed.",
    lines: [4],
  },
  {
    title: "axios",
    note: "This pins axios to exactly 1.12.0 but why?",
    lines: [5],
  },
  {
    title: "lodash",
    note: "This allows lodash 4.17.23 or later but do we know if the override is needed?",
    lines: [6],
  },
];
