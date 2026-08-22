import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/common/Reveal';
import { IllustrativeNotice } from '@/components/common/IllustrativeNotice';
import { CallToAction } from '@/components/sections/CallToAction';
import { CaseStudyCard } from '@/components/cards';
import { caseStudies } from '@/data/caseStudies';
import { visuallyHidden } from '@/theme/a11y';

/**
 * Engagement patterns index.
 *
 * The disclosure sits in the hero, above everything else, because a reader
 * needs it before they interpret anything below — not in small print at the
 * foot of the page, after they have already formed an impression.
 */
export default function CaseStudies() {
  return (
    <>
      <Seo
        title="Case Studies"
        description="Representative engagement patterns showing how Big Block Technologies approaches recurring problems in payments, legacy modernisation, multi-party ledgers, smart contracts, applied AI and delivery pipelines."
        path="/case-studies"
      />

      <PageHero
        eyebrow="Selected work"
        title="Six problems we are asked to solve repeatedly."
        lede="Each one is described end to end: the constraint that made it hard, the sequence of decisions taken, and the architecture that resulted."
        aside={<IllustrativeNotice />}
      />

      <Section tone="band" aria-labelledby="engagements-heading">
        {/* The cards are h3s. Without this the page would run h1 -> h3, which
            is a level skip for anyone navigating by headings. */}
        <Typography variant="h2" component="h2" id="engagements-heading" sx={visuallyHidden}>
          Engagement patterns
        </Typography>

        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
            },
            gap: { xs: 2.5, md: 3 },
          }}
        >
          {caseStudies.map((study, index) => (
            <Reveal
              key={study.slug}
              index={index}
              variant="settle"
              component="li"
              sx={{ height: '100%' }}
            >
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </Box>
      </Section>

      <CallToAction
        eyebrow="Your problem here"
        title="Most engagements start with one of these."
        body="If one of the patterns above resembles your situation, say which — it gives us a shared starting point and saves a round of discovery."
      />
    </>
  );
}
