import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { footerNav } from '@/config/navigation';
import { contactConfig, siteConfig, socialConfig } from '@/config/site';
import { motion } from '@/theme/tokens';

// Rendered as labelled text links rather than glyphs: reproducing a company's
// brand mark from memory is a licensing and fidelity risk, and the label is
// clearer at footer scale anyway.
const social = [
  { key: 'linkedin', href: socialConfig.linkedin, label: 'LinkedIn' },
  { key: 'github', href: socialConfig.github, label: 'GitHub' },
  { key: 'x', href: socialConfig.x, label: 'X' },
].filter((entry) => entry.href.length > 0);

const contactRows = [
  { key: 'email', value: contactConfig.email, Icon: Mail, href: `mailto:${contactConfig.email}` },
  {
    key: 'phone',
    value: contactConfig.phone,
    Icon: Phone,
    href: `tel:${contactConfig.phone.replace(/\s+/g, '')}`,
  },
  { key: 'location', value: contactConfig.location, Icon: MapPin, href: '' },
].filter((row) => row.value.length > 0);

/**
 * Site footer.
 *
 * Keeps the dark brand chrome in both themes, deliberately and for the same
 * reason as the header: it carries the logo lockup, whose silver "BIG" and
 * grey "TECHNOLOGIES" are unreadable on a light surface. A dark footer closing
 * a light page is a conventional, intentional-looking treatment — an
 * illegible wordmark is not.
 *
 * Contact rows and social links render only when the corresponding
 * environment variable is set. An unconfigured deployment shows a smaller
 * footer rather than plausible-looking placeholder details.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      data-color-scheme="dark"
      sx={{
        bgcolor: 'surfaceCanvas',
        borderTop: '1px solid',
        borderColor: 'hairline',
        pt: { xs: 7, md: 10 },
        pb: 'calc(env(safe-area-inset-bottom) + 32px)',
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'minmax(0, 1.4fr) repeat(3, minmax(0, 1fr))',
            },
            gap: { xs: 5, md: 6 },
          }}
        >
          <Box>
            <Logo height={32} />
            <Typography
              variant="body2"
              sx={{ mt: 3, color: 'text.secondary', maxWidth: '38ch' }}
            >
              A technology engineering and consulting company building software, cloud platforms
              and blockchain infrastructure that hold up in production.
            </Typography>

            {contactRows.length > 0 && (
              <Box sx={{ mt: 3.5, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {contactRows.map(({ key, value, Icon, href }) => {
                  const content = (
                    <>
                      <Icon
                        size={15}
                        strokeWidth={1.75}
                        aria-hidden="true"
                        style={{ flexShrink: 0, marginTop: 3 }}
                      />
                      <span>{value}</span>
                    </>
                  );
                  return href ? (
                    <Box
                      key={key}
                      component="a"
                      href={href}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.25,
                        fontSize: '0.9375rem',
                        color: 'text.secondary',
                        transition: `color ${motion.duration.fast}ms ${motion.easing.standard}`,
                        '&:hover': { color: 'text.primary' },
                      }}
                    >
                      {content}
                    </Box>
                  ) : (
                    <Box
                      key={key}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.25,
                        fontSize: '0.9375rem',
                        color: 'text.secondary',
                      }}
                    >
                      {content}
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>

          {footerNav.map((column) => (
            <Box key={column.title} component="nav" aria-label={column.title}>
              <Typography variant="label" component="p" sx={{ color: 'text.disabled', mb: 2.5 }}>
                {column.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {column.links.map((link) => (
                  <Box component="li" key={link.href} sx={{ mb: 1.25 }}>
                    <Box
                      component={RouterLink}
                      to={link.href}
                      sx={{
                        fontSize: '0.9375rem',
                        color: 'text.secondary',
                        transition: `color ${motion.duration.fast}ms ${motion.easing.standard}`,
                        '&:hover': { color: 'text.primary' },
                      }}
                    >
                      {link.label}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'hairline',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            © {year} {siteConfig.name}. All rights reserved.
          </Typography>

          {social.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {social.map(({ key, href, label }) => (
                <Box
                  key={key}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.name} on ${label} (opens in a new tab)`}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    minHeight: 44,
                    px: 1.25,
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    transition: `color ${motion.duration.fast}ms ${motion.easing.standard}, background-color ${motion.duration.fast}ms ${motion.easing.standard}`,
                    '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
                  }}
                >
                  {label}
                  <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
