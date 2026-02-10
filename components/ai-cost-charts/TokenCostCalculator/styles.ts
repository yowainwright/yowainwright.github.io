import { bemToCSS, type BEMBlock } from '../../../lib/style-generator/bem';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOW } from '../../../lib/style-generator/tokens';

const calculator: BEMBlock = {
  base: {
    maxWidth: "800px",
    margin: `${SPACING.xl} 0`,
    fontFamily: TYPOGRAPHY.fontFamily
  },
  elements: {
    header: {
      marginBottom: SPACING.lg
    },
    title: {
      fontSize: TYPOGRAPHY.fontSize.xl,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      marginBottom: SPACING.sm,
      color: COLORS.text.primary
    },
    description: {
      color: COLORS.text.secondary,
      fontSize: TYPOGRAPHY.fontSize.base,
      margin: "0"
    },
    "input-section": {
      marginBottom: SPACING.xl
    },
    label: {
      display: "block",
      marginBottom: SPACING.sm,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      fontSize: TYPOGRAPHY.fontSize.base
    },
    "helper-text": {
      color: COLORS.text.muted,
      marginLeft: SPACING.sm,
      fontWeight: TYPOGRAPHY.fontWeight.normal
    },
    input: {
      padding: SPACING.md,
      border: `1px solid ${COLORS.border}`,
      borderRadius: RADIUS.sm,
      fontSize: TYPOGRAPHY.fontSize.base,
      width: "200px",
      fontFamily: TYPOGRAPHY.fontFamily
    },
    "table-wrapper": {
      overflowX: "auto",
      marginBottom: SPACING.lg
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "white",
      borderRadius: RADIUS.md,
      overflow: "hidden",
      boxShadow: SHADOW.md
    },
    "table-header": {
      backgroundColor: COLORS.background.header,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      color: COLORS.text.primary,
      fontSize: TYPOGRAPHY.fontSize.base
    },
    "table-cell": {
      padding: `${SPACING.md} ${SPACING.lg}`,
      textAlign: "left",
      borderBottom: `1px solid ${COLORS.borderLight}`,
      fontSize: TYPOGRAPHY.fontSize.base
    },
    "model-name": {
      fontWeight: TYPOGRAPHY.fontWeight.medium
    },
    "total-cost": {
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      color: COLORS.primary
    },
    footer: {
      marginTop: SPACING.lg,
      paddingTop: SPACING.lg,
      borderTop: `1px solid ${COLORS.borderLight}`,
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.text.secondary
    },
    "pricing-note": {
      margin: `0 0 ${SPACING.sm} 0`,
      fontWeight: TYPOGRAPHY.fontWeight.medium
    },
    "helper-note": {
      margin: "0",
      fontStyle: "italic"
    }
  },
  modifiers: {
    loading: {
      opacity: "0.5"
    }
  }
};

export function buildCalculatorStyles(): string {
  return bemToCSS('calculator', calculator);
}