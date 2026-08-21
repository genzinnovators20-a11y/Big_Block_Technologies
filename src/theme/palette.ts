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
    /** One step above `background.paper` for nested surfaces. */
    surfaceRaised: string;
    /** Subtle 1px separator. */
    hairline: string;
    /** Stronger separator for structural edges. */
    hairlineStrong: string;
  }
  interface PaletteOptions {
    brandAzure?: string;
    accentText?: string;
    steel?: string;
    surfaceRaised?: string;
    hairline?: string;
    hairlineStrong?: string;
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
      // 5.8:1 on the darkest surface. slate[600] measured 3.6:1 and failed.
      disabled: slate[500],
    },
    divider: 'rgba(255,255,255,0.09)',
    success: { main: status.successDark, contrastText: ink[950] },
    warning: { main: status.warningDark, contrastText: ink[950] },
    error: { main: status.errorDark, contrastText: ink[950] },
    info: { main: status.infoDark, contrastText: ink[950] },
    brandAzure: brand.azure,
    accentText: blue.light,
    steel: brand.steel,
    surfaceRaised: ink[800],
    hairline: 'rgba(255,255,255,0.09)',
    hairlineStrong: 'rgba(255,255,255,0.18)',
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
      default: slate[100],
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
    surfaceRaised: slate[50],
    hairline: slate[200],
    hairlineStrong: slate[300],
  },
};
