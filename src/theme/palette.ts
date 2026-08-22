import type { ColorSystemOptions } from '@mui/material/styles';
import { blue, brand, ink, slate, status } from './tokens';

/**
 * Two colour schemes generated from one token set.
 *
 * Dark is the default and carries the brand: hero, navigation, footer and the
 * high-impact sections. Light is used for reading-dense sections so the site
 * has genuine tonal rhythm instead of being one flat dark canvas.
 *
 * Because MUI emits these as CSS custom properties scoped to
 * `[data-color-scheme="…"]`, any element can flip the scheme for its subtree.
 * See `Section` for how that is applied.
 */

declare module '@mui/material/styles' {
  interface Palette {
    /** Saturated brand azure. Solid shapes only — rules, bars, fills. */
    brandAzure: string;
    /**
     * Accessible azure for text and icons.
     *
     * The pure brand azure measures 3.9:1–4.3:1 against the dark surfaces it
     * sits on, which fails AA for the 12px monospace labels that use it. This
     * token carries the same hue at a luminance that passes.
     */
    accentText: string;
    /** Chrome/steel tone taken from the wordmark. */
    steel: string;
    /**
     * Section surface scale.
     *
     * Five steps of tonal distance from the page canvas, defined once per
     * colour scheme. `Section` maps its `tone` onto these, which is what lets
     * one set of section tones produce a coherent rhythm in *either* theme
     * instead of hard-pinning half the page to a light scheme.
     *
     * Ordered by distance from the canvas, not by lightness: in dark each step
     * gets lighter, in light each step gets more tinted.
     */
    surfaceCanvas: string;
    surfaceAlt: string;
    surfaceBand: string;
    surfaceContrast: string;
    /** One step above `background.paper` for nested surfaces. */
    surfaceRaised: string;
    /** Scrim behind the fixed header. Always the dark brand chrome. */
    chromeScrim: string;
    /** Soft lift under cards. Light scheme only; dark stays border-led. */
    cardShadow: string;
    /** Subtle 1px separator. */
    hairline: string;
    /** Stronger separator for structural edges. */
    hairlineStrong: string;
    /**
     * Card fill.
     *
     * Translucent on dark so a card reads correctly on any of the three dark
     * tones without needing a per-tone variant; opaque white on light, where
     * a translucent card would simply disappear.
     */
    cardSurface: string;
    /** Card fill under hover. */
    cardSurfaceHover: string;
    /** Card border at rest. */
    cardBorder: string;
    /** Card border under hover — the azure illumination. */
    cardBorderHover: string;
    /** Hairline highlight along a card's top edge. */
    cardHighlight: string;
    /** Radial azure wash used to stop dark sections reading flat. */
    glowAzure: string;
    /**
     * Engineering-grid rule.
     *
     * Separate from `hairline` because the two need different weights: a
     * hairline is a structural edge a reader should notice, whereas the grid
     * is a texture they should not. Reusing `hairline` made the light theme's
     * grid read as graph paper.
     */
    gridLine: string;
  }
  interface PaletteOptions {
    brandAzure?: string;
    accentText?: string;
    steel?: string;
    surfaceCanvas?: string;
    surfaceAlt?: string;
    surfaceBand?: string;
    surfaceContrast?: string;
    surfaceRaised?: string;
    chromeScrim?: string;
    cardShadow?: string;
    hairline?: string;
    hairlineStrong?: string;
    cardSurface?: string;
    cardSurfaceHover?: string;
    cardBorder?: string;
    cardBorderHover?: string;
    cardHighlight?: string;
    glowAzure?: string;
    gridLine?: string;
  }
}

