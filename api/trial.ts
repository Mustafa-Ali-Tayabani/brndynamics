import type { IncomingMessage, ServerResponse } from 'node:http';
import { sendTrialMail } from '../src/server/trial-mail';

/**
 * Vercel serverless function: POST /api/trial
 * Vercel parses a JSON request body onto `req.body` before this runs.
 */
export default async function handler(
  req: IncomingMessage & { body?: unknown },
  res: ServerResponse,
): Promise<void> {
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
