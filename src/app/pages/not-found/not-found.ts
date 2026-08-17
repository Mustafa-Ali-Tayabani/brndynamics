import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV } from '../../data/site.data';
import { SeoService } from '../../core/seo.service';
import { GridLines } from '../../ui/grid-lines/grid-lines';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, GridLines],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-grid-lines />
    <div class="container inner">
      <p class="mono code">Error 404 — route not resolved</p>
      <p class="big display-hero tnum" aria-hidden="true">404</p>
      <h1 class="display-2">This page is not in the estate.</h1>
      <p class="lede">
        The address resolved, the page did not. Try one of the routes below, or tell us what you
        were looking for and we will point you at it.
      </p>

      <ul class="routes">
        <li><a routerLink="/" class="link">Home</a></li>
        @for (link of nav; track link.path) {
          <li><a [routerLink]="link.path" class="link">{{ link.label }}</a></li>
        }
      </ul>
    </div>
  `,
  styles: `
    :host {
      position: relative;
      display: block;
      min-height: calc(100svh - var(--header-h));
      display: grid;
      align-items: center;
      padding-block: clamp(3rem, 10vh, 7rem);
      isolation: isolate;
      overflow: hidden;
    }

    .inner {
      position: relative;
      z-index: 1;
      display: grid;
      gap: var(--s-4);
      justify-items: start;
    }

    .code {
      color: var(--signal-hi);
    }

    .big {
      color: transparent;
      background: linear-gradient(180deg, var(--watermark-hi), var(--watermark));
      background-clip: text;
      line-height: 0.85;
      font-weight: 700;
      letter-spacing: -0.05em;
      user-select: none;
    }

    .routes {
      display: flex;
      flex-wrap: wrap;
      gap: var(--s-5);
      margin-top: var(--s-4);
      padding-top: var(--s-5);
      border-top: 1px solid var(--line);
      width: 100%;
    }
  `,
})
export class NotFound {
  protected readonly nav = NAV;

  constructor() {
    inject(SeoService).apply({
      title: 'Page not found',
      description: 'The page you requested does not exist on brndynamics.com.',
      path: '/404',
    });
  }
}
