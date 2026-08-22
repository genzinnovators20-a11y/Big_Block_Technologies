import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { fonts, radius } from '@/theme/tokens';

type StatusTone = 'accent' | 'success' | 'neutral';

/** Shape fills — markers and dots, where the 3:1 non-text threshold applies. */
const TONE_COLOR: Record<StatusTone, string> = {
  accent: 'brandAzure',
  success: 'success.main',
  neutral: 'text.disabled',
};

/**
 * Text colours.
 *
 * The pure brand azure measures 4.26:1 against the panel surface, which fails
 * AA for the 10px status label that used it. `accentText` carries the same hue
 * at a luminance that passes — the same distinction the palette already draws
 * between `brandAzure` (shapes) and `accentText` (type).
 */
const TONE_TEXT: Record<StatusTone, string> = {
  accent: 'accentText',
  success: 'success.main',
  neutral: 'text.secondary',
};

interface TechPanelProps {
  /** Monospace header label, e.g. "deploy.pipeline". */
  label: string;
  /** Optional right-aligned status, e.g. "LIVE". */
  status?: string;
  statusTone?: StatusTone;
  children: ReactNode;
  /** Slightly denser padding for panels that float over other content. */
  dense?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * Dashboard-style technical panel.
 *
 * The device that makes the site read as "a company that operates systems"
 * rather than "a company that markets them": a monospace header, a state
 * marker, and a body of structured rows.
 *
 * It is a static composition, not a live readout. Nothing in it claims to be
 * real telemetry — the content passed in is always either a label for a
 * diagram or a genuine fact from the content model, never an invented metric
 * dressed up as a monitoring dashboard.
 */
export function TechPanel({
  label,
  status,
  statusTone = 'accent',
  children,
  dense = false,
  sx,
}: TechPanelProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          borderRadius: `${radius.lg}px`,
          border: '1px solid',
          borderColor: theme.vars.palette.cardBorder,
          backgroundColor: theme.vars.palette.surfaceRaised,
          overflow: 'hidden',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          px: dense ? 1.75 : 2.25,
          py: dense ? 1.25 : 1.5,
          borderBottom: '1px solid',
          borderColor: 'hairline',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
          <Box
            aria-hidden="true"
            sx={{
              width: 6,
              height: 6,
              flexShrink: 0,
              bgcolor: TONE_COLOR[statusTone],
            }}
          />
          <Typography
            component="span"
            sx={{
              fontFamily: fonts.mono,
              fontSize: '0.75rem',
              letterSpacing: '0.04em',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {label}
          </Typography>
        </Box>

        {status && (
          <Typography
            component="span"
            sx={{
              fontFamily: fonts.mono,
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: TONE_TEXT[statusTone],
              border: '1px solid',
              borderColor: 'hairline',
              borderRadius: `${radius.xs}px`,
              px: 0.75,
              py: 0.25,
              flexShrink: 0,
            }}
          >
            {status}
          </Typography>
        )}
      </Box>

      <Box sx={{ px: dense ? 1.75 : 2.25, py: dense ? 1.5 : 2 }}>{children}</Box>
    </Box>
  );
}

interface PanelRowProps {
  label: string;
  value: string;
  /** Small marker before the label: a tick, a dot, or nothing. */
  marker?: 'check' | 'dot' | 'none';
  tone?: StatusTone;
}

/**
 * One line inside a `TechPanel`. Label left, value right, tabular figures so a
 * column of numbers stays aligned and does not shift as values change width.
 */
export function PanelRow({ label, value, marker = 'none', tone = 'neutral' }: PanelRowProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        py: 0.6,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
        {marker === 'check' && (
          <Box
            component="span"
            aria-hidden="true"
            sx={{
              width: 9,
              height: 5,
              flexShrink: 0,
              borderLeft: '1.5px solid',
              borderBottom: '1.5px solid',
              borderColor: TONE_COLOR[tone],
              transform: 'rotate(-45deg)',
              mb: '3px',
            }}
          />
        )}
        {marker === 'dot' && (
          <Box
            component="span"
            aria-hidden="true"
            sx={{ width: 5, height: 5, flexShrink: 0, bgcolor: TONE_COLOR[tone] }}
          />
        )}
        <Typography
          component="span"
          sx={{
            fontFamily: fonts.mono,
            fontSize: '0.75rem',
            color: 'text.secondary',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {label}
        </Typography>
      </Box>

      <Typography
        component="span"
        sx={{
          fontFamily: fonts.mono,
          fontSize: '0.75rem',
          fontVariantNumeric: 'tabular-nums',
          color: 'text.primary',
          flexShrink: 0,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
