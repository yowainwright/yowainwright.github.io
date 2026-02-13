const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

export const OG_DIMENSIONS = {
  width: OG_WIDTH,
  height: OG_HEIGHT,
} as const;

export const OG_STYLES = {
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    fontSize: 32,
    fontWeight: 600,
  },
  title: {
    color: "#fff",
    marginBottom: 20,
    display: "flex",
    textAlign: "center",
  },
  subtitle: {
    color: "#666",
    fontSize: 18,
    display: "flex",
    textAlign: "center",
  },
} as const;
