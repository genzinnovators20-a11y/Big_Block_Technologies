import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/common/Reveal';
import { disciplines, openRoles } from '@/data/careers';
import { fonts } from '@/theme/tokens';

/**
 * Careers teaser.
 *
 * Reports the real state of hiring. With no vacancies published, it says so
 * and routes to an open application rather than implying roles exist.
 */
export function CareersTeaser() {
  const hasRoles = openRoles.length > 0;

  return (
    <Section tone="deep" spacing="compact" dividerTop aria-labelledby="careers-heading">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1fr)' },
          gap: { xs: 4, md: 8 },
          alignItems: 'center',
        }}
      >
        <Reveal>
          <Typography variant="label" component="p" sx={{ color: 'accentText', mb: 2.5 }}>
            08 / Careers
          </Typography>
          <Typography variant="h2" component="h2" id="careers-heading" sx={{ textWrap: 'balance' }}>
            Engineers who want to own the decision, not just the ticket.
          </Typography>
          <Typography variant="body1" sx={{ mt: 3, color: 'text.secondary' }}>
            {hasRoles
              ? `We are currently hiring across ${openRoles.length === 1 ? 'one discipline' : 'several disciplines'}. Every application is read by a person, and you get an answer either way.`
              : 'There are no vacancies published right now. We still read speculative applications, and strong ones stay on file — tell us which discipline you work in and what you want to build.'}
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/careers"
              variant="outlined"
              endIcon={<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />}
            >
              {hasRoles ? 'View open roles' : 'Careers & culture'}
            </Button>
          </Box>
        </Reveal>

        <Reveal index={1}>
          <Box sx={{ borderTop: '1px solid', borderColor: 'hairline', pt: 3 }}>
            <Typography variant="label" component="h3" sx={{ color: 'text.disabled', mb: 2 }}>
              Disciplines we recruit into
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {disciplines.map((discipline) => (
                <Box
                  component="li"
                  key={discipline}
                  sx={{
                    py: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'hairline',
                    fontFamily: fonts.mono,
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    '&:last-of-type': { borderBottom: 'none' },
                  }}
                >
                  {discipline}
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
