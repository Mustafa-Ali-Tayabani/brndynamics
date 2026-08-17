import type { VisualKind } from '../ui/visual/visual';

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

export interface CaseStudy {
  slug: string;
  visual: VisualKind;
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
    relatedCases: ['public-safety-travel-app'],
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
    relatedCases: ['insurance-data-platform'],
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
    relatedCases: ['logistics-erp-consolidation'],
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
    relatedCases: ['insurance-data-platform'],
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
    relatedCases: ['public-safety-travel-app'],
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
    relatedCases: ['logistics-erp-consolidation'],
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
    relatedCases: ['healthcare-platform'],
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
    slug: 'insurance-data-platform',
    visual: 'signal',
    client: 'Insurance Provider',
    sector: 'Finance & FinTech',
    discipline: 'AI & business automation',
    title: 'Analytics platform rebuild cuts $750k a month in running cost',
    summary:
      'A legacy analytics estate was billing on capacity nobody had reviewed in four years. We re-architected the storage tiers, rebuilt the ingest pipeline and added automated classification to the claims workflow.',
    metric: { value: '$750k', label: 'Monthly run-rate removed' },
    stack: ['Python', 'Terraform', 'PostgreSQL', 'Airflow'],
    year: '2024',
    region: 'Europe',
    duration: '7 months',
    teamSize: '6 specialists',
    challenge: [
      'The analytics platform had been lifted to the cloud four years earlier and never revisited. Capacity renewed automatically, storage was uniform regardless of access pattern, and the nightly batch ran on always-on infrastructure that sat idle nineteen hours a day.',
      'Nobody could attribute cost to a business unit, so no business unit felt responsible for it. Finance had escalated three times and been told each time that reducing spend risked the overnight close.',
      'The constraint that mattered: the regulatory close had to complete before 06:00 every business day, and had never missed.',
    ],
    approach: [
      {
        title: 'Measure before changing anything',
        body: 'Six weeks of tagging and cost attribution first, so every recommendation carried a number and an owner. This also surfaced two entire environments nobody was using.',
      },
      {
        title: 'Tier the storage',
        body: 'Access-pattern analysis showed 71% of the warehouse had not been read in ninety days. Lifecycle policies moved it to cold storage with no change to the queries that mattered.',
      },
      {
        title: 'Rebuild the pipeline',
        body: 'The nightly job was made interruption tolerant and moved to elastic capacity with a guaranteed fallback, preserving the 06:00 deadline while removing most of the compute cost.',
      },
      {
        title: 'Automate the claims triage',
        body: 'A classification model now routes inbound claims documents, with a human reviewing anything below the confidence threshold. It removed roughly two days of manual sorting per week.',
      },
    ],
    results: [
      { value: '$750k', label: 'Monthly run-rate removed' },
      { value: '71%', label: 'Warehouse moved to cold storage' },
      { value: '0', label: 'Missed regulatory closes' },
      { value: '5.2 mo', label: 'Payback on the engagement' },
    ],
    quote: {
      text: 'They spent the first six weeks measuring instead of cutting, which is why nothing broke when they started cutting.',
      name: 'Head of Platform Engineering',
      role: 'Insurance Provider',
    },
  },
  {
    slug: 'logistics-erp-consolidation',
    visual: 'sand',
    client: 'Restaurant Product Supplier',
    sector: 'Logistics & Supply Chain',
    discipline: 'CRM & ERP solutions',
    title: 'Four systems consolidated into one, and throughput tripled',
    summary:
      'A distribution business had bought good software and deployed it badly. We re-mapped the order-to-delivery flow, consolidated four overlapping systems and retrained the floor on the one that survived.',
    metric: { value: '3.4x', label: 'Order throughput per head' },
    stack: ['Odoo', 'Node.js', 'PostgreSQL', 'REST APIs'],
    year: '2024',
    region: 'Europe and Gulf',
    duration: '5 months',
    teamSize: '4 specialists',
    challenge: [
      'Four systems had been bought over six years, each to solve a problem the previous one created. Orders were re-keyed between three of them, and the fourth existed because one depot refused to use the others.',
      'The warehouse floor had built a parallel process on paper and spreadsheets, which was faster than the software and invisible to management reporting.',
      'The stated goal was to buy a fifth system. The audit found the problem was implementation and process, not capability.',
    ],
    approach: [
      {
        title: 'Follow the order, not the org chart',
        body: 'We walked the full order-to-delivery path on site, including the paper process. Mapping what people actually did surfaced eleven re-keying steps nobody had counted.',
      },
      {
        title: 'Consolidate to one system of record',
        body: 'One of the four covered eighty per cent of the need. We extended it to cover the rest rather than buying a fifth, and retired the other three on a staged timetable.',
      },
      {
        title: 'Automate the joins',
        body: 'Remaining handoffs were automated so data moves without a human retyping it, removing both the delay and the transcription errors.',
      },
      {
        title: 'Train on the floor',
        body: 'Training ran on shift, on the floor, with the people doing the work, including the depot that had resisted.',
      },
    ],
    results: [
      { value: '3.4x', label: 'Order throughput per head' },
      { value: '11', label: 'Re-keying steps removed' },
      { value: '3', label: 'Systems retired' },
      { value: '$0', label: 'Spent on new licences' },
    ],
    quote: {
      text: 'We asked them to help us choose a new system. They told us we did not need one, and then proved it.',
      name: 'Daniel Legrante',
      role: 'CIO, Restaurant Product Supplier',
    },
  },
  {
    slug: 'public-safety-travel-app',
    visual: 'dusk',
    client: 'Public Safety Authority',
    sector: 'Enterprise Operations',
    discipline: 'Product design and mobile development',
    title: 'AI-supported public safety travel app for London',
    summary:
      'A move from a static information portal to a live mobile application, with routing that responds to incident feeds and an accessibility standard that had to pass public-sector procurement.',
    metric: { value: '210k', label: 'First-year installs' },
    stack: ['React Native', 'Node.js', 'PostgreSQL', 'Figma'],
    year: '2025',
    region: 'United Kingdom',
    duration: '9 months',
    teamSize: '7 specialists',
    challenge: [
      'The existing service was a web portal updated by hand. During an incident, the information people most needed was the information least likely to be current.',
      'Procurement required WCAG 2.2 AA compliance, a full accessibility statement and an independent audit before launch. Retrofitting that after the build was not an option.',
      'Incident feeds arrive in inconsistent formats from multiple authorities, and the routing had to degrade sensibly when a feed goes quiet rather than silently serving stale advice.',
    ],
    approach: [
      {
        title: 'Accessibility as a build gate',
        body: 'Automated accessibility checks in CI from the first sprint, plus testing with screen reader users at three points during the build. The independent audit found no blocking issues.',
      },
      {
        title: 'Design tested before build',
        body: 'Interactive prototypes were tested with real commuters, including during simulated incidents. Two flows were redesigned before a line of production code was written.',
      },
      {
        title: 'Normalise the feeds',
        body: 'An ingestion layer reconciles inconsistent incident formats and tracks feed freshness, so the app can tell the user when advice may be stale.',
      },
      {
        title: 'Launch in stages',
        body: 'A limited borough rollout for six weeks before city-wide launch, which caught two routing edge cases no test environment had produced.',
      },
    ],
    results: [
      { value: '210k', label: 'First-year installs' },
      { value: 'AA', label: 'WCAG 2.2, independently audited' },
      { value: '4.6', label: 'Average store rating' },
      { value: '0', label: 'Blocking audit findings' },
    ],
  },
  {
    slug: 'healthcare-platform',
    visual: 'tide',
    client: 'Healthcare Organisation',
    sector: 'Healthcare',
    discipline: 'SaaS product development',
    title: 'A clinical platform that carried a full remote transition',
    summary:
      'A platform delivered weeks before it was needed. When the workforce moved home, clinical and administrative staff kept working against the same systems with no interruption to service.',
    metric: { value: '0', label: 'Hours of service lost' },
    stack: ['.NET', 'React', 'SQL Server', 'Azure'],
    year: '2023',
    region: 'Europe',
    duration: '4 months, then ongoing',
    teamSize: '5 specialists',
    challenge: [
      'Clinical staff worked from fixed workstations against systems that assumed the building. Remote access existed for a handful of administrators and would not have survived the whole organisation attempting it.',
      'Patient data constraints meant the answer could not involve local copies. Whatever replaced the workstation had to keep data inside the managed environment.',
      'The timetable was set by circumstance rather than by us. It had to work the first time, because there was no second window.',
    ],
    approach: [
      {
        title: 'Keep the data where it belongs',
        body: 'The platform was designed so data never leaves the managed environment, which resolved the residency constraint and the hardware supply problem at once.',
      },
      {
        title: 'Identity and access first',
        body: 'Conditional access, MFA and device compliance were in place before a single user was migrated. Doing this afterwards would have meant a second disruption.',
      },
      {
        title: 'Migrate by department',
        body: 'Department by department in order of clinical criticality, least critical first, so the pattern was proven before it touched patient-facing work.',
      },
      {
        title: 'Stay on after launch',
        body: 'We moved onto a support retainer rather than handing back a platform nobody internally had operated before.',
      },
    ],
    results: [
      { value: '0', label: 'Hours of service lost' },
      { value: '100%', label: 'Staff transitioned in 4 weeks' },
      { value: '0', label: 'Data residency exceptions' },
      { value: '6 yrs', label: 'Client relationship, ongoing' },
    ],
    quote: {
      text: 'BrnDynamics implemented such a powerful platform that we had no break in service when our employees had to work from home during the pandemic.',
      name: 'Amanda Parks',
      role: 'Network Manager, Healthcare Organisation',
    },
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
    caseSlug: 'public-safety-travel-app',
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
