import { Seo } from '@/components/common/Seo';
import { Hero } from '@/components/sections/home/Hero';
import { Positioning } from '@/components/sections/home/Positioning';
import { Capabilities } from '@/components/sections/home/Capabilities';
import { BlockchainPractice } from '@/components/sections/home/BlockchainPractice';
import { Process } from '@/components/sections/home/Process';
import { TechnologyStrip } from '@/components/sections/home/TechnologyStrip';
import { IndustriesGrid } from '@/components/sections/home/IndustriesGrid';
import { FeaturedWork } from '@/components/sections/home/FeaturedWork';
import { Principles } from '@/components/sections/home/Principles';
import { InsightsTeaser } from '@/components/sections/home/InsightsTeaser';
import { CareersTeaser } from '@/components/sections/home/CareersTeaser';
import { CallToAction } from '@/components/sections/CallToAction';
import { siteConfig } from '@/config/site';

/**
 * Homepage.
 *
 * The visual benchmark for the site: every other page borrows its components
 * and none exceeds its density.
 *
 * Section order runs statement -> explanation -> capability -> specialisation
 * -> proof -> ask, so evidence arrives before the request. Tone alternates
 * across ink, light, paper, deep and panel, and no two adjacent sections share
 * a construction either — grid, rail, split and timeline rotate — which is
 * what stops a long page reading as one repeated template.
 */
export default function Home() {
  return (
    <>
      <Seo
        description={siteConfig.description}
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
          serviceType: [
            'Custom Software Development',
            'Cloud Engineering',
            'DevOps',
            'Blockchain Development',
            'Smart Contract Engineering',
            'AI Solutions',
            'Technology Consulting',
          ],
        }}
      />

      <Hero />
      <Positioning />
      <Capabilities />
      <BlockchainPractice />
      <TechnologyStrip />
      <IndustriesGrid />
      <Process />
      <Principles />
      <FeaturedWork />
      <CareersTeaser />
      <InsightsTeaser />
      <CallToAction />
    </>
  );
}
