import { useSearchParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { ContactForm } from '@/features/contact/ContactForm';
import { generalFaqs } from '@/data/process';
import { contactConfig } from '@/config/site';
import { getService } from '@/data/services';
import { getSolution } from '@/data/solutions';
import { visuallyHidden } from '@/theme/a11y';

const expectations = [
  { label: 'Reply from', value: 'An engineer, not an account manager' },
  { label: 'First step', value: 'A short call about the problem and constraints' },
  { label: 'Then', value: 'A scoped discovery proposal, fixed price' },
  { label: 'You keep', value: 'The architecture and plan, wherever you take it' },
];

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
 * Contact.
 *
 * Query parameters set by CTAs elsewhere on the site (`?service=`,
 * `?solution=`, `?intent=careers`) pre-select the project type so a visitor
 * does not restate what they already indicated by clicking.
 */
export default function Contact() {
  const [params] = useSearchParams();

  const serviceParam = params.get('service');
  const solutionParam = params.get('solution');
  const intent = params.get('intent');

  const service = serviceParam ? getService(serviceParam) : undefined;
  const solution = solutionParam ? getSolution(solutionParam) : undefined;

  // Map an inbound service/solution onto the closest project-type option.
  const projectType = (() => {
    if (intent === 'careers') return 'Something else';
    if (service) {
      if (service.group === 'specialised' && service.id.includes('contract')) return 'Smart contracts';
      if (service.id === 'blockchain' || service.id === 'web3-apps') return 'Blockchain / Web3';
      if (service.id === 'ai') return 'AI solution';
      if (service.id === 'cloud' || service.id === 'devops') return 'Cloud / DevOps';
      if (service.id === 'mobile') return 'Mobile application';
      if (service.id === 'web-applications') return 'Web application';
      if (service.id === 'enterprise') return 'Enterprise system';
      if (service.id === 'consulting') return 'Technology consulting';
      return 'Custom software';
    }
    if (solution) {
      if (solution.slug.includes('blockchain') || solution.slug.includes('web3')) {
        return 'Blockchain / Web3';
      }
      if (solution.slug.includes('ai')) return 'AI solution';
      if (solution.slug.includes('cloud')) return 'Cloud / DevOps';
      return 'Custom software';
    }
    return '';
  })();

  const heroLede =
    intent === 'careers'
      ? 'Tell us which discipline you work in and the kind of problem you want to work on. Every application is read by a person, and you will get an answer either way.'
      : 'Send the problem, the constraints and the deadline. You will get a considered technical response from an engineer — not a brochure, and not a discovery call that turns out to be a sales script.';

  return (
    <>
      <Seo
        title={intent === 'careers' ? 'Apply' : 'Contact'}
        description="Start a project with Big Block Technologies. Describe the problem, the constraints and the deadline, and an engineer will reply."
        path="/contact"
      />

      <PageHero
        eyebrow={intent === 'careers' ? 'Apply' : 'Contact'}
        title={intent === 'careers' ? 'Tell us what you want to build.' : 'Start a project.'}
        lede={heroLede}
      />

      <Section tone="light" aria-labelledby="form-heading">
        <Typography variant="h2" component="h2" id="form-heading" sx={visuallyHidden}>
          Enquiry form
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.35fr) minmax(0, 1fr)' },
            gap: { xs: 6, md: 9 },
            alignItems: 'start',
          }}
        >
          <Reveal>
            <ContactForm
              defaults={{
                ...(projectType ? { projectType } : {}),
                ...(intent === 'careers' ? { message: '' } : {}),
              }}
            />
          </Reveal>

          <Reveal index={1}>
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                border: '1px solid',
                borderColor: 'hairline',
                borderRadius: 1,
                bgcolor: 'surfaceRaised',
              }}
            >
              <Typography variant="label" component="h3" sx={{ color: 'accentText', mb: 2.5 }}>
                What happens next
              </Typography>

              <Box component="dl" sx={{ m: 0 }}>
                {expectations.map((item, index) => (
                  <Box
                    key={item.label}
                    sx={{
                      py: 2,
                      borderTop: index === 0 ? 'none' : '1px solid',
                      borderColor: 'hairline',
                    }}
                  >
                    <Typography variant="label" component="dt" sx={{ color: 'text.disabled', mb: 0.75 }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body2" component="dd" sx={{ m: 0, color: 'text.secondary' }}>
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {contactRows.length > 0 && (
                <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'hairline' }}>
                  <Typography variant="label" component="h3" sx={{ color: 'text.disabled', mb: 2 }}>
                    Direct
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
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
                            color: 'primary.main',
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
                </Box>
              )}
            </Box>
          </Reveal>
        </Box>
      </Section>

      <Section tone="deep" dividerTop aria-labelledby="contact-faq-heading">
        <SectionHeading
          eyebrow="Common questions"
          id="contact-faq-heading"
          title="Before you write."
          maxWidth={620}
        />

        <Box sx={{ mt: { xs: 4, md: 6 }, maxWidth: 880 }}>
          {generalFaqs.map((faq, index) => (
            <Reveal key={faq.question} index={index % 3}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ChevronDown size={18} strokeWidth={2} aria-hidden="true" />}
                  aria-controls={`faq-${index}-content`}
                  id={`faq-${index}-header`}
                >
                  <Typography variant="h5" component="h3">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails id={`faq-${index}-content`}>
                  <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '68ch' }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Reveal>
          ))}
        </Box>
      </Section>
    </>
  );
}