export const darkScheme: ColorSystemOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: blue.main,
      light: blue.light,
      dark: blue.dark,
      contrastText: blue.contrast,
    },
    secondary: {
      main: slate[400],
      light: slate[300],
      dark: slate[600],
      contrastText: ink[950],
    },
    background: {
      default: ink[950],
      paper: ink[850],
    },
    text: {
      // 9.6:1 and 5.8:1 against ink.950 — both clear AA.
      primary: '#F2F6FC',
      secondary: slate[400],
      /**
       * 5.1:1 on the *lightest* dark surface (a card on `surfaceContrast`),
       * which is the case that governs. slate[500] was fine while the darkest
       * tones were the only ones in play, but the five-step surface scale
       * introduced lighter navies and dropped it to 4.19:1 — below AA for the
       * 11px overflow tags and 12px artefact labels that use it.
       */
      disabled: '#8E9DB6',
    },
    divider: 'rgba(255,255,255,0.09)',
    success: { main: status.successDark, contrastText: ink[950] },
    warning: { main: status.warningDark, contrastText: ink[950] },
    error: { main: status.errorDark, contrastText: ink[950] },
    info: { main: status.infoDark, contrastText: ink[950] },
    brandAzure: brand.azure,
    accentText: blue.light,
    steel: brand.steel,
    // Deep navy throughout — the darkest step still carries blue.
    surfaceCanvas: ink[950],
    surfaceAlt: ink[900],
    surfaceBand: ink[850],
    surfaceRaised: ink[800],
    surfaceContrast: ink[780],
    chromeScrim: 'rgba(6, 11, 20, 0.88)',
    cardShadow: 'none',
    hairline: 'rgba(255,255,255,0.09)',
    hairlineStrong: 'rgba(255,255,255,0.18)',
    cardSurface: 'rgba(255,255,255,0.028)',
    cardSurfaceHover: 'rgba(255,255,255,0.055)',
    cardBorder: 'rgba(255,255,255,0.10)',
    cardBorderHover: 'rgba(0,121,240,0.55)',
    cardHighlight: 'rgba(255,255,255,0.14)',
    glowAzure: 'rgba(0,121,240,0.16)',
    gridLine: 'rgba(255,255,255,0.07)',
  },
};

export const lightScheme: ColorSystemOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: blue.main,
      light: '#2E86F0',
      dark: blue.dark,
      contrastText: blue.contrast,
    },
    secondary: {
      main: slate[700],
      light: slate[600],
      dark: slate[900],
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      // 17.2:1 and 7.4:1 against white.
      primary: slate[900],
      secondary: '#47576E',
      // 4.9:1 on the lightest surface. slate[500] measured 3.1:1 and failed.
      disabled: slate[600],
    },
    divider: slate[300],
    success: { main: status.successLight, contrastText: '#FFFFFF' },
    warning: { main: status.warningLight, contrastText: '#FFFFFF' },
    error: { main: status.errorLight, contrastText: '#FFFFFF' },
    info: { main: status.infoLight, contrastText: '#FFFFFF' },
    brandAzure: brand.azureDeep,
    accentText: brand.azureDeep,
    steel: slate[600],
    // A real tonal rhythm rather than sheets of white: the canvas is white and
    // each step adds a little more cool tint, so alternating sections read as
    // designed bands instead of empty rectangles.
    surfaceCanvas: '#FFFFFF',
    surfaceAlt: slate[50],
    surfaceBand: slate[100],
    surfaceRaised: slate[75],
    surfaceContrast: slate[150],
    // The header keeps the dark brand chrome in both themes — see the Logo
    // note in DESIGN_SYSTEM. Same scrim value so it does not shift on switch.
    chromeScrim: 'rgba(6, 11, 20, 0.94)',
    // Light-mode cards can land on a white canvas, where a border alone is a
    // very quiet edge. A near-invisible lift keeps them legible without
    // turning the design shadow-led.
    cardShadow: '0 1px 2px rgba(10,18,32,0.04), 0 10px 28px -18px rgba(10,18,32,0.18)',
    hairline: slate[200],
    hairlineStrong: slate[300],
    cardSurface: '#FFFFFF',
    cardSurfaceHover: '#FFFFFF',
    cardBorder: slate[200],
    cardBorderHover: 'rgba(6,77,181,0.42)',
    cardHighlight: 'rgba(6,77,181,0.10)',
    glowAzure: 'rgba(6,77,181,0.07)',
    gridLine: 'rgba(16,32,58,0.055)',
  },
};
