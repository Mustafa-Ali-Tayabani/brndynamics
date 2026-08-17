import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';
import { SplitTextDirective } from '../../core/split-text.directive';

/**
 * The repeating section header: mono index rule, display title, optional lede.
 *   <app-section-head index="02" label="Capabilities" title="…" lede="…" />
 */
@Component({
  selector: 'app-section-head',
  imports: [ScrollRevealDirective, SplitTextDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="sec-head" appReveal>
      <p class="sec-head__index mono">
        <b>{{ index() }}</b>
        <span>{{ label() }}</span>
      </p>

      <div class="sec-head__body">
        <h2 [class]="titleClass()" appSplitText>{{ title() }}</h2>
        @if (lede()) {
          <p class="lede">{{ lede() }}</p>
        }
      </div>
    </header>
  `,
  styles: `
    :host {
      display: block;
    }

    .sec-head__body {
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
      gap: clamp(1.5rem, 4vw, 4rem);
      align-items: end;
    }

    @media (width < 60rem) {
      .sec-head__body {
        grid-template-columns: 1fr;
        gap: 1.25rem;
      }
    }
  `,
})
export class SectionHead {
  readonly index = input.required<string>();
  readonly label = input.required<string>();
  readonly title = input.required<string>();
  readonly lede = input<string>('');
  readonly titleClass = input<string>('display-1');
}
