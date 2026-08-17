import type { VisualKind } from '../ui/visual/visual';

/**
 * Single source of truth for site content.
 *
 * Editing copy should never mean editing a template. Everything the site says
 * lives here as typed constants.
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
  /** Optional inline SVG mark. Falls back to a set wordmark when absent. */
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
  /** Which procedural scene represents this discipline. */
  visual: VisualKind;
  title: string;
  summary: string;
  detail: string;
  deliverables: string[];
  /* Detail-page content */
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
  /** Cover artwork for cards and the detail hero. */
  visual: VisualKind;
  client: string;
  sector: string;
  discipline: string;
  title: string;
  summary: string;
  metric: { value: string; label: string };
  stack: string[];
  year: string;
  /* Detail-page content */
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

/* -------------------------------------------------------------------------- */
/* Company                                                                     */
/* -------------------------------------------------------------------------- */

export const OFFICES: Office[] = [
  {
    id: 'karachi',
    city: 'Karachi',
    country: 'Pakistan',
    countryCode: 'PK',
    role: 'Engineering HQ',
    line1: 'Karachi, Sindh',
    timezone: 'PKT',
    utcOffset: 5,
    phone: '+92 324 923 5848',
    phoneHref: '+923249235848',
    note: 'Where the build and the service desk live. The majority of our engineers sit here.',
  },
  {
    id: 'geneva',
    city: 'Geneva',
    country: 'Switzerland',
    countryCode: 'CH',
    role: 'European operations',
    line1: 'Geneva',
    timezone: 'CET',
    utcOffset: 1,
    note: 'Contracting, data-protection and governance for European clients, in European hours.',
  },
  {
    id: 'riyadh',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    role: 'Gulf operations',
    line1: 'Riyadh',
    timezone: 'AST',
    utcOffset: 3,
    note: 'On-the-ground delivery for GCC clients, including data-residency and Vision 2030 programmes.',
  },
];

export const COMPANY = {
  name: 'BrnDynamics',
  legalName: 'BrnDynamics',
  tagline: 'Simplifying IT for a complex world',
  positioning: 'We handle the tech, so you can focus on growth.',
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
  { label: 'Solutions', path: '/solutions' },
  { label: 'Work', path: '/work' },
  { label: 'Estimate', path: '/estimate' },
  { label: 'Company', path: '/company' },
  { label: 'Contact', path: '/contact' },
];

/* -------------------------------------------------------------------------- */
/* Hero status readout                                                         */
/* -------------------------------------------------------------------------- */

export const HERO_READOUT = [
  { key: 'Response', value: '< 60 min' },
  { key: 'Coverage', value: '24 / 7 / 365' },
  { key: 'Offices', value: 'PK · CH · SA' },
  { key: 'Status', value: 'Accepting work' },
] as const;

/* -------------------------------------------------------------------------- */
/* Stats                                                                       */
/* -------------------------------------------------------------------------- */

export const STATS: Stat[] = [
  { value: 6, suffix: '', label: 'Years operating', note: 'Continuous delivery since 2019' },
  { value: 74, suffix: '', label: 'Projects shipped', note: 'Across three continents' },
  { value: 98, suffix: '%', label: 'Client retention', note: 'Rolling twelve months' },
  { value: 60, suffix: ' min', label: 'Mean response', note: 'First human reply, any hour' },
];

/* -------------------------------------------------------------------------- */
/* Clients                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Client wall. Each entry renders as a set wordmark; supply `svg` with a
 * viewBox + path to swap in a real logo without touching the component.
 */
export const CLIENTS: Client[] = [
  { name: 'Nespresso', sector: 'Retail & FMCG' },
  { name: 'Lenovo', sector: 'Technology' },
  { name: 'Hewlett Packard Enterprise', sector: 'Technology' },
  { name: 'Acronis', sector: 'Software' },
  { name: 'Microsoft', sector: 'Certified Partner' },
  { name: 'Cisco', sector: 'Networking' },
  { name: 'VMware', sector: 'Virtualisation' },
  { name: 'Veeam', sector: 'Continuity' },
  { name: 'Sophos', sector: 'Security' },
  { name: 'Dell Technologies', sector: 'Infrastructure' },
  { name: 'WatchGuard', sector: 'Security' },
  { name: 'Extreme Networks', sector: 'Networking' },
];

/* -------------------------------------------------------------------------- */
/* Capabilities                                                                */
/* -------------------------------------------------------------------------- */

