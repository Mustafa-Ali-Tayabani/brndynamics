import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  EstimatorOption,
  EstimatorQuestion,
  EstimatorService,
  SERVICES,
  SPREAD_HIGH,
  SPREAD_LOW,
  TIMELINE_QUESTION,
} from '../../data/estimator.data';
import { COMPANY } from '../../data/site.data';
import { SeoService } from '../../core/seo.service';
import { MagneticDirective } from '../../core/magnetic.directive';

type AnswerValue = string | string[] | number;

interface Line {
  label: string;
  detail: string;
  amount?: number;
  factor?: number;
}

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

  /** Service questions plus the shared timeline question. */
  protected readonly questions = computed<EstimatorQuestion[]>(() => {
    const svc = this.service();
    return svc ? [...svc.questions, TIMELINE_QUESTION] : [];
  });

  /** 0 = pick a service, 1..n = questions, n+1 = contact, n+2 = result. */
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

  /**
   * subtotal = base + flat adds + counters × perUnit
   * total    = subtotal × multipliers
   */
  protected readonly estimate = computed(() => {
    const svc = this.service();
    if (!svc) return null;

    const values = this.answers();
    const lines: Line[] = [{ label: svc.title, detail: 'Base engagement', amount: svc.base }];

    let subtotal = svc.base;
    let factor = 1;

    for (const q of this.questions()) {
      const value = values[q.id];
      if (value === undefined) continue;

      if (q.kind === 'counter' && typeof value === 'number' && q.perUnit) {
        const amount = value * q.perUnit;
        if (!amount) continue;
        subtotal += amount;
        lines.push({
          label: `${value} ${value === 1 ? q.unit : q.unitPlural}`,
          detail: `${this.money(q.perUnit)} each`,
          amount,
        });
      } else if (q.kind === 'choice' && typeof value === 'string') {
        const opt = q.options?.find((o) => o.id === value);
        if (!opt) continue;
        if (opt.add) {
          subtotal += opt.add;
          lines.push({ label: opt.label, detail: q.title, amount: opt.add });
        }
        if (opt.mult && opt.mult !== 1) {
          factor *= opt.mult;
          lines.push({ label: opt.label, detail: q.title, factor: opt.mult });
        }
      } else if (q.kind === 'multi' && Array.isArray(value)) {
        for (const id of value) {
          const opt = q.options?.find((o) => o.id === id);
          if (!opt?.add) continue;
          subtotal += opt.add;
          lines.push({ label: opt.label, detail: 'Add-on', amount: opt.add });
        }
      }
    }

    const total = subtotal * factor;
    return {
      lines,
      subtotal,
      factor,
      total,
      low: this.round(total * SPREAD_LOW),
      high: this.round(total * SPREAD_HIGH),
      recurring: svc.recurring,
    };
  });

  /** Every question must be answered before the contact step unlocks. */
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
      title: 'Cost Estimator',
      description:
        'Get an indicative price for managed services, cloud engineering, cyber security, software, web and mobile, or IT consulting. Six questions, about two minutes.',
      path: '/estimate',
    });
  }

  /* --------------------------------------------------------------- input */

  protected pickService(id: string): void {
    this.serviceId.set(id);
    // Seed counter defaults so the running figure is never nonsensically low.
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
    // Single-choice answers advance on their own — it reads as responsive
    // rather than making people confirm an obvious selection.
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
    const value = Math.max(min, Math.min(max, Math.round(raw)));
    this.answers.update((a) => ({ ...a, [q.id]: value }));
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
   * No backend yet — the brief goes out as a prefilled email. The payload below
   * is the shape an API endpoint should receive when one exists.
   */
  protected sendBrief(): void {
    const est = this.estimate();
    const svc = this.service();
    if (!est || !svc) return;

    const v = this.contact.getRawValue();
    const answerLines = this.questions().map((q) => {
      const value = this.answers()[q.id];
      let readable: string;
      if (Array.isArray(value)) {
        readable =
          value.map((id) => q.options?.find((o) => o.id === id)?.label ?? id).join(', ') || 'None';
      } else if (typeof value === 'number') {
        readable = `${value} ${value === 1 ? q.unit : q.unitPlural}`;
      } else {
        readable = q.options?.find((o) => o.id === value)?.label ?? String(value ?? '—');
      }
      return `  ${q.title} → ${readable}`;
    });

    const body = [
      `Service: ${svc.title}`,
      `Indicative range: ${this.money(est.low)} – ${this.money(est.high)}${svc.recurring ? ' per month' : ''}`,
      '',
      'Answers:',
      ...answerLines,
      '',
      `Name: ${v.name}`,
      `Organisation: ${v.organisation || '—'}`,
      `Email: ${v.email}`,
      '',
      `Notes: ${v.notes || '—'}`,
    ].join('\n');

    const href =
      `mailto:${COMPANY.email}` +
      `?subject=${encodeURIComponent(`Estimate request — ${svc.title}`)}` +
      `&body=${encodeURIComponent(body)}`;

    this.sent.set(true);
    if (typeof window !== 'undefined') window.location.href = href;
  }

  /* ------------------------------------------------------------- helpers */

  /** A human-readable form of the current answer, for the summary rail. */
  protected readable(q: EstimatorQuestion): string {
    const value = this.answers()[q.id];
    if (value === undefined) return '—';
    if (Array.isArray(value)) {
      if (!value.length) return 'None';
      return value.map((id) => q.options?.find((o) => o.id === id)?.label ?? id).join(', ');
    }
    if (typeof value === 'number') {
      return `${value} ${value === 1 ? q.unit : q.unitPlural}`;
    }
    return q.options?.find((o) => o.id === value)?.label ?? String(value);
  }

  protected money(n: number): string {
    return `$${Math.round(n).toLocaleString('en-US')}`;
  }

  /** Round to a figure that reads as an estimate rather than a quote. */
  private round(n: number): number {
    if (n < 1000) return Math.round(n / 50) * 50;
    if (n < 10000) return Math.round(n / 500) * 500;
    return Math.round(n / 1000) * 1000;
  }
}
