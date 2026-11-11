import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FIXIFY, FIXIFY_PLANS } from '../../data/fixify.data';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';
import { CaseLogo } from '../case-logo/case-logo';

/**
 * In-house advert for Fixify, dropped between sections on other pages.
 * Price and trial length come from the plan data, so the advert can never
 * disagree with the product page.
 */
@Component({
  selector: 'app-fixify-promo',
  imports: [RouterLink, ScrollRevealDirective, CaseLogo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <aside class="ad" aria-label="Fixify, a BrnDynamics product" appReveal>
        <div class="ad__copy">
          <p class="ad__eyebrow">
            <app-case-logo class="ad__logo" [image]="product.logo" />
            <span class="chip chip--signal mono-sm">Our product</span>
          </p>

          <h2 class="display-2 ad__head">Your WordPress site, looked after.</h2>
          <p class="body-dim ad__body">
            Performance, security, SEO and uptime monitoring, with a team that fixes what it
            finds. Sign up online and your login arrives by email.
          </p>

          <ul class="ad__facts mono-sm">
            <li>From {{ product.currency }}{{ from }} a month</li>
            <li>{{ product.trialDays }}-day free trial</li>
            <li>No card required</li>
          </ul>

          <div class="ad__actions">
            <a routerLink="/fixify" fragment="start" class="btn btn--primary btn--lg">
              Start free trial
              <svg class="btn__arrow" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 13 13 3M6 3h7v7" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="square" />
              </svg>
            </a>
            <a routerLink="/fixify" fragment="plans" class="link">See plans →</a>
          </div>
        </div>

        <a class="ad__shot" routerLink="/fixify" tabindex="-1" aria-hidden="true">
          <img [src]="product.shot.src" alt="" width="1672" height="941" loading="lazy" />
        </a>
      </aside>
    </div>
  `,
  styles: `
    :host {
      display: block;
      padding-block: clamp(2.5rem, 6vw, 4.5rem);
    }

    .ad {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
      align-items: stretch;
      overflow: hidden;
      border: 1px solid var(--signal-line);
      border-radius: var(--r-lg);
      background:
        radial-gradient(120% 140% at 0% 0%, var(--signal-wash), transparent 60%),
        var(--ink-850);
    }

    .ad__copy {
      display: grid;
      align-content: center;
      gap: var(--s-4);
      padding: clamp(1.5rem, 4vw, 3rem);
    }

    .ad__eyebrow {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--s-4);
    }

    .ad__logo {
      --case-logo-h: 26px;
    }

    .ad__head {
      max-width: 16ch;
    }

    .ad__body {
      max-width: 46ch;
    }

    .ad__facts {
      display: flex;
      flex-wrap: wrap;
      gap: var(--s-2) var(--s-5);
      color: var(--text);
    }

    .ad__facts li {
      display: flex;
      align-items: center;
      gap: var(--s-2);
    }

    .ad__facts li::before {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--signal-hi);
    }

    .ad__actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--s-5);
      padding-top: var(--s-2);
    }

    .ad__shot {
      display: block;
      min-height: 100%;
      border-left: 1px solid var(--signal-line);
      background: var(--shot-plate);
      line-height: 0;
      overflow: hidden;
    }

    .ad__shot img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: left center;
      transition: transform var(--d-slow) var(--e-out);
    }

    .ad:hover .ad__shot img {
      transform: scale(1.02);
    }

    @media (width < 62rem) {
      .ad {
        grid-template-columns: 1fr;
      }

      .ad__shot {
        order: -1;
        border-left: 0;
        border-bottom: 1px solid var(--signal-line);
      }

      .ad__shot img {
        height: auto;
      }
    }
  `,
})
export class FixifyPromo {
  protected readonly product = FIXIFY;
  protected readonly from = Math.min(...FIXIFY_PLANS.map((p) => p.monthly));
}
