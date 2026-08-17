import { Directive, ElementRef, afterNextRender, inject, input, DestroyRef } from '@angular/core';

/**
 * Pulls an element gently toward the cursor. Fine pointers only — on touch it
 * is a no-op, and it is skipped entirely under prefers-reduced-motion.
 */
@Directive({
  selector: '[appMagnetic]',
})
export class MagneticDirective {
  /** Maximum travel in pixels. */
  readonly magneticStrength = input(10);

  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const el = this.host.nativeElement as HTMLElement;

      if (
        !matchMedia('(pointer: fine)').matches ||
        matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      const strength = this.magneticStrength();
      let frame = 0;

      const onMove = (event: PointerEvent) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const dx = event.clientX - (rect.left + rect.width / 2);
          const dy = event.clientY - (rect.top + rect.height / 2);
          // Normalise against half-size so travel is proportional, then clamp.
          const x = Math.max(-1, Math.min(1, dx / (rect.width / 2))) * strength;
          const y = Math.max(-1, Math.min(1, dy / (rect.height / 2))) * strength;
          el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
        });
      };

      const onLeave = () => {
        cancelAnimationFrame(frame);
        el.style.transform = '';
      };

      el.style.willChange = 'transform';
      el.style.transition = 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)';
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      });
    });
  }
}
