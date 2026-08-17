import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY, DIFFERENTIATORS, INDUSTRIES, PROCESS, STATS } from '../../data/site.data';
import { SeoService } from '../../core/seo.service';
import { PageHero } from '../../ui/page-hero/page-hero';
import { CtaBand } from '../../ui/cta-band/cta-band';
import { SectionHead } from '../../ui/section-head/section-head';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';
import { CountUpDirective } from '../../core/count-up.directive';

@Component({
  selector: 'app-company',
  imports: [
    RouterLink,
    PageHero,
    CtaBand,
    SectionHead,
    ScrollRevealDirective,
    CountUpDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './company.html',
  styleUrl: './company.scss',
})
export class Company {
  protected readonly company = COMPANY;
  protected readonly values = DIFFERENTIATORS;
  protected readonly process = PROCESS;
  protected readonly stats = STATS;
  protected readonly industries = INDUSTRIES;

  protected readonly roles = [
    { title: 'Senior Cloud Engineer', location: 'New York / Remote', type: 'Full-time' },
    { title: 'Security Analyst (SOC)', location: 'Remote', type: 'Full-time' },
    { title: 'Service Desk Engineer, Tier 2', location: 'New York', type: 'Full-time' },
    { title: 'Full-stack Developer', location: 'Remote', type: 'Contract' },
  ];

  /** Pre-fills the mailto subject line for a role. */
  protected encode(role: string): string {
    return encodeURIComponent(`Application — ${role}`);
  }

  constructor() {
    inject(SeoService).apply({
      title: 'Company',
      description:
        'BrnDynamics is a managed IT and engineering firm operating since 2019 from New York, with a distributed team providing genuine 24/7 coverage across six regulated sectors.',
      path: '/company',
    });
  }
}
