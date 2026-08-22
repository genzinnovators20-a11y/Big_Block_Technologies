import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ProcessTimeline } from '@/components/cards';
import { processPhases } from '@/data/process';

/**
 * Delivery methodology.
 *
 * A connected rail rather than a card grid, because the sequence *is* the
 * information. Each phase names the artefacts a client receives at the end of
 * it, which is what makes the claim checkable rather than a promise.
 *
 * The rail fills with scroll position but never captures it — see
 * `ProcessTimeline` and `useScrollProgress` for why that distinction is
 * enforced rather than assumed.
 */
export function Process() {
  return (
    <Section tone="contrast" aria-labelledby="process-heading">
      <SectionHeading
        eyebrow="05 / How we work"
        id="process-heading"
        title="Six phases, each with something you can hold."
        lede="Every phase ends in artefacts rather than a status update. If a phase produces nothing you could take to another firm, it was not a phase."
      />

      <ProcessTimeline phases={processPhases} />
    </Section>
  );
}
