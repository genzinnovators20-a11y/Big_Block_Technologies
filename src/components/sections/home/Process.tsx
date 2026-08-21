import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { processPhases } from '@/data/process';

/**
 * Delivery methodology.
 *
 * Rendered as a numbered rail rather than a card grid: the sequence is the
 * information, and each phase names the artefacts a client receives, which is
 * what makes the claim checkable.
 */
export function Process() {
  return (
    <Section tone="light" aria-labelledby="process-heading">
      <SectionHeading
        eyebrow="03 / How we work"
        id="process-heading"
        title="Six phases, each with something you can hold."
        lede="Every phase ends in artefacts rather than a status update. If a phase produces nothing you could take to another firm, it was not a phase."
      />

      <Box
        component="ol"
        sx={{
          listStyle: 'none',
          m: 0,
          mt: { xs: 6, md: 8 },
          p: 0,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          },
          gap: 0,
          borderTop: '1px solid',
          borderColor: 'hairline',
        }}
      >
        {processPhases.map((phase, index) => (
          <Reveal
            key={phase.index}
            index={index % 3}
            component="li"
            sx={{
              p: { xs: 3, md: 4 },
              pl: { xs: 0, sm: 3, md: 4 },
              borderBottom: '1px solid',
              borderColor: 'hairline',
              borderRight: { lg: (index + 1) % 3 === 0 ? 'none' : '1px solid' },
              borderLeft: { xs: 'none', sm: index % 2 === 0 ? 'none' : '1px solid' },
              // The three-column layout re-derives its own left borders.
              ...(index % 3 === 0 && { borderLeft: { lg: 'none' } }),
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <Typography
                variant="label"
                component="span"
                sx={{ color: 'accentText', fontSize: '0.8125rem' }}
              >
                {phase.index}
              </Typography>
              <Typography variant="h4" component="h3">
                {phase.name}
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              {phase.description}
            </Typography>

            <Box component="ul" sx={{ listStyle: 'none', m: 0, mt: 2.5, p: 0 }}>
              {phase.artefacts.map((artefact) => (
                <Box
                  component="li"
                  key={artefact}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.25,
                    mb: 0.75,
                    fontSize: '0.8125rem',
                    color: 'text.secondary',
                  }}
                >
                  <Box
                    component="span"
                    aria-hidden="true"
                    sx={{
                      width: 5,
                      height: 5,
                      mt: '7px',
                      bgcolor: 'brandAzure',
                      flexShrink: 0,
                    }}
                  />
                  {artefact}
                </Box>
              ))}
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
