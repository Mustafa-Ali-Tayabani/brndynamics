import { Injectable } from '@angular/core';

/**
 * Access key for Web3Forms (web3forms.com), the hosted form-to-email service
 * that delivers form submissions to the team inbox. Create one free at
 * web3forms.com with the inbox that should receive sign-ups; the key arrives
 * by email. It is a public key and is safe to ship in client code.
 *
 * While this is null nothing can be sent automatically, `send` resolves
 * false, and forms fall back to a prefilled email.
 */
export const WEB3FORMS_ACCESS_KEY: string | null = null;

/**
 * Delivers a form to the team inbox without relying on the visitor having a
 * mail app configured. To move to another provider or to our own endpoint,
 * change this file only.
 */
@Injectable({ providedIn: 'root' })
export class FormMailService {
  private readonly endpoint = 'https://api.web3forms.com/submit';

  /** False until an access key is configured. */
  readonly configured = WEB3FORMS_ACCESS_KEY !== null;

  /**
   * @param subject  Subject line of the email the team receives.
   * @param fields   Label to value, listed in the email. An `email` key
   *                 becomes the reply-to address.
   * @returns true only when the service confirms it accepted the message.
   */
  async send(subject: string, fields: Record<string, string>): Promise<boolean> {
    if (!WEB3FORMS_ACCESS_KEY) return false;

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, subject, ...fields }),
        signal: ctrl.signal,
      });
      if (!res.ok) return false;
      const data: { success?: boolean } = await res.json();
      return data.success === true;
    } catch {
      return false;
    } finally {
      clearTimeout(timer);
    }
  }
}
