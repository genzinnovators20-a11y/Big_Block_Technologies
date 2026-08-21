import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { capabilityGroups, servicesByGroup } from '@/data/services';
import { motion } from '@/theme/tokens';

/**
 * Core capabilities.
 *
 * Twelve services presented as three grouped indexes rather than twelve
 * identical cards. Rows carry an icon, a name and a one-line summary, which
 * scans far faster than a card grid and avoids the repetitive
 * three-cards-per-row rhythm that makes corporate pages interchangeable.
 */
export function Capabilities() {
  return (
    <Section tone="deep" dividerTop aria-labelledby="capabilities-heading">
      <SectionHeading
        eyebrow="01 / Capabilities"
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

      <Box
        sx={{
          mt: { xs: 6, md: 9 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
          gap: { xs: 5, md: 4 },
        }}
      >
        {capabilityGroups.map((group, groupIndex) => (
          <Reveal key={group.id} index={groupIndex}>
            <Box
              sx={{
                height: '100%',
                pt: 3,
                borderTop: '2px solid',
                borderColor: 'brandAzure',
              }}
            >
              <Typography variant="h4" component="h3">
                {group.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1.5, color: 'text.secondary', minHeight: { md: 66 } }}>
                {group.description}
              </Typography>

              <Box component="ul" sx={{ listStyle: 'none', m: 0, mt: 3, p: 0 }}>
                {servicesByGroup(group.id).map((service) => (
                  <Box component="li" key={service.id}>
                    <Box
                      component={RouterLink}
                      to={`/services#${service.id}`}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        py: 2,
                        borderTop: '1px solid',
                        borderColor: 'hairline',
                        transition: `border-color ${motion.duration.fast}ms ${motion.easing.standard}`,
                        '&:hover': { borderColor: 'hairlineStrong' },
                        '&:hover .cap-name': { color: 'primary.light' },
                        '&:hover .cap-icon': { color: 'accentText' },
                      }}
                    >
                      <Box
                        className="cap-icon"
                        component="span"
                        aria-hidden="true"
                        sx={{
                          display: 'inline-flex',
                          mt: '2px',
                          color: 'text.disabled',
                          transition: `color ${motion.duration.fast}ms ${motion.easing.standard}`,
                        }}
                      >
                        <service.Icon size={18} strokeWidth={1.75} />
                      </Box>

                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          className="cap-name"
                          variant="subtitle2"
                          component="span"
                          sx={{
                            display: 'block',
                            transition: `color ${motion.duration.fast}ms ${motion.easing.standard}`,
                          }}
                        >
                          {service.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          component="span"
                          sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}
                        >
                          {service.summary}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
