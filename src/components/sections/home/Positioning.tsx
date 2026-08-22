import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/common/Reveal';
import { Eyebrow, IndexBadge, SurfaceCard, TagRow } from '@/components/ui';
import { companyStatements } from '@/data/company';

/**
 * Company positioning.
 *
 * The first light section on the page. The tonal switch after a dark hero
 * marks the change from statement to explanation, and stops the page reading
 * as one undifferentiated dark canvas.
 *
 * The three statement cards restate commitments made elsewhere on the site
 * rather than introducing new claims — there is no founding date, headcount or
 * client count here, because none can be substantiated.
 */
export function Positioning() {
  return (
    <Section tone="band" aria-labelledby="positioning-heading">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 0.9fr) minmax(0, 1.1fr)' },
          gap: { xs: 5, md: 10 },
          alignItems: 'start',
        }}
      >
        <Reveal>
          <Eyebrow sx={{ mb: 3 }}>Who we are</Eyebrow>
          <Typography
            variant="h2"
            component="h2"
            id="positioning-heading"
            sx={{ textWrap: 'balance' }}
          >
            An engineering practice, not a delivery vendor.
          </Typography>
        </Reveal>

        <Reveal index={1}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="subtitle1" component="p">
              We take responsibility for the technical decisions, not only for the tickets. That
              means saying when a requirement will not survive contact with production, when a
              simpler architecture would serve better, and when the technology a client has already
              chosen is the wrong one.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              The work spans product engineering, cloud and platform, applied machine learning and
              distributed ledger systems. Those are separate disciplines, and we treat them that
              way — a smart contract is reviewed against different failure modes than a checkout
              flow, and neither benefits from being handled by a generalist.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Every engagement leaves the client with the source, the infrastructure definitions,
              the pipelines and the documentation. There is no proprietary runtime to stay
              subscribed to and no dependency on us to make the next change.
            </Typography>
          </Box>
        </Reveal>
      </Box>

      <Box
        sx={{
          mt: { xs: 6, md: 9 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
          gap: { xs: 2.5, md: 3 },
        }}
      >
        {companyStatements.map((statement, index) => (
          <Reveal key={statement.id} index={index} variant="settle">
            <SurfaceCard padding="lg" sx={{ gap: 2 }}>
              <Box
                aria-hidden="true"
                sx={{ width: 28, height: '2px', bgcolor: 'brandAzure', mb: 0.5 }}
              />

              <Typography variant="h4" component="h3">
                {statement.title}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {statement.body}
              </Typography>

              {statement.items && <TagRow items={statement.items} size="sm" sx={{ pt: 0.5 }} />}

              {/* Indexed footer rule. The three cards have very different body
                  lengths, and stretching them to a shared height left the two
                  shorter ones with a pool of dead space at the bottom. Pinning
                  a rule there gives that space a job. */}
              <Box
                sx={{
                  mt: 'auto',
                  pt: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  borderTop: '1px solid',
                  borderColor: 'hairline',
                }}
              >
                <IndexBadge value={index} size="sm" />
                <Typography variant="label" component="span" sx={{ color: 'text.disabled' }}>
                  {statement.id}
                </Typography>
              </Box>
            </SurfaceCard>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
