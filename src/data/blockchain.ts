/**
 * Blockchain and Web3 capability areas.
 *
 * Each entry is derived from work the site already describes: the `delivers`
 * lists on the three specialised services, the `includes` lists on the
 * blockchain and Web3 solutions, and the systems named under the Web3 and Real
 * Estate industries.
 *
 * The reference design lists ten areas including "DeFi Applications",
 * "NFT Platforms" and "DAO Platforms". Those are **not** reproduced here.
 * Nothing in the project's approved content supports an offer to build
 * financial products, marketplaces or governance treasuries, and claiming them
 * would be the kind of unsupported crypto positioning this practice explicitly
 * argues against. What is listed below is engineering the practice genuinely
 * describes doing.
 */

export interface BlockchainCapability {
  index: string;
  title: string;
  body: string;
  tags?: string[];
}

export const blockchainCapabilities: BlockchainCapability[] = [
  {
    index: '01',
    title: 'Feasibility assessment',
    body: 'We test the premise before the technology: would a shared database with one operator be acceptable to every participant? Where it would, we say so, and the engagement is a shorter conversation.',
    tags: ['Alternatives review', 'Cost modelling'],
  },
  {
    index: '02',
    title: 'Chain & consensus selection',
    body: 'Permissioned or public, and which chain, decided against throughput, finality, custody and who is allowed to participate — with the trade-offs written down.',
    tags: ['Ethereum', 'Polygon', 'Solana'],
  },
  {
    index: '03',
    title: 'Smart contract engineering',
    body: 'Specification and threat model before code. Implementation with unit, fork and invariant tests, because deployed contract code holds value directly and cannot be patched next sprint.',
    tags: ['Solidity', 'Rust', 'Foundry'],
  },
  {
    index: '04',
    title: 'Contract security review',
    body: 'Review against known vulnerability classes — reentrancy, oracle manipulation, rounding and access control — with findings ranked by exploitability rather than by ease of fixing.',
    tags: ['Slither', 'Invariant tests', 'Fork tests'],
  },
  {
    index: '05',
    title: 'Enterprise & permissioned networks',
    body: 'Consortium platforms where participants are known and the requirement is a shared record none of them operates. Governance, membership and audit paths designed in from the start.',
    tags: ['Hyperledger Fabric', 'Go'],
  },
  {
    index: '06',
    title: 'Tokenised asset infrastructure',
    body: 'Where an asset genuinely needs on-chain provenance — property records, custody chains — the ledger holds the claim and the surrounding system holds everything else.',
    tags: ['Provenance', 'Custody chains'],
  },
  {
    index: '07',
    title: 'Decentralised applications',
    body: 'The difficulty in Web3 sits at the boundary: signing, pending states, chain reorganisations and failed transactions all have to be represented honestly to a person.',
    tags: ['viem', 'wagmi', 'WalletConnect'],
  },
  {
    index: '08',
    title: 'Wallet & key management',
    body: 'Signing architecture and key custody, designed on the assumption that a lost key is unrecoverable and a compromised one is catastrophic.',
    tags: ['Signing architecture', 'Custody'],
  },
  {
    index: '09',
    title: 'Node & indexing infrastructure',
    body: 'Distributed ledger work fails on operations more often than on cryptography. Nodes that stay in sync, indexers that make chain state queryable, and monitoring for both.',
    tags: ['The Graph', 'IPFS', 'Kubernetes'],
  },
  {
    index: '10',
    title: 'Blockchain consulting',
    body: 'Architecture review and technical due diligence on ledger systems — including the assessment of whether the ledger in question should exist at all.',
    tags: ['Due diligence', 'Architecture review'],
  },
];
