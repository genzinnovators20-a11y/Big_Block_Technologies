import type { Faq, JobRole } from '@/types/content';

/**
 * Open roles.
 *
 * Deliberately empty. Publishing invented vacancies — or invented salary
 * bands — would mislead applicants, so the careers page renders a designed
 * empty state and an open application route instead.
 *
 * The rendering path for populated roles is complete: add entries here, or
 * replace this module with a fetch against an ATS, and the listing, filters
 * and detail rows all work with no component changes.
 *
 * @example
 * export const openRoles: JobRole[] = [
 *   {
 *     slug: 'senior-platform-engineer',
 *     title: 'Senior Platform Engineer',
 *     discipline: 'Infrastructure',
 *     location: 'Remote',
 *     type: 'Full-time',
 *     summary: '…',
 *     responsibilities: ['…'],
 *     requirements: ['…'],
 *   },
 * ];
 */
export const openRoles: JobRole[] = [];

/** Disciplines we recruit into, shown so speculative applicants can self-select. */
export const disciplines = [
  'Software Engineering',
  'Cloud & Platform',
  'Blockchain & Smart Contracts',
  'Applied AI',
  'UI/UX Engineering',
  'Quality Engineering',
];

export const cultureValues = [
  {
    title: 'Engineers own decisions',
    body: 'The person writing the code makes the technical call and records the reasoning. Architecture is reviewed, not dictated from outside the team doing the work.',
  },
  {
    title: 'Depth over breadth',
    body: 'We would rather a team knew a small number of technologies thoroughly than listed twenty on a capability slide. Specialisation is supported and expected.',
  },
  {
    title: 'Review is a craft',
    body: 'Code review is treated as teaching rather than gatekeeping. Feedback explains the reasoning so the next piece of work does not need the same comment.',
  },
  {
    title: 'Sustainable delivery',
    body: 'Estimates include the testing and hardening the work actually requires. Sustained overtime is treated as a planning failure to fix, not a commitment to celebrate.',
  },
];

export const hiringSteps = [
  {
    index: '01',
    name: 'Application review',
    description:
      'A person reads every application. You receive a decision either way rather than silence.',
  },
  {
    index: '02',
    name: 'Introductory call',
    description:
      'A conversation about your experience, what you want to work on, and what the role actually involves day to day.',
  },
  {
    index: '03',
    name: 'Technical discussion',
    description:
      'A working session on a realistic problem in your discipline. No algorithm puzzles unrelated to the job, and no unpaid take-home project.',
  },
  {
    index: '04',
    name: 'Team conversation',
    description:
      'Time with the engineers you would work alongside, including space to ask them anything without a manager present.',
  },
  {
    index: '05',
    name: 'Offer',
    description:
      'A written offer with the terms and expectations set out in full, and time to consider it.',
  },
];

export const careerFaqs: Faq[] = [
  {
    question: 'There are no roles listed. Should I still get in touch?',
    answer:
      'Yes. We review speculative applications and keep strong ones on file. Tell us which discipline you work in and what you would like to build — that is more useful to us than a generic covering letter.',
  },
  {
    question: 'Do you hire remotely?',
    answer:
      'Working arrangements are set per role and stated in each listing. Where a role is remote or hybrid, the listing will say so along with any time-zone overlap required.',
  },
  {
    question: 'What is the interview process like?',
    answer:
      'Five stages, described in full above. The technical stage is a working discussion on a realistic problem rather than a whiteboard puzzle, and we do not ask for unpaid project work.',
  },
  {
    question: 'Do you take on junior engineers?',
    answer:
      'When a role is open to less experienced applicants the listing will say so explicitly, along with the mentoring structure attached to it.',
  },
];
