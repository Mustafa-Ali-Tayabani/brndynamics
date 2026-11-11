/**
 * Content and commercial settings for the Fixify product page.
 *
 * Plans, prices and limits follow the "Fixify Subscription Plans & Free Trial"
 * spec (5 Nov 2026). In the product these values are fields on the plan that an
 * admin can change without a release, so when they change there, change them
 * here too.
 *
 * Two addresses switch the page from "request by email" to self-serve:
 *
 *   signupUrl  Where a new customer creates an account and starts the trial.
 *              While null, the form composes a trial request to the team inbox,
 *              the same way the contact form does. Once set, the form sends the
 *              visitor there with email, site, plan and interval as query
 *              parameters.
 *
 *   appUrl     Where an existing customer signs in. Null hides the link.
 *
 * Payment is not taken on this site. Per the spec the customer picks a plan
 * inside Fixify and pays through Stripe Checkout from there.
 *
 * House style: no em dashes anywhere in user-facing copy.
 */

export type BillingCycle = 'monthly' | 'annual';

export interface FixifyPlan {
  id: 'starter' | 'pro' | 'business';
  name: string;
  audience: string;
  /** USD per month. */
  monthly: number;
  /** USD per year. */
  annual: number;
  features: string[];
  featured?: boolean;
}

export const FIXIFY = {
  name: 'Fixify',
  currency: '$',
  trialDays: 14,
  /** Sign-up address of the Fixify app, e.g. 'https://app.example.com/signup'. */
  signupUrl: null as string | null,
  /** Sign-in address of the Fixify app. */
  appUrl: null as string | null,
  logo: {
    src: '/work/fixify/logo.png',
    srcDark: '/work/fixify/logo-dark.png',
    alt: 'Fixify',
  },
  shot: {
    src: '/work/fixify/hero.webp',
    alt: 'Fixify dashboard showing website health, performance, accessibility, best practice and SEO scores, security checks and AI insights across managed sites',
  },
  caseSlug: 'fixify-wordpress-care',
} as const;

export const FIXIFY_PLANS: FixifyPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    audience: 'For one site that needs to be watched.',
    monthly: 20,
    annual: 200,
    features: [
      '1 website',
      'Weekly performance and security scans',
      'Monthly SEO scan',
      'Uptime checks every 15 minutes',
      'AI Insights',
      '2 support tickets a month, 48 hour response target',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    audience: 'For sites that have to stay fast, secure and ranking.',
    monthly: 50,
    annual: 500,
    features: [
      '3 websites',
      'Daily performance and security scans',
      'Weekly SEO scan, plus on-demand re-scans',
      'Uptime checks every 5 minutes',
      'Update alerts and monthly automated plugin updates',
      '30 Ask AI questions a month',
      '5 support tickets a month, 24 hour response target',
      '1 hour of fix time included each month',
      'Monthly reports',
    ],
    featured: true,
  },
  {
    id: 'business',
    name: 'Business',
    audience: 'For teams running several sites that cannot go down.',
    monthly: 100,
    annual: 1000,
    features: [
      '10 websites',
      'Daily performance, security and SEO scans',
      'Uptime checks every minute',
      'Weekly and custom automation processes',
      'Unlimited Ask AI questions',
      'Unlimited support tickets (fair use), 4 hour response target',
      '3 hours of fix time included each month',
      'Monthly reports with export',
    ],
  },
];

/** A cell is text, or true / false for included / not included. */
export type CompareValue = string | boolean;

export interface CompareGroup {
  label: string;
  /** Values are in plan order: Starter, Pro, Business. */
  rows: { label: string; values: [CompareValue, CompareValue, CompareValue] }[];
}

