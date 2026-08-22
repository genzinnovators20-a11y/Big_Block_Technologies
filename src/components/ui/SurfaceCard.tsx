import type { ElementType, ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { motion, radius, surface } from '@/theme/tokens';

interface SurfaceCardProps {
  children: ReactNode;
  /** Adds hover and focus treatment. Set for anything clickable. */
  interactive?: boolean;
  /** Hairline highlight along the top edge — the card's "lit" edge. */
  highlight?: boolean;
  /** Inner padding step. */
  padding?: keyof typeof surface.padding | 'none';
  /** Renders as a link, a list item, an article — whatever the context needs. */
  component?: ElementType;
  sx?: SxProps<Theme>;
  /** Forwarded to the underlying element (`to`, `href`, `id`, handlers…). */
  [key: string]: unknown;
}

/**
 * The card primitive.
 *
 * Every card on the site is this component. Depth comes from a border, a tonal
 * fill and a single hairline along the top edge rather than a drop shadow, so
 * a card reads as a plate of material rather than a sheet floating above the
 * page — which is the difference between this and a default MUI `Card`.
 *
 * The hover treatment moves `transform` and repaints `border-color` and
 * `background-color`. None of those trigger layout, so a grid of twelve cards
 * costs nothing to hover across.
 *
 * `:focus-within` mirrors the hover state so a keyboard user sees the same
 * affordance a mouse user does.
 */
export function SurfaceCard({
  children,
  interactive = false,
  highlight = true,
  padding = 'md',
  component = 'div',
  sx,
  ...rest
}: SurfaceCardProps) {
  const pad = padding === 'none' ? 0 : surface.padding[padding];

  return (
    <Box
      component={component}
      sx={[
        (theme) => ({
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: pad,
          borderRadius: `${radius.lg}px`,
          border: '1px solid',
          borderColor: theme.vars.palette.cardBorder,
          backgroundColor: theme.vars.palette.cardSurface,
          // `none` in the dark theme, where the border and tonal fill already
          // separate the card. In the light theme a card can land on a white
          // canvas, where a hairline alone is a very quiet edge, so it gets a
          // near-invisible lift. The design stays border-led in both.
          boxShadow: theme.vars.palette.cardShadow,
          // `overflow: hidden` would clip the top highlight's rounded ends and
          // any glyph that deliberately bleeds to the card edge, so the
          // highlight is inset instead.
          transition: [
            `transform ${motion.duration.base}ms ${motion.easing.standard}`,
            `border-color ${motion.duration.base}ms ${motion.easing.standard}`,
            `background-color ${motion.duration.base}ms ${motion.easing.standard}`,
            `box-shadow ${motion.duration.base}ms ${motion.easing.standard}`,
          ].join(', '),

          ...(highlight && {
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 12,
              right: 12,
              height: '1px',
              background: `linear-gradient(to right, transparent, ${theme.vars.palette.cardHighlight}, transparent)`,
              opacity: 0.9,
              transition: `opacity ${motion.duration.base}ms ${motion.easing.standard}`,
              pointerEvents: 'none',
            },
          }),
        }),

        interactive &&
          ((theme: Theme) => ({
            cursor: 'pointer',
            '@media (hover: hover)': {
              '&:hover': {
                transform: `translate3d(0, ${surface.hoverLift}px, 0)`,
                borderColor: theme.vars.palette.cardBorderHover,
                backgroundColor: theme.vars.palette.cardSurfaceHover,
              },
              '&:hover::before': { opacity: 1 },
            },
            '&:focus-within': {
              borderColor: theme.vars.palette.cardBorderHover,
              backgroundColor: theme.vars.palette.cardSurfaceHover,
            },
            // Touch devices get the state on press instead of hover.
            '&:active': { transform: 'translate3d(0, -1px, 0)' },
            '@media (prefers-reduced-motion: reduce)': {
              '&:hover, &:active': { transform: 'none' },
            },
          })),

        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {children}
    </Box>
  );
}
