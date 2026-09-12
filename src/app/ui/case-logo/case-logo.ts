import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CaseStudyImage } from '../../data/site.data';
import { ImgOk } from '../img-ok';

/**
 * Product logo for a case study.
 *
 * Supplied marks are fixed-colour raster, so a second file carries the variant
 * for the dark canvas. The swap is done in CSS rather than by binding to the
 * theme signal, so the prerendered page never flashes the wrong variant before
 * hydration. Size is set by the host through --case-logo-h.
 */
@Component({
  selector: 'app-case-logo',
  imports: [ImgOk],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!broken()) {
      @if (image().srcDark) {
        <img
          class="dark"
          appImgOk
          [src]="image().srcDark"
          [alt]="image().alt"
          loading="lazy"
          (failed)="broken.set(true)"
        />
      }
      <img
        class="light"
        appImgOk
        [src]="image().src"
        [alt]="image().alt"
        loading="lazy"
        (failed)="broken.set(true)"
      />
    }
  `,
  styles: `
    :host {
      display: block;
      line-height: 0;
    }

    img {
      display: block;
      height: var(--case-logo-h, 22px);
      width: auto;
    }

    /* With a dark variant present, it wins on the dark canvas and the original
       takes over in light mode. With no variant, the original always shows. */
    .dark + .light {
      display: none;
    }

    :host-context([data-theme='light']) .dark {
      display: none;
    }

    :host-context([data-theme='light']) .dark + .light {
      display: block;
    }
  `,
})
export class CaseLogo {
  readonly image = input.required<CaseStudyImage>();
  protected readonly broken = signal(false);
}
