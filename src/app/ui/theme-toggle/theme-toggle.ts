import { ChangeDetectionStrategy, Component, afterNextRender, computed, inject } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="toggle"
      (click)="theme.toggle()"
      [attr.aria-label]="label()"
      [title]="label()"
    >
      <span class="toggle__track" aria-hidden="true">
        <span class="toggle__knob">
          <!-- Sun -->
          <svg class="toggle__ico toggle__ico--sun" viewBox="0 0 16 16" width="11" height="11">
            <circle cx="8" cy="8" r="3.1" fill="currentColor" />
            <g stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
              <path d="M8 1v1.6M8 13.4V15M1 8h1.6M13.4 8H15M3 3l1.1 1.1M11.9 11.9 13 13M13 3l-1.1 1.1M4.1 11.9 3 13" />
            </g>
          </svg>
          <!-- Moon -->
          <svg class="toggle__ico toggle__ico--moon" viewBox="0 0 16 16" width="11" height="11">
            <path
              d="M13.2 9.6A5.8 5.8 0 0 1 6.4 2.8 5.8 5.8 0 1 0 13.2 9.6Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </span>
    </button>
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    .toggle {
      display: inline-flex;
      align-items: center;
      padding: 0;
      border-radius: var(--r-pill);
    }

    .toggle__track {
      position: relative;
      display: block;
      width: 46px;
      height: 26px;
      border: 1px solid var(--line-strong);
      border-radius: var(--r-pill);
      background: var(--tint-1);
      transition:
        border-color var(--d-fast) var(--e-out),
        background var(--d-fast) var(--e-out);
    }

    .toggle:hover .toggle__track {
      border-color: var(--signal-line);
      background: var(--signal-wash);
    }

    .toggle__knob {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: var(--text);
      color: var(--ink-900);
      transition: transform 420ms var(--e-out);
    }

    /* Light theme parks the knob on the right. */
    :host-context([data-theme='light']) .toggle__knob {
      transform: translateX(20px);
    }

    .toggle__ico {
      position: absolute;
      transition:
        opacity 260ms var(--e-out),
        transform 420ms var(--e-out);
    }

    /* Dark theme shows the moon; light shows the sun. */
    .toggle__ico--sun {
      opacity: 0;
      transform: rotate(-90deg) scale(0.6);
    }

    .toggle__ico--moon {
      opacity: 1;
    }

    :host-context([data-theme='light']) .toggle__ico--sun {
      opacity: 1;
      transform: none;
    }

    :host-context([data-theme='light']) .toggle__ico--moon {
      opacity: 0;
      transform: rotate(90deg) scale(0.6);
    }
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);

  protected readonly label = computed(() =>
    this.theme.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
  );

  constructor() {
    // The bootstrap script in index.html has already set the attribute; pick it
    // up so the control starts in the right position.
    afterNextRender(() => this.theme.syncFromDom());
  }
}
