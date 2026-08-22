import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Where the grid is legible before it fades out.
 *
 * Every preset fades to transparent well before the section edge. A grid that
 * tiles edge to edge reads as a background texture; one that fades reads as a
 * drawing the content is sitting on.
 */
export type GridMask = 'center' | 'topLeft' | 'topRight' | 'bottom' | 'left' | 'right';

const MASKS: Record<GridMask, string> = {
  center: 'radial-gradient(ellipse 80% 62% at 50% 42%, #000 18%, transparent 78%)',
  topLeft: 'radial-gradient(ellipse 72% 72% at 24% 26%, #000 6%, transparent 74%)',
  topRight: 'radial-gradient(ellipse 68% 76% at 78% 22%, #000 4%, transparent 72%)',
  bottom: 'radial-gradient(ellipse 92% 56% at 50% 104%, #000 8%, transparent 76%)',
  left: 'radial-gradient(ellipse 58% 92% at 10% 50%, #000 2%, transparent 70%)',
  right: 'radial-gradient(ellipse 58% 92% at 92% 50%, #000 2%, transparent 70%)',
};

interface GridBackdropProps {
  /** Cell size in px. */
  size?: number;
  mask?: GridMask;
  opacity?: number;
  sx?: SxProps<Theme>;
}

/**
 * The engineering grid.
 *
 * One implementation for the whole site — it previously existed as three
 * near-identical copies in `Hero`, `PageHero` and `Section`, which meant a
 * change to the mask had to be made in three places and had drifted in two.
 *
 * Purely decorative, so it is hidden from assistive technology and never
 * intercepts pointer events.
 */
export function GridBackdrop({
  size = 72,
  mask = 'center',
  opacity = 0.7,
  sx,
}: GridBackdropProps) {
  return (
    <Box
      aria-hidden="true"
      sx={[
        (theme) => ({
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `linear-gradient(to right, ${theme.vars.palette.gridLine} 1px, transparent 1px), linear-gradient(to bottom, ${theme.vars.palette.gridLine} 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px`,
          maskImage: MASKS[mask],
          WebkitMaskImage: MASKS[mask],
          opacity,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
