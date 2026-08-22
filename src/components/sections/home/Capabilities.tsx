import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { ServiceCard } from '@/components/cards';
import { IndexBadge } from '@/components/ui';
import { capabilityGroups, servicesByGroup } from '@/data/services';

/**
 * Core capabilities.
 *
 * Twelve services shown as three labelled bands of four rather than one
 * twelve-card wall. The band header carries the group's reason for existing,
 * so a reader takes in three ideas and then scans within whichever one applies
 * to them — which is a different experience from meeting twelve equivalent
 * tiles at once.
 */
export function Capabilities() {
  return (
    <Section tone="contrast" aria-labelledby="capabilities-heading">
      <SectionHeading
        eyebrow="01 / What we do"
        id="capabilities-heading"
        title="Twelve services, three kinds of work."
        lede="Build covers product and platform engineering. Run covers everything that keeps software shippable afterwards. Specialised covers the domains that need dedicated depth."
        action={
          <Button
            component={RouterLink}
            to="/services"
            variant="outlined"
            endIcon={<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />}
          >
            All services
          </Button>
        }
      />

      <Box sx={{ mt: { xs: 6, md: 8 }, display: 'flex', flexDirection: 'column', gap: { xs: 6, md: 8 } }}>
        {capabilityGroups.map((group, groupIndex) => (
          <Box key={group.id} component="section" aria-labelledby={`capability-${group.id}`}>
            <Reveal>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 300px) minmax(0, 1fr)' },
                  gap: { xs: 1.5, md: 5 },
                  alignItems: 'baseline',
                  pb: 2.5,
                  mb: { xs: 3, md: 3.5 },
                  borderBottom: '2px solid',
                  borderColor: 'brandAzure',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
                  <IndexBadge value={groupIndex} />
                  <Typography variant="h3" component="h3" id={`capability-${group.id}`}>
                    {group.title}
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {group.description}
                </Typography>
              </Box>
            </Reveal>

            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, minmax(0, 1fr))',
                  lg: 'repeat(4, minmax(0, 1fr))',
                },
                gap: { xs: 2, md: 2.5 },
              }}
            >
              {servicesByGroup(group.id).map((service, index) => (
                <Reveal key={service.id} index={index} variant="settle" component="li">
                  <ServiceCard service={service} />
                </Reveal>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Section>
  );
}
