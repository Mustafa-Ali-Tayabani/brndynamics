import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CAPABILITIES, PLATFORM_GROUPS, PROCESS } from '../../data/site.data';
import { SeoService } from '../../core/seo.service';
import { PageHero } from '../../ui/page-hero/page-hero';
import { CtaBand } from '../../ui/cta-band/cta-band';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';
import { SectionHead } from '../../ui/section-head/section-head';
import { ServiceIcon } from '../../ui/service-icon/service-icon';

@Component({
  selector: 'app-services',
  imports: [RouterLink, PageHero, CtaBand, ScrollRevealDirective, SectionHead, ServiceIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  protected readonly capabilities = CAPABILITIES;
  protected readonly platformGroups = PLATFORM_GROUPS;
  protected readonly process = PROCESS;

  constructor() {
    inject(SeoService).apply({
      title: 'Services',
      description:
        'Product design, SaaS development, CRM and ERP, AI and automation, web and mobile, software engineering, and security. The deliverables for each are written down.',
      path: '/services',
    });
  }
}
