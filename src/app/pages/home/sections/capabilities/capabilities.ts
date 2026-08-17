import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CAPABILITIES } from '../../../../data/site.data';
import { SectionHead } from '../../../../ui/section-head/section-head';
import { ScrollRevealDirective } from '../../../../core/scroll-reveal.directive';

@Component({
  selector: 'app-capabilities',
  imports: [RouterLink, SectionHead, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './capabilities.html',
  styleUrl: './capabilities.scss',
})
export class Capabilities {
  protected readonly items = CAPABILITIES;

  /** Index of the open row; the first is open on load. */
  protected readonly open = signal(0);

  protected toggle(i: number): void {
    this.open.update((current) => (current === i ? -1 : i));
  }
}
