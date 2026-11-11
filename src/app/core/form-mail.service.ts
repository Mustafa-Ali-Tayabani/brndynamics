import { Injectable } from '@angular/core';
import { COMPANY } from '../data/site.data';

/**
 * Delivers a form to the team inbox through FormSubmit (formsubmit.co), a
 * hosted form-to-email service, so a submission does not depend on the visitor
 * having a mail app configured.
 *
 * One-time setup: the first submission to a new address makes FormSubmit send
 * an "Activate Form" email to that inbox. Until someone clicks it, nothing is
 * delivered and `send` resolves false.
 *
 * To move to another provider or to our own endpoint, change this file only.
 */
@Injectable({ providedIn: 'root' })
export class FormMailService {
  private readonly endpoint = `https://formsubmit.co/ajax/${COMPANY.email}`;

  /**
   * @param subject  Subject line of the email the team receives.
   * @param fields   Label to value, shown as a table in the email. An `email`
   *                 key becomes the reply-to address.
   * @returns true only when the service confirms it accepted the message.
   */
  async send(subject: string, fields: Record<string, string>): Promise<boolean> {
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: subject, _template: 'table', ...fields }),
      });
      if (!res.ok) return false;
      const data: { success?: boolean | string } = await res.json();
      return data.success === true || data.success === 'true';
    } catch {
      return false;
    }
  }
}
