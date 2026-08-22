import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/common/Reveal';
import { CornerTicks, Eyebrow, GlowBackdrop, GridBackdrop } from '@/components/ui';
import { radius } from '@/theme/tokens';

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
 * An inset dark panel on a light section rather than another full-bleed dark
 * band. The inset reads as a distinct object — the page's final statement —
 * and it keeps a light tone between the last content section and the dark
 * footer, so the page does not end in one long dark run.
 *
 * The panel sets `data-color-scheme="dark"` for its own subtree. In the light
 * theme that is a deliberate inversion — the page's final statement rendered
 * as a dark plate, the same device the header and footer use — and in the dark
 * theme it simply matches. Either way the buttons and text inside pick up
 * dark-scheme colours with no nested `ThemeProvider` and no colour props.
 *
 * Shared across every page so the final screen is consistent, and worded as an
 * invitation to a technical conversation rather than a sales pitch.
 */
export function CallToAction({
  eyebrow = 'Ready to start?',
  title = 'Tell us what the system has to do.',
  body = 'Send the problem, the constraints and the deadline. You will get a considered technical response from an engineer — not a brochure, and not a discovery call that turns out to be a sales script.',
  primaryLabel = 'Start a Project',
  primaryHref = '/contact',
  secondaryLabel = 'See how we work',
  secondaryHref = '/about',
}: CallToActionProps) {
  return (
    <Section tone="band" aria-labelledby="cta-heading">
      <Reveal variant="settle" distance={22}>
        <Box
          data-color-scheme="dark"
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: `${radius.xl}px`,
            border: '1px solid',
            borderColor: 'hairline',
            bgcolor: 'surfaceCanvas',
            color: 'text.primary',
            px: { xs: 3, sm: 5, md: 8 },
            py: { xs: 6, md: 9 },
            textAlign: 'center',
          }}
        >
          <GridBackdrop size={64} mask="center" opacity={0.6} />
          <GlowBackdrop position="top" spread={70} />
          <CornerTicks inset={16} />

          <Box sx={{ position: 'relative', maxWidth: 720, mx: 'auto' }}>
            <Eyebrow align="center" rule={false} sx={{ mb: 3, justifyContent: 'center' }}>
              {eyebrow}
            </Eyebrow>

            <Typography variant="h1" component="h2" id="cta-heading" sx={{ textWrap: 'balance' }}>
              {title}
            </Typography>

            <Typography
              variant="subtitle1"
              component="p"
              sx={{ mt: 3, color: 'text.secondary', mx: 'auto', maxWidth: '58ch' }}
            >
              {body}
            </Typography>

            <Box
              sx={{
                mt: 5,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center',
                '& > a': { width: { xs: '100%', sm: 'auto' } },
              }}
            >
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
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}
