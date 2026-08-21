import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/common/Reveal';
import { IllustrativeNotice } from '@/components/common/IllustrativeNotice';
import { CallToAction } from '@/components/sections/CallToAction';
import { caseStudies } from '@/data/caseStudies';
import { motion } from '@/theme/tokens';

/**
 * Engagement patterns index.
 *
 * The disclosure sits above the list, not buried at the bottom, because the
 * reader needs it before they interpret anything below.
 */
export default function CaseStudies() {
  return (
    <>
      <Seo
        title="Case Studies"
        description="Representative engagement patterns showing how Big Block Technologies approaches recurring problems in payments, legacy modernisation, multi-party ledgers, smart contracts, applied AI and delivery pipelines."
        path="/case-studies"
      />

      <PageHero
        eyebrow="Selected work"
        title="Six problems we are asked to solve repeatedly."
        lede="Each one is described end to end: the constraint that made it hard, the sequence of decisions taken, and the architecture that resulted."
        aside={<IllustrativeNotice />}
      />

      <Section tone="light" aria-label="Engagement patterns">
        <Box sx={{ borderTop: '1px solid', borderColor: 'hairline' }}>
          {caseStudies.map((study, index) => (
            <Reveal key={study.slug} index={index % 2}>
              <Box
                component={RouterLink}
                to={`/case-studies/${study.slug}`}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '64px minmax(0, 1fr) minmax(0, 1fr)' },
                  gap: { xs: 2, md: 4 },
                  py: { xs: 4, md: 5 },
                  borderBottom: '1px solid',
                  borderColor: 'hairline',
                  transition: `background-color ${motion.duration.fast}ms ${motion.easing.standard}`,
                  '&:hover': { bgcolor: 'action.hover' },
                  '&:hover .cs-title': { color: 'primary.main' },
                  '&:hover .cs-arrow': { opacity: 1, transform: 'translateX(0)' },
                }}
              >
                <Typography
                  variant="label"
                  component="span"
                  sx={{ color: 'accentText', display: { xs: 'none', md: 'block' }, pt: '6px' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Typography variant="label" component="span" sx={{ color: 'text.disabled' }}>
                      {study.sector}
                    </Typography>
                    <Box
                      aria-hidden="true"
                      sx={{ width: 3, height: 3, bgcolor: 'text.disabled', flexShrink: 0 }}
                    />
                    <Typography variant="label" component="span" sx={{ color: 'text.disabled' }}>
                      {study.engagement}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Typography
                      className="cs-title"
                      variant="h3"
                      component="h2"
                      sx={{ transition: `color ${motion.duration.fast}ms ${motion.easing.standard}` }}
                    >
                      {study.title}
                    </Typography>
                    <Box
                      className="cs-arrow"
                      component="span"
                      aria-hidden="true"
                      sx={{
                        display: 'inline-flex',
                        mt: '8px',
                        color: 'accentText',
                        opacity: 0,
                        transform: 'translateX(-4px)',
                        transition: `opacity ${motion.duration.fast}ms ${motion.easing.standard}, transform ${motion.duration.fast}ms ${motion.easing.standard}`,
                      }}
                    >
                      <ArrowRight size={18} strokeWidth={2} />
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {study.challenge}
                  </Typography>
                  <Box sx={{ mt: 2.5, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {study.stack.slice(0, 5).map((tech) => (
                      <Chip key={tech} label={tech} size="small" />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Section>

      <CallToAction
        eyebrow="Your problem here"
        title="Most engagements start with one of these."
        body="If one of the patterns above resembles your situation, say which — it gives us a shared starting point and saves a round of discovery."
      />
    </>
  );
}
