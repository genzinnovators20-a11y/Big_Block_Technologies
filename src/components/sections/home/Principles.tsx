import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/common/Reveal';
import { NumberedCard } from '@/components/cards';
import { Eyebrow } from '@/components/ui';
import { principles } from '@/data/process';

/**
 * Why work with us.
 *
 * Six practices, each verifiable during an engagement. No awards, headcounts,
 * years-in-business or client counts appear — none can be substantiated, and a
 * page that invents them undermines every honest claim beside them.
 *
 * The left column sticks on wide screens so the question stays in view while
 * the answers scroll past. It occupies its own grid column and therefore never
 * covers content; below `lg` it is a normal block.
 */
export function Principles() {
  return (
    <Section tone="raised" aria-labelledby="principles-heading">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 0.8fr) minmax(0, 1.2fr)' },
          gap: { xs: 5, lg: 9 },
          alignItems: 'start',
        }}
      >
        <Reveal
          sx={{
            position: { lg: 'sticky' },
            // Clears the fixed header plus a comfortable margin.
            top: { lg: 120 },
          }}
        >
          <Eyebrow sx={{ mb: 3 }}>06 / Why Big Block</Eyebrow>

          <Typography
            variant="h2"
            component="h2"
            id="principles-heading"
            sx={{ textWrap: 'balance' }}
          >
            Six commitments you can hold us to.
          </Typography>

          <Typography variant="subtitle1" component="p" sx={{ mt: 3, color: 'text.secondary' }}>
            Stated as practices rather than adjectives, so each one is something you can check
            while the work is happening — not a claim you have to take on trust.
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/about"
              variant="outlined"
              endIcon={<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />}
            >
              How we work
            </Button>
          </Box>
        </Reveal>

        <Box
          component="ol"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {principles.map((principle, index) => (
            <Reveal
              key={principle.title}
              index={index}
              variant="settle"
              component="li"
              sx={{ height: '100%' }}
            >
              <NumberedCard index={index} title={principle.title} body={principle.body} />
            </Reveal>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
