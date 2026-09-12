import type { VisualKind } from '../ui/visual/visual';
import type { AvatarFeatures } from '../ui/avatar/avatar';

/**
 * Single source of truth for site content.
 *
 * Editing copy should never mean editing a template. Everything the site says
 * lives here as typed constants.
 *
 * House style: no em dashes anywhere in user-facing copy. Use a comma, a
 * colon, a full stop, or rewrite the sentence.
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  label: string;
  path: string;
}

export interface Office {
  id: string;
  city: string;
  country: string;
  countryCode: string;
  role: string;
  line1: string;
  timezone: string;
  utcOffset: number;
  phone?: string;
  phoneHref?: string;
  note: string;
}

export interface Client {
  name: string;
  svg?: { viewBox: string; d: string };
  sector: string;
}

export interface CapabilityStep {
  title: string;
  body: string;
}

export interface Capability {
  id: string;
  index: string;
  visual: VisualKind;
  title: string;
  summary: string;
  detail: string;
  deliverables: string[];
  problem: string;
  approach: CapabilityStep[];
  outcomes: string[];
  faq: { q: string; a: string }[];
  engagement: string;
  startsAt: string;
  relatedCases: string[];
}

export interface Industry {
  name: string;
  note: string;
}

export interface CaseStudyImage {
  /** Path under public/, e.g. '/work/rpa/hero.webp'. */
  src: string;
  /** Variant for the dark canvas, when the artwork is fixed-colour raster. */
  srcDark?: string;
  alt: string;
  /** 'wide' spans the full column; 'square' sits in the half-width grid. */
  shape?: 'wide' | 'square';
}

export interface CaseStudy {
  slug: string;
  /** Capability this engagement belongs to, for the route back into services. */
  capability: string;
  /** Fallback artwork used wherever no image has been supplied. */
  visual: VisualKind;
  /** Logo of the product itself, shown above the title. */
  logo?: CaseStudyImage;
  /** Lead image for the card and the detail hero. */
  hero?: CaseStudyImage;
  /** Additional imagery shown through the case study body. */
  gallery?: CaseStudyImage[];
  client: string;
  sector: string;
  discipline: string;
  title: string;
  summary: string;
  metric: { value: string; label: string };
  stack: string[];
  year: string;
  region: string;
  duration: string;
  teamSize: string;
  challenge: string[];
  approach: CapabilityStep[];
  results: { value: string; label: string }[];
  quote?: { text: string; name: string; role: string };
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  org: string;
}

export interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  note: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  body: string;
}

export interface Differentiator {
  index: string;
  title: string;
  body: string;
}

export interface PricingModel {
  id: string;
  name: string;
  body: string;
  bestFor: string;
}

/* -------------------------------------------------------------------------- */
/* Company                                                                     */
/* -------------------------------------------------------------------------- */

export const OFFICES: Office[] = [
  {
    id: 'karachi',
    city: 'Karachi',
    country: 'Pakistan',
    countryCode: 'PK',
    role: 'Head office',
    line1: 'Karachi, Pakistan',
    timezone: 'PKT',
    utcOffset: 5,
    phone: '+92 324 923 5848',
    phoneHref: '+923249235848',
    note: 'Serving startups, SMEs and enterprise organisations with innovative digital solutions and technology consulting.',
  },
  {
    id: 'riyadh',
    city: 'Riyadh',
    country: 'Kingdom of Saudi Arabia',
    countryCode: 'SA',
    role: 'Gulf operations',
    line1: 'Riyadh, Saudi Arabia',
    timezone: 'AST',
    utcOffset: 3,
    note: 'Supporting organisations with digital transformation initiatives, enterprise solutions and business process automation.',
  },
  {
    id: 'geneva',
    city: 'Geneva',
    country: 'Switzerland',
    countryCode: 'CH',
    role: 'European operations',
    line1: 'Geneva, Switzerland',
    timezone: 'CET',
    utcOffset: 1,
    note: 'Providing product design, software engineering and technology consulting for European and international clients.',
  },
];

