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
 * Section order alternates tone deliberately — ink, light, deep, panel, light,
 * deep, paper, ink, panel, light, deep, ink — so no two adjacent sections read
 * the same, and the page has rhythm rather than uniform darkness.
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
      <Process />
      <TechnologyStrip />
      <IndustriesGrid />
      <FeaturedWork />
      <Principles />
      <InsightsTeaser />
      <CareersTeaser />
      <CallToAction />
    </>
  );
}
