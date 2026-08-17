import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SUCCESS_STORIES } from '../../../../data/site.data';
import { SectionHead } from '../../../../ui/section-head/section-head';
import { ScrollRevealDirective } from '../../../../core/scroll-reveal.directive';
import { Visual } from '../../../../ui/visual/visual';

/**
 * Success stories.
 *
 * Shorter and more human than the case studies: one problem, one outcome, one
 * number. A tab rail switches between them so the section stays compact while
 * carrying four stories.
 */
@Component({
  selector: 'app-success',
  imports: [RouterLink, SectionHead, ScrollRevealDirective, Visual],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './success.html',
  styleUrl: './success.scss',
})
export class Success {
  protected readonly stories = SUCCESS_STORIES;
  protected readonly active = signal(0);

  protected select(i: number): void {
    this.active.set(i);
  }

  /** Left/right arrows move between tabs, as the tab pattern expects. */
  protected onKey(event: KeyboardEvent): void {
    const last = this.stories.length - 1;
    if (event.key === 'ArrowRight') {
      this.active.update((i) => (i === last ? 0 : i + 1));
      event.preventDefault();
    } else if (event.key === 'ArrowLeft') {
      this.active.update((i) => (i === 0 ? last : i - 1));
      event.preventDefault();
    }
  }
}
