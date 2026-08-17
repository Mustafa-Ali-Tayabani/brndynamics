import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Cursor } from './ui/cursor/cursor';
import { ORGANIZATION_JSON_LD, SeoService } from './core/seo.service';
import { SmoothScrollService } from './core/smooth-scroll.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Cursor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly scroll = inject(SmoothScrollService);
  private readonly router = inject(Router);

  constructor() {
    inject(SeoService).setJsonLd('ld-org', ORGANIZATION_JSON_LD);

    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      this.scroll.init();

      // Lenis owns the scroll position, so the router's own anchor scrolling
      // and restoration have to be driven by hand.
      const sub = this.router.events
        .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
        .subscribe(() => {
          const fragment = this.router.parseUrl(this.router.url).fragment;

          // The new page has not laid out yet on the frame the event fires.
          requestAnimationFrame(() => {
            this.scroll.resize();
            if (fragment) {
              const target = document.getElementById(fragment);
              if (target) {
                this.scroll.scrollTo(target, -96);
                return;
              }
            }
            this.scroll.scrollTo(0);
          });
        });

      destroyRef.onDestroy(() => sub.unsubscribe());
    });
  }
}
