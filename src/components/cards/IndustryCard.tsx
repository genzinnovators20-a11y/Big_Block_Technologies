import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ArrowCue, SurfaceCard, TagRow } from '@/components/ui';
import type { Industry } from '@/types/content';
import { motion, radius } from '@/theme/tokens';

interface IndustryCardProps {
  industry: Industry;
  /** `challenge` leads with the sector's failure mode; `approach` with the fix. */
  lead?: 'challenge' | 'approach';
}

/**
 * A sector, framed as an engineering problem.
 *
 * Leads with what goes wrong in that industry rather than a claim about
 * experience in it — no client work can be cited, and "we have deep healthcare
 * expertise" is unverifiable, whereas "clinical software is used under time
 * pressure" is a statement a reader can judge on its merits.
 */
export function IndustryCard({ industry, lead = 'challenge' }: IndustryCardProps) {
  const { Icon } = industry;

  return (
    <SurfaceCard
      interactive
      component={RouterLink}
      to={`/industries#${industry.slug}`}
      padding="md"
      sx={{
        gap: 2,
        '&:hover .ind-icon': { borderColor: 'cardBorderHover', color: 'accentText' },
        '&:hover .arrow-cue': { opacity: 1, transform: 'translateX(0)' },
        '&:hover .ind-name': { color: 'accentText' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75 }}>
        <Box
          className="ind-icon"
          aria-hidden="true"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 38,
            height: 38,
            flexShrink: 0,
            borderRadius: `${radius.md}px`,
            border: '1px solid',
            borderColor: 'hairline',
            bgcolor: 'action.hover',
            color: 'text.secondary',
            transition: `border-color ${motion.duration.base}ms ${motion.easing.standard}, color ${motion.duration.base}ms ${motion.easing.standard}`,
          }}
        >
          <Icon size={18} strokeWidth={1.75} />
        </Box>

        <Typography
          className="ind-name"
          variant="h5"
          component="h3"
          sx={{ flex: 1, transition: `color ${motion.duration.fast}ms ${motion.easing.standard}` }}
        >
          {industry.name}
        </Typography>

        <ArrowCue size={15} restOpacity={0.3} />
      </Box>

      <Typography variant="body2" sx={{ color: 'text.secondary', flex: 1 }}>
        {lead === 'challenge' ? industry.challenge : industry.approach}
      </Typography>

      <TagRow items={industry.systems} max={3} variant="bullet" size="sm" sx={{ mt: 'auto' }} />
    </SurfaceCard>
  );
}
