import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ArrowCue, SurfaceCard } from '@/components/ui';
import type { BlogPost } from '@/types/content';
import { motion } from '@/theme/tokens';

/**
 * Topic marks.
 *
 * A small geometric figure per subject, drawn from the same vocabulary as the
 * rest of the site: a cube for blockchain, a stack for architecture, braces for
 * contracts. Deliberately not stock photography — a photograph of a laptop says
 * nothing about the article and costs 200 kB to say it.
 */
const TOPIC_MARKS: Record<string, string> = {
  // Extruded cube — the brand mark's own geometry.
  Blockchain: 'M20 4 L34 12 L34 28 L20 36 L6 28 L6 12 Z M20 4 L20 20 M20 20 L6 12 M20 20 L34 12',
  // Layered plates: the thing an architecture decision record describes.
  Architecture: 'M20 6 L34 13 L20 20 L6 13 Z M6 20 L20 27 L34 20 M6 27 L20 34 L34 27',
  // Token flowing from one definition into three surfaces.
  'UI Engineering': 'M20 6 V16 M20 16 L8 24 M20 16 L32 24 M4 24 H12 V32 H4 Z M16 24 H24 V32 H16 Z M28 24 H36 V32 H28 Z',
  // Balanced postings either side of a rule.
  FinTech: 'M6 20 H34 M12 20 V12 M20 20 V8 M28 20 V15 M12 28 V20 M20 32 V20 M28 25 V20',
  // Retrieval: a corpus, an index, a cited answer.
  'Applied AI': 'M6 10 H18 V30 H6 Z M6 16 H18 M6 22 H18 M24 20 H34 M24 20 L29 15 M24 20 L29 25 M18 20 H24',
  // Facade in front of a system being replaced slice by slice.
  Modernisation: 'M6 20 H14 M14 10 V30 M14 14 H26 V20 H14 M14 20 H26 V26 H14 M30 14 H34 M30 26 H34',
  default: 'M8 8 H32 V32 H8 Z M8 18 H32 M18 8 V32',
};

interface BlogCardProps {
  post: BlogPost;
  /** `feature` gives the card a taller header. Used for the lead article. */
  emphasis?: boolean;
}

/**
 * An article, presented as an index entry rather than a blog tile.
 *
 * The header band carries a generated mark instead of an image: it inherits
 * theme colours, weighs nothing, and cannot become a stale stock photo.
 */
export function BlogCard({ post, emphasis = false }: BlogCardProps) {
  const path = TOPIC_MARKS[post.topic] ?? TOPIC_MARKS.default;

  return (
    <SurfaceCard
      interactive
      component={RouterLink}
      to={`/blog/${post.slug}`}
      padding="none"
      sx={{
        overflow: 'hidden',
        '&:hover .post-title': { color: 'accentText' },
        '&:hover .arrow-cue': { opacity: 1, transform: 'translateX(0)' },
        '&:hover .post-mark': { transform: 'translate3d(0, -2px, 0)' },
      }}
    >
      <Box
        aria-hidden="true"
        sx={(theme) => ({
          position: 'relative',
          height: emphasis ? 148 : 112,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid',
          borderColor: 'hairline',
          backgroundImage: `linear-gradient(135deg, ${theme.vars.palette.surfaceRaised} 0%, ${theme.vars.palette.background.default} 100%)`,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(to right, ${theme.vars.palette.gridLine} 1px, transparent 1px), linear-gradient(to bottom, ${theme.vars.palette.gridLine} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            opacity: 0.6,
          },
        })}
      >
        <Box
          className="post-mark"
          component="svg"
          viewBox="0 0 40 40"
          sx={{
            position: 'relative',
            width: emphasis ? 56 : 44,
            height: emphasis ? 56 : 44,
            color: 'accentText',
            opacity: 0.9,
            transition: `transform ${motion.duration.base}ms ${motion.easing.standard}`,
          }}
        >
          <path
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Box>
      </Box>

      <Box sx={{ p: { xs: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', flex: 1, gap: 1.25 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Typography variant="label" component="span" sx={{ color: 'accentText' }}>
            {post.topic}
          </Typography>
          <Box
            aria-hidden="true"
            sx={{ width: 3, height: 3, bgcolor: 'text.disabled', flexShrink: 0 }}
          />
          <Typography variant="label" component="span" sx={{ color: 'text.disabled' }}>
            {`${post.readingMinutes} min read`}
          </Typography>
        </Box>

        <Typography
          className="post-title"
          variant="h5"
          component="h3"
          sx={{ transition: `color ${motion.duration.fast}ms ${motion.easing.standard}` }}
        >
          {post.title}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', flex: 1 }}>
          {post.excerpt}
        </Typography>

        <Box sx={{ mt: 'auto', pt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="label" component="span" sx={{ color: 'text.disabled' }}>
            Read
          </Typography>
          <ArrowCue size={14} restOpacity={0.45} />
        </Box>
      </Box>
    </SurfaceCard>
  );
}
