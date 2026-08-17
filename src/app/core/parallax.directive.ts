import {
  Directive,
  ElementRef,
  DestroyRef,
  NgZone,
  afterNextRender,
  inject,
  input,
  numberAttribute,
} from '@angular/core';

/**
 * Moves an element against the scroll as it crosses the viewport.
 *
 *   <img appParallax [parallaxAmount]="60">   travels 60px slower than the page
 *   <div appParallax parallaxAxis="scale">    grows slightly instead
 *
 * Driven by a shared rAF loop rather than a scroll listener so several of these
 * on one page still composite in a single frame.
 */
@Directive({
  selector: '[appParallax]',
})
export class ParallaxDirective {
  /** Total travel in pixels across the full crossing. */
  readonly parallaxAmount = input(70, { transform: numberAttribute });
  readonly parallaxAxis = input<'y' | 'x' | 'scale'>('y');

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const el = this.host.nativeElement as HTMLElement;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const amount = this.parallaxAmount();
      const axis = this.parallaxAxis();
      let frame = 0;
      let visible = false;
      let current = 0;
      let target = 0;

      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible && !frame) this.zone.runOutsideAngular(() => (frame = requestAnimationFrame(tick)));
        },
        { rootMargin: '15% 0px' },
      );

      const measure = () => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // -1 when the element is just below the fold, +1 when just above it.
        const p = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
        target = Math.max(-1, Math.min(1, p));
      };

      const tick = () => {
        measure();
        // Ease toward the target so fast flicks do not judder.
        current += (target - current) * 0.12;
        const v = current * amount;
        el.style.transform =
          axis === 'scale'
            ? `scale(${(1 + Math.abs(current) * (amount / 1000)).toFixed(4)})`
            : axis === 'x'
              ? `translate3d(${v.toFixed(2)}px,0,0)`
              : `translate3d(0,${v.toFixed(2)}px,0)`;

        if (visible) frame = requestAnimationFrame(tick);
        else frame = 0;
      };

      el.style.willChange = 'transform';
      io.observe(el);

      destroyRef.onDestroy(() => {
        io.disconnect();
        cancelAnimationFrame(frame);
      });
    });
  }
}
