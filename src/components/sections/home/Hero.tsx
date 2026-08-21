import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { BlockLattice } from '@/components/visual/BlockLattice';
import { Reveal } from '@/components/common/Reveal';
import { layout } from '@/theme/tokens';

/** The three claims that differentiate the practice, each independently verifiable. */
const differentiators = [
  { label: 'Architecture', value: 'Decisions written down' },
  { label: 'Quality', value: 'Tests before hardening' },
  { label: 'Ownership', value: 'You own everything built' },
];

/**
 * Homepage hero.
 *
 * Says what the company does, who it serves and why it is different, in that
 * order, without a single word of the "transforming the future" register.
 */
export function Hero() {
  return (
    <Box
      component="section"
      data-color-scheme="dark"
      aria-labelledby="hero-heading"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
        // Clears the fixed header, which sits transparently over this section.
        pt: { xs: `${layout.headerHeight + 48}px`, md: `${layout.headerHeight + 72}px` },
        pb: { xs: 8, md: 12 },
        overflow: 'hidden',
      }}
    >
      {/* Structural grid, masked so it fades rather than tiling to the edges. */}
      <Box
        aria-hidden="true"
        sx={(theme) => ({
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `linear-gradient(to right, ${theme.vars.palette.hairline} 1px, transparent 1px), linear-gradient(to bottom, ${theme.vars.palette.hairline} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 30% 30%, #000 10%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 30% 30%, #000 10%, transparent 75%)',
          opacity: 0.75,
        })}
      />

      <Container sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.05fr) minmax(0, 0.95fr)' },
            gap: { xs: 6, lg: 8 },
            alignItems: 'center',
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
                Technology engineering &amp; consulting
              </Typography>
            </Reveal>

            <Reveal index={1}>
              <Typography
                variant="display"
                component="h1"
                id="hero-heading"
                sx={{ textWrap: 'balance', maxWidth: '15ch' }}
              >
                We engineer software that holds up in production.
              </Typography>
            </Reveal>

            <Reveal index={2}>
              <Typography
                variant="subtitle1"
                component="p"
                sx={{ mt: 4, color: 'text.secondary', maxWidth: '58ch' }}
              >
                Big Block Technologies designs, builds and operates custom software, cloud-native
                platforms and blockchain infrastructure — for startups finding product-market fit,
                growth companies hitting architectural limits, and enterprises modernising systems
                they cannot switch off.
              </Typography>
            </Reveal>

            <Reveal index={3}>
              <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  component={RouterLink}
                  to="/contact"
                  size="large"
                  endIcon={<ArrowRight size={17} strokeWidth={2} aria-hidden="true" />}
                >
                  Start a Project
                </Button>
                <Button component={RouterLink} to="/services" variant="outlined" size="large">
                  Explore capabilities
                </Button>
              </Box>
            </Reveal>

            <Reveal index={4}>
              <Box
                component="dl"
                sx={{
                  mt: { xs: 6, md: 8 },
                  m: 0,
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
                  gap: 0,
                  borderTop: '1px solid',
                  borderColor: 'hairline',
                }}
              >
                {differentiators.map((item, index) => (
                  <Box
                    key={item.label}
                    sx={{
                      pt: 2.5,
                      pb: { xs: 2.5, sm: 0 },
                      pl: { xs: 0, sm: index === 0 ? 0 : 3 },
                      borderBottom: { xs: '1px solid', sm: 'none' },
                      borderColor: 'hairline',
                      borderLeft: { xs: 'none', sm: index === 0 ? 'none' : '1px solid' },
                      '&:last-of-type': { borderBottom: 'none' },
                    }}
                  >
                    <Typography variant="label" component="dt" sx={{ color: 'text.disabled', mb: 1 }}>
                      {item.label}
                    </Typography>
                    <Typography variant="subtitle2" component="dd" sx={{ m: 0 }}>
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Reveal>
          </Box>

          {/* Technical-drawing frame: corner ticks rather than a rounded card. */}
          <Reveal index={2} distance={24}>
            <Box
              sx={{
                position: 'relative',
                aspectRatio: { xs: '4 / 3', lg: '1 / 1' },
                width: '100%',
                maxWidth: { xs: 520, lg: 'none' },
                mx: 'auto',
              }}
            >
              <BlockLattice />

              {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
                <Box
                  key={corner}
                  aria-hidden="true"
                  sx={{
                    position: 'absolute',
                    width: 14,
                    height: 14,
                    borderColor: 'hairlineStrong',
                    ...(corner === 'tl' && {
                      top: 0,
                      left: 0,
                      borderTop: '1px solid',
                      borderLeft: '1px solid',
                    }),
                    ...(corner === 'tr' && {
                      top: 0,
                      right: 0,
                      borderTop: '1px solid',
                      borderRight: '1px solid',
                    }),
                    ...(corner === 'bl' && {
                      bottom: 0,
                      left: 0,
                      borderBottom: '1px solid',
                      borderLeft: '1px solid',
                    }),
                    ...(corner === 'br' && {
                      bottom: 0,
                      right: 0,
                      borderBottom: '1px solid',
                      borderRight: '1px solid',
                    }),
                  }}
                />
              ))}
            </Box>
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
