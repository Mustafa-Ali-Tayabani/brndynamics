import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CAPABILITIES, COMPANY } from '../../data/site.data';
import { ServiceIcon } from '../../ui/service-icon/service-icon';

/**
 * Services mega menu.
 *
 * Presentation only: the header owns the open state and the hover intent, so
 * the panel does not have to reason about pointer timing.
 */
@Component({
  selector: 'app-mega-menu',
  imports: [RouterLink, ServiceIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mega-menu.html',
  styleUrl: './mega-menu.scss',
  host: { '[class.is-open]': 'open()' },
})
export class MegaMenu {
  readonly open = input(false);
  readonly dismiss = output<void>();

  protected readonly capabilities = CAPABILITIES;
  protected readonly company = COMPANY;

  protected close(): void {
    this.dismiss.emit();
  }
}
