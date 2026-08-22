import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { capItemsOnMobile } from '@/components/ui';
import { IllustrativeNotice } from '@/components/common/IllustrativeNotice';
import { CaseStudyCard } from '@/components/cards';
import { caseStudies } from '@/data/caseStudies';

/**
 * Engagement patterns.
 *
 * The reference design puts measurable outcome chips on every case-study card
 * — "60% faster operations", "85% faster verification", "99.9% uptime". No
 * verified client results exist to publish here, so those chips carry
 * qualitative outcomes instead, and the disclosure sits directly above the
 * grid rather than in small print at the foot of the page.
 *
 * That is a deliberate trade: slightly less punch, and every word defensible.
 */
export function FeaturedWork() {
  return (
    <Section tone="band" aria-labelledby="work-heading">
      <SectionHeading
        eyebrow="07 / Proof of work"
        id="work-heading"
        title="How we approach recurring problems."
        lede="Six patterns that come up repeatedly across sectors, described end to end — the constraint, the sequence of decisions, and the architecture each produced."
        action={
          <Button
            component={RouterLink}
            to="/case-studies"
            variant="outlined"
            endIcon={<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />}
          >
            All engagements
          </Button>
        }
      />

      <Box sx={{ mt: 4, maxWidth: 720 }}>
        <Reveal>
          <IllustrativeNotice compact />
        </Reveal>
      </Box>

      <Box
        component="ul"
        sx={[
          capItemsOnMobile(3),
          {
          listStyle: 'none',
          m: 0,
          mt: { xs: 4, md: 6 },
          p: 0,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          },
          gap: { xs: 2.5, md: 3 },
          },
        ]}
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
  );
}
