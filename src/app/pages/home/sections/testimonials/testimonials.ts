import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMPANY, TESTIMONIALS } from '../../../../data/site.data';
import { SectionHead } from '../../../../ui/section-head/section-head';
import { ScrollRevealDirective } from '../../../../core/scroll-reveal.directive';
import { SpotlightDirective } from '../../../../core/spotlight.directive';

@Component({
  selector: 'app-testimonials',
  imports: [SectionHead, ScrollRevealDirective, SpotlightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <app-section-head
        index="10"
        label="Verified reviews"
        title="What the last decade of clients say."
        lede="Rated 5.0 on Clutch across 31 verified reviews and 4.9 on Google."
      />

      <ul class="grid">
        @for (item of testimonials; track item.name; let i = $index) {
          <li class="card quote" appReveal [revealDelay]="i * 80" appSpotlight>
            <span class="quote__mark" aria-hidden="true">&ldquo;</span>
            <blockquote class="quote__text">{{ item.quote }}</blockquote>
            <figcaption class="quote__who">
              <span class="quote__initials mono" aria-hidden="true">{{ initials(item.name) }}</span>
              <span class="quote__meta">
                <span class="quote__name">{{ item.name }}</span>
                <span class="mono-sm quote__role">{{ item.role }} · {{ item.org }}</span>
              </span>
            </figcaption>
          </li>
        }
      </ul>

      <ul class="ratings" appReveal>
        @for (rating of company.ratings; track rating.source) {
          <li class="rating">
            <span class="display-2 tnum">{{ rating.value }}</span>
            <span class="rating__meta">
              <span class="stars" aria-hidden="true">★★★★★</span>
              <span class="mono-sm">{{ rating.source }} · {{ rating.note }}</span>
            </span>
          </li>
        }
      </ul>
    </div>
  `,
  styles: `
    :host {
      display: block;
      padding-block: var(--section-y);
      background: var(--ink-850);
      border-top: 1px solid var(--line);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
    }

    @media (width < 62rem) {
      .grid {
        grid-template-columns: 1fr;
      }
    }

    .quote {
      display: grid;
      grid-template-rows: auto 1fr auto;
      gap: var(--s-4);
      padding: clamp(1.25rem, 2.5vw, 2rem);
    }

    .quote__mark {
      font-family: var(--f-display);
      font-size: 3.5rem;
      line-height: 0.6;
      color: var(--signal);
      height: 1.4rem;
    }

    .quote__text {
      font-family: var(--f-display);
      font-size: clamp(1.0625rem, 1.35vw, 1.25rem);
      font-weight: 400;
      line-height: 1.5;
      letter-spacing: var(--tr-snug);
      color: var(--text);
      text-wrap: pretty;
    }

    .quote__who {
      display: flex;
      /* Roles wrap to two lines; keep the avatar level with the name. */
      align-items: flex-start;
      gap: var(--s-3);
      padding-top: var(--s-4);
      border-top: 1px solid var(--line);
    }

    .quote__initials {
      display: grid;
      place-items: center;
      width: 38px;
      height: 38px;
      flex: none;
      border-radius: 50%;
      border: 1px solid var(--line-strong);
      background: var(--ink-600);
      color: var(--text-dim);
      letter-spacing: 0;
      font-size: var(--t-mono-sm);
    }

    .quote__meta {
      display: grid;
      gap: 1px;
      min-width: 0;
    }

    .quote__name {
      font-size: var(--t-sm);
    }

    .quote__role {
      color: var(--text-faint);
    }

    /* -------------------------------------------------------- ratings ---- */

    .ratings {
      display: flex;
      flex-wrap: wrap;
      gap: clamp(1.5rem, 4vw, 4rem);
      margin-top: clamp(2rem, 4vw, 3.5rem);
      padding-top: clamp(1.5rem, 3vw, 2.5rem);
      border-top: 1px solid var(--line);
    }

    .rating {
      display: flex;
      align-items: center;
      gap: var(--s-3);
    }

    .rating__meta {
      display: grid;
      gap: 2px;
    }

    .rating__meta .mono-sm {
      color: var(--text-faint);
    }

    .stars {
      color: var(--signal-hi);
      font-size: 0.75rem;
      letter-spacing: 0.15em;
    }
  `,
})
export class Testimonials {
  protected readonly testimonials = TESTIMONIALS;
  protected readonly company = COMPANY;

  protected initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
}
