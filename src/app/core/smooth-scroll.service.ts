import { DestroyRef, Injectable, NgZone, inject, signal } from '@angular/core';
import Lenis from 'lenis';

/**
 * Inertial scrolling.
 *
 * Native scroll on a long editorial page feels abrupt — content snaps rather
 * than settles. Lenis interpolates the scroll position each frame, which is
 * what gives the reference sites their weight.
 *
 * Everything here is browser-only and opt-out under `prefers-reduced-motion`,
 * where we fall back to native scrolling entirely.
 */
@Injectable({ providedIn: 'root' })
export class SmoothScrollService {
  /** 0–1 progress through the document, for the header progress rail. */
  readonly progress = signal(0);

  /** Current scroll velocity, used to bend motion under fast flicks. */
  readonly velocity = signal(0);

  readonly enabled = signal(false);

  private lenis?: Lenis;
  private raf = 0;
  private readonly zone = inject(NgZone);

  // Injected as a field: `init()` is called from afterNextRender, which is not
  // an injection context, so inject() would throw NG0203 there.
  private readonly destroyRef = inject(DestroyRef);

  init(): void {
    if (this.lenis) return;
    if (typeof window === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.lenis = new Lenis({
      // ~0.9s to settle: enough weight to feel deliberate, not enough to feel
      // like the page is fighting the wheel.
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      // Touch devices already have momentum; doubling it feels wrong.
      syncTouch: false,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });

    this.enabled.set(true);
    document.documentElement.classList.add('lenis-on');

    this.lenis.on('scroll', (e: { progress: number; velocity: number }) => {
      // Written outside Angular; consumers read them as signals.
      this.progress.set(e.progress || 0);
      this.velocity.set(e.velocity || 0);
    });

    // The rAF loop must stay out of the zone or it schedules change detection
    // on every frame.
    this.zone.runOutsideAngular(() => {
      const loop = (time: number) => {
        this.lenis?.raf(time);
        this.raf = requestAnimationFrame(loop);
      };
      this.raf = requestAnimationFrame(loop);
    });

    this.destroyRef.onDestroy(() => this.destroy());
  }

  /** Scroll to an element or offset. Falls back to native when Lenis is off. */
  scrollTo(target: string | HTMLElement | number, offset = 0): void {
    if (this.lenis) {
      this.lenis.scrollTo(target, { offset, duration: 1.1 });
      return;
    }
    if (typeof window === 'undefined') return;
    const el =
      typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    if (typeof el === 'number') window.scrollTo({ top: el + offset, behavior: 'smooth' });
    else if (el) window.scrollTo({ top: el.getBoundingClientRect().top + scrollY + offset });
  }

  /** Lock scrolling — used by the mobile drawer. */
  stop(): void {
    this.lenis?.stop();
  }

  start(): void {
    this.lenis?.start();
  }

  /** Re-measure after route changes swap the page height. */
  resize(): void {
    this.lenis?.resize();
  }

  private destroy(): void {
    cancelAnimationFrame(this.raf);
    this.lenis?.destroy();
    this.lenis = undefined;
    this.enabled.set(false);
    document.documentElement.classList.remove('lenis-on');
  }
}
