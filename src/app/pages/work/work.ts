import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CASE_STUDIES, STATS } from '../../data/site.data';
import { SeoService } from '../../core/seo.service';
import { PageHero } from '../../ui/page-hero/page-hero';
import { CtaBand } from '../../ui/cta-band/cta-band';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';
import { Visual } from '../../ui/visual/visual';
import { ImgOk } from '../../ui/img-ok';
import { CaseLogo } from '../../ui/case-logo/case-logo';

@Component({
  selector: 'app-work',
  imports: [RouterLink, PageHero, CtaBand, ScrollRevealDirective, Visual, ImgOk, CaseLogo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      index="//"
      label="Selected work"
      heading="Engagements we can talk about."
      lede="Platforms and services we have built and run. Six engagements we can show in full, with more being written up."
    >
      <a routerLink="/contact" class="btn btn--primary btn--lg">Discuss your project</a>
    </app-page-hero>

    <!-- Sector filter. Hidden until there is more than one sector to filter by. -->
    @if (sectors().length > 2) {
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
    }

    <div class="container list">
      @for (item of visible(); track item.slug; let i = $index) {
        <article class="entry" appReveal [revealDelay]="i * 60">
          <a
            class="entry__media"
            [routerLink]="['/work', item.slug]"
            tabindex="-1"
            aria-hidden="true"
          >
            @if (item.hero && !missing().has(item.hero.src)) {
              <img
                appImgOk
                [src]="item.hero.src"
                [alt]="item.hero.alt"
                loading="lazy"
                (failed)="markMissing(item.hero.src)"
              />
            } @else {
              <app-visual [kind]="item.visual" [labels]="false" />
            }
          </a>

          <div class="entry__main">
            <p class="entry__index mono">
              <span class="entry__num tnum">{{ (i + 1).toString().padStart(2, '0') }}</span>
              <span class="entry__year tnum">{{ item.year }}</span>
            </p>

            @if (item.logo) {
              <app-case-logo class="entry__logo" [image]="item.logo" />
            }
            <p class="mono entry__sector">{{ item.sector }} / {{ item.discipline }}</p>
            <h2 class="display-2">
              <a class="entry__link" [routerLink]="['/work', item.slug]">{{ item.title }}</a>
            </h2>
            <p class="body-dim entry__summary">{{ item.summary }}</p>

            <div class="entry__metric">
              <span class="display-3 tnum entry__value">{{ item.metric.value }}</span>
              <span class="mono-sm entry__label">{{ item.metric.label }}</span>
            </div>

            <ul class="stack">
              @for (tech of item.stack; track tech) {
                <li class="mono-sm">{{ tech }}</li>
              }
            </ul>

            <a class="link entry__more" [routerLink]="['/work', item.slug]">
              Read the case study →
            </a>
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

  /**
   * Artwork that 404s falls back to the generated visual, so an image that has
   * not been dropped into public/ yet never shows as a broken frame.
   */
  protected readonly missing = signal<ReadonlySet<string>>(new Set());

  protected markMissing(src: string): void {
    this.missing.update((set) => new Set(set).add(src));
  }

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
        'Case studies from BrnDynamics: a club management platform, an estimate and property case platform for building services, an AI waiter for restaurants, an AI-powered test management platform, a subscription WordPress care service, and an RPA platform automating finance operations.',
      path: '/work',
    });
  }
}
