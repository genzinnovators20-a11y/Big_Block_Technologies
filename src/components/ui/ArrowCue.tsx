import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { ArrowRight } from 'lucide-react';
import { motion } from '@/theme/tokens';

interface ArrowCueProps {
  size?: number;
  /**
   * Resting opacity. Cards that are entirely clickable use a visible arrow so
   * the affordance does not depend on hover; rows inside a list use 0 and
   * reveal on hover, where the row highlight already signals interactivity.
   */
  restOpacity?: number;
  sx?: SxProps<Theme>;
}

/**
 * The "this goes somewhere" cue.
 *
 * Every card and row link on the site ends in one of these. It travels 4px on
 * hover — a `transform`, so no layout is recalculated and the text beside it
 * cannot shift.
 *
 * The parent sets `.arrow-cue` state:
 *
 *     '&:hover .arrow-cue': { opacity: 1, transform: 'translateX(0)' }
 */
export function ArrowCue({ size = 16, restOpacity = 0, sx }: ArrowCueProps) {
  return (
    <Box
      className="arrow-cue"
      component="span"
      aria-hidden="true"
      sx={[
        {
          display: 'inline-flex',
          flexShrink: 0,
          color: 'accentText',
          opacity: restOpacity,
          transform: 'translateX(-4px)',
          transition: `opacity ${motion.duration.fast}ms ${motion.easing.standard}, transform ${motion.duration.fast}ms ${motion.easing.standard}`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <ArrowRight size={size} strokeWidth={2} />
    </Box>
  );
}
