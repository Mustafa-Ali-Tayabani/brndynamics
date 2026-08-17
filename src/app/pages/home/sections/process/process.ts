import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ENGAGEMENT_FLOW } from '../../../../data/site.data';
import { SectionHead } from '../../../../ui/section-head/section-head';
import { ScrollRevealDirective } from '../../../../core/scroll-reveal.directive';
import { FlowDiagram } from '../../../../ui/flow-diagram/flow-diagram';

@Component({
  selector: 'app-process',
  imports: [RouterLink, SectionHead, ScrollRevealDirective, FlowDiagram],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <app-section-head
        index="06"
        label="How an engagement runs"
        title="Five stages, and a gate you control."
        lede="The audit is the entry point for everything. At stage three you either sign or take the findings and go — that gate is deliberate."
      />

      <app-flow-diagram
        [stages]="flow"
        loopLabel="Operate feeds back into Audit — every service review reopens the findings list rather than closing it."
      />

      <div class="foot" appReveal>
        <p class="body-dim foot__note">
          Nothing reaches production that has not been rolled back in a test first, and nothing is
          invoiced that was not in the signed scope.
        </p>
        <a routerLink="/estimate" class="btn btn--lg" data-cursor="2 min">
          Price a stage
          <svg class="btn__arrow" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" fill="none" />
          </svg>
        </a>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      padding-block: var(--section-y);
      border-top: 1px solid var(--line);
    }

    app-flow-diagram {
      --cols: 5;
    }

    .foot {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--s-5);
      margin-top: clamp(2rem, 4vw, 3rem);
      padding-top: clamp(1.5rem, 3vw, 2rem);
      border-top: 1px solid var(--line);
    }

    .foot__note {
      font-size: var(--t-sm);
      max-width: 58ch;
    }
  `,
})
export class Process {
  protected readonly flow = ENGAGEMENT_FLOW;
}
