import type { Faq, ProcessPhase } from '@/types/content';

/**
 * Delivery methodology, stated as phases with concrete artefacts.
 * Each phase names what a client actually receives at the end of it.
 */
export const processPhases: ProcessPhase[] = [
  {
    index: '01',
    name: 'Discovery',
    description:
      'We establish what the system has to do and what it must not do. That includes the constraints nobody writes down: existing integrations, compliance obligations, and the parts of the process people work around.',
    artefacts: ['Requirements and constraints', 'Domain model', 'Risk register', 'Estimate range'],
  },
  {
    index: '02',
    name: 'Architecture',
    description:
      'Decisions that are expensive to reverse get made deliberately and written down — data model, service boundaries, tenancy, security posture and the trade-offs behind each choice.',
    artefacts: [
      'Architecture decision records',
      'Data and integration design',
      'Threat model',
      'Delivery plan',
    ],
  },
  {
    index: '03',
    name: 'Build',
    description:
      'Implementation in short increments against a working pipeline. Code review, automated tests and continuous integration apply from the first commit rather than being retrofitted before launch.',
    artefacts: [
      'Working software each increment',
      'Automated test suite',
      'CI pipeline',
      'Environment as code',
    ],
  },
  {
    index: '04',
    name: 'Hardening',
    description:
      'Behaviour under failure is verified before release: load, dependency outages, data recovery and — for contract work — adversarial conditions against known vulnerability classes.',
    artefacts: [
      'Load and failure test results',
      'Security review findings',
      'Observability and alerting',
      'Runbooks',
    ],
  },
  {
    index: '05',
    name: 'Release',
    description:
      'Deployment is rehearsed rather than attempted. Rollout is incremental where the architecture allows it, and rollback is a tested procedure, not a hope.',
    artefacts: [
      'Rehearsed deployment procedure',
      'Rollback plan',
      'Release health monitoring',
      'Support handover',
    ],
  },
  {
    index: '06',
    name: 'Operate',
    description:
      'After release the work is measurement and iteration — watching real usage, closing gaps, and transferring enough knowledge that the client’s team can take ownership when they choose to.',
    artefacts: [
      'Operational dashboards',
      'Incident review process',
      'Documentation and knowledge transfer',
      'Iteration backlog',
    ],
  },
];

/**
 * Differentiators expressed as verifiable practices rather than claims about
 * scale, awards or client counts, none of which can be substantiated here.
 */
export const principles = [
  {
    title: 'Decisions are written down',
    body: 'Every architectural choice ships with the reasoning and the alternatives considered. When a constraint changes two years later, the record explains why the system is shaped the way it is.',
  },
  {
    title: 'Tests before hardening',
    body: 'Automated coverage is written alongside the feature, not added before launch. Contract work additionally carries invariant and fork tests, because deployed on-chain code cannot be patched.',
  },
  {
    title: 'You own the output',
    body: 'Source, infrastructure definitions, pipelines and documentation belong to the client. No proprietary runtime, no lock-in, and no dependency on us to make the next change.',
  },
  {
    title: 'Blockchain only where it earns its place',
    body: 'We assess whether a distributed ledger solves a problem a database cannot. Where it does not, we say so — which is a shorter conversation than an unnecessary migration.',
  },
  {
    title: 'Accessibility is not a phase',
    body: 'Contrast, keyboard operation, focus behaviour and semantics are handled at component level. Retrofitting them across a finished interface costs several times as much.',
  },
  {
    title: 'Operable on day one',
    body: 'Monitoring, alerting and runbooks are part of the delivery, not a follow-up project. A system nobody can observe is a system nobody can support.',
  },
];

export const generalFaqs: Faq[] = [
  {
    question: 'How do engagements usually start?',
    answer:
      'With a short discovery conversation about the problem, the constraints and the deadline. If the fit is right we propose a scoped discovery phase with a fixed price, which produces the architecture and a costed delivery plan. You are free to take that plan elsewhere.',
  },
  {
    question: 'How is pricing determined?',
    answer:
      'Pricing depends on scope, duration and the team shape a project needs, so we do not publish rate cards or estimates before understanding requirements. After discovery you receive a written estimate with the assumptions it rests on.',
  },
  {
    question: 'Do you work with existing engineering teams?',
    answer:
      'Yes. Engagements range from embedding engineers alongside an in-house team to delivering a system end to end. Where we work alongside your team, code review and knowledge transfer are part of the arrangement rather than an afterthought.',
  },
  {
    question: 'Who owns the code and infrastructure?',
    answer:
      'You do. Source, infrastructure definitions, pipelines and documentation are yours, held in your repositories and your cloud accounts from the beginning of the engagement.',
  },
  {
    question: 'Do you only build blockchain systems?',
    answer:
      'No. Distributed ledger work is a genuine specialisation, but most engagements are conventional software, cloud and platform engineering. We assess whether a ledger is warranted before recommending one.',
  },
  {
    question: 'What happens after a system goes live?',
    answer:
      'That is agreed before release. Options range from a defined support period, through ongoing iteration, to a structured handover to your team. In every case you receive runbooks, dashboards and documentation.',
  },
];
