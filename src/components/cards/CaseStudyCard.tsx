import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ArrowCue, SurfaceCard, TagRow } from '@/components/ui';
import { CaseStudyGlyph, glyphForEngagement } from '@/components/visual/CaseStudyGlyph';
import type { CaseStudy } from '@/types/content';
import { fonts, motion } from '@/theme/tokens';

/**
 * Caps a paragraph at three lines so cards in a grid keep a shared rhythm.
 *
 * Safe here because the card links to the full write-up: the clamp trims a
 * preview, it never hides the only copy of the text.
 */
const clampToLines = (lines: number) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical' as const,
  WebkitLineClamp: lines,
  overflow: 'hidden',
});

function LabelledParagraph({ label, children }: { label: string; children: string }) {
  return (
    <Box>
      <Box
        component="span"
        sx={{
          display: 'block',
          mb: 0.5,
          fontFamily: fonts.mono,
          fontSize: '0.6875rem',
          letterSpacing: '0.12em',
          color: 'text.disabled',
        }}
      >
        {label}
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', ...clampToLines(3) }}>
        {children}
      </Typography>
    </Box>
  );
}

interface CaseStudyCardProps {
  study: CaseStudy;
}

/**
 * An engagement pattern, given card weight.
 *
 * Follows the reference layout — technical header, category rail, title,
 * challenge, solution, outcome tags — with one deliberate difference: the
 * outcome tags carry **qualitative** results, never percentages.
 *
 * The reference cards show "60% faster operations", "85% faster verification",
 * "99.9% uptime". No verified client results exist to publish here, so
 * inventing equivalents would be a false claim on the most credibility-laden
 * surface on the site. The `IllustrativeNotice` rendered above any grid of
 * these states plainly what they are.
 */
export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <SurfaceCard
      interactive
      component={RouterLink}
      to={`/case-studies/${study.slug}`}
      padding="none"
      sx={{
        overflow: 'hidden',
        '&:hover .cs-title': { color: 'accentText' },
        '&:hover .arrow-cue': { opacity: 1, transform: 'translateX(0)' },
      }}
    >
      <CaseStudyGlyph kind={glyphForEngagement(study.engagement)} title={study.title} />

      <Box sx={{ p: { xs: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', flex: 1, gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
          <Typography variant="label" component="span" sx={{ color: 'accentText' }}>
            {study.sector}
          </Typography>
          <Box
            aria-hidden="true"
            sx={{ width: 3, height: 3, bgcolor: 'text.disabled', flexShrink: 0 }}
          />
          <Typography variant="label" component="span" sx={{ color: 'text.disabled' }}>
            {study.engagement}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Typography
            className="cs-title"
            variant="h5"
            component="h3"
            sx={{
              flex: 1,
              transition: `color ${motion.duration.fast}ms ${motion.easing.standard}`,
              ...clampToLines(2),
            }}
          >
            {study.title}
          </Typography>
          <ArrowCue size={15} restOpacity={0.3} sx={{ mt: '3px' }} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, flex: 1 }}>
          <LabelledParagraph label="CHALLENGE">{study.challenge}</LabelledParagraph>
          <LabelledParagraph label="SOLUTION">{study.solution}</LabelledParagraph>
        </Box>

        <Box
          sx={{
            mt: 'auto',
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'hairline',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          <TagRow items={study.outcomes} variant="bullet" size="sm" />
          <TagRow items={study.stack} max={4} size="sm" />
        </Box>
      </Box>
    </SurfaceCard>
  );
}
