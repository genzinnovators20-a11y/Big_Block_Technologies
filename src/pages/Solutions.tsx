import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight, Check } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/common/Reveal';
import { CallToAction } from '@/components/sections/CallToAction';
import { solutions } from '@/data/solutions';
import { layout } from '@/theme/tokens';

/**
 * Solutions.
 *
 * Organised by business outcome, and each entry leads with "signals" — the
 * symptoms a reader can match against their own situation. That is what makes
 * a solutions page navigable rather than a restatement of the services page.
 */
export default function Solutions() {
  return (
    <>
      <Seo
        title="Solutions"
        description="Solutions organised by business outcome: digital transformation, enterprise modernisation, SaaS platforms, FinTech systems, blockchain, Web3, AI-enabled applications, cloud-native systems and scalable platforms."
        path="/solutions"
      />

      <PageHero
        eyebrow="Solutions"
        title="Start from the outcome, not the technology."
        lede="Each solution below opens with the symptoms that indicate it applies. Find the description that matches what you are seeing, and the technology conversation becomes much shorter."
      />

      <Section tone="light" spacing="compact" aria-label="Solution index">
        <Reveal>
          <Typography variant="label" component="h2" sx={{ color: 'text.disabled', mb: 2.5 }}>
            Jump to
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {solutions.map((solution) => (
              <Button
                key={solution.slug}
                component="a"
                href={`#${solution.slug}`}
                variant="outlined"
                size="small"
              >
                {solution.name}
              </Button>
            ))}
          </Box>
        </Reveal>
      </Section>

      {solutions.map((solution, index) => (
        <Section
          key={solution.slug}
          id={solution.slug}
          tone={index % 2 === 0 ? 'paper' : 'light'}
          spacing="compact"
          dividerTop
          aria-labelledby={`${solution.slug}-heading`}
          sx={{ scrollMarginTop: `${layout.headerHeight}px` }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.1fr) minmax(0, 1fr)' },
              gap: { xs: 4, md: 8 },
            }}
          >
            <Reveal>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box
                  component="span"
                  aria-hidden="true"
                  sx={{ display: 'inline-flex', color: 'accentText' }}
                >
                  <solution.Icon size={22} strokeWidth={1.75} />
                </Box>
                <Typography variant="label" component="span" sx={{ color: 'text.disabled' }}>
                  {String(index + 1).padStart(2, '0')}
                </Typography>
              </Box>

              <Typography variant="h2" component="h2" id={`${solution.slug}-heading`}>
                {solution.name}
              </Typography>

              <Typography
                variant="subtitle1"
                component="p"
                sx={{ mt: 2, color: 'primary.main', fontWeight: 500 }}
              >
                {solution.outcome}
              </Typography>

              <Typography variant="body1" sx={{ mt: 2.5, color: 'text.secondary' }}>
                {solution.description}
              </Typography>

              <Button
                component={RouterLink}
                to={`/contact?solution=${solution.slug}`}
                variant="outlined"
                endIcon={<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />}
                sx={{ mt: 3.5 }}
              >
                Discuss this
              </Button>
            </Reveal>

            <Reveal index={1}>
              <Box
                sx={{
                  p: { xs: 3, md: 3.5 },
                  border: '1px solid',
                  borderColor: 'hairline',
                  borderRadius: 1,
                  bgcolor: 'surfaceRaised',
                }}
              >
                <Typography variant="label" component="h3" sx={{ color: 'accentText', mb: 2 }}>
                  This applies if
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                  {solution.signals.map((signal) => (
                    <Box
                      component="li"
                      key={signal}
                      sx={{
                        display: 'flex',
                        gap: 1.5,
                        py: 1,
                        fontSize: '0.9375rem',
                        color: 'text.secondary',
                      }}
                    >
                      <Box
                        component="span"
                        aria-hidden="true"
                        sx={{ display: 'inline-flex', mt: '3px', color: 'accentText', flexShrink: 0 }}
                      >
                        <Check size={15} strokeWidth={2.25} />
                      </Box>
                      {signal}
                    </Box>
                  ))}
                </Box>

                <Typography
                  variant="label"
                  component="h3"
                  sx={{ color: 'text.disabled', mt: 3.5, mb: 1.5 }}
                >
                  Typically includes
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                  {solution.includes.map((item) => (
                    <Box
                      component="li"
                      key={item}
                      sx={{
                        py: 1,
                        borderTop: '1px solid',
                        borderColor: 'hairline',
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                      }}
                    >
                      {item}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Reveal>
          </Box>
        </Section>
      ))}

      <CallToAction
        eyebrow="Not listed?"
        title="Describe the outcome you need."
        body="These are the patterns we see most often, not a closed list. If your situation does not match one of them, describe it directly — the interesting problems rarely arrive pre-categorised."
        secondaryLabel="See industries"
        secondaryHref="/industries"
      />
    </>
  );
}
