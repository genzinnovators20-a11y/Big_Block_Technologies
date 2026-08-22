import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { fonts, motion, radius } from '@/theme/tokens';

interface TagRowProps {
  items: string[];
  /** Cap the number shown; the remainder collapses into a "+n" tag. */
  max?: number;
  /** `bullet` is a marker plus text; `chip` is a bordered box. */
  variant?: 'bullet' | 'chip';
  size?: 'sm' | 'md';
  sx?: SxProps<Theme>;
}

/**
 * Compact capability tags.
 *
 * Used for the sub-capability lists under service cards and the technology
 * names in the stack matrix. Monospace, because these are technical terms
 * rather than prose, and the mono face is what tells a reader that at a glance.
 *
 * The `+n` overflow tag exists so a card with fourteen technologies and one
 * with four still occupy the same visual weight in a grid.
 */
export function TagRow({ items, max, variant = 'chip', size = 'md', sx }: TagRowProps) {
  const shown = max ? items.slice(0, max) : items;
  const overflow = max ? items.length - shown.length : 0;
  const fontSize = size === 'sm' ? '0.6875rem' : '0.75rem';

  return (
    <Box
      component="ul"
      sx={[
        {
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'flex',
          // Bullet lists read as a list: one item per line. Wrapping them
          // inline produced ragged rows where two short items shared a line
          // and the next wrapped alone, which looked accidental.
          flexDirection: variant === 'bullet' ? 'column' : 'row',
          flexWrap: variant === 'bullet' ? 'nowrap' : 'wrap',
          gap: variant === 'chip' ? 0.75 : 0.75,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {shown.map((item) => (
        <Box
          component="li"
          key={item}
          sx={{
            fontFamily: fonts.mono,
            fontSize,
            lineHeight: 1.45,
            letterSpacing: '0.02em',
            color: 'text.secondary',
            // Long names such as "Hyperledger Fabric" wrap rather than forcing
            // the grid column to a minimum width.
            overflowWrap: 'anywhere',

            ...(variant === 'chip' && {
              px: 1,
              py: 0.5,
              border: '1px solid',
              borderColor: 'hairline',
              borderRadius: `${radius.xs}px`,
              transition: `border-color ${motion.duration.fast}ms ${motion.easing.standard}, color ${motion.duration.fast}ms ${motion.easing.standard}`,
            }),

            ...(variant === 'bullet' && {
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
              '&::before': {
                content: '""',
                width: 4,
                height: 4,
                marginTop: '7px',
                backgroundColor: 'brandAzure',
                flexShrink: 0,
              },
            }),
          }}
        >
          {item}
        </Box>
      ))}

      {overflow > 0 && (
        <Box
          component="li"
          sx={{
            fontFamily: fonts.mono,
            fontSize,
            lineHeight: 1.45,
            color: 'text.disabled',
            ...(variant === 'chip' && {
              px: 1,
              py: 0.5,
              border: '1px dashed',
              borderColor: 'hairline',
              borderRadius: `${radius.xs}px`,
            }),
          }}
        >
          {`+${overflow}`}
        </Box>
      )}
    </Box>
  );
}
