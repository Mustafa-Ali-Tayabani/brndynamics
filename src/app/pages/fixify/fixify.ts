import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../data/site.data';
import {
  BillingCycle,
  FIXIFY,
  FIXIFY_COMPARE,
  FIXIFY_DASHBOARD,
  FIXIFY_FAQ,
  FIXIFY_PLANS,
  FIXIFY_STEPS,
  FixifyPlan,
} from '../../data/fixify.data';
import { SeoService, SITE_URL } from '../../core/seo.service';
import { FormMailService } from '../../core/form-mail.service';
import { PageHero } from '../../ui/page-hero/page-hero';
import { SectionHead } from '../../ui/section-head/section-head';
import { CaseLogo } from '../../ui/case-logo/case-logo';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';

@Component({
  selector: 'app-fixify',
  imports: [ReactiveFormsModule, RouterLink, PageHero, SectionHead, CaseLogo, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fixify.html',
  styleUrl: './fixify.scss',
})
export class Fixify {
  protected readonly company = COMPANY;
  protected readonly product = FIXIFY;
  protected readonly plans = FIXIFY_PLANS;
  protected readonly steps = FIXIFY_STEPS;
  protected readonly dashboard = FIXIFY_DASHBOARD;
  protected readonly faq = FIXIFY_FAQ;

  protected readonly compare = FIXIFY_COMPARE;

  protected readonly cycle = signal<BillingCycle>('monthly');
  protected readonly planId = signal<string>(
    FIXIFY_PLANS.find((p) => p.featured)?.id ?? FIXIFY_PLANS[0].id,
  );
  protected readonly submitted = signal(false);
  protected readonly state = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');
  protected readonly sentTo = signal('');
  /** Prefilled email for the visitor to send themselves if delivery fails. */
  protected readonly fallbackHref = signal('');

  protected readonly selected = computed<FixifyPlan>(
    () => this.plans.find((p) => p.id === this.planId()) ?? this.plans[0],
  );

  private readonly fb = inject(FormBuilder);
  private readonly mail = inject(FormMailService);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    site: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+(\/\S*)?$/i)]],
    name: [''],
    company: [''],
  });

  protected price(plan: FixifyPlan): string {
    return `${FIXIFY.currency}${plan[this.cycle()].toLocaleString('en-US')}`;
  }

  protected choose(plan: FixifyPlan): void {
    this.planId.set(plan.id);
    if (typeof document !== 'undefined') {
      document.getElementById('start')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  protected invalid(control: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || this.submitted());
  }

  /**
   * With a sign-up address configured the visitor goes straight to the Fixify
   * app, which creates the account, starts the trial and emails the login.
   * Until then the request is delivered to the team inbox by FormMailService
   * and the team sets the account up by hand.
   */
  protected async submit(): Promise<void> {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (typeof window === 'undefined' || this.state() === 'sending') return;

    const v = this.form.getRawValue();
    const plan = this.selected();
    const cycle = this.cycle();

    if (FIXIFY.signupUrl) {
      const url = new URL(FIXIFY.signupUrl);
      url.searchParams.set('email', v.email);
      url.searchParams.set('site', v.site);
      url.searchParams.set('plan', plan.id);
      url.searchParams.set('interval', cycle === 'annual' ? 'year' : 'month');
      if (v.name) url.searchParams.set('name', v.name);
      window.location.href = url.toString();
      return;
    }

    const planLine = `${plan.name} (${cycle})`;
    this.fallbackHref.set(
      `mailto:${COMPANY.email}` +
        `?subject=${encodeURIComponent(`Fixify free trial: ${v.site}`)}` +
        `&body=${encodeURIComponent(
          [
            `Account email: ${v.email}`,
            `Website: ${v.site}`,
            `Name: ${v.name || 'Not given'}`,
            `Plan after trial: ${planLine}`,
          ].join('\n'),
        )}`,
    );

    this.state.set('sending');
    const ok = await this.mail.sendTrial({
      email: v.email,
      site: v.site,
      name: v.name,
      plan: planLine,
      company: v.company,
    });
    this.sentTo.set(v.email);
    this.state.set(ok ? 'sent' : 'error');
  }

  constructor() {
    const seo = inject(SeoService);
    const description =
      'Fixify is a WordPress maintenance platform. Performance, security, SEO and uptime monitoring with a team that fixes what it finds. Plans from $20 a month, with a 14-day free trial and no card required.';

    seo.apply({ title: 'Fixify: WordPress maintenance platform', description, path: '/fixify' });
    seo.setJsonLd('ld-page', {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: FIXIFY.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description,
      url: `${SITE_URL}/fixify`,
      offers: FIXIFY_PLANS.map((p) => ({
        '@type': 'Offer',
        name: p.name,
        price: String(p.monthly),
        priceCurrency: 'USD',
      })),
      publisher: { '@type': 'Organization', name: COMPANY.name, url: SITE_URL },
    });
  }
}
