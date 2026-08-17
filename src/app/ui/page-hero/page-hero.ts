import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GridLines } from '../grid-lines/grid-lines';

/** Compact hero used at the top of every inner page. */
@Component({
  selector: 'app-page-hero',
  imports: [GridLines],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-grid-lines />
    <div class="container inner">
      <p class="mono eyebrow">
        <b>{{ index() }}</b>
        <span>{{ label() }}</span>
      </p>

      <h1 class="display-1 head">{{ heading() }}</h1>

      <div class="foot">
        <p class="lede">{{ lede() }}</p>
        <ng-content />
      </div>
    </div>
  `,
  styles: `
    :host {
      position: relative;
      display: block;
      padding-block: clamp(3rem, 8vh, 5.5rem) clamp(2.5rem, 6vw, 4.5rem);
      border-bottom: 1px solid var(--line);
      isolation: isolate;
      overflow: hidden;
    }

    .inner {
      position: relative;
      z-index: 1;
      display: grid;
      gap: clamp(1.25rem, 3vw, 2rem);
    }

    .eyebrow {
      display: flex;
      align-items: center;
      gap: var(--s-4);
      color: var(--text-faint);
    }

    .eyebrow b {
      color: var(--signal-hi);
      font-weight: 400;
    }

    .eyebrow::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--line);
    }

    .head {
      max-width: 20ch;
    }

    .foot {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: end;
      gap: clamp(1.5rem, 4vw, 4rem);
      padding-top: clamp(0.75rem, 2vw, 1.25rem);
      border-top: 1px solid var(--line);
    }

    .foot .lede {
      padding-top: var(--s-5);
      max-width: 54ch;
    }

    @media (width < 60rem) {
      .foot {
        grid-template-columns: 1fr;
        align-items: start;
      }
    }
  `,
})
export class PageHero {
  readonly index = input.required<string>();
  readonly label = input.required<string>();
  readonly heading = input.required<string>();
  readonly lede = input.required<string>();
}
