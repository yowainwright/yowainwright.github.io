import { bemToCSS, type BEMBlock } from "../../../../client/styles/generator";
import {
  SPACING,
  TYPOGRAPHY,
  RADIUS,
} from "../../../../client/styles/generator";

const calculator: BEMBlock = {
  base: {
    maxWidth: "800px",
    margin: `${SPACING.xl} 0`,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  elements: {
    header: {
      marginBottom: SPACING.lg,
    },
    title: {
      fontSize: TYPOGRAPHY.fontSize.xl,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      marginBottom: SPACING.sm,
      color: "var(--color-text-primary)",
    },
    description: {
      color: "var(--color-text-secondary)",
      fontSize: TYPOGRAPHY.fontSize.base,
      margin: "0",
    },
    "input-section": {
      marginBottom: SPACING.xl,
    },
    label: {
      display: "block",
      marginBottom: SPACING.sm,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      fontSize: TYPOGRAPHY.fontSize.base,
    },
    "helper-text": {
      color: "var(--color-text-muted)",
      marginLeft: SPACING.sm,
      fontWeight: TYPOGRAPHY.fontWeight.normal,
    },
    input: {
      padding: SPACING.md,
      border: "1px solid var(--color-border-default)",
      borderRadius: RADIUS.sm,
      fontSize: TYPOGRAPHY.fontSize.base,
      width: "200px",
      fontFamily: TYPOGRAPHY.fontFamily,
      backgroundColor: "var(--color-bg-primary)",
      color: "var(--color-text-primary)",
    },
    "table-wrapper": {
      overflowX: "auto",
      marginBottom: SPACING.lg,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "var(--color-bg-primary)",
      border: "1px solid var(--color-border-default)",
      borderRadius: RADIUS.md,
    },
    "table-header": {
      backgroundColor: "var(--color-bg-secondary)",
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      color: "var(--color-text-primary)",
      fontSize: TYPOGRAPHY.fontSize.base,
    },
    "table-cell": {
      padding: `${SPACING.md} ${SPACING.lg}`,
      textAlign: "left",
      borderBottom: "1px solid var(--color-border-default)",
      fontSize: TYPOGRAPHY.fontSize.base,
      backgroundColor: "transparent",
    },
    "model-name": {
      fontWeight: TYPOGRAPHY.fontWeight.medium,
    },
    "total-cost": {
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      color: "var(--color-primary)",
    },
    footer: {
      marginTop: SPACING.lg,
      paddingTop: SPACING.lg,
      borderTop: "1px solid var(--color-border-default)",
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: "var(--color-text-secondary)",
    },
    "pricing-note": {
      margin: `0 0 ${SPACING.sm} 0`,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
    },
    "helper-note": {
      margin: "0",
      fontStyle: "italic",
    },
  },
  modifiers: {
    loading: {
      opacity: "0.5",
    },
  },
};

export function buildCalculatorStyles(): string {
  return bemToCSS("calculator", calculator);
}
