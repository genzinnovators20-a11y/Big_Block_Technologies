import type { CaseStudy } from '@/types/content';

/**
 * Representative engagement patterns.
 *
 * IMPORTANT — these are not client case studies. No verified client names,
 * results or metrics are available to publish, so nothing here claims to be
 * one. Each entry describes the *shape* of a problem and the engineering
 * approach taken to it, and every surface that renders these records also
 * renders `illustrativeNotice` so a reader is never misled.
 *
 * When real, approved case studies exist, replace this array (or point the
 * loader at a CMS) and set `isIllustrative` to false in the type.
 */
export const illustrativeNotice =
  'These are representative engagement patterns that illustrate how we approach recurring problems. They are not client case studies, and they contain no client names or performance claims.';

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ledger-reconciliation-platform',
    title: 'Reconciling a payments ledger that no longer balanced',
    sector: 'FinTech',
    engagement: 'Architecture & rebuild',
    challenge:
      'A payments product had grown by adding providers one at a time. Each integration wrote to the database in its own shape, retries produced duplicate records, and the month-end reconciliation had become a multi-day manual exercise that finance no longer trusted.',
    approach: [
      'Audited every write path and catalogued where the same economic event could be recorded twice.',
      'Modelled the domain as a double-entry ledger with immutable postings, so a balance is derived rather than stored.',
      'Introduced idempotency keys at the provider boundary, making retries safe by construction.',
      'Backfilled historic transactions into the new model and ran both systems in parallel until they agreed.',
    ],
    solution:
      'An append-only ledger service sits behind every payment path. Provider adapters translate external events into postings, and reconciliation runs continuously against provider statements instead of at period end.',
    outcomes: [
      'Reconciliation became a monitored, continuous process rather than a manual period-end task',
      'Duplicate postings from provider retries were eliminated at the source',
      'Finance and engineering worked from the same authoritative record',
    ],
    stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Kafka', 'Terraform', 'AWS'],
    isIllustrative: true,
  },
  {
    slug: 'legacy-erp-modernisation',
    title: 'Moving off an unsupported ERP without a hard cutover',
    sector: 'Manufacturing',
    engagement: 'Legacy modernisation',
    challenge:
      'Production planning depended on a system running on an unsupported platform. Nobody remaining at the company had written the original code, changes took months, and a big-bang replacement would have risked halting the plant.',
    approach: [
      'Traced the system’s real inputs and outputs rather than trusting the original documentation.',
      'Placed an API façade in front of the legacy system so consumers could be redirected one at a time.',
      'Rebuilt capability behind the façade in slices, starting with the lowest-risk read paths.',
      'Ran old and new side by side, comparing outputs on live data before switching each slice over.',
    ],
    solution:
      'A strangler-pattern migration in which the façade routes each capability to whichever implementation is currently authoritative, allowing the legacy system to be retired incrementally.',
    outcomes: [
      'Capability moved across in slices with no scheduled production downtime',
      'Each migrated slice could be reverted independently if comparison failed',
      'Planning logic was documented as a by-product of the comparison work',
    ],
    stack: ['Java', '.NET', 'PostgreSQL', 'Kubernetes', 'OpenAPI', 'Azure'],
    isIllustrative: true,
  },
  {
    slug: 'multi-party-provenance-network',
    title: 'A shared record for parties who do not trust each other',
    sector: 'Logistics',
    engagement: 'Blockchain engineering',
    challenge:
      'Several independent organisations needed one authoritative record of custody transfers. Each maintained its own database, disputes were settled by comparing exports, and no party was willing to let another host the system of record.',
    approach: [
      'Tested the premise first: established that a shared database with one operator was unacceptable to the participants, which is what justified a ledger.',
      'Selected a permissioned chain, since participants were known and throughput mattered more than open access.',
      'Specified and threat-modelled the contracts before writing them, covering custody transfer and dispute paths.',
      'Built an indexing layer so each party could query shared state through familiar tooling.',
    ],
    solution:
      'A permissioned ledger holds custody events, with per-organisation signing keys held in dedicated custody infrastructure. An indexer projects chain state into a queryable read model for each participant.',
    outcomes: [
      'Participants worked from one record without any of them operating it',
      'Custody disputes could be settled against the ledger rather than by exchanging exports',
      'Chain state remained queryable through conventional reporting tools',
    ],
    stack: ['Hyperledger Fabric', 'Go', 'TypeScript', 'PostgreSQL', 'Kubernetes'],
    isIllustrative: true,
  },
  {
    slug: 'defi-contract-hardening',
    title: 'Hardening a contract suite before mainnet deployment',
    sector: 'Web3',
    engagement: 'Smart contract engineering',
    challenge:
      'A protocol was approaching deployment with contracts that worked on the happy path but had never been tested against adversarial conditions, and no upgrade or incident plan existed.',
    approach: [
      'Wrote an explicit specification of intended behaviour, which surfaced disagreements within the team before any code changed.',
      'Built an invariant test suite asserting properties that must hold under any sequence of calls.',
      'Ran fork tests against live network state to exercise real oracle and liquidity conditions.',
      'Reviewed against known vulnerability classes — reentrancy, oracle manipulation, rounding and access control.',
    ],
    solution:
      'A tested contract suite with documented invariants, a rehearsed deployment procedure, and a defined upgrade and pause strategy with the operational runbooks to use it.',
    outcomes: [
      'Behavioural ambiguities were resolved in specification rather than after deployment',
      'Invariant and fork tests ran as gates in the delivery pipeline',
      'The team held a rehearsed procedure for pausing and upgrading',
    ],
    stack: ['Solidity', 'Foundry', 'Hardhat', 'Slither', 'viem', 'TypeScript'],
    isIllustrative: true,
  },
  {
    slug: 'internal-knowledge-retrieval',
    title: 'Making internal documentation answerable',
    sector: 'Enterprise SaaS',
    engagement: 'AI engineering',
    challenge:
      'Support staff spent a substantial part of each day locating information that already existed across wikis, ticket histories and PDFs. An earlier assistant had been abandoned because it produced confident but wrong answers.',
    approach: [
      'Started with evaluation: assembled a question set from real tickets with verified correct answers before building anything.',
      'Built retrieval over the existing corpus with source attribution required on every response.',
      'Constrained the system to answer only from retrieved material, and to say when it could not.',
      'Wired the evaluation set into the pipeline so retrieval or prompt changes could not silently regress.',
    ],
    solution:
      'A retrieval service over indexed internal content, returning answers with citations to the source document and an explicit "not found in the documentation" path.',
    outcomes: [
      'Every answer carried a source link staff could verify',
      'Quality regressions were caught by the evaluation gate before release',
      'Unanswerable questions were surfaced rather than guessed at',
    ],
    stack: ['Python', 'TypeScript', 'Vector database', 'Model APIs', 'Evaluation harness'],
    isIllustrative: true,
  },
  {
    slug: 'platform-delivery-pipeline',
    title: 'Turning a quarterly release into a daily one',
    sector: 'SaaS',
    engagement: 'DevOps & platform',
    challenge:
      'Releases happened roughly quarterly and took a full weekend. Because each release carried a quarter of accumulated change, failures were hard to attribute and rollbacks were effectively impossible.',
    approach: [
      'Measured where time actually went in a release, rather than assuming the bottleneck was the deployment step.',
      'Defined every environment as code so staging genuinely matched production.',
      'Added automated quality gates — tests, migrations and smoke checks — to the pipeline.',
      'Separated deployment from release using feature flags, so shipping code and enabling it became distinct decisions.',
    ],
    solution:
      'A CI/CD pipeline producing one artefact promoted across identical environments, with automated gates, flag-controlled rollout and a rehearsed rollback path.',
    outcomes: [
      'Deployments became routine rather than scheduled events',
      'Smaller change sets made failures easier to attribute',
      'Rollback became a rehearsed procedure instead of an emergency',
    ],
    stack: ['GitHub Actions', 'Docker', 'Kubernetes', 'Terraform', 'OpenTelemetry'],
    isIllustrative: true,
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((item) => item.slug === slug);
