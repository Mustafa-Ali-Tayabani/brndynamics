import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CAPABILITIES, COMPANY, FAQ, OFFICES } from '../../data/site.data';
import { SeoService } from '../../core/seo.service';
import { PageHero } from '../../ui/page-hero/page-hero';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';
import { LocalTime } from '../../ui/local-time/local-time';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, PageHero, ScrollRevealDirective, LocalTime],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly company = COMPANY;
  protected readonly capabilities = CAPABILITIES;
  protected readonly faq = FAQ;
  protected readonly offices = OFFICES;

  protected readonly openFaq = signal(-1);
  protected readonly submitted = signal(false);

  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    organisation: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    interest: ['managed-services'],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  protected readonly budgets = [
    'Under $10k',
    '$10k – $50k',
    '$50k – $250k',
    '$250k+',
    'Retainer / managed service',
  ];

  protected toggleFaq(i: number): void {
    this.openFaq.update((current) => (current === i ? -1 : i));
  }

  protected invalid(control: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || this.submitted());
  }

  /**
   * There is no backend yet, so submission composes a prefilled message to the
   * team inbox. Swap this for an HTTP POST once an endpoint exists — the form
   * value shape is already what the API should receive.
   */
  protected submit(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    const discipline =
      this.capabilities.find((c) => c.id === v.interest)?.title ?? 'General enquiry';

    const body = [
      `Name: ${v.name}`,
      `Organisation: ${v.organisation || '—'}`,
      `Email: ${v.email}`,
      `Phone: ${v.phone || '—'}`,
      `Interest: ${discipline}`,
      '',
      v.message,
    ].join('\n');

    const href =
      `mailto:${COMPANY.email}` +
      `?subject=${encodeURIComponent(`New enquiry — ${discipline}`)}` +
      `&body=${encodeURIComponent(body)}`;

    if (typeof window !== 'undefined') window.location.href = href;
  }

  constructor() {
    inject(SeoService).apply({
      title: 'Contact',
      description:
        'Talk to a BrnDynamics engineer. Mean first response under 60 minutes, 24/7 coverage. Book a technical audit or call +92 324 923 5848.',
      path: '/contact',
    });
  }
}
