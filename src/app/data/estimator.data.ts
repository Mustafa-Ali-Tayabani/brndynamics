/**
 * Cost estimator model.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * EVERY NUMBER IN THIS FILE IS A PLACEHOLDER. They are internally consistent
 * and produce plausible ranges, but they are not BrnDynamics' real rate card.
 * Replace `base`, `perUnit`, `add` and `mult` with your actual pricing before
 * this page goes live — the UI reads entirely from here and needs no changes.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * How a figure is produced:
 *   subtotal = base + Σ(flat adds) + Σ(count × perUnit)
 *   total    = subtotal × Π(multipliers)
 *   range    = total × SPREAD_LOW … total × SPREAD_HIGH
 */

export type QuestionKind = 'choice' | 'multi' | 'counter';

export interface EstimatorOption {
  id: string;
  label: string;
  hint?: string;
  /** Flat amount added to the subtotal. */
  add?: number;
  /** Multiplier applied to the total. */
  mult?: number;
}

export interface EstimatorQuestion {
  id: string;
  kind: QuestionKind;
  title: string;
  help?: string;
  /** choice / multi */
  options?: EstimatorOption[];
  /** counter */
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  unitPlural?: string;
  perUnit?: number;
  initial?: number;
}

export interface EstimatorService {
  id: string;
  title: string;
  blurb: string;
  /** Starting point before any answers. */
  base: number;
  /** true → the figure is a monthly retainer, false → a one-off project. */
  recurring: boolean;
  leadTime: string;
  questions: EstimatorQuestion[];
}

/** How wide the quoted range is around the computed total. */
export const SPREAD_LOW = 0.85;
export const SPREAD_HIGH = 1.3;

/** Applied to every service. */
export const TIMELINE_QUESTION: EstimatorQuestion = {
  id: 'timeline',
  kind: 'choice',
  title: 'When do you need this running?',
  help: 'Compressed timelines mean more people in parallel, which costs more than the same work spread out.',
  options: [
    { id: 'flexible', label: 'No fixed date', hint: 'We schedule it into normal capacity', mult: 0.95 },
    { id: 'standard', label: 'Next quarter', hint: 'The usual case', mult: 1 },
    { id: 'expedited', label: 'Within 6 weeks', hint: 'Additional engineers in parallel', mult: 1.25 },
    { id: 'urgent', label: 'Within 3 weeks', hint: 'Dedicated pod, other work displaced', mult: 1.5 },
  ],
};

