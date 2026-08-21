import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/common/Reveal';

interface CallToActionProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/**
 * Closing call to action.
 *
 * Shared across every page so the final screen is consistent, and worded as an
 * invitation to a technical conversation rather than a sales pitch.
 */
export function CallToAction({
  eyebrow = 'Start a conversation',
  title = 'Tell us what the system has to do.',
  body = 'Send the problem, the constraints and the deadline. You will get a considered technical response from an engineer — not a brochure, and not a discovery call that turns out to be a sales script.',
  primaryLabel = 'Start a Project',
  primaryHref = '/contact',
  secondaryLabel = 'See how we work',
  secondaryHref = '/about',
}: CallToActionProps) {
  return (
    <Section tone="ink" dividerTop grid aria-labelledby="cta-heading">
      <Box sx={{ maxWidth: 760 }}>
        <Reveal>
          <Typography
            variant="label"
            component="p"
            sx={{ color: 'accentText', display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}
          >
            <Box
              component="span"
              aria-hidden="true"
              sx={{ width: 26, height: '1px', bgcolor: 'brandAzure' }}
            />
            {eyebrow}
          </Typography>

          <Typography variant="h1" component="h2" id="cta-heading" sx={{ textWrap: 'balance' }}>
            {title}
          </Typography>

          <Typography variant="subtitle1" component="p" sx={{ mt: 3, color: 'text.secondary' }}>
            {body}
          </Typography>
        </Reveal>

        <Reveal index={1}>
          <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Button
              component={RouterLink}
              to={primaryHref}
              size="large"
              endIcon={<ArrowRight size={17} strokeWidth={2} aria-hidden="true" />}
            >
              {primaryLabel}
            </Button>
            <Button component={RouterLink} to={secondaryHref} variant="outlined" size="large">
              {secondaryLabel}
            </Button>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
