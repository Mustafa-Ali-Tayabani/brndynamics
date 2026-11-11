import nodemailer from 'nodemailer';

/**
 * Sends a Fixify trial request to the team inbox over SMTP.
 *
 * Shared by the Express server (src/server.ts, used by `ng serve` and the SSR
 * build) and the Vercel function (api/trial.ts), so both behave the same.
 *
 * Configuration comes from environment variables, never from code:
 *
 *   SMTP_HOST   required  e.g. smtp.example.com
 *   SMTP_PORT   optional  default 587 (465 switches to implicit TLS)
 *   SMTP_USER   required
 *   SMTP_PASS   required
 *   MAIL_FROM   optional  default SMTP_USER
 *   MAIL_TO     optional  default hello@brndynamics.com
 */

export interface TrialMailResult {
  status: number;
  ok: boolean;
  error?: string;
}

const DEFAULT_TO = 'hello@brndynamics.com';
const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

/** One line, trimmed and capped: nothing a visitor types can add mail headers. */
function clean(value: unknown, max: number): string {
  return typeof value === 'string'
    ? value.replace(/[\r\n\t]+/g, ' ').trim().slice(0, max)
    : '';
}

export async function sendTrialMail(input: unknown): Promise<TrialMailResult> {
  const body = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;

  // Honeypot: real visitors never fill this. Pretend it worked.
  if (clean(body['company'], 200)) return { status: 200, ok: true };

  const email = clean(body['email'], 254);
  const site = clean(body['site'], 300);
  const name = clean(body['name'], 120);
  const plan = clean(body['plan'], 60);

  if (!EMAIL.test(email) || !site) {
    return { status: 400, ok: false, error: 'invalid' };
  }

  const host = process.env['SMTP_HOST'];
  const user = process.env['SMTP_USER'];
  const pass = process.env['SMTP_PASS'];
  if (!host || !user || !pass) {
    return { status: 503, ok: false, error: 'not_configured' };
  }

  const port = Number(process.env['SMTP_PORT']) || 587;

  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 10000,
    });

    await transport.sendMail({
      from: process.env['MAIL_FROM'] || user,
      to: process.env['MAIL_TO'] || DEFAULT_TO,
      replyTo: email,
      subject: `Fixify free trial: ${site}`,
      text: [
        'New Fixify free trial request',
        '',
        `Account email: ${email}`,
        `Website: ${site}`,
        `Name: ${name || 'Not given'}`,
        `Plan after trial: ${plan || 'Not given'}`,
        '',
        'Create the account and email the login to the address above.',
      ].join('\n'),
    });

    return { status: 200, ok: true };
  } catch (err) {
    console.error('Trial mail failed:', err instanceof Error ? err.message : err);
    return { status: 502, ok: false, error: 'send_failed' };
  }
}
