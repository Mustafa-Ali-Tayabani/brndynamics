import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PARTNER_MARKS } from '../../../../data/site.data';
import { SectionHead } from '../../../../ui/section-head/section-head';
import { ScrollRevealDirective } from '../../../../core/scroll-reveal.directive';
import { BrandMark } from '../../../../ui/brand-mark/brand-mark';

/**
 * Platform partners and certifications.
 *
 * These are vendor marks — the platforms we hold certifications on — not
 * customer logos. The heading says so, because putting Microsoft's logo under
 * "trusted by" would claim a client relationship that does not exist. A real
 * client wall goes in separately once those logos are cleared for use.
 */
@Component({
  selector: 'app-clients',
  imports: [SectionHead, ScrollRevealDirective, BrandMark],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <app-section-head
        index="01"
        label="Partners & certifications"
        title="Certified on what you already run."
        lede="We hold certifications across these platforms and take no resale margin on any of them, which is what keeps the recommendation independent."
      />

      <ul class="wall">
        @for (name of partners; track name; let i = $index) {
          <li class="cell" appReveal [revealDelay]="i * 45">
            <app-brand-mark [name]="name" />
          </li>
        }
      </ul>
    </div>
  `,
  styles: `
    :host {
      display: block;
      padding-block: var(--section-y);
      border-top: 1px solid var(--line);
    }

    .wall {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      border-top: 1px solid var(--line);
      border-left: 1px solid var(--line);
    }

    @media (width < 62rem) {
      .wall {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (width < 34rem) {
      .wall {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    .cell {
      display: grid;
      place-items: center;
      min-height: clamp(6rem, 10vw, 8rem);
      padding: var(--s-4);
      border-right: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
      position: relative;
      transition: background var(--d-mid) var(--e-out);
    }

    .cell:hover {
      background: var(--tint-1);
    }

    .cell::after {
      content: '';
      position: absolute;
      inset: auto 0 0;
      height: 2px;
      background: var(--signal);
      transform: scaleX(0);
      transition: transform var(--d-mid) var(--e-out);
    }

    .cell:hover::after {
      transform: scaleX(1);
    }

    app-brand-mark {
      --mark-h: 42px;
    }

    @media (width < 40rem) {
      app-brand-mark {
        --mark-h: 32px;
      }
    }
  `,
})
export class Clients {
  protected readonly partners = PARTNER_MARKS;
}
