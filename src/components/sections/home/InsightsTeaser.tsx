import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { BlogCard } from '@/components/cards';
import { GridBackdrop } from '@/components/ui';
import { blogPosts } from '@/data/blog';

const featured = blogPosts.slice(0, 3);

/**
 * Insights teaser.
 *
 * Three pieces, presented as cards with generated technical headers rather
 * than stock photography — a photograph of a laptop says nothing about an
 * article on idempotency, and costs a couple of hundred kilobytes to say it.
 */
export function InsightsTeaser() {
  return (
    <Section tone="canvas" dividerTop aria-labelledby="insights-heading">
      <GridBackdrop size={72} mask="topRight" opacity={0.5} />

      <SectionHeading
        eyebrow="09 / Insights"
        id="insights-heading"
        title="Notes from the engineering team."
        lede="Written for the people who will have to maintain the system after it ships."
        action={
          <Button
            component={RouterLink}
            to="/blog"
            variant="outlined"
            endIcon={<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />}
          >
            All insights
          </Button>
        }
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
            lg: 'repeat(3, minmax(0, 1fr))',
          },
          gap: { xs: 2.5, md: 3 },
        }}
      >
        {featured.map((post, index) => (
          <Reveal
            key={post.slug}
            index={index}
            variant="settle"
            component="li"
            sx={{ height: '100%' }}
          >
            <BlogCard post={post} />
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
