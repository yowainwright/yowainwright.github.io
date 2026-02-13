export const CHART_STYLES = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 20,
    width: "80%",
  },
  barContainer: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },
  label: {
    flex: 1,
    fontSize: 20,
    color: "#ccc",
    display: "flex",
  },
  bar: {
    height: 25,
    backgroundColor: "#3b82f6",
    borderRadius: 4,
    display: "flex",
  },
  value: {
    fontSize: 20,
    color: "#fff",
    display: "flex",
  },
} as const;

export const CHART_CONFIG = {
  MAX_ITEMS: 3,
  MAX_BAR_WIDTH: 300,
} as const;
