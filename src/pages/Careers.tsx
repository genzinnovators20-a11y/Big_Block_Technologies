import { Link as RouterLink } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowRight, ChevronDown, Inbox } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { CallToAction } from '@/components/sections/CallToAction';
import { SurfaceCard, TagRow } from '@/components/ui';
import { careerFaqs, cultureValues, disciplines, hiringSteps, openRoles } from '@/data/careers';
import { contactConfig } from '@/config/site';
import { fonts } from '@/theme/tokens';

/**
 * Open roles list, including its empty state.
 *
 * No vacancies are published, so this renders an honest empty state rather
 * than inventing listings. The populated branch is complete and takes over the
 * moment `openRoles` has entries.
 */
function OpenRoles() {
  if (openRoles.length === 0) {
    return (
      <Reveal>
        <SurfaceCard
          padding="lg"
          highlight={false}
          sx={{
            borderStyle: 'dashed',
            borderColor: 'hairlineStrong',
            textAlign: 'center',
            alignItems: 'center',
            maxWidth: 640,
            mx: 'auto',
            py: { xs: 5, md: 7 },
          }}
        >
          <Box
            component="span"
            aria-hidden="true"
            sx={{ display: 'inline-flex', color: 'text.disabled', mb: 2 }}
          >
            <Inbox size={28} strokeWidth={1.5} />
          </Box>

          <Typography variant="h4" component="p">
            No vacancies are published right now.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
            We would rather show nothing than list a role we are not actively hiring for. Speculative
            applications are still read, and strong ones stay on file — tell us your discipline and
            what you want to build.
          </Typography>

          <Button
            component={RouterLink}
            to="/contact?intent=careers"
            size="large"
            endIcon={<ArrowRight size={17} strokeWidth={2} aria-hidden="true" />}
            sx={{ mt: 4 }}
          >
            Send an open application
          </Button>

          {contactConfig.email && (
            <Typography variant="body2" sx={{ mt: 2.5, color: 'text.secondary' }}>
              Or email{' '}
              <Box component="a" href={`mailto:${contactConfig.email}`} sx={{ color: 'primary.main' }}>
                {contactConfig.email}
              </Box>
            </Typography>
          )}
        </SurfaceCard>
      </Reveal>
    );
  }

  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'hairline' }}>
      {openRoles.map((role, index) => (
        <Reveal key={role.slug} index={index % 3}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 200px 160px auto' },
              gap: { xs: 1.5, md: 3 },
              alignItems: 'center',
              py: 3,
              borderBottom: '1px solid',
              borderColor: 'hairline',
            }}
          >
            <Box>
              <Typography variant="h5" component="h3">
                {role.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary' }}>
                {role.summary}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: fonts.mono }}>
              {role.discipline}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: fonts.mono }}>
              {role.location} · {role.type}
            </Typography>
            <Button
              component={RouterLink}
              to={`/contact?role=${role.slug}`}
              variant="outlined"
              size="small"
            >
              Apply
            </Button>
          </Box>
        </Reveal>
      ))}
    </Box>
  );
}

export default function Careers() {
  return (
    <>
      <Seo
        title="Careers"
        description="Engineering culture, hiring process and open applications at Big Block Technologies. Engineers who own decisions, not just tickets."
        path="/careers"
      />

      <PageHero
        eyebrow="Careers"
        title="Engineers who want to own the decision, not just the ticket."
        lede="We are a small engineering practice. That means less process, more responsibility, and technical calls made by the person writing the code rather than handed down from elsewhere."
      />

      {/* --------------------------------------------------------- Culture */}
      <Section tone="band" aria-labelledby="culture-heading">
        <SectionHeading
          eyebrow="Engineering culture"
          id="culture-heading"
          title="How the team actually works."
          lede="Stated as specifics rather than as values on a wall, so you can judge whether it suits you before applying."
        />

        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            mt: { xs: 5, md: 7 },
            p: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {cultureValues.map((value, index) => (
            <Reveal
              key={value.title}
              index={index}
              variant="settle"
              component="li"
              sx={{ height: '100%' }}
            >
              <SurfaceCard padding="lg" sx={{ gap: 1.5 }}>
                <Typography variant="h4" component="h3">
                  {value.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {value.body}
                </Typography>
              </SurfaceCard>
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* ----------------------------------------------------- Open roles */}
      <Section tone="alt" dividerTop aria-labelledby="roles-heading">
        <SectionHeading
          eyebrow="Open roles"
          id="roles-heading"
          title={openRoles.length > 0 ? 'Currently hiring' : 'Current openings'}
          lede="Disciplines we recruit into are listed below, whether or not a specific vacancy is open."
        />

        <Box sx={{ mt: { xs: 5, md: 7 } }}>
          <OpenRoles />
        </Box>

        <Box sx={{ mt: 6 }}>
          <Reveal>
            <Typography variant="label" component="h3" sx={{ color: 'text.disabled', mb: 2 }}>
              Disciplines we recruit into
            </Typography>
            <TagRow items={disciplines} />
          </Reveal>
        </Box>
      </Section>

      {/* -------------------------------------------------- Hiring process */}
      <Section tone="contrast" aria-labelledby="hiring-heading">
        <SectionHeading
          eyebrow="Hiring process"
          id="hiring-heading"
          title="Five stages, no unpaid project work."
          lede="You will know where you stand at every point, and you get a decision either way."
        />

        <Box component="ol" sx={{ listStyle: 'none', m: 0, mt: { xs: 5, md: 7 }, p: 0 }}>
          {hiringSteps.map((step, index) => (
            <Reveal key={step.index} index={index} variant="settle" component="li" sx={{ mb: { xs: 2, md: 2.5 } }}>
              <SurfaceCard padding="md">
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '44px minmax(0, 1fr)', md: '72px 260px minmax(0, 1fr)' },
                    gap: { xs: 2, md: 4 },
                    alignItems: 'baseline',
                  }}
                >
                  <Typography variant="label" component="span" sx={{ color: 'accentText' }}>
                    {step.index}
                  </Typography>
                  <Typography variant="h5" component="h3">
                    {step.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', gridColumn: { xs: '2 / -1', md: 'auto' } }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </SurfaceCard>
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* --------------------------------------------------------------- FAQ */}
      <Section tone="canvas" dividerTop aria-labelledby="career-faq-heading">
        <SectionHeading
          eyebrow="Questions"
          id="career-faq-heading"
          title="Before you apply."
          maxWidth={620}
        />

        <Box sx={{ mt: { xs: 4, md: 6 }, maxWidth: 860 }}>
          {careerFaqs.map((faq, index) => (
            <Reveal key={faq.question} index={index % 3}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ChevronDown size={18} strokeWidth={2} aria-hidden="true" />}
                  aria-controls={`career-faq-${index}-content`}
                  id={`career-faq-${index}-header`}
                >
                  <Typography variant="h5" component="h3">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails id={`career-faq-${index}-content`}>
                  <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '68ch' }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Reveal>
          ))}
        </Box>
      </Section>

      <CallToAction
        eyebrow="Apply"
        title="Tell us what you want to build."
        body="A short note about your discipline and the kind of problem you want to work on is more useful than a covering letter. Every application is read by a person."
        primaryLabel="Send an application"
        primaryHref="/contact?intent=careers"
        secondaryLabel="About the practice"
        secondaryHref="/about"
      />
    </>
  );
}
