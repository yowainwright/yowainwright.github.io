export const MERMAID_STYLES = {
  container: {
    backgroundColor: "#f8f9fa",
    padding: 30,
    borderRadius: 8,
    width: "80%",
    border: "2px solid #e9ecef",
    display: "flex",
    flexDirection: "column" as const,
  },
  title: {
    fontSize: 18,
    color: "#495057",
    marginBottom: 20,
    fontWeight: "bold",
    display: "flex",
  },
  content: {
    fontSize: 16,
    color: "#6c757d",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap" as const,
    display: "flex",
  },
} as const;