export const CAPABILITIES: Capability[] = [
  {
    id: 'managed-services',
    index: '01',
    visual: 'tide',
    title: 'Managed Services',
    summary:
      'We take the pager. Monitoring, patching and escalation on your estate, under an SLA with teeth.',
    detail:
      'A named engineering pod owns your endpoints, servers, networks and identity. Faults are caught by monitoring before your users think to report them, and escalation reaches an engineer who already knows your environment rather than a queue that has to read the history first.',
    deliverables: [
      '24/7 monitoring & alerting',
      'Patch & lifecycle management',
      'Named escalation pod',
      'Monthly service reporting',
    ],
    problem:
      'Most providers sell a tier, then route you to whoever is free. You explain your environment again on every ticket, the same fault recurs quarterly because nobody owns the root cause, and the monthly report is a graph of ticket volume rather than anything you can act on.',
    approach: [
      {
        title: 'Discovery and takeover',
        body: 'One to two weeks mapping the estate — assets, dependencies, licences, the undocumented thing holding it together. We run in parallel with your incumbent so there is never a window where nobody owns the phone.',
      },
      {
        title: 'Stabilise',
        body: 'Close the findings that generate the most tickets first. In most inherited estates a handful of unpatched systems and one misconfigured backup account for the majority of incidents.',
      },
      {
        title: 'Instrument',
        body: 'Monitoring and alerting tuned to your thresholds, not vendor defaults. Alerts that nobody acts on get removed rather than muted.',
      },
      {
        title: 'Operate and report',
        body: 'Monthly review against the SLA with the incidents, the root causes, and what we changed so they do not recur. Service credits apply when we miss.',
      },
    ],
    outcomes: [
      'Fewer repeat incidents, because root cause is tracked to closure',
      'A named engineer who knows the estate, not a rotating queue',
      'Predictable per-user or per-device cost with no surprise line items',
      'A monthly report your board can read',
    ],
    faq: [
      {
        q: 'Can you work alongside our in-house IT team?',
        a: 'That is the most common arrangement. Most clients keep an internal lead and use us for depth, out-of-hours cover and project capacity rather than replacing headcount.',
      },
      {
        q: 'What happens if you miss the SLA?',
        a: 'Service credits, defined in the schedule before you sign. We would rather give the credit than argue about whether the clock started.',
      },
    ],
    engagement: 'Monthly retainer, per user or per device',
    startsAt: 'from $18 / user / month',
    relatedCases: ['healthcare-continuity-platform'],
  },
  {
    id: 'cloud',
    index: '02',
    visual: 'signal',
    title: 'Cloud Engineering',
    summary:
      'Migration, architecture and cost control across AWS, Azure, GCP and Oracle — without the lock-in tax.',
    detail:
      'We design landing zones, migrate workloads with rehearsed cutovers, and instrument spend from the first day rather than the first invoice shock. Most estates we inherit are over-provisioned; the first audit usually pays for the engagement.',
    deliverables: [
      'Landing zone & IaC baseline',
      'Workload migration & cutover',
      'FinOps and spend guardrails',
      'DR and backup topology',
    ],
    problem:
      'Cloud bills grow faster than the business does, nobody can explain which team owns which line item, and the last migration left half the workloads running in both places. Meanwhile the disaster recovery plan has never been tested end to end.',
    approach: [
      {
        title: 'Audit and model',
        body: 'Full inventory of what is running, what it costs, and what it is actually used for. We model the target state with real numbers so the business case survives contact with finance.',
      },
      {
        title: 'Landing zone',
        body: 'Accounts, networking, identity and guardrails defined as code. Everything after this point is reproducible, which is what makes the rest of the migration boring.',
      },
      {
        title: 'Migrate in waves',
        body: 'Lowest-risk workloads first to prove the pattern, then in dependency order. Every cutover is rehearsed and every rehearsal includes the rollback.',
      },
      {
        title: 'Optimise and hand over',
        body: 'Right-sizing, commitment planning and budget alerts, plus the runbooks and IaC so your team can operate it without us if they choose to.',
      },
    ],
    outcomes: [
      'A documented, reproducible environment instead of hand-built servers',
      'Spend attributed to teams and services, with alerts before overruns',
      'Disaster recovery that has actually been tested',
      'No proprietary tooling that only we can maintain',
    ],
    faq: [
      {
        q: 'Which cloud should we be on?',
        a: 'Whichever fits your workloads, your compliance obligations and your existing licensing. We hold certifications across AWS, Azure, GCP and Oracle and take no resale margin, so the recommendation is not steered.',
      },
      {
        q: 'Can you migrate without downtime?',
        a: 'For most workloads, yes — with replication and a cutover window measured in minutes. Where a hard outage is unavoidable we tell you up front and schedule it.',
      },
    ],
    engagement: 'Fixed-scope project, optional managed handover',
    startsAt: 'from $12,000',
    relatedCases: ['insurance-big-data-migration'],
  },
  {
    id: 'cyber-security',
    index: '03',
    visual: 'ember',
    title: 'Cyber Security',
    summary:
      'Find the vulnerabilities, quantify the risk, and implement controls that survive a real audit.',
    detail:
      'Posture assessment, hardening and continuous monitoring across identity, endpoint and network. Every control maps to a framework you can show a regulator, and the incident response plan gets rehearsed rather than filed.',
    deliverables: [
      'Posture & vulnerability assessment',
      'Identity and endpoint hardening',
      'SIEM / detection tuning',
      'Incident response runbooks',
    ],
    problem:
      'You have the tools but not the coverage. Alerts fire into a channel nobody reads, the last penetration test produced a PDF and no remediation, and if you were breached on a Saturday it is not clear who would notice or who would be called.',
    approach: [
      {
        title: 'Assess',
        body: 'Technical assessment across identity, endpoint, network and cloud, mapped to the framework that applies to you — ISO 27001, SOC 2, HIPAA, PCI DSS or NCA ECC for Saudi clients.',
      },
      {
        title: 'Prioritise by exploitability',
        body: 'A ranked remediation plan ordered by what is actually reachable from the internet and what would hurt most, not by raw CVSS score.',
      },
      {
        title: 'Harden and instrument',
        body: 'Implement the controls, then tune detection so the alerts that fire are the ones worth waking someone for.',
      },
      {
        title: 'Rehearse',
        body: 'Tabletop and live incident response exercises. A plan nobody has run is a document, not a capability.',
      },
    ],
    outcomes: [
      'A remediation plan ranked by real exploitability',
      'Controls mapped to your framework, with the evidence pack',
      'Detection that produces actionable alerts, not noise',
      'An incident response plan the team has actually practised',
    ],
    faq: [
      {
        q: 'Do you do penetration testing?',
        a: 'Yes, and unlike a pure testing firm we can remediate what we find. If you would rather keep testing independent from remediation we will say so and work with your tester.',
      },
      {
        q: 'Can you help us reach ISO 27001 or SOC 2?',
        a: 'We produce the technical controls and the evidence alongside the implementation. You will still need an accredited auditor for certification itself.',
      },
    ],
    engagement: 'Assessment, then project or retainer',
    startsAt: 'from $6,500 (assessment)',
    relatedCases: ['healthcare-continuity-platform'],
  },
  {
    id: 'software',
    index: '04',
    visual: 'dusk',
    title: 'Software Development',
    summary:
      'Custom platforms, internal tooling and integrations, built by a team that will still be here to maintain them.',
    detail:
      'Discovery through to production, in short reviewable increments against a real environment. You get documentation and CI your own developers can pick up, because the goal is a system you own rather than a dependency on us.',
    deliverables: [
      'Discovery & technical spec',
      'Web platforms & internal tools',
      'Systems integration & APIs',
      'CI/CD and handover docs',
    ],
    problem:
      'The last agency delivered something that worked on the demo and nowhere else. There are no tests, no documentation, the deployment lives in one person’s head, and every change costs more than the last one.',
    approach: [
      {
        title: 'Discovery',
        body: 'A fixed-fee phase producing a technical specification, architecture, delivery plan and a real number. You own the output whether or not we build it.',
      },
      {
        title: 'Build in increments',
        body: 'Two-week increments, each deployed to a real environment and reviewable by you. No six-month silence followed by a reveal.',
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
      'A specification and a real number before you commit to the build',
      'Working software you can review every two weeks',
      'Tests and observability on the paths that matter',
      'Documentation that makes your team independent of us',
    ],
    faq: [
      {
        q: 'Do you work fixed-price or time and materials?',
        a: 'Discovery is fixed. The build is fixed-scope where the requirements are stable, and rate-based where genuine discovery is still happening — we will tell you which applies and why.',
      },
      {
        q: 'Who owns the code?',
        a: 'You do, from the first commit. Repositories are in your organisation, not ours.',
      },
    ],
    engagement: 'Fixed-fee discovery, then project',
    startsAt: 'from $3,500 (discovery)',
    relatedCases: ['public-safety-travel-app'],
  },
  {
    id: 'web-mobile',
    index: '05',
    visual: 'moss',
    title: 'Web & Mobile',
    summary:
      'Sites and applications that establish a presence and convert the audience they reach.',
    detail:
      'Design and build across web and native mobile, with performance, accessibility and search treated as build requirements rather than a phase-two ticket that never gets picked up.',
    deliverables: [
      'Marketing sites & web apps',
      'iOS / Android / cross-platform',
      'Ecommerce build & migration',
      'Technical SEO foundations',
    ],
    problem:
      'The site looks fine on the designer’s laptop and loads in six seconds on a phone. It is invisible to search, unusable with a keyboard, and the CMS is frightening enough that nobody updates it.',
    approach: [
      {
        title: 'Positioning first',
        body: 'What the site has to make a visitor believe, and what it has to make them do. Structure and copy are decided before any visual design, because design cannot rescue an unclear proposition.',
      },
      {
        title: 'Design in the browser',
        body: 'We prototype in real code on real devices. Static mockups hide exactly the problems that matter — reflow, load, touch targets, motion.',
      },
      {
        title: 'Build to budget',
        body: 'Performance and accessibility budgets set at the start and enforced in CI. A regression fails the build rather than shipping and being discovered in an audit.',
      },
      {
        title: 'Hand over the keys',
        body: 'A content model your team can actually edit, plus analytics that answer questions rather than producing dashboards nobody opens.',
      },
    ],
    outcomes: [
      'A site that loads fast on a mid-range phone over mobile data',
      'WCAG 2.2 AA as a build requirement, verified in CI',
      'Technical SEO foundations in place from launch',
      'A CMS your marketing team is not afraid of',
    ],
    faq: [
      {
        q: 'Do you design as well as build?',
        a: 'Yes. We can also build against your existing brand guidelines or a design your agency supplies.',
      },
      {
        q: 'Can you take over an existing site?',
        a: 'Often. We audit first and tell you honestly whether it is cheaper to inherit it or replace it.',
      },
    ],
    engagement: 'Fixed-scope project',
    startsAt: 'from $7,500',
    relatedCases: ['public-safety-travel-app'],
  },
  {
    id: 'consulting',
    index: '06',
    visual: 'sand',
    title: 'IT Consulting & Advisory',
    summary:
      'Independent architecture, vendor and roadmap advice from engineers who have run what they recommend.',
    detail:
      'We audit what you have, model what it costs, and give you a sequenced roadmap with the trade-offs written down. We take no resale margin, so nothing steers the recommendation except the fit.',
    deliverables: [
      'Estate & architecture audit',
      'Vendor selection & negotiation',
      'Technology roadmap',
      'Testing, QA & compliance review',
    ],
    problem:
      'You are being asked to approve a significant spend on the recommendation of the vendor who benefits from it. Internally, nobody has the bandwidth or the independence to challenge the assumptions.',
    approach: [
      {
        title: 'Understand the constraint',
        body: 'Not the technology question but the business one behind it — the cost pressure, the audit finding, the acquisition, the contract renewal that forced the conversation.',
      },
      {
        title: 'Audit and model',
        body: 'What you run today, what it costs fully loaded, and what the credible options actually cost over three years including the migration.',
      },
      {
        title: 'Recommend with the trade-offs',
        body: 'A written recommendation including what we would not do and why. Where the honest answer is to change nothing, that is what the report says.',
      },
      {
        title: 'Support the decision',
        body: 'We will sit in the vendor negotiation and the board presentation. Advice that stops at the PDF is not much use.',
      },
    ],
    outcomes: [
      'An independent view with no resale margin behind it',
      'Three-year cost models, not list prices',
      'A sequenced roadmap with dependencies made explicit',
      'Support through the vendor negotiation itself',
    ],
    faq: [
      {
        q: 'Do you resell hardware or licences?',
        a: 'No. We hold vendor certifications but take no resale margin, which is what makes the advice independent.',
      },
      {
        q: 'What if the audit says we should stay as we are?',
        a: 'Then the report says that. It has happened, and those clients tend to come back for the work that genuinely needed doing.',
      },
    ],
    engagement: 'Fixed-fee audit and roadmap',
    startsAt: 'from $4,500',
    relatedCases: ['logistics-technology-implementation'],
  },
  {
    id: 'design-brand',
    index: '07',
    visual: 'dusk',
    title: 'UI/UX & Brand',
    summary:
      'Interface design, design systems and brand identity — built to be handed to engineers, not admired in a deck.',
    detail:
      'Research, interface design and the visual language around it. We design in the browser as much as in Figma, and everything we hand over is a system your developers can build from rather than a set of pictures they have to interpret.',
    deliverables: [
      'Research & user flows',
      'Interface design & prototypes',
      'Design system & component library',
      'Brand identity & guidelines',
    ],
    problem:
      'The designs look beautiful in Figma and fall apart in build. Nobody agreed what a button does at 320px, the brand exists as one logo file and a hex code, and every new screen restarts the argument from scratch.',
    approach: [
      {
        title: 'Understand before drawing',
        body: 'Who uses this, what they are trying to finish, and where the current thing loses them. Analytics and a handful of real sessions beat a workshop full of assumptions.',
      },
      {
        title: 'Design the system, not the screens',
        body: 'Type scale, spacing rhythm, colour tokens and states first. Screens then assemble from decided parts instead of each one inventing its own spacing.',
      },
      {
        title: 'Prototype in the browser',
        body: 'Real code on real devices for anything with motion, reflow or interaction. Static mockups hide precisely the problems that cost money later.',
      },
      {
        title: 'Hand over something buildable',
        body: 'Tokens, components, states and edge cases documented — plus the brand guidelines that keep it coherent once your team is running it without us.',
      },
    ],
    outcomes: [
      'A design system your developers build from directly',
      'Accessibility and reflow decided at design time, not patched later',
      'One visual language across product, site and collateral',
      'Brand guidelines that survive contact with a new hire',
    ],
    faq: [
      {
        q: 'Can you work with our existing brand?',
        a: 'Usually, yes. We audit what you have and tell you honestly whether it needs extending or replacing — extending is cheaper and more common than agencies admit.',
      },
      {
        q: 'Do you do brand identity from scratch?',
        a: 'Yes, including naming support, logo, type and colour systems, and the guidelines. It works best alongside a build, so the identity gets tested against real screens rather than a mood board.',
      },
    ],
    engagement: 'Fixed-scope project or embedded designer',
    startsAt: 'from $5,500',
    relatedCases: ['public-safety-travel-app'],
  },
];

/* -------------------------------------------------------------------------- */
/* Differentiators                                                             */
/* -------------------------------------------------------------------------- */

export const DIFFERENTIATORS: Differentiator[] = [
  {
    index: '01',
    title: 'Engineers, not account managers',
    body: 'The person who scopes your work is the person who builds it. No handoff to a delivery team you have never spoken to, and no translation layer between the problem and the people fixing it.',
  },
  {
    index: '02',
    title: 'Three time zones, one team',
    body: 'Engineering depth in Karachi, European contracting and governance in Geneva, delivery on the ground in Riyadh. Genuine follow-the-sun cover, not an answering service after 6pm.',
  },
  {
    index: '03',
    title: 'Costs you can forecast',
    body: 'Fixed-scope statements of work and published managed-service tiers. Our rates reflect where our engineers sit, which is why clients get senior people rather than the cheapest available.',
  },
  {
    index: '04',
    title: 'Built to be handed over',
    body: 'Infrastructure as code, documented runbooks, repositories in your organisation. If you outgrow us or bring it in-house, nothing breaks and nothing is held hostage.',
  },
];

/* -------------------------------------------------------------------------- */
/* Process                                                                     */
/* -------------------------------------------------------------------------- */

export const PROCESS: ProcessStep[] = [
  {
    index: '01',
    title: 'Audit',
    body: 'A structured review of the estate, the constraints and the commercial pressure behind them. You keep the findings whether or not you engage us.',
  },
  {
    index: '02',
    title: 'Architect',
    body: 'A sequenced plan with costs, dependencies and trade-offs written down. We agree the definition of done before anyone opens an editor.',
  },
  {
    index: '03',
    title: 'Implement',
    body: 'Short increments against a real environment, with rehearsed cutovers. Nothing reaches production that has not been rolled back in a test first.',
  },
  {
    index: '04',
    title: 'Operate',
    body: 'Monitoring, patching and escalation under an agreed SLA — or a clean handover to your team, with the documentation to make it stick.',
  },
];

/* -------------------------------------------------------------------------- */
/* Industries                                                                  */
/* -------------------------------------------------------------------------- */

export const INDUSTRIES: Industry[] = [
  { name: 'Industry & Manufacturing', note: 'OT/IT convergence, plant-floor uptime' },
  { name: 'Transportation & Logistics', note: 'Fleet telemetry, warehouse systems' },
  { name: 'Healthcare', note: 'HIPAA-aligned infrastructure' },
  { name: 'Banks & Insurance', note: 'Audit-ready controls, data residency' },
  { name: 'Public Sector', note: 'Procurement standards, accessibility' },
  { name: 'Non-Profit', note: 'Grant-funded budgets, donor data' },
];

/* -------------------------------------------------------------------------- */
/* Case studies                                                                */
/* -------------------------------------------------------------------------- */

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'insurance-big-data-migration',
    visual: 'signal',
    client: 'Major Insurance Provider',
    sector: 'Banks & Insurance',
    discipline: 'Cloud engineering',
    title: 'Big-data migration cuts $750k a month from hosting',
    summary:
      'A legacy analytics estate was billing on reserved capacity nobody had reviewed in four years. We re-architected storage tiers, moved batch workloads to spot capacity and rebuilt the ingest pipeline against a managed service.',
    metric: { value: '$750k', label: 'Monthly run-rate removed' },
    stack: ['AWS', 'Terraform', 'Snowflake', 'Airflow'],
    year: '2024',
    region: 'Europe',
    duration: '7 months',
    teamSize: '6 engineers',
    challenge: [
      'The analytics platform had been lifted into the cloud four years earlier and never revisited. Reserved instances renewed automatically, storage tiers were uniform regardless of access pattern, and the nightly batch ran on always-on capacity that sat idle nineteen hours a day.',
      'Nobody could attribute cost to a business unit, so no business unit felt responsible for it. Finance had escalated three times and been told each time that reducing spend risked the overnight close.',
      'The constraint that mattered: the regulatory close had to complete before 06:00 every business day, and had never missed. Any change that risked that was not worth making.',
    ],
    approach: [
      {
        title: 'Instrument before changing anything',
        body: 'Six weeks of tagging and cost attribution first, so every recommendation carried a number and an owner. This also surfaced two entire environments nobody was using.',
      },
      {
        title: 'Tier the storage',
        body: 'Access-pattern analysis showed 71% of the warehouse had not been read in ninety days. Lifecycle policies moved it to cold tiers with no change to query paths for the data that mattered.',
      },
      {
        title: 'Move batch to spot',
        body: 'The nightly pipeline was rebuilt to be interruption-tolerant and moved to spot capacity with an on-demand fallback, which preserved the 06:00 deadline while removing most of the compute cost.',
      },
      {
        title: 'Guardrails so it stays fixed',
        body: 'Budget alerts per business unit and commitment planning reviewed quarterly, so the estate does not silently drift back over the following two years.',
      },
    ],
    results: [
      { value: '$750k', label: 'Monthly run-rate removed' },
      { value: '71%', label: 'Warehouse moved to cold tiers' },
      { value: '0', label: 'Missed regulatory closes' },
      { value: '5.2 mo', label: 'Payback on the engagement' },
    ],
    quote: {
      text: 'They spent the first six weeks measuring instead of cutting, which is why nothing broke when they started cutting.',
      name: 'Head of Platform Engineering',
      role: 'Major Insurance Provider',
    },
  },
  {
    slug: 'logistics-technology-implementation',
    visual: 'sand',
    client: 'Restaurant Product Supplier',
    sector: 'Transportation & Logistics',
    discipline: 'IT consulting',
    title: 'Maximising throughput with the right technology implementation',
    summary:
      'A distribution business had bought good software and deployed it badly. We re-mapped the order-to-delivery flow, consolidated four overlapping systems and retrained the floor on the one that survived.',
    metric: { value: '3.4×', label: 'Order throughput per head' },
    stack: ['Microsoft 365', 'Power Automate', 'Dynamics', 'SharePoint'],
    year: '2024',
    region: 'Europe & Gulf',
    duration: '5 months',
    teamSize: '4 consultants',
    challenge: [
      'Four systems had been bought over six years, each to solve a problem the previous one had created. Orders were re-keyed between three of them, and the fourth existed because one depot refused to use the others.',
      'The warehouse floor had built a parallel process on paper and spreadsheets, which was faster than the software and invisible to management reporting.',
      'The owner’s stated goal was to buy a fifth system. The audit found the problem was implementation and process, not capability.',
    ],
    approach: [
      {
        title: 'Follow the order, not the org chart',
        body: 'We walked the full order-to-delivery path on site, including the paper process. Mapping what people actually did surfaced eleven re-keying steps nobody had counted.',
      },
      {
        title: 'Consolidate to one system of record',
        body: 'Of the four systems, one covered eighty per cent of need. We extended it to cover the rest rather than buying a fifth, and retired the other three on a staged timetable.',
      },
      {
        title: 'Automate the joins',
        body: 'The remaining handoffs were automated so the data moves without a human retyping it, which removed both the delay and the transcription errors.',
      },
      {
        title: 'Train on the floor',
        body: 'Training ran on shift, on the floor, with the people doing the work — including the depot that had resisted. Adoption problems are rarely solved in a classroom.',
      },
    ],
    results: [
      { value: '3.4×', label: 'Order throughput per head' },
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
    sector: 'Public Sector',
    discipline: 'Mobile development',
    title: 'AI-supported public safety travel app for London',
    summary:
      'A strategic move from a static information portal to a live mobile application, with routing that responds to incident feeds and an accessibility standard that had to pass public-sector procurement.',
    metric: { value: '210k', label: 'First-year installs' },
    stack: ['React Native', 'Azure', 'Cognitive Services', 'PostGIS'],
    year: '2025',
    region: 'United Kingdom',
    duration: '9 months',
    teamSize: '7 engineers',
    challenge: [
      'The existing service was a web portal updated by hand. During an incident the information people most needed was the information least likely to be current.',
      'Public-sector procurement required WCAG 2.2 AA compliance, a full accessibility statement, and an independent audit before launch. Retrofitting that after the build was not an option.',
      'Incident feeds arrive in inconsistent formats from multiple authorities, and the routing had to degrade sensibly when a feed goes quiet rather than silently serving stale advice.',
    ],
    approach: [
      {
        title: 'Accessibility as a build gate',
        body: 'Automated accessibility checks in CI from the first sprint, plus testing with screen reader users at three points during the build. The independent audit found no blocking issues.',
      },
      {
        title: 'Normalise the feeds',
        body: 'An ingestion layer that reconciles inconsistent incident formats and, critically, tracks feed freshness so the app can tell the user when advice may be stale.',
      },
      {
        title: 'Routing that degrades honestly',
        body: 'When a feed is unavailable the app says so and falls back to base routing, rather than presenting stale data with the same confidence as live data.',
      },
      {
        title: 'Launch in stages',
        body: 'A limited borough rollout for six weeks before city-wide launch, which caught two edge cases in the routing that no test environment had produced.',
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
    slug: 'healthcare-continuity-platform',
    visual: 'tide',
    client: 'Healthcare Organisation',
    sector: 'Healthcare',
    discipline: 'Managed services',
    title: 'Zero break in service through a full remote transition',
    summary:
      'A platform rollout completed weeks before it was needed. When the workforce moved home, clinical and administrative staff kept working against the same systems with no interruption to service.',
    metric: { value: '0', label: 'Hours of service lost' },
    stack: ['Azure Virtual Desktop', 'Intune', 'Defender', 'Veeam'],
    year: '2023',
    region: 'Europe',
    duration: '4 months, then ongoing',
    teamSize: '5 engineers',
    challenge: [
      'Clinical staff worked from fixed workstations on a flat internal network. Remote access existed for a handful of administrators and would not have survived the whole organisation attempting it.',
      'Patient data constraints meant the answer could not be laptops with local copies. Whatever replaced the workstation had to keep data inside the managed environment.',
      'The timetable was set by circumstance rather than by us — the transition had to work the first time, because there was no second window.',
    ],
    approach: [
      {
        title: 'Virtual desktop, not laptops',
        body: 'Azure Virtual Desktop kept the data inside the managed environment while letting staff work from any device, which resolved the data-residency constraint and the hardware supply problem at once.',
      },
      {
        title: 'Identity and device baseline first',
        body: 'Conditional access, MFA and device compliance were in place before a single user was migrated. Doing this after would have meant a second disruption.',
      },
      {
        title: 'Migrate by department',
        body: 'Department by department in order of clinical criticality, with the least critical first so the pattern was proven before it touched patient-facing work.',
      },
      {
        title: 'Stay on after the transition',
        body: 'We moved onto a managed service arrangement rather than handing back a platform nobody internally had operated before.',
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
      'I have been a customer for more than a decade. BrnDynamics is an example of the way managed services should be done.',
    name: 'Daniel Legrante',
    role: 'CIO',
    org: 'Restaurant Product Supplier',
  },
];

/* -------------------------------------------------------------------------- */
/* Technology partners — rendered as a wordmark marquee                        */
/* -------------------------------------------------------------------------- */

export const PARTNERS: string[] = [
  'Amazon Web Services',
  'Microsoft Azure',
  'Google Cloud',
  'Oracle Cloud',
  'Cisco',
  'VMware',
  'Dell Technologies',
  'Sophos',
  'Veeam',
  'Acronis',
  'Extreme Networks',
  'WatchGuard',
  'Hewlett Packard Enterprise',
  'Lenovo',
  'Akamai',
  'Zerto',
];

export const PLATFORM_GROUPS = [
  {
    label: 'Cloud',
    items: ['AWS', 'Azure', 'Google Cloud', 'Oracle Cloud', 'IBM Cloud', 'DigitalOcean', 'Linode'],
  },
  {
    label: 'Microsoft 365',
    items: [
      'Exchange Online',
      'SharePoint Online',
      'Defender for 365',
      'Autopilot',
      'Windows 365',
      'Intune',
    ],
  },
  {
    label: 'Network & Security',
    items: ['Cisco', 'Sophos', 'WatchGuard', 'Extreme Networks', 'Fortinet'],
  },
  {
    label: 'Continuity',
    items: ['Veeam', 'Acronis', 'Zerto', 'Altaro', 'VMware', 'Dell Technologies'],
  },
] as const;

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

export const FAQ = [
  {
    q: 'Where are you based, and does it matter?',
    a: 'Engineering is in Karachi, European operations in Geneva, Gulf delivery in Riyadh. It matters in two ways: you get genuine round-the-clock cover rather than an answering service, and our rates buy senior engineers rather than the cheapest available.',
  },
  {
    q: 'How quickly can you take over an existing estate?',
    a: 'Discovery takes one to two weeks depending on size. We run in parallel with your incumbent through the transition so there is never a window where nobody owns the phone.',
  },
  {
    q: 'Do you work with in-house IT teams or replace them?',
    a: 'Both models are common. Most managed-service clients keep an internal lead and use us for depth, out-of-hours cover and project capacity rather than headcount replacement.',
  },
  {
    q: 'What does an engagement cost?',
    a: 'Managed services are priced per user or per device against a published tier. Projects are fixed-scope statements of work. The estimator on this site will give you an indicative range in about two minutes.',
  },
  {
    q: 'Can you support compliance and audit requirements?',
    a: 'Yes. We map controls to the framework that applies to you — HIPAA, SOC 2, ISO 27001, PCI DSS, GDPR, or NCA ECC for Saudi clients — and produce the evidence pack alongside the implementation rather than after it.',
  },
  {
    q: 'Who owns the code and the infrastructure?',
    a: 'You do, from the first commit. Repositories sit in your organisation and infrastructure is defined as code in your accounts. There is no proprietary layer that makes leaving us expensive.',
  },
];

/* -------------------------------------------------------------------------- */
/* Engagement flow — rendered as a process diagram                             */
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
    title: 'Audit',
    body: 'A structured review of the estate, the constraints, and the commercial pressure behind them.',
    outputs: ['Asset & dependency map', 'Ranked findings', 'Fixed-fee quote'],
  },
  {
    index: '02',
    title: 'Architect',
    body: 'A sequenced plan with costs, dependencies and trade-offs written down before anyone opens an editor.',
    outputs: ['Target architecture', 'Migration sequence', 'Definition of done'],
    after: '1–2 weeks',
  },
  {
    index: '03',
    title: 'Go / no-go',
    body: 'You approve the scope and the number, or you walk away with the findings. No pressure either way.',
    outputs: ['Signed SOW', 'Named engineering pod', 'Rollback criteria'],
    after: 'Your call',
    gate: true,
  },
  {
    index: '04',
    title: 'Implement',
    body: 'Short increments against a real environment. Every cutover is rehearsed, including the rollback.',
    outputs: ['Fortnightly releases', 'Rehearsed cutovers', 'Runbooks as we go'],
    after: '2-week cycles',
  },
  {
    index: '05',
    title: 'Operate',
    body: 'Monitoring, patching and escalation under the agreed SLA — or a clean handover to your own team.',
    outputs: ['24/7 monitoring', 'Monthly service review', 'Handover pack'],
    after: 'Ongoing',
  },
];

/* -------------------------------------------------------------------------- */
/* Success stories — short outcome vignettes                                   */
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
    id: 'ransomware-recovery',
    sector: 'Manufacturing',
    region: 'Gulf',
    visual: 'ember',
    headline: 'Back on the plant floor in 19 hours',
    problem:
      'Ransomware took out the production scheduling system on a Thursday night. The incumbent provider could not confirm whether the backups were clean.',
    outcome:
      'We verified backup integrity offline, rebuilt the domain from a known-good restore point and had scheduling running before the Saturday shift. Then we closed the entry route.',
    metric: { value: '19 hrs', label: 'Downtime, from call to production' },
    quote: {
      text: 'They answered at 23:40 on a Thursday. That is the whole review.',
      name: 'Operations Director',
    },
  },
  {
    id: 'audit-pass',
    sector: 'Financial services',
    region: 'Europe',
    visual: 'moss',
    headline: 'ISO 27001 passed at the first attempt',
    problem:
      'A fintech had six weeks before an audit they had already deferred once. Controls existed in places, evidence existed almost nowhere.',
    outcome:
      'We mapped every control to a technical implementation, produced the evidence pack alongside the fixes, and sat in the audit itself.',
    metric: { value: '0', label: 'Major non-conformities' },
  },
  {
    id: 'cloud-spend',
    sector: 'Retail',
    region: 'Gulf',
    visual: 'signal',
    headline: 'Cloud bill cut 41% without touching performance',
    problem:
      'Spend had tripled in two years and nobody could attribute a single line item to a team. Every proposed cut was blocked as "too risky".',
    outcome:
      'Six weeks of tagging and measurement first, then right-sizing, storage tiering and commitment planning against real usage data.',
    metric: { value: '41%', label: 'Run-rate removed' },
    caseSlug: 'insurance-big-data-migration',
  },
  {
    id: 'helpdesk-turnaround',
    sector: 'Healthcare',
    region: 'Europe',
    visual: 'dusk',
    headline: 'From 3-day tickets to same-day resolution',
    problem:
      'Clinical staff had stopped raising tickets because nothing came back. The real fault volume was invisible to management.',
    outcome:
      'We took the service desk, published response targets, and fixed the twelve recurring faults generating most of the load.',
    metric: { value: '94%', label: 'Same-day resolution' },
    quote: {
      text: 'People started reporting problems again. That was the first sign it was working.',
      name: 'IT Manager',
    },
    caseSlug: 'healthcare-continuity-platform',
  },
];

