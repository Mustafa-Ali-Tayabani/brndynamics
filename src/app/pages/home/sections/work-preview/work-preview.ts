import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CASE_STUDIES } from '../../../../data/site.data';
import { SectionHead } from '../../../../ui/section-head/section-head';
import { ScrollRevealDirective } from '../../../../core/scroll-reveal.directive';
import { SpotlightDirective } from '../../../../core/spotlight.directive';
import { Visual } from '../../../../ui/visual/visual';
import { ImgOk } from '../../../../ui/img-ok';
import { CaseLogo } from '../../../../ui/case-logo/case-logo';

@Component({
  selector: 'app-work-preview',
  imports: [
    RouterLink,
    SectionHead,
    ScrollRevealDirective,
    SpotlightDirective,
    Visual,
    ImgOk,
    CaseLogo,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <app-section-head
        index="06"
        label="Selected work"
        title="Outcomes, with the number attached."
        lede="Six engagements we can show in full, from a club running on one connected system to a restaurant table that orders by conversation, a testing lifecycle in one workspace, and WordPress kept healthy on subscription."
      />

      <ul class="grid">
        @for (item of studies; track item.slug; let i = $index) {
          <li class="card work" appReveal [revealDelay]="i * 80" appSpotlight>
            <a class="work__cover" [routerLink]="['/work', item.slug]" tabindex="-1" aria-hidden="true">
              @if (item.hero && !missing().has(item.hero.src)) {
                <img
                  appImgOk
                  [src]="item.hero.src"
                  [alt]="item.hero.alt"
                  loading="lazy"
                  (failed)="markMissing(item.hero.src)"
                />
              } @else {
                <app-visual [kind]="item.visual" />
              }
            </a>

            <div class="work__content">
            <div class="work__top">
              <span class="mono work__sector">{{ item.sector }}</span>
              <span class="mono work__year tnum">{{ item.year }}</span>
            </div>

            <p class="work__metric">
              <span class="display-1 tnum">{{ item.metric.value }}</span>
              <span class="mono-sm work__metric-label">{{ item.metric.label }}</span>
            </p>

            <div class="work__body">
              @if (item.logo) {
                <app-case-logo class="work__logo" [image]="item.logo" />
              }
              <h3 class="display-3">{{ item.title }}</h3>
              <p class="body-dim work__summary">{{ item.summary }}</p>
            </div>

            <div class="work__foot">
              <ul class="stack">
                @for (tech of item.stack; track tech) {
                  <li class="mono-sm">{{ tech }}</li>
                }
              </ul>
              <p class="mono-sm work__client">{{ item.client }} · {{ item.discipline }}</p>
              <a class="link work__more" [routerLink]="['/work', item.slug]">
                Read the case study →
              </a>
            </div>
            </div>
          </li>
        }
      </ul>

      <div class="more" appReveal>
        <a routerLink="/work" class="btn btn--lg">
          All case studies
          <svg class="btn__arrow" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M3 13 13 3M6 3h7v7"
              stroke="currentColor"
              stroke-width="1.5"
              fill="none"
              stroke-linecap="square"
            />
          </svg>
        </a>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      padding-block: var(--section-y);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
    }

    @media (width < 62rem) {
      .grid {
        grid-template-columns: 1fr;
      }
    }

    .work {
      --pad: clamp(1.25rem, 2.5vw, 2rem);
      display: grid;
      grid-template-rows: auto 1fr;
      gap: var(--pad);
      padding: var(--pad);
      overflow: hidden;
    }

    .work__content {
      display: grid;
      grid-template-rows: auto auto 1fr auto;
      gap: var(--pad);
      align-content: start;
    }

    /* An odd last card would sit in one half of a two-up grid with the other
       half empty, so it runs the full row and turns the cover on its side. */
    .work:last-child:nth-child(odd) {
      grid-column: 1 / -1;
      grid-template-columns: minmax(0, 1.02fr) minmax(0, 1fr);
      grid-template-rows: auto;
      align-items: center;
      column-gap: clamp(1.5rem, 3vw, 2.5rem);
    }

    @media (width < 62rem) {
      .work:last-child:nth-child(odd) {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
      }
    }

    /* Cover art bleeds to the card edges, above the metadata. */
    .work__cover {
      display: block;
      margin: calc(clamp(1.25rem, 2.5vw, 2rem) * -1);
      margin-bottom: 0;
      aspect-ratio: 16 / 7;
      border-bottom: 1px solid var(--line);
      overflow: hidden;
    }

    /* Renders keep their source ratio; only the generated fallback fills a
       fixed box. Nothing here is cropped. */
    .work__cover:has(img) {
      aspect-ratio: auto;
    }

    .work__cover img {
      display: block;
      width: 100%;
      height: auto;
    }

    .work__cover app-visual {
      display: block;
      width: 100%;
      height: 100%;
      transition: transform var(--d-slow) var(--e-out);
    }

    .work:hover .work__cover app-visual {
      transform: scale(1.04);
    }

    /* Bleeding the cover to the card edge forces a near-square box, which
       crops a quarter of the width off a landscape render. Inset it instead
       and keep the source ratio. */
    .work:last-child:nth-child(odd) .work__cover {
      margin: 0;
      border: 1px solid var(--line);
      border-radius: var(--r-md);
      background: var(--shot-plate);
    }

    .work__logo {
      --case-logo-h: 26px;
      margin-bottom: var(--s-2);
    }

    .work__more {
      justify-self: start;
      margin-top: var(--s-2);
    }

    /* Faint diagonal hatch in the top-right corner — engineering-drawing cue. */
    .work::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 96px;
      height: 96px;
      background: repeating-linear-gradient(
        -45deg,
        var(--line) 0 1px,
        transparent 1px 7px
      );
      mask-image: linear-gradient(225deg, #000, transparent 72%);
      pointer-events: none;
      opacity: 0.9;
      transition: opacity var(--d-mid) var(--e-out);
    }

    .work:hover::after {
      opacity: 0.35;
    }

    .work__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--s-4);
      padding-bottom: var(--s-4);
      border-bottom: 1px solid var(--line);
      position: relative;
      z-index: 1;
    }

    .work__sector {
      color: var(--signal-hi);
    }

    .work__year {
      color: var(--text-faint);
    }

    .work__metric {
      display: grid;
      gap: 0.25rem;
    }

    .work__metric .display-1 {
      line-height: 0.95;
      color: var(--text);
    }

    .work__metric-label {
      color: var(--text-faint);
    }

    .work__body {
      display: grid;
      gap: var(--s-3);
      align-content: start;
    }

    .work__summary {
      font-size: var(--t-sm);
      line-height: 1.7;
      max-width: 48ch;
    }

    .work__foot {
      display: grid;
      gap: var(--s-3);
      padding-top: var(--s-4);
      border-top: 1px solid var(--line);
    }

    .stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
    }

    .stack li {
      padding: 0.3125rem 0.5rem;
      border: 1px solid var(--line);
      border-radius: var(--r-sm);
      color: var(--text-dim);
      background: var(--tint-1);
    }

    .work__client {
      color: var(--text-faint);
    }

    .more {
      display: flex;
      justify-content: center;
      padding-top: clamp(2rem, 4vw, 3.5rem);
    }
  `,
})
export class WorkPreview {
  protected readonly studies = CASE_STUDIES;

  /** Artwork that 404s falls back to the generated visual. */
  protected readonly missing = signal<ReadonlySet<string>>(new Set());

  protected markMissing(src: string): void {
    this.missing.update((set) => new Set(set).add(src));
  }
}
