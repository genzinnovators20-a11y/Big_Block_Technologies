import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { industries } from '@/data/industries';
import { motion } from '@/theme/tokens';

/**
 * Industries.
 *
 * Each row leads with the sector's recurring engineering problem rather than
 * a claim about experience in it, since no client work can be cited.
 */
export function IndustriesGrid() {
  return (
    <Section tone="paper" aria-labelledby="industries-heading">
      <SectionHeading
        eyebrow="04 / Industries"
        id="industries-heading"
        title="Different sectors fail in different places."
        lede="The architecture that suits a payments ledger is wrong for a streaming pipeline. We start from the failure mode that is specific to the sector."
        action={
          <Button
            component={RouterLink}
            to="/industries"
            variant="outlined"
            endIcon={<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />}
          >
            All industries
          </Button>
        }
      />

      <Box
        sx={{
          mt: { xs: 6, md: 8 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
          columnGap: { md: 6 },
          borderTop: '1px solid',
          borderColor: 'hairline',
        }}
      >
        {industries.map((industry, index) => (
          <Reveal key={industry.slug} index={index % 2}>
            <Box
              component={RouterLink}
              to={`/industries#${industry.slug}`}
              sx={{
                display: 'flex',
                gap: 2.5,
                py: 3,
                borderBottom: '1px solid',
                borderColor: 'hairline',
                height: '100%',
                transition: `background-color ${motion.duration.fast}ms ${motion.easing.standard}`,
                '&:hover': { bgcolor: 'action.hover' },
                '&:hover .ind-name': { color: 'primary.main' },
                '&:hover .ind-arrow': { opacity: 1, transform: 'translateX(0)' },
              }}
            >
              <Box
                component="span"
                aria-hidden="true"
                sx={{ display: 'inline-flex', mt: '3px', color: 'accentText', flexShrink: 0 }}
              >
                <industry.Icon size={20} strokeWidth={1.75} />
              </Box>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    className="ind-name"
                    variant="h5"
                    component="h3"
                    sx={{ transition: `color ${motion.duration.fast}ms ${motion.easing.standard}` }}
                  >
                    {industry.name}
                  </Typography>
                  <Box
                    className="ind-arrow"
                    component="span"
                    aria-hidden="true"
                    sx={{
                      display: 'inline-flex',
                      color: 'accentText',
                      opacity: 0,
                      transform: 'translateX(-4px)',
                      transition: `opacity ${motion.duration.fast}ms ${motion.easing.standard}, transform ${motion.duration.fast}ms ${motion.easing.standard}`,
                    }}
                  >
                    <ArrowRight size={14} strokeWidth={2} />
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  {industry.challenge}
                </Typography>
              </Box>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
