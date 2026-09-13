import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { Hero } from './sections/hero/hero';
import { Stats } from './sections/stats/stats';
import { Console } from './sections/console/console';
import { Clients } from './sections/clients/clients';
import { Capabilities } from './sections/capabilities/capabilities';
import { Differentiators } from './sections/differentiators/differentiators';
import { WorkPreview } from './sections/work-preview/work-preview';
import { Success } from './sections/success/success';
import { Process } from './sections/process/process';
import { Toolchain } from './sections/toolchain/toolchain';
import { Industries } from './sections/industries/industries';
import { Offices } from './sections/offices/offices';
import { Drive } from './sections/drive/drive';
import { Testimonials } from './sections/testimonials/testimonials';
import { CtaBand } from '../../ui/cta-band/cta-band';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Stats,
    Console,
    Clients,
    Capabilities,
    Differentiators,
    WorkPreview,
    Success,
    Process,
    Toolchain,
    Industries,
    Offices,
    Drive,
    Testimonials,
    CtaBand,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-stats />
    <app-console />
    <app-clients />
    <app-capabilities />
    <app-differentiators />
    <app-work-preview />
    <app-success />
    <app-process />
    <app-toolchain />
    <app-industries />
    <app-offices />
    <app-drive />
    <app-testimonials />
    <app-cta-band />
  `,
})
export class Home {
  constructor() {
    inject(SeoService).apply({
      title: 'Managed IT, Cloud & Security Engineering',
      description:
        'BrnDynamics builds digital products: UI/UX design, SaaS platforms, CRM and ERP systems, AI-powered solutions, and web and mobile applications. Offices in Karachi, Riyadh and Geneva.',
      path: '/',
    });
  }
}
