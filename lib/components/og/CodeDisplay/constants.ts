export const CODE_STYLES = {
  container: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    fontFamily: "monospace",
    display: "flex",
    flexDirection: "column" as const,
  },
  header: {
    color: "#569cd6",
    fontSize: 14,
    marginBottom: 10,
    display: "flex",
  },
  line: {
    color: "#d4d4d4",
    fontSize: 16,
    fontFamily: "monospace",
    display: "flex",
  },
} as const;

export const CODE_CONFIG = {
  MAX_LINES: 10,
} as const;
