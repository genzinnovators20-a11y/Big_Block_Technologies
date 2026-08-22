/**
 * Company statements.
 *
 * Every line here is a restatement of something the site already says
 * elsewhere — the About positioning, the delivery principles, the capability
 * groups. Nothing introduces a new claim about scale, history, clients or
 * results, because none can be substantiated.
 *
 * In particular there is deliberately no "founded in", no headcount, no
 * project count and no client count. The reference design carries all four;
 * they would be fabrications here.
 */

export interface CompanyStatement {
  id: 'mission' | 'vision' | 'values';
  title: string;
  body: string;
  /** Values render as a tag list; mission and vision as prose. */
  items?: string[];
}

export const companyStatements: CompanyStatement[] = [
  {
    id: 'mission',
    title: 'Our mission',
    body: 'To build systems that are still maintainable in five years — by treating the architecture record, the test suite and the infrastructure definition as deliverables rather than as good intentions.',
  },
  {
    id: 'vision',
    title: 'Our vision',
    body: 'Software engineering where the expensive decisions are made deliberately and written down, so a system outlives the team that built it and the next change is never a guess.',
  },
  {
    id: 'values',
    title: 'What we hold to',
    body: 'Six practices a client can verify while an engagement is running, rather than adjectives they have to take on trust.',
    items: [
      'Decisions written down',
      'Tests before hardening',
      'You own the output',
      'Honest technology selection',
      'Accessibility from the first component',
      'Operable on day one',
    ],
  },
];

/**
 * The three differentiators shown under the hero.
 *
 * Chosen because each is independently checkable during an engagement — which
 * is the only kind of claim this site makes.
 */
export const heroDifferentiators = [
  {
    label: 'Architecture',
    value: 'Decisions written down',
    detail: 'Every expensive choice ships with its reasoning and the alternatives considered.',
  },
  {
    label: 'Quality',
    value: 'Tests before hardening',
    detail: 'Coverage is written alongside the feature, not retrofitted before launch.',
  },
  {
    label: 'Ownership',
    value: 'You own everything built',
    detail: 'Source, infrastructure, pipelines and documentation, in your accounts from day one.',
  },
];

/**
 * The four disciplines, as stated on About.
 *
 * Used by the hero panel to answer "what technologies does this company work
 * with" inside the first viewport.
 */
export const disciplineSummary = [
  { name: 'Product engineering', stack: 'TypeScript · React · Node' },
  { name: 'Cloud & platform', stack: 'AWS · Kubernetes · Terraform' },
  { name: 'Applied AI', stack: 'Python · Retrieval · Evals' },
  { name: 'Distributed ledger', stack: 'Solidity · Rust · Fabric' },
];
