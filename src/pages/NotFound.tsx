import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/layout/PageHero';
import { motion } from '@/theme/tokens';

const destinations = [
  { label: 'Services', href: '/services', description: 'Twelve engineering services' },
  { label: 'Solutions', href: '/solutions', description: 'Organised by business outcome' },
  { label: 'Industries', href: '/industries', description: 'Sector-specific engineering' },
  { label: 'Case Studies', href: '/case-studies', description: 'How we approach problems' },
  { label: 'Insights', href: '/blog', description: 'Notes from the engineering team' },
  { label: 'Contact', href: '/contact', description: 'Start a project' },
];

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="The page you requested does not exist."
        path="/404"
        noIndex
      />

      <PageHero
        eyebrow="Error 404"
        title="That page does not exist."
        lede="The address may be mistyped, or the page may have moved. Everything on the site is reachable from the routes below."
      >
        <Box sx={{ mt: 4 }}>
          <Button
            component={RouterLink}
            to="/"
            size="large"
            endIcon={<ArrowRight size={17} strokeWidth={2} aria-hidden="true" />}
          >
            Back to home
          </Button>
        </Box>
      </PageHero>

      <Section tone="light" aria-labelledby="destinations-heading">
        <Typography variant="label" component="h2" id="destinations-heading" sx={{ color: 'text.disabled', mb: 3 }}>
          Main sections
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
            gap: 0,
            borderTop: '1px solid',
            borderColor: 'hairline',
          }}
        >
          {destinations.map((item) => (
            <Box
              key={item.href}
              component={RouterLink}
              to={item.href}
              sx={{
                py: 3,
                pr: 3,
                borderBottom: '1px solid',
                borderColor: 'hairline',
                transition: `background-color ${motion.duration.fast}ms ${motion.easing.standard}`,
                '&:hover': { bgcolor: 'action.hover' },
                '&:hover .nf-label': { color: 'primary.main' },
              }}
            >
              <Typography
                className="nf-label"
                variant="h5"
                component="span"
                sx={{ display: 'block', transition: `color ${motion.duration.fast}ms ${motion.easing.standard}` }}
              >
                {item.label}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Section>
    </>
  );
}
