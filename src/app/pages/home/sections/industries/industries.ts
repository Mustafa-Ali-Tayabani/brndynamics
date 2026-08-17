import { ChangeDetectionStrategy, Component } from '@angular/core';
import { INDUSTRIES, PARTNERS } from '../../../../data/site.data';
import { SectionHead } from '../../../../ui/section-head/section-head';
import { ScrollRevealDirective } from '../../../../core/scroll-reveal.directive';
import { Marquee } from '../../../../ui/marquee/marquee';

@Component({
  selector: 'app-industries',
  imports: [SectionHead, ScrollRevealDirective, Marquee],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <app-section-head
        index="10"
        label="Sectors"
        title="Constraints we already know."
        lede="Regulated environments punish providers who learn the rules on your budget. These are the six where we have shipped repeatedly."
      />

      <ul class="grid">
        @for (item of industries; track item.name; let i = $index) {
          <li class="cell" appReveal [revealDelay]="i * 55">
            <span class="mono cell__num tnum">{{ '0' + (i + 1) }}</span>
            <h3 class="display-4 cell__name">{{ item.name }}</h3>
            <p class="mono-sm cell__note">{{ item.note }}</p>
            <span class="cell__arrow" aria-hidden="true">→</span>
          </li>
        }
      </ul>
    </div>

    <div class="partners">
      <p class="container mono partners__label">Platforms &amp; partners we build on</p>
      <app-marquee [items]="partners" [duration]="60" />
    </div>
  `,
  styles: `
    :host {
      display: block;
      padding-block: var(--section-y) 0;
      background: var(--ink-850);
      border-top: 1px solid var(--line);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      border-top: 1px solid var(--line);
      border-left: 1px solid var(--line);
    }

    @media (width < 62rem) {
      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (width < 34rem) {
      .grid {
        grid-template-columns: 1fr;
      }
    }

    .cell {
      position: relative;
      display: grid;
      gap: var(--s-2);
      align-content: start;
      padding: clamp(1.25rem, 2.6vw, 2rem);
      border-right: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
      overflow: hidden;
      transition: background var(--d-mid) var(--e-out);
    }

    /* Signal wash rises from the bottom on hover. */
    .cell::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent, var(--signal-wash));
      opacity: 0;
      transition: opacity var(--d-mid) var(--e-out);
      pointer-events: none;
    }

    .cell:hover::before {
      opacity: 1;
    }

    .cell__num {
      color: var(--text-faint);
      transition: color var(--d-fast) var(--e-out);
    }

    .cell:hover .cell__num {
      color: var(--signal-hi);
    }

    .cell__name {
      position: relative;
      z-index: 1;
    }

    .cell__note {
      color: var(--text-faint);
      position: relative;
      z-index: 1;
      line-height: 1.5;
    }

    .cell__arrow {
      position: absolute;
      right: clamp(1.25rem, 2.6vw, 2rem);
      bottom: clamp(1.25rem, 2.6vw, 2rem);
      color: var(--signal-hi);
      opacity: 0;
      transform: translateX(-6px);
      transition:
        opacity var(--d-mid) var(--e-out),
        transform var(--d-mid) var(--e-out);
    }

    .cell:hover .cell__arrow {
      opacity: 1;
      transform: none;
    }

    /* ------------------------------------------------------- partners ---- */

    .partners {
      margin-top: clamp(3rem, 7vw, 5.5rem);
      padding-block: clamp(1.75rem, 4vw, 2.75rem);
      border-top: 1px solid var(--line);
    }

    .partners__label {
      color: var(--text-faint);
      margin-bottom: var(--s-5);
    }
  `,
})
export class Industries {
  protected readonly industries = INDUSTRIES;
  protected readonly partners = PARTNERS;
}
