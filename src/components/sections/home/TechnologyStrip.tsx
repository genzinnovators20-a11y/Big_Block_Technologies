import Box from '@mui/material/Box';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { TechGroupCard } from '@/components/cards';
import { technologyGroups } from '@/data/technologies';

/**
 * Technology ecosystem.
 *
 * Grouped by the job the technology does, not listed as one long alphabet.
 * The heading states the position explicitly — technology is chosen against
 * the constraints of a problem — because a stack section without that framing
 * reads as "we know everything", which is neither credible nor useful.
 *
 * Text chips rather than vendor logos: displaying third-party marks would
 * imply partnerships or certifications that have not been established.
 */
export function TechnologyStrip() {
  return (
    <Section tone="alt" dividerTop aria-labelledby="technology-heading">
      <SectionHeading
        eyebrow="03 / Our stack"
        id="technology-heading"
        title="We choose technology against the problem."
        lede="A curated, well-understood toolchain rather than a capability slide. Novel technology carries an operational cost that rarely shows up in the evaluation, so the interesting choices are reserved for genuinely unusual problems."
      />

      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          mt: { xs: 5, md: 7 },
          p: 0,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(4, minmax(0, 1fr))',
          },
          gap: { xs: 2, md: 2.5 },
        }}
      >
        {technologyGroups.map((group, index) => (
          <Reveal key={group.title} index={index} variant="settle" component="li" sx={{ height: '100%' }}>
            <TechGroupCard title={group.title} items={group.items} />
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
