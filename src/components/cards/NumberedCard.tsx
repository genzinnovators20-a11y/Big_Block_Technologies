import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { IndexBadge, SurfaceCard, TagRow } from '@/components/ui';
import { motion } from '@/theme/tokens';

interface NumberedCardProps {
  index: number | string;
  title: string;
  body: string;
  /** Optional supporting tags beneath the body. */
  tags?: string[];
  /** Marks the entry as one of a numbered list for assistive technology. */
  component?: 'li' | 'div';
  sx?: SxProps<Theme>;
}

/**
 * One entry in a numbered system.
 *
 * Used for the blockchain capability grid and the commitments grid. The index
 * sits above a hairline rather than inside a filled badge, so the number
 * organises the card without competing with its title.
 *
 * Not interactive by default: these cards state something rather than
 * navigating somewhere, and a hover lift on a non-link is a false affordance.
 */
export function NumberedCard({
  index,
  title,
  body,
  tags,
  component = 'div',
  sx,
}: NumberedCardProps) {
  return (
    <SurfaceCard
      component={component}
      padding="md"
      sx={[
        {
          gap: 1.5,
          transition: `border-color ${motion.duration.base}ms ${motion.easing.standard}`,
          '@media (hover: hover)': {
            '&:hover': { borderColor: 'hairlineStrong' },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          pb: 1.5,
          borderBottom: '1px solid',
          borderColor: 'hairline',
        }}
      >
        <IndexBadge value={index} />
        <Box aria-hidden="true" sx={{ flex: 1, height: '1px', bgcolor: 'hairline' }} />
      </Box>

      <Typography variant="h5" component="h3">
        {title}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', flex: 1 }}>
        {body}
      </Typography>

      {tags && tags.length > 0 && (
        <TagRow items={tags} max={3} size="sm" sx={{ mt: 'auto', pt: 1 }} />
      )}
    </SurfaceCard>
  );
}
