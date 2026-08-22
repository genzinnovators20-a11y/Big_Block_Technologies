import { useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';
import { Moon, Sun } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ink, motion, surface } from '@/theme/tokens';

/**
 * Attribute set on `<html>` for the duration of a theme switch.
 *
 * The cross-fade is applied only while it is present, so the transition never
 * competes with a component's own hover timings and there is no permanent
 * `transition` on every element in the document. See `MuiCssBaseline`.
 */
const SWITCHING_ATTR = 'data-theme-switching';

/** Mirrors `lightScheme.palette.surfaceCanvas`. */
const LIGHT_CANVAS = '#FFFFFF';

interface ThemeToggleProps {
  /** `bar` sits in the header rail; `row` is a full-width row in the drawer. */
  variant?: 'bar' | 'row';
}

/**
 * Light/dark switch.
 *
 * Uses MUI's own `useColorScheme`, which already persists the choice to
 * `localStorage` and writes the `data-color-scheme` attribute this theme is
 * keyed on — so no extra state library, no extra dependency, and no second
 * source of truth alongside the theme.
 *
 * The accessible name states the *action* rather than the current state
 * ("Switch to light theme"), because a control named after its current state
 * is ambiguous when read out of context.
 */
export function ThemeToggle({ variant = 'bar' }: ThemeToggleProps) {
  const { mode, setMode } = useColorScheme();
  const reducedMotion = usePrefersReducedMotion();

  // `mode` is undefined until the provider has read storage on the client.
  // Treating that as dark matches `defaultMode`, so the icon never flips after
  // mount for the common case.
  const isDark = mode !== 'light';
  const nextLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  const toggle = useCallback(() => {
    if (!reducedMotion && typeof document !== 'undefined') {
      const root = document.documentElement;
      root.setAttribute(SWITCHING_ATTR, '');
      window.setTimeout(() => root.removeAttribute(SWITCHING_ATTR), surface.themeSwitchMs + 40);
    }
    const next = isDark ? 'light' : 'dark';
    setMode(next);

    // Keeps the mobile browser's address bar in step with the page. The
    // values come from the palette so they cannot drift from the canvas.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'light' ? LIGHT_CANVAS : ink[950]);
  }, [isDark, reducedMotion, setMode]);

  const Icon = isDark ? Sun : Moon;

  const button = (
    <IconButton
      onClick={toggle}
      aria-label={nextLabel}
      // A native tooltip rather than MUI's. `Tooltip` is the only thing on the
      // site that would pull in Popper, and it cost 10 kB gzipped in the MUI
      // vendor chunk to render one hover hint that `title` already gives free.
      title={nextLabel}
      sx={{
        color: 'text.secondary',
        borderRadius: '4px',
        border: '1px solid',
        borderColor: 'transparent',
        transition: `color ${motion.duration.fast}ms ${motion.easing.standard}, border-color ${motion.duration.fast}ms ${motion.easing.standard}, background-color ${motion.duration.fast}ms ${motion.easing.standard}`,
        '&:hover': {
          color: 'text.primary',
          borderColor: 'hairline',
          bgcolor: 'action.hover',
        },
        ...(variant === 'row' && {
          width: '100%',
          justifyContent: 'flex-start',
          gap: 1.5,
          px: 1.5,
          fontSize: '1rem',
          fontWeight: 500,
        }),
      }}
    >
      {/* The icon rotates a few degrees on switch rather than spinning: enough
          to acknowledge the change, not enough to draw the eye away from the
          page that just changed colour. */}
      <Icon
        size={18}
        strokeWidth={1.75}
        aria-hidden="true"
        style={{
          flexShrink: 0,
          transition: reducedMotion
            ? undefined
            : `transform ${motion.duration.base}ms ${motion.easing.standard}`,
        }}
      />
      {variant === 'row' && <span>{isDark ? 'Light theme' : 'Dark theme'}</span>}
    </IconButton>
  );

  return button;
}
