import type { LucideIcon } from 'lucide-react';

/**
 * Content model.
 *
 * Every repeated entity on the site is typed here and stored as plain data, so
 * swapping the source for a CMS or API later is a change of loader, not a
 * rewrite of the pages that render it.
 */

export type CapabilityGroupId = 'build' | 'run' | 'specialised';

export interface Service {
  /** Stable id; also the in-page anchor. */
  id: string;
  group: CapabilityGroupId;
  name: string;
  /** One line describing what the service is. */
  summary: string;
  /** The client-side problem this service exists to solve. */
  problem: string;
  /** Concrete artefacts a client receives. */
  delivers: string[];
  /** Technologies genuinely used for this service. */
  stack: string[];
  Icon: LucideIcon;
}

export interface CapabilityGroup {
  id: CapabilityGroupId;
  title: string;
  description: string;
}

export interface Solution {
  slug: string;
  name: string;
  /** The business outcome, stated before any technology. */
  outcome: string;
  description: string;
  /** Signals that this solution is the right fit. */
  signals: string[];
  /** What the engagement typically includes. */
  includes: string[];
  Icon: LucideIcon;
}

export interface Industry {
  slug: string;
  name: string;
  /** The recurring engineering problem in this sector. */
  challenge: string;
  /** How the company approaches it. */
  approach: string;
  /** Systems commonly built for this sector. */
  systems: string[];
  Icon: LucideIcon;
}

/**
 * A representative engagement pattern.
 *
 * These describe the *shape* of work — problem, approach, architecture — and
 * deliberately carry no client names and no numeric outcomes, because no
 * verified client results are available to publish. `isIllustrative` drives
 * the notice shown alongside them so a reader is never misled.
 */
export interface CaseStudy {
  slug: string;
  title: string;
  sector: string;
  /** Short label for the type of engagement. */
  engagement: string;
  challenge: string;
  approach: string[];
  solution: string;
  /** Qualitative outcomes only — never invented metrics. */
  outcomes: string[];
  stack: string[];
  isIllustrative: true;
}

export interface ProcessPhase {
  index: string;
  name: string;
  description: string;
  /** Artefacts produced at the end of this phase. */
  artefacts: string[];
}

export interface JobRole {
  slug: string;
  title: string;
  discipline: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  topic: string;
  excerpt: string;
  readingMinutes: number;
  /**
   * ISO date. Left undefined for editorial pieces that have no verified
   * publication date; the UI omits the date entirely rather than inventing one.
   */
  publishedAt?: string;
  /** Body as an ordered list of blocks, ready to come from a CMS later. */
  body: BlogBlock[];
}

export type BlogBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'heading'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'callout'; text: string };

export interface Faq {
  question: string;
  answer: string;
}
