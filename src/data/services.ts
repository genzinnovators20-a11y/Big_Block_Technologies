import {
  Blocks,
  Boxes,
  Cloud,
  Code2,
  Cpu,
  FileCode2,
  GitBranch,
  Layers,
  LayoutGrid,
  Link2,
  Smartphone,
  Compass,
} from 'lucide-react';
import type { CapabilityGroup, Service } from '@/types/content';

/**
 * Capability groups.
 *
 * Grouping by what the work *does* — build it, run it, or specialised depth —
 * rather than presenting twelve equivalent cards. A prospective client reads
 * three ideas instead of scanning a grid.
 */
export const capabilityGroups: CapabilityGroup[] = [
  {
    id: 'build',
    title: 'Build',
    description:
      'Product and platform engineering. Systems designed around a specific operating model rather than assembled from templates.',
  },
  {
    id: 'run',
    title: 'Run',
    description:
      'The infrastructure, delivery pipeline and interface work that keeps software shippable after the first release.',
  },
  {
    id: 'specialised',
    title: 'Specialised',
    description:
      'Domains that need dedicated depth: distributed ledgers, contract security and applied machine learning.',
  },
];

export const services: Service[] = [
  // ---------------------------------------------------------------- Build
  {
    id: 'custom-software',
    group: 'build',
    name: 'Custom Software Development',
    summary: 'Systems built to how a business actually operates.',
    problem:
      'Off-the-shelf tools force a business to change its process to fit the software. Once the workarounds start, the cost of the mismatch compounds every year.',
    delivers: [
      'Domain model and architecture defined before implementation',
      'Production application with automated test coverage',
      'Integration with the systems already in place',
      'Handover documentation and source ownership',
    ],
    stack: ['TypeScript', 'Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis'],
    Icon: Code2,
  },
  {
    id: 'web-applications',
    group: 'build',
    name: 'Web Application Development',
    summary: 'Product-grade web platforms, not brochure sites.',
    problem:
      'Web products fail on the parts users never see: state handling, permissions, offline behaviour and the performance budget. These are architectural decisions, not styling choices.',
    delivers: [
      'Component architecture and design system implemented as code',
      'Authentication, authorisation and role modelling',
      'Performance budget enforced through the build',
      'Accessibility conformance built in from the first component',
    ],
    stack: ['React', 'TypeScript', 'Next.js', 'Vite', 'GraphQL', 'REST'],
    Icon: LayoutGrid,
  },
  {
    id: 'mobile',
    group: 'build',
    name: 'Mobile Development',
    summary: 'iOS and Android applications that respect each platform.',
    problem:
      'Cross-platform delivery usually degrades into an app that feels wrong on both platforms. Navigation, gestures and typography have to follow each platform, not average across them.',
    delivers: [
      'Platform-appropriate navigation and interaction patterns',
      'Offline-first data layer with conflict handling',
      'Release pipeline for both app stores',
      'Crash reporting and release health monitoring',
    ],
    stack: ['React Native', 'Swift', 'Kotlin', 'Expo', 'SQLite'],
    Icon: Smartphone,
  },
  {
    id: 'enterprise',
    group: 'build',
    name: 'Enterprise Applications',
    summary: 'Internal systems, integrations and process automation.',
    problem:
      'Enterprise estates accumulate systems that do not talk to each other. Data is re-keyed between them, reconciliation becomes manual, and nobody trusts the reporting.',
    delivers: [
      'Integration layer across existing systems of record',
      'Role-based access aligned to the organisation chart',
      'Audit trails and data lineage where compliance requires them',
      'Migration plan that does not require a hard cutover',
    ],
    stack: ['Node.js', '.NET', 'Java', 'Kafka', 'PostgreSQL', 'OpenAPI'],
    Icon: Layers,
  },

  // ------------------------------------------------------------------ Run
  {
    id: 'cloud',
    group: 'run',
    name: 'Cloud Engineering',
    summary: 'Architecture, migration and cost control on public cloud.',
    problem:
      'Cloud spend grows faster than usage when infrastructure is provisioned by hand. Without defined environments, capacity planning turns into guesswork.',
    delivers: [
      'Infrastructure as code across every environment',
      'Network, identity and secrets architecture',
      'Migration path from existing hosting',
      'Cost attribution per service and environment',
    ],
    stack: ['AWS', 'Azure', 'Google Cloud', 'Terraform', 'Kubernetes'],
    Icon: Cloud,
  },
  {
    id: 'devops',
    group: 'run',
    name: 'DevOps & Platform Engineering',
    summary: 'Pipelines, environments and observability that let teams ship.',
    problem:
      'When releases are manual they become rare, and rare releases become risky. The fix is a pipeline the team trusts enough to use several times a day.',
    delivers: [
      'CI/CD pipelines with automated quality gates',
      'Reproducible environments from a single definition',
      'Metrics, logs and traces wired to actionable alerts',
      'Rollback and incident response procedures',
    ],
    stack: ['GitHub Actions', 'GitLab CI', 'Docker', 'Kubernetes', 'Terraform', 'OpenTelemetry'],
    Icon: GitBranch,
  },
  {
    id: 'ui-ux',
    group: 'run',
    name: 'UI/UX Engineering',
    summary: 'Interface systems that survive contact with a real codebase.',
    problem:
      'A design file is not a design system. Without tokens, states and accessibility encoded in code, the interface drifts apart within two release cycles.',
    delivers: [
      'Design tokens as the single source of visual truth',
      'Component library with documented states and variants',
      'WCAG-oriented accessibility review and remediation',
      'Responsive behaviour specified rather than improvised',
    ],
    stack: ['React', 'TypeScript', 'Material UI', 'Storybook', 'Figma'],
    Icon: Boxes,
  },
  {
    id: 'consulting',
    group: 'run',
    name: 'Technology Consulting',
    summary: 'Architecture review, delivery assessment and technical due diligence.',
    problem:
      'Teams often know something is wrong but not which constraint is causing it. An outside read separates the architectural problem from the delivery problem.',
    delivers: [
      'Architecture and codebase assessment with findings ranked by risk',
      'Delivery process and team topology review',
      'Technology selection with the trade-offs written down',
      'Sequenced remediation plan with effort estimates',
    ],
    stack: ['Architecture review', 'Threat modelling', 'Cost modelling', 'Technical due diligence'],
    Icon: Compass,
  },

  // ---------------------------------------------------------- Specialised
  {
    id: 'blockchain',
    group: 'specialised',
    name: 'Blockchain Development',
    summary: 'Protocol, chain and node infrastructure engineering.',
    problem:
      'Distributed ledger work fails on operations far more often than on cryptography — node reliability, chain reorganisations, indexing lag and key custody.',
    delivers: [
      'Chain selection and consensus trade-off analysis',
      'Node infrastructure with monitoring and failover',
      'Indexing and event pipelines for on-chain data',
      'Key management and signing architecture',
    ],
    stack: ['Ethereum', 'Solana', 'Polygon', 'Hyperledger Fabric', 'Substrate', 'IPFS'],
    Icon: Blocks,
  },
  {
    id: 'smart-contracts',
    group: 'specialised',
    name: 'Smart Contract Engineering',
    summary: 'Contracts written, tested and reviewed as production systems.',
    problem:
      'Deployed contract code is difficult to change and holds value directly. Bugs are not incidents to patch next sprint — they are permanent and expensive.',
    delivers: [
      'Contract specification and threat model before code',
      'Implementation with unit, fork and invariant tests',
      'Internal review against known vulnerability classes',
      'Deployment scripts, upgrade strategy and runbooks',
    ],
    stack: ['Solidity', 'Rust', 'Foundry', 'Hardhat', 'Slither', 'OpenZeppelin'],
    Icon: FileCode2,
  },
  {
    id: 'web3-apps',
    group: 'specialised',
    name: 'Web3 Applications',
    summary: 'Decentralised applications people can actually use.',
    problem:
      'Most on-chain products lose users at the wallet. Transaction states, gas, network switching and failure recovery are interface problems before they are chain problems.',
    delivers: [
      'Wallet connection and network handling across providers',
      'Transaction lifecycle states surfaced honestly in the UI',
      'On-chain and off-chain data reconciled in one view',
      'Graceful degradation when a node or provider fails',
    ],
    stack: ['React', 'TypeScript', 'viem', 'wagmi', 'The Graph', 'WalletConnect'],
    Icon: Link2,
  },
  {
    id: 'ai',
    group: 'specialised',
    name: 'AI Solutions',
    summary: 'Applied machine learning inside real product workflows.',
    problem:
      'A model demo is not a feature. Production systems need retrieval that stays current, evaluation that catches regressions, and a cost profile that survives scale.',
    delivers: [
      'Retrieval architecture over the organisation’s own data',
      'Evaluation harness with regression tests on model output',
      'Guardrails, fallback paths and human review points',
      'Cost and latency budgets enforced per request',
    ],
    stack: ['Python', 'TypeScript', 'Vector databases', 'Model APIs', 'Evaluation tooling'],
    Icon: Cpu,
  },
];

export const servicesByGroup = (group: CapabilityGroup['id']) =>
  services.filter((service) => service.group === group);

export const getService = (id: string) => services.find((service) => service.id === id);
