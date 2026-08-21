import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/common/Reveal';
import { CallToAction } from '@/components/sections/CallToAction';
import { capabilityGroups, services, servicesByGroup } from '@/data/services';
import type { Service } from '@/types/content';
import { layout } from '@/theme/tokens';

/**
 * A single service.
 *
 * Four fixed slots — what it is, the problem, what you receive, the stack —
 * so a reader comparing two services is comparing like with like.
 */
function ServiceBlock({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal
      component="article"
      index={index % 2}
      sx={{
        // `scroll-margin` keeps the anchor clear of the fixed header when a
        // mega-menu link jumps straight to this service.
        scrollMarginTop: `${layout.headerHeight + 32}px`,
        py: { xs: 5, md: 6 },
        borderTop: '1px solid',
        borderColor: 'hairline',
      }}
    >
      <Box
        id={service.id}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1.15fr)' },
          gap: { xs: 3, md: 8 },
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              component="span"
              aria-hidden="true"
              sx={{ display: 'inline-flex', color: 'accentText' }}
            >
              <service.Icon size={20} strokeWidth={1.75} />
            </Box>
            <Typography variant="label" component="span" sx={{ color: 'text.disabled' }}>
              {String(index + 1).padStart(2, '0')}
            </Typography>
          </Box>

          <Typography variant="h3" component="h3">
            {service.name}
          </Typography>
          <Typography variant="subtitle1" component="p" sx={{ mt: 1.5, color: 'text.secondary' }}>
            {service.summary}
          </Typography>

          <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {service.stack.map((tech) => (
              <Chip key={tech} label={tech} size="small" />
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="label" component="h4" sx={{ color: 'accentText', mb: 1.5 }}>
            The problem
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {service.problem}
          </Typography>

          <Typography variant="label" component="h4" sx={{ color: 'accentText', mt: 4, mb: 1.5 }}>
            What you receive
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {service.delivers.map((item) => (
              <Box
                component="li"
                key={item}
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  py: 1,
                  borderBottom: '1px solid',
                  borderColor: 'hairline',
                  fontSize: '0.9375rem',
                  color: 'text.secondary',
                  '&:last-of-type': { borderBottom: 'none' },
                }}
              >
                <Box
                  component="span"
                  aria-hidden="true"
                  sx={{ width: 5, height: 5, mt: '9px', bgcolor: 'brandAzure', flexShrink: 0 }}
                />
                {item}
              </Box>
            ))}
          </Box>

          <Button
            component={RouterLink}
            to={`/contact?service=${service.id}`}
            variant="outlined"
            size="small"
            endIcon={<ArrowRight size={15} strokeWidth={2} aria-hidden="true" />}
            sx={{ mt: 3 }}
          >
            Discuss {service.name.toLowerCase()}
          </Button>
        </Box>
      </Box>
    </Reveal>
  );
}

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Twelve engineering services across build, run and specialised work — custom software, web and mobile, cloud, DevOps, UI/UX, consulting, blockchain, smart contracts, Web3 and AI."
        path="/services"
      />

      <PageHero
        eyebrow="Services"
        title="Twelve services, grouped by the job they do."
        lede="Build covers product and platform engineering. Run covers everything that keeps software shippable after the first release. Specialised covers the domains that need dedicated depth rather than a generalist."
      >
        <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {capabilityGroups.map((group) => (
            <Button
              key={group.id}
              component="a"
              href={`#group-${group.id}`}
              variant="outlined"
              size="small"
            >
              {group.title}
            </Button>
          ))}
        </Box>
      </PageHero>

      {capabilityGroups.map((group, groupIndex) => {
        const groupServices = servicesByGroup(group.id);
        const offset = services.findIndex((service) => service.id === groupServices[0].id);

        return (
          <Section
            key={group.id}
            id={`group-${group.id}`}
            tone={groupIndex % 2 === 0 ? 'light' : 'deep'}
            aria-labelledby={`heading-${group.id}`}
            sx={{ scrollMarginTop: `${layout.headerHeight}px` }}
          >
            <Reveal>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1.15fr)' },
                  gap: { xs: 2, md: 8 },
                  pb: 2,
                }}
              >
                <Box>
                  <Typography variant="label" component="p" sx={{ color: 'accentText', mb: 2 }}>
                    {String(groupIndex + 1).padStart(2, '0')} / {group.title}
                  </Typography>
                  <Typography variant="h2" component="h2" id={`heading-${group.id}`}>
                    {group.title}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" component="p" sx={{ color: 'text.secondary' }}>
                  {group.description}
                </Typography>
              </Box>
            </Reveal>

            {groupServices.map((service, index) => (
              <ServiceBlock key={service.id} service={service} index={offset + index} />
            ))}
          </Section>
        );
      })}

      <Section tone="panel" spacing="compact" aria-labelledby="unsure-heading">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) auto' },
            gap: 4,
            alignItems: 'center',
          }}
        >
          <Reveal>
            <Typography variant="h3" component="h2" id="unsure-heading">
              Not sure which of these you need?
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary', maxWidth: '62ch' }}>
              That is a normal starting position. Describe the problem rather than the solution and
              we will tell you which discipline it actually belongs to — including when the answer
              is that you do not need us.
            </Typography>
          </Reveal>
          <Reveal index={1}>
            <Button
              component={RouterLink}
              to="/contact"
              size="large"
              endIcon={<ArrowRight size={17} strokeWidth={2} aria-hidden="true" />}
            >
              Describe your problem
            </Button>
          </Reveal>
        </Box>
      </Section>

      <CallToAction />
    </>
  );
}
