export const TITLE = "Before and After Running Pastoralist";

export const STEPS = [
  {
    "data-title": "Before",
    "data-anchor": "6.11.2",
    "data-note":
      "The project overrides qs, which Express depends on. There’s no tracking record yet.",
  },
  {
    "data-title": "Command",
    "data-note":
      "Record the existing override and its dependents. Security scanning is disabled in this example.",
  },
  {
    "data-title": "After",
    "data-anchor": "qs (required by express)",
    "data-note":
      "Now we can see that this project uses qs through Express, and when Pastoralist first recorded the override.",
  },
];