export const FIXIFY_COMPARE: CompareGroup[] = [
  {
    label: 'Sites',
    rows: [
      { label: 'Websites included', values: ['1', '3', '10'] },
      { label: 'Extra website', values: [false, '$12 / month', '$8 / month'] },
    ],
  },
  {
    label: 'Monitoring',
    rows: [
      { label: 'Performance and security scans', values: ['Weekly', 'Daily', 'Daily'] },
      { label: 'SEO scan', values: ['Monthly', 'Weekly', 'Daily'] },
      { label: 'On-demand re-scan', values: [false, true, true] },
      { label: 'Uptime check interval', values: ['15 min', '5 min', '1 min'] },
      { label: 'Monitored endpoints per site', values: ['1', '3', '10'] },
    ],
  },
  {
    label: 'WordPress',
    rows: [
      { label: 'Plugins, core and theme overview', values: [true, true, true] },
      { label: 'Update alerts', values: [false, true, true] },
      { label: 'Automation processes', values: [false, 'Monthly plugin updates', 'Weekly and custom'] },
    ],
  },
  {
    label: 'AI',
    rows: [
      { label: 'AI Insights', values: [true, true, true] },
      { label: 'Ask AI questions', values: [false, '30 / month', 'Unlimited'] },
    ],
  },
  {
    label: 'Support',
    rows: [
      { label: 'Support tickets', values: ['2 / month', '5 / month', 'Unlimited'] },
      { label: 'Response target', values: ['48 hours', '24 hours', '4 hours'] },
      { label: 'Included fix time', values: [false, '1 hour / month', '3 hours / month'] },
    ],
  },
  {
    label: 'Reporting',
    rows: [
      { label: 'Monthly reports', values: [false, true, true] },
      { label: 'Export', values: [false, false, true] },
    ],
  },
];

export const FIXIFY_STEPS: { title: string; body: string }[] = [
  {
    title: 'Start your free trial',
    body: 'Enter your email address and the address of your WordPress site. No card is required.',
  },
  {
    title: 'Get your login by email',
    body: 'Your Fixify login is sent to that email address. There is no sales call to sit through first.',
  },
  {
    title: 'Connect your site',
    body: 'Sign in, add your WordPress site and the first scan runs. You get 14 days on the Pro plan.',
  },
  {
    title: 'Choose a plan',
    body: 'Pick Starter, Pro or Business at any point in the trial and pay by card. Billing starts that day.',
  },
];

export const FIXIFY_DASHBOARD: { title: string; body: string }[] = [
  {
    title: 'Performance',
    body: 'Scheduled scans of how fast each site loads, with the score tracked over time.',
  },
  {
    title: 'Security',
    body: 'Scheduled security scans, so a problem is found by the platform before a customer reports it.',
  },
  {
    title: 'SEO',
    body: 'Regular SEO scans with the issues behind the score listed, not just the number.',
  },
  {
    title: 'Uptime',
    body: 'Your site is checked as often as every minute, across the endpoints that matter to you.',
  },
  {
    title: 'WordPress management',
    body: 'Plugins, core and theme in one view, with update alerts and automated plugin updates on Pro and Business.',
  },
  {
    title: 'AI Insights and tickets',
    body: 'Plain-language insights on every plan, Ask AI for questions, and tickets when you want our team to fix something.',
  },
];

export const FIXIFY_FAQ: { q: string; a: string }[] = [
  {
    q: 'Do I need a card to start the trial?',
    a: 'No. Every new account starts on a 14-day Pro trial with no card required.',
  },
  {
    q: 'What is included in the trial?',
    a: 'The Pro plan limits, with one support ticket and no included fix time. There is one trial per email address and per site domain.',
  },
  {
    q: 'What happens when the trial ends?',
    a: 'If you have not chosen a plan by day 14 the account becomes read-only. You can still see your dashboard and past data, but scans, uptime checks, alerts and new tickets stop. Your data is kept for 30 days, and paying for any plan in that time restores everything.',
  },
  {
    q: 'Can I pay annually?',
    a: 'Yes. Annual billing costs ten months, so you get two months free: $200, $500 or $1,000 a year.',
  },
  {
    q: 'What if I have more sites than my plan includes?',
    a: 'On Pro you can add extra sites for $12 a month each, and on Business for $8 a month each. Starter covers one site.',
  },
  {
    q: 'What if a fix takes longer than my included time?',
    a: 'Fix time beyond the hours included in your plan is billed at $40 an hour.',
  },
  {
    q: 'Can I change plan or cancel?',
    a: 'Yes. Upgrades apply immediately, downgrades apply at the end of the billing period, and if you cancel you keep access until the period you have paid for ends.',
  },
];
