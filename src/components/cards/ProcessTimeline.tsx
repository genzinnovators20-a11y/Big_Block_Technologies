import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Reveal } from '@/components/common/Reveal';
import { SurfaceCard, TagRow } from '@/components/ui';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { ProcessPhase } from '@/types/content';
import { motion } from '@/theme/tokens';

const RAIL_X = { xs: 15, md: 19 };
const NODE = { xs: 30, md: 38 };

interface ProcessTimelineProps {
  phases: ProcessPhase[];
}

/**
 * Delivery methodology as a connected rail.
 *
 * The rail fills as the section passes through the viewport and each node
 * lights as the fill reaches it, so the sequence is legible as a sequence
 * rather than as six unrelated cards.
 *
 * Critically, this reads scroll — it never takes it. There is no pinning, no
 * snapping and no `preventDefault`: a reader can scroll straight past at any
 * speed and every phase is fully readable the whole way, because the content
 * is never hidden behind the animation. The rail is decoration on top of a
 * document that is complete without it.
 *
 * Under reduced motion the rail renders filled and every node lit.
 */
export function ProcessTimeline({ phases }: ProcessTimelineProps) {
  const reduced = usePrefersReducedMotion();
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ disabled: reduced });

  return (
    <Box ref={ref} sx={{ position: 'relative', mt: { xs: 5, md: 7 } }}>
      {/* Track */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          left: RAIL_X,
          top: 8,
          bottom: 8,
          width: '2px',
          bgcolor: 'hairline',
        }}
      />

      {/* Fill. Scaled rather than resized: `transform` stays off the layout
          path, so a scroll that repaints this cannot reflow the phases. */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          left: RAIL_X,
          top: 8,
          bottom: 8,
          width: '2px',
          transformOrigin: 'top',
          transform: `scaleY(${progress})`,
          backgroundImage: (theme) =>
            `linear-gradient(to bottom, ${theme.vars.palette.brandAzure}, ${theme.vars.palette.primary.main})`,
          transition: reduced ? 'none' : `transform 120ms linear`,
        }}
      />

      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {phases.map((phase, index) => {
          // A node lights once the fill has passed its own position on the rail.
          const threshold = (index + 0.35) / phases.length;
          const active = progress >= threshold;

          return (
            <Reveal
              key={phase.index}
              component="li"
              index={index}
              variant="settle"
              sx={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: { xs: `${NODE.xs + 16}px 1fr`, md: `${NODE.md + 26}px 1fr` },
                gap: { xs: 0, md: 0 },
                pb: { xs: 3, md: 4 },
                '&:last-of-type': { pb: 0 },
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  width: NODE,
                  height: NODE,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: active ? 'brandAzure' : 'hairlineStrong',
                  bgcolor: active ? 'brandAzure' : 'background.default',
                  color: active ? 'primary.contrastText' : 'text.disabled',
                  fontSize: { xs: '0.6875rem', md: '0.75rem' },
                  fontWeight: 600,
                  fontVariantNumeric: 'tabular-nums',
                  transition: reduced
                    ? 'none'
                    : `background-color ${motion.duration.slow}ms ${motion.easing.standard}, border-color ${motion.duration.slow}ms ${motion.easing.standard}, color ${motion.duration.slow}ms ${motion.easing.standard}`,
                }}
              >
                {phase.index}
              </Box>

              <SurfaceCard
                padding="md"
                sx={{
                  ml: { xs: 2, md: 3 },
                  gap: 1.5,
                  borderColor: active ? 'cardBorder' : 'hairline',
                  transition: `border-color ${motion.duration.slow}ms ${motion.easing.standard}`,
                }}
              >
                <Typography variant="h4" component="h3">
                  {phase.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {phase.description}
                </Typography>

                <Box sx={{ mt: 1, pt: 2, borderTop: '1px solid', borderColor: 'hairline' }}>
                  <Typography variant="label" component="h4" sx={{ color: 'text.disabled', mb: 1.5 }}>
                    You receive
                  </Typography>
                  <TagRow items={phase.artefacts} size="sm" />
                </Box>
              </SurfaceCard>
            </Reveal>
          );
        })}
      </Box>
    </Box>
  );
}
