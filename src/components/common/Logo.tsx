import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import logoLockup from '@/assets/brand/bb-logo.png';
import markOnly from '@/assets/brand/bb-mark.png';
import { siteConfig } from '@/config/site';

interface LogoProps {
  /** `lockup` is the mark plus wordmark; `mark` is the cube alone. */
  variant?: 'lockup' | 'mark';
  /** Rendered height in px. Width follows the artwork's aspect ratio. */
  height?: number;
  /** Wrap in a link to the homepage. */
  href?: string | false;
}

// Intrinsic dimensions of the source artwork, used to reserve exact space and
// keep the header free of layout shift while the image decodes.
const INTRINSIC = {
  lockup: { src: logoLockup, w: 340, h: 118 },
  mark: { src: markOnly, w: 140, h: 169 },
} as const;

/**
 * Brand lockup.
 *
 * The artwork is light-on-transparent, so it is only ever placed on dark
 * surfaces — the header and footer both stay dark for exactly this reason.
 */
export function Logo({ variant = 'lockup', height = 30, href = '/' }: LogoProps) {
  const art = INTRINSIC[variant];
  const width = Math.round((art.w / art.h) * height);

  const image = (
    <Box
      component="img"
      src={art.src}
      width={width}
      height={height}
      alt={href === false ? siteConfig.name : ''}
      // The wrapping link carries the accessible name, so the image itself is
      // decorative in that case and must not be announced twice.
      aria-hidden={href === false ? undefined : true}
      loading="eager"
      decoding="async"
      sx={{ width, height, objectFit: 'contain', flexShrink: 0 }}
    />
  );

  if (href === false) return image;

  return (
    <Box
      component={RouterLink}
      to={href}
      aria-label={`${siteConfig.name} — home`}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        // The artwork is shorter than the minimum target, so the link itself
        // provides the height rather than relying on the image box.
        minHeight: 44,
        borderRadius: '2px',
        lineHeight: 0,
        transition: 'opacity 150ms ease',
        '&:hover': { opacity: 0.82 },
      }}
    >
      {image}
    </Box>
  );
}
