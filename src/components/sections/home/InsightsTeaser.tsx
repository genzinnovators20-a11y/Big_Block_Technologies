import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { blogPosts } from '@/data/blog';
import { motion } from '@/theme/tokens';

const featured = blogPosts.slice(0, 3);

/** Insights teaser. Three pieces, presented as an editorial index. */
export function InsightsTeaser() {
  return (
    <Section tone="light" aria-labelledby="insights-heading">
      <SectionHeading
        eyebrow="07 / Insights"
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
        sx={{
          mt: { xs: 6, md: 8 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
          gap: 0,
          borderTop: '1px solid',
          borderColor: 'hairline',
        }}
      >
        {featured.map((post, index) => (
          <Reveal key={post.slug} index={index}>
            <Box
              component={RouterLink}
              to={`/blog/${post.slug}`}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                py: 4,
                px: { xs: 0, md: 3 },
                pl: { md: index === 0 ? 0 : 3 },
                borderBottom: { xs: '1px solid', md: 'none' },
                borderLeft: { md: index === 0 ? 'none' : '1px solid' },
                borderColor: 'hairline',
                transition: `background-color ${motion.duration.fast}ms ${motion.easing.standard}`,
                '&:hover .post-title': { color: 'primary.main' },
                '&:hover .post-arrow': { opacity: 1, transform: 'translateX(0)' },
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
              </Box>

              <Typography
                className="post-title"
                variant="h4"
                component="h3"
                sx={{ transition: `color ${motion.duration.fast}ms ${motion.easing.standard}` }}
              >
                {post.title}
              </Typography>

              <Typography variant="body2" sx={{ mt: 1.5, color: 'text.secondary', flex: 1 }}>
                {post.excerpt}
              </Typography>

              <Box
                className="post-arrow"
                component="span"
                aria-hidden="true"
                sx={{
                  display: 'inline-flex',
                  mt: 2.5,
                  color: 'accentText',
                  opacity: 0.5,
                  transform: 'translateX(-4px)',
                  transition: `opacity ${motion.duration.fast}ms ${motion.easing.standard}, transform ${motion.duration.fast}ms ${motion.easing.standard}`,
                }}
              >
                <ArrowRight size={17} strokeWidth={2} />
              </Box>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
