#!/usr/bin/env bun

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export const COLORS = {
  background: {
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    solid: "#1a1a2e",
  },
  text: {
    title: "#ffffff",
    date: "#94a3b8",
    brand: "#64748b",
  },
  accent: {
    shadow: "rgba(0,0,0,0.3)",
    border: "rgba(255,255,255,0.1)",
  },
};

export const TYPOGRAPHY = {
  titleLarge: 64,
  titleMedium: 52,
  titleSmall: 42,
  titleCard: 38,
  titleCardSmall: 32,
  date: 24,
  dateSmall: 18,
  brand: 20,
  brandSmall: 18,
};

type StyleObject = Record<string, string | number>;

const style = (obj: StyleObject): string =>
  Object.entries(obj)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      const cssValue = typeof value === "number" ? `${value}px` : value;
      return `${cssKey}: ${cssValue}`;
    })
    .join("; ");

export const BASE_STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
`;

const STYLES = {
  cardContainer: {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    display: "flex",
    background: COLORS.background.gradient,
    position: "relative",
    overflow: "hidden",
  },
  brandAbsolute: {
    position: "absolute",
    bottom: 20,
    right: 30,
    fontSize: TYPOGRAPHY.brand,
    color: COLORS.text.brand,
    fontWeight: 600,
  },
  brandStatic: {
    fontSize: TYPOGRAPHY.brandSmall,
    color: COLORS.text.brand,
    fontWeight: 600,
    marginTop: "auto",
  },
  titleBase: {
    fontWeight: 700,
    color: COLORS.text.title,
    lineHeight: 1.2,
    margin: 0,
  },
  imagePreview: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    borderRadius: 8,
    boxShadow: `0 4px 20px ${COLORS.accent.shadow}`,
  },
  headerCentered: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 60,
  },
  headerSide: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "40px 30px 40px 50px",
    maxWidth: 500,
  },
  headerSideNarrow: {
    flex: "0 0 420px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "40px 20px 40px 50px",
  },
  figure: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 40px 30px 20px",
    margin: 0,
  },
  figureCode: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 40px 30px 10px",
    overflow: "hidden",
    margin: 0,
  },
};

const cardContainer = (content: string): string =>
  `<div style="${style(STYLES.cardContainer)}">${content}</div>`;

const brandWatermark = (position: "absolute" | "static"): string => {
  const styles = position === "absolute" ? STYLES.brandAbsolute : STYLES.brandStatic;
  return `<div style="${style(styles)}">jeffry.in</div>`;
};

const titleBlock = (title: string, fontSize: number, centered: boolean): string => {
  const styles: StyleObject = {
    ...STYLES.titleBase,
    fontSize,
    ...(centered && { textAlign: "center", maxWidth: 1000 }),
  };
  return `<h1 style="${style(styles)}">${title}</h1>`;
};

const dateBlock = (date: string, size: "large" | "small"): string => {
  const isLarge = size === "large";
  const styles: StyleObject = {
    fontSize: isLarge ? TYPOGRAPHY.date : TYPOGRAPHY.dateSmall,
    color: COLORS.text.date,
    marginTop: isLarge ? 24 : 16,
  };
  return `<p style="${style(styles)}">${date}</p>`;
};

const imagePreview = (dataUrl: string): string =>
  `<img src="${dataUrl}" style="${style(STYLES.imagePreview)}" />`;

export const getTitleFontSize = (titleLength: number): number => {
  if (titleLength > 60) return TYPOGRAPHY.titleSmall;
  if (titleLength > 40) return TYPOGRAPHY.titleMedium;
  return TYPOGRAPHY.titleLarge;
};

export const getCardTitleFontSize = (titleLength: number): number => {
  if (titleLength > 50) return TYPOGRAPHY.titleCardSmall;
  return TYPOGRAPHY.titleCard;
};

const htmlWrapper = (content: string): string => `
<!DOCTYPE html>
<html>
<head><style>${BASE_STYLES}</style></head>
<body>${content}</body>
</html>`;

export const buildTitleCardHtml = (title: string, date: string): string => {
  const fontSize = getTitleFontSize(title.length);
  const header = `
    <header style="${style(STYLES.headerCentered)}">
      ${titleBlock(title, fontSize, true)}
      ${dateBlock(date, "large")}
    </header>
    ${brandWatermark("absolute")}`;
  return htmlWrapper(cardContainer(header));
};

export const buildChartCardHtml = (
  title: string,
  date: string,
  chartDataUrl: string
): string => {
  const fontSize = getCardTitleFontSize(title.length);
  const content = `
    <header style="${style(STYLES.headerSide)}">
      ${titleBlock(title, fontSize, false)}
      ${dateBlock(date, "small")}
      ${brandWatermark("static")}
    </header>
    <figure style="${style(STYLES.figure)}">
      ${imagePreview(chartDataUrl)}
    </figure>`;
  return htmlWrapper(cardContainer(content));
};

export const buildCodeCardHtml = (
  title: string,
  date: string,
  codeDataUrl: string
): string => {
  const fontSize = getCardTitleFontSize(title.length);
  const content = `
    <header style="${style(STYLES.headerSideNarrow)}">
      ${titleBlock(title, fontSize, false)}
      ${dateBlock(date, "small")}
      ${brandWatermark("static")}
    </header>
    <figure style="${style(STYLES.figureCode)}">
      ${imagePreview(codeDataUrl)}
    </figure>`;
  return htmlWrapper(cardContainer(content));
};

export const buildDefaultOgHtml = (): string => {
  const headerStyles: StyleObject = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  const h1Styles: StyleObject = {
    fontSize: 96,
    fontWeight: 700,
    color: COLORS.text.title,
    margin: 0,
  };
  const pStyles: StyleObject = {
    fontSize: 28,
    color: COLORS.text.date,
    marginTop: 20,
  };
  const content = `
    <header style="${style(headerStyles)}">
      <h1 style="${style(h1Styles)}">jeffry.in</h1>
      <p style="${style(pStyles)}">Engineering notes & thoughts</p>
    </header>`;
  return htmlWrapper(cardContainer(content));
};
