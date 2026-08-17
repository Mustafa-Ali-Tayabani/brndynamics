import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';

/**
 * A trailing cursor ring for fine pointers.
 *
 * The native cursor is kept — removing it costs more in usability than the
 * effect is worth. The ring lags slightly behind it, widens over interactive
 * elements, and picks up a label from `data-cursor` when one is offered.
 *
 * Position is written straight to the DOM from a rAF loop outside Angular;
 * nothing here triggers change detection.
 */
@Component({
  selector: 'app-cursor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #ring class="ring" aria-hidden="true">
      <span #label class="ring__label"></span>
    </div>
    <div #dot class="dot" aria-hidden="true"></div>
  `,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 999;
      pointer-events: none;
      display: none;
    }

    /* Fine pointers only, and never when motion is reduced. */
    @media (pointer: fine) and (prefers-reduced-motion: no-preference) {
      :host {
        display: block;
      }
    }

    .ring,
    .dot {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
      opacity: 0;
      will-change: transform;
    }

    .ring {
      display: grid;
      place-items: center;
      width: 38px;
      height: 38px;
      margin: -19px 0 0 -19px;
      border: 1px solid var(--scrim);
      transition:
        width 340ms var(--e-out),
        height 340ms var(--e-out),
        margin 340ms var(--e-out),
        background 340ms var(--e-out),
        border-color 340ms var(--e-out),
        opacity 240ms linear;
    }

    .dot {
      width: 5px;
      height: 5px;
      margin: -2.5px 0 0 -2.5px;
      background: var(--signal-hi);
      transition: opacity 240ms linear;
    }

    :host(.is-live) .ring,
    :host(.is-live) .dot {
      opacity: 1;
    }

    /* Over a link or button */
    :host(.is-hot) .ring {
      width: 62px;
      height: 62px;
      margin: -31px 0 0 -31px;
      background: rgb(46 91 255 / 14%);
      border-color: var(--signal-line);
    }

    :host(.is-hot) .dot {
      opacity: 0;
    }

    /* Carrying a data-cursor label */
    :host(.has-label) .ring {
      width: 86px;
      height: 86px;
      margin: -43px 0 0 -43px;
      background: var(--signal);
      border-color: var(--signal);
    }

    .ring__label {
      font-family: var(--f-label);
      font-size: 9px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--on-signal);
      opacity: 0;
      transform: scale(0.7);
      transition:
        opacity 220ms var(--e-out),
        transform 340ms var(--e-out);
      white-space: nowrap;
    }

    :host(.has-label) .ring__label {
      opacity: 1;
      transform: none;
    }

    :host(.is-down) .ring {
      scale: 0.86;
    }
  `,
})
export class Cursor {
  private readonly ringRef = viewChild.required<ElementRef<HTMLElement>>('ring');
  private readonly dotRef = viewChild.required<ElementRef<HTMLElement>>('dot');
  private readonly labelRef = viewChild.required<ElementRef<HTMLElement>>('label');
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (
        !matchMedia('(pointer: fine)').matches ||
        matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      const host = this.hostRef.nativeElement as HTMLElement;
      const ring = this.ringRef().nativeElement;
      const dot = this.dotRef().nativeElement;
      const label = this.labelRef().nativeElement;

      let mx = innerWidth / 2;
      let my = innerHeight / 2;
      let rx = mx;
      let ry = my;
      let frame = 0;

      const HOT = 'a, button, input, textarea, select, summary, [role="button"], .has-spotlight';

      const onMove = (e: PointerEvent) => {
        mx = e.clientX;
        my = e.clientY;
        host.classList.add('is-live');

        const el = (e.target as HTMLElement)?.closest?.(HOT) as HTMLElement | null;
        const text = el?.closest<HTMLElement>('[data-cursor]')?.dataset['cursor'];

        host.classList.toggle('is-hot', !!el);
        host.classList.toggle('has-label', !!text);
        if (text && label.textContent !== text) label.textContent = text;
      };

      const onLeave = () => host.classList.remove('is-live');
      const onDown = () => host.classList.add('is-down');
      const onUp = () => host.classList.remove('is-down');

      this.zone.runOutsideAngular(() => {
        const tick = () => {
          // The dot tracks exactly; the ring trails, which is what reads as weight.
          rx += (mx - rx) * 0.18;
          ry += (my - ry) * 0.18;
          ring.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0)`;
          dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
          frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      });

      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      window.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        window.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerleave', onLeave);
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
      });
    });
  }
}
