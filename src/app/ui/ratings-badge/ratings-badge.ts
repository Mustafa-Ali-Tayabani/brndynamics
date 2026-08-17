import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { COMPANY } from '../../data/site.data';
import { CLUTCH_MARK, GOOGLE_MARK } from '../../data/review-marks.data';

/**
 * Review scores with the platform's own mark.
 *
 * Attribution matters here: a star rating with no source is worth nothing, so
 * each score carries the Clutch or Google logo it came from. Stars are the
 * conventional review gold rather than the brand blue, because a blue star
 * does not read as a rating.
 */
@Component({
  selector: 'app-ratings-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="rows" [class.rows--inline]="inline()">
      <!-- Clutch -->
      <li class="row">
        <svg class="mark mark--clutch" [attr.viewBox]="clutch.viewBox" aria-hidden="true">
          <path [attr.d]="clutch.d" fill="currentColor" />
          <circle
            [attr.cx]="clutch.dot.cx"
            [attr.cy]="clutch.dot.cy"
            [attr.r]="clutch.dot.r"
            [attr.fill]="clutch.dot.fill"
          />
        </svg>
        <span class="stars" aria-hidden="true">
          @for (s of five; track $index) {
            <svg viewBox="0 0 24 24" class="star"><path [attr.d]="starPath" /></svg>
          }
        </span>
        <span class="score tnum">{{ company.ratings[0].value }}</span>
        <span class="mono-sm note">{{ company.ratings[0].note }}</span>
      </li>

      <!-- Google -->
      <li class="row">
        <svg class="mark mark--google" [attr.viewBox]="google.viewBox" aria-hidden="true">
          <path [attr.d]="google.d" [attr.fill]="google.hex" />
        </svg>
        <span class="stars" aria-hidden="true">
          @for (s of five; track $index) {
            <svg viewBox="0 0 24 24" class="star"><path [attr.d]="starPath" /></svg>
          }
        </span>
        <span class="score tnum">{{ company.ratings[1].value }}</span>
        <span class="mono-sm note">{{ company.ratings[1].note }}</span>
      </li>
    </ul>

    <span class="visually-hidden">
      Rated {{ company.ratings[0].value }} out of 5 on Clutch from
      {{ company.ratings[0].note }}, and {{ company.ratings[1].value }} out of 5 on Google.
    </span>
  `,
  styleUrl: './ratings-badge.scss',
})
export class RatingsBadge {
  /** Lay the two scores side by side rather than stacked. */
  readonly inline = input(true);

  protected readonly company = COMPANY;
  protected readonly clutch = CLUTCH_MARK;
  protected readonly google = GOOGLE_MARK;
  protected readonly five = [0, 1, 2, 3, 4];

  protected readonly starPath =
    'M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4-5.8-3-5.8 3 1.1-6.4L2.6 9.4l6.5-.9L12 2.6Z';
}
