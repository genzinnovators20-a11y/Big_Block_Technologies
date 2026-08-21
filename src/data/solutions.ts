import {
  Banknote,
  Blocks,
  BrainCircuit,
  Building2,
  CloudCog,
  Gauge,
  Repeat,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import type { Solution } from '@/types/content';

/**
 * Solutions are organised by the business outcome a client is trying to reach.
 * Technology appears only after the outcome, because clients arrive with a
 * problem, not a preferred stack.
 */
export const solutions: Solution[] = [
  {
    slug: 'digital-transformation',
    name: 'Digital Transformation',
    outcome: 'Replace manual process with systems that scale past headcount.',
    description:
      'Work that begins with the operating model rather than the software. We map how the business runs today, identify where information is re-keyed or lost, and rebuild those paths as systems.',
    signals: [
      'Core processes still run on spreadsheets and email',
      'Growth requires proportional hiring in operations',
      'The same data is entered into more than one system',
    ],
    includes: [
      'Process and data-flow mapping',
      'Target architecture and sequencing plan',
      'Phased build with production milestones',
      'Team enablement and handover',
    ],
    Icon: Workflow,
  },
  {
    slug: 'enterprise-modernisation',
    name: 'Enterprise Modernisation',
    outcome: 'Move off legacy systems without a high-risk rewrite.',
    description:
      'Legacy replacement fails when it is attempted in one step. We isolate the system behind an interface, move capability across incrementally, and keep the business running throughout.',
    signals: [
      'A critical system runs on an unsupported platform',
      'Changes take months because nobody is sure what will break',
      'Vendor or licensing cost is rising faster than value',
    ],
    includes: [
      'Codebase and dependency assessment',
      'Strangler-pattern migration plan',
      'Incremental replacement with parallel running',
      'Data migration with reconciliation',
    ],
    Icon: Building2,
  },
  {
    slug: 'saas-platforms',
    name: 'SaaS Platforms',
    outcome: 'Take a product from first version to multi-tenant scale.',
    description:
      'Multi-tenancy, billing, provisioning and per-customer configuration are architectural commitments. Deciding them late is what forces a rewrite in year two.',
    signals: [
      'Each customer is served by a slightly different deployment',
      'Onboarding a new account requires engineering time',
      'Usage data is not reliable enough to bill from',
    ],
    includes: [
      'Tenancy and data isolation model',
      'Subscription, entitlement and metering design',
      'Self-service onboarding and administration',
      'Usage analytics and reporting',
    ],
    Icon: Repeat,
  },
  {
    slug: 'fintech-systems',
    name: 'FinTech Systems',
    outcome: 'Move money and data with correctness that can be audited.',
    description:
      'Financial systems are judged on reconciliation, not throughput. We build ledgers that balance, transaction paths that are idempotent, and audit trails that answer questions after the fact.',
    signals: [
      'Reconciliation is a manual, end-of-period exercise',
      'Payment retries create duplicate records',
      'Compliance reporting is assembled by hand',
    ],
    includes: [
      'Double-entry ledger design',
      'Payment provider and banking integrations',
      'Idempotency, retry and reconciliation logic',
      'Audit logging and compliance reporting',
    ],
    Icon: Banknote,
  },
  {
    slug: 'blockchain-solutions',
    name: 'Blockchain Solutions',
    outcome: 'Use a distributed ledger where it genuinely removes a middleman.',
    description:
      'We start by testing whether a ledger is the right answer at all. Where it is — shared state across parties that do not trust each other — we design for custody, cost and chain reliability from the outset.',
    signals: [
      'Multiple organisations need one authoritative record',
      'Settlement or verification depends on an intermediary',
      'Provenance has to be independently verifiable',
    ],
    includes: [
      'Feasibility assessment against non-ledger alternatives',
      'Chain and consensus selection',
      'Contract and custody architecture',
      'Node operations and indexing infrastructure',
    ],
    Icon: Blocks,
  },
  {
    slug: 'web3-platforms',
    name: 'Web3 Platforms',
    outcome: 'Ship on-chain products with mainstream-quality interfaces.',
    description:
      'The engineering difficulty in Web3 sits at the boundary: signing, pending states, chain reorganisations and failed transactions all have to be represented honestly to a user.',
    signals: [
      'Users abandon the flow at wallet connection',
      'On-chain and application state disagree',
      'Failed transactions produce no useful explanation',
    ],
    includes: [
      'Wallet and multi-chain interaction layer',
      'Transaction state machine and error recovery',
      'Indexing pipeline for on-chain data',
      'Contract integration and testing',
    ],
    Icon: ShieldCheck,
  },
  {
    slug: 'ai-enabled-applications',
    name: 'AI-Enabled Applications',
    outcome: 'Put machine learning behind a workflow that already has value.',
    description:
      'The useful pattern is narrow: retrieval over the organisation’s own knowledge, classification that removes a queue, or drafting that a person then approves. Each needs evaluation before it needs scale.',
    signals: [
      'Staff spend hours locating information that exists internally',
      'A manual review queue grows faster than the team',
      'An existing model feature has no regression testing',
    ],
    includes: [
      'Use-case selection and feasibility review',
      'Retrieval and grounding architecture',
      'Evaluation harness and quality gates',
      'Cost, latency and fallback design',
    ],
    Icon: BrainCircuit,
  },
  {
    slug: 'cloud-native-systems',
    name: 'Cloud-Native Systems',
    outcome: 'Run infrastructure that scales with demand and is defined in code.',
    description:
      'Cloud-native is an operational discipline rather than a hosting choice: every environment reproducible from a repository, every deployment observable, every rollback rehearsed.',
    signals: [
      'Environments have drifted apart and nobody can recreate them',
      'Scaling events require manual intervention',
      'Incidents are diagnosed by reading raw logs',
    ],
    includes: [
      'Infrastructure as code and environment parity',
      'Container orchestration and autoscaling',
      'Observability with actionable alerting',
      'Disaster recovery and failover testing',
    ],
    Icon: CloudCog,
  },
  {
    slug: 'scalable-digital-platforms',
    name: 'Scalable Digital Platforms',
    outcome: 'Remove the ceiling that current architecture has imposed.',
    description:
      'Platforms usually fail at a specific bottleneck — a database write path, a synchronous integration, a single-region deployment. We find the actual constraint before changing anything else.',
    signals: [
      'Performance degrades predictably at peak load',
      'Scaling up costs more than it returns',
      'One slow dependency can take the whole product down',
    ],
    includes: [
      'Load profiling and bottleneck identification',
      'Caching, queueing and read/write separation',
      'Service boundaries and failure isolation',
      'Capacity planning and load testing',
    ],
    Icon: Gauge,
  },
];

export const getSolution = (slug: string) => solutions.find((item) => item.slug === slug);
