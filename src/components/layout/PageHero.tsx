import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Reveal } from '@/components/common/Reveal';
import { Eyebrow, GlowBackdrop, GridBackdrop } from '@/components/ui';
import { layout } from '@/theme/tokens';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lede: string;
  /** Optional supporting block: metadata rail, actions, or a small diagram. */
  aside?: ReactNode;
  children?: ReactNode;
}

/**
 * Standard opening for every inner page.
 *
 * Follows the active theme and always carries the single `h1` for the page.
 * It previously pinned itself to the dark scheme; that is now the header's
 * job alone, so a light-theme visitor gets a light hero under the navy brand
 * bar rather than a dark band that ignores their choice.
 *
 * The grid and the azure wash come from the shared primitives rather than
 * being re-declared here — this file previously carried its own copy of the
 * grid, which had already drifted from the one in `Hero`.
 */
export function PageHero({ eyebrow, title, lede, aside, children }: PageHeroProps) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: 'surfaceCanvas',
        pt: { xs: `${layout.headerHeight + 48}px`, md: `${layout.headerHeight + 72}px` },
        pb: { xs: 7, md: 10 },
        overflow: 'hidden',
        // Hairline closing the section against whatever follows it.
        borderBottom: '1px solid',
        borderColor: 'hairline',
      }}
    >
      <GridBackdrop size={80} mask="topLeft" opacity={0.7} />
      <GlowBackdrop position="topRight" spread={58} />

      <Container sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: aside ? 'minmax(0, 1.3fr) minmax(0, 1fr)' : '1fr' },
            gap: { xs: 5, md: 8 },
            alignItems: 'end',
          }}
        >
          <Box>
            <Reveal>
              <Eyebrow sx={{ mb: 3 }}>{eyebrow}</Eyebrow>
            </Reveal>

            <Reveal index={1}>
              <Typography variant="h1" component="h1" sx={{ textWrap: 'balance', maxWidth: '18ch' }}>
                {title}
              </Typography>
            </Reveal>

            <Reveal index={2}>
              <Typography
                variant="subtitle1"
                component="p"
                sx={{ mt: 3.5, color: 'text.secondary', maxWidth: '62ch' }}
              >
                {lede}
              </Typography>
            </Reveal>

            {children && <Reveal index={3}>{children}</Reveal>}
          </Box>

          {aside && (
            <Reveal index={2} variant="settle">
              {aside}
            </Reveal>
          )}
        </Box>
      </Container>
    </Box>
  );
}
