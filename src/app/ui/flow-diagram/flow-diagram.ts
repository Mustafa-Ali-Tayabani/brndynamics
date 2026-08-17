import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';

export interface FlowStage {
  index: string;
  title: string;
  body: string;
  /** Chips shown under the stage — what actually comes out of it. */
  outputs: string[];
  /** Rough elapsed time, printed on the connector into this stage. */
  after?: string;
  /** Marks a decision point rather than a step. */
  gate?: boolean;
}

/**
 * Horizontal process flow.
 *
 * Stages are real DOM (selectable, responsive, screen-reader ordered); only the
 * connectors between them are SVG, so the diagram reflows to a vertical rail on
 * narrow screens without redrawing anything.
 */
@Component({
  selector: 'app-flow-diagram',
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="flow">
      @for (stage of stages(); track stage.index; let i = $index, last = $last) {
        <li class="stage" [class.is-gate]="stage.gate" appReveal [revealDelay]="i * 110">
          <!-- Connector into this stage -->
          @if (!$first) {
            <span class="conn" aria-hidden="true">
              <svg viewBox="0 0 100 12" preserveAspectRatio="none">
                <line x1="0" y1="6" x2="100" y2="6" />
                <circle r="2.6" cy="6">
                  <animate
                    attributeName="cx"
                    from="0"
                    to="100"
                    [attr.dur]="1.9 + i * 0.15 + 's'"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
              @if (stage.after) {
                <em class="conn__t mono-sm">{{ stage.after }}</em>
              }
            </span>
          }

          <div class="node">
            <div class="node__head">
              <span class="mono node__idx">{{ stage.index }}</span>
              @if (stage.gate) {
                <span class="mono-sm node__gate">Gate</span>
              }
            </div>
            <h3 class="display-4 node__title">{{ stage.title }}</h3>
            <p class="node__body">{{ stage.body }}</p>
            <ul class="outs">
              @for (o of stage.outputs; track o) {
                <li class="mono-sm">{{ o }}</li>
              }
            </ul>
          </div>
        </li>
      }
    </ol>

    @if (loopLabel()) {
      <p class="loop mono-sm" appReveal>
        <span class="loop__arc" aria-hidden="true"></span>
        {{ loopLabel() }}
      </p>
    }
  `,
  styleUrl: './flow-diagram.scss',
})
export class FlowDiagram {
  readonly stages = input.required<FlowStage[]>();
  /** Caption for the feedback loop drawn under the flow. */
  readonly loopLabel = input<string>('');
}
