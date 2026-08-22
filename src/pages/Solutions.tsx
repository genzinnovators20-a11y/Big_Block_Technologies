import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/common/Reveal';
import { CallToAction } from '@/components/sections/CallToAction';
import { SolutionCard } from '@/components/cards';
import { solutions } from '@/data/solutions';
import { layout } from '@/theme/tokens';

/**
 * Solutions.
 *
 * Organised by business outcome, and each entry leads with "signals" — the
 * symptoms a reader can match against their own situation. That is what makes
 * a solutions page navigable rather than a restatement of the services page.
 *
 * V2 renders all nine as cards inside one section. V1 gave each solution its
 * own alternating-tone `Section`, which meant nine tonal flips in a row: the
 * device that gives the homepage its rhythm turned into a strobe when applied
 * to a list of equivalent items.
 */
export default function Solutions() {
  return (
    <>
      <Seo
        title="Solutions"
        description="Solutions organised by business outcome: digital transformation, enterprise modernisation, SaaS platforms, FinTech systems, blockchain, Web3, AI-enabled applications, cloud-native systems and scalable platforms."
        path="/solutions"
      />

      <PageHero
        eyebrow="Solutions"
        title="Start from the outcome, not the technology."
        lede="Each solution below opens with the symptoms that indicate it applies. Find the description that matches what you are seeing, and the technology conversation becomes much shorter."
      />

      <Section tone="band" spacing="compact" aria-label="Solution index">
        <Reveal>
          <Typography variant="label" component="h2" sx={{ color: 'text.disabled', mb: 2.5 }}>
            Jump to
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {solutions.map((solution) => (
              <Button
                key={solution.slug}
                component="a"
                href={`#${solution.slug}`}
                variant="outlined"
                size="small"
              >
                {solution.name}
              </Button>
            ))}
          </Box>
        </Reveal>
      </Section>

      <Section tone="contrast" dividerTop aria-label="Solutions">
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, md: 3 },
          }}
        >
          {solutions.map((solution, index) => (
            <Reveal
              key={solution.slug}
              component="li"
              index={index % 2}
              variant="settle"
              sx={{ scrollMarginTop: `${layout.headerHeight + 32}px` }}
            >
              <SolutionCard solution={solution} index={index} detail="full" />
            </Reveal>
          ))}
        </Box>
      </Section>

      <CallToAction
        eyebrow="Not listed?"
        title="Describe the outcome you need."
        body="These are the patterns we see most often, not a closed list. If your situation does not match one of them, describe it directly — the interesting problems rarely arrive pre-categorised."
        secondaryLabel="See industries"
        secondaryHref="/industries"
      />
    </>
  );
}
