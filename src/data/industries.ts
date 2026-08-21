import {
  Blocks,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  MonitorPlay,
  ShoppingCart,
  Building,
  Truck,
  Cloudy,
} from 'lucide-react';
import type { Industry } from '@/types/content';

/**
 * Industries are framed as engineering problems specific to each sector.
 * No client names, logos or engagement counts appear anywhere — none are
 * available to publish.
 */
export const industries: Industry[] = [
  {
    slug: 'fintech',
    name: 'FinTech',
    challenge:
      'Correctness is non-negotiable and regulators expect it to be demonstrable. Every balance must reconcile and every state change must be explainable months later.',
    approach:
      'Ledger-first design with idempotent transaction paths, immutable audit logs and reconciliation running continuously rather than at period end.',
    systems: [
      'Double-entry ledgers',
      'Payment and banking integrations',
      'KYC and onboarding flows',
      'Compliance and audit reporting',
    ],
    Icon: Landmark,
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    challenge:
      'Patient data carries strict handling obligations, and clinical software is used under time pressure by people who cannot stop to interpret an ambiguous screen.',
    approach:
      'Access control modelled on clinical roles, encryption and audit trails throughout, and interfaces tested against the actual conditions of use.',
    systems: [
      'Patient and case management',
      'Scheduling and capacity systems',
      'Interoperability and records exchange',
      'Clinical workflow tooling',
    ],
    Icon: HeartPulse,
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    challenge:
      'Traffic is spiky, inventory truth is distributed across systems, and every hundred milliseconds of latency is measurable in abandonment.',
    approach:
      'Read paths cached aggressively, write paths kept consistent, and inventory reconciled across channels through one authoritative service.',
    systems: [
      'Storefronts and checkout',
      'Inventory and order management',
      'Payment and fulfilment integration',
      'Merchandising and pricing tools',
    ],
    Icon: ShoppingCart,
  },
  {
    slug: 'logistics',
    name: 'Logistics',
    challenge:
      'Operations run on partial, delayed and sometimes contradictory information from vehicles, warehouses and third-party carriers.',
    approach:
      'Event-driven architecture that treats late and out-of-order data as normal, with reconciliation and a single view of shipment state.',
    systems: [
      'Fleet and route optimisation',
      'Warehouse management',
      'Carrier and customs integration',
      'Track-and-trace platforms',
    ],
    Icon: Truck,
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    challenge:
      'Transactions involve many parties, long timelines and documents that must remain verifiable years after signature.',
    approach:
      'Workflow systems that model the real sequence of approvals, with document integrity and — where parties genuinely require it — on-chain provenance.',
    systems: [
      'Listing and portfolio platforms',
      'Transaction and document workflow',
      'Tenant and facilities systems',
      'Tokenised asset infrastructure',
    ],
    Icon: Building,
  },
  {
    slug: 'education',
    name: 'Education',
    challenge:
      'Usage is extremely seasonal, the user base spans wide ranges of ability and device, and accessibility is a legal requirement rather than a preference.',
    approach:
      'Architecture that scales down as readily as up, accessibility verified at component level, and content delivery tuned for low-bandwidth conditions.',
    systems: [
      'Learning platforms',
      'Assessment and proctoring',
      'Student information systems',
      'Credentialing and verification',
    ],
    Icon: GraduationCap,
  },
  {
    slug: 'media',
    name: 'Media',
    challenge:
      'Large files, unpredictable demand and rights rules that vary by territory, device and window.',
    approach:
      'Pipeline-based processing with tiered storage, edge delivery, and entitlement checks enforced at the point of playback.',
    systems: [
      'Content management and publishing',
      'Streaming and transcoding pipelines',
      'Rights and entitlement services',
      'Audience analytics',
    ],
    Icon: MonitorPlay,
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    challenge:
      'Plant equipment produces continuous telemetry, but that data usually sits in systems that were never designed to be queried together.',
    approach:
      'Time-series ingestion with edge buffering for unreliable connectivity, and a data layer that joins machine telemetry to production planning.',
    systems: [
      'Production monitoring',
      'Predictive maintenance',
      'Supply chain integration',
      'Quality and traceability systems',
    ],
    Icon: Factory,
  },
  {
    slug: 'saas',
    name: 'SaaS',
    challenge:
      'Every architectural shortcut taken to reach the first customers becomes a constraint by the fiftieth — particularly around tenancy and billing.',
    approach:
      'Tenancy, entitlement and metering treated as first-class domain concepts, so onboarding a customer never requires an engineer.',
    systems: [
      'Multi-tenant platforms',
      'Subscription and metering',
      'Admin and provisioning consoles',
      'Product analytics',
    ],
    Icon: Cloudy,
  },
  {
    slug: 'web3',
    name: 'Web3 & Blockchain',
    challenge:
      'On-chain code is effectively permanent and holds value directly, while the surrounding infrastructure — nodes, indexers, providers — fails routinely.',
    approach:
      'Contracts specified and threat-modelled before implementation, with application layers designed to degrade gracefully when a node or provider drops.',
    systems: [
      'Protocol and contract development',
      'Decentralised applications',
      'Node and indexing infrastructure',
      'Custody and key management',
    ],
    Icon: Blocks,
  },
];

export const getIndustry = (slug: string) => industries.find((item) => item.slug === slug);
