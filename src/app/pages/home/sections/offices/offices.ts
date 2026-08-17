import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OFFICES } from '../../../../data/site.data';
import { SectionHead } from '../../../../ui/section-head/section-head';
import { ScrollRevealDirective } from '../../../../core/scroll-reveal.directive';
import { SpotlightDirective } from '../../../../core/spotlight.directive';
import { LocalTime } from '../../../../ui/local-time/local-time';

@Component({
  selector: 'app-offices',
  imports: [RouterLink, SectionHead, ScrollRevealDirective, SpotlightDirective, LocalTime],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <app-section-head
        index="09"
        label="Where we are"
        title="Three offices, one working day."
        lede="Karachi opens, Riyadh overlaps through the morning, Geneva through the afternoon. That handover is why someone answers at 03:00."
      />

      <ul class="grid">
        @for (office of offices; track office.id; let i = $index) {
          <li class="card office" appReveal [revealDelay]="i * 90" appSpotlight>
            <div class="office__top">
              <span class="mono office__code">{{ office.countryCode }}</span>
              <span class="mono-sm office__clock">
                <app-local-time [utcOffset]="office.utcOffset" />
                {{ office.timezone }}
              </span>
            </div>

            <h3 class="display-2 office__city">{{ office.city }}</h3>
            <p class="mono office__role">{{ office.role }}</p>
            <p class="body-dim office__note">{{ office.note }}</p>

            <div class="office__foot">
              @if (office.phone) {
                <a class="link" [href]="'tel:' + office.phoneHref">{{ office.phone }}</a>
              } @else {
                <a class="link" routerLink="/contact">Reach this office →</a>
              }
            </div>
          </li>
        }
      </ul>
    </div>
  `,
  styles: `
    :host {
      display: block;
      padding-block: var(--section-y);
      background: var(--ink-850);
      border-top: 1px solid var(--line);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
    }

    @media (width < 62rem) {
      .grid {
        grid-template-columns: 1fr;
      }
    }

    .office {
      display: grid;
      grid-template-rows: auto auto auto 1fr auto;
      gap: var(--s-3);
      padding: clamp(1.25rem, 2.5vw, 2rem);
    }

    .office__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--s-3);
      padding-bottom: var(--s-4);
      border-bottom: 1px solid var(--line);
    }

    .office__code {
      color: var(--signal-hi);
    }

    .office__clock {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--text-faint);
    }

    .office__city {
      line-height: 1;
    }

    .office__role {
      color: var(--text-dim);
    }

    .office__note {
      font-size: var(--t-sm);
      line-height: 1.7;
    }

    .office__foot {
      padding-top: var(--s-4);
      border-top: 1px solid var(--line);
      display: flex;
    }
  `,
})
export class Offices {
  protected readonly offices = OFFICES;
}
