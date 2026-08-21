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
import { industries } from '@/data/industries';
import { layout } from '@/theme/tokens';

/**
 * Industries.
 *
 * Framed as challenge → approach → systems. No claims about clients served or
 * years in a sector appear, because none can be substantiated; what is stated
 * is the engineering reasoning, which stands on its own.
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

      <Section tone="light" spacing="compact" aria-label="Industry index">
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

      <Section tone="ink" spacing="none" dividerTop aria-label="Industries">
        <Box sx={{ py: { xs: 2, md: 3 } }}>
          {industries.map((industry, index) => (
            <Reveal
              key={industry.slug}
              component="article"
              index={index % 2}
              sx={{
                scrollMarginTop: `${layout.headerHeight + 24}px`,
                py: { xs: 4, md: 5.5 },
                borderBottom: '1px solid',
                borderColor: 'hairline',
                '&:last-of-type': { borderBottom: 'none' },
              }}
            >
              <Box
                id={industry.slug}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '250px minmax(0, 1.15fr) minmax(0, 0.85fr)' },
                  gap: { xs: 2.5, md: 5 },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    component="span"
                    aria-hidden="true"
                    sx={{ display: 'inline-flex', mt: '3px', color: 'accentText', flexShrink: 0 }}
                  >
                    <industry.Icon size={22} strokeWidth={1.75} />
                  </Box>
                  <Box>
                    <Typography variant="h3" component="h2">
                      {industry.name}
                    </Typography>
                    <Typography variant="label" component="p" sx={{ color: 'text.disabled', mt: 1 }}>
                      {String(index + 1).padStart(2, '0')}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="label" component="h3" sx={{ color: 'accentText', mb: 1.25 }}>
                    The challenge
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {industry.challenge}
                  </Typography>

                  <Typography
                    variant="label"
                    component="h3"
                    sx={{ color: 'accentText', mt: 3, mb: 1.25 }}
                  >
                    Our approach
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {industry.approach}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="label" component="h3" sx={{ color: 'text.disabled', mb: 1.5 }}>
                    Systems we build
                  </Typography>
                  <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                    {industry.systems.map((system) => (
                      <Box
                        component="li"
                        key={system}
                        sx={{
                          py: 1,
                          borderTop: '1px solid',
                          borderColor: 'hairline',
                          fontSize: '0.9375rem',
                          color: 'text.secondary',
                        }}
                      >
                        {system}
                      </Box>
                    ))}
                  </Box>

                  <Button
                    component={RouterLink}
                    to={`/contact?industry=${industry.slug}`}
                    variant="text"
                    size="small"
                    endIcon={<ArrowRight size={14} strokeWidth={2} aria-hidden="true" />}
                    sx={{ mt: 2, ml: -1.25 }}
                  >
                    Discuss {industry.name}
                  </Button>
                </Box>
              </Box>
            </Reveal>
          ))}
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
