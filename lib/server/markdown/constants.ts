export const PROJECT_ROOT = process.cwd();
export const CONTENT_DIR = "content";
export const DRAFTS_DIR = "drafts";
export const EXCLUDED_SLUGS = new Set(["404", "about", "resume"]);
export const MARKDOWN_EXTENSIONS = [".md", ".mdx"];
export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const MARKDOWN_EXT_REGEX = /\.(md|mdx)$/;
export const TOOLTIP_PATTERN = /(\S+)\[tooltip:([^\]]+)\]/g;
export const HEADING_REGEX = /^h[1-6]$/;
export const COMMENT_PREFIXES = ["//", "#", "/*"];

export const OG_IMAGE_CONFIG = {
  width: 1200,
  height: 630,
};

export const OG_COLORS = {
  black: "#000",
  white: "white",
  whiteTransparent: "rgba(255, 255, 255, 0.8)",
  whiteSubtle: "rgba(255, 255, 255, 0.6)",
};

export const OG_GRADIENTS = {
  purple: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

export const OG_TYPOGRAPHY = {
  titleSize: 60,
  descriptionSize: 24,
  footerSize: 18,
  baseSize: 32,
  titleWeight: 800,
  baseWeight: 600,
  lineHeightNormal: 1.4,
};

export const OG_SPACING = {
  containerPadding: "40px",
  titleMargin: 20,
  footerMargin: 30,
  descriptionMaxWidth: 600,
};

export const OG_SHADOWS = {
  text: "0 4px 8px rgba(0, 0, 0, 0.3)",
};

export const OG_STYLES = {
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: OG_COLORS.black,
    background: OG_GRADIENTS.purple,
    fontSize: OG_TYPOGRAPHY.baseSize,
    fontWeight: OG_TYPOGRAPHY.baseWeight,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: OG_SPACING.containerPadding,
    textAlign: "center",
  },
  title: {
    fontSize: OG_TYPOGRAPHY.titleSize,
    fontWeight: OG_TYPOGRAPHY.titleWeight,
    color: OG_COLORS.white,
    marginBottom: OG_SPACING.titleMargin,
    textShadow: OG_SHADOWS.text,
  },
  description: {
    fontSize: OG_TYPOGRAPHY.descriptionSize,
    color: OG_COLORS.whiteTransparent,
    maxWidth: OG_SPACING.descriptionMaxWidth,
    lineHeight: OG_TYPOGRAPHY.lineHeightNormal,
  },
  footer: {
    fontSize: OG_TYPOGRAPHY.footerSize,
    color: OG_COLORS.whiteSubtle,
    marginTop: OG_SPACING.footerMargin,
  },
};
