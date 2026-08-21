import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { motion } from '@/theme/tokens';

interface RevealProps {
  children: ReactNode;
  /** Stagger index. Multiplied by the shared 60ms step. */
  index?: number;
  /** Distance travelled during the entrance, in px. */
  distance?: number;
  component?: React.ElementType;
  sx?: SxProps<Theme>;
}

/**
 * Entrance animation for content blocks.
 *
 * Deliberately restrained: opacity plus a short translate on transform only,
 * so no layout is recalculated and nothing shifts. When the user prefers
 * reduced motion the content renders in its final state with no transition.
 */
export function Reveal({
  children,
  index = 0,
  distance = 18,
  component = 'div',
  sx,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ disabled: reduced });

  return (
    <Box
      ref={ref}
      component={component}
      sx={[
        {
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : `translate3d(0, ${distance}px, 0)`,
          transition: reduced
            ? 'none'
            : `opacity ${motion.duration.entrance}ms ${motion.easing.standard} ${
                index * motion.stagger
              }ms, transform ${motion.duration.entrance}ms ${motion.easing.standard} ${
                index * motion.stagger
              }ms`,
          willChange: inView ? 'auto' : 'opacity, transform',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
