import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CAPABILITIES, CASE_STUDIES } from '../../data/site.data';
import { SeoService } from '../../core/seo.service';
import { CtaBand } from '../../ui/cta-band/cta-band';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';
import { SplitTextDirective } from '../../core/split-text.directive';
import { SpotlightDirective } from '../../core/spotlight.directive';
import { GridLines } from '../../ui/grid-lines/grid-lines';
import { Visual } from '../../ui/visual/visual';

@Component({
  selector: 'app-solution-detail',
  imports: [
    RouterLink,
    CtaBand,
    ScrollRevealDirective,
    SplitTextDirective,
    SpotlightDirective,
    GridLines,
    Visual,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './solution-detail.html',
  styleUrl: './solution-detail.scss',
})
export class SolutionDetail {
  private readonly slug = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: '' },
  );

  protected readonly all = CAPABILITIES;

  protected readonly cap = computed(
    () => CAPABILITIES.find((c) => c.id === this.slug()) ?? CAPABILITIES[0],
  );

  protected readonly related = computed(() =>
    CASE_STUDIES.filter((c) => this.cap().relatedCases.includes(c.slug)),
  );

  /** Previous / next discipline, so the page is never a dead end. */
  protected readonly siblings = computed(() => {
    const i = CAPABILITIES.findIndex((c) => c.id === this.cap().id);
    return {
      prev: CAPABILITIES[(i - 1 + CAPABILITIES.length) % CAPABILITIES.length],
      next: CAPABILITIES[(i + 1) % CAPABILITIES.length],
    };
  });

  protected readonly openFaq = signal(0);

  protected toggleFaq(i: number): void {
    this.openFaq.update((c) => (c === i ? -1 : i));
  }

  constructor() {
    const seo = inject(SeoService);
    const cap = this.cap();
    seo.apply({
      title: cap.title,
      description: cap.summary,
      path: `/solutions/${cap.id}`,
    });
    seo.setJsonLd('ld-service', {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: cap.title,
      description: cap.summary,
      provider: { '@type': 'Organization', name: 'BrnDynamics' },
      serviceType: cap.title,
    });
  }
}
