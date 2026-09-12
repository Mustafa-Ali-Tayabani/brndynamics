import { Directive, output } from '@angular/core';

/**
 * Reports an image that failed to load so the template can fall back to the
 * generated artwork instead of leaving a broken frame on the page.
 */
@Directive({
  selector: 'img[appImgOk]',
  host: { '(error)': 'failed.emit()' },
})
export class ImgOk {
  readonly failed = output<void>();
}
