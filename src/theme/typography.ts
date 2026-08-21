import type * as React from 'react';
import type { TypographyVariantsOptions } from '@mui/material/styles';
import { fonts, fontSize } from './tokens';

/**
 * Typography system.
 *
 * Three families, each with a distinct job and no overlap:
 *   Space Grotesk  — display and headings. Engineered geometry.
 *   Inter          — body, UI and controls. Neutral, legible at small sizes.
 *   IBM Plex Mono  — technical metadata only: eyebrows, indices, tech names.
 *
 * Hierarchy is created by size, weight and letter-spacing before any
 * decoration is applied.
 */

declare module '@mui/material/styles' {
  interface TypographyVariants {
    /** Oversized hero statement. One per page, at most. */
    display: React.CSSProperties;
    /** Monospace eyebrow / section index / technical label. */
    label: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    display?: React.CSSProperties;
    label?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display: true;
    label: true;
  }
}

export const typography: TypographyVariantsOptions = {
  fontFamily: fonts.body,
  fontSize: 16,
  htmlFontSize: 16,

  display: {
    fontFamily: fonts.display,
    fontSize: fontSize.display,
    fontWeight: 700,
    lineHeight: 1.02,
    letterSpacing: '-0.035em',
  },
  h1: {
    fontFamily: fonts.display,
    fontSize: fontSize.h1,
    fontWeight: 700,
    lineHeight: 1.08,
    letterSpacing: '-0.03em',
  },
  h2: {
    fontFamily: fonts.display,
    fontSize: fontSize.h2,
    fontWeight: 600,
    lineHeight: 1.14,
    letterSpacing: '-0.025em',
  },
  h3: {
    fontFamily: fonts.display,
    fontSize: fontSize.h3,
    fontWeight: 600,
    lineHeight: 1.24,
    letterSpacing: '-0.018em',
  },
  h4: {
    fontFamily: fonts.display,
    fontSize: fontSize.h4,
    fontWeight: 600,
    lineHeight: 1.34,
    letterSpacing: '-0.012em',
  },
  h5: {
    fontFamily: fonts.body,
    fontSize: fontSize.h5,
    fontWeight: 600,
    lineHeight: 1.45,
    letterSpacing: '-0.006em',
  },
  h6: {
    fontFamily: fonts.body,
    fontSize: fontSize.h6,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '0em',
  },

  subtitle1: {
    fontFamily: fonts.body,
    fontSize: fontSize.bodyLg,
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: '-0.008em',
  },
  subtitle2: {
    fontFamily: fonts.body,
    fontSize: fontSize.bodySm,
    fontWeight: 500,
    lineHeight: 1.55,
  },

  body1: {
    fontFamily: fonts.body,
    fontSize: fontSize.body,
    fontWeight: 400,
    lineHeight: 1.65,
  },
  body2: {
    fontFamily: fonts.body,
    fontSize: fontSize.bodySm,
    fontWeight: 400,
    lineHeight: 1.62,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: fontSize.caption,
    fontWeight: 400,
    lineHeight: 1.5,
  },

  label: {
    fontFamily: fonts.mono,
    fontSize: fontSize.label,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
  overline: {
    fontFamily: fonts.mono,
    fontSize: fontSize.label,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },

  button: {
    fontFamily: fonts.body,
    fontSize: fontSize.bodySm,
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '0em',
    textTransform: 'none',
  },
};
