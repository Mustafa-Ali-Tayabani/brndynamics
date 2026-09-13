import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  DOCUMENT,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../../core/scroll-reveal.directive';

/**
 * Brand band: the van drives across as the section passes the viewport.
 *
 * The artwork is never cropped. It is narrower than the band and travels
 * through the slack, so the whole frame stays visible at both extremes rather
 * than being pushed past the edge.
 *
 * Progress is written straight to a custom property in the rAF callback rather
 * than through a signal, so scrolling never triggers change detection.
 */
@Component({
  selector: 'app-drive',
  imports: [RouterLink, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './drive.html',
  styleUrl: './drive.scss',
})
export class Drive {
  private readonly doc = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const win = this.doc.defaultView;
      if (!win) return;

      if (win.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        this.host.style.setProperty('--drive', '0.5');
        return;
      }

      let frame = 0;
      let live = false;

      const measure = () => {
        frame = 0;
        const r = this.host.getBoundingClientRect();
        // 0 as the band enters from below, 1 as it leaves above.
        const span = win.innerHeight + r.height;
        const p = Math.min(1, Math.max(0, (win.innerHeight - r.top) / span));
        this.host.style.setProperty('--drive', p.toFixed(4));
      };

      const onScroll = () => {
        if (!live || frame) return;
        frame = win.requestAnimationFrame(measure);
      };

      const io = new IntersectionObserver(([e]) => {
        live = e.isIntersecting;
        if (live) measure();
      });
      io.observe(this.host);

      win.addEventListener('scroll', onScroll, { passive: true });
      win.addEventListener('resize', onScroll, { passive: true });
      measure();

      this.destroyRef.onDestroy(() => {
        io.disconnect();
        if (frame) win.cancelAnimationFrame(frame);
        win.removeEventListener('scroll', onScroll);
        win.removeEventListener('resize', onScroll);
      });
    });
  }
}
