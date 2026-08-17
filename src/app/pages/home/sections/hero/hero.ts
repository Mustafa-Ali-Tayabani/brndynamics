import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY, HERO_READOUT } from '../../../../data/site.data';
import { MagneticDirective } from '../../../../core/magnetic.directive';
import { GridLines } from '../../../../ui/grid-lines/grid-lines';
import { Visual } from '../../../../ui/visual/visual';
import { RatingsBadge } from '../../../../ui/ratings-badge/ratings-badge';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, MagneticDirective, GridLines, Visual, RatingsBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly readout = HERO_READOUT;
  protected readonly company = COMPANY;
}
