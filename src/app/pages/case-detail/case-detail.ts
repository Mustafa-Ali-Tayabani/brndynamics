import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CAPABILITIES, CASE_STUDIES } from '../../data/site.data';
import { SeoService } from '../../core/seo.service';
import { CtaBand } from '../../ui/cta-band/cta-band';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';
import { SplitTextDirective } from '../../core/split-text.directive';
import { SpotlightDirective } from '../../core/spotlight.directive';
import { CountUpDirective } from '../../core/count-up.directive';
import { GridLines } from '../../ui/grid-lines/grid-lines';
import { Visual } from '../../ui/visual/visual';

@Component({
  selector: 'app-case-detail',
  imports: [
    RouterLink,
    CtaBand,
    ScrollRevealDirective,
    SplitTextDirective,
    SpotlightDirective,
    CountUpDirective,
    GridLines,
    Visual,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './case-detail.html',
  styleUrl: './case-detail.scss',
})
export class CaseDetail {
  private readonly slug = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: '' },
  );

  protected readonly study = computed(
    () => CASE_STUDIES.find((c) => c.slug === this.slug()) ?? CASE_STUDIES[0],
  );

  /** The discipline this engagement belongs to, for a route back into services. */
  protected readonly discipline = computed(() =>
    CAPABILITIES.find((c) => c.relatedCases.includes(this.study().slug)),
  );

  protected readonly next = computed(() => {
    const i = CASE_STUDIES.findIndex((c) => c.slug === this.study().slug);
    return CASE_STUDIES[(i + 1) % CASE_STUDIES.length];
  });

  /** Pull a leading integer out of "3.4×" / "210k" so it can count up. */
  protected numeric(value: string): number | null {
    const m = value.match(/^[^0-9-]*(-?[\d,]+(?:\.\d+)?)/);
    if (!m) return null;
    const n = Number(m[1].replace(/,/g, ''));
    return Number.isFinite(n) && Number.isInteger(n) ? n : null;
  }

  protected prefix(value: string): string {
    return value.match(/^[^0-9-]*/)?.[0] ?? '';
  }

  protected suffix(value: string): string {
    return value.match(/[^0-9.,]*$/)?.[0] ?? '';
  }

  constructor() {
    const seo = inject(SeoService);
    const s = this.study();
    seo.apply({
      title: s.title,
      description: s.summary,
      path: `/work/${s.slug}`,
    });
    seo.setJsonLd('ld-case', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: s.title,
      description: s.summary,
      author: { '@type': 'Organization', name: 'BrnDynamics' },
      publisher: { '@type': 'Organization', name: 'BrnDynamics' },
      about: s.sector,
      datePublished: s.year,
    });
  }
}
