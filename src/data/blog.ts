import type { BlogPost } from '@/types/content';

/**
 * Insights.
 *
 * Editorial written by the engineering team. There are no author names and no
 * publication dates on these entries, because attributing them to invented
 * individuals or invented dates would be fabrication. `publishedAt` exists on
 * the type and the UI renders a date whenever one is present, so real values
 * can be supplied later — or the whole module replaced with a CMS fetch —
 * without touching the components.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'when-a-blockchain-is-the-wrong-answer',
    title: 'When a blockchain is the wrong answer',
    topic: 'Blockchain',
    excerpt:
      'A distributed ledger solves one specific problem: shared state between parties who do not trust one another. Most requirements that arrive described as blockchain projects are not that.',
    readingMinutes: 6,
    body: [
      {
        kind: 'paragraph',
        text: 'Distributed ledgers exist to solve a narrow and genuinely hard problem: several parties need to agree on one record, and none of them is willing to let another hold it. If that describes your situation, a ledger is likely the right tool. If it does not, a ledger will cost more, run slower and fail more often than a database.',
      },
      { kind: 'heading', text: 'The question that settles it' },
      {
        kind: 'paragraph',
        text: 'Ask who would operate the system if it were an ordinary database, and whether every participant would accept that arrangement. If one organisation can hold the data without objection, the problem is not decentralisation. It may be integration, auditability or access control — all of which have cheaper solutions.',
      },
      {
        kind: 'list',
        items: [
          'Auditability alone is satisfied by an append-only table and signed exports.',
          'Data sharing between departments is an access control problem, not a trust problem.',
          'Provenance within one organisation needs cryptographic hashing, not consensus.',
          'Immutability is a property of how you write, not of where you write.',
        ],
      },
      { kind: 'heading', text: 'What a ledger actually costs' },
      {
        kind: 'paragraph',
        text: 'The engineering cost is rarely in the contracts. It is in the operations around them: running nodes that must not fall behind, handling chain reorganisations, indexing on-chain data into something queryable, and managing keys whose loss is unrecoverable. Each of these is a system in its own right and each needs monitoring.',
      },
      {
        kind: 'callout',
        text: 'Deployed contract code holds value directly and is difficult to change. A defect is not something to fix next sprint — it is permanent until an upgrade path you designed in advance is exercised.',
      },
      { kind: 'heading', text: 'When it is clearly right' },
      {
        kind: 'paragraph',
        text: 'Multi-party custody chains, settlement between organisations that compete, and provenance that must be verifiable by someone outside the consortium are all cases where the alternative — trusting one operator — is genuinely unacceptable. In those situations the operational cost is worth paying, and the work becomes designing custody, upgrade paths and failure behaviour with the seriousness they deserve.',
      },
    ],
  },
  {
    slug: 'architecture-decision-records',
    title: 'Architecture decisions are worth writing down',
    topic: 'Architecture',
    excerpt:
      'The expensive question two years into a system is not what it does, but why it was built this way. A short record written at the time answers it.',
    readingMinutes: 5,
    body: [
      {
        kind: 'paragraph',
        text: 'Most architectural knowledge lives in the heads of the people who made the decisions, and it leaves when they do. What remains is a system whose shape nobody can explain, which makes every subsequent change more cautious and more expensive than it needs to be.',
      },
      { kind: 'heading', text: 'What a record contains' },
      {
        kind: 'list',
        items: [
          'The decision, stated in one sentence.',
          'The context and constraints that applied at the time.',
          'The alternatives considered, and why each was rejected.',
          'The consequences accepted, including the ones you dislike.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'The fourth point carries most of the value. Every architecture trades something away. A record that lists only advantages is marketing; a record that names what was given up lets a future engineer judge whether the trade still holds.',
      },
      { kind: 'heading', text: 'Records are immutable' },
      {
        kind: 'paragraph',
        text: 'When a decision is revisited, write a new record that supersedes the old one rather than editing history. The sequence of superseded decisions is itself informative — it shows which constraints kept moving, which is usually where the next problem will appear.',
      },
      {
        kind: 'callout',
        text: 'A useful test: if a new engineer asks "why is it like this?" and the answer is not already written down, that is the record you owed the project.',
      },
    ],
  },
  {
    slug: 'design-tokens-as-a-contract',
    title: 'Design tokens are a contract, not a colour list',
    topic: 'UI Engineering',
    excerpt:
      'Interfaces drift apart because visual decisions get made in components. Tokens work when they are the only place those decisions are allowed to live.',
    readingMinutes: 5,
    body: [
      {
        kind: 'paragraph',
        text: 'A design system fails quietly. Nobody decides to abandon it — an engineer needs a slightly darker border for one card, hard-codes it, and within two quarters the interface has forty greys and no way to change any of them centrally.',
      },
      { kind: 'heading', text: 'Semantic names, not literal ones' },
      {
        kind: 'paragraph',
        text: 'A token called blue-600 tells you what it looks like. A token called border-subtle tells you what it is for. The first survives until someone rebrands; the second survives a rebrand, a dark mode and an accessibility audit, because its meaning does not depend on its value.',
      },
      { kind: 'heading', text: 'States belong in the system too' },
      {
        kind: 'list',
        items: [
          'Hover, active, focus-visible and disabled for every interactive component.',
          'Both colour schemes defined together, not one derived from the other by inversion.',
          'Focus treatment specified once and applied everywhere, never removed.',
          'Motion duration and easing as tokens, so timing is consistent across the product.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'Dark mode is where shortcuts surface. Inverting a light palette produces washed-out surfaces and text that fails contrast at exactly the sizes real interfaces use. The two schemes need designing together, and each needs verifying independently.',
      },
      {
        kind: 'callout',
        text: 'If changing the brand colour requires touching more than one file, the tokens are decorative rather than structural.',
      },
    ],
  },
  {
    slug: 'idempotency-in-payment-systems',
    title: 'Idempotency is what makes retries safe',
    topic: 'FinTech',
    excerpt:
      'Networks fail midway through requests. Without idempotency keys, every retry risks charging a customer twice — and reconciliation becomes a manual job.',
    readingMinutes: 6,
    body: [
      {
        kind: 'paragraph',
        text: 'A payment request that times out has three possible states: it never arrived, it succeeded, or it succeeded and the response was lost. The caller cannot distinguish them. Any system that retries without protection will eventually create duplicate charges.',
      },
      { kind: 'heading', text: 'The key is client-generated' },
      {
        kind: 'paragraph',
        text: 'The client generates a unique key per logical operation and sends it with every attempt. The server records the key with the result of the first successful execution. Subsequent requests carrying that key return the stored result rather than performing the work again.',
      },
      {
        kind: 'list',
        items: [
          'The key must identify the intent, not the attempt — every retry reuses it.',
          'Store the key and the response in the same transaction as the effect.',
          'Expire keys on a horizon longer than the maximum retry window.',
          'Return the original response on replay, including its original status.',
        ],
      },
      { kind: 'heading', text: 'It has to be one transaction' },
      {
        kind: 'paragraph',
        text: 'The most common implementation error is recording the idempotency key outside the transaction that performs the work. A crash between the two leaves a key with no effect, or an effect with no key. Both reintroduce exactly the duplicate the mechanism was meant to prevent.',
      },
      {
        kind: 'callout',
        text: 'Idempotency removes duplicates at the source. Reconciliation then verifies that guarantee held, rather than being the mechanism that finds the errors.',
      },
    ],
  },
  {
    slug: 'evaluating-ai-features-before-shipping',
    title: 'Evaluate an AI feature before you build it',
    topic: 'Applied AI',
    excerpt:
      'A model demo proves the happy path exists. An evaluation set proves the feature works — and catches the regression introduced by the next prompt change.',
    readingMinutes: 6,
    body: [
      {
        kind: 'paragraph',
        text: 'Model-backed features are unusually easy to demonstrate and unusually hard to verify. The demo uses questions chosen because they work. Production receives questions chosen by users, and the difference between those two sets is where the feature either holds up or fails.',
      },
      { kind: 'heading', text: 'Build the evaluation set first' },
      {
        kind: 'paragraph',
        text: 'Before writing the feature, assemble questions drawn from real sources — support tickets, search logs, recorded calls — each with a verified correct answer. Fifty realistic cases with known answers are worth more than a thousand generated ones, because the generated set inherits the same assumptions as the system under test.',
      },
      {
        kind: 'list',
        items: [
          'Include questions the system should refuse or escalate.',
          'Include questions whose answer is genuinely absent from the corpus.',
          'Include near-duplicates that differ in one significant detail.',
          'Record why each expected answer is correct, not just what it is.',
        ],
      },
      { kind: 'heading', text: 'Regression is the real risk' },
      {
        kind: 'paragraph',
        text: 'Prompt edits, retrieval changes and model version updates all alter behaviour in ways nobody can predict by reading the diff. Without the evaluation set running as a gate in the pipeline, quality drifts silently and the first report comes from a user.',
      },
      {
        kind: 'callout',
        text: 'Requiring citations changes the failure mode from a confident wrong answer to a checkable one. That is usually the difference between a feature staff trust and one they quietly stop using.',
      },
    ],
  },
  {
    slug: 'strangler-pattern-legacy-migration',
    title: 'Replacing a legacy system without stopping the business',
    topic: 'Modernisation',
    excerpt:
      'Big-bang rewrites fail for a structural reason: they defer all risk to one date. Incremental replacement spreads that risk across many reversible steps.',
    readingMinutes: 7,
    body: [
      {
        kind: 'paragraph',
        text: 'The rewrite that replaces everything at once has to reproduce years of accumulated behaviour — including the undocumented behaviour people depend on — and prove it on a single cutover date. Every unknown discovered late compresses against that date.',
      },
      { kind: 'heading', text: 'Put a façade in front' },
      {
        kind: 'paragraph',
        text: 'Introduce an interface between consumers and the legacy system before changing anything behind it. Once every caller goes through that boundary, individual capabilities can be redirected to new implementations one at a time, and redirected back if comparison fails.',
      },
      {
        kind: 'list',
        items: [
          'Start with read paths — they are reversible and lower risk.',
          'Run old and new in parallel, comparing outputs on live traffic.',
          'Migrate one capability per increment, never several at once.',
          'Keep the legacy path available until the new one has proven itself.',
        ],
      },
      { kind: 'heading', text: 'Comparison documents the system' },
      {
        kind: 'paragraph',
        text: 'Running both implementations against real inputs surfaces the behaviour nobody remembered — the special case for one customer, the rounding rule applied only in one region. Each discrepancy is a specification the original documentation never contained, and capturing them is often worth as much as the migration itself.',
      },
      {
        kind: 'callout',
        text: 'The objective is not to move faster than a rewrite. It is that every step is individually reversible, so no single failure threatens the business.',
      },
    ],
  },
];

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);

export const blogTopics = [...new Set(blogPosts.map((post) => post.topic))];
