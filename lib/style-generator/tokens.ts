export const COLORS = {
  primary: "#2563eb",
  success: "#16a34a",
  warning: "#ca8a04",
  error: "#dc2626",
  text: {
    primary: "#1a1a1a",
    secondary: "#666",
    muted: "#888",
    link: "#2563eb"
  },
  border: "#e5e5e5",
  borderLight: "#eee",
  background: {
    light: "#fafafa",
    card: "#f9fafb",
    header: "#f8f8f8"
  }
} as const;

export const SPACING = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px"
} as const;

export const TYPOGRAPHY = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "24px",
    xxl: "32px"
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700"
  },
  lineHeight: "1.5"
} as const;

export const RADIUS = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px"
} as const;

export const SHADOW = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  md: "0 2px 8px rgba(0, 0, 0, 0.1)",
  lg: "0 4px 16px rgba(0, 0, 0, 0.15)"
} as const;