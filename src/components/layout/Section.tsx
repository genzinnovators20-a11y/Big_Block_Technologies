import type { ElementType, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { SxProps, Theme } from '@mui/material/styles';
import { layout } from '@/theme/tokens';

/**
 * Tonal register of a section.
 *
 * Five steps of tonal distance from the page canvas. The site alternates
 * between them deliberately: a page that is one uninterrupted surface has no
 * hierarchy, and alternating tone is what makes a long corporate page readable.
 *
 * These names describe *distance from the canvas*, not lightness, which is the
 * whole point. The previous names — `ink`, `light`, `paper` — encoded a colour
 * scheme, and `Section` acted on that by pinning `data-color-scheme` per
 * section. That made a global theme toggle impossible: nineteen of the site's
 * thirty-eight sections were hard-wired to a light scheme and would have
 * ignored the switch entirely.
 *
 * Now the scheme comes from the root and only the *step* comes from the tone,
 * so one set of section tones produces a coherent rhythm in either theme.
 */
export type SectionTone = 'canvas' | 'alt' | 'raised' | 'band' | 'contrast';

/** Each tone resolves to a semantic surface token defined per colour scheme. */
const toneSurface = (theme: Theme, tone: SectionTone) => {
  switch (tone) {
    case 'alt':
      return theme.vars.palette.surfaceAlt;
    case 'raised':
      return theme.vars.palette.surfaceRaised;
    case 'band':
      return theme.vars.palette.surfaceBand;
    case 'contrast':
      return theme.vars.palette.surfaceContrast;
    case 'canvas':
    default:
      return theme.vars.palette.surfaceCanvas;
  }
};

interface SectionProps {
  children: ReactNode;
  tone?: SectionTone;
  /** Vertical rhythm. `compact` is used for dense or secondary sections. */
  spacing?: 'default' | 'compact' | 'none';
  /** Hairline rule along the top edge. */
  dividerTop?: boolean;
  /** Faint engineering grid, used sparingly for structural emphasis. */
  grid?: boolean;
  /** Renders children without the page container. */
  fullBleed?: boolean;
  component?: ElementType;
  id?: string;
  'aria-labelledby'?: string;
  'aria-label'?: string;
  sx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
}

/**
 * The page section primitive.
 *
 * Owns the page background and nothing else does. It reads the active colour
 * scheme from the root rather than declaring one, so every section follows the
 * theme toggle; `tone` selects only how far the section sits from the canvas.
 */
export function Section({
  children,
  tone = 'canvas',
  spacing = 'default',
  dividerTop = false,
  grid = false,
  fullBleed = false,
  component = 'section',
  id,
  sx,
  containerSx,
  ...rest
}: SectionProps) {
  const paddingY =
    spacing === 'none'
      ? 0
      : spacing === 'compact'
        ? layout.sectionPaddingYCompact
        : layout.sectionPaddingY;

  return (
    <Box
      component={component}
      id={id}
      data-tone={tone}
      sx={[
        (theme) => ({
          position: 'relative',
          backgroundColor: toneSurface(theme, tone),
          color: theme.vars.palette.text.primary,
          paddingBlock: paddingY,
          ...(dividerTop && {
            borderTop: `1px solid ${theme.vars.palette.hairline}`,
          }),
        }),
        grid &&
          ((theme: Theme) => ({
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              backgroundImage: `linear-gradient(to right, ${theme.vars.palette.gridLine} 1px, transparent 1px), linear-gradient(to bottom, ${theme.vars.palette.gridLine} 1px, transparent 1px)`,
              backgroundSize: '72px 72px',
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 78%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 78%)',
              opacity: 0.7,
            },
          })),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {fullBleed ? (
        children
      ) : (
        <Container
          sx={[
            { position: 'relative' },
            ...(Array.isArray(containerSx) ? containerSx : [containerSx]),
          ]}
        >
          {children}
        </Container>
      )}
    </Box>
  );
}
