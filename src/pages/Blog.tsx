import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/common/Reveal';
import { CallToAction } from '@/components/sections/CallToAction';
import { BlogCard } from '@/components/cards';
import { blogPosts, blogTopics } from '@/data/blog';
import { visuallyHidden } from '@/theme/a11y';

const ALL = 'All';

/**
 * Insights index with topic filtering.
 *
 * Filter state is local rather than in the URL because the list is short; if
 * the archive grows, moving it to a search param is the obvious next step.
 */
export default function Blog() {
  const [topic, setTopic] = useState<string>(ALL);

  const visible = useMemo(
    () => (topic === ALL ? blogPosts : blogPosts.filter((post) => post.topic === topic)),
    [topic],
  );

  return (
    <>
      <Seo
        title="Insights"
        description="Engineering notes on architecture, blockchain, cloud, delivery, FinTech correctness and applied AI — written for the people who maintain the system after it ships."
        path="/blog"
      />

      <PageHero
        eyebrow="Insights"
        title="Notes from the engineering team."
        lede="Written for the people who will have to maintain the system after it ships, rather than for the people who sign off on building it."
      />

      <Section tone="band" aria-labelledby="insights-list-heading">
        <Typography variant="h2" component="h2" id="insights-list-heading" sx={visuallyHidden}>
          All insights
        </Typography>

        <Reveal>
          <Box
            role="group"
            aria-label="Filter insights by topic"
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: { xs: 4, md: 6 } }}
          >
            {[ALL, ...blogTopics].map((item) => {
              const active = topic === item;
              return (
                <Button
                  key={item}
                  onClick={() => setTopic(item)}
                  variant={active ? 'contained' : 'outlined'}
                  size="small"
                  aria-pressed={active}
                >
                  {item}
                </Button>
              );
            })}
          </Box>
        </Reveal>

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
          {visible.map((post, index) => (
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

        {visible.length === 0 && (
          <Typography variant="body1" sx={{ py: 6, color: 'text.secondary' }} role="status">
            No insights published under this topic yet.
          </Typography>
        )}
      </Section>

      <CallToAction
        eyebrow="Questions"
        title="Disagree with something here?"
        body="These are positions, not neutral summaries. If your experience points the other way we would rather hear it than not."
        secondaryLabel="About the practice"
        secondaryHref="/about"
      />
    </>
  );
}
