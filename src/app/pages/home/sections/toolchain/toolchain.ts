import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TOOLCHAIN } from '../../../../data/site.data';
import { SectionHead } from '../../../../ui/section-head/section-head';
import { ScrollRevealDirective } from '../../../../core/scroll-reveal.directive';
import { BrandMark } from '../../../../ui/brand-mark/brand-mark';

/**
 * The toolchain wall — delivery tools, engineering stack, design tools.
 *
 * Everything is shown at once rather than behind tabs: this is the section a
 * prospect scans for their own stack, and a tab they have to find first is a
 * tab they will not click.
 */
@Component({
  selector: 'app-toolchain',
  imports: [SectionHead, ScrollRevealDirective, BrandMark],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <app-section-head
        index="07"
        label="Toolchain"
        title="We work in your tools."
        lede="Three lists: what we run projects on, what we build with, and what we design in. If yours is missing, we have almost certainly used it."
      />

      @for (group of groups; track group.id; let gi = $index) {
        <section class="group" appReveal [revealDelay]="gi * 90">
          <header class="group__head">
            <h3 class="display-3 group__title">{{ group.label }}</h3>
            <p class="body-dim group__note">{{ group.note }}</p>
            <span class="mono group__count tnum">{{ group.tools.length }}</span>
          </header>

          <ul class="wall">
            @for (tool of group.tools; track tool) {
              <li class="cell">
                <app-brand-mark [name]="tool" />
              </li>
            }
          </ul>
        </section>
      }
    </div>
  `,
  styleUrl: './toolchain.scss',
})
export class Toolchain {
  protected readonly groups = TOOLCHAIN;
}
