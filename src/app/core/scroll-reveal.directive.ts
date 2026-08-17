import {
  Directive,
  ElementRef,
  afterNextRender,
  inject,
  input,
  DestroyRef,
  numberAttribute,
} from '@angular/core';

/**
 * Reveals an element once it scrolls into view.
 *
 * The element ships with `data-reveal` (hidden) in the prerendered HTML and
 * flips to `data-reveal="in"` on intersection. Global CSS keeps it visible when
 * JS never boots or when the user prefers reduced motion.
 *
 *   <div appReveal [revealDelay]="80">…</div>
 */
@Directive({
  selector: '[appReveal]',
  host: { '[attr.data-reveal]': 'state', '[style.--reveal-delay.ms]': 'revealDelay()' },
})
export class ScrollRevealDirective {
  /** Stagger in milliseconds, applied as a CSS transition-delay. */
  readonly revealDelay = input(0, { transform: numberAttribute });

  /** How much of the element must be visible before it reveals (0–1). */
  readonly revealThreshold = input(0.15, { transform: numberAttribute });

  protected state: '' | 'in' = '';

  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const el = this.host.nativeElement as HTMLElement;

      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || !('IntersectionObserver' in window)) {
        this.reveal();
        return;
      }

      // Anything already above the fold on load reveals immediately rather than
      // waiting for a scroll that may never come.
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            this.reveal();
            observer.disconnect();
          }
        },
        { threshold: this.revealThreshold(), rootMargin: '0px 0px -8% 0px' },
      );

      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  private reveal(): void {
    this.state = 'in';
    // Zoneless: host bindings re-evaluate on the next change detection pass,
    // so nudge the attribute directly to avoid a frame of stale state.
    (this.host.nativeElement as HTMLElement).setAttribute('data-reveal', 'in');
  }
}
