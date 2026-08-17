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
    { title: 'Senior Product Designer', location: 'Karachi / Remote', type: 'Full-time' },
    { title: 'Full-stack Engineer (Node, React)', location: 'Karachi', type: 'Full-time' },
    { title: 'AI / ML Engineer', location: 'Remote', type: 'Full-time' },
    { title: 'QA Automation Specialist', location: 'Karachi / Remote', type: 'Contract' },
  ];

  /** Pre-fills the mailto subject line for a role. */
  protected encode(role: string): string {
    return encodeURIComponent(`Application: ${role}`);
  }

  constructor() {
    inject(SeoService).apply({
      title: 'Company',
      description:
        'Founded in 2019, BrnDynamics is a technology company specialising in UI/UX design, software development, AI-powered solutions, SaaS products and CRM and ERP systems, with offices in Karachi, Riyadh and Geneva.',
      path: '/company',
    });
  }
}
