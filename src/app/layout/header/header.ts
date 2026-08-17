import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { NAV, COMPANY, OFFICES } from '../../data/site.data';
import { MagneticDirective } from '../../core/magnetic.directive';
import { BrandLogo } from '../../ui/brand-logo/brand-logo';
import { SmoothScrollService } from '../../core/smooth-scroll.service';
import { ThemeToggle } from '../../ui/theme-toggle/theme-toggle';
import { MegaMenu } from './mega-menu';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MagneticDirective, BrandLogo, ThemeToggle, MegaMenu],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '[class.is-stuck]': 'stuck()',
    '[class.is-open]': 'menuOpen()',
    '[class.is-hidden]': 'hidden()',
    '[class.is-mega]': 'megaOpen()',
  },
})
export class Header {
  protected readonly nav = NAV;
  protected readonly company = COMPANY;
  protected readonly offices = OFFICES;

  protected readonly stuck = signal(false);
  protected readonly hidden = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly megaOpen = signal(false);

  /** Hover intent: a small delay stops the panel flickering on a fast pass. */
  private megaTimer?: ReturnType<typeof setTimeout>;

  private readonly router = inject(Router);
  private readonly scroll = inject(SmoothScrollService);

  /** Document progress, 0–100, for the rail under the bar. */
  protected readonly progressPct = computed(() => (this.scroll.progress() * 100).toFixed(2));

  constructor() {
    const destroyRef = inject(DestroyRef);

    const sub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMenu();
        this.closeMega();
      });
    destroyRef.onDestroy(() => sub.unsubscribe());

    afterNextRender(() => {
      let last = window.scrollY;

      const root = document.documentElement;

      const onScroll = () => {
        const y = window.scrollY;
        this.stuck.set(y > 24);
        // Hide on the way down, bring it back the moment they reverse. The
        // header is only in the way when you are reading forward.
        const hide = y > 420 && y > last && !this.menuOpen();
        this.hidden.set(hide);

        // Sticky sub-navigation (the estimator progress bar, the work filter,
        // the services jump bar) sits directly beneath the header. When the
        // header retracts, that offset has to collapse or page content scrolls
        // visibly through the gap it leaves behind.
        root.style.setProperty('--sticky-top', hide ? '0px' : 'var(--header-h)');

        last = y;
      };

      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });

      const onKey = (e: KeyboardEvent) => {
        if (e.key !== 'Escape') return;
        this.closeMenu();
        this.closeMega();
      };
      window.addEventListener('keydown', onKey);

      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('keydown', onKey);
        this.scroll.start();
        document.body.style.removeProperty('overflow');
        root.style.removeProperty('--sticky-top');
      });
    });
  }

  protected openMega(): void {
    clearTimeout(this.megaTimer);
    this.megaOpen.set(true);
  }

  /** Leaving the trigger or the panel closes it, unless the pointer crosses
      between the two, which the delay absorbs. */
  protected scheduleMegaClose(): void {
    clearTimeout(this.megaTimer);
    this.megaTimer = setTimeout(() => this.megaOpen.set(false), 160);
  }

  protected closeMega(): void {
    clearTimeout(this.megaTimer);
    this.megaOpen.set(false);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
    this.lockScroll(this.menuOpen());
  }

  protected closeMenu(): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    this.lockScroll(false);
  }

  private lockScroll(locked: boolean): void {
    if (typeof document === 'undefined') return;
    // Lenis needs telling too, otherwise the page keeps gliding behind the drawer.
    if (locked) this.scroll.stop();
    else this.scroll.start();
    document.body.style.overflow = locked ? 'hidden' : '';
  }
}
