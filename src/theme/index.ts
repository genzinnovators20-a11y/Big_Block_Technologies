import { createTheme } from '@mui/material/styles';
import { components } from './components';
import { darkScheme, lightScheme } from './palette';
import { typography } from './typography';
import { breakpoints, elevationDark, motion, radius, spacingUnit } from './tokens';

export * from './tokens';

declare module '@mui/material/styles' {
  // Tells the type system that this application runs with CSS variables
  // enabled, which makes `theme.vars` non-optional at every call site.
  interface CssThemeVariables {
    enabled: true;
  }
}

/**
 * The single application theme.
 *
 * Both colour schemes are emitted as CSS custom properties scoped to
 * `[data-color-scheme="…"]`. Dark is the default, applied at `:root`; any
 * subtree can opt into the light scheme by setting the attribute, which is how
 * the site alternates tone between sections without a second ThemeProvider.
 */
export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-color-scheme',
  },
  defaultColorScheme: 'dark',
  colorSchemes: {
    dark: darkScheme,
    light: lightScheme,
  },

  spacing: spacingUnit,

  breakpoints: {
    values: { ...breakpoints },
  },

  shape: {
    borderRadius: radius.md,
  },

  // Depth is carried by borders and tonal shifts. The shadow ramp stays
  // shallow so surfaces read as precise rather than soft.
  shadows: [
    elevationDark[0],
    elevationDark[1],
    elevationDark[1],
    elevationDark[2],
    elevationDark[2],
    elevationDark[2],
    elevationDark[3],
    elevationDark[3],
    elevationDark[3],
    elevationDark[3],
    elevationDark[3],
    elevationDark[3],
    elevationDark[4],
    elevationDark[4],
    elevationDark[4],
    elevationDark[4],
    elevationDark[4],
    elevationDark[4],
    elevationDark[4],
    elevationDark[4],
    elevationDark[4],
    elevationDark[4],
    elevationDark[4],
    elevationDark[4],
    elevationDark[4],
  ],

  transitions: {
    duration: {
      shortest: motion.duration.instant,
      shorter: motion.duration.fast,
      short: motion.duration.base,
      standard: motion.duration.slow,
      complex: motion.duration.entrance,
      enteringScreen: motion.duration.slow,
      leavingScreen: motion.duration.fast,
    },
    easing: {
      easeInOut: motion.easing.inOut,
      easeOut: motion.easing.standard,
      easeIn: motion.easing.exit,
      sharp: motion.easing.exit,
    },
  },

  typography,
  components,
});

export default theme;
