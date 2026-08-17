import { Directive, ElementRef, DestroyRef, afterNextRender, inject } from '@angular/core';

/**
 * Publishes the pointer position within an element as `--mx` / `--my`
 * percentages, so a card can light up under the cursor.
 *
 * The visual belongs to the card's own CSS; this only supplies coordinates.
 */
@Directive({
  selector: '[appSpotlight]',
  host: { class: 'has-spotlight' },
})
export class SpotlightDirective {
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const el = this.host.nativeElement as HTMLElement;
      if (!matchMedia('(pointer: fine)').matches) return;

      let frame = 0;

      const onMove = (e: PointerEvent) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          el.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
          el.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
        });
      };

      const onEnter = () => el.style.setProperty('--spot', '1');
      const onLeave = () => {
        cancelAnimationFrame(frame);
        el.style.setProperty('--spot', '0');
      };

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerenter', onEnter);
      el.addEventListener('pointerleave', onLeave);

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerenter', onEnter);
        el.removeEventListener('pointerleave', onLeave);
      });
    });
  }
}
