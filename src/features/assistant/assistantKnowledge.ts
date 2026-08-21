import { services } from '@/data/services';
import { solutions } from '@/data/solutions';
import { industries } from '@/data/industries';
import { generalFaqs } from '@/data/process';
import { openRoles } from '@/data/careers';

/**
 * Grounding data for the assistant.
 *
 * Every answer the local responder can give is derived from the same
 * structured content that renders the site. It cannot state anything the site
 * does not already state, which is what keeps it from inventing capabilities,
 * pricing or client results.
 *
 * When a backend is connected this same corpus is what should be sent as
 * retrieval context, so the two modes stay consistent.
 */

export interface KnowledgeEntry {
  /** Terms that indicate this entry answers the question. */
  keywords: string[];
  answer: string;
  /** Where in the site the visitor can read more. */
  href?: string;
  linkLabel?: string;
}

const serviceEntries: KnowledgeEntry[] = services.map((service) => ({
  keywords: [
    service.name.toLowerCase(),
    ...service.name.toLowerCase().split(/\s+/),
    ...service.stack.map((tech) => tech.toLowerCase()),
    service.id.replace(/-/g, ' '),
  ],
  answer: `${service.name}: ${service.summary} ${service.problem} We deliver: ${service.delivers.join('; ')}. Typical technologies: ${service.stack.join(', ')}.`,
  href: `/services#${service.id}`,
  linkLabel: `Read about ${service.name}`,
}));

const solutionEntries: KnowledgeEntry[] = solutions.map((solution) => ({
  keywords: [
    solution.name.toLowerCase(),
    ...solution.name.toLowerCase().split(/\s+/),
    solution.slug.replace(/-/g, ' '),
  ],
  answer: `${solution.name} — ${solution.outcome} ${solution.description} This usually applies when: ${solution.signals.join('; ')}.`,
  href: `/solutions#${solution.slug}`,
  linkLabel: `Read about ${solution.name}`,
}));

const industryEntries: KnowledgeEntry[] = industries.map((industry) => ({
  keywords: [industry.name.toLowerCase(), industry.slug.replace(/-/g, ' ')],
  answer: `${industry.name}: ${industry.challenge} Our approach — ${industry.approach} Systems we build: ${industry.systems.join(', ')}.`,
  href: `/industries#${industry.slug}`,
  linkLabel: `Read about ${industry.name}`,
}));

const faqEntries: KnowledgeEntry[] = generalFaqs.map((faq) => ({
  keywords: faq.question
    .toLowerCase()
    .replace(/[?.,]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 3),
  answer: faq.answer,
}));

export const knowledgeBase: KnowledgeEntry[] = [
  ...serviceEntries,
  ...solutionEntries,
  ...industryEntries,
  ...faqEntries,

  {
    keywords: ['company', 'about', 'who', 'big block', 'technologies', 'what do you do'],
    answer:
      'Big Block Technologies is a technology engineering and consulting company. We design, build and operate custom software, cloud-native platforms, AI-enabled systems and blockchain infrastructure for startups, growth companies and enterprises.',
    href: '/about',
    linkLabel: 'About the practice',
  },
  {
    keywords: ['blockchain', 'web3', 'crypto', 'ledger', 'smart contract', 'ethereum', 'solidity'],
    answer:
      'Blockchain and Web3 are a genuine specialisation, covering protocol and chain engineering, smart contract development and decentralised applications. We assess first whether a distributed ledger is warranted at all — it solves shared state between parties who do not trust each other, and where that is not the problem we will say a database is the better answer.',
    href: '/services#blockchain',
    linkLabel: 'Blockchain services',
  },
  {
    keywords: ['process', 'methodology', 'how do you work', 'phases', 'delivery'],
    answer:
      'Delivery runs in six phases — Discovery, Architecture, Build, Hardening, Release and Operate. Each ends in artefacts rather than a status update: architecture decision records, test suites, pipelines, runbooks and dashboards.',
    href: '/about',
    linkLabel: 'How we work',
  },
  {
    keywords: ['own', 'ownership', 'ip', 'source code', 'intellectual property', 'lock in'],
    answer:
      'You own everything produced: source code, infrastructure definitions, pipelines and documentation, held in your repositories and cloud accounts from the start. There is no proprietary runtime and no dependency on us to make the next change.',
  },
  {
    keywords: ['contact', 'get in touch', 'email', 'talk', 'call', 'reach'],
    answer:
      'The contact form is the fastest route — describe the problem, the constraints and the deadline, and an engineer replies directly.',
    href: '/contact',
    linkLabel: 'Start a project',
  },
  {
    keywords: ['career', 'careers', 'job', 'jobs', 'hiring', 'role', 'roles', 'vacancy', 'apply', 'work for'],
    answer:
      openRoles.length > 0
        ? `There are ${openRoles.length} role${openRoles.length === 1 ? '' : 's'} open. The careers page lists each one along with the five-stage hiring process.`
        : 'No vacancies are published at the moment — we would rather show nothing than list a role we are not actively hiring for. Speculative applications are read, and the careers page sets out the disciplines we recruit into and the hiring process.',
    href: '/careers',
    linkLabel: 'Careers',
  },
  {
    keywords: ['case study', 'case studies', 'work', 'portfolio', 'examples', 'clients', 'projects'],
    answer:
      'The work section describes six representative engagement patterns — the problem, the sequence of decisions and the resulting architecture. To be clear: these illustrate how we approach recurring problems and are not client case studies; they carry no client names and no performance claims.',
    href: '/case-studies',
    linkLabel: 'Selected work',
  },
  {
    keywords: ['technology', 'stack', 'tech', 'languages', 'framework', 'frameworks', 'tools'],
    answer:
      'We work across TypeScript, Python, Go, Rust, Solidity, Java, Kotlin and Swift, with React and React Native on the front end, Node.js and .NET on the back end, PostgreSQL and Kafka for data, and AWS, Azure, Google Cloud, Kubernetes and Terraform for infrastructure. The stack is chosen per project against its constraints rather than from a house standard.',
    href: '/services',
    linkLabel: 'All services',
  },
];

/** Questions the assistant asks to qualify an enquiry before recommending anything. */
export const qualifyingQuestions = [
  'What is the system meant to do, in one or two sentences?',
  'Is this a new build, or changing something that already exists?',
  'Are there fixed constraints — an existing stack, a compliance requirement, a deadline?',
  'Roughly what scale are you expecting, in users or transactions?',
];

/**
 * Pricing is never answered with a number. The correct behaviour is to
 * understand the requirement first and then explain what pricing depends on.
 */
export const pricingResponse =
  'Pricing depends on scope, duration and the shape of team a project needs, so there is no rate card I can quote from — and I will not guess at a figure. What I can do is help scope the problem: tell me what the system needs to do, whether it is a new build or a change to something existing, and any fixed constraints. Engagements normally start with a fixed-price discovery phase that produces the architecture and a costed delivery plan, which you are free to take elsewhere.';

export const fallbackResponse =
  'I do not have that in what I know about Big Block Technologies, and I would rather say so than guess. An engineer can answer it directly through the contact form. In the meantime I can explain our services, solutions, industries, delivery process or how engagements start.';

export const greetingResponse =
  'I am Nexa, the assistant for Big Block Technologies. I can explain what we build, which service or solution fits a problem, how engagements work, and what happens after you get in touch. What are you working on?';
