import type { ElementType, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { SxProps, Theme } from '@mui/material/styles';
import { layout } from '@/theme/tokens';

/**
 * Tonal register of a section.
 *
 * The site alternates between these deliberately. A page that is one
 * uninterrupted dark canvas has no hierarchy; alternating tone is what makes
 * a long corporate page readable and gives each section a reason to feel
 * distinct from its neighbour.
 */
export type SectionTone = 'ink' | 'deep' | 'panel' | 'light' | 'paper';

const LIGHT_TONES: SectionTone[] = ['light', 'paper'];

/** Each tone resolves to a palette variable, so one tone name produces the
 *  correct surface in whichever colour scheme the section activates. */
const toneSurface = (theme: Theme, tone: SectionTone) => {
  switch (tone) {
    case 'deep':
    case 'paper':
      return theme.vars.palette.background.paper;
    case 'panel':
      return theme.vars.palette.surfaceRaised;
    case 'ink':
    case 'light':
    default:
      return theme.vars.palette.background.default;
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
 * Setting `data-color-scheme` here re-declares every MUI palette custom
 * property for the subtree, so components rendered inside a light section pick
 * up light colours automatically — no nested ThemeProvider, no manual colour
 * props, and no chance of a dark input landing on a white card.
 */
export function Section({
  children,
  tone = 'ink',
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
  const isLight = LIGHT_TONES.includes(tone);

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
      data-color-scheme={isLight ? 'light' : 'dark'}
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
              backgroundImage: `linear-gradient(to right, ${theme.vars.palette.hairline} 1px, transparent 1px), linear-gradient(to bottom, ${theme.vars.palette.hairline} 1px, transparent 1px)`,
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
