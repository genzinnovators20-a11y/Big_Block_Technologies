import Box from '@mui/material/Box';
import { surface } from '@/theme/tokens';

const CORNERS = ['tl', 'tr', 'bl', 'br'] as const;

interface CornerTicksProps {
  /** Tick arm length in px. */
  size?: number;
  /** Inset from the container edge. */
  inset?: number;
  color?: string;
}

/**
 * Technical-drawing corner marks.
 *
 * Four L-shaped ticks instead of a full border. A closed rectangle turns a
 * diagram into a card and implies it is a separate object; corner ticks read
 * as registration marks on a drawing, which is the register this brand wants
 * around its figures.
 *
 * The parent must be `position: relative`.
 */
export function CornerTicks({
  size = surface.tickSize,
  inset = 0,
  color = 'hairlineStrong',
}: CornerTicksProps) {
  return (
    <>
      {CORNERS.map((corner) => (
        <Box
          key={corner}
          aria-hidden="true"
          sx={{
            position: 'absolute',
            width: size,
            height: size,
            borderColor: color,
            pointerEvents: 'none',
            ...(corner === 'tl' && {
              top: inset,
              left: inset,
              borderTop: '1px solid',
              borderLeft: '1px solid',
            }),
            ...(corner === 'tr' && {
              top: inset,
              right: inset,
              borderTop: '1px solid',
              borderRight: '1px solid',
            }),
            ...(corner === 'bl' && {
              bottom: inset,
              left: inset,
              borderBottom: '1px solid',
              borderLeft: '1px solid',
            }),
            ...(corner === 'br' && {
              bottom: inset,
              right: inset,
              borderBottom: '1px solid',
              borderRight: '1px solid',
            }),
          }}
        />
      ))}
    </>
  );
}
