import type { ElementType, ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { motion } from '@/theme/tokens';

/**
 * How the element arrives.
 *
 * `rise`   — the default: opacity plus a short upward translate.
 * `settle` — adds a 0.985 scale. Reserved for cards, where the extra cue helps
 *            a grid read as objects landing rather than text fading in.
 * `sweep`  — a left-to-right clip reveal for rules and progress rails.
 * `fade`   — opacity only, for anything already in its final position.
 */
export type RevealVariant = 'rise' | 'settle' | 'sweep' | 'fade';

interface RevealProps {
  children: ReactNode;
  /** Stagger position. Multiplied by the shared 60ms step and capped. */
  index?: number;
  variant?: RevealVariant;
  /** Distance travelled during the entrance, in px. */
  distance?: number;
  component?: ElementType;
  /** Anchor target, when the revealed block is a deep-link destination. */
  id?: string;
  sx?: SxProps<Theme>;
}

const hiddenTransform = (variant: RevealVariant, distance: number) => {
  switch (variant) {
    case 'settle':
      return `translate3d(0, ${distance}px, 0) scale(0.985)`;
    case 'rise':
      return `translate3d(0, ${distance}px, 0)`;
    default:
      return 'none';
  }
};

/**
 * Entrance animation for content blocks.
 *
 * Deliberately restrained: `opacity`, `transform` and `clip-path` only, so no
 * layout is recalculated and nothing on the page shifts as elements arrive.
 *
 * The stagger index is capped at `motion.staggerCap`. Without that, a
 * twelve-card grid staggered linearly puts the last card 720ms behind the
 * first, which stops reading as choreography and starts reading as the page
 * still loading.
 *
 * Under `prefers-reduced-motion` the content renders in its final state with
 * no transition and the observer is never created.
 */
export function Reveal({
  children,
  index = 0,
  variant = 'rise',
  distance = 18,
  component = 'div',
  id,
  sx,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ disabled: reduced });

  const delay = Math.min(index, motion.staggerCap) * motion.stagger;
  const properties = variant === 'sweep' ? ['opacity', 'clip-path'] : ['opacity', 'transform'];

  return (
    <Box
      ref={ref}
      component={component}
      id={id}
      sx={[
        {
          opacity: inView ? 1 : 0,
          ...(variant === 'sweep'
            ? { clipPath: inView ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }
            : { transform: inView ? 'none' : hiddenTransform(variant, distance) }),
          transition: reduced
            ? 'none'
            : properties
                .map(
                  (property) =>
                    `${property} ${motion.duration.entrance}ms ${motion.easing.standard} ${delay}ms`,
                )
                .join(', '),
          // Dropped once the entrance is done: a permanent `will-change` keeps
          // a compositor layer alive for every revealed block on the page.
          willChange: inView ? 'auto' : properties.join(', '),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
