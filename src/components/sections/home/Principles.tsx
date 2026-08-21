import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { principles } from '@/data/process';

/**
 * Why work with us.
 *
 * Six practices, each of which a client can verify during an engagement. No
 * awards, headcounts, years-in-business or client counts appear here, because
 * none can be substantiated.
 */
export function Principles() {
  return (
    <Section tone="panel" aria-labelledby="principles-heading">
      <SectionHeading
        eyebrow="06 / Why Big Block"
        id="principles-heading"
        title="Six commitments you can hold us to."
        lede="Stated as practices rather than adjectives, so each one is something you can check while the work is happening."
      />

      <Box
        sx={{
          mt: { xs: 6, md: 8 },
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          },
          gap: { xs: 4, md: 5 },
        }}
      >
        {principles.map((principle, index) => (
          <Reveal key={principle.title} index={index % 3}>
            <Box sx={{ pt: 3, borderTop: '1px solid', borderColor: 'hairlineStrong', height: '100%' }}>
              <Typography variant="h5" component="h3">
                {principle.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1.5, color: 'text.secondary' }}>
                {principle.body}
              </Typography>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
