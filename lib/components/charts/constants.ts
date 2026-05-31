export const CHART_COLORS = {
  light: {
    primary: "var(--chart-series-1)",
    success: "var(--chart-series-2)",
    warning: "var(--chart-series-3)",
    danger: "var(--chart-series-4)",
    purple: "var(--chart-series-2)",
    pink: "var(--chart-series-3)",
    grey: "var(--chart-series-1)",
  },
  dark: {
    primary: "var(--chart-series-1)",
    success: "var(--chart-series-2)",
    warning: "var(--chart-series-3)",
    danger: "var(--chart-series-4)",
    purple: "var(--chart-series-2)",
    pink: "var(--chart-series-3)",
    grey: "var(--chart-series-1)",
  },
};

export const CHART_SERIES_COLORS = [
  "var(--chart-series-1)",
  "var(--chart-series-2)",
  "var(--chart-series-3)",
  "var(--chart-series-4)",
];

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
const lineStrokeWidth = 1.5;
const lineDotRadius = 1.75;
const lineLabelPosition = "top" as const;

const barMaxSize = 60;

const gridStrokeDasharray = "2 4";
const gridStroke = "var(--chart-grid)";
const axisStroke = "var(--chart-axis)";
const labelColor = "var(--chart-label)";

const borderRadius = "5px";
const tooltipBorder = "1px solid var(--chart-tooltip-border)";

const backgroundColor = "var(--color-bg-primary)";
const textColor = "var(--color-text-primary)";

const legendVerticalAlign = "bottom" as const;
const initialDimension = {
  width: 800,
  height: 360,
};

export const CHART_STYLES = {
  container: {
    width: "100%",
    padding: containerPadding,
  },
  initialDimension,
  margin: {
    top: marginTop,
    right: marginRight,
    left: marginLeft,
    bottom: marginBottom,
  },
  grid: {
    strokeDasharray: gridStrokeDasharray,
    stroke: gridStroke,
  },
  line: {
    type: lineType,
    strokeWidth: lineStrokeWidth,
    dotRadius: lineDotRadius,
    label: {
      position: lineLabelPosition,
      fontSize,
      color: labelColor,
    },
  },
  bar: {
    maxBarSize: barMaxSize,
  },
  axis: {
    color: axisStroke,
    fontSize,
    label: {
      color: labelColor,
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
      boxShadow: "none",
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
