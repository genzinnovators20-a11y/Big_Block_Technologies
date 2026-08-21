import { useCallback, useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { Menu as MenuIcon } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { primaryCta, primaryNav } from '@/config/navigation';
import { layout, motion, zIndex } from '@/theme/tokens';
import { MegaPanel } from './MegaPanel';
import { MobileNav } from './MobileNav';

/**
 * Primary site header.
 *
 * Fixed, and always dark regardless of the tone of the section beneath it —
 * the brand artwork is light-on-transparent, and a header that inverts as the
 * page scrolls would make the logo illegible half the time.
 */
export function Header() {
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const location = useLocation();

  // Condense the header once the page has moved away from the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Any navigation closes whatever was open.
  useEffect(() => {
    setOpenPanel(null);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const openWithCancel = useCallback((label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenPanel(label);
  }, []);

  // A short grace period stops the panel flickering shut while the pointer
  // crosses the gap between the trigger and the panel itself.
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenPanel(null), 140);
  }, []);

  const height = scrolled ? layout.headerHeightCondensed : layout.headerHeight;

  return (
    <>
      {/* Keyboard users reach the page content without tabbing the whole nav. */}
      <Box
        component="a"
        href="#main"
        sx={{
          position: 'fixed',
          top: 8,
          left: 8,
          zIndex: zIndex.toast,
          display: 'inline-flex',
          alignItems: 'center',
          minHeight: 44,
          px: 2,
          borderRadius: '4px',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontSize: '0.875rem',
          fontWeight: 600,
          transform: 'translateY(-200%)',
          '&:focus-visible': { transform: 'translateY(0)' },
        }}
      >
        Skip to main content
      </Box>

      <Box
        component="header"
        data-color-scheme="dark"
        onMouseLeave={scheduleClose}
        sx={{
          position: 'fixed',
          insetInline: 0,
          top: 0,
          zIndex: zIndex.header,
          bgcolor: scrolled ? 'rgba(6, 11, 20, 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
          borderBottom: '1px solid',
          borderColor: scrolled || openPanel ? 'hairline' : 'transparent',
          transition: `background-color ${motion.duration.base}ms ${motion.easing.standard}, border-color ${motion.duration.base}ms ${motion.easing.standard}`,
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 2, lg: 5 },
            height,
            transition: `height ${motion.duration.base}ms ${motion.easing.standard}`,
          }}
        >
          <Logo height={scrolled ? 26 : 30} />

          <Box
            component="nav"
            aria-label="Primary"
            sx={{
              display: { xs: 'none', lg: 'flex' },
              alignItems: 'center',
              gap: 0.5,
              ml: 1,
            }}
          >
            {primaryNav.map((item) => {
              const hasPanel = Boolean(item.columns || item.children);
              const isOpen = openPanel === item.label;
              const isActive =
                location.pathname === item.href ||
                (item.href !== '/' && location.pathname.startsWith(item.href));

              return (
                <Box
                  key={item.label}
                  onMouseEnter={() => (hasPanel ? openWithCancel(item.label) : scheduleClose())}
                  sx={{ position: 'relative' }}
                >
                  <Box
                    component={RouterLink}
                    to={item.href}
                    aria-expanded={hasPanel ? isOpen : undefined}
                    aria-haspopup={hasPanel ? 'true' : undefined}
                    onFocus={() => (hasPanel ? openWithCancel(item.label) : setOpenPanel(null))}
                    onKeyDown={(event: React.KeyboardEvent) => {
                      if (event.key === 'Escape') setOpenPanel(null);
                    }}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.75,
                      height: 44,
                      px: 1.75,
                      borderRadius: '4px',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      color: isActive || isOpen ? 'text.primary' : 'text.secondary',
                      transition: `color ${motion.duration.fast}ms ${motion.easing.standard}`,
                      '&:hover': { color: 'text.primary' },
                    }}
                  >
                    {item.label}
                    {hasPanel && (
                      <Box
                        component="span"
                        aria-hidden="true"
                        sx={{
                          width: 5,
                          height: 5,
                          borderRight: '1.5px solid currentColor',
                          borderBottom: '1.5px solid currentColor',
                          transform: isOpen ? 'rotate(-135deg)' : 'rotate(45deg)',
                          transformOrigin: 'center',
                          mt: isOpen ? '2px' : '-2px',
                          opacity: 0.7,
                          transition: `transform ${motion.duration.base}ms ${motion.easing.standard}`,
                        }}
                      />
                    )}
                  </Box>

                  {/* Active-page marker. Not colour alone — it is a shape. */}
                  {isActive && (
                    <Box
                      aria-hidden="true"
                      sx={{
                        position: 'absolute',
                        left: 14,
                        right: 14,
                        bottom: -2,
                        height: '2px',
                        bgcolor: 'brandAzure',
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>

          <Box sx={{ flex: 1 }} />

          <Button
            component={RouterLink}
            to={primaryCta.href}
            size="small"
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            {primaryCta.label}
          </Button>

          <IconButton
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            sx={{ display: { lg: 'none' }, ml: -0.5 }}
          >
            <MenuIcon size={22} strokeWidth={1.75} aria-hidden="true" />
          </IconButton>
        </Container>

        {primaryNav.map((item) =>
          item.columns || item.children ? (
            <MegaPanel
              key={item.label}
              item={item}
              open={openPanel === item.label}
              onClose={() => setOpenPanel(null)}
              onMouseEnter={() => openWithCancel(item.label)}
            />
          ) : null,
        )}
      </Box>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
