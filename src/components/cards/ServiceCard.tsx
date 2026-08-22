import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ArrowCue, SurfaceCard, TagRow } from '@/components/ui';
import type { Service } from '@/types/content';
import { motion, radius } from '@/theme/tokens';

interface ServiceCardProps {
  service: Service;
  /** `full` adds the problem statement. Used on the services page. */
  detail?: 'compact' | 'full';
}

/**
 * A single capability.
 *
 * The icon sits in a tinted container that lifts on hover, which gives the
 * card a focal point without needing an illustration. The technology tags come
 * from the service's real stack rather than invented sub-features, so the card
 * says something checkable about how the work is actually done.
 */
export function ServiceCard({ service, detail = 'compact' }: ServiceCardProps) {
  const { Icon } = service;

  return (
    <SurfaceCard
      interactive
      component={RouterLink}
      to={`/services#${service.id}`}
      padding="md"
      sx={{
        gap: 2,
        '&:hover .svc-icon': {
          borderColor: 'cardBorderHover',
          color: 'accentText',
        },
        '&:hover .arrow-cue': { opacity: 1, transform: 'translateX(0)' },
        '&:hover .svc-name': { color: 'accentText' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
        <Box
          className="svc-icon"
          aria-hidden="true"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 42,
            height: 42,
            flexShrink: 0,
            borderRadius: `${radius.md}px`,
            border: '1px solid',
            borderColor: 'hairline',
            bgcolor: 'action.hover',
            color: 'text.secondary',
            transition: `border-color ${motion.duration.base}ms ${motion.easing.standard}, color ${motion.duration.base}ms ${motion.easing.standard}`,
          }}
        >
          <Icon size={20} strokeWidth={1.75} />
        </Box>

        <ArrowCue size={15} restOpacity={0.35} sx={{ mt: 1 }} />
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography
          className="svc-name"
          variant="h5"
          component="h3"
          sx={{ transition: `color ${motion.duration.fast}ms ${motion.easing.standard}` }}
        >
          {service.name}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          {service.summary}
        </Typography>

        {detail === 'full' && (
          <Typography variant="body2" sx={{ mt: 1.5, color: 'text.secondary' }}>
            {service.problem}
          </Typography>
        )}
      </Box>

      <TagRow items={service.stack} max={4} size="sm" sx={{ mt: 'auto', pt: 1 }} />
    </SurfaceCard>
  );
}
