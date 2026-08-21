import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/common/Reveal';
import { CallToAction } from '@/components/sections/CallToAction';
import { blogPosts, getBlogPost } from '@/data/blog';
import type { BlogBlock } from '@/types/content';
import { layout } from '@/theme/tokens';

/** Renders one content block. Kept exhaustive so a new block kind fails loudly. */
function Block({ block }: { block: BlogBlock }) {
  switch (block.kind) {
    case 'heading':
      return (
        <Typography variant="h3" component="h2" sx={{ mt: 6, mb: 2 }}>
          {block.text}
        </Typography>
      );

    case 'paragraph':
      return (
        <Typography variant="body1" sx={{ mb: 2.5, color: 'text.secondary', fontSize: '1.0625rem' }}>
          {block.text}
        </Typography>
      );

    case 'list':
      return (
        <Box component="ul" sx={{ listStyle: 'none', m: 0, mb: 3, p: 0 }}>
          {block.items.map((item) => (
            <Box
              component="li"
              key={item}
              sx={{
                display: 'flex',
                gap: 1.75,
                py: 1.25,
                borderBottom: '1px solid',
                borderColor: 'hairline',
                color: 'text.secondary',
                fontSize: '1rem',
              }}
            >
              <Box
                component="span"
                aria-hidden="true"
                sx={{ width: 5, height: 5, mt: '10px', bgcolor: 'brandAzure', flexShrink: 0 }}
              />
              {item}
            </Box>
          ))}
        </Box>
      );

    case 'callout':
      return (
        <Box
          sx={{
            my: 4,
            py: 2.5,
            pl: 3,
            borderLeft: '2px solid',
            borderColor: 'brandAzure',
          }}
        >
          <Typography variant="subtitle1" component="p" sx={{ color: 'text.primary' }}>
            {block.text}
          </Typography>
        </Box>
      );

    default:
      return null;
  }
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const index = blogPosts.findIndex((item) => item.slug === post.slug);
  const next = blogPosts[(index + 1) % blogPosts.length];

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          // Attributed to the organisation: no individual author is claimed
          // because none has been recorded for these pieces.
          author: { '@type': 'Organization', name: 'Big Block Technologies' },
          publisher: { '@type': 'Organization', name: 'Big Block Technologies' },
          ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
        }}
      />

      <PageHero
        eyebrow={`${post.topic} · ${post.readingMinutes} min read`}
        title={post.title}
        lede={post.excerpt}
      />

      <Section tone="light" aria-label="Article">
        <Box
          component="article"
          sx={{
            maxWidth: layout.proseMaxWidth,
            // A measure of roughly 68 characters — comfortable for long-form
            // reading rather than stretching across the full container.
            mx: { xs: 0, md: 'auto' },
          }}
        >
          <Reveal>
            {post.body.map((block, blockIndex) => (
              <Block key={`${block.kind}-${blockIndex}`} block={block} />
            ))}
          </Reveal>

          <Box sx={{ mt: 7, pt: 3, borderTop: '1px solid', borderColor: 'hairline' }}>
            <Typography variant="caption" component="p" sx={{ color: 'text.disabled' }}>
              Written by the Big Block Technologies engineering team.
            </Typography>
          </Box>
        </Box>
      </Section>

      <Section tone="deep" spacing="compact" dividerTop aria-label="More insights">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Button
            component={RouterLink}
            to="/blog"
            variant="text"
            startIcon={<ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />}
          >
            All insights
          </Button>

          <Box sx={{ textAlign: { sm: 'right' } }}>
            <Typography variant="label" component="p" sx={{ color: 'text.disabled', mb: 1 }}>
              Next
            </Typography>
            <Button
              component={RouterLink}
              to={`/blog/${next.slug}`}
              variant="text"
              endIcon={<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />}
            >
              {next.title}
            </Button>
          </Box>
        </Box>
      </Section>

      <CallToAction />
    </>
  );
}
