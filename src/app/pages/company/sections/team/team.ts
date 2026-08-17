import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TEAM, TeamMember } from '../../../../data/site.data';
import { SectionHead } from '../../../../ui/section-head/section-head';
import { ScrollRevealDirective } from '../../../../core/scroll-reveal.directive';
import { SpotlightDirective } from '../../../../core/spotlight.directive';
import { Avatar } from '../../../../ui/avatar/avatar';

/**
 * The delivery team, by discipline.
 *
 * People are identified by expertise rather than by name. That is deliberate:
 * the page stays accurate as individuals move between engagements, and it keeps
 * the emphasis on the capability rather than on a headshot wall.
 *
 * Avatars are generated colour fields with the role code over them. Setting
 * `avatar` on a TEAM entry swaps in a real portrait or memoji instead.
 */
@Component({
  selector: 'app-team',
  imports: [SectionHead, ScrollRevealDirective, SpotlightDirective, Avatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team {
  protected readonly all = TEAM;
  protected readonly offices = ['All', 'Karachi', 'Riyadh', 'Geneva'] as const;
  protected readonly filter = signal<string>('All');

  protected readonly visible = computed<TeamMember[]>(() => {
    const f = this.filter();
    return f === 'All' ? this.all : this.all.filter((m) => m.office === f);
  });

  protected countFor(office: string): number {
    return office === 'All' ? this.all.length : this.all.filter((m) => m.office === office).length;
  }
}
