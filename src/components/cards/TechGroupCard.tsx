import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SurfaceCard } from '@/components/ui';
import { fonts, motion, radius } from '@/theme/tokens';

interface TechGroupCardProps {
  title: string;
  items: string[];
}

/**
 * One group in the technology matrix.
 *
 * Text chips rather than vendor logos. Reproducing third-party marks would
 * imply partnership or certification, none of which has been established — and
 * a logo wall costs a network request per vendor to say something less precise
 * than the name itself.
 *
 * Chips are individually hover-lit so the block feels alive under the cursor
 * without any of them being interactive: they are a statement of what the team
 * works with, not a set of links.
 */
export function TechGroupCard({ title, items }: TechGroupCardProps) {
  return (
    <SurfaceCard padding="md" sx={{ gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box aria-hidden="true" sx={{ width: 5, height: 5, bgcolor: 'brandAzure', flexShrink: 0 }} />
        <Typography variant="label" component="h3" sx={{ color: 'text.primary' }}>
          {title}
        </Typography>
      </Box>

      <Box
        component="ul"
        sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}
      >
        {items.map((item) => (
          <Box
            component="li"
            key={item}
            sx={{
              px: 1.125,
              py: 0.625,
              fontFamily: fonts.mono,
              fontSize: '0.75rem',
              lineHeight: 1.4,
              letterSpacing: '0.01em',
              color: 'text.secondary',
              border: '1px solid',
              borderColor: 'hairline',
              borderRadius: `${radius.sm}px`,
              bgcolor: 'action.hover',
              overflowWrap: 'anywhere',
              transition: `border-color ${motion.duration.fast}ms ${motion.easing.standard}, color ${motion.duration.fast}ms ${motion.easing.standard}`,
              '@media (hover: hover)': {
                '&:hover': { borderColor: 'cardBorderHover', color: 'text.primary' },
              },
            }}
          >
            {item}
          </Box>
        ))}
      </Box>
    </SurfaceCard>
  );
}
