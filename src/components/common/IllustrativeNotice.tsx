import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Info } from 'lucide-react';
import { illustrativeNotice } from '@/data/caseStudies';

/**
 * Disclosure shown wherever engagement patterns appear.
 *
 * These records describe how problems are approached, not work delivered for
 * named clients. Stating that plainly wherever they are rendered is the
 * difference between an illustrative example and a false claim.
 */
export function IllustrativeNotice({ compact = false }: { compact?: boolean }) {
  return (
    <Box
      role="note"
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        p: compact ? 1.75 : 2.25,
        border: '1px solid',
        borderColor: 'hairline',
        borderLeft: '2px solid',
        borderLeftColor: 'brandAzure',
        borderRadius: '4px',
        bgcolor: 'action.hover',
      }}
    >
      <Box
        component="span"
        aria-hidden="true"
        sx={{ display: 'inline-flex', mt: '2px', color: 'accentText', flexShrink: 0 }}
      >
        <Info size={16} strokeWidth={1.75} />
      </Box>
      <Typography variant="caption" component="p" sx={{ color: 'text.secondary' }}>
        {illustrativeNotice}
      </Typography>
    </Box>
  );
}
