import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';

/**
 * Animated line icons, one per service, keyed by capability id.
 *
 * Each stroke draws itself on when the icon scrolls into view, and redraws on
 * hover. `pathLength="1"` normalises every path to a single unit so one dash
 * rule animates all of them regardless of their real length, which is what
 * lets the stagger stay even across shapes of very different sizes.
 *
 * Drawn on a 24x24 grid at 1.5 stroke so they carry the same visual weight as
 * the rest of the hairline detailing. Stroke inherits currentColor.
 */
@Component({
  selector: 'app-service-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        @for (d of paths(); track $index; let i = $index) {
          <path [attr.d]="d" pathLength="1" [style.--i]="i" />
        }
      </g>
      @for (c of circles(); track $index; let i = $index) {
        <circle
          class="dot"
          [attr.cx]="c[0]"
          [attr.cy]="c[1]"
          [attr.r]="c[2]"
          fill="currentColor"
          [style.--i]="paths().length + i"
        />
      }
    </svg>
  `,
  styleUrl: './service-icon.scss',
})
export class ServiceIcon {
  readonly name = input.required<string>();

  private readonly host = inject(ElementRef<HTMLElement>);

  /** [outline paths, accent dots] per service id. */
  private static readonly ART: Record<string, { p: string[]; c?: [number, number, number][] }> = {
    // Artboard with a cursor: the design surface and the pointer shaping it.
    'product-design': {
      p: [
        'M3 4.5h13.5v10H3z',
        'M6.5 2v2.5M13 2v2.5M6.5 14.5V17M13 14.5V17',
        'M1 7.5h2M1 11.5h2',
        'M14.5 13.5 21.5 20l-2.6.6-1.2 2.4-3.2-9.5Z',
      ],
    },
    // Tenants stacked above a shared platform layer.
    'saas-development': {
      p: ['M12 2.5 21 7l-9 4.5L3 7l9-4.5Z', 'M3 12l9 4.5L21 12', 'M3 16.5 12 21l9-4.5'],
    },
    // Records wired to people: the CRM and ERP shape.
    'crm-erp': {
      p: [
        'M3 5.5h8v5H3z',
        'M3 13.5h8v5H3z',
        'M11 8h4a2 2 0 0 1 2 2v6',
        'M17 19.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z',
        'M17 8.1a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z',
      ],
    },
    // A node with spokes and a spark at the centre.
    'ai-automation': {
      p: [
        'M12 3v3.2M12 17.8V21M3 12h3.2M17.8 12H21',
        'M8.5 8.5 6.2 6.2M17.8 17.8l-2.3-2.3M8.5 15.5l-2.3 2.3M17.8 6.2l-2.3 2.3',
        'M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z',
      ],
      c: [[12, 12, 1.4]],
    },
    // A browser frame beside a handset.
    'web-mobile': {
      p: [
        'M2 4.5h12.5v10H2z',
        'M2 7.5h12.5',
        'M8.5 14.5V18M6 18h5',
        'M17.5 8h4a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z',
        'M18.8 18.6h1.4',
      ],
      c: [
        [4.3, 6, 0.6],
        [6.3, 6, 0.6],
      ],
    },
    // Angle brackets around a build pipeline.
    'software-engineering': {
      p: ['M7.5 7 3 12l4.5 5', 'M16.5 7 21 12l-4.5 5', 'M13.5 4.5 10.5 19.5'],
    },
    // Shield with a verification mark.
    'security-compliance': {
      p: ['M12 2.5 20 6v6c0 4.6-3.4 8-8 9.5C7.4 20 4 16.6 4 12V6l8-3.5Z', 'M8.8 12.2 11 14.4l4.4-4.6'],
    },
  };

  protected readonly paths = computed(() => ServiceIcon.ART[this.name()]?.p ?? []);
  protected readonly circles = computed(() => ServiceIcon.ART[this.name()]?.c ?? []);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const el = this.host.nativeElement as HTMLElement;

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('is-drawn');
        return;
      }

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          el.classList.add('is-drawn');
          io.disconnect();
        },
        { threshold: 0.4 },
      );
      io.observe(el);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
