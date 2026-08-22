import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { IndustryCard } from '@/components/cards';
import { capItemsOnMobile } from '@/components/ui';
import { industries } from '@/data/industries';

/**
 * Industries.
 *
 * Each card leads with the sector's recurring engineering problem rather than
 * a claim about experience in it, because no client work can be cited and
 * "deep healthcare expertise" is unverifiable. Naming the failure mode is a
 * claim a reader can actually assess.
 */
export function IndustriesGrid() {
  return (
    <Section tone="band" aria-labelledby="industries-heading">
      <SectionHeading
        eyebrow="04 / Where we work"
        id="industries-heading"
        title="Different sectors fail in different places."
        lede="The architecture that suits a payments ledger is wrong for a streaming pipeline. We start from the failure mode that is specific to the sector."
        action={
          <Button
            component={RouterLink}
            to="/industries"
            variant="outlined"
            endIcon={<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />}
          >
            All industries
          </Button>
        }
      />

      <Box
        component="ul"
        sx={[
          capItemsOnMobile(6),
          {
          listStyle: 'none',
          m: 0,
          mt: { xs: 5, md: 7 },
          p: 0,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          },
          gap: { xs: 2, md: 2.5 },
          },
        ]}
      >
        {industries.map((industry, index) => (
          <Reveal
            key={industry.slug}
            index={index}
            variant="settle"
            component="li"
            sx={{ height: '100%' }}
          >
            <IndustryCard industry={industry} />
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
