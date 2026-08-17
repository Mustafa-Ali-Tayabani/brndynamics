import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LOGO_DOT, LOGO_FULL, LOGO_MARK } from './logo.paths';

/**
 * The BrnDynamics logo.
 *
 *   <app-brand-logo variant="mark" />   'brn' + dot  — header, tight spaces
 *   <app-brand-logo variant="full" />   full stacked lockup
 *
 * The wordmark inherits `currentColor`; the dot keeps the brand blue. Height is
 * driven by CSS (`--logo-h`), width follows the aspect ratio.
 */
@Component({
  selector: 'app-brand-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.viewBox]="art().viewBox"
      fill="none"
      role="img"
      [attr.aria-label]="label()"
      class="logo"
    >
      <path [attr.d]="art().d" fill="currentColor" fill-rule="evenodd" class="logo__type" />
      <circle [attr.cx]="dot.cx" [attr.cy]="dot.cy" [attr.r]="dot.r" class="logo__dot" />
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      line-height: 0;
    }

    .logo {
      display: block;
      height: var(--logo-h, 2rem);
      width: auto;
      overflow: visible;
    }

    .logo__dot {
      fill: var(--signal);
      transition: fill var(--d-mid) var(--e-out);
      transform-box: fill-box;
      transform-origin: center;
    }
  `,
})
export class BrandLogo {
  readonly variant = input<'full' | 'mark'>('mark');
  readonly label = input('BrnDynamics');

  protected readonly dot = LOGO_DOT;
  protected readonly art = computed(() => (this.variant() === 'full' ? LOGO_FULL : LOGO_MARK));
}
