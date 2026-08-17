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
 * Counts a numeric stat up from zero the first time it enters the viewport.
 * The final value is present in the prerendered HTML, so no-JS and crawler
 * output is already correct — this only animates the way it arrives.
 */
@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective {
  readonly appCountUp = input.required({ transform: numberAttribute });
  readonly countPrefix = input('');
  readonly countSuffix = input('');
  readonly countDuration = input(1600, { transform: numberAttribute });

  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    const destroyRef = inject(DestroyRef);
    let frame = 0;

    afterNextRender(() => {
      const el = this.host.nativeElement as HTMLElement;
      const target = this.appCountUp();

      if (
        matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !('IntersectionObserver' in window)
      ) {
        return;
      }

      const render = (n: number) => {
        el.textContent = `${this.countPrefix()}${n}${this.countSuffix()}`;
      };

      const run = () => {
        const duration = this.countDuration();
        const start = performance.now();

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutExpo — fast arrival, long settle
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          render(Math.round(target * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      };

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            observer.disconnect();
            render(0);
            run();
          }
        },
        { threshold: 0.5 },
      );

      observer.observe(el);

      destroyRef.onDestroy(() => {
        observer.disconnect();
        cancelAnimationFrame(frame);
      });
    });
  }
}
