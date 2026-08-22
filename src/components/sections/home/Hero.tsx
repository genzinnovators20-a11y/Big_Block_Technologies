import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { BlockLattice } from '@/components/visual/BlockLattice';
import { Reveal } from '@/components/common/Reveal';
import {
  CornerTicks,
  Eyebrow,
  GlowBackdrop,
  GridBackdrop,
  PanelRow,
  TechPanel,
} from '@/components/ui';
import { disciplineSummary, heroDifferentiators } from '@/data/company';
import { fonts, layout } from '@/theme/tokens';

/**
 * Homepage hero.
 *
 * Answers the five questions the first viewport has to answer — what the
 * company does, who it serves, why it is different, what it builds with, and
 * what to do next — without becoming a poster. The artwork sits beside the
 * copy, never behind it, so nothing has to be read through a texture.
 *
 * The two floating panels are the one place on the site where a `TechPanel`
 * overlaps another element. Both state practices the site already commits to
 * elsewhere; neither pretends to be live telemetry, which is why the status
 * reads `PRACTICE` rather than the reference design's `LIVE`.
 */
export function Hero() {
  return (
    <Box
      component="section"
      aria-labelledby="hero-heading"
      sx={{
        position: 'relative',
        bgcolor: 'surfaceCanvas',
        // Clears the fixed header, which sits transparently over this section.
        pt: { xs: `${layout.headerHeight + 48}px`, md: `${layout.headerHeight + 76}px` },
        pb: { xs: 7, md: 11 },
        overflow: 'hidden',
      }}
    >
      <GridBackdrop size={80} mask="topLeft" opacity={0.75} />
      <GlowBackdrop position="topRight" spread={62} />

      <Container sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.02fr) minmax(0, 0.98fr)' },
            gap: { xs: 6, lg: 8 },
            alignItems: 'center',
          }}
        >
          {/* ------------------------------------------------------- Copy */}
          <Box>
            <Reveal>
              <Eyebrow sx={{ mb: 3 }}>Software · Blockchain · AI · Product engineering</Eyebrow>
            </Reveal>

            <Reveal index={1}>
              <Typography
                variant="display"
                component="h1"
                id="hero-heading"
                sx={{ textWrap: 'balance', maxWidth: '15ch' }}
              >
                We engineer software that{' '}
                <Box component="span" sx={{ color: 'accentText' }}>
                  holds up in production
                </Box>
                .
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
              {/* Below 380px the two labels cannot sit side by side, and
                  letting them wrap produced two buttons of different widths
                  stacked raggedly. They go full-width instead. */}
              <Box
                sx={{
                  mt: 5,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  flexWrap: 'wrap',
                  gap: 2,
                  '& > a': { width: { xs: '100%', sm: 'auto' } },
                }}
              >
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
          </Box>

          {/* ---------------------------------------------------- Artwork */}
          <Reveal index={2} variant="settle" distance={24}>
            <Box
              sx={{
                position: 'relative',
                aspectRatio: { xs: '5 / 4', lg: '1 / 1' },
                width: '100%',
                maxWidth: { xs: 560, lg: 'none' },
                mx: 'auto',
              }}
            >
              <BlockLattice />
              <CornerTicks />

              {/* Delivery standard — top right. Hidden below sm, where it would
                  cover the artwork rather than annotate it. */}
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: '2%', lg: '4%' },
                  right: { xs: '-2%', lg: '-6%' },
                  width: { xs: 236, md: 262 },
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                <TechPanel label="delivery" status="Practice" dense>
                  <PanelRow label="Arch record" value="required" marker="check" tone="accent" />
                  <PanelRow label="Tests" value="per feature" marker="check" tone="accent" />
                  <PanelRow label="Rollback" value="rehearsed" marker="check" tone="accent" />
                </TechPanel>
              </Box>

              {/* Disciplines — bottom left. */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: { xs: '0%', lg: '2%' },
                  left: { xs: '-2%', lg: '-7%' },
                  width: { xs: 232, md: 268 },
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                <TechPanel label="disciplines" status="4" statusTone="neutral" dense>
                  {disciplineSummary.map((discipline) => (
                    <Box
                      key={discipline.name}
                      sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, py: 0.5 }}
                    >
                      <Box
                        aria-hidden="true"
                        sx={{
                          width: 5,
                          height: 5,
                          mt: '6px',
                          flexShrink: 0,
                          bgcolor: 'brandAzure',
                        }}
                      />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          component="span"
                          sx={{
                            display: 'block',
                            fontFamily: fonts.mono,
                            fontSize: '0.75rem',
                            color: 'text.primary',
                          }}
                        >
                          {discipline.name}
                        </Typography>
                        <Typography
                          component="span"
                          sx={{
                            display: 'block',
                            fontFamily: fonts.mono,
                            fontSize: '0.6875rem',
                            color: 'text.disabled',
                          }}
                        >
                          {discipline.stack}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </TechPanel>
              </Box>
            </Box>
          </Reveal>
        </Box>

        {/* ------------------------------------------------ Differentiators */}
        <Box
          component="dl"
          sx={{
            m: 0,
            mt: { xs: 7, md: 10 },
            pt: { xs: 4, md: 5 },
            borderTop: '1px solid',
            borderColor: 'hairline',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
            gap: { xs: 3, sm: 4, md: 6 },
          }}
        >
          {heroDifferentiators.map((item, index) => (
            <Reveal key={item.label} index={index} component="div">
              <Typography variant="label" component="dt" sx={{ color: 'accentText', mb: 1.5 }}>
                {item.label}
              </Typography>
              <Box component="dd" sx={{ m: 0 }}>
                <Typography variant="h5" component="p">
                  {item.value}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  {item.detail}
                </Typography>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
