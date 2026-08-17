import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CASE_STUDIES, STATS } from '../../data/site.data';
import { SeoService } from '../../core/seo.service';
import { PageHero } from '../../ui/page-hero/page-hero';
import { CtaBand } from '../../ui/cta-band/cta-band';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';
import { Visual } from '../../ui/visual/visual';

@Component({
  selector: 'app-work',
  imports: [RouterLink, PageHero, CtaBand, ScrollRevealDirective, Visual],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      index="//"
      label="Selected work"
      heading="Engagements we can talk about."
      lede="A sample of the 80+ projects delivered since 2019. Names are withheld where the contract requires it; the numbers are not."
    >
      <a routerLink="/contact" class="btn btn--primary btn--lg">Discuss your project</a>
    </app-page-hero>

    <!-- Sector filter -->
    <div class="filter">
      <div class="container filter__inner">
        <span class="mono filter__label">Filter</span>
        <ul class="filter__list">
          @for (sector of sectors(); track sector) {
            <li>
              <button
                type="button"
                class="filter__btn mono"
                [class.is-active]="active() === sector"
                [attr.aria-pressed]="active() === sector"
                (click)="active.set(sector)"
              >
                {{ sector }}
              </button>
            </li>
          }
        </ul>
        <span class="mono filter__count tnum">
          {{ visible().length }} / {{ studies.length }}
        </span>
      </div>
    </div>

    <div class="container list">
      @for (item of visible(); track item.slug; let i = $index) {
        <article class="entry" appReveal [revealDelay]="i * 60">
          <div class="entry__meta">
            <span class="mono entry__num tnum">{{ '0' + (i + 1) }}</span>
            <span class="mono entry__year tnum">{{ item.year }}</span>
            <a class="entry__thumb" [routerLink]="['/work', item.slug]" tabindex="-1" aria-hidden="true">
              <app-visual [kind]="item.visual" [labels]="false" />
            </a>
          </div>

          <div class="entry__main">
            <p class="mono entry__sector">{{ item.sector }} / {{ item.discipline }}</p>
            <h2 class="display-2">
              <a class="entry__link" [routerLink]="['/work', item.slug]">{{ item.title }}</a>
            </h2>
            <p class="body-dim entry__summary">{{ item.summary }}</p>
            <ul class="stack">
              @for (tech of item.stack; track tech) {
                <li class="mono-sm">{{ tech }}</li>
              }
            </ul>
            <a class="link entry__more" [routerLink]="['/work', item.slug]">
              Read the case study →
            </a>
          </div>

          <div class="entry__metric">
            <span class="display-1 tnum entry__value">{{ item.metric.value }}</span>
            <span class="mono-sm entry__label">{{ item.metric.label }}</span>
            <span class="mono-sm entry__client">{{ item.client }}</span>
          </div>
        </article>
      } @empty {
        <p class="lede empty">No case studies published for this sector yet.</p>
      }
    </div>

    <!-- Aggregate record -->
    <section class="record">
      <div class="container">
        <p class="mono record__label">Track record</p>
        <ul class="record__grid">
          @for (stat of stats; track stat.label) {
            <li appReveal>
              <span class="display-2 tnum">{{ stat.value }}{{ stat.suffix }}</span>
              <span class="record__name">{{ stat.label }}</span>
            </li>
          }
        </ul>
      </div>
    </section>

    <app-cta-band
      heading="Your project is the next entry."
      body="Bring us the constraint that has stalled the work, whether that is budget, compliance or a vendor that will not cooperate, and we will tell you how we would sequence it."
    />
  `,
  styleUrl: './work.scss',
})
export class Work {
  protected readonly studies = CASE_STUDIES;
  protected readonly stats = STATS;

  protected readonly active = signal('All');

  protected readonly sectors = computed(() => [
    'All',
    ...new Set(this.studies.map((s) => s.sector)),
  ]);

  protected readonly visible = computed(() => {
    const filter = this.active();
    return filter === 'All' ? this.studies : this.studies.filter((s) => s.sector === filter);
  });

  constructor() {
    inject(SeoService).apply({
      title: 'Case Studies',
      description:
        'Selected BrnDynamics engagements: an analytics platform rebuild, a four-system ERP consolidation, a public-sector mobile app and a clinical SaaS platform.',
      path: '/work',
    });
  }
}
