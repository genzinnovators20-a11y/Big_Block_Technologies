import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

interface EyebrowProps {
  children: ReactNode;
  /** Leading azure rule. Omitted inside cards, where it competes with the border. */
  rule?: boolean;
  align?: 'left' | 'center';
  component?: 'p' | 'span' | 'h2' | 'h3' | 'h4';
  sx?: SxProps<Theme>;
}

/**
 * The section label.
 *
 * A monospace micro-label above a display heading is the site's recurring
 * structural device: it tells a reader what a section is before they commit to
 * reading it, and gives a long page a consistent scanning rhythm.
 */
export function Eyebrow({
  children,
  rule = true,
  align = 'left',
  component = 'p',
  sx,
}: EyebrowProps) {
  return (
    <Typography
      variant="label"
      component={component}
      sx={[
        {
          color: 'accentText',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          justifyContent: align === 'center' ? 'center' : 'flex-start',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {rule && (
        <Box
          component="span"
          aria-hidden="true"
          sx={{ width: 24, height: '1px', bgcolor: 'brandAzure', flexShrink: 0 }}
        />
      )}
      {children}
    </Typography>
  );
}
