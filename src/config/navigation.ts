/**
 * Information architecture.
 *
 * The primary bar carries five destinations plus one call to action. Every
 * page in the site is reachable from it — About, Careers and Insights sit
 * under "Company", Contact is the call to action — which keeps an enterprise
 * site of this depth navigable without a crowded top level.
 */

export interface NavLink {
  label: string;
  href: string;
  /** Short qualifier shown in mega-menu and mobile rows. */
  description?: string;
}

export interface NavGroup {
  label: string;
  /** Landing page for the group itself. */
  href: string;
  /** Present when the item opens a panel rather than navigating directly. */
  children?: NavLink[];
  /** Columns of links, used by the Services mega menu. */
  columns?: { title: string; links: NavLink[] }[];
  /** Link shown at the foot of the panel. */
  panelFooter?: NavLink;
}

export const primaryNav: NavGroup[] = [
  {
    label: 'Services',
    href: '/services',
    columns: [
      {
        title: 'Build',
        links: [
          {
            label: 'Custom Software Development',
            href: '/services#custom-software',
            description: 'Systems built to a specific operating model',
          },
          {
            label: 'Web Application Development',
            href: '/services#web-applications',
            description: 'Product-grade web platforms',
          },
          {
            label: 'Mobile Development',
            href: '/services#mobile',
            description: 'iOS and Android from one codebase',
          },
          {
            label: 'Enterprise Applications',
            href: '/services#enterprise',
            description: 'Internal systems and integrations',
          },
        ],
      },
      {
        title: 'Run',
        links: [
          {
            label: 'Cloud Engineering',
            href: '/services#cloud',
            description: 'Architecture, migration, cost control',
          },
          {
            label: 'DevOps & Platform',
            href: '/services#devops',
            description: 'Pipelines, IaC, observability',
          },
          {
            label: 'UI/UX Engineering',
            href: '/services#ui-ux',
            description: 'Design systems that ship as code',
          },
          {
            label: 'Technology Consulting',
            href: '/services#consulting',
            description: 'Architecture and delivery review',
          },
        ],
      },
      {
        title: 'Specialised',
        links: [
          {
            label: 'Blockchain Development',
            href: '/services#blockchain',
            description: 'Protocol, chain and node work',
          },
          {
            label: 'Smart Contracts',
            href: '/services#smart-contracts',
            description: 'Written, reviewed and tested',
          },
          {
            label: 'Web3 Applications',
            href: '/services#web3-apps',
            description: 'Wallets, dApps, on-chain data',
          },
          {
            label: 'AI Solutions',
            href: '/services#ai',
            description: 'Retrieval, automation, evaluation',
          },
        ],
      },
    ],
    panelFooter: {
      label: 'View all services',
      href: '/services',
    },
  },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Case Studies', href: '/case-studies' },
  {
    label: 'Company',
    href: '/about',
    children: [
      { label: 'About', href: '/about', description: 'How we work and why' },
      { label: 'Careers', href: '/careers', description: 'Engineering culture and open roles' },
      { label: 'Insights', href: '/blog', description: 'Notes from the engineering team' },
      { label: 'Contact', href: '/contact', description: 'Start a conversation' },
    ],
  },
];

export const primaryCta: NavLink = {
  label: 'Start a Project',
  href: '/contact',
};

/** Flat list used by the mobile drawer, which shows every destination. */
export const mobileNav: { section: string; links: NavLink[] }[] = [
  {
    section: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Industries', href: '/industries' },
      { label: 'Case Studies', href: '/case-studies' },
    ],
  },
  {
    section: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Insights', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: 'Services',
    links: [
      { label: 'Custom Software', href: '/services#custom-software' },
      { label: 'Web Applications', href: '/services#web-applications' },
      { label: 'Mobile Development', href: '/services#mobile' },
      { label: 'Cloud & DevOps', href: '/services#cloud' },
      { label: 'Blockchain & Web3', href: '/services#blockchain' },
      { label: 'AI Solutions', href: '/services#ai' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Solutions', href: '/solutions' },
      { label: 'Industries', href: '/industries' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Insights', href: '/blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];
