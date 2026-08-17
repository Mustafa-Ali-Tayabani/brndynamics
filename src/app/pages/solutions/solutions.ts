import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CAPABILITIES, PLATFORM_GROUPS, PROCESS } from '../../data/site.data';
import { SeoService } from '../../core/seo.service';
import { PageHero } from '../../ui/page-hero/page-hero';
import { CtaBand } from '../../ui/cta-band/cta-band';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';
import { SectionHead } from '../../ui/section-head/section-head';
import { Visual } from '../../ui/visual/visual';

@Component({
  selector: 'app-solutions',
  imports: [RouterLink, PageHero, CtaBand, ScrollRevealDirective, SectionHead, Visual],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './solutions.html',
  styleUrl: './solutions.scss',
})
export class Solutions {
  protected readonly capabilities = CAPABILITIES;
  protected readonly platformGroups = PLATFORM_GROUPS;
  protected readonly process = PROCESS;

  constructor() {
    inject(SeoService).apply({
      title: 'Solutions',
      description:
        'Managed services, cloud engineering, cyber security, custom software, web and mobile, and independent IT consulting — with the deliverables for each written down.',
      path: '/solutions',
    });
  }
}
