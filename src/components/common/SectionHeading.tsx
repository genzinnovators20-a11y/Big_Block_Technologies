import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  /** Monospace eyebrow. Carries the section index or category. */
  eyebrow?: string;
  title: ReactNode;
  /** Supporting sentence. Kept to a readable measure. */
  lede?: ReactNode;
  /** `h2` for page sections, `h1` only for the page's single main heading. */
  component?: 'h1' | 'h2' | 'h3';
  variant?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
  id?: string;
  /** Trailing content such as a link, aligned to the heading on wide screens. */
  action?: ReactNode;
  maxWidth?: number | string;
}

/**
 * The standard section header.
 *
 * A monospace eyebrow above a display heading is the site's recurring
 * structural device: it labels what a section is before the reader commits to
 * it, and gives long pages a consistent scanning rhythm.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  component = 'h2',
  variant = 'h2',
  align = 'left',
  id,
  action,
  maxWidth = 720,
}: SectionHeadingProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: action ? 'row' : 'column' },
        alignItems: { xs: 'flex-start', md: action ? 'flex-end' : 'stretch' },
        justifyContent: 'space-between',
        gap: { xs: 3, md: 6 },
        textAlign: align,
        ...(align === 'center' && { alignItems: 'center', mx: 'auto' }),
      }}
    >
      <Reveal sx={{ maxWidth, width: '100%' }}>
        {eyebrow && (
          <Typography
            variant="label"
            component="p"
            sx={{
              color: 'accentText',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              justifyContent: align === 'center' ? 'center' : 'flex-start',
            }}
          >
            <Box
              component="span"
              aria-hidden="true"
              sx={{ width: 22, height: '1px', bgcolor: 'brandAzure', flexShrink: 0 }}
            />
            {eyebrow}
          </Typography>
        )}

        <Typography variant={variant} component={component} id={id} sx={{ textWrap: 'balance' }}>
          {title}
        </Typography>

        {lede && (
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              mt: 3,
              color: 'text.secondary',
              maxWidth: '62ch',
              ...(align === 'center' && { mx: 'auto' }),
            }}
          >
            {lede}
          </Typography>
        )}
      </Reveal>

      {action && (
        <Reveal index={1} sx={{ flexShrink: 0 }}>
          {action}
        </Reveal>
      )}
    </Box>
  );
}
