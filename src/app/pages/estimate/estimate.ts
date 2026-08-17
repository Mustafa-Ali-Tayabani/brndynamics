import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  BUDGET_QUESTION,
  EstimatorOption,
  EstimatorQuestion,
  EstimatorService,
  SERVICES,
  TIMELINE_QUESTION,
} from '../../data/estimator.data';
import { COMPANY } from '../../data/site.data';
import { SeoService } from '../../core/seo.service';
import { MagneticDirective } from '../../core/magnetic.directive';

type AnswerValue = string | string[] | number;

/**
 * Project brief.
 *
 * Deliberately shows no price. The prospect scopes the work and states their
 * own budget range; BrnDynamics reviews the brief and replies with a figure.
 * A quote should be a considered response rather than a formula run by a form,
 * and asking for budget up front stops us designing something unfundable.
 */
@Component({
  selector: 'app-estimate',
  imports: [ReactiveFormsModule, RouterLink, MagneticDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './estimate.html',
  styleUrl: './estimate.scss',
})
export class Estimate {
  protected readonly services = SERVICES;
  protected readonly company = COMPANY;

  /* ---------------------------------------------------------------- state */

  protected readonly serviceId = signal<string | null>(null);
  protected readonly stepIndex = signal(0);
  protected readonly answers = signal<Record<string, AnswerValue>>({});
  protected readonly submitted = signal(false);
  protected readonly sent = signal(false);

  private readonly fb = inject(FormBuilder);

  protected readonly contact = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    organisation: [''],
    email: ['', [Validators.required, Validators.email]],
    notes: [''],
  });

  /* ------------------------------------------------------------- derived */

  protected readonly service = computed<EstimatorService | null>(
    () => this.services.find((s) => s.id === this.serviceId()) ?? null,
  );

  /** Service questions, then the two asked on every flow. */
  protected readonly questions = computed<EstimatorQuestion[]>(() => {
    const svc = this.service();
    return svc ? [...svc.questions, TIMELINE_QUESTION, BUDGET_QUESTION] : [];
  });

  /** 0 = pick a service, 1..n = questions, n+1 = contact, n+2 = confirmation. */
  protected readonly totalSteps = computed(() => this.questions().length + 3);

  protected readonly progress = computed(() =>
    Math.round((this.stepIndex() / (this.totalSteps() - 1)) * 100),
  );

  protected readonly currentQuestion = computed<EstimatorQuestion | null>(() => {
    const i = this.stepIndex() - 1;
    const list = this.questions();
    return i >= 0 && i < list.length ? list[i] : null;
  });

  protected readonly onContactStep = computed(
    () => this.stepIndex() === this.questions().length + 1,
  );

  protected readonly onResultStep = computed(
    () => this.stepIndex() === this.questions().length + 2,
  );

  /** Everything answered so far, for the summary rail and the final review. */
  protected readonly summary = computed(() =>
    this.questions()
      .map((q, i) => ({ q, i }))
      .filter(({ q }) => this.answers()[q.id] !== undefined)
      .map(({ q, i }) => ({ step: i + 1, title: q.title, value: this.readable(q) })),
  );

  protected readonly canAdvance = computed(() => {
    if (this.stepIndex() === 0) return !!this.serviceId();
    const q = this.currentQuestion();
    if (!q) return true;
    // Multi-selects are legitimately allowed to be empty.
    if (q.kind === 'multi') return true;
    return this.answers()[q.id] !== undefined;
  });

  constructor() {
    inject(SeoService).apply({
      title: 'Project Brief',
      description:
        'Tell us about your project in about two minutes: product design, SaaS, CRM and ERP, AI and automation, web and mobile, engineering or security. We reply with a scope and a price.',
      path: '/estimate',
    });
  }

  /* --------------------------------------------------------------- input */

  protected pickService(id: string): void {
    this.serviceId.set(id);
    // Seed counters and multi-selects so the summary is never half-empty.
    const svc = this.services.find((s) => s.id === id);
    const seeded: Record<string, AnswerValue> = {};
    for (const q of svc?.questions ?? []) {
      if (q.kind === 'counter') seeded[q.id] = q.initial ?? q.min ?? 0;
      if (q.kind === 'multi') seeded[q.id] = [];
    }
    seeded['timeline'] = 'standard';
    this.answers.set(seeded);
    this.next();
  }

  protected choose(q: EstimatorQuestion, opt: EstimatorOption): void {
    this.answers.update((a) => ({ ...a, [q.id]: opt.id }));
    // Single-choice answers advance on their own. It reads as responsive rather
    // than making people confirm an obvious selection.
    setTimeout(() => this.next(), 220);
  }

  protected toggle(q: EstimatorQuestion, opt: EstimatorOption): void {
    this.answers.update((a) => {
      const current = (a[q.id] as string[]) ?? [];
      const next = current.includes(opt.id)
        ? current.filter((x) => x !== opt.id)
        : [...current, opt.id];
      return { ...a, [q.id]: next };
    });
  }

  protected isSelected(q: EstimatorQuestion, opt: EstimatorOption): boolean {
    const v = this.answers()[q.id];
    return Array.isArray(v) ? v.includes(opt.id) : v === opt.id;
  }

  protected count(q: EstimatorQuestion): number {
    return (this.answers()[q.id] as number) ?? q.initial ?? q.min ?? 0;
  }

  protected setCount(q: EstimatorQuestion, raw: number): void {
    const min = q.min ?? 0;
    const max = q.max ?? 9999;
    this.answers.update((a) => ({ ...a, [q.id]: Math.max(min, Math.min(max, Math.round(raw))) }));
  }

  protected bump(q: EstimatorQuestion, direction: 1 | -1): void {
    this.setCount(q, this.count(q) + direction * (q.step ?? 1));
  }

  protected onCounterInput(q: EstimatorQuestion, event: Event): void {
    this.setCount(q, Number((event.target as HTMLInputElement).value));
  }

  /* ------------------------------------------------------------ movement */

  protected next(): void {
    if (this.stepIndex() >= this.totalSteps() - 1) return;
    this.stepIndex.update((i) => i + 1);
  }

  protected back(): void {
    if (this.stepIndex() === 0) return;
    this.stepIndex.update((i) => i - 1);
  }

  protected goTo(i: number): void {
    if (i <= this.stepIndex()) this.stepIndex.set(i);
  }

  protected restart(): void {
    this.serviceId.set(null);
    this.answers.set({});
    this.stepIndex.set(0);
    this.submitted.set(false);
    this.sent.set(false);
    this.contact.reset();
  }

  /* ----------------------------------------------------------- submitted */

  protected submitContact(): void {
    this.submitted.set(true);
    if (this.contact.invalid) {
      this.contact.markAllAsTouched();
      return;
    }
    this.next();
  }

  protected invalid(control: 'name' | 'email'): boolean {
    const c = this.contact.controls[control];
    return c.invalid && (c.touched || this.submitted());
  }

  /**
   * No backend yet, so the brief goes out as a prefilled email. The payload
   * below is the shape an API endpoint should receive when one exists.
   */
  protected sendBrief(): void {
    const svc = this.service();
    if (!svc) return;

    const v = this.contact.getRawValue();
    const answers = this.summary().map((s) => `  ${s.title}\n    ${s.value}`);

    const body = [
      `Service: ${svc.title}`,
      '',
      'Brief:',
      ...answers,
      '',
      `Name: ${v.name}`,
      `Organisation: ${v.organisation || 'Not given'}`,
      `Email: ${v.email}`,
      '',
      `Notes: ${v.notes || 'None'}`,
    ].join('\n');

    const href =
      `mailto:${COMPANY.email}` +
      `?subject=${encodeURIComponent(`Project brief: ${svc.title}`)}` +
      `&body=${encodeURIComponent(body)}`;

    this.sent.set(true);
    if (typeof window !== 'undefined') window.location.href = href;
  }

  /* ------------------------------------------------------------- helpers */

  /** A human-readable form of the current answer. */
  protected readable(q: EstimatorQuestion): string {
    const value = this.answers()[q.id];
    if (value === undefined) return 'Not set';
    if (Array.isArray(value)) {
      if (!value.length) return 'None';
      return value.map((id) => q.options?.find((o) => o.id === id)?.label ?? id).join(', ');
    }
    if (typeof value === 'number') {
      return `${value} ${value === 1 ? q.unit : q.unitPlural}`;
    }
    return q.options?.find((o) => o.id === value)?.label ?? String(value);
  }
}
