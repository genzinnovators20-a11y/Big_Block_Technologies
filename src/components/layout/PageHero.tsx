import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Reveal } from '@/components/common/Reveal';
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
 * Always dark, so the fixed header's brand artwork stays legible, and always
 * carries the single `h1` for the page.
 */
export function PageHero({ eyebrow, title, lede, aside, children }: PageHeroProps) {
  return (
    <Box
      component="section"
      data-color-scheme="dark"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
        pt: { xs: `${layout.headerHeight + 44}px`, md: `${layout.headerHeight + 68}px` },
        pb: { xs: 7, md: 10 },
        overflow: 'hidden',
      }}
    >
      <Box
        aria-hidden="true"
        sx={(theme) => ({
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `linear-gradient(to right, ${theme.vars.palette.hairline} 1px, transparent 1px), linear-gradient(to bottom, ${theme.vars.palette.hairline} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 60% 80% at 20% 20%, #000 5%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 20% 20%, #000 5%, transparent 70%)',
          opacity: 0.7,
        })}
      />

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
              <Typography
                variant="label"
                component="p"
                sx={{ color: 'accentText', display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}
              >
                <Box
                  component="span"
                  aria-hidden="true"
                  sx={{ width: 26, height: '1px', bgcolor: 'brandAzure' }}
                />
                {eyebrow}
              </Typography>
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

          {aside && <Reveal index={2}>{aside}</Reveal>}
        </Box>
      </Container>
    </Box>
  );
}
