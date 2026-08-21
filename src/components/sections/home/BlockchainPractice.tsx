import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/common/Reveal';
import { Web3StackDiagram } from '@/components/visual/Web3StackDiagram';

const practiceAreas = [
  {
    title: 'Protocol & chain engineering',
    body: 'Consensus trade-offs, node infrastructure that stays in sync, and indexing pipelines that make chain state queryable.',
  },
  {
    title: 'Smart contract engineering',
    body: 'Specification and threat model before code. Unit, fork and invariant tests. Review against known vulnerability classes.',
  },
  {
    title: 'Decentralised applications',
    body: 'Wallet handling, honest transaction states, and recovery paths for when a provider or node fails mid-flow.',
  },
];

/**
 * Blockchain practice.
 *
 * Given its own full section, on a distinct surface, because it is a genuine
 * specialisation rather than a theme applied across the site. The honesty
 * point — that we assess whether a ledger is warranted at all — is the part
 * that separates this from a crypto marketing page.
 */
export function BlockchainPractice() {
  return (
    <Section tone="panel" aria-labelledby="blockchain-heading">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) minmax(0, 1fr)' },
          gap: { xs: 6, lg: 10 },
          alignItems: 'center',
        }}
      >
        <Box>
          <Reveal>
            <Typography variant="label" component="p" sx={{ color: 'accentText', mb: 3 }}>
              02 / Blockchain &amp; Web3
            </Typography>
            <Typography variant="h2" component="h2" id="blockchain-heading" sx={{ textWrap: 'balance' }}>
              A distributed ledger practice that will tell you when not to use one.
            </Typography>
            <Typography variant="subtitle1" component="p" sx={{ mt: 3, color: 'text.secondary' }}>
              Blockchain solves one problem well: shared state between parties who do not trust
              each other. We test that premise first. Where a ledger is warranted we engineer it
              properly — because deployed contract code holds value directly and cannot be patched
              next sprint.
            </Typography>
          </Reveal>

          <Box component="ul" sx={{ listStyle: 'none', m: 0, mt: 5, p: 0 }}>
            {practiceAreas.map((area, index) => (
              <Reveal key={area.title} index={index + 1} component="li">
                <Box
                  sx={{
                    py: 2.5,
                    borderTop: '1px solid',
                    borderColor: 'hairline',
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'minmax(0, 0.8fr) minmax(0, 1.2fr)' },
                    gap: { xs: 1, sm: 3 },
                  }}
                >
                  <Typography variant="subtitle2" component="h3">
                    {area.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {area.body}
                  </Typography>
                </Box>
              </Reveal>
            ))}
          </Box>

          <Reveal index={4}>
            <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
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

        <Reveal index={2} distance={24}>
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              border: '1px solid',
              borderColor: 'hairline',
              borderRadius: 1,
              bgcolor: 'background.default',
            }}
          >
            <Typography variant="label" component="p" sx={{ color: 'text.disabled', mb: 3 }}>
              System layers
            </Typography>
            <Web3StackDiagram />
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
