import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import type { NavGroup, NavLink } from '@/config/navigation';
import { motion } from '@/theme/tokens';

interface MegaPanelProps {
  item: NavGroup;
  open: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
}

function PanelLink({ link, index }: { link: NavLink; index: number }) {
  return (
    <Box
      component={RouterLink}
      to={link.href}
      sx={{
        display: 'block',
        py: 1.25,
        px: 1.5,
        mx: -1.5,
        borderRadius: '4px',
        color: 'text.secondary',
        transition: `background-color ${motion.duration.fast}ms ${motion.easing.standard}`,
        '&:hover': { bgcolor: 'action.hover' },
        '&:hover .panel-link-title': { color: 'text.primary' },
        '&:hover .panel-link-arrow': { opacity: 1, transform: 'translateX(0)' },
      }}
      style={{ transitionDelay: `${index * 15}ms` }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          className="panel-link-title"
          variant="subtitle2"
          component="span"
          sx={{
            color: 'text.primary',
            transition: `color ${motion.duration.fast}ms ${motion.easing.standard}`,
          }}
        >
          {link.label}
        </Typography>
        <Box
          className="panel-link-arrow"
          component="span"
          aria-hidden="true"
          sx={{
            display: 'inline-flex',
            color: 'accentText',
            opacity: 0,
            transform: 'translateX(-4px)',
            transition: `opacity ${motion.duration.fast}ms ${motion.easing.standard}, transform ${motion.duration.fast}ms ${motion.easing.standard}`,
          }}
        >
          <ArrowRight size={14} strokeWidth={2} />
        </Box>
      </Box>
      {link.description && (
        <Typography variant="caption" component="span" sx={{ display: 'block', mt: 0.25 }}>
          {link.description}
        </Typography>
      )}
    </Box>
  );
}

/**
 * Desktop dropdown panel.
 *
 * Kept mounted so the open/close transition can run, but removed from the
 * accessibility tree and the tab order while closed via `inert` — a hidden
 * panel must not be reachable by keyboard.
 */
export function MegaPanel({ item, open, onClose, onMouseEnter }: MegaPanelProps) {
  const columns = item.columns ?? (item.children ? [{ title: '', links: item.children }] : []);
  const isWide = columns.length > 1;

  return (
    <Box
      // `inert` is a boolean attribute; React renders it only when true.
      {...(!open ? { inert: true } : {})}
      onMouseEnter={onMouseEnter}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose();
      }}
      sx={{
        display: { xs: 'none', lg: 'block' },
        position: 'absolute',
        insetInline: 0,
        top: '100%',
        // Part of the header chrome, so it resolves against the dark scheme
        // the header declares — solid rather than translucent, because the
        // panel overlays page content and has to stay legible over any of it.
        bgcolor: 'surfaceCanvas',
        backdropFilter: 'saturate(180%) blur(16px)',
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: 'hairline',
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        transform: open ? 'translateY(0)' : 'translateY(-6px)',
        transition: `opacity ${motion.duration.base}ms ${motion.easing.standard}, transform ${motion.duration.base}ms ${motion.easing.standard}, visibility 0s linear ${open ? '0s' : `${motion.duration.base}ms`}`,
      }}
    >
      <Container sx={{ py: 5 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isWide ? 'repeat(3, minmax(0, 1fr))' : 'minmax(0, 420px)',
            gap: { lg: 6 },
          }}
        >
          {columns.map((column) => (
            <Box key={column.title || item.label}>
              {column.title && (
                <Typography
                  variant="label"
                  component="p"
                  sx={{ color: 'text.disabled', mb: 2.5, pb: 1.5, borderBottom: '1px solid', borderColor: 'hairline' }}
                >
                  {column.title}
                </Typography>
              )}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {column.links.map((link, index) => (
                  <PanelLink key={link.href} link={link} index={index} />
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {item.panelFooter && (
          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'hairline' }}>
            <Box
              component={RouterLink}
              to={item.panelFooter.href}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                color: 'primary.light',
                fontSize: '0.9375rem',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {item.panelFooter.label}
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