export const COMPANY = {
  name: 'BrnDynamics',
  legalName: 'BrnDynamics',
  tagline: 'Your partner for digital innovation and business growth',
  positioning: 'We build digital products that drive results.',
  founded: '2019',
  email: 'hello@brndynamics.com',
  careersEmail: 'jobs@brndynamics.com',
  phone: '+92 324 923 5848',
  phoneHref: '+923249235848',
  hq: OFFICES[0],
  ratings: [
    { source: 'Clutch', value: '5.0', note: '31 reviews' },
    { source: 'Google', value: '4.9', note: 'verified' },
  ],
  socials: [
    { label: 'LinkedIn', short: 'LI', url: 'https://www.linkedin.com/company/brndynamics' },
    { label: 'GitHub', short: 'GH', url: 'https://github.com/brndynamics' },
    { label: 'X', short: 'X', url: 'https://x.com/brndynamics' },
    { label: 'YouTube', short: 'YT', url: 'https://www.youtube.com/@brndynamics' },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const NAV: NavLink[] = [
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/work' },
  { label: 'Estimate', path: '/estimate' },
  { label: 'Company', path: '/company' },
  { label: 'Contact', path: '/contact' },
];

/* -------------------------------------------------------------------------- */
/* Hero status readout                                                         */
/* -------------------------------------------------------------------------- */

export const HERO_READOUT = [
  { key: 'Founded', value: '2019' },
  { key: 'Team', value: '20+ specialists' },
  { key: 'Offices', value: 'PK · KSA · CH' },
  { key: 'Status', value: 'Accepting work' },
] as const;

/* -------------------------------------------------------------------------- */
/* Stats                                                                       */
/* -------------------------------------------------------------------------- */

export const STATS: Stat[] = [
  {
    value: 6,
    suffix: '+',
    label: 'Years of experience',
    note: 'Turning ideas into digital products since 2019',
  },
  {
    value: 20,
    suffix: '+',
    label: 'Skilled professionals',
    note: 'Designers, engineers, QA and strategists',
  },
  {
    value: 80,
    suffix: '+',
    label: 'Projects delivered',
    note: 'Across nine industries and three regions',
  },
  {
    value: 3,
    suffix: '',
    label: 'Global offices',
    note: 'Karachi, Riyadh and Geneva',
  },
];

/* -------------------------------------------------------------------------- */
/* Capabilities                                                                */
/* -------------------------------------------------------------------------- */

export const CAPABILITIES: Capability[] = [
  {
    id: 'product-design',
    index: '01',
    visual: 'dusk',
    title: 'Product Design & UI/UX',
    summary:
      'Intuitive, user-centred digital experiences built on research, not on taste.',
    detail:
      'We create user-centred products through research, wireframing, prototyping, usability testing and modern interface design. Everything we hand over is a system your engineers can build from rather than a set of pictures they have to interpret.',
    deliverables: [
      'User research and journey mapping',
      'Wireframes and interactive prototypes',
      'Design system and component library',
      'Usability testing and iteration',
    ],
    problem:
      'The designs look beautiful in Figma and fall apart in build. Nobody agreed what a button does at 320px, the brand exists as one logo file and a hex code, and every new screen restarts the argument from scratch.',
    approach: [
      {
        title: 'Research before drawing',
        body: 'Who uses this, what they are trying to finish, and where the current product loses them. Analytics plus a handful of real sessions beat a workshop full of assumptions.',
      },
      {
        title: 'Design the system, not the screens',
        body: 'Type scale, spacing rhythm, colour tokens and states first. Screens then assemble from decided parts instead of each one inventing its own spacing.',
      },
      {
        title: 'Prototype and test',
        body: 'Interactive prototypes put in front of real users before engineering starts. Fixing a flow in Figma costs a day; fixing it in production costs a sprint.',
      },
      {
        title: 'Hand over something buildable',
        body: 'Tokens, components, states and edge cases documented, plus the brand guidelines that keep it coherent once your team is running it.',
      },
    ],
    outcomes: [
      'A design system your developers build from directly',
      'Accessibility and reflow decided at design time',
      'Fewer build surprises, because flows were tested first',
      'One visual language across product, site and collateral',
    ],
    faq: [
      {
        q: 'Can you work with our existing brand?',
        a: 'Usually yes. We audit what you have and tell you honestly whether it needs extending or replacing. Extending is cheaper and more common than agencies admit.',
      },
      {
        q: 'Do you do design without the build?',
        a: 'Yes. UI/UX design is one of our standard engagement models, and plenty of clients take the design system to their own engineering team.',
      },
    ],
    engagement: 'Fixed-scope project or embedded designer',
    startsAt: 'from $5,500',
    relatedCases: ['gym-club-management', 'ai-waiter-smart-dining'],
  },
  {
    id: 'saas-development',
    index: '02',
    visual: 'signal',
    title: 'SaaS Product Development',
    summary:
      'Scalable multi-tenant platforms that streamline operations and automate workflows.',
    detail:
      'We design and build SaaS platforms from first release to scale: tenancy, billing, roles, onboarding and the operational tooling you need once real customers are using it. Built to grow without a rewrite.',
    deliverables: [
      'Product discovery and technical spec',
      'Multi-tenant architecture and roles',
      'Subscription billing and onboarding',
      'Admin tooling and analytics',
    ],
    problem:
      'The MVP proved the idea and now cannot carry the customers it attracted. Tenancy was bolted on, billing is manual, onboarding needs a founder on a call, and every new enterprise deal asks for something the architecture cannot do.',
    approach: [
      {
        title: 'Decide the tenancy model early',
        body: 'Shared, isolated or hybrid, chosen against your compliance obligations and pricing model. This is the decision that is most expensive to change later.',
      },
      {
        title: 'Build the boring parts properly',
        body: 'Auth, roles, billing, audit trails and onboarding. These are what enterprise buyers actually diligence, and they are what founders usually defer.',
      },
      {
        title: 'Ship in fortnightly increments',
        body: 'Every two weeks something real is deployed and reviewable. No six-month silence followed by a reveal.',
      },
      {
        title: 'Instrument for growth',
        body: 'Product analytics, error tracking and usage metering, so pricing and roadmap decisions come from data rather than intuition.',
      },
    ],
    outcomes: [
      'An architecture that survives your next ten customers',
      'Self-serve onboarding instead of founder-led setup',
      'Billing and entitlements that run without manual work',
      'Usage data that informs pricing and roadmap',
    ],
    faq: [
      {
        q: 'Can you take over an existing SaaS product?',
        a: 'Often. We audit the codebase first and tell you honestly whether it is cheaper to inherit it or rebuild the parts that are holding you back.',
      },
      {
        q: 'Do you help with the MVP stage?',
        a: 'Yes. MVP development is a defined engagement: a narrow, genuinely usable first release scoped to prove one thing.',
      },
    ],
    engagement: 'Fixed-fee discovery, then project or dedicated team',
    startsAt: 'from $14,000',
    relatedCases: ['gym-club-management', 'qapipeline-stlc-management'],
  },
  {
    id: 'crm-erp',
    index: '03',
    visual: 'sand',
    title: 'CRM & ERP Solutions',
    summary:
      'Custom systems shaped to how your business actually runs, not the other way round.',
    detail:
      'We build and tailor CRM and ERP systems so organisations can manage customers, operations, resources and performance in one place. Where an off-the-shelf platform fits, we implement it properly rather than selling you a rebuild.',
    deliverables: [
      'Process mapping and requirements',
      'Custom CRM or ERP build',
      'Platform implementation and migration',
      'Integrations and reporting',
    ],
    problem:
      'Several systems were bought over several years, each to solve a problem the last one created. Data is re-keyed between them, the floor has built a parallel process on spreadsheets, and management reporting describes none of it.',
    approach: [
      {
        title: 'Follow the process, not the org chart',
        body: 'We walk the real path a customer or an order takes, including the paper and spreadsheet steps. Mapping what people actually do surfaces the re-keying nobody has counted.',
      },
      {
        title: 'Consolidate before you buy',
        body: 'More often than not one existing system covers most of the need. Extending it beats buying a fifth platform, and we will say so even though the build is smaller.',
      },
      {
        title: 'Automate the joins',
        body: 'Remaining handoffs are automated so data moves without a human retyping it, which removes both the delay and the transcription errors.',
      },
      {
        title: 'Train on the floor',
        body: 'Training runs on shift with the people doing the work. Adoption problems are rarely solved in a classroom.',
      },
    ],
    outcomes: [
      'One system of record instead of four partial ones',
      'Manual re-keying removed from the daily process',
      'Reporting that reflects what is really happening',
      'Adoption that survives the first difficult week',
    ],
    faq: [
      {
        q: 'Custom build or off-the-shelf platform?',
        a: 'Whichever fits. We implement Odoo, Salesforce, Dynamics and similar where they suit, and build custom where your process is genuinely your competitive advantage.',
      },
      {
        q: 'Can you integrate with what we already run?',
        a: 'Yes. Integration is usually the larger half of the work, and we scope it explicitly rather than discovering it mid-project.',
      },
    ],
    engagement: 'Fixed-scope project, optional ongoing support',
    startsAt: 'from $12,000',
    relatedCases: ['gym-club-management', 'estimate-property-case-management'],
  },
  {
    id: 'ai-automation',
    index: '04',
    visual: 'moss',
    title: 'AI & Business Automation',
    summary:
      'Applied AI and workflow automation that removes manual work, not just headlines.',
    detail:
      'We use artificial intelligence, workflow automation and process optimisation to increase efficiency and unlock growth. We start from the process that is costing you time, not from the model that is trending.',
    deliverables: [
      'Automation opportunity assessment',
      'Workflow and process automation',
      'AI features and model integration',
      'Document and data extraction',
    ],
    problem:
      'There is pressure to "do something with AI" and no agreement on what problem it solves. Meanwhile a team of people spends its week copying data between systems, which is unglamorous and entirely automatable.',
    approach: [
      {
        title: 'Find the expensive process',
        body: 'We measure where hours actually go before proposing anything. The best automation candidates are usually dull, high volume and invisible to management.',
      },
      {
        title: 'Automate the deterministic part first',
        body: 'Much of what gets pitched as AI is a workflow problem. Solving that first is cheaper, more reliable, and makes the genuinely AI-shaped remainder obvious.',
      },
      {
        title: 'Apply models where they earn it',
        body: 'Classification, extraction, summarisation and assisted search, evaluated against a real accuracy bar with a human in the loop where the cost of error is high.',
      },
      {
        title: 'Measure the saving',
        body: 'Hours returned, error rates, throughput. If the numbers do not move we say so rather than reporting adoption metrics.',
      },
    ],
    outcomes: [
      'Manual data movement removed from the working week',
      'AI applied where it measurably beats the status quo',
      'A human in the loop wherever errors are costly',
      'A saving you can put in front of finance',
    ],
    faq: [
      {
        q: 'Do we need our own model?',
        a: 'Almost never. Hosted models plus your own data and evaluation set covers the overwhelming majority of business cases at a fraction of the cost.',
      },
      {
        q: 'What about our data privacy?',
        a: 'We design for it from the start: what leaves your estate, what is retained, and which providers meet your residency obligations.',
      },
    ],
    engagement: 'Assessment, then project or retainer',
    startsAt: 'from $6,500 (assessment)',
    relatedCases: ['ai-waiter-smart-dining', 'rpa-finance-automation'],
  },
  {
    id: 'web-mobile',
    index: '05',
    visual: 'tide',
    title: 'Web & Mobile Development',
    summary:
      'High-performance applications built for scalability, security and long-term maintenance.',
    detail:
      'We build web and mobile applications using modern technologies, with performance, accessibility and search treated as build requirements rather than a phase-two ticket that never gets picked up.',
    deliverables: [
      'Web applications and marketing sites',
      'iOS, Android and cross-platform apps',
      'Ecommerce build and migration',
      'Performance, accessibility and SEO',
    ],
    problem:
      'The site looks fine on the designer’s laptop and loads in six seconds on a phone. It is invisible to search, unusable with a keyboard, and the CMS is frightening enough that nobody updates it.',
    approach: [
      {
        title: 'Positioning first',
        body: 'What the product has to make a visitor believe, and what it has to make them do. Structure and copy are decided before visual design, because design cannot rescue an unclear proposition.',
      },
      {
        title: 'Build to a budget',
        body: 'Performance and accessibility budgets set at the start and enforced in CI. A regression fails the build rather than shipping and being discovered in an audit.',
      },
      {
        title: 'Test on real devices',
        body: 'Mid-range phones on mobile data, not just a laptop on office wifi. That is where most of your users actually are.',
      },
      {
        title: 'Hand over the keys',
        body: 'A content model your team can edit, plus analytics that answer questions rather than producing dashboards nobody opens.',
      },
    ],
    outcomes: [
      'Fast on a mid-range phone over mobile data',
      'WCAG 2.2 AA as a build requirement, verified in CI',
      'Technical SEO foundations in place from launch',
      'A CMS your marketing team is not afraid of',
    ],
    faq: [
      {
        q: 'Native or cross-platform?',
        a: 'Cross-platform for most business applications, native where the product depends on platform capability or sustained graphics performance. We will explain the trade-off in your case.',
      },
      {
        q: 'Can you take over an existing app?',
        a: 'Often. We audit first and tell you honestly whether it is cheaper to inherit it or replace it.',
      },
    ],
    engagement: 'Fixed-scope project',
    startsAt: 'from $7,500',
    relatedCases: ['fixify-wordpress-care', 'ai-waiter-smart-dining'],
  },
  {
    id: 'software-engineering',
    index: '06',
    visual: 'ember',
    title: 'Software Engineering',
    summary:
      'Custom software, MVPs and integrations built by a team that will still be here to maintain them.',
    detail:
      'Discovery through to production in short, reviewable increments against a real environment. You get documentation and CI your own developers can pick up, because the goal is a system you own rather than a dependency on us.',
    deliverables: [
      'Product discovery and technical spec',
      'MVP and custom software development',
      'Systems integration and APIs',
      'CI/CD, testing and handover docs',
    ],
    problem:
      'The last agency delivered something that worked in the demo and nowhere else. There are no tests, no documentation, the deployment lives in one person’s head, and every change costs more than the last one.',
    approach: [
      {
        title: 'Discovery',
        body: 'A fixed-fee phase producing a technical specification, architecture, delivery plan and a real number. You own the output whether or not we build it.',
      },
      {
        title: 'Build in increments',
        body: 'Two-week increments, each deployed to a real environment and reviewable by you.',
      },
      {
        title: 'Test and instrument',
        body: 'Automated tests on the paths that matter, plus logging and error tracking, so the first time something breaks in production you can see why.',
      },
      {
        title: 'Hand over properly',
        body: 'Runbooks, architecture notes, CI pipelines and a walkthrough with your team. If you never call us again, the system still runs.',
      },
    ],
    outcomes: [
      'A specification and a real number before you commit',
      'Working software you can review every two weeks',
      'Tests and observability on the paths that matter',
      'Documentation that makes your team independent of us',
    ],
    faq: [
      {
        q: 'Fixed price or time and materials?',
        a: 'Discovery is fixed. The build is fixed-scope where requirements are stable and rate-based where genuine discovery is still happening. We will tell you which applies and why.',
      },
      {
        q: 'Who owns the code?',
        a: 'You do, from the first commit. Repositories sit in your organisation, not ours.',
      },
    ],
    engagement: 'Fixed-fee discovery, then project or dedicated team',
    startsAt: 'from $3,500 (discovery)',
    relatedCases: ['qapipeline-stlc-management', 'rpa-finance-automation'],
  },
  {
    id: 'security-compliance',
    index: '07',
    visual: 'ember',
    title: 'Security & Compliance',
    summary:
      'Testing, hardening and compliance work that holds up to an actual audit.',
    detail:
      'Security testing, penetration testing and compliance services across your applications and infrastructure. Every control maps to a framework you can show a regulator, and findings come with remediation rather than a PDF.',
    deliverables: [
      'Security assessment and hardening',
      'Penetration testing',
      'Compliance services and evidence packs',
      'Secure development practices',
    ],
    problem:
      'The last penetration test produced a PDF and no remediation. Alerts fire into a channel nobody reads, and if you were breached on a Saturday it is not clear who would notice or who would be called.',
    approach: [
      {
        title: 'Assess against a real framework',
        body: 'Technical assessment across application, identity, endpoint and cloud, mapped to whichever framework applies to you: ISO 27001, SOC 2, HIPAA, PCI DSS or NCA ECC for Saudi clients.',
      },
      {
        title: 'Prioritise by exploitability',
        body: 'A ranked remediation plan ordered by what is actually reachable and what would hurt most, not by raw CVSS score.',
      },
      {
        title: 'Fix what we find',
        body: 'Unlike a pure testing firm we can remediate. If you would rather keep testing independent from remediation, we will say so and work alongside your tester.',
      },
      {
        title: 'Rehearse the response',
        body: 'Tabletop and live incident exercises. A plan nobody has run is a document, not a capability.',
      },
    ],
    outcomes: [
      'A remediation plan ranked by real exploitability',
      'Controls mapped to your framework with the evidence pack',
      'Secure practices built into the development process',
      'An incident response plan the team has practised',
    ],
    faq: [
      {
        q: 'Can you help us reach ISO 27001 or SOC 2?',
        a: 'We produce the technical controls and the evidence alongside the implementation. You will still need an accredited auditor for certification itself.',
      },
      {
        q: 'Do you test applications you built?',
        a: 'We can, but for anything high stakes we recommend an independent tester. We will help you brief one.',
      },
    ],
    engagement: 'Assessment, then project or retainer',
    startsAt: 'from $6,500',
    relatedCases: ['fixify-wordpress-care', 'qapipeline-stlc-management'],
  },
];

/* -------------------------------------------------------------------------- */
/* How we collaborate                                                          */
/* -------------------------------------------------------------------------- */

export const WHY_INTRO = {
  heading: 'We turn ideas into scalable digital success.',
  body: [
    'Success is measured by the real value we create for our clients. We combine strategic thinking, user-centred design, advanced technology and industry expertise to deliver solutions that solve business challenges and drive measurable growth.',
    'Whether it is building a SaaS platform, developing AI-powered solutions, designing exceptional user experiences or modernising enterprise systems, our team focuses on creating products that are scalable, efficient and future-ready.',
  ],
  cta: { label: 'Discover our success stories', path: '/work' },
} as const;

export const DIFFERENTIATORS: Differentiator[] = [
  {
    index: '01',
    title: 'Business first, measured in outcomes',
    body: 'Every engagement starts with the commercial problem, not the technology. We agree what success looks like in numbers before we agree what to build.',
  },
  {
    index: '02',
    title: 'Depth across AI, SaaS, CRM, ERP, web and mobile',
    body: 'One team covering product design through to enterprise systems, so the parts fit together instead of being stitched across three vendors.',
  },
  {
    index: '03',
    title: 'A dedicated team, not a rotating queue',
    body: 'Designers, developers, QA specialists and consultants who stay with your product. The people who scope the work are the people who build it.',
  },
  {
    index: '04',
    title: 'Agile delivery and transparent communication',
    body: 'Fortnightly increments you can review, regular reporting, and clear stakeholder communication. You always know where the work stands without asking.',
  },
  {
    index: '05',
    title: 'Architectures built for long-term growth',
    body: 'Scalable by design, documented on handover, and free of proprietary glue. We build for the day you take it in-house.',
  },
  {
    index: '06',
    title: 'User experience and product strategy at the centre',
    body: 'Research, testing and a design system underpin the build, so what ships is what users can actually complete.',
  },
  {
    index: '07',
    title: 'Quality assurance at every stage',
    body: 'Automated tests, code review and QA specialists on the team rather than a bolt-on phase at the end.',
  },
];

/* How we collaborate, used on the company page. */
export const COLLABORATION = [
  {
    index: '01',
    title: 'Flexible engagement models',
    body: 'End-to-end product development, dedicated teams, UI/UX design services, technology consulting, staff augmentation, and AI and automation consulting. We shape the engagement around the problem rather than selling one shape of contract.',
  },
  {
    index: '02',
    title: 'Seamless integration',
    body: 'Rapid onboarding into your existing workflows, alignment with your objectives and standards, agile methodologies, and efficient collaboration across global time zones.',
  },
  {
    index: '03',
    title: 'Communication and ownership',
    body: 'Proactive project management, regular progress updates, clear stakeholder communication, a quality-focused delivery approach and a long-term partnership mindset.',
  },
];

/* -------------------------------------------------------------------------- */
/* Engagement + pricing models                                                 */
/* -------------------------------------------------------------------------- */

export const ENGAGEMENT_MODELS: string[] = [
  'End-to-end product development',
  'Dedicated design and development teams',
  'UI/UX design services',
  'Technology consulting',
  'Staff augmentation',
  'AI and automation consulting',
];

export const PRICING_MODELS: PricingModel[] = [
  {
    id: 'fixed',
    name: 'Fixed price',
    body: 'A single agreed number against a defined scope, with change handled through a written variation rather than a surprise on the invoice.',
    bestFor: 'Clearly defined requirements, timelines and deliverables',
  },
  {
    id: 'time-material',
    name: 'Time & material',
    body: 'Billed against actual effort at a published rate, with a cap you set and visibility on burn every fortnight.',
    bestFor: 'Evolving products and consulting engagements',
  },
  {
    id: 'retainer',
    name: 'Monthly retainer',
    body: 'A fixed monthly allocation of design and engineering capacity for continuous improvement, support and optimisation.',
    bestFor: 'Ongoing design, development and maintenance',
  },
  {
    id: 'dedicated',
    name: 'Dedicated team',
    body: 'A named team of designers, developers, QA specialists and a project manager, working only on your product and scaling as you need.',
    bestFor: 'Organisations needing sustained, scalable capacity',
  },
];

/* -------------------------------------------------------------------------- */
/* Engagement flow                                                             */
/* -------------------------------------------------------------------------- */

export interface FlowStageData {
  index: string;
  title: string;
  body: string;
  outputs: string[];
  after?: string;
  gate?: boolean;
}

export const ENGAGEMENT_FLOW: FlowStageData[] = [
  {
    index: '01',
    title: 'Discover',
    body: 'We map the problem, the users and the commercial pressure behind them before proposing anything.',
    outputs: ['Requirements map', 'User and process research', 'Fixed-fee quote'],
  },
  {
    index: '02',
    title: 'Design',
    body: 'Architecture, interface design and a sequenced delivery plan with trade-offs written down.',
    outputs: ['Technical specification', 'Prototypes', 'Definition of done'],
    after: '1 to 2 weeks',
  },
  {
    index: '03',
    title: 'Go / no-go',
    body: 'You approve the scope and the number, or you keep the specification and walk. No pressure either way.',
    outputs: ['Signed scope', 'Named delivery team', 'Sprint plan'],
    after: 'Your call',
    gate: true,
  },
  {
    index: '04',
    title: 'Build',
    body: 'Two-week increments against a real environment, each one deployed and reviewable by you.',
    outputs: ['Fortnightly releases', 'Automated tests', 'Progress reporting'],
    after: '2-week cycles',
  },
  {
    index: '05',
    title: 'Support',
    body: 'Maintenance, optimisation and iteration under a retainer, or a clean handover to your own team.',
    outputs: ['Monitoring and support', 'Monthly review', 'Handover pack'],
    after: 'Ongoing',
  },
];

/* -------------------------------------------------------------------------- */
/* Process (compact version used on inner pages)                               */
/* -------------------------------------------------------------------------- */

export const PROCESS: ProcessStep[] = [
  {
    index: '01',
    title: 'Discover',
    body: 'A structured review of the problem, the users and the constraints. You keep the findings whether or not you engage us.',
  },
  {
    index: '02',
    title: 'Design',
    body: 'A sequenced plan with costs, dependencies and trade-offs written down. We agree the definition of done before anyone opens an editor.',
  },
  {
    index: '03',
    title: 'Build',
    body: 'Short increments against a real environment. Nothing reaches production that has not been tested first.',
  },
  {
    index: '04',
    title: 'Support',
    body: 'Maintenance and optimisation under an agreed retainer, or a clean handover with the documentation to make it stick.',
  },
];

/* -------------------------------------------------------------------------- */
/* Industries                                                                  */
/* -------------------------------------------------------------------------- */

export const INDUSTRIES: Industry[] = [
  { name: 'Healthcare', note: 'Patient data, clinical workflow, compliance' },
  { name: 'Real Estate', note: 'Listings, CRM, transaction management' },
  { name: 'SaaS & Technology', note: 'Multi-tenant platforms and scale' },
  { name: 'E-Commerce', note: 'Storefronts, checkout, fulfilment' },
  { name: 'Logistics & Supply Chain', note: 'Fleet, warehouse and order systems' },
  { name: 'Education', note: 'Learning platforms and student systems' },
  { name: 'Finance & FinTech', note: 'Audit-ready controls, data residency' },
  { name: 'Enterprise Operations', note: 'ERP, reporting and process automation' },
  { name: 'Professional Services', note: 'Practice management and client portals' },
];

/* -------------------------------------------------------------------------- */
/* Case studies                                                                */
/* -------------------------------------------------------------------------- */

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'gym-club-management',
    capability: 'crm-erp',
    visual: 'tide',
    logo: {
      src: '/work/gym/logo.png',
      srcDark: '/work/gym/logo-dark.png',
      alt: 'Gym Club',
    },
    hero: {
      src: '/work/gym/hero.webp',
      alt: 'Gym Club dashboard showing active members, check-ins, reservations and revenue, with a client profile open on a laptop',
      shape: 'wide',
    },
    gallery: [
      {
        src: '/work/gym/overview.webp',
        alt: 'The ten modules the platform connects, from reception and memberships through lockers, access control and point of sale',
        shape: 'square',
      },
    ],
    client: 'Fitness & Wellness Clubs',
    sector: 'Fitness & Wellness',
    discipline: 'CRM & ERP platforms',
    title: 'Gym & Club Management Platform',
    summary:
      'An end-to-end management platform built for modern fitness and wellness clubs. From client onboarding, memberships and reservations to lockers, access control, POS, inventory and AI-powered client assistance, the system connects the entire club operation within one centralized experience.',
    metric: { value: '10', label: 'Operational modules in a single system' },
    stack: [
      'Memberships',
      'Reservations',
      'Reception',
      'Lockers',
      'Access Control',
      'POS',
      'Inventory',
      'Services',
      'AI Assistant',
    ],
    year: '2026',
    region: 'Single and multi-site clubs',
    duration: 'Ongoing build',
    teamSize: 'Product pod',
    challenge: [
      'Clubs run on more systems than they should. Reception works in one tool, memberships in another, bookings in a third, and lockers, access and payments often sit outside all of them.',
      'When those systems do not share a record, the front desk cannot answer a simple question without opening four screens. Membership status does not reach the door. A locker is assigned in one place and billed in another. Staff spend their attention on reconciling tools rather than on the member standing in front of them.',
      'The brief was one operational system for the whole club, from the first check-in through long-term engagement, with every module reading from the same member record.',
    ],
    approach: [
      {
        title: 'Reception management',
        body: 'Front-desk teams get quick access to members, check-ins, bookings, payments, services and the daily operational actions, in one place rather than across several tools.',
      },
      {
        title: 'Client management',
        body: 'Complete client profiles hold membership information, activity, reservations, services, locker details and the notes that matter, so any member of staff can pick up where the last one left off.',
      },
      {
        title: 'Membership management',
        body: 'Plans, validity, renewals, remaining sessions, freezes, restrictions and status are managed together, so the commercial rules and the operational reality never drift apart.',
      },
      {
        title: 'Reservations and scheduling',
        body: 'Classes, facilities, trainers, appointments and other club resources are booked from one centralised calendar rather than a spreadsheet per resource.',
      },
      {
        title: 'Services management',
        body: 'Additional paid offerings such as personal training, massage, physiotherapy and wellness sessions are configured, sold and tracked alongside the membership they attach to.',
      },
      {
        title: 'Locker management',
        body: 'Lockers are assigned, availability and occupancy are tracked, and locker subscriptions are managed per member rather than on a board behind the desk.',
      },
      {
        title: 'Access control',
        body: 'Membership status is connected to club access, so eligibility at the door is a property of the record rather than a judgement call at reception.',
      },
      {
        title: 'Point of sale',
        body: 'Memberships, services, passes and products are sold directly from the system, which keeps the transaction attached to the member it belongs to.',
      },
      {
        title: 'Inventory management',
        body: 'Products, stock availability, internal movement and items sold through the club are tracked in the same place the sale happens.',
      },
      {
        title: 'Master data',
        body: 'Services, categories, resources, plans and system-level settings are configured centrally, so club teams manage operational data consistently instead of per module.',
      },
      {
        title: 'AI assistant',
        body: 'Staff can ask about client information, get recommendations and work through day-to-day decisions without leaving the screen they are already on.',
      },
      {
        title: 'AI working context',
        body: 'The assistant is given the relevant member context, so answers are grounded in that client\u2019s actual information and history rather than generic advice.',
      },
      {
        title: 'Client intake',
        body: 'Structured onboarding captures goals, lifestyle, activity and preferences before training or assessment, so the first session starts with something to work from.',
      },
    ],
    results: [
      { value: '10', label: 'Core modules in one system' },
      { value: '3', label: 'AI capabilities inside the workflow' },
      { value: '7', label: 'Club formats the platform supports' },
      { value: '1', label: 'Shared record per member' },
    ],
  },
  {
    slug: 'estimate-property-case-management',
    capability: 'crm-erp',
    visual: 'sand',
    logo: {
      src: '/work/rfq/logo.png',
      srcDark: '/work/rfq/logo-dark.png',
      alt: 'RFQ Management',
    },
    hero: {
      src: '/work/rfq/hero.webp',
      alt: 'RFQ Management dashboard showing new requests, quotes sent, active cases, recent requests and the upcoming site visit schedule',
      shape: 'wide',
    },
    gallery: [
      {
        src: '/work/rfq/overview.webp',
        alt: 'The modules the platform connects, from request and estimate management through scheduling, diagnostics, laboratories and permissions',
        shape: 'square',
      },
    ],
    client: 'Property & Building Services',
    sector: 'Property & Construction',
    discipline: 'CRM & ERP platforms',
    title: 'Estimate & Property Case Management Platform',
    summary:
      'An end-to-end platform for managing service requests, estimates, active cases, scheduling, emails, building data and property-related operations. Built for companies handling construction, repair, maintenance, inspections, diagnostics and resolution workflows in one centralized system.',
    metric: { value: '15', label: 'Modules connected from request to resolution' },
    stack: [
      'Requests',
      'Estimates',
      'Case Tracking',
      'Scheduling',
      'Building Data',
      'Emails',
      'Diagnostics',
      'Laboratories',
      'User Permissions',
    ],
    year: '2026',
    region: 'Property and building services',
    duration: 'Ongoing build',
    teamSize: 'Product pod',
    challenge: [
      'Property service work arrives as a request and ends as a finished job, but almost everything in between lives in spreadsheets, inboxes and tools that never speak to each other.',
      'A request comes in by email. The estimate is built somewhere else. The site visit is booked in a calendar nobody else reads. Lab results land in an attachment. By the time somebody asks what is happening with a case, the answer has to be reassembled by hand from four places, and the client is waiting while it happens.',
      'The brief was a single system that carries a request from the moment it lands through estimate, scheduling, execution and closure, with the building, the client and the money attached to it the whole way.',
    ],
    approach: [
      {
        title: 'Dashboard',
        body: 'Teams get a complete operational overview of incoming requests, active estimates, ongoing cases, schedules and overall business activity, so the state of the pipeline is a glance rather than an exercise.',
      },
      {
        title: 'Customer base',
        body: 'Client information, property history, communication records and every linked request or estimate sit on one record, so nobody starts a conversation without the context behind it.',
      },
      {
        title: 'Estimate management',
        body: 'Teams prepare, manage and track quotations for construction, repair, maintenance, inspection and related property services, with each one tied back to the request it answers.',
      },
      {
        title: 'Request management',
        body: 'Incoming service requests are captured and organised into a structured workflow for review and follow-up, rather than living as unread mail in a shared inbox.',
      },
      {
        title: 'Cases in progress',
        body: 'Ongoing property cases are monitored from initial request through execution, updates and closure, so the status of any job is a property of the record.',
      },
      {
        title: 'Calendar and scheduling',
        body: 'Appointments, site visits, inspections, technician scheduling and service timelines are managed together, which is what keeps field work and office work in step.',
      },
      {
        title: 'Email management',
        body: 'Email is centralised inside the system, so discussions, updates, confirmations and client correspondence stay attached to the case instead of scattering across personal mailboxes.',
      },
      {
        title: 'Building management',
        body: 'Building-related information is stored and organised per case or request, so the property itself is a first-class record rather than a line of free text.',
      },
      {
        title: 'Company and offices',
        body: 'Company structure, office-level configuration and operational entities are managed in one place, which is what makes multi-office working practical.',
      },
      {
        title: 'Financial parameters',
        body: 'Pricing logic, financial settings and estimate cost structures are configurable, so commercial rules are set once rather than reapplied per quote.',
      },
      {
        title: 'Services and benefits',
        body: 'The service catalogue defines what can be offered, priced and delivered, which keeps estimates and case handling drawing on the same definitions.',
      },
      {
        title: 'Types of diagnosis',
        body: 'Inspections, technical issues and diagnostic categories are classified consistently, so reporting across cases means something.',
      },
      {
        title: 'Laboratories',
        body: 'Workflows where samples, technical checks or lab-based evaluations form part of the service are supported directly, rather than handled on the side.',
      },
      {
        title: 'Users',
        body: 'Staff accounts and team access are managed within the platform, so onboarding somebody is a task rather than a project.',
      },
      {
        title: 'Permissions',
        body: 'Granular control over who can view, create, edit, approve or manage each part of the workflow, which is what lets approval actually mean something.',
      },
    ],
    results: [
      { value: '7', label: 'Core workflow modules' },
      { value: '6', label: 'Supporting data domains' },
      { value: '5', label: 'Request states tracked end to end' },
      { value: '2', label: 'Access and administration layers' },
    ],
  },
  {
    slug: 'ai-waiter-smart-dining',
    capability: 'ai-automation',
    visual: 'ember',
    logo: {
      src: '/work/aiwaiter/logo.png',
      srcDark: '/work/aiwaiter/logo-dark.png',
      alt: 'AI Waiter',
    },
    hero: {
      src: '/work/aiwaiter/hero.webp',
      alt: 'A guest ordering from the table through the AI waiter, with the assistant suggesting a dish from their taste profile while a waiter serves',
      shape: 'wide',
    },
    gallery: [
      {
        src: '/work/aiwaiter/overview.webp',
        alt: 'The assistant recalling a previous order, suggesting a dish and a wine pairing, and offering to take a spoken request',
        shape: 'square',
      },
    ],
    client: 'Restaurants & Hospitality',
    sector: 'Hospitality & Restaurants',
    discipline: 'AI & business automation',
    title: 'AI Waiter & Smart Restaurant Ordering',
    summary:
      'An intelligent restaurant platform that turns a table QR into a personal AI waiter. Guests discover dishes, get recommendations based on mood and preference, customise meals, order by text or voice, call for human help, pay and earn rewards, while the restaurant gains a connected view of preferences, orders, feedback and sales.',
    metric: { value: '22', label: 'Capabilities from QR scan to feedback' },
    stack: [
      'AI Recommendations',
      'QR Ordering',
      'Taste Profiles',
      'Voice Ordering',
      'Smart Menu',
      'Group Orders',
      'POS Integration',
      'Loyalty',
      'Payments',
      'Restaurant Intelligence',
    ],
    year: '2026',
    region: 'Restaurants and hospitality venues',
    duration: 'Ongoing build',
    teamSize: 'Product pod',
    challenge: [
      'A QR menu digitises the menu. It does not digitise the waiter.',
      'The guest scans, lands on a list of categories, and is left to do the work a waiter used to do for them. Nobody remembers that they were here three weeks ago, that they had the chicken, that they do not eat shellfish, or that tonight they want something lighter. The restaurant learns nothing from the visit either.',
      'The brief was to keep the convenience of a scan and put the judgement back in. A guest should be able to say \u201cI had chicken last time, today I want something different, a little spicy but not too heavy\u201d and get a real answer, built from their profile, their dietary needs, the budget they are working to and what the kitchen can actually make tonight.',
    ],
    approach: [
      {
        title: 'Instant QR entry',
        body: 'Guests scan the table code and start browsing or ordering straight away, with no app to download and no account to create first.',
      },
      {
        title: 'Customer recognition and guest mode',
        body: 'Returning guests are recognised by phone, email or username, while anyone who would rather stay anonymous can order without identifying themselves at all.',
      },
      {
        title: 'Personalised AI welcome',
        body: 'Returning guests are greeted by name, with their previous visits, orders and preferences already in hand rather than asked for again.',
      },
      {
        title: 'Mood and context aware dining',
        body: 'Recommendations adapt to mood, budget and occasion, because a solo lunch, a date and a family table are three different problems.',
      },
      {
        title: 'AI food recommendations',
        body: 'Dishes are suggested from taste preferences, visit history, dietary needs, budget and the context of the current meal, not from a list of what the kitchen wants to shift.',
      },
      {
        title: 'Natural language and voice ordering',
        body: 'Guests type or speak the way they would talk to a waiter, including requests as loose as something spicy, light and under a budget.',
      },
      {
        title: 'Smart interactive menu',
        body: 'Dishes, categories, ingredients, prices, availability and dietary information are explored conversationally rather than by tapping through a hierarchy.',
      },
      {
        title: 'Taste profile',
        body: 'Favourite dishes, spice levels, dislikes, exclusions, dietary preferences and previous choices are remembered, so each visit starts further along than the last.',
      },
      {
        title: 'Dietary and allergy intelligence',
        body: 'Recommendations are filtered for vegetarian, vegan, halal, allergies, intolerances and other restrictions, so the guest never has to check the menu twice.',
      },
      {
        title: 'Food customisation',
        body: 'Spice levels, toppings, sauces, sides, ingredients and exclusions are set before the order is placed rather than negotiated at the table.',
      },
      {
        title: 'Smart cart and AI upselling',
        body: 'The cart suggests drinks, sides, desserts, combos and add-ons that fit what has actually been chosen, which is what a good waiter does and a generic upsell does not.',
      },
      {
        title: 'Group ordering',
        body: 'Several people at the same table contribute to one shared order, so a group is a single kitchen ticket rather than a round of separate ones.',
      },
      {
        title: 'Order confirmation',
        body: 'Dishes, customisation, quantities, pricing and table information are shown clearly before anything is submitted.',
      },
      {
        title: 'POS and kitchen integration',
        body: 'Confirmed orders flow straight into restaurant operations, and the assistant stays aware of items that are sold out or unavailable.',
      },
      {
        title: 'Ask for help',
        body: 'A waiter, water, cutlery or the bill can be requested from the table without waving at anybody.',
      },
      {
        title: 'Human handoff',
        body: 'The guest can move from the assistant to a real waiter at any point, because the goal is better service rather than less staff.',
      },
      {
        title: 'Bill and payments',
        body: 'The bill is requested from the table, split between guests where needed, and settled through digital payment.',
      },
      {
        title: 'Loyalty and rewards',
        body: 'Points, rewards, repeat-customer benefits and relevant promotions surface at the moment they are worth something.',
      },
      {
        title: 'Personalised offers',
        body: 'Promotions are matched to the individual rather than shown identically to everybody who scans a table.',
      },
      {
        title: 'Multilingual AI',
        body: 'Guests talk to the restaurant in their own language, which matters more in hospitality than almost anywhere else.',
      },
      {
        title: 'Feedback intelligence',
        body: 'Quick post-meal ratings and comments are collected while the experience is fresh, and feed back into what the restaurant does next.',
      },
      {
        title: 'Restaurant dashboard',
        body: 'Management get visibility into customers, orders, popular dishes, feedback, preferences and sales, so the guest data is worth something operationally.',
      },
    ],
    results: [
      { value: '0', label: 'App downloads or logins needed' },
      { value: '3', label: 'Ways to order: tap, type or speak' },
      { value: '2', label: 'Service paths, AI or a human waiter' },
      { value: '22', label: 'Capabilities in one guest journey' },
    ],
  },
  {
    slug: 'qapipeline-stlc-management',
    capability: 'software-engineering',
    visual: 'moss',
    logo: {
      src: '/work/qapipeline/logo.png',
      srcDark: '/work/qapipeline/logo-dark.png',
      alt: 'QAPipeline',
    },
    hero: {
      src: '/work/qapipeline/hero.webp',
      alt: 'QAPipeline dashboard showing total runs, average pass rate, failures and active projects, with pass rate trend, test distribution and region and device health',
      shape: 'wide',
    },
    gallery: [
      {
        src: '/work/qapipeline/overview.webp',
        alt: 'The path from scattered documents and spreadsheets to generated test cases, an automated pipeline, results and quality insights',
        shape: 'square',
      },
    ],
    client: 'QA & Engineering Teams',
    sector: 'Software & Quality Engineering',
    discipline: 'Quality engineering platforms',
    title: 'AI-Powered STLC & Test Management Platform',
    summary:
      'A centralized quality engineering platform for managing the complete Software Testing Life Cycle, from documentation and test case creation through automated execution, result tracking, visualization and AI-assisted testing. QA teams organize cases, run manual and automated tests, analyse results on interactive dashboards and use AI to generate scenarios and close coverage gaps, all behind secure authentication and role-based access.',
    metric: { value: '17', label: 'Capabilities across the testing lifecycle' },
    stack: [
      'Test Management',
      'AI Test Generation',
      'Automated Testing',
      'Test Runs',
      'Documentation',
      'Analytics',
      'RBAC',
      'Quality Insights',
    ],
    year: '2026',
    region: 'QA and engineering teams',
    duration: 'Ongoing build',
    teamSize: 'Product pod',
    challenge: [
      'QA runs on spreadsheets far more often than anyone puts in a process document.',
      'Test cases live in a document somebody last opened two sprints ago. Results are pasted into a chat thread. Bug reports sit in a third tool with no link back to the case that found them. Ask which areas are actually covered and the honest answer is that nobody can say without an afternoon of reading.',
      'The brief was one workspace that holds the whole testing lifecycle, where a requirement, the cases written from it, the runs that executed them and the failures they produced are the same thread rather than four separate records.',
    ],
    approach: [
      {
        title: 'Test documentation',
        body: 'Testing documents, plans, scenarios, cases, expected results and supporting information are managed centrally, so the plan and the tests written from it stay in the same place.',
      },
      {
        title: 'Test case management',
        body: 'Manual and automated cases are created, organised, updated, prioritised and maintained together rather than split across tools by execution method.',
      },
      {
        title: 'AI test case generation',
        body: 'Test cases, scenarios, edge cases and expected outcomes are generated from a requirement or feature description, which removes most of the blank-page work.',
      },
      {
        title: 'Automated test runs',
        body: 'Automated suites are executed through the platform with execution status tracked as it happens, so nobody has to go and ask the pipeline.',
      },
      {
        title: 'Manual test execution',
        body: 'Testers are guided through cases while pass, fail, blocked, skipped and other states are recorded, so a manual run leaves the same trail an automated one does.',
      },
      {
        title: 'Test suites and cycles',
        body: 'Cases are grouped into suites, releases, sprints, modules or testing cycles, which is what makes a release scope something you can point at.',
      },
      {
        title: 'Execution history',
        body: 'Every previous run, result, failure and piece of execution activity is kept, so regressions are visible as a pattern rather than a surprise.',
      },
      {
        title: 'Visual test analytics',
        body: 'Testing data becomes dashboards, pass and fail trends, execution progress and quality insights, which is the difference between having data and being able to act on it.',
      },
      {
        title: 'Failure analysis',
        body: 'Failed cases, recurring issues and the areas that need attention surface directly, rather than being reconstructed from a list of red rows.',
      },
      {
        title: 'AI testing assistant',
        body: 'Teams use AI to generate scenarios, improve existing cases, find missing coverage and understand why something failed.',
      },
      {
        title: 'Reusable test cases',
        body: 'Reusable components and scenarios cut the repetitive documentation work that makes QA writing feel like copying.',
      },
      {
        title: 'Search and filtering',
        body: 'Cases, suites, runs, modules, statuses and documentation are found quickly, which matters more as the case count grows past what anyone can hold in their head.',
      },
      {
        title: 'User management',
        body: 'QA engineers, developers, managers and administrators are managed centrally, so access follows the team rather than trailing behind it.',
      },
      {
        title: 'Role-based access control',
        body: 'Permissions are defined by role and responsibility, so what somebody can change is a property of their job rather than of who set them up.',
      },
      {
        title: 'Secure authentication',
        body: 'Access to testing projects and information is controlled and authenticated, which is table stakes once the test data describes a real product.',
      },
      {
        title: 'Project-level access',
        body: 'Teams and users are scoped to specific testing projects and environments, so a shared platform does not mean a shared blast radius.',
      },
      {
        title: 'Activity and accountability',
        body: 'Testing activity and the actions taken across the platform stay visible, which is what makes a result something you can stand behind in a release meeting.',
      },
    ],
    results: [
      { value: '12', label: 'Core testing and analytics modules' },
      { value: '5', label: 'Stages from requirement to expected result' },
      { value: '5', label: 'Access and accountability controls' },
      { value: '4', label: 'Execution states recorded per case' },
    ],
  },
  {
    slug: 'fixify-wordpress-care',
    capability: 'web-mobile',
    visual: 'dusk',
    logo: {
      src: '/work/fixify/logo.png',
      srcDark: '/work/fixify/logo-dark.png',
      alt: 'Fixify',
    },
    hero: {
      src: '/work/fixify/hero.webp',
      alt: 'Fixify dashboard showing website health, performance, accessibility, best practice and SEO scores, security checks and AI insights across managed sites',
      shape: 'wide',
    },
    gallery: [
      {
        src: '/work/fixify/overview.webp',
        alt: 'Website health, performance and security panels alongside the services covered: maintenance, security, speed, SEO, backups, monitoring and support',
        shape: 'square',
      },
    ],
    client: 'Businesses running WordPress',
    sector: 'Web & Managed Services',
    discipline: 'Managed web services',
    title: 'Fixify: WordPress Maintenance as a Service',
    summary:
      'A subscription WordPress care service covering maintenance, security, backups, performance, SEO, bug fixing, content updates and technical support. Fixify acts as the ongoing technical team for businesses that need their site fast, secure and reliable without hiring developers to keep it that way.',
    metric: { value: '19', label: 'Services covered by one subscription' },
    stack: [
      'Maintenance',
      'Security',
      'Speed Optimization',
      'SEO',
      'Backups',
      'Bug Fixing',
      'Updates',
      'Monitoring',
      'WooCommerce',
      'Technical Support',
    ],
    year: '2026',
    region: 'Businesses running WordPress',
    duration: 'Ongoing subscription service',
    teamSize: 'Managed service pod',
    challenge: [
      'A WordPress site is never finished, and most businesses run theirs as though it is.',
      'Plugins drift out of date. A theme update breaks a form nobody notices for a fortnight. The certificate expires on a Saturday. Each time, somebody goes looking for a developer who is free, explains the site from scratch, pays for an hour, and the site goes back to being unattended until the next thing breaks.',
      'Nothing in that pattern is monitoring uptime, watching for vulnerabilities, or making the site faster between emergencies. The proposition was to replace the scramble with a subscription: one team that already knows the site and is looking at it continuously.',
    ],
    approach: [
      {
        title: 'WordPress maintenance',
        body: 'Core, themes, plugins and overall site health are managed continuously rather than revisited when something has already gone wrong.',
      },
      {
        title: 'Plugin and theme updates',
        body: 'Components are kept current while compatibility risk is managed, which is the part that stops most owners updating in the first place.',
      },
      {
        title: 'Bug fixing',
        body: 'Broken pages, errors, layout problems, forms and unexpected behaviour are diagnosed and fixed as part of the subscription, not quoted per incident.',
      },
      {
        title: 'Security monitoring',
        body: 'Vulnerabilities, suspicious activity and potential threats are watched for continuously, so a compromise is caught early rather than reported by a customer.',
      },
      {
        title: 'Website backups',
        body: 'Regular backups are maintained so a site can actually be restored, which is the difference between a bad afternoon and a lost business.',
      },
      {
        title: 'Speed optimisation',
        body: 'Load times are improved through caching, image optimisation, database cleanup and code work, rather than a single audit that ages immediately.',
      },
      {
        title: 'Core Web Vitals',
        body: 'The metrics that shape both the visitor experience and search performance are tracked and worked on directly.',
      },
      {
        title: 'SEO optimisation',
        body: 'Technical and on-page SEO is improved so the site is easier for search engines to read and rank.',
      },
      {
        title: 'SEO health checks',
        body: 'Broken links, missing metadata, indexing problems and technical issues are found before they cost traffic.',
      },
      {
        title: 'Content updates',
        body: 'Text, images, pages, banners, products and general content changes are handled, so routine edits never wait on developer availability.',
      },
      {
        title: 'Uptime monitoring',
        body: 'Availability is tracked and downtime is responded to, which only works if somebody is watching when nobody is looking.',
      },
      {
        title: 'Database optimisation',
        body: 'WordPress databases are cleaned and optimised for performance and stability, which is where a slow site is often actually slow.',
      },
      {
        title: 'Responsive and UI fixes',
        body: 'Layout and usability problems are resolved across desktop, tablet and mobile, rather than only where the owner happens to look.',
      },
      {
        title: 'WooCommerce support',
        body: 'Stores, products, checkout, payment integrations and WooCommerce updates are maintained, because on a shop every broken hour is measurable.',
      },
      {
        title: 'Forms and integrations',
        body: 'Contact forms, APIs, analytics, tracking, email systems and third-party integrations are kept working, since these fail quietly more often than loudly.',
      },
      {
        title: 'Malware and recovery support',
        body: 'Compromised sites are cleaned up and restored, with the work covered rather than negotiated during the emergency.',
      },
      {
        title: 'Hosting and domain assistance',
        body: 'Migrations, DNS, SSL, hosting configuration and PHP upgrades are handled, which is the infrastructure work most site owners have no route to.',
      },
      {
        title: 'Regular website audits',
        body: 'Performance, security, SEO and overall health are reviewed on a cycle, so the picture stays current instead of being a snapshot from onboarding.',
      },
      {
        title: 'Technical support',
        body: 'A team that already knows the site is available when it needs attention, which is the whole reason the subscription exists.',
      },
    ],
    results: [
      { value: '1', label: 'Subscription, not a quote per task' },
      { value: '0', label: 'In-house developers needed' },
      { value: '2', label: 'Plan cycles, monthly or annual' },
      { value: '4', label: 'Areas audited continuously' },
    ],
  },
  {
    slug: 'rpa-finance-automation',
    capability: 'ai-automation',
    visual: 'signal',
    logo: { src: '/work/rpa/logo.png', srcDark: '/work/rpa/logo-dark.png', alt: 'RPA' },
    hero: {
      src: '/work/rpa/hero.webp',
      alt: 'RPA Automation Studio sign-in screen and operations dashboard',
      shape: 'wide',
    },
    gallery: [
      {
        src: '/work/rpa/workflow.webp',
        alt: 'Automation flow from email intake and OCR through branch mapping to per-branch payment status',
        shape: 'square',
      },
    ],
    client: 'Banking & Finance Operations',
    sector: 'Finance & FinTech',
    discipline: 'AI & business automation',
    title: 'RPA: Intelligent Finance Automation',
    summary:
      'From inbox to reconciliation, automated. A smart RPA platform that receives electricity bills by email, extracts the data with OCR, maps each bill to its branch, tracks payment status and supports reconciliation across large multi-branch operations.',
    metric: { value: '412h', label: 'Hours saved against the manual baseline' },
    stack: ['Email Automation', 'OCR', 'Reconciliation', 'Branch Mapping', 'Finance Workflows', 'Real-Time Dashboard'],
    year: '2026',
    region: 'Multi-branch banking',
    duration: 'In production, ongoing',
    teamSize: 'Automation pod',
    challenge: [
      'Finance teams in organisations running hundreds or thousands of branches spend a significant part of every month collecting bills, entering information by hand, chasing branches for missing documents, reconciling payments and maintaining MIS records.',
      'Bills arrive by email in inconsistent formats. Each one has to be opened, read, matched to the right branch or consumer, recorded, and then followed through to payment. Nothing about that work is difficult, and all of it is slow.',
      'The result is a fragmented process with no single view of what has been received, what is outstanding, what is due and where the exceptions are.',
    ],
    approach: [
      {
        title: 'Automated email reading',
        body: 'The platform monitors centralised inboxes and processes incoming bills and attachments automatically, with no one having to open a mailbox to start the workflow.',
      },
      {
        title: 'OCR and data extraction',
        body: 'Electricity bills are read and the key fields extracted: consumer details, account numbers, amounts, due dates and billing periods.',
      },
      {
        title: 'Branch mapping',
        body: 'Each bill is associated automatically with the relevant bank branch or consumer, which is the step that previously required a person who knew the estate.',
      },
      {
        title: 'Bill processing workflow',
        body: 'Bills are tracked through received, pending, paid, unpaid and reconciliation stages, so status is a property of the record rather than something held in an inbox.',
      },
      {
        title: 'Automated reconciliation',
        body: 'Payment records, bills and finance data are matched automatically, reducing the manual reconciliation effort at period close.',
      },
      {
        title: 'Centralised dashboard',
        body: 'Finance teams get visibility of received and pending bills, due dates, processed records, exceptions by type and automation performance in one place.',
      },
    ],
    results: [
      { value: '412h', label: 'Hours saved vs manual baseline' },
      { value: '89.6%', label: 'Automation success rate' },
      { value: '99.4%', label: 'Bot availability' },
      { value: '50', label: 'Bills processed this month' },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Success stories                                                             */
/* -------------------------------------------------------------------------- */

export interface SuccessStory {
  id: string;
  sector: string;
  region: string;
  visual: VisualKind;
  headline: string;
  problem: string;
  outcome: string;
  metric: { value: string; label: string };
  quote?: { text: string; name: string };
  caseSlug?: string;
}

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'mvp-in-ten-weeks',
    sector: 'SaaS & Technology',
    region: 'Europe',
    visual: 'signal',
    headline: 'From idea to paying customers in ten weeks',
    problem:
      'A founding team had a validated problem, a deadline set by an investor conversation, and no product. Two previous agencies had quoted six months for a full build.',
    outcome:
      'We scoped an MVP down to the single workflow that proved the thesis, designed and shipped it in ten weeks, and instrumented it so the next roadmap decision came from usage rather than opinion.',
    metric: { value: '10 wks', label: 'Idea to first paying customer' },
    quote: {
      text: 'They talked us out of half the features we asked for. That is why we shipped.',
      name: 'Co-founder and CEO',
    },
  },
  {
    id: 'automation-hours-back',
    sector: 'Professional Services',
    region: 'Gulf',
    visual: 'moss',
    headline: 'Nine hundred hours a year returned to the team',
    problem:
      'A services firm had six people spending part of every day moving data between a CRM, a finance system and a set of spreadsheets nobody trusted.',
    outcome:
      'We mapped where the hours actually went, automated the deterministic handoffs, and applied document extraction to the one step that genuinely needed it.',
    metric: { value: '900 hrs', label: 'Manual work removed per year' },
  },
  {
    id: 'design-system',
    sector: 'Real Estate',
    region: 'Gulf',
    visual: 'dusk',
    headline: 'One design system across four products',
    problem:
      'Four products built by three teams over five years looked like four companies. Every new screen restarted the argument about spacing, and nothing was reusable.',
    outcome:
      'We audited every interface, built one token-based design system with a documented component library, and migrated the products onto it one surface at a time.',
    metric: { value: '4x', label: 'Faster new screen delivery' },
    caseSlug: 'rpa-finance-automation',
  },
  {
    id: 'audit-pass',
    sector: 'Finance & FinTech',
    region: 'Europe',
    visual: 'ember',
    headline: 'ISO 27001 passed at the first attempt',
    problem:
      'A fintech had six weeks before an audit it had already deferred once. Controls existed in places, evidence existed almost nowhere.',
    outcome:
      'We mapped every control to a technical implementation, produced the evidence pack alongside the fixes, and sat in the audit itself.',
    metric: { value: '0', label: 'Major non-conformities' },
  },
];

/* -------------------------------------------------------------------------- */
/* Testimonials                                                                */
/* -------------------------------------------------------------------------- */

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'BrnDynamics implemented such a powerful platform that we had no break in service when our employees had to work from home during the pandemic.',
    name: 'Amanda Parks',
    role: 'Network Manager',
    org: 'Healthcare Organisation',
  },
  {
    quote:
      'BrnDynamics has been an outstanding partner. Their team is professional, knowledgeable and genuinely customer-service driven.',
    name: 'John Labkins',
    role: 'Partner & CEO',
    org: 'Telecommunications Company',
  },
  {
    quote:
      'I have been a customer for more than a decade. BrnDynamics is an example of the way technology partnership should be done.',
    name: 'Daniel Legrante',
    role: 'CIO',
    org: 'Restaurant Product Supplier',
  },
];

