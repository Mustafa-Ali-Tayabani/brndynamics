import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Decorative hairline verticals pinned to the container grid. */
@Component({
  selector: 'app-grid-lines',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid-lines" aria-hidden="true">
      <div class="grid-lines__inner">
        <span></span><span></span><span></span><span></span>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class GridLines {}
