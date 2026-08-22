import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { CallToAction } from '@/components/sections/CallToAction';
import { ProcessTimeline, NumberedCard } from '@/components/cards';
import { Eyebrow, SurfaceCard } from '@/components/ui';
import { principles, processPhases } from '@/data/process';
import { capabilityGroups } from '@/data/services';

const philosophy = [
  {
    title: 'Constraints first',
    body: 'Before any architecture is proposed we establish what cannot change: the integrations that must keep working, the compliance obligations, the deadline that is genuinely fixed. Designing without those is how projects discover their real requirements too late.',
  },
  {
    title: 'The boring choice, usually',
    body: 'Novel technology carries an operational cost that rarely shows up in the evaluation. We reach for well-understood tools by default, and reserve the interesting choices for the places where the problem is genuinely unusual.',
  },
  {
    title: 'Reversible where possible',
    body: 'Decisions differ in how expensive they are to undo. Cheap-to-reverse choices get made quickly; expensive ones — data model, tenancy, chain selection — get the analysis their permanence deserves.',
  },
  {
    title: 'Operability is part of done',
    body: 'A feature nobody can monitor is not finished. Metrics, alerting and a runbook ship with the work, because the cost of adding them later is paid during an incident.',
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="Big Block Technologies is a technology engineering and consulting practice. How we make architectural decisions, how we deliver, and what clients own at the end."
        path="/about"
      />

      <PageHero
        eyebrow="About"
        title="An engineering practice built around decisions, not deliverables."
        lede="Big Block Technologies designs, builds and operates software, cloud platforms and distributed ledger systems. We take responsibility for the technical judgement calls, and we write down the reasoning so it outlives the people who made them."
      />

      {/* ------------------------------------------------------- Positioning */}
      <Section tone="band" aria-labelledby="mission-heading">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 0.85fr) minmax(0, 1.15fr)' },
            gap: { xs: 5, md: 10 },
          }}
        >
          <Reveal>
            <Eyebrow sx={{ mb: 3 }}>What we are here to do</Eyebrow>
            <Typography variant="h2" component="h2" id="mission-heading" sx={{ textWrap: 'balance' }}>
              Build systems that are still maintainable in five years.
            </Typography>
          </Reveal>

          <Reveal index={1}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="subtitle1" component="p">
                Most software does not fail at launch. It fails eighteen months later, when the
                people who built it have moved on, nobody can explain why it is shaped the way it
                is, and every change carries a risk no one can quantify.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                That outcome is not inevitable — it is the result of decisions that were never
                recorded, tests that were never written, and infrastructure that only ever existed
                in one engineer's terminal history. We treat all three as deliverables rather than
                as good intentions.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                The practice spans four disciplines — product engineering, cloud and platform,
                applied machine learning, and distributed ledger systems. They are genuinely
                different kinds of work, with different failure modes, and we staff them
                accordingly rather than treating any engineer as interchangeable with another.
              </Typography>
            </Box>
          </Reveal>
        </Box>
      </Section>

      {/* -------------------------------------------- Engineering philosophy */}
      <Section tone="alt" dividerTop aria-labelledby="philosophy-heading">
        <SectionHeading
          eyebrow="Engineering philosophy"
          id="philosophy-heading"
          title="Four rules that decide the arguments."
          lede="Every team has technical disagreements. These are the tie-breakers we apply, stated in advance so the reasoning is predictable."
        />

        <Box
          component="ol"
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
          {philosophy.map((item, index) => (
            <Reveal
              key={item.title}
              index={index}
              variant="settle"
              component="li"
              sx={{ height: '100%' }}
            >
              <NumberedCard index={index} title={item.title} body={item.body} />
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* ---------------------------------------------------- Capabilities */}
      <Section tone="contrast" aria-labelledby="capability-heading">
        <SectionHeading
          eyebrow="Capabilities"
          id="capability-heading"
          title="Three kinds of work."
          lede="Grouped by the role the work plays rather than by technology, because clients arrive with a stage of problem, not a stack."
        />

        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            mt: { xs: 5, md: 7 },
            p: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {capabilityGroups.map((group, index) => (
            <Reveal
              key={group.id}
              index={index}
              variant="settle"
              component="li"
              sx={{ height: '100%' }}
            >
              <SurfaceCard padding="lg" sx={{ gap: 1.5 }}>
                <Box
                  aria-hidden="true"
                  sx={{ width: 28, height: '2px', bgcolor: 'brandAzure', mb: 0.5 }}
                />
                <Typography variant="h4" component="h3">
                  {group.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {group.description}
                </Typography>
              </SurfaceCard>
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* ------------------------------------------- Delivery methodology */}
      <Section tone="canvas" dividerTop aria-labelledby="delivery-heading">
        <SectionHeading
          eyebrow="Delivery methodology"
          id="delivery-heading"
          title="What each phase actually produces."
          lede="A phase that ends in a status update rather than an artefact has not ended."
        />

        <ProcessTimeline phases={processPhases} />
      </Section>

      {/* --------------------------------------------------- Why clients stay */}
      <Section tone="raised" aria-labelledby="why-heading">
        <SectionHeading
          eyebrow="Why clients choose us"
          id="why-heading"
          title="Six commitments, all of them checkable."
          lede="Each of these is something you can verify while the engagement is running, rather than a claim you have to take on trust."
        />

        <Box
          component="ol"
          sx={{
            listStyle: 'none',
            m: 0,
            mt: { xs: 5, md: 7 },
            p: 0,
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
            },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {principles.map((principle, index) => (
            <Reveal
              key={principle.title}
              index={index}
              variant="settle"
              component="li"
              sx={{ height: '100%' }}
            >
              <NumberedCard index={index} title={principle.title} body={principle.body} />
            </Reveal>
          ))}
        </Box>
      </Section>

      <CallToAction
        eyebrow="Work with us"
        title="Bring us the decision you are stuck on."
        body="Whether that is a technology choice, an architecture that has stopped scaling, or a system nobody wants to touch — describe it and you will get an engineer's read on it."
        secondaryLabel="See our services"
        secondaryHref="/services"
      />
    </>
  );
}
