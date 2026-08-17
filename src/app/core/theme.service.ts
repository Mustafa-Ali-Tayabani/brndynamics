import { DOCUMENT, Injectable, inject, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

export const THEME_KEY = 'brn-theme';

/**
 * Light / dark theming.
 *
 * Dark is the brand default; light is an explicit choice, remembered in
 * localStorage. The attribute is written to <html> by the inline bootstrap in
 * index.html before first paint, so there is never a flash of the wrong theme —
 * this service only keeps the signal in step and handles later toggles.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);

  readonly theme = signal<Theme>('dark');

  /** Reads whatever the bootstrap script already applied. */
  syncFromDom(): void {
    const attr = this.doc.documentElement.getAttribute('data-theme');
    this.theme.set(attr === 'light' ? 'light' : 'dark');
  }

  toggle(): void {
    this.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this.theme.set(theme);

    const root = this.doc.documentElement;
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');

    // Keeps the mobile browser chrome in step with the page.
    this.doc
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#f4f6f7' : '#08090a');

    // Kill transitions for one frame so the page swaps as a unit rather than
    // each component cross-fading on its own schedule.
    root.classList.add('theme-switching');
    const win = this.doc.defaultView;
    win?.requestAnimationFrame(() =>
      win.requestAnimationFrame(() => root.classList.remove('theme-switching')),
    );

    try {
      win?.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Private browsing or blocked storage — the choice just will not persist.
    }
  }
}
