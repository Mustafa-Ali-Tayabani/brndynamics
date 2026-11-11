import nodemailer from 'nodemailer';

/**
 * Sends a Fixify trial request to the team inbox over SMTP.
 *
 * This file is plain JavaScript on purpose: Vercel runs it directly as the
 * serverless function for POST /api/trial, with no TypeScript compile step to
 * get wrong. The Express server (src/server.ts, used by `ng serve` and the
 * SSR build) imports `sendTrialMail` from here, so both behave the same.
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

const DEFAULT_TO = 'hello@brndynamics.com';
const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

/** One line, trimmed and capped: nothing a visitor types can add mail headers. */
function clean(value, max) {
  return typeof value === 'string'
    ? value.replace(/[\r\n\t]+/g, ' ').trim().slice(0, max)
    : '';
}

/**
 * @param {unknown} input  Parsed JSON body: email, site, name, plan, company.
 * @returns {Promise<{ status: number, ok: boolean, error?: string }>}
 */
export async function sendTrialMail(input) {
  const body = input && typeof input === 'object' ? input : {};

  // Honeypot: real visitors never fill this. Pretend it worked.
  if (clean(body.company, 200)) return { status: 200, ok: true };

  const email = clean(body.email, 254);
  const site = clean(body.site, 300);
  const name = clean(body.name, 120);
  const plan = clean(body.plan, 60);

  if (!EMAIL.test(email) || !site) {
    return { status: 400, ok: false, error: 'invalid' };
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    return { status: 503, ok: false, error: 'not_configured' };
  }

  const port = Number(process.env.SMTP_PORT) || 587;

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
      from: process.env.MAIL_FROM || user,
      to: process.env.MAIL_TO || DEFAULT_TO,
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

/** Vercel serverless function. Vercel parses a JSON body onto `req.body`. */
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end(JSON.stringify({ ok: false, error: 'method_not_allowed' }));
    return;
  }

  const result = await sendTrialMail(req.body);
  res.statusCode = result.status;
  res.end(JSON.stringify({ ok: result.ok, error: result.error }));
}
