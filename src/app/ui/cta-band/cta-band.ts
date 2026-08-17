import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../data/site.data';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';
import { MagneticDirective } from '../../core/magnetic.directive';
import { GridLines } from '../grid-lines/grid-lines';

/** Closing conversion band, reused at the foot of every page. */
@Component({
  selector: 'app-cta-band',
  imports: [RouterLink, ScrollRevealDirective, MagneticDirective, GridLines],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-grid-lines />
    <div class="glow" aria-hidden="true"></div>

    <div class="container inner">
      <p class="chip chip--signal mono" appReveal>
        <span class="dot"></span>
        Usually a reply the same business day
      </p>

      <h2 class="display-hero head" appReveal [revealDelay]="60">{{ heading() }}</h2>

      <p class="lede" appReveal [revealDelay]="120">{{ body() }}</p>

      <div class="actions" appReveal [revealDelay]="180">
        <a
          routerLink="/estimate"
          class="btn btn--primary btn--lg"
          appMagnetic
          [magneticStrength]="8"
          data-cursor="2 min"
        >
          Get an estimate
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
        <a routerLink="/contact" class="btn btn--lg">Talk to an engineer</a>
      </div>

      <p class="mono-sm alt">
        Or write directly:
        <a class="link alt__link" [href]="'mailto:' + company.email">{{ company.email }}</a>
      </p>

      <dl class="facts" appReveal [revealDelay]="240">
        <div>
          <dt class="mono-sm">Direct line</dt>
          <dd><a class="link" [href]="'tel:' + company.phoneHref">{{ company.phone }}</a></dd>
        </div>
        <div>
          <dt class="mono-sm">Offices</dt>
          <dd>Karachi · Riyadh · Geneva</dd>
        </div>
        <div>
          <dt class="mono-sm">Time zones</dt>
          <dd>PKT / AST / CET</dd>
        </div>
      </dl>
    </div>
  `,
  styles: `
    :host {
      position: relative;
      display: block;
      padding-block: clamp(4rem, 10vw, 8rem);
      border-top: 1px solid var(--line);
      isolation: isolate;
      overflow: hidden;
    }

    .glow {
      position: absolute;
      z-index: 0;
      bottom: -55%;
      left: 50%;
      translate: -50% 0;
      width: min(60rem, 110vw);
      aspect-ratio: 1;
      background: radial-gradient(circle, var(--signal-wash) 0%, transparent 60%);
      filter: blur(24px);
      pointer-events: none;
    }

    .inner {
      position: relative;
      z-index: 1;
      display: grid;
      justify-items: center;
      text-align: center;
      gap: var(--s-5);
    }

    .head {
      max-width: 16ch;
    }

    .lede {
      max-width: 52ch;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--s-3);
      margin-top: var(--s-2);
    }

    .alt {
      color: var(--text-faint);
      display: flex;
      align-items: baseline;
      gap: 0.4rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .alt__link {
      font-size: inherit;
      letter-spacing: inherit;
      color: var(--text-dim);
    }

    .facts {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: clamp(1.5rem, 4vw, 4rem);
      margin-top: clamp(1.5rem, 4vw, 3rem);
      padding-top: clamp(1.5rem, 3vw, 2.25rem);
      border-top: 1px solid var(--line);
      width: 100%;
    }

    .facts > div {
      display: grid;
      gap: 0.375rem;
      justify-items: center;
    }

    dt {
      color: var(--text-faint);
    }

    dd {
      font-size: var(--t-sm);
      color: var(--text);
    }
  `,
})
export class CtaBand {
  protected readonly company = COMPANY;

  readonly heading = input('Let us build it with you.');
  readonly body = input(
    'Start with the estimator for an indicative number, or tell us what you are building and we will come back with a scope and a real figure.',
  );
}
