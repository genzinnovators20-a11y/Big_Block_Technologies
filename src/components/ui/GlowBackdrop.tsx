import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

export type GlowPosition = 'topLeft' | 'topRight' | 'top' | 'bottomLeft' | 'bottomRight' | 'center';

const ORIGINS: Record<GlowPosition, string> = {
  topLeft: '14% 6%',
  topRight: '86% 8%',
  top: '50% -6%',
  bottomLeft: '10% 96%',
  bottomRight: '90% 94%',
  center: '50% 50%',
};

interface GlowBackdropProps {
  position?: GlowPosition;
  /** Radius of the wash as a percentage of the section box. */
  spread?: number;
  /** 0–1 multiplier on the palette's glow token. */
  intensity?: number;
  sx?: SxProps<Theme>;
}

/**
 * A single soft azure wash.
 *
 * Its only job is to stop a large dark section reading as a flat black plate.
 * Deliberately one wash per section, at low intensity — stacking several is
 * what produces the "AI gradient soup" look the brand avoids.
 *
 * Implemented as a static radial gradient rather than a blurred element:
 * `filter: blur()` on a large box forces the compositor to allocate and
 * re-rasterise a full-size texture, which is measurable on scroll.
 */
export function GlowBackdrop({
  position = 'topRight',
  spread = 55,
  intensity = 1,
  sx,
}: GlowBackdropProps) {
  return (
    <Box
      aria-hidden="true"
      sx={[
        (theme) => ({
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `radial-gradient(ellipse ${spread}% ${spread * 0.9}% at ${ORIGINS[position]}, ${theme.vars.palette.glowAzure} 0%, transparent 68%)`,
          opacity: intensity,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
