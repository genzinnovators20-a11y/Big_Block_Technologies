import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { IndexBadge, SurfaceCard, TagRow } from '@/components/ui';
import type { Solution } from '@/types/content';
import { radius } from '@/theme/tokens';

interface SolutionCardProps {
  solution: Solution;
  index: number;
  /** `full` shows the fit signals as well as what the engagement includes. */
  detail?: 'compact' | 'full';
}

/**
 * A solution, led by its business outcome.
 *
 * The outcome is set in display type above the name, because a reader arrives
 * with a problem rather than a preferred stack — "move off legacy systems
 * without a high-risk rewrite" identifies the right card far faster than
 * "Enterprise Modernisation" does.
 */
export function SolutionCard({ solution, index, detail = 'compact' }: SolutionCardProps) {
  const { Icon } = solution;

  return (
    <SurfaceCard padding="lg" id={solution.slug} sx={{ gap: 2.5, scrollMarginTop: 120 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          aria-hidden="true"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: `${radius.md}px`,
            border: '1px solid',
            borderColor: 'hairline',
            bgcolor: 'action.hover',
            color: 'accentText',
          }}
        >
          <Icon size={19} strokeWidth={1.75} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="label" component="p" sx={{ color: 'text.disabled' }}>
            {solution.name}
          </Typography>
        </Box>
        <IndexBadge value={index} />
      </Box>

      <Typography variant="h4" component="h3">
        {solution.outcome}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {solution.description}
      </Typography>

      {detail === 'full' && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
            gap: 3,
            pt: 2.5,
            mt: 'auto',
            borderTop: '1px solid',
            borderColor: 'hairline',
          }}
        >
          <Box>
            <Typography variant="label" component="h4" sx={{ color: 'text.disabled', mb: 1.5 }}>
              Signals this fits
            </Typography>
            <TagRow items={solution.signals} variant="bullet" size="sm" />
          </Box>
          <Box>
            <Typography variant="label" component="h4" sx={{ color: 'text.disabled', mb: 1.5 }}>
              What it includes
            </Typography>
            <TagRow items={solution.includes} variant="bullet" size="sm" />
          </Box>

          <Box sx={{ gridColumn: { sm: '1 / -1' } }}>
            <Button
              component={RouterLink}
              to={`/contact?solution=${solution.slug}`}
              variant="outlined"
              size="small"
              endIcon={<ArrowRight size={15} strokeWidth={2} aria-hidden="true" />}
            >
              Discuss this
            </Button>
          </Box>
        </Box>
      )}

      {detail === 'compact' && (
        <TagRow items={solution.includes} max={3} variant="bullet" size="sm" sx={{ mt: 'auto' }} />
      )}
    </SurfaceCard>
  );
}
