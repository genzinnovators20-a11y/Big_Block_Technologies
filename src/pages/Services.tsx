import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/common/Reveal';
import { CallToAction } from '@/components/sections/CallToAction';
import { Eyebrow, IndexBadge, SurfaceCard, TagRow } from '@/components/ui';
import { capabilityGroups, services, servicesByGroup } from '@/data/services';
import type { Service } from '@/types/content';
import { layout, motion, radius } from '@/theme/tokens';

/**
 * A single service, in full.
 *
 * Four fixed slots — what it is, the problem it solves, what a client
 * receives, the stack — so a reader comparing two services is comparing like
 * with like rather than reading two differently-shaped pitches.
 */
function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const { Icon } = service;

  return (
    <Reveal
      component="li"
      index={index % 2}
      variant="settle"
      sx={{
        // `scroll-margin` keeps the anchor clear of the fixed header when a
        // mega-menu link jumps straight to this service.
        scrollMarginTop: `${layout.headerHeight + 32}px`,
      }}
      id={service.id}
    >
      <SurfaceCard padding="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1.2fr)' },
            gap: { xs: 3, md: 6 },
          }}
        >
          {/* Column is a flex stack so the technology list can be pinned to the
              bottom edge, level with the enquiry button opposite it. Without
              that the left column ended a third of the way up the card. */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
              <Box
                aria-hidden="true"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  flexShrink: 0,
                  borderRadius: `${radius.md}px`,
                  border: '1px solid',
                  borderColor: 'hairline',
                  bgcolor: 'action.hover',
                  color: 'accentText',
                }}
              >
                <Icon size={21} strokeWidth={1.75} />
              </Box>
              <IndexBadge value={index} />
            </Box>

            <Typography variant="h3" component="h3">
              {service.name}
            </Typography>
            <Typography variant="subtitle1" component="p" sx={{ mt: 1.5, color: 'text.secondary' }}>
              {service.summary}
            </Typography>

            <Box sx={{ mt: { xs: 3, md: 'auto' }, pt: { md: 4 } }}>
              <Typography variant="label" component="h4" sx={{ color: 'text.disabled', mb: 1.5 }}>
                Built with
              </Typography>
              <TagRow items={service.stack} />
            </Box>
          </Box>

          <Box>
            <Eyebrow rule={false} component="h4" sx={{ mb: 1.5 }}>
              The problem
            </Eyebrow>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {service.problem}
            </Typography>

            <Eyebrow rule={false} component="h4" sx={{ mt: 3.5, mb: 1.5 }}>
              What you receive
            </Eyebrow>
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
      </SurfaceCard>
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
            tone={groupIndex % 2 === 0 ? 'band' : 'alt'}
            aria-labelledby={`heading-${group.id}`}
            sx={{ scrollMarginTop: `${layout.headerHeight}px` }}
          >
            <Reveal>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1.15fr)' },
                  gap: { xs: 2, md: 8 },
                  pb: 3,
                  mb: { xs: 3, md: 4 },
                  borderBottom: '2px solid',
                  borderColor: 'brandAzure',
                }}
              >
                <Box>
                  <Eyebrow sx={{ mb: 2 }}>
                    {`${String(groupIndex + 1).padStart(2, '0')} / ${group.title}`}
                  </Eyebrow>
                  <Typography variant="h2" component="h2" id={`heading-${group.id}`}>
                    {group.title}
                  </Typography>
                </Box>
                <Typography
                  variant="subtitle1"
                  component="p"
                  sx={{ color: 'text.secondary', alignSelf: 'end' }}
                >
                  {group.description}
                </Typography>
              </Box>
            </Reveal>

            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, md: 2.5 },
              }}
            >
              {groupServices.map((service, index) => (
                <ServiceBlock key={service.id} service={service} index={offset + index} />
              ))}
            </Box>
          </Section>
        );
      })}

      <Section tone="raised" spacing="compact" aria-labelledby="unsure-heading">
        <SurfaceCard padding="lg">
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
                That is a normal starting position. Describe the problem rather than the solution
                and we will tell you which discipline it actually belongs to — including when the
                answer is that you do not need us.
              </Typography>
            </Reveal>
            <Reveal index={1}>
              <Button
                component={RouterLink}
                to="/contact"
                size="large"
                endIcon={<ArrowRight size={17} strokeWidth={2} aria-hidden="true" />}
                sx={{
                  transition: `transform ${motion.duration.base}ms ${motion.easing.standard}`,
                }}
              >
                Describe your problem
              </Button>
            </Reveal>
          </Box>
        </SurfaceCard>
      </Section>

      <CallToAction />
    </>
  );
}
