import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/common/Reveal';

/**
 * Company positioning.
 *
 * The first light section on the page. The tonal switch after a dark hero is
 * deliberate — it marks a change from statement to explanation, and stops the
 * page reading as one undifferentiated dark canvas.
 */
export function Positioning() {
  return (
    <Section tone="light" aria-labelledby="positioning-heading">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1fr)' },
          gap: { xs: 5, md: 10 },
          alignItems: 'start',
        }}
      >
        <Reveal>
          <Typography variant="label" component="p" sx={{ color: 'accentText', mb: 3 }}>
            Who we are
          </Typography>
          <Typography variant="h2" component="h2" id="positioning-heading" sx={{ textWrap: 'balance' }}>
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
    </Section>
  );
}
