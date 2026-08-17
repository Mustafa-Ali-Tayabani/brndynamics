import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DIFFERENTIATORS } from '../../../../data/site.data';
import { ScrollRevealDirective } from '../../../../core/scroll-reveal.directive';
import { GridLines } from '../../../../ui/grid-lines/grid-lines';

@Component({
  selector: 'app-differentiators',
  imports: [RouterLink, ScrollRevealDirective, GridLines],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-grid-lines />
    <div class="container split">
      <!-- Sticky rail: stays with the reader while the list scrolls past. -->
      <div class="rail">
        <p class="sec-head__index mono" appReveal>
          <b>03</b>
          <span>Why BrnDynamics</span>
        </p>
        <h2 class="display-1" appReveal [revealDelay]="60">
          The difference is who picks up the phone.
        </h2>
        <p class="lede" appReveal [revealDelay]="120">
          Four commitments we put in writing, because they are the four things clients tell us went
          wrong with the last provider.
        </p>
        <a routerLink="/company" class="btn" appReveal [revealDelay]="180">How we work</a>
      </div>

      <ul class="list">
        @for (item of items; track item.index; let i = $index) {
          <li class="item" appReveal [revealDelay]="i * 70">
            <span class="item__index mono">{{ item.index }}</span>
            <div class="item__body">
              <h3 class="display-3">{{ item.title }}</h3>
              <p class="body-dim">{{ item.body }}</p>
            </div>
          </li>
        }
      </ul>
    </div>
  `,
  styles: `
    :host {
      position: relative;
      display: block;
      padding-block: var(--section-y);
      background: var(--ink-850);
      border-block: 1px solid var(--line);
      isolation: isolate;
    }

    .split {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
      gap: clamp(2rem, 6vw, 6rem);
      align-items: start;
    }

    @media (width < 62rem) {
      .split {
        grid-template-columns: 1fr;
      }
    }

    .rail {
      position: sticky;
      top: calc(var(--header-h) + 3rem);
      display: grid;
      gap: var(--s-5);
      justify-items: start;
    }

    @media (width < 62rem) {
      .rail {
        position: static;
      }
    }

    .list {
      display: grid;
    }

    .item {
      display: grid;
      grid-template-columns: 3rem minmax(0, 1fr);
      gap: clamp(0.75rem, 2vw, 1.5rem);
      padding-block: clamp(1.5rem, 3.5vw, 2.5rem);
      border-top: 1px solid var(--line);
    }

    .item:last-child {
      border-bottom: 1px solid var(--line);
    }

    .item__index {
      color: var(--signal-hi);
      padding-top: 0.45em;
    }

    .item__body {
      display: grid;
      gap: var(--s-3);
    }

    .item__body p {
      max-width: 52ch;
      font-size: var(--t-sm);
      line-height: 1.75;
    }

    @media (width < 34rem) {
      .item {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }

      .item__index {
        padding-top: 0;
      }
    }
  `,
})
export class Differentiators {
  protected readonly items = DIFFERENTIATORS;
}
