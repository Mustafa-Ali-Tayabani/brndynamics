import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BRAND_MARKS } from '../../data/brand-marks.data';

/**
 * A third-party brand logo.
 *
 *   <app-brand-mark name="Angular" />
 *
 * Single-colour marks inherit `currentColor` and take their official colour on
 * hover, so a wall of them reads as one set at rest and comes alive on contact.
 * Multi-colour marks (Microsoft, Slack) render as authored and desaturate at
 * rest instead.
 *
 * Names with no entry in BRAND_MARKS fall back to a set wordmark — an intended
 * treatment, not a placeholder, so the wall stays complete while logos are
 * still being collected.
 */
@Component({
  selector: 'app-brand-mark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (art(); as a) {
      <svg viewBox="0 0 24 24" class="mark" [class.mark--multi]="!!a.multi" aria-hidden="true">
        @if (a.multi) {
          @for (p of a.multi; track $index) {
            <path [attr.d]="p[0]" [attr.fill]="p[1]" />
          }
        } @else {
          <path [attr.d]="a.d" fill="currentColor" />
        }
      </svg>
    } @else {
      <span class="wordmark">{{ name() }}</span>
    }
    <span class="visually-hidden">{{ name() }}</span>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--text-dim);
      transition: color var(--d-mid) var(--e-out);
      --brand: currentColor;
    }

    .mark {
      width: auto;
      height: var(--mark-h, 30px);
      display: block;
      transition:
        color var(--d-mid) var(--e-out),
        filter var(--d-mid) var(--e-out),
        transform var(--d-mid) var(--e-out);
    }

    /* Multi-colour marks cannot be tinted, so they sit desaturated until hover. */
    .mark--multi {
      filter: grayscale(1) opacity(0.72);
    }

    .wordmark {
      font-family: var(--f-display);
      font-size: clamp(0.9rem, 1.35vw, 1.15rem);
      font-weight: 500;
      letter-spacing: var(--tr-snug);
      text-align: center;
      text-wrap: balance;
      transition: color var(--d-mid) var(--e-out);
    }

    /* The parent cell owns the hover; this just reacts to it. */
    :host(:hover),
    :host-context(.is-lit) {
      color: var(--brand, var(--text));
    }

    :host(:hover) .mark--multi,
    :host-context(.is-lit) .mark--multi {
      filter: none;
    }
  `,
  host: { '[style.--brand]': 'brandColour()' },
})
export class BrandMark {
  readonly name = input.required<string>();

  /** Use the official brand colour on hover rather than the text colour. */
  readonly tint = input(true);

  protected readonly art = computed(() => BRAND_MARKS[this.name()]);

  protected readonly brandColour = computed(() => {
    const a = this.art();
    return this.tint() && a?.hex ? a.hex : null;
  });
}
