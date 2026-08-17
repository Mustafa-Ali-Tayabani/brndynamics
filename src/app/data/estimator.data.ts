/**
 * Project brief model.
 *
 * The site does NOT show a price. Prospects answer scoping questions and give
 * their own budget range; BrnDynamics reviews the brief and sends a figure by
 * email. That keeps the number a considered response rather than a formula.
 *
 * The `base`, `perUnit`, `add` and `mult` fields are retained but unused by the
 * UI, so pricing can be switched back on later without re-authoring the
 * questions. If you do turn it on, replace every number first: they are
 * placeholders, not a rate card.
 *
 * Service ids must match CAPABILITIES ids in site.data.ts so the service pages
 * can deep-link into the right flow.
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
  options?: EstimatorOption[];
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
  base: number;
  /** true means the figure is a monthly retainer, false a one-off project. */
  recurring: boolean;
  leadTime: string;
  questions: EstimatorQuestion[];
}

/** Retained for a future pricing display; unused while the brief is price-free. */
export const SPREAD_LOW = 0.85;
export const SPREAD_HIGH = 1.3;

/** Asked on every flow, right before contact details. */
export const BUDGET_QUESTION: EstimatorQuestion = {
  id: 'budget',
  kind: 'choice',
  title: 'What budget range are you working with?',
  help: 'A range is enough. It tells us what shape of solution is realistic, and we would rather say so early than design something you cannot fund.',
  options: [
    { id: 'under10', label: 'Under $10,000' },
    { id: '10to25', label: '$10,000 to $25,000' },
    { id: '25to50', label: '$25,000 to $50,000' },
    { id: '50to100', label: '$50,000 to $100,000' },
    { id: 'over100', label: 'Over $100,000' },
    { id: 'unsure', label: 'Not sure yet', hint: 'We will suggest a range in our reply' },
  ],
};

/** Applied to every service. */
export const TIMELINE_QUESTION: EstimatorQuestion = {
  id: 'timeline',
  kind: 'choice',
  title: 'When do you need this live?',
  help: 'Compressed timelines mean more people working in parallel, which costs more than the same work spread out.',
  options: [
    { id: 'flexible', label: 'No fixed date', hint: 'Scheduled into normal capacity', mult: 0.95 },
    { id: 'standard', label: 'Next quarter', hint: 'The usual case', mult: 1 },
    { id: 'expedited', label: 'Within 6 weeks', hint: 'Additional people in parallel', mult: 1.25 },
    { id: 'urgent', label: 'Within 3 weeks', hint: 'Dedicated team, other work displaced', mult: 1.5 },
  ],
};

const COMPLIANCE_QUESTION: EstimatorQuestion = {
  id: 'compliance',
  kind: 'choice',
  title: 'Any compliance obligations?',
  help: 'This changes the evidence we produce alongside the work.',
  options: [
    { id: 'none', label: 'None specific', mult: 1 },
    { id: 'iso', label: 'ISO 27001 or SOC 2', mult: 1.2 },
    { id: 'health', label: 'HIPAA or patient data', mult: 1.28 },
    { id: 'finance', label: 'Financial or PCI DSS', mult: 1.35 },
    { id: 'nca', label: 'NCA ECC (Saudi Arabia)', mult: 1.3 },
  ],
};

