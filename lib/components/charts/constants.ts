export const CHART_COLORS = {
  light: {
    primary: "#3b82f6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    purple: "#8b5cf6",
    pink: "#ec4899",
    grey: "#9ca3af",
  },
  dark: {
    primary: "#60a5fa",
    success: "#34d399",
    warning: "#fbbf24",
    danger: "#f87171",
    purple: "#a78bfa",
    pink: "#f472b6",
    grey: "#6b7280",
  },
};

const fontSize = 12;
const lineHeight = 1.8;
const iconSize = 12;

const containerPadding = "20px 0";
const tooltipPadding = "4px 8px";
const iconPaddingRight = "2px";

const marginTop = 0;
const marginRight = 0;
const marginBottom = 0;
const marginLeft = 0;

const xLabelOffset = -10;
const xLabelPosition = "insideBottom" as const;
const yLabelAngle = -90;
const yLabelPosition = "insideLeft" as const;

const lineType = "monotone" as const;
const lineStrokeWidth = 1;
const lineDotRadius = 2;
const lineLabelPosition = "top" as const;

const barMaxSize = 60;

const gridStrokeDasharray = "3 3";

const borderRadius = "5px";
const tooltipBorder = ".1rem solid var(--color-text-primary)";

const backgroundColor = "var(--color-bg-primary)";
const textColor = "var(--color-text-primary)";

const legendVerticalAlign = "bottom" as const;

export const CHART_STYLES = {
  container: {
    width: "100%",
    padding: containerPadding,
  },
  margin: {
    top: marginTop,
    right: marginRight,
    left: marginLeft,
    bottom: marginBottom,
  },
  grid: {
    strokeDasharray: gridStrokeDasharray,
  },
  line: {
    type: lineType,
    strokeWidth: lineStrokeWidth,
    dotRadius: lineDotRadius,
    label: {
      position: lineLabelPosition,
      fontSize,
    },
  },
  bar: {
    maxBarSize: barMaxSize,
  },
  axis: {
    fontSize,
    label: {
      fontSize,
      x: {
        offset: xLabelOffset,
        position: xLabelPosition,
      },
      y: {
        angle: yLabelAngle,
        position: yLabelPosition,
      },
    },
  },
  legend: {
    verticalAlign: legendVerticalAlign,
    iconSize,
    item: {
      fontSize,
      listStyleType: "none" as const,
    },
    icon: {
      paddingRight: iconPaddingRight,
    },
  },
  tooltip: {
    content: {
      backgroundColor,
      borderRadius,
      color: textColor,
      border: tooltipBorder,
      padding: tooltipPadding,
    },
    item: {
      fontSize,
      lineHeight,
      padding: 0,
      margin: 0,
    },
    label: {
      fontSize,
      lineHeight,
      margin: 0,
    },
  },
};
