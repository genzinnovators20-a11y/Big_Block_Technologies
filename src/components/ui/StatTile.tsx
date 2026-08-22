import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { SurfaceCard } from './SurfaceCard';

interface StatTileProps {
  /** The headline term. Kept short — two or three words at most. */
  value: ReactNode;
  /** What the term refers to. */
  label: string;
  /** Optional supporting sentence. */
  detail?: string;
  /** Fills the tile with brand azure. Use for at most one tile in a group. */
  emphasis?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * A single claim, given tile weight.
 *
 * Deliberately typed to `ReactNode` rather than `number`: this site has no
 * verified figures to publish, so these tiles carry qualitative claims
 * ("Written down", "You own it") rather than fabricated counts. If real,
 * approved metrics ever exist they drop straight in.
 *
 * `emphasis` fills one tile in a group with brand colour so a mosaic has a
 * focal point instead of four equal-weight boxes.
 */
export function StatTile({ value, label, detail, emphasis = false, sx }: StatTileProps) {
  return (
    <SurfaceCard
      padding="md"
      highlight={!emphasis}
      sx={[
        emphasis
          ? (theme: Theme) => ({
              backgroundColor: theme.vars.palette.primary.main,
              borderColor: theme.vars.palette.primary.main,
              color: theme.vars.palette.primary.contrastText,
            })
          : {},
        { justifyContent: 'space-between', gap: 2 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        variant="h3"
        component="p"
        sx={{
          textWrap: 'balance',
          color: emphasis ? 'inherit' : 'text.primary',
        }}
      >
        {value}
      </Typography>

      <Box>
        <Typography
          variant="label"
          component="p"
          sx={{ color: emphasis ? 'inherit' : 'accentText', opacity: emphasis ? 0.85 : 1 }}
        >
          {label}
        </Typography>
        {detail && (
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: emphasis ? 'inherit' : 'text.secondary',
              opacity: emphasis ? 0.85 : 1,
            }}
          >
            {detail}
          </Typography>
        )}
      </Box>
    </SurfaceCard>
  );
}
