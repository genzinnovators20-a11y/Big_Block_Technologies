import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/common/Reveal';
import { Eyebrow, StatTile, TagRow } from '@/components/ui';
import { disciplines, hiringSteps, openRoles } from '@/data/careers';

/**
 * Careers teaser.
 *
 * The reference design fills this section with a stat mosaic — "50+ engineers",
 * "4.8/5 team satisfaction", "12 open positions", "100% learning budget usage".
 * Every one of those would be an invention here, and inventing them on a
 * hiring page misleads the people least able to verify it.
 *
 * The mosaic instead carries facts the site can stand behind: how many stages
 * the hiring process has, what happens to an application, what the technical
 * stage involves, and the true state of open roles — which is currently none.
 */
export function CareersTeaser() {
  const hasRoles = openRoles.length > 0;

  return (
    <Section tone="alt" dividerTop aria-labelledby="careers-heading">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1.05fr)' },
          gap: { xs: 5, md: 8 },
          alignItems: 'center',
        }}
      >
        <Box>
          <Reveal>
            <Eyebrow sx={{ mb: 3 }}>08 / Careers</Eyebrow>
            <Typography
              variant="h2"
              component="h2"
              id="careers-heading"
              sx={{ textWrap: 'balance' }}
            >
              Engineers who want to own the decision, not just the ticket.
            </Typography>
            <Typography variant="subtitle1" component="p" sx={{ mt: 3, color: 'text.secondary' }}>
              {hasRoles
                ? 'Every application is read by a person, and you get an answer either way.'
                : 'There are no vacancies published right now. We still read speculative applications, and strong ones stay on file — tell us which discipline you work in and what you want to build.'}
            </Typography>
          </Reveal>

          <Reveal index={1}>
            <Box sx={{ mt: 4 }}>
              <Typography variant="label" component="h3" sx={{ color: 'text.disabled', mb: 2 }}>
                Disciplines we recruit into
              </Typography>
              <TagRow items={disciplines} />
            </Box>

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
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: { xs: 2, md: 2.5 },
          }}
        >
          <Reveal index={1} variant="settle">
            <StatTile
              value="Read by a person"
              label="Every application"
              detail="You receive a decision either way rather than silence."
            />
          </Reveal>

          <Reveal index={2} variant="settle">
            <StatTile
              value={`${hiringSteps.length} stages`}
              label="Hiring process"
              detail="Described in full before you apply, not revealed one step at a time."
              emphasis
            />
          </Reveal>

          <Reveal index={3} variant="settle">
            <StatTile
              value="No take-home"
              label="Technical stage"
              detail="A working session on a realistic problem, not an unpaid project."
            />
          </Reveal>

          <Reveal index={4} variant="settle">
            <StatTile
              value={hasRoles ? `${openRoles.length} open` : 'Speculative'}
              label="Roles"
              detail={
                hasRoles
                  ? 'Each listing states location, arrangement and expectations in full.'
                  : 'Nothing published today. Strong speculative applications stay on file.'
              }
            />
          </Reveal>
        </Box>
      </Box>
    </Section>
  );
}
