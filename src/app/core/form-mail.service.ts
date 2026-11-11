import { Injectable } from '@angular/core';

/**
 * Sends the Fixify trial form to our own endpoint, which emails the team over
 * SMTP (see src/server/trial-mail.ts). Nothing here depends on the visitor
 * having a mail app configured.
 */
@Injectable({ providedIn: 'root' })
export class FormMailService {
  /** @returns true only when the server confirms the email was sent. */
  async sendTrial(fields: {
    email: string;
    site: string;
    name: string;
    plan: string;
    company: string;
  }): Promise<boolean> {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    try {
      const res = await fetch('/api/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
        signal: ctrl.signal,
      });
      if (!res.ok) return false;
      const data: { ok?: boolean } = await res.json();
      return data.ok === true;
    } catch {
      return false;
    } finally {
      clearTimeout(timer);
    }
  }
}
