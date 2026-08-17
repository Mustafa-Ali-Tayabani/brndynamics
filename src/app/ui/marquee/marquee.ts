import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Infinite wordmark ticker. The list is rendered twice and translated by
 * exactly -50%, so the seam is invisible and no JS is involved.
 */
@Component({
  selector: 'app-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="marquee" [style.--marquee-duration.s]="duration()">
      <div class="marquee__track">
        @for (item of doubled(); track $index) {
          <span class="marquee__item mono" [attr.aria-hidden]="$index >= items().length || null">
            {{ item }}
            <i class="marquee__sep" aria-hidden="true">◇</i>
          </span>
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      overflow: hidden;
      /* Fade the edges so items dissolve rather than clip. */
      mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    }

    .marquee {
      display: flex;
      width: max-content;
    }

    .marquee__track {
      display: flex;
      align-items: center;
      width: max-content;
      animation: scroll var(--marquee-duration, 46s) linear infinite;
    }

    :host(:hover) .marquee__track {
      animation-play-state: paused;
    }

    .marquee__item {
      display: inline-flex;
      align-items: center;
      gap: clamp(1.5rem, 3vw, 2.75rem);
      padding-inline-end: clamp(1.5rem, 3vw, 2.75rem);
      color: var(--text-faint);
      white-space: nowrap;
      transition: color var(--d-fast) var(--e-out);
    }

    .marquee__item:hover {
      color: var(--text);
    }

    .marquee__sep {
      color: var(--signal);
      font-style: normal;
      font-size: 0.55em;
      opacity: 0.7;
    }

    @keyframes scroll {
      to {
        transform: translate3d(-50%, 0, 0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .marquee__track {
        animation: none;
      }

      :host {
        overflow-x: auto;
      }
    }
  `,
})
export class Marquee {
  readonly items = input.required<readonly string[]>();
  readonly duration = input(46);

  protected readonly doubled = computed(() => [...this.items(), ...this.items()]);
}
