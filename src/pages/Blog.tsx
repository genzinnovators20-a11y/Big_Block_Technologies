import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/common/Reveal';
import { CallToAction } from '@/components/sections/CallToAction';
import { blogPosts, blogTopics } from '@/data/blog';
import { motion } from '@/theme/tokens';
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

      <Section tone="light" aria-labelledby="insights-list-heading">
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
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: 0,
            borderTop: '1px solid',
            borderColor: 'hairline',
          }}
        >
          {visible.map((post, index) => (
            <Reveal
              key={post.slug}
              index={index % 2}
              sx={{
                borderBottom: '1px solid',
                borderColor: 'hairline',
                borderLeft: { md: index % 2 === 1 ? '1px solid' : 'none' },
              }}
            >
              <Box
                component={RouterLink}
                to={`/blog/${post.slug}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  py: 4,
                  px: { xs: 0, md: index % 2 === 1 ? 4 : 0 },
                  pr: { md: index % 2 === 0 ? 4 : 0 },
                  transition: `background-color ${motion.duration.fast}ms ${motion.easing.standard}`,
                  '&:hover .bp-title': { color: 'primary.main' },
                  '&:hover .bp-arrow': { opacity: 1, transform: 'translateX(0)' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Typography variant="label" component="span" sx={{ color: 'accentText' }}>
                    {post.topic}
                  </Typography>
                  <Box
                    aria-hidden="true"
                    sx={{ width: 3, height: 3, bgcolor: 'text.disabled', flexShrink: 0 }}
                  />
                  <Typography variant="caption" component="span" sx={{ color: 'text.disabled' }}>
                    {post.readingMinutes} min read
                  </Typography>
                  {post.publishedAt && (
                    <>
                      <Box
                        aria-hidden="true"
                        sx={{ width: 3, height: 3, bgcolor: 'text.disabled', flexShrink: 0 }}
                      />
                      <Typography variant="caption" component="time" dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Typography>
                    </>
                  )}
                </Box>

                <Typography
                  className="bp-title"
                  variant="h3"
                  component="h3"
                  sx={{ transition: `color ${motion.duration.fast}ms ${motion.easing.standard}` }}
                >
                  {post.title}
                </Typography>

                <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary', flex: 1 }}>
                  {post.excerpt}
                </Typography>

                <Box
                  className="bp-arrow"
                  component="span"
                  aria-hidden="true"
                  sx={{
                    display: 'inline-flex',
                    mt: 3,
                    color: 'accentText',
                    opacity: 0.5,
                    transform: 'translateX(-4px)',
                    transition: `opacity ${motion.duration.fast}ms ${motion.easing.standard}, transform ${motion.duration.fast}ms ${motion.easing.standard}`,
                  }}
                >
                  <ArrowRight size={18} strokeWidth={2} />
                </Box>
              </Box>
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
