import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type VisualKind = 'dusk' | 'ember' | 'tide' | 'signal' | 'sand' | 'moss';

interface Blob {
  /** Percentage position within the frame. */
  x: number;
  y: number;
  /** Diameter as a percentage of the frame width. */
  size: number;
  color: string;
  /** Drift animation offset, in seconds. */
  delay: number;
}

/**
 * Abstract colour fields.
 *
 * An earlier version of this drew schematic diagrams — network topologies,
 * stacks, radar sweeps. They were accurate and completely cold, which is the
 * wrong register for a page about people picking up the phone.
 *
 * These are colour instead: a few large, heavily blurred blobs layered into a
 * field, with film grain over the top so the gradient has some tooth rather
 * than looking like a synthetic mesh. Motion is a slow drift measured in tens
 * of seconds — noticeable if you sit with it, invisible while reading.
 *
 * Each palette is a mood, not a diagram of anything. Assign one per case study
 * or discipline so pages stay distinguishable from each other.
 */
@Component({
  selector: 'app-visual',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="field"
      [attr.role]="alt() ? 'img' : 'presentation'"
      [attr.aria-label]="alt() || null"
      [attr.aria-hidden]="alt() ? null : true"
    >
      @for (b of blobs(); track $index) {
        <span
          class="blob"
          [style.left.%]="b.x"
          [style.top.%]="b.y"
          [style.width.%]="b.size"
          [style.background]="'radial-gradient(circle, ' + b.color + ' 0%, transparent 68%)'"
          [style.animation-delay.s]="b.delay"
        ></span>
      }
    </div>
    <span class="grain" aria-hidden="true"></span>
    <span class="vignette" aria-hidden="true"></span>
  `,
  styleUrl: './visual.scss',
  host: { '[attr.data-kind]': 'kind()' },
})
export class Visual {
  readonly kind = input<VisualKind>('signal');

  /** Decorative by default; pass a description when the artwork carries meaning. */
  readonly alt = input<string>('');

  /** Retained for existing call sites; these fields never render text. */
  readonly labels = input(true);

  private static readonly PALETTES: Record<VisualKind, Blob[]> = {
    // Indigo settling into rose and a low amber — end of a long day.
    dusk: [
      { x: 18, y: 22, size: 78, color: 'rgba(72,86,220,0.95)', delay: 0 },
      { x: 62, y: 12, size: 66, color: 'rgba(214,92,140,0.85)', delay: -9 },
      { x: 74, y: 66, size: 84, color: 'rgba(240,158,86,0.72)', delay: -18 },
      { x: 26, y: 78, size: 60, color: 'rgba(38,32,86,0.95)', delay: -27 },
    ],
    // Plum through coral to gold.
    ember: [
      { x: 24, y: 30, size: 74, color: 'rgba(126,44,110,0.95)', delay: 0 },
      { x: 70, y: 26, size: 70, color: 'rgba(233,94,84,0.88)', delay: -11 },
      { x: 52, y: 78, size: 82, color: 'rgba(246,176,74,0.75)', delay: -21 },
      { x: 12, y: 72, size: 56, color: 'rgba(58,22,58,0.9)', delay: -30 },
    ],
    // Cool and clean, but not clinical.
    tide: [
      { x: 22, y: 26, size: 76, color: 'rgba(20,124,160,0.95)', delay: 0 },
      { x: 68, y: 20, size: 64, color: 'rgba(46,196,182,0.8)', delay: -8 },
      { x: 60, y: 74, size: 80, color: 'rgba(30,74,150,0.9)', delay: -19 },
      { x: 18, y: 76, size: 54, color: 'rgba(126,214,206,0.55)', delay: -28 },
    ],
    // The brand blue, given room to breathe.
    signal: [
      { x: 20, y: 24, size: 78, color: 'rgba(46,91,255,0.95)', delay: 0 },
      { x: 70, y: 18, size: 62, color: 'rgba(122,102,255,0.82)', delay: -10 },
      { x: 66, y: 72, size: 84, color: 'rgba(18,32,120,0.95)', delay: -20 },
      { x: 22, y: 80, size: 56, color: 'rgba(96,196,255,0.55)', delay: -29 },
    ],
    // Warm neutrals — the quietest of the set.
    sand: [
      { x: 26, y: 24, size: 76, color: 'rgba(206,146,88,0.9)', delay: 0 },
      { x: 68, y: 30, size: 68, color: 'rgba(232,196,142,0.8)', delay: -12 },
      { x: 48, y: 78, size: 78, color: 'rgba(140,90,64,0.85)', delay: -22 },
      { x: 14, y: 70, size: 52, color: 'rgba(88,58,44,0.8)', delay: -31 },
    ],
    // Deep green with a gold lift.
    moss: [
      { x: 22, y: 28, size: 74, color: 'rgba(28,96,74,0.95)', delay: 0 },
      { x: 70, y: 22, size: 66, color: 'rgba(122,166,96,0.78)', delay: -9 },
      { x: 58, y: 76, size: 80, color: 'rgba(16,52,44,0.95)', delay: -20 },
      { x: 20, y: 74, size: 54, color: 'rgba(214,182,92,0.6)', delay: -30 },
    ],
  };

  protected readonly blobs = computed(() => Visual.PALETTES[this.kind()] ?? Visual.PALETTES.signal);
}
