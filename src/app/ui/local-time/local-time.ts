import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * Live local clock for an office.
 *
 * Renders a placeholder on the server and fills in after hydration — a real
 * clock in prerendered HTML would be both wrong and a hydration mismatch.
 */
@Component({
  selector: 'app-local-time',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="tnum">{{ display() }}</span
    ><span class="state" [class.is-open]="working()" aria-hidden="true"></span>`,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-variant-numeric: tabular-nums;
    }

    .state {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--text-faint);
      flex: none;
    }

    .state.is-open {
      background: var(--live);
    }
  `,
})
export class LocalTime {
  /** Fixed UTC offset in hours. */
  readonly utcOffset = input.required<number>();

  private readonly now = signal<Date | null>(null);

  protected readonly display = computed(() => {
    const now = this.now();
    if (!now) return '--:--';
    const local = new Date(now.getTime() + this.utcOffset() * 3_600_000);
    const h = String(local.getUTCHours()).padStart(2, '0');
    const m = String(local.getUTCMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  });

  /** Roughly "someone is probably there" — 08:00 to 19:00 local. */
  protected readonly working = computed(() => {
    const now = this.now();
    if (!now) return false;
    const h = new Date(now.getTime() + this.utcOffset() * 3_600_000).getUTCHours();
    return h >= 8 && h < 19;
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      this.now.set(new Date());
      const id = setInterval(() => this.now.set(new Date()), 30_000);
      destroyRef.onDestroy(() => clearInterval(id));
    });
  }
}
