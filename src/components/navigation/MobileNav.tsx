import { Link as RouterLink, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ArrowUpRight, X } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from './ThemeToggle';
import { mobileNav, primaryCta } from '@/config/navigation';
import { contactConfig } from '@/config/site';
import { motion } from '@/theme/tokens';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Mobile navigation.
 *
 * A full-height sheet rather than a shrunken copy of the desktop bar: every
 * destination is listed flat, grouped by section, with row targets well above
 * the 44px minimum. MUI's Drawer supplies the focus trap, scroll lock and
 * Escape handling.
 */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const location = useLocation();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: { xs: '100%', sm: 400 }, maxWidth: '100vw' } } }}
      aria-label="Site navigation"
    >
      <Box
        // Part of the header chrome, so it stays dark in both themes.
        data-color-scheme="dark"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // Full height rather than min-height so the link list becomes the
          // only scrolling region. Previously the whole drawer scrolled, which
          // put "Start a Project" below the fold on a short phone — and adding
          // the theme row pushed it further down still.
          height: '100%',
          bgcolor: 'surfaceCanvas',
          // Keeps content clear of the notch and the gesture bar.
          pt: 'env(safe-area-inset-top)',
          pb: 'env(safe-area-inset-bottom)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            height: 72,
            borderBottom: '1px solid',
            borderColor: 'hairline',
          }}
        >
          <Logo height={28} />
          <IconButton onClick={onClose} aria-label="Close navigation menu" sx={{ mr: -1 }}>
            <X size={22} strokeWidth={1.75} aria-hidden="true" />
          </IconButton>
        </Box>

        <Box
          component="nav"
          aria-label="Mobile"
          sx={{
            flex: 1,
            // `minHeight: 0` is what actually lets a flex child scroll; without
            // it the item shrinks to its content and the overflow never engages.
            minHeight: 0,
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            px: 3,
            py: 4,
          }}
        >
          {mobileNav.map((group, groupIndex) => (
            <Box key={group.section} sx={{ mb: groupIndex === mobileNav.length - 1 ? 0 : 5 }}>
              <Typography variant="label" component="p" sx={{ color: 'text.disabled', mb: 1.5 }}>
                {group.section}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {group.links.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Box
                      key={link.href}
                      component={RouterLink}
                      to={link.href}
                      onClick={onClose}
                      aria-current={isActive ? 'page' : undefined}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // Generous row height: comfortable thumb target.
                        minHeight: 56,
                        borderBottom: '1px solid',
                        borderColor: 'hairline',
                        color: isActive ? 'text.primary' : 'text.secondary',
                        transition: `color ${motion.duration.fast}ms ${motion.easing.standard}`,
                        '&:active': { color: 'text.primary' },
                      }}
                    >
                      <Typography
                        variant="h5"
                        component="span"
                        sx={{ fontFamily: 'inherit', fontSize: '1.125rem', fontWeight: isActive ? 600 : 500 }}
                      >
                        {link.label}
                      </Typography>
                      {isActive ? (
                        <Box
                          aria-hidden="true"
                          sx={{ width: 6, height: 6, bgcolor: 'brandAzure', flexShrink: 0 }}
                        />
                      ) : (
                        <ArrowUpRight
                          size={17}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          style={{ opacity: 0.4, flexShrink: 0 }}
                        />
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            flexShrink: 0,
            px: 3,
            pb: 4,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'hairline',
          }}
        >
          {/* Also present as an icon in the header bar, but a labelled row is
              far more discoverable on a phone — and the drawer is where a
              mobile visitor looks for settings-like controls. */}
          <Box sx={{ mb: 2, mx: -1.5 }}>
            <ThemeToggle variant="row" />
          </Box>

          <Button component={RouterLink} to={primaryCta.href} onClick={onClose} fullWidth size="large">
            {primaryCta.label}
          </Button>

          {contactConfig.email && (
            <Typography variant="body2" sx={{ mt: 2.5, color: 'text.secondary' }}>
              <Box component="a" href={`mailto:${contactConfig.email}`} sx={{ color: 'primary.light' }}>
                {contactConfig.email}
              </Box>
            </Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