export const SERVICES: EstimatorService[] = [
  {
    id: 'product-design',
    title: 'Product Design & UI/UX',
    blurb: 'Research, interface design and a design system your engineers can build from.',
    base: 5500,
    recurring: false,
    leadTime: 'Typically 4 to 10 weeks',
    questions: [
      {
        id: 'screens',
        kind: 'counter',
        title: 'Roughly how many distinct screens?',
        help: 'A rough count is fine. This is the biggest single driver of design effort.',
        min: 3,
        max: 200,
        step: 1,
        initial: 16,
        unit: 'screen',
        unitPlural: 'screens',
        perUnit: 420,
      },
      {
        id: 'research',
        kind: 'choice',
        title: 'How much research is needed?',
        options: [
          { id: 'none', label: 'We know our users well', hint: 'Straight to design', mult: 0.85 },
          { id: 'light', label: 'Some validation', hint: 'A handful of interviews and a review', mult: 1 },
          { id: 'deep', label: 'Full discovery', hint: 'Interviews, analytics, usability testing', mult: 1.45 },
        ],
      },
      {
        id: 'starting',
        kind: 'choice',
        title: 'Where are you starting from?',
        options: [
          { id: 'system', label: 'We have a design system', mult: 0.8 },
          { id: 'brand', label: 'We have a brand, not a system', mult: 1 },
          { id: 'nothing', label: 'We need brand and system too', mult: 1.4 },
        ],
      },
      {
        id: 'extras',
        kind: 'multi',
        title: 'Anything else in scope?',
        options: [
          { id: 'system', label: 'Documented component library', add: 4800 },
          { id: 'brand', label: 'Brand identity and guidelines', add: 6500 },
          { id: 'testing', label: 'Moderated usability testing', add: 3400 },
          { id: 'a11y', label: 'Accessibility audit to WCAG 2.2 AA', add: 3000 },
        ],
      },
    ],
  },
  {
    id: 'saas-development',
    title: 'SaaS Product Development',
    blurb: 'Multi-tenant platforms with billing, roles and onboarding built in.',
    base: 14000,
    recurring: false,
    leadTime: 'Typically 3 to 8 months',
    questions: [
      {
        id: 'screens',
        kind: 'counter',
        title: 'Roughly how many distinct screens?',
        help: 'Including the admin side, which teams routinely forget to count.',
        min: 5,
        max: 250,
        step: 1,
        initial: 24,
        unit: 'screen',
        unitPlural: 'screens',
        perUnit: 900,
      },
      {
        id: 'stage',
        kind: 'choice',
        title: 'What stage are you at?',
        options: [
          { id: 'mvp', label: 'MVP, first release', hint: 'Narrow scope, proving one thing', mult: 0.75 },
          { id: 'v2', label: 'Rebuilding an existing product', mult: 1.1 },
          { id: 'scale', label: 'Scaling a live product', hint: 'Existing customers to protect', mult: 1.35 },
        ],
      },
      {
        id: 'tenancy',
        kind: 'choice',
        title: 'What tenancy model do you need?',
        help: 'The decision that is most expensive to change later.',
        options: [
          { id: 'single', label: 'Single tenant', hint: 'One customer per deployment', mult: 0.9 },
          { id: 'shared', label: 'Shared multi-tenant', hint: 'The common SaaS case', mult: 1 },
          { id: 'isolated', label: 'Isolated per customer', hint: 'Enterprise or regulated buyers', mult: 1.4 },
        ],
      },
      {
        id: 'integrations',
        kind: 'counter',
        title: 'How many systems does it integrate with?',
        min: 0,
        max: 40,
        step: 1,
        initial: 3,
        unit: 'integration',
        unitPlural: 'integrations',
        perUnit: 1400,
      },
      {
        id: 'extras',
        kind: 'multi',
        title: 'Which of these does it need?',
        options: [
          { id: 'billing', label: 'Subscription billing and entitlements', add: 5500 },
          { id: 'sso', label: 'SSO and enterprise identity', add: 4200 },
          { id: 'mobile', label: 'A companion mobile app', add: 9000 },
          { id: 'ai', label: 'AI or model-backed features', add: 7000 },
          { id: 'analytics', label: 'Customer-facing analytics', add: 5000 },
        ],
      },
    ],
  },
  {
    id: 'crm-erp',
    title: 'CRM & ERP Solutions',
    blurb: 'Custom or platform-based systems shaped to your process.',
    base: 12000,
    recurring: false,
    leadTime: 'Typically 3 to 6 months',
    questions: [
      {
        id: 'users',
        kind: 'counter',
        title: 'How many people will use it?',
        min: 5,
        max: 5000,
        step: 5,
        initial: 60,
        unit: 'user',
        unitPlural: 'users',
        perUnit: 55,
      },
      {
        id: 'approach',
        kind: 'choice',
        title: 'Platform or custom build?',
        options: [
          { id: 'platform', label: 'Implement a platform', hint: 'Odoo, Salesforce, Dynamics', mult: 0.85 },
          { id: 'extend', label: 'Extend what we already run', mult: 1 },
          { id: 'custom', label: 'Custom build', hint: 'The process is our advantage', mult: 1.5 },
        ],
      },
      {
        id: 'modules',
        kind: 'multi',
        title: 'Which areas are in scope?',
        options: [
          { id: 'crm', label: 'Sales and CRM', add: 3800 },
          { id: 'inventory', label: 'Inventory and warehouse', add: 5200 },
          { id: 'finance', label: 'Finance and invoicing', add: 5800 },
          { id: 'hr', label: 'HR and payroll', add: 4600 },
          { id: 'projects', label: 'Project and resource management', add: 4200 },
          { id: 'reporting', label: 'Reporting and dashboards', add: 3600 },
        ],
      },
      {
        id: 'migration',
        kind: 'choice',
        title: 'How much data has to move?',
        options: [
          { id: 'none', label: 'Starting fresh', mult: 1 },
          { id: 'some', label: 'One system to migrate', mult: 1.15 },
          { id: 'lots', label: 'Several systems to consolidate', mult: 1.45 },
        ],
      },
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI & Business Automation',
    blurb: 'Applied AI and workflow automation that removes measurable manual work.',
    base: 6500,
    recurring: false,
    leadTime: 'Assessment in 2 to 4 weeks',
    questions: [
      {
        id: 'processes',
        kind: 'counter',
        title: 'How many processes are in scope?',
        help: 'A process is one repeated task with a clear start and end.',
        min: 1,
        max: 40,
        step: 1,
        initial: 3,
        unit: 'process',
        unitPlural: 'processes',
        perUnit: 2600,
      },
      {
        id: 'scope',
        kind: 'choice',
        title: 'How far should we take it?',
        options: [
          { id: 'assess', label: 'Assessment only', hint: 'Findings and a ranked plan', mult: 1 },
          { id: 'build', label: 'Assessment and build', hint: 'We implement what we find', mult: 2.2 },
          { id: 'operate', label: 'Build and ongoing tuning', mult: 2.9 },
        ],
      },
      {
        id: 'data',
        kind: 'choice',
        title: 'What state is the data in?',
        options: [
          { id: 'clean', label: 'Structured and accessible', mult: 0.9 },
          { id: 'mixed', label: 'Mostly structured, some gaps', mult: 1 },
          { id: 'messy', label: 'Scattered across systems and documents', mult: 1.4 },
        ],
      },
      {
        id: 'extras',
        kind: 'multi',
        title: 'Which capabilities are needed?',
        options: [
          { id: 'extraction', label: 'Document and data extraction', add: 5200 },
          { id: 'chat', label: 'Assisted search or chat over your data', add: 6800 },
          { id: 'classify', label: 'Classification and routing', add: 4400 },
          { id: 'forecast', label: 'Forecasting or scoring', add: 6000 },
        ],
      },
    ],
  },
  {
    id: 'web-mobile',
    title: 'Web & Mobile Development',
    blurb: 'Applications that load fast, scale and stay maintainable.',
    base: 7500,
    recurring: false,
    leadTime: 'Typically 6 to 16 weeks',
    questions: [
      {
        id: 'templates',
        kind: 'counter',
        title: 'How many page templates or screens?',
        help: 'Templates, not pages. Fifty blog posts share one template.',
        min: 1,
        max: 120,
        step: 1,
        initial: 10,
        unit: 'template',
        unitPlural: 'templates',
        perUnit: 620,
      },
      {
        id: 'platform',
        kind: 'choice',
        title: 'What are we building?',
        options: [
          { id: 'web', label: 'Web only', mult: 1 },
          { id: 'responsive', label: 'Web plus a mobile web app', mult: 1.25 },
          { id: 'native', label: 'Web plus native mobile apps', mult: 1.85 },
        ],
      },
      {
        id: 'design',
        kind: 'choice',
        title: 'Where are you with design?',
        options: [
          { id: 'ready', label: 'Designs are build-ready', mult: 0.8 },
          { id: 'brand', label: 'We have a brand, not designs', mult: 1 },
          { id: 'full', label: 'We need design too', mult: 1.35 },
        ],
      },
      {
        id: 'extras',
        kind: 'multi',
        title: 'Anything else?',
        options: [
          { id: 'cms', label: 'A CMS your team can edit', add: 2800 },
          { id: 'ecommerce', label: 'Ecommerce and checkout', add: 6500 },
          { id: 'i18n', label: 'Multiple languages', add: 3200 },
          { id: 'migration', label: 'Content migration', add: 2400 },
        ],
      },
    ],
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    blurb: 'Custom software, MVPs and systems integration.',
    base: 3500,
    recurring: false,
    leadTime: 'Discovery in 2 to 3 weeks',
    questions: [
      {
        id: 'kind',
        kind: 'choice',
        title: 'What are we building?',
        options: [
          { id: 'internal', label: 'An internal tool', hint: 'Used by your own team', mult: 1 },
          { id: 'customer', label: 'A customer-facing product', mult: 1.6 },
          { id: 'platform', label: 'A multi-sided platform', mult: 2.2 },
        ],
      },
      {
        id: 'screens',
        kind: 'counter',
        title: 'Roughly how many distinct screens?',
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
    id: 'security-compliance',
    title: 'Security & Compliance',
    blurb: 'Testing, hardening and compliance work that survives an audit.',
    base: 6500,
    recurring: false,
    leadTime: 'Assessment in 2 to 4 weeks',
    questions: [
      {
        id: 'apps',
        kind: 'counter',
        title: 'How many applications are in scope?',
        min: 1,
        max: 60,
        step: 1,
        initial: 2,
        unit: 'application',
        unitPlural: 'applications',
        perUnit: 2400,
      },
      {
        id: 'scope',
        kind: 'choice',
        title: 'How far should we take it?',
        options: [
          { id: 'test', label: 'Testing only', hint: 'Findings and a ranked plan', mult: 1 },
          { id: 'remediate', label: 'Testing and remediation', hint: 'We fix what we find', mult: 2.1 },
          { id: 'ongoing', label: 'Remediation and ongoing review', mult: 2.8 },
        ],
      },
      COMPLIANCE_QUESTION,
      {
        id: 'extras',
        kind: 'multi',
        title: 'Anything else in scope?',
        options: [
          { id: 'pentest', label: 'External penetration test', add: 7500 },
          { id: 'phishing', label: 'Phishing simulation and training', add: 2800 },
          { id: 'tabletop', label: 'Incident response rehearsal', add: 3500 },
          { id: 'evidence', label: 'Audit evidence pack', add: 4200 },
        ],
      },
    ],
  },
];
