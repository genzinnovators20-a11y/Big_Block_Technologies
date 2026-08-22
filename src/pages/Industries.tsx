import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/common/Reveal';
import { CallToAction } from '@/components/sections/CallToAction';
import { Eyebrow, IndexBadge, SurfaceCard, TagRow } from '@/components/ui';
import { industries } from '@/data/industries';
import { layout, radius } from '@/theme/tokens';

/**
 * Industries.
 *
 * Framed as challenge, then approach, then the systems built. No claims about
 * clients served or years in a sector appear, because none can be
 * substantiated; what is stated is the engineering reasoning, which stands on
 * its own.
 */
export default function Industries() {
  return (
    <>
      <Seo
        title="Industries"
        description="Engineering for FinTech, healthcare, e-commerce, logistics, real estate, education, media, manufacturing, SaaS and Web3 — framed by the failure mode specific to each sector."
        path="/industries"
      />

      <PageHero
        eyebrow="Industries"
        title="Every sector fails in a different place."
        lede="A payments ledger and a streaming pipeline have almost nothing in common architecturally. What follows is the recurring engineering problem in each sector, and how we approach it."
      />

      <Section tone="band" spacing="compact" aria-label="Industry index">
        <Reveal>
          <Typography variant="label" component="h2" sx={{ color: 'text.disabled', mb: 2.5 }}>
            Jump to
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {industries.map((industry) => (
              <Button
                key={industry.slug}
                component="a"
                href={`#${industry.slug}`}
                variant="outlined"
                size="small"
              >
                {industry.name}
              </Button>
            ))}
          </Box>
        </Reveal>
      </Section>

      <Section tone="canvas" dividerTop aria-label="Industries">
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {industries.map((industry, index) => {
            const { Icon } = industry;

            return (
              <Reveal
                key={industry.slug}
                component="li"
                index={index % 2}
                variant="settle"
                sx={{ scrollMarginTop: `${layout.headerHeight + 32}px` }}
                id={industry.slug}
              >
                <SurfaceCard padding="lg">
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: {
                        xs: '1fr',
                        md: '230px minmax(0, 1.2fr) minmax(0, 0.85fr)',
                      },
                      gap: { xs: 3, md: 5 },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box
                        aria-hidden="true"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 44,
                          height: 44,
                          flexShrink: 0,
                          borderRadius: `${radius.md}px`,
                          border: '1px solid',
                          borderColor: 'hairline',
                          bgcolor: 'action.hover',
                          color: 'accentText',
                        }}
                      >
                        <Icon size={21} strokeWidth={1.75} />
                      </Box>
                      <Box>
                        <Typography variant="h3" component="h2">
                          {industry.name}
                        </Typography>
                        <IndexBadge value={index} sx={{ display: 'block', mt: 1 }} />
                      </Box>
                    </Box>

                    <Box>
                      <Eyebrow rule={false} component="h3" sx={{ mb: 1.25 }}>
                        The challenge
                      </Eyebrow>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {industry.challenge}
                      </Typography>

                      <Eyebrow rule={false} component="h3" sx={{ mt: 3, mb: 1.25 }}>
                        Our approach
                      </Eyebrow>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {industry.approach}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="label"
                        component="h3"
                        sx={{ color: 'text.disabled', mb: 1.5 }}
                      >
                        Systems we build
                      </Typography>
                      <TagRow items={industry.systems} variant="bullet" />

                      <Button
                        component={RouterLink}
                        to={`/contact?industry=${industry.slug}`}
                        variant="outlined"
                        size="small"
                        endIcon={<ArrowRight size={14} strokeWidth={2} aria-hidden="true" />}
                        sx={{ mt: 3 }}
                      >
                        Discuss {industry.name}
                      </Button>
                    </Box>
                  </Box>
                </SurfaceCard>
              </Reveal>
            );
          })}
        </Box>
      </Section>

      <CallToAction
        eyebrow="Your sector not listed?"
        title="The engineering usually transfers."
        body="Sectors differ in their constraints more than in their architecture. Tell us what yours are — regulatory, operational or technical — and we will tell you honestly whether we are the right firm for it."
        secondaryLabel="See solutions"
        secondaryHref="/solutions"
      />
    </>
  );
}
