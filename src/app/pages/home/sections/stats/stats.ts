import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STATS } from '../../../../data/site.data';
import { CountUpDirective } from '../../../../core/count-up.directive';
import { ScrollRevealDirective } from '../../../../core/scroll-reveal.directive';

@Component({
  selector: 'app-stats',
  imports: [CountUpDirective, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <ul class="grid">
        @for (stat of stats; track stat.label; let i = $index) {
          <li class="cell" appReveal [revealDelay]="i * 70">
            <p class="value display-1 tnum">
              <span
                [appCountUp]="stat.value"
                [countSuffix]="stat.suffix"
                [countPrefix]="stat.prefix ?? ''"
              >{{ stat.prefix ?? '' }}{{ stat.value }}{{ stat.suffix }}</span>
            </p>
            <p class="label">{{ stat.label }}</p>
            <p class="note mono-sm">{{ stat.note }}</p>
          </li>
        }
      </ul>
    </div>
  `,
  styles: `
    :host {
      display: block;
      border-bottom: 1px solid var(--line);
      padding-block: clamp(2.5rem, 6vw, 4.5rem);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: clamp(1.5rem, 3vw, 2.5rem);
    }

    @media (width < 60rem) {
      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 2rem 1.5rem;
      }
    }

    .cell {
      display: grid;
      gap: 0.375rem;
      align-content: start;
      padding-left: clamp(0.875rem, 2vw, 1.5rem);
      border-left: 1px solid var(--line-strong);
    }

    .value {
      color: var(--text);
      /* Numbers swap width mid-animation; tabular figures hold the layout. */
      font-feature-settings: 'tnum' 1;
      line-height: 1;
    }

    .label {
      font-size: var(--t-sm);
      color: var(--text);
      margin-top: 0.25rem;
    }

    .note {
      color: var(--text-faint);
      line-height: 1.5;
    }
  `,
})
export class Stats {
  protected readonly stats = STATS;
}
