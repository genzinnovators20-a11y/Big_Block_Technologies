import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { IllustrativeNotice } from '@/components/common/IllustrativeNotice';
import { caseStudies } from '@/data/caseStudies';
import { motion } from '@/theme/tokens';

const featured = caseStudies.slice(0, 3);

/**
 * Engagement patterns.
 *
 * Presented editorially — an index number, the problem, the approach — rather
 * than as cards with metrics, because there are no verified metrics to show.
 */
export function FeaturedWork() {
  return (
    <Section tone="ink" dividerTop aria-labelledby="work-heading">
      <SectionHeading
        eyebrow="05 / Selected work"
        id="work-heading"
        title="How we approach recurring problems."
        lede="Six patterns that come up repeatedly across sectors, described end to end — the constraint, the sequence of decisions, and the architecture each produced."
        action={
          <Button
            component={RouterLink}
            to="/case-studies"
            variant="outlined"
            endIcon={<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />}
          >
            All engagements
          </Button>
        }
      />

      <Box sx={{ mt: 4, maxWidth: 680 }}>
        <Reveal>
          <IllustrativeNotice compact />
        </Reveal>
      </Box>

      <Box sx={{ mt: { xs: 5, md: 7 }, borderTop: '1px solid', borderColor: 'hairline' }}>
        {featured.map((study, index) => (
          <Reveal key={study.slug} index={index}>
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
                '&:hover .work-title': { color: 'primary.light' },
                '&:hover .work-arrow': { opacity: 1, transform: 'translateX(0)' },
              }}
            >
              <Typography
                variant="label"
                component="span"
                sx={{ color: 'accentText', display: { xs: 'none', md: 'block' }, pt: '5px' }}
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
                    className="work-title"
                    variant="h3"
                    component="h3"
                    sx={{ transition: `color ${motion.duration.fast}ms ${motion.easing.standard}` }}
                  >
                    {study.title}
                  </Typography>
                  <Box
                    className="work-arrow"
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
                  {study.stack.slice(0, 4).map((tech) => (
                    <Chip key={tech} label={tech} size="small" />
                  ))}
                </Box>
              </Box>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