/* -------------------------------------------------------------------------- */
/* Toolchain                                                                   */
/* -------------------------------------------------------------------------- */

export interface ToolGroup {
  id: string;
  label: string;
  note: string;
  tools: string[];
}

export const TOOLCHAIN: ToolGroup[] = [
  {
    id: 'delivery',
    label: 'Delivery & collaboration',
    note: 'We work inside your tools, not ours. If your team lives in Jira, we live in Jira. You should never have to log into a portal to find out what we are doing.',
    tools: [
      'Jira', 'ClickUp', 'Slack', 'Teamwork', 'Notion', 'Confluence',
      'Asana', 'Trello', 'Linear', 'Monday.com', 'Microsoft Teams', 'Zoom',
      'GitHub', 'GitLab', 'Basecamp', 'Azure DevOps',
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    note: 'Chosen per engagement, never by habit. The stack that fits your ability to maintain it beats the stack that is fashionable this year.',
    tools: [
      'Angular', 'React', 'Vue.js', 'Next.js', 'Node.js', 'JavaScript',
      'TypeScript', '.NET', 'Java', 'Python', 'PHP', 'Golang', 'C++',
      'Laravel', 'React Native', 'Flutter', 'Swift', 'Kotlin',
      'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Docker',
      'Kubernetes', 'Terraform', 'Oracle', 'SAP', 'Odoo', 'Salesforce',
      'Shopify', 'WordPress',
    ],
  },
  {
    id: 'design',
    label: 'Design & brand',
    note: 'Design happens in the browser as often as in Figma. Static mockups hide exactly the problems that matter: reflow, load, touch targets, motion.',
    tools: ['Figma', 'Adobe CC', 'Sketch', 'Framer', 'Webflow', 'Storybook'],
  },
];

/* Platforms we build on. Vendor marks, not client logos. */
export const PARTNER_MARKS: string[] = [
  'Microsoft', 'Google Cloud', 'Oracle', 'SAP', 'Salesforce', 'Odoo',
  'Shopify', 'Cisco', 'VMware', 'Dell', 'Veeam', 'Lenovo',
];

export const PARTNERS: string[] = [
  'Microsoft', 'Google Cloud', 'Oracle', 'SAP', 'Salesforce', 'Odoo',
  'Shopify', 'WordPress', 'Cisco', 'VMware', 'Dell', 'Veeam',
  'Lenovo', 'Docker', 'Kubernetes', 'Terraform',
];

export const PLATFORM_GROUPS = [
  {
    label: 'Product & design',
    items: ['Figma', 'Sketch', 'Framer', 'Webflow', 'Storybook', 'Adobe CC'],
  },
  {
    label: 'Application',
    items: ['Angular', 'React', 'Vue.js', 'Next.js', 'Node.js', '.NET', 'Java', 'Python'],
  },
  {
    label: 'Data & platform',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Oracle', 'SQL Server'],
  },
  {
    label: 'Business systems',
    items: ['Odoo', 'Salesforce', 'SAP', 'Dynamics', 'Shopify', 'WordPress'],
  },
] as const;

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

export const FAQ = [
  {
    q: 'What does BrnDynamics actually do?',
    a: 'We are a technology company specialising in UI/UX design, software development, AI-powered solutions, SaaS products, CRM and ERP systems, and digital transformation. We help startups, SMEs and enterprises build scalable digital products.',
  },
  {
    q: 'Where are you based?',
    a: 'Our head office is in Karachi, Pakistan, with offices in Riyadh, Saudi Arabia and Geneva, Switzerland. That spread gives genuine overlap with European and Gulf working hours.',
  },
  {
    q: 'How do you price engagements?',
    a: 'Four models: fixed price for defined scope, time and material for evolving work, a monthly retainer for ongoing design and development, and a dedicated team for sustained capacity. The estimator on this site gives an indicative range in about two minutes.',
  },
  {
    q: 'Can you work alongside our in-house team?',
    a: 'Yes. Staff augmentation and dedicated team models are common. We onboard into your existing workflows and tools rather than asking you to adopt ours.',
  },
  {
    q: 'How big is the team?',
    a: 'More than twenty specialists: UI/UX designers, product strategists, software engineers, QA specialists, project managers and technology consultants.',
  },
  {
    q: 'Who owns the code and the designs?',
    a: 'You do, from the first commit. Repositories sit in your organisation and design files are yours. There is no proprietary layer that makes leaving us expensive.',
  },
];

/* -------------------------------------------------------------------------- */
/* Team                                                                        */
/* -------------------------------------------------------------------------- */

export interface TeamMember {
  /** Short role code shown on the avatar and used as a stable key. */
  code: string;
  /** Named by expertise, deliberately not by person. */
  title: string;
  focus: string;
  stack: string[];
  office: 'Karachi' | 'Riyadh' | 'Geneva';
  years: string;
  visual: VisualKind;
  /** Drawn character avatar. Ignored when `avatar` is set. */
  face: AvatarFeatures;
  /**
   * Optional portrait or Memoji sticker, e.g. '/team/design-lead.png'. Drop
   * files into public/team and set this; the image replaces the drawn avatar.
   */
  avatar?: string;
}

/**
 * The delivery team, identified by discipline rather than by name.
 *
 * Anonymity is deliberate: it keeps the page accurate as people move between
 * engagements, and it puts the emphasis on the capability you are buying. Real
 * names and photographs can be added later via `avatar` without restructuring.
 */
export const TEAM: TeamMember[] = [
  {
    code: 'PD',
    face: { skin: 1, hair: 'bun', hairColor: 0, beard: 'none', glasses: false, bg: 2 },
    title: 'Lead Product Designer',
    focus: 'Owns the design system and the interface language across every build.',
    stack: ['Figma', 'Design systems', 'Prototyping'],
    office: 'Karachi',
    years: '11 yrs',
    visual: 'dusk',
  },
  {
    code: 'UX',
    face: { skin: 0, hair: 'wave', hairColor: 2, beard: 'none', glasses: true, bg: 1 },
    title: 'Senior UX Researcher',
    focus: 'Runs discovery, usability testing and the accessibility standard we build to.',
    stack: ['Research', 'WCAG 2.2', 'Analytics'],
    office: 'Geneva',
    years: '9 yrs',
    visual: 'tide',
  },
  {
    code: 'PE',
    face: { skin: 2, hair: 'short', hairColor: 0, beard: 'full', glasses: true, bg: 0 },
    title: 'Principal Engineer, Platform',
    focus: 'Architecture, tenancy and the decisions that are expensive to change later.',
    stack: ['Node.js', 'PostgreSQL', 'Terraform'],
    office: 'Karachi',
    years: '14 yrs',
    visual: 'signal',
  },
  {
    code: 'FS',
    face: { skin: 1, hair: 'curls', hairColor: 0, beard: 'stubble', glasses: false, bg: 3 },
    title: 'Senior Full-stack Engineer',
    focus: 'Builds and ships the product surface, front end through to data layer.',
    stack: ['Angular', 'React', '.NET'],
    office: 'Karachi',
    years: '8 yrs',
    visual: 'signal',
  },
  {
    code: 'MB',
    face: { skin: 3, hair: 'buzz', hairColor: 0, beard: 'goatee', glasses: false, bg: 5 },
    title: 'Mobile Engineering Lead',
    focus: 'Native and cross-platform apps, release pipelines and store compliance.',
    stack: ['React Native', 'Swift', 'Kotlin'],
    office: 'Karachi',
    years: '10 yrs',
    visual: 'moss',
  },
  {
    code: 'AI',
    face: { skin: 2, hair: 'short', hairColor: 1, beard: 'stubble', glasses: true, bg: 5 },
    title: 'AI & Automation Engineer',
    focus: 'Applies models where they beat the status quo, and says so when they do not.',
    stack: ['Python', 'LLM integration', 'Workflow automation'],
    office: 'Riyadh',
    years: '7 yrs',
    visual: 'moss',
  },
  {
    code: 'ER',
    face: { skin: 1, hair: 'short', hairColor: 0, beard: 'full', glasses: false, bg: 4 },
    title: 'ERP & Integrations Specialist',
    focus: 'Maps the real process, then makes the systems match it rather than the reverse.',
    stack: ['Odoo', 'Salesforce', 'REST / APIs'],
    office: 'Riyadh',
    years: '12 yrs',
    visual: 'sand',
  },
  {
    code: 'QA',
    face: { skin: 0, hair: 'bun', hairColor: 1, beard: 'none', glasses: true, bg: 1 },
    title: 'QA Automation Lead',
    focus: 'Automated coverage on the paths that matter, enforced in the build.',
    stack: ['Playwright', 'CI pipelines', 'Load testing'],
    office: 'Karachi',
    years: '9 yrs',
    visual: 'tide',
  },
  {
    code: 'SC',
    face: { skin: 3, hair: 'buzz', hairColor: 0, beard: 'full', glasses: false, bg: 2 },
    title: 'Security Consultant',
    focus: 'Testing, hardening and the evidence pack your auditor will ask for.',
    stack: ['Pen testing', 'ISO 27001', 'NCA ECC'],
    office: 'Riyadh',
    years: '13 yrs',
    visual: 'ember',
  },
  {
    code: 'DM',
    face: { skin: 0, hair: 'wave', hairColor: 2, beard: 'none', glasses: false, bg: 0 },
    title: 'Delivery Manager',
    focus: 'Keeps the increments honest and the reporting readable by non-engineers.',
    stack: ['Agile delivery', 'Jira', 'Stakeholder reporting'],
    office: 'Geneva',
    years: '15 yrs',
    visual: 'dusk',
  },
];
