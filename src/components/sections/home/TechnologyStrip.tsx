import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/common/Reveal';
import { technologyGroups } from '@/data/technologies';
import { fonts } from '@/theme/tokens';

/**
 * Technology ecosystem.
 *
 * Rendered as typographic lists rather than a wall of vendor logos. Third
 * party marks would imply partnership or certification, and none has been
 * established — the honest statement is simply what the team works with.
 */
export function TechnologyStrip() {
  return (
    <Section tone="deep" spacing="compact" dividerTop aria-labelledby="technology-heading">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 260px) minmax(0, 1fr)' },
          gap: { xs: 4, md: 8 },
        }}
      >
        <Reveal>
          <Typography variant="label" component="p" sx={{ color: 'accentText', mb: 2 }}>
            Ecosystem
          </Typography>
          <Typography variant="h3" component="h2" id="technology-heading">
            What we build with
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            Chosen per project against the constraints, not from a house standard.
          </Typography>
        </Reveal>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 3, sm: 4 },
          }}
        >
          {technologyGroups.map((group, index) => (
            <Reveal key={group.title} index={index}>
              <Typography variant="label" component="h3" sx={{ color: 'text.disabled', mb: 1.5 }}>
                {group.title}
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  m: 0,
                  p: 0,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px 14px',
                }}
              >
                {group.items.map((item) => (
                  <Box
                    component="li"
                    key={item}
                    sx={{
                      fontFamily: fonts.mono,
                      fontSize: '0.8125rem',
                      color: 'text.secondary',
                    }}
                  >
                    {item}
                  </Box>
                ))}
              </Box>
            </Reveal>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
