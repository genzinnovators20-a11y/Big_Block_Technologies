import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/layout/Section';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/common/Reveal';
import { IllustrativeNotice } from '@/components/common/IllustrativeNotice';
import { CallToAction } from '@/components/sections/CallToAction';
import { CornerTicks, SurfaceCard, TagRow } from '@/components/ui';
import { CaseStudyGlyph, glyphForEngagement } from '@/components/visual/CaseStudyGlyph';
import { caseStudies, getCaseStudy } from '@/data/caseStudies';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;

  // An unrecognised slug is a genuine 404, not an empty detail page.
  if (!study) return <Navigate to="/case-studies" replace />;

  const currentIndex = caseStudies.findIndex((item) => item.slug === study.slug);
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <>
      <Seo
        title={study.title}
        description={study.challenge.slice(0, 180)}
        path={`/case-studies/${study.slug}`}
        type="article"
      />

      <PageHero
        eyebrow={`${study.sector} · ${study.engagement}`}
        title={study.title}
        lede={study.challenge}
        aside={
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <SurfaceCard padding="none" sx={{ position: 'relative', overflow: 'hidden' }}>
              <CornerTicks inset={8} />
              <CaseStudyGlyph kind={glyphForEngagement(study.engagement)} title={study.title} />
            </SurfaceCard>
            <IllustrativeNotice />
          </Box>
        }
      >
        <Box sx={{ mt: 4 }}>
          <TagRow items={study.stack} />
        </Box>
      </PageHero>

      {/* ------------------------------------------------------------ Approach */}
      <Section tone="band" aria-labelledby="approach-heading">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 300px) minmax(0, 1fr)' },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Reveal>
            <Typography variant="label" component="p" sx={{ color: 'accentText', mb: 2 }}>
              Approach
            </Typography>
            <Typography variant="h2" component="h2" id="approach-heading">
              The sequence
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              Order matters more than any individual step. Each one had to be true before the next
              could be attempted.
            </Typography>
          </Reveal>

          <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {study.approach.map((step, index) => (
              <Reveal key={step} index={index} component="li">
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '48px minmax(0, 1fr)',
                    gap: 2,
                    py: 3,
                    borderTop: '1px solid',
                    borderColor: 'hairline',
                    '&:last-of-type': { borderBottom: '1px solid', borderColor: 'hairline' },
                  }}
                >
                  <Typography variant="label" component="span" sx={{ color: 'accentText', pt: '3px' }}>
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {step}
                  </Typography>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Box>
      </Section>

      {/* ------------------------------------------------------------ Solution */}
      <Section tone="alt" dividerTop aria-labelledby="solution-heading">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.2fr) minmax(0, 1fr)' },
            gap: { xs: 5, md: 8 },
          }}
        >
          <Reveal>
            <Typography variant="label" component="p" sx={{ color: 'accentText', mb: 2 }}>
              Solution
            </Typography>
            <Typography variant="h2" component="h2" id="solution-heading" sx={{ mb: 3 }}>
              What was built
            </Typography>
            <Typography variant="subtitle1" component="p" sx={{ color: 'text.secondary' }}>
              {study.solution}
            </Typography>
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
              <Typography variant="label" component="h3" sx={{ color: 'text.disabled', mb: 2 }}>
                Outcomes
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {study.outcomes.map((outcome) => (
                  <Box
                    component="li"
                    key={outcome}
                    sx={{
                      display: 'flex',
                      gap: 1.5,
                      py: 1.5,
                      borderTop: '1px solid',
                      borderColor: 'hairline',
                      fontSize: '0.9375rem',
                      color: 'text.secondary',
                      '&:first-of-type': { borderTop: 'none', pt: 0 },
                    }}
                  >
                    <Box
                      component="span"
                      aria-hidden="true"
                      sx={{ width: 5, height: 5, mt: '9px', bgcolor: 'brandAzure', flexShrink: 0 }}
                    />
                    {outcome}
                  </Box>
                ))}
              </Box>

              <Typography variant="caption" component="p" sx={{ mt: 3, color: 'text.disabled' }}>
                Stated qualitatively. No performance figures are published because none have been
                verified for release.
              </Typography>
            </Box>
          </Reveal>
        </Box>
      </Section>

      {/* -------------------------------------------------------- Navigation */}
      <Section tone="raised" spacing="compact" aria-label="More engagement patterns">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Button
            component={RouterLink}
            to="/case-studies"
            variant="text"
            startIcon={<ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />}
          >
            All engagements
          </Button>

          <Box sx={{ textAlign: { sm: 'right' } }}>
            <Typography variant="label" component="p" sx={{ color: 'text.disabled', mb: 1 }}>
              Next
            </Typography>
            <Button
              component={RouterLink}
              to={`/case-studies/${next.slug}`}
              variant="text"
              endIcon={<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />}
              sx={{ textAlign: 'left' }}
            >
              {next.title}
            </Button>
          </Box>
        </Box>
      </Section>

      <CallToAction />
    </>
  );
}