/* -------------------------------------------------------------------------- */
/* Toolchain — what we run the work on                                         */
/* -------------------------------------------------------------------------- */

export interface ToolGroup {
  id: string;
  label: string;
  note: string;
  /** Names resolve against BRAND_MARKS; unknown names render as wordmarks. */
  tools: string[];
}

export const TOOLCHAIN: ToolGroup[] = [
  {
    id: 'delivery',
    label: 'Delivery & collaboration',
    note: 'We work inside your tools, not ours. If your team lives in Jira, we live in Jira — you should never have to log into a portal to find out what we are doing.',
    tools: [
      'Jira', 'ClickUp', 'Slack', 'Teamwork', 'Notion', 'Confluence',
      'Asana', 'Trello', 'Linear', 'Monday.com', 'Microsoft Teams', 'Zoom',
      'GitHub', 'GitLab', 'Basecamp', 'Azure DevOps',
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    note: 'Chosen per engagement, never by habit. The stack that fits your team’s ability to maintain it beats the stack that is fashionable this year.',
    tools: [
      'Angular', 'React', 'Vue.js', 'Next.js', 'Node.js', 'TypeScript',
      'Python', '.NET', 'PHP', 'Laravel', 'Flutter', 'Swift', 'Kotlin',
      'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Docker',
      'Kubernetes', 'Terraform', 'Oracle', 'SAP', 'Odoo', 'Salesforce',
      'Shopify', 'WordPress',
    ],
  },
  {
    id: 'design',
    label: 'Design & brand',
    note: 'Design happens in the browser as often as in Figma. Static mockups hide exactly the problems that matter — reflow, load, touch targets, motion.',
    tools: ['Figma', 'Adobe CC', 'Sketch', 'Framer', 'Webflow', 'Storybook'],
  },
];

/* Platform partners and certifications — vendor marks, not client logos. */
export const PARTNER_MARKS: string[] = [
  'Microsoft', 'Cisco', 'VMware', 'Dell', 'Veeam', 'Lenovo',
  'HPE', 'Acronis', 'Sophos', 'WatchGuard',
  'Extreme Networks', 'Google Cloud',
];
