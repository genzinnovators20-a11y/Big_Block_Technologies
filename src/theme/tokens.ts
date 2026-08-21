/**
 * Big Block Technologies — design tokens
 *
 * Single source of truth for the visual system. Every colour, size, duration
 * and elevation used anywhere in the product resolves back to this file.
 *
 * The palette is derived from the brand mark itself rather than invented:
 *   #0079F0  the azure of the "BLOCK" wordmark  -> brand accent
 *   #064DB5  the deep blue of the cube face     -> brand depth
 *   #C8CACE  the silver of the "BIG" wordmark   -> steel / chrome details
 */

/* -------------------------------------------------------------------------
 * Colour
 * ---------------------------------------------------------------------- */

/** Raw brand colours sampled from the logo artwork. */
export const brand = {
  azure: '#0079F0',
  azureDeep: '#064DB5',
  steel: '#C8CACE',
} as const;

/**
 * Ink scale — the dark foundation. Cool, blue-shifted neutrals rather than
 * pure greys so dark surfaces stay related to the brand blue.
 */
export const ink = {
  950: '#060B14',
  900: '#0A111E',
  850: '#0E1729',
  800: '#131F35',
  700: '#1B2942',
  600: '#243452',
  500: '#334765',
} as const;

/** Cool neutral scale for light surfaces. */
export const slate = {
  50: '#F7F9FC',
  100: '#F0F4F9',
  200: '#E3EAF3',
  300: '#D2DCE9',
  400: '#A9B6CB',
  500: '#7C8CA6',
  600: '#5A6B85',
  700: '#3E4E66',
  800: '#26334A',
  900: '#0A1220',
} as const;

/**
 * Interactive blues.
 *
 * `main` is intentionally a touch deeper than the brand azure: white text on
 * #0079F0 measures 4.25:1, below the 4.5:1 required for normal-size text.
 * #0062CC measures 5.86:1 and keeps filled buttons accessible while the pure
 * brand azure is reserved for graphic accents, rules and iconography.
 */
export const blue = {
  main: '#0062CC',
  dark: '#004C9E',
  light: '#4DA3FF',
  contrast: '#FFFFFF',
} as const;

/** Status colours. Deliberately restrained — used for state, never decoration. */
export const status = {
  successDark: '#34D399',
  successLight: '#0F8A5F',
  warningDark: '#FBBF24',
  warningLight: '#A15C07',
  errorDark: '#FF6B6B',
  errorLight: '#C62828',
  infoDark: '#4DA3FF',
  infoLight: '#0062CC',
} as const;

/* -------------------------------------------------------------------------
 * Layout
 * ---------------------------------------------------------------------- */

export const layout = {
  /** Maximum width of the page grid. */
  containerMaxWidth: 1320,
  /** Narrower measure used for editorial / reading columns. */
  proseMaxWidth: '68ch',
  /** Fluid horizontal page gutter. */
  gutter: 'clamp(20px, 4vw, 48px)',
  /** Fluid vertical rhythm between major page sections. */
  sectionPaddingY: 'clamp(72px, 9vw, 140px)',
  sectionPaddingYCompact: 'clamp(48px, 6vw, 88px)',
  headerHeight: 72,
  headerHeightCondensed: 60,
} as const;

/** 8px base grid. MUI `spacing(1)` === 8px. */
export const spacingUnit = 8;

/**
 * Deliberately tight radii. Engineering precision reads as square corners;
 * pill shapes read as consumer marketing, which this brand is not.
 */
export const radius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
} as const;

export const zIndex = {
  base: 0,
  raised: 10,
  sticky: 100,
  header: 1100,
  drawer: 1200,
  assistant: 1250,
  modal: 1300,
  toast: 1400,
} as const;

/* -------------------------------------------------------------------------
 * Typography
 * ---------------------------------------------------------------------- */

export const fonts = {
  /** Display + headings. Engineered geometry, distinctive without novelty. */
  display: "'Space Grotesk', 'Segoe UI', system-ui, sans-serif",
  /** Body + UI. Neutral, high legibility at small sizes. */
  body: "'Inter Variable', 'Inter', 'Segoe UI', system-ui, sans-serif",
  /** Technical metadata only — never body copy. */
  mono: "'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace",
} as const;

/** Fluid type scale. Values are `clamp(min, preferred, max)`. */
export const fontSize = {
  display: 'clamp(2.75rem, 1.35rem + 5.2vw, 4.75rem)',
  h1: 'clamp(2.25rem, 1.45rem + 3.1vw, 3.5rem)',
  h2: 'clamp(1.875rem, 1.35rem + 2.1vw, 2.75rem)',
  h3: 'clamp(1.375rem, 1.15rem + 0.95vw, 1.875rem)',
  h4: 'clamp(1.125rem, 1.03rem + 0.4vw, 1.3125rem)',
  h5: '1.0625rem',
  h6: '0.9375rem',
  bodyLg: 'clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)',
  body: '1rem',
  bodySm: '0.9375rem',
  caption: '0.8125rem',
  label: '0.75rem',
} as const;

/* -------------------------------------------------------------------------
 * Motion
 *
 * One rhythm across the whole product. Interaction feedback is fast enough to
 * feel instant; entrances are slower and eased so they read as deliberate.
 * ---------------------------------------------------------------------- */

export const motion = {
  duration: {
    instant: 90,
    fast: 150,
    base: 200,
    slow: 300,
    entrance: 420,
  },
  easing: {
    /** Primary easing — decisive start, long settle. */
    standard: 'cubic-bezier(0.16, 1, 0.3, 1)',
    /** Symmetric easing for state changes that reverse. */
    inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    /** Exits are shorter and sharper than entrances. */
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
  },
  /** Delay between successive items in a staggered reveal. */
  stagger: 60,
} as const;

/* -------------------------------------------------------------------------
 * Elevation
 *
 * Depth comes primarily from borders and tonal shifts; shadows stay subtle so
 * the interface reads as precise rather than soft.
 * ---------------------------------------------------------------------- */

export const elevationDark = {
  0: 'none',
  1: '0 1px 2px rgba(0,0,0,0.4)',
  2: '0 4px 16px -4px rgba(0,0,0,0.5)',
  3: '0 12px 32px -8px rgba(0,0,0,0.6)',
  4: '0 24px 60px -16px rgba(0,0,0,0.7)',
} as const;

export const elevationLight = {
  0: 'none',
  1: '0 1px 2px rgba(10,18,32,0.06)',
  2: '0 6px 20px -6px rgba(10,18,32,0.12)',
  3: '0 16px 40px -12px rgba(10,18,32,0.16)',
  4: '0 28px 64px -20px rgba(10,18,32,0.20)',
} as const;

/** Breakpoints (px). Mobile-first; matches the tested device widths. */
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;
