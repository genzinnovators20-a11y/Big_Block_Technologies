import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

interface IndexBadgeProps {
  /** Either a pre-formatted string ("01") or a zero-based position. */
  value: string | number;
  size?: 'sm' | 'md';
  sx?: SxProps<Theme>;
}

/**
 * Ordinal marker for numbered systems.
 *
 * Rendered as plain monospace type rather than a filled chip. A numbered badge
 * with a background competes with the card border for attention and turns an
 * index into a decoration; the number alone stays subordinate to the title,
 * which is what it should be.
 *
 * `aria-hidden` because the ordering is already carried by the surrounding
 * `ol`/`li` structure — announcing "zero one" before every heading is noise.
 */
export function IndexBadge({ value, size = 'md', sx }: IndexBadgeProps) {
  const label = typeof value === 'number' ? String(value + 1).padStart(2, '0') : value;

  return (
    <Typography
      variant="label"
      component="span"
      aria-hidden="true"
      sx={[
        {
          color: 'accentText',
          fontSize: size === 'sm' ? '0.6875rem' : '0.8125rem',
          letterSpacing: '0.1em',
          lineHeight: 1,
          flexShrink: 0,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {label}
    </Typography>
  );
}
