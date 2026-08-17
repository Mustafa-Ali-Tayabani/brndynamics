import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY, CAPABILITIES, NAV, OFFICES } from '../../data/site.data';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';
import { BrandLogo } from '../../ui/brand-logo/brand-logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, ScrollRevealDirective, BrandLogo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly company = COMPANY;
  protected readonly capabilities = CAPABILITIES;
  protected readonly nav = NAV;
  protected readonly offices = OFFICES;
  protected readonly year = new Date().getFullYear();
}
