import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/common/Reveal';
import { NumberedCard } from '@/components/cards';
import { CornerTicks, Eyebrow, GlowBackdrop, GridBackdrop } from '@/components/ui';
import { NodeNetwork } from '@/components/visual/NodeNetwork';
import { blockchainCapabilities } from '@/data/blockchain';

/**
 * Blockchain and Web3 practice.
 *
 * Given a full dark section with its own figure because it is a genuine
 * specialisation rather than a theme sprinkled across the site. It is also the
 * most technically-detailed section on the page by design — the reference
 * treats blockchain as the visual centrepiece, and so does this.
 *
 * The honesty point leads: we test whether a ledger is warranted before
 * building one. That is what separates this from a crypto landing page, and it
 * is the reason the first capability card is "Feasibility assessment" rather
 * than a product.
 */
export function BlockchainPractice() {
  return (
    <Section tone="canvas" dividerTop aria-labelledby="blockchain-heading">
      <GridBackdrop size={72} mask="right" opacity={0.55} />
      <GlowBackdrop position="bottomLeft" spread={58} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) minmax(0, 0.92fr)' },
          gap: { xs: 5, lg: 9 },
          alignItems: 'center',
        }}
      >
        <Box>
          <Reveal>
            <Eyebrow sx={{ mb: 3 }}>02 / Blockchain &amp; Web3</Eyebrow>
            <Typography
              variant="h2"
              component="h2"
              id="blockchain-heading"
              sx={{ textWrap: 'balance' }}
            >
              A distributed ledger practice that will tell you when not to use one.
            </Typography>
            <Typography variant="subtitle1" component="p" sx={{ mt: 3, color: 'text.secondary' }}>
              Blockchain solves one problem well: shared state between parties who do not trust
              each other. We test that premise first. Where a ledger is warranted we engineer it
              properly — because deployed contract code holds value directly and cannot be patched
              next sprint.
            </Typography>
          </Reveal>

          <Reveal index={1}>
            <Box sx={{ mt: 4.5, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button
                component={RouterLink}
                to="/services#blockchain"
                endIcon={<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />}
              >
                Blockchain services
              </Button>
              <Button
                component={RouterLink}
                to="/blog/when-a-blockchain-is-the-wrong-answer"
                variant="outlined"
                endIcon={<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />}
              >
                When a ledger is the wrong answer
              </Button>
            </Box>
          </Reveal>
        </Box>

        <Reveal index={2} variant="settle" distance={24}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 2.5, md: 4 },
              border: '1px solid',
              borderColor: 'hairline',
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
          >
            <CornerTicks inset={10} />
            <NodeNetwork />
          </Box>
        </Reveal>
      </Box>

      <Box
        component="ol"
        sx={{
          listStyle: 'none',
          m: 0,
          mt: { xs: 6, md: 9 },
          p: 0,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(3, minmax(0, 1fr))',
            lg: 'repeat(5, minmax(0, 1fr))',
          },
          gap: { xs: 2, md: 2.5 },
        }}
      >
        {blockchainCapabilities.map((capability, index) => (
          <Reveal key={capability.index} index={index} variant="settle" component="li" sx={{ height: '100%' }}>
            <NumberedCard
              index={capability.index}
              title={capability.title}
              body={capability.body}
              tags={capability.tags}
            />
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
