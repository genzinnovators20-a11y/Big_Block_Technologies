import type { Components, Theme } from '@mui/material/styles';
import { fonts, layout, motion, radius, surface } from './tokens';

const transition = (props: string[], ms: number = motion.duration.base) =>
  props.map((p) => `${p} ${ms}ms ${motion.easing.standard}`).join(', ');

/**
 * Component layer.
 *
 * MUI supplies the behaviour, accessibility plumbing and composition model.
 * These overrides replace the Material *look* — ripples, pill radii, uppercase
 * labels and heavy drop shadows — with the flatter, squarer, border-led
 * language the brand calls for.
 */
export const components: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: (theme) => ({
      '*, *::before, *::after': { boxSizing: 'border-box' },

      html: {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
        scrollBehavior: 'smooth',
        // Anchor targets clear the fixed header.
        scrollPaddingTop: layout.headerHeight + 24,
      },

      body: {
        // Guarantees no accidental horizontal scrolling anywhere in the site.
        overflowX: 'hidden',
        backgroundColor: theme.vars.palette.background.default,
      },

      /**
       * Theme cross-fade.
       *
       * Present only while a switch is in flight — `ThemeToggle` adds the
       * attribute and removes it ~240ms later. Scoping it this way means the
       * document does not carry a permanent `transition` on every element,
       * which would both cost paint time on scroll and make component hover
       * states feel sluggish.
       *
       * `!important` is load-bearing here and deliberately confined to this
       * one rule: it has to outrank the per-component transitions for the
       * duration of the switch, otherwise a card would cross-fade its border
       * at its own 200ms hover timing and the page would arrive in pieces.
       * Only paint properties are listed — nothing here can trigger layout.
       */
      '[data-theme-switching]': {
        '&, & *, & *::before, & *::after': {
          transition: `background-color ${surface.themeSwitchMs}ms ${motion.easing.inOut}, border-color ${surface.themeSwitchMs}ms ${motion.easing.inOut}, color ${surface.themeSwitchMs}ms ${motion.easing.inOut}, fill ${surface.themeSwitchMs}ms ${motion.easing.inOut}, box-shadow ${surface.themeSwitchMs}ms ${motion.easing.inOut} !important`,
        },
      },

      // Respect the user's motion preference globally. Individual components
      // additionally read the preference so they can skip the work entirely.
      '@media (prefers-reduced-motion: reduce)': {
        html: { scrollBehavior: 'auto' },
        '*, *::before, *::after': {
          animationDuration: '0.01ms !important',
          animationIterationCount: '1 !important',
          transitionDuration: '0.01ms !important',
          scrollBehavior: 'auto !important',
        },
        // The theme switch becomes instant rather than a fade.
        '[data-theme-switching], [data-theme-switching] *': {
          transition: 'none !important',
        },
      },

      // A single, unmistakable focus treatment used across the whole product.
      ':focus-visible': {
        outline: `2px solid ${theme.vars.palette.brandAzure}`,
        outlineOffset: 2,
        borderRadius: radius.xs,
      },

      '::selection': {
        backgroundColor: theme.vars.palette.brandAzure,
        color: '#FFFFFF',
      },

      // Anchors are styled per component. The browser default underline would
      // otherwise appear on every navigation and card link in the site.
      a: { textDecoration: 'none', color: 'inherit' },

      // Media never overflows its column.
      'img, svg, video, canvas': { display: 'block', maxWidth: '100%' },

      '::-webkit-scrollbar': { width: 10, height: 10 },
      '::-webkit-scrollbar-track': { background: 'transparent' },
      '::-webkit-scrollbar-thumb': {
        background: theme.vars.palette.hairlineStrong,
        borderRadius: 10,
        border: '2px solid transparent',
        backgroundClip: 'content-box',
      },
      '::-webkit-scrollbar-thumb:hover': { background: theme.vars.palette.text.disabled },
    }),
  },

  MuiContainer: {
    defaultProps: { maxWidth: false },
    styleOverrides: {
      root: {
        maxWidth: layout.containerMaxWidth,
        paddingLeft: layout.gutter,
        paddingRight: layout.gutter,
        '@media (min-width:600px)': {
          paddingLeft: layout.gutter,
          paddingRight: layout.gutter,
        },
      },
    },
  },

  MuiButtonBase: {
    // Material's ink ripple is the single strongest "this is a stock MUI site"
    // signal. Replaced by precise colour and border state changes.
    defaultProps: { disableRipple: true },
    styleOverrides: {
      root: ({ theme }) => ({
        // MUI's own ButtonBase reset declares `outline: 0` from a class
        // selector, which outranks the bare `:focus-visible` rule in
        // CssBaseline. The result was that plain links showed a focus ring and
        // every button — including all the calls to action — showed nothing at
        // all to a keyboard user. Re-declaring it here restores parity.
        '&.Mui-focusVisible': {
          outline: `2px solid ${theme.vars.palette.brandAzure}`,
          outlineOffset: 2,
        },
      }),
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true, variant: 'contained' },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: radius.sm,
        fontWeight: 600,
        letterSpacing: 0,
        textTransform: 'none',
        // Comfortably above the 44px minimum touch target.
        minHeight: 46,
        paddingInline: 22,
        transition: transition(
          ['background-color', 'border-color', 'color', 'transform'],
          motion.duration.fast,
        ),
        '&:active': { transform: 'translateY(1px)' },
        '&.Mui-disabled': { opacity: 0.45 },
        '& .MuiButton-startIcon > *, & .MuiButton-endIcon > *': { fontSize: 18 },
        [theme.breakpoints.down('sm')]: { paddingInline: 18 },
      }),
      sizeSmall: {
        minHeight: 38,
        paddingInline: 14,
        fontSize: '0.8125rem',
        // A 38px control is comfortable with a mouse but below the 44px
        // minimum for a fingertip, so the floor is raised on touch devices
        // only rather than making every desktop control chunky.
        '@media (pointer: coarse)': { minHeight: 44 },
      },
      sizeLarge: { minHeight: 54, paddingInline: 28, fontSize: '1rem' },
      contained: ({ theme }) => ({
        backgroundColor: theme.vars.palette.primary.main,
        color: theme.vars.palette.primary.contrastText,
        '&:hover': { backgroundColor: theme.vars.palette.primary.dark },
      }),
      outlined: ({ theme }) => ({
        borderColor: theme.vars.palette.hairlineStrong,
        color: theme.vars.palette.text.primary,
        backgroundColor: 'transparent',
        '&:hover': {
          borderColor: theme.vars.palette.brandAzure,
          backgroundColor: 'transparent',
          color: theme.vars.palette.text.primary,
        },
      }),
      text: ({ theme }) => ({
        paddingInline: 10,
        color: theme.vars.palette.text.primary,
        '&:hover': { backgroundColor: theme.vars.palette.action.hover },
      }),
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: radius.sm,
        // Icon-only controls still need a full-size touch target.
        minWidth: 44,
        minHeight: 44,
        color: theme.vars.palette.text.secondary,
        transition: transition(['background-color', 'color'], motion.duration.fast),
        '&:hover': {
          color: theme.vars.palette.text.primary,
          backgroundColor: theme.vars.palette.action.hover,
        },
      }),
    },
  },

  MuiPaper: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: 'none',
        borderRadius: radius.md,
        border: `1px solid ${theme.vars.palette.hairline}`,
      }),
    },
  },

  MuiLink: {
    defaultProps: { underline: 'none' },
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.vars.palette.primary.light,
        textUnderlineOffset: '0.22em',
        textDecorationThickness: '1px',
        transition: transition(['color'], motion.duration.fast),
        '&:hover': { textDecoration: 'underline' },
      }),
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: radius.xs,
        fontFamily: fonts.mono,
        fontSize: '0.75rem',
        letterSpacing: '0.04em',
        height: 26,
        backgroundColor: 'transparent',
        border: `1px solid ${theme.vars.palette.hairline}`,
        color: theme.vars.palette.text.secondary,
      }),
      label: { paddingInline: 9 },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({ borderColor: theme.vars.palette.hairline }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: radius.sm,
        backgroundColor: theme.vars.palette.surfaceRaised,
        transition: transition(['border-color', 'background-color'], motion.duration.fast),
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.vars.palette.hairlineStrong,
          transition: transition(['border-color'], motion.duration.fast),
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.vars.palette.text.disabled,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: 2,
          borderColor: theme.vars.palette.brandAzure,
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.vars.palette.error.main,
        },
      }),
      input: {
        // 16px minimum prevents iOS Safari zooming the page on focus.
        fontSize: '1rem',
        paddingBlock: 14,
        '&::placeholder': { opacity: 0.6 },
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: '0.9375rem',
        '&.Mui-focused': { color: theme.vars.palette.text.primary },
      }),
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: { marginLeft: 0, marginTop: 6, fontSize: '0.8125rem' },
    },
  },

  MuiFormLabel: {
    styleOverrides: {
      asterisk: ({ theme }) => ({ color: theme.vars.palette.error.main }),
    },
  },

  MuiSelect: {
    styleOverrides: { select: { paddingBlock: 14 } },
  },

  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: radius.md,
        border: `1px solid ${theme.vars.palette.hairline}`,
        backgroundImage: 'none',
      }),
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: { minHeight: 44, fontSize: '0.9375rem' },
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        backgroundColor: theme.vars.palette.surfaceRaised,
        border: `1px solid ${theme.vars.palette.hairline}`,
        color: theme.vars.palette.text.primary,
        fontSize: '0.8125rem',
        borderRadius: radius.sm,
        paddingBlock: 7,
        paddingInline: 10,
      }),
    },
  },

  MuiAccordion: {
    defaultProps: { disableGutters: true, elevation: 0, square: true },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: 'transparent',
        border: 'none',
        borderTop: `1px solid ${theme.vars.palette.hairline}`,
        borderRadius: 0,
        '&::before': { display: 'none' },
        '&:last-of-type': { borderBottom: `1px solid ${theme.vars.palette.hairline}` },
      }),
    },
  },

  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        minHeight: 68,
        paddingInline: 0,
        '&.Mui-expanded': { minHeight: 68 },
      },
      content: { marginBlock: 18, '&.Mui-expanded': { marginBlock: 18 } },
    },
  },

  MuiAccordionDetails: {
    styleOverrides: { root: { paddingInline: 0, paddingBottom: 28, paddingTop: 0 } },
  },

  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 48,
        borderBottom: `1px solid ${theme.vars.palette.hairline}`,
      }),
      indicator: ({ theme }) => ({ height: 2, backgroundColor: theme.vars.palette.brandAzure }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 48,
        textTransform: 'none',
        fontSize: '0.9375rem',
        fontWeight: 500,
        letterSpacing: 0,
        color: theme.vars.palette.text.secondary,
        '&.Mui-selected': { color: theme.vars.palette.text.primary },
      }),
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundImage: 'none',
        backgroundColor: theme.vars.palette.background.default,
        borderRadius: 0,
      }),
    },
  },

  MuiBackdrop: {
    styleOverrides: {
      // Strong enough to isolate foreground content in both schemes.
      root: { backgroundColor: 'rgba(3, 7, 13, 0.66)' },
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: { borderRadius: radius.sm, fontSize: '0.9375rem', alignItems: 'flex-start' },
    },
  },

  MuiSkeleton: {
    defaultProps: { animation: 'wave' },
    styleOverrides: { root: { borderRadius: radius.sm } },
  },

  MuiCircularProgress: {
    defaultProps: { thickness: 4 },
  },
};