export const SERVICES: EstimatorService[] = [
  {
    id: 'managed-services',
    title: 'Managed Services',
    blurb: 'Ongoing monitoring, patching and support under an SLA.',
    base: 400,
    recurring: true,
    leadTime: 'Onboarding in 1–2 weeks',
    questions: [
      {
        id: 'users',
        kind: 'counter',
        title: 'How many people need supporting?',
        help: 'Everyone with an account you would expect us to look after.',
        min: 5,
        max: 2000,
        step: 5,
        initial: 50,
        unit: 'user',
        unitPlural: 'users',
        perUnit: 14,
      },
      {
        id: 'servers',
        kind: 'counter',
        title: 'How many servers or network devices?',
        help: 'Physical, virtual and cloud instances you want monitored.',
        min: 0,
        max: 500,
        step: 1,
        initial: 6,
        unit: 'device',
        unitPlural: 'devices',
        perUnit: 45,
      },
      {
        id: 'coverage',
        kind: 'choice',
        title: 'What cover do you need?',
        options: [
          { id: 'business', label: 'Business hours', hint: 'One time zone, Mon–Fri', mult: 1 },
          { id: 'extended', label: 'Extended hours', hint: '07:00–22:00 across your regions', mult: 1.35 },
          { id: 'always', label: '24 / 7 / 365', hint: 'Including public holidays', mult: 1.8 },
        ],
      },
      {
        id: 'compliance',
        kind: 'choice',
        title: 'Any compliance obligations?',
        help: 'This changes the evidence we have to produce alongside the work.',
        options: [
          { id: 'none', label: 'None specific', mult: 1 },
          { id: 'iso', label: 'ISO 27001 / SOC 2', mult: 1.25 },
          { id: 'health', label: 'HIPAA / patient data', mult: 1.3 },
          { id: 'finance', label: 'Financial / PCI DSS', mult: 1.4 },
        ],
      },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud Engineering',
    blurb: 'Migration, architecture and cost control across the major clouds.',
    base: 12000,
    recurring: false,
    leadTime: 'Typically 3–7 months',
    questions: [
      {
        id: 'workloads',
        kind: 'counter',
        title: 'Roughly how many workloads are moving?',
        help: 'An application, database or service that has to land somewhere new.',
        min: 1,
        max: 200,
        step: 1,
        initial: 8,
        unit: 'workload',
        unitPlural: 'workloads',
        perUnit: 1800,
      },
      {
        id: 'origin',
        kind: 'choice',
        title: 'Where are you moving from?',
        options: [
          { id: 'greenfield', label: 'Nothing yet — greenfield', hint: 'No migration, just build', mult: 0.8 },
          { id: 'onprem', label: 'On-premise infrastructure', mult: 1 },
          { id: 'cloud', label: 'Another cloud provider', mult: 1.2 },
          { id: 'multi', label: 'Several places at once', hint: 'Mixed estate, partial migrations', mult: 1.45 },
        ],
      },
      {
        id: 'iac',
        kind: 'choice',
        title: 'How much is defined as code today?',
        options: [
          { id: 'none', label: 'Nothing — all hand-built', mult: 1.2 },
          { id: 'partial', label: 'Some of it', mult: 1.05 },
          { id: 'mature', label: 'Most of it', hint: 'Terraform, Bicep or similar in use', mult: 0.9 },
        ],
      },
      {
        id: 'dr',
        kind: 'choice',
        title: 'What recovery posture do you need?',
        options: [
          { id: 'backup', label: 'Backups only', hint: 'Restore measured in days', mult: 1 },
          { id: 'warm', label: 'Warm standby', hint: 'Recovery in hours', mult: 1.2 },
          { id: 'hot', label: 'Active–active', hint: 'Near-zero downtime', mult: 1.45 },
        ],
      },
      {
        id: 'extras',
        kind: 'multi',
        title: 'Anything else in scope?',
        help: 'Select any that apply.',
        options: [
          { id: 'finops', label: 'FinOps and cost guardrails', add: 4500 },
          { id: 'observability', label: 'Observability platform', add: 6000 },
          { id: 'cicd', label: 'CI/CD pipelines', add: 5500 },
          { id: 'training', label: 'Team enablement & training', add: 3200 },
        ],
      },
    ],
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    blurb: 'Assessment, hardening and detection that survives an audit.',
    base: 6500,
    recurring: false,
    leadTime: 'Assessment in 2–4 weeks',
    questions: [
      {
        id: 'endpoints',
        kind: 'counter',
        title: 'How many endpoints are in scope?',
        help: 'Laptops, desktops, servers and mobile devices.',
        min: 5,
        max: 5000,
        step: 5,
        initial: 80,
        unit: 'endpoint',
        unitPlural: 'endpoints',
        perUnit: 22,
      },
      {
        id: 'scope',
        kind: 'choice',
        title: 'How far should we take it?',
        options: [
          { id: 'assess', label: 'Assessment only', hint: 'Findings and a ranked plan', mult: 1 },
          { id: 'remediate', label: 'Assessment and remediation', hint: 'We fix what we find', mult: 2.1 },
          { id: 'monitor', label: 'Remediation and ongoing monitoring', hint: 'Includes detection tuning', mult: 2.8 },
        ],
      },
      {
        id: 'framework',
        kind: 'choice',
        title: 'Which framework applies?',
        options: [
          { id: 'none', label: 'No formal requirement', mult: 1 },
          { id: 'iso', label: 'ISO 27001 / SOC 2', mult: 1.3 },
          { id: 'hipaa', label: 'HIPAA', mult: 1.25 },
          { id: 'pci', label: 'PCI DSS', mult: 1.4 },
          { id: 'nca', label: 'NCA ECC (Saudi Arabia)', mult: 1.35 },
        ],
      },
      {
        id: 'extras',
        kind: 'multi',
        title: 'Anything else in scope?',
        options: [
          { id: 'pentest', label: 'External penetration test', add: 7500 },
          { id: 'phishing', label: 'Phishing simulation & training', add: 2800 },
          { id: 'tabletop', label: 'Incident response rehearsal', add: 3500 },
          { id: 'evidence', label: 'Audit evidence pack', add: 4200 },
        ],
      },
    ],
  },
  {
    id: 'software',
    title: 'Software Development',
    blurb: 'Custom platforms, internal tooling and integrations.',
    base: 3500,
    recurring: false,
    leadTime: 'Discovery in 2–3 weeks',
    questions: [
      {
        id: 'kind',
        kind: 'choice',
        title: 'What are we building?',
        options: [
          { id: 'internal', label: 'An internal tool', hint: 'Used by your own team', mult: 1 },
          { id: 'customer', label: 'A customer-facing platform', mult: 1.6 },
          { id: 'marketplace', label: 'A multi-sided marketplace', hint: 'Several user types, transactions', mult: 2.2 },
        ],
      },
      {
        id: 'screens',
        kind: 'counter',
        title: 'Roughly how many distinct screens?',
        help: 'A rough count is fine — this is the single biggest driver of build cost.',
        min: 3,
        max: 200,
        step: 1,
        initial: 14,
        unit: 'screen',
        unitPlural: 'screens',
        perUnit: 900,
      },
      {
        id: 'integrations',
        kind: 'counter',
        title: 'How many systems does it integrate with?',
        help: 'Payment providers, CRMs, ERPs, anything with an API.',
        min: 0,
        max: 40,
        step: 1,
        initial: 2,
        unit: 'integration',
        unitPlural: 'integrations',
        perUnit: 1400,
      },
      {
        id: 'extras',
        kind: 'multi',
        title: 'Which of these does it need?',
        options: [
          { id: 'auth', label: 'Accounts, roles and permissions', add: 3500 },
          { id: 'payments', label: 'Payments and billing', add: 4500 },
          { id: 'mobile', label: 'A native mobile app', add: 9000 },
          { id: 'realtime', label: 'Real-time or collaborative features', add: 6500 },
          { id: 'ai', label: 'AI or model-backed features', add: 7000 },
        ],
      },
    ],
  },
  {
    id: 'web-mobile',
    title: 'Web & Mobile',
    blurb: 'Sites and apps that load fast and convert.',
    base: 7500,
    recurring: false,
    leadTime: 'Typically 6–14 weeks',
    questions: [
      {
        id: 'pages',
        kind: 'counter',
        title: 'How many page templates?',
        help: 'Templates, not pages — fifty blog posts share one template.',
        min: 1,
        max: 80,
        step: 1,
        initial: 8,
        unit: 'template',
        unitPlural: 'templates',
        perUnit: 550,
      },
      {
        id: 'design',
        kind: 'choice',
        title: 'Where are you with design?',
        options: [
          { id: 'existing', label: 'We have designs ready', hint: 'Figma or similar, build-ready', mult: 0.8 },
          { id: 'brand', label: 'We have a brand, not designs', mult: 1 },
          { id: 'full', label: 'We need brand and design too', mult: 1.35 },
        ],
      },
      {
        id: 'languages',
        kind: 'counter',
        title: 'How many languages?',
        min: 1,
        max: 20,
        step: 1,
        initial: 1,
        unit: 'language',
        unitPlural: 'languages',
        perUnit: 1600,
      },
      {
        id: 'extras',
        kind: 'multi',
        title: 'Anything else?',
        options: [
          { id: 'cms', label: 'A CMS your team can edit', add: 2800 },
          { id: 'ecommerce', label: 'Ecommerce and checkout', add: 6500 },
          { id: 'app', label: 'A companion mobile app', add: 9000 },
          { id: 'migration', label: 'Content migration from an old site', add: 2400 },
        ],
      },
    ],
  },
  {
    id: 'consulting',
    title: 'IT Consulting & Advisory',
    blurb: 'Independent audit, architecture and roadmap.',
    base: 4500,
    recurring: false,
    leadTime: 'Findings in 2–4 weeks',
    questions: [
      {
        id: 'size',
        kind: 'choice',
        title: 'How large is the estate?',
        options: [
          { id: 'small', label: 'Under 50 people', mult: 1 },
          { id: 'mid', label: '50 – 250 people', mult: 1.4 },
          { id: 'large', label: '250 – 1,000 people', mult: 1.9 },
          { id: 'enterprise', label: 'Over 1,000 people', mult: 2.6 },
        ],
      },
      {
        id: 'deliverable',
        kind: 'choice',
        title: 'What do you need out of it?',
        options: [
          { id: 'audit', label: 'An audit and findings', mult: 1 },
          { id: 'roadmap', label: 'Audit and a sequenced roadmap', mult: 1.3 },
          { id: 'vendor', label: 'Roadmap and vendor selection', hint: 'Including negotiation support', mult: 1.6 },
        ],
      },
      {
        id: 'extras',
        kind: 'multi',
        title: 'Anything else?',
        options: [
          { id: 'onsite', label: 'On-site workshops', add: 3000 },
          { id: 'board', label: 'Board-level presentation', add: 1800 },
          { id: 'compliance', label: 'Compliance gap analysis', add: 4000 },
          { id: 'tco', label: 'Three-year TCO model', add: 2600 },
        ],
      },
    ],
  },
];
