import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface AvatarFeatures {
  skin: 0 | 1 | 2 | 3;
  hair: 'short' | 'curls' | 'buzz' | 'wave' | 'bun' | 'bald';
  hairColor: 0 | 1 | 2;
  beard: 'none' | 'stubble' | 'full' | 'goatee';
  glasses: boolean;
  /** Background wash index. */
  bg: 0 | 1 | 2 | 3 | 4 | 5;
}

/**
 * Stylised character avatars.
 *
 * These are drawn here, not generated from a photo and not Apple Memoji, which
 * is proprietary artwork we have no licence to reproduce. They are built from
 * layered features (skin, hair, brows, eyes, nose, mouth, beard, glasses) so
 * each team member reads as a distinct person without inventing a face that
 * belongs to somebody real.
 *
 * If you export real Memoji stickers from iOS, set `avatar` on the TEAM entry
 * instead and the image replaces this entirely.
 */
@Component({
  selector: 'app-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 200 200" role="img" [attr.aria-label]="label()">
      <defs>
        <linearGradient [attr.id]="bgId()" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" [attr.stop-color]="bg()[0]" />
          <stop offset="100%" [attr.stop-color]="bg()[1]" />
        </linearGradient>
        <clipPath [attr.id]="clipId()"><circle cx="100" cy="100" r="100" /></clipPath>
      </defs>

      <g [attr.clip-path]="'url(#' + clipId() + ')'">
        <rect width="200" height="200" [attr.fill]="'url(#' + bgId() + ')'" />

        <!-- Shoulders -->
        <path d="M28 200c0-31 32-49 72-49s72 18 72 49Z" [attr.fill]="shirt()" />
        <path d="M100 151c-9 0-16 7-16 15v34h32v-34c0-8-7-15-16-15Z" [attr.fill]="skin()" />

        <!-- Ears -->
        <ellipse cx="47" cy="104" rx="9" ry="12" [attr.fill]="skin()" />
        <ellipse cx="153" cy="104" rx="9" ry="12" [attr.fill]="skin()" />

        <!-- Head -->
        <path
          d="M100 34c-30 0-49 22-49 52 0 34 22 58 49 58s49-24 49-58c0-30-19-52-49-52Z"
          [attr.fill]="skin()"
        />

        <!-- Brows -->
        <rect x="66" y="83" width="26" height="6" rx="3" [attr.fill]="hairColor()" />
        <rect x="108" y="83" width="26" height="6" rx="3" [attr.fill]="hairColor()" />

        <!-- Eyes -->
        <ellipse cx="79" cy="99" rx="10" ry="10.5" fill="#fff" />
        <ellipse cx="121" cy="99" rx="10" ry="10.5" fill="#fff" />
        <circle cx="80.5" cy="100" r="5.4" fill="#4a3524" />
        <circle cx="122.5" cy="100" r="5.4" fill="#4a3524" />
        <circle cx="78.4" cy="97.6" r="1.9" fill="#fff" />
        <circle cx="120.4" cy="97.6" r="1.9" fill="#fff" />

        <!-- Nose -->
        <path
          d="M100 105c-4 6-6 9-6 11 0 3 3 5 6 5s6-2 6-5c0-2-2-5-6-11Z"
          [attr.fill]="shade()"
        />

        <!-- Mouth -->
        @if (features().beard === 'full') {
          <path d="M84 133c5 6 11 9 16 9s11-3 16-9c-10 3-22 3-32 0Z" fill="#8d4a45" />
          <path d="M86 133c9 2 19 2 28 0-8-2-20-2-28 0Z" fill="#fff" />
        } @else {
          <path
            d="M82 130c5 8 12 12 18 12s13-4 18-12c-12 4-24 4-36 0Z"
            fill="#8d4a45"
          />
          <path d="M84.5 130.5c10 2.5 21 2.5 31 0-9-2.5-22-2.5-31 0Z" fill="#fff" />
        }

        <!-- Beard -->
        @switch (features().beard) {
          @case ('stubble') {
            <path
              d="M55 105c2 26 21 44 45 44s43-18 45-44c-3 33-20 50-45 50s-42-17-45-50Z"
              [attr.fill]="hairColor()"
              opacity="0.28"
            />
          }
          @case ('full') {
            <g [attr.fill]="hairColor()">
              <!-- Jaw strips down each side -->
              <path d="M53 92c1 22 5 36 12 45 4 5 8 8 12 10-9-3-16-10-21-20-4-9-6-21-3-35Z" />
              <path d="M147 92c-1 22-5 36-12 45-4 5-8 8-12 10 9-3 16-10 21-20 4-9 6-21 3-35Z" />
              <!-- Chin patch, sitting below the mouth -->
              <path d="M70 124c2 16 13 28 30 28s28-12 30-28c-6 14-17 20-30 20s-24-6-30-20Z" />
              <!-- Moustache -->
              <path d="M80 119c5-4 12-6 20-6s15 2 20 6c-6-2-13-3-20-3s-14 1-20 3Z" />
            </g>
          }
          @case ('goatee') {
            <path
              d="M83 128c0 12 7 21 17 21s17-9 17-21c-4 10-9 13-17 13s-13-3-17-13Z"
              [attr.fill]="hairColor()"
            />
          }
        }

        <!-- Hair -->
        @switch (features().hair) {
          @case ('short') {
            <path
              d="M51 90c-1-33 20-56 49-56s50 23 49 56c-4-6-6-14-7-21-14 8-31 10-45 7-11-2-19-6-25-11-4 9-13 17-21 25Z"
              [attr.fill]="hairColor()"
            />
          }
          @case ('curls') {
            <g [attr.fill]="hairColor()">
              <circle cx="70" cy="48" r="18" />
              <circle cx="96" cy="38" r="20" />
              <circle cx="124" cy="46" r="18" />
              <circle cx="140" cy="66" r="15" />
              <circle cx="57" cy="68" r="15" />
              <circle cx="100" cy="58" r="20" />
            </g>
          }
          @case ('buzz') {
            <path
              d="M52 88c0-32 21-54 48-54s48 22 48 54c-2-24-20-38-48-38s-46 14-48 38Z"
              [attr.fill]="hairColor()"
            />
          }
          @case ('wave') {
            <path
              d="M50 92c-2-36 21-58 50-58 24 0 42 15 48 36-9-8-18-11-27-9 3 6 3 12 1 17-8-10-22-16-38-14-13 2-24 11-28 24-2 2-4 3-6 4Z"
              [attr.fill]="hairColor()"
            />
          }
          @case ('bun') {
            <g [attr.fill]="hairColor()">
              <circle cx="100" cy="26" r="14" />
              <path d="M51 92c-1-34 21-56 49-56s50 22 49 56c-5-9-7-19-8-27-12 9-28 12-42 12s-28-3-40-12c-1 8-3 18-8 27Z" />
            </g>
          }
        }

        <!-- Glasses -->
        @if (features().glasses) {
          <g fill="none" stroke="#2a2f36" stroke-width="4">
            <circle cx="79" cy="99" r="17" />
            <circle cx="121" cy="99" r="17" />
            <path d="M96 97h8M62 95l-9 3M138 95l9 3" />
          </g>
        }
      </g>
    </svg>
  `,
  styles: `
    :host {
      display: block;
      line-height: 0;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class Avatar {
  readonly features = input.required<AvatarFeatures>();
  readonly label = input('Team member');
  /** Unique suffix so gradients and clips do not collide across instances. */
  readonly uid = input.required<string>();

  private static readonly SKIN = ['#f2c9a6', '#e0a878', '#c07f52', '#8a5533'];
  private static readonly SKIN_SHADE = ['#dbab84', '#c78d5f', '#a3663f', '#6f4227'];
  private static readonly HAIR = ['#2b2320', '#4b3527', '#7a5236'];
  private static readonly SHIRT = ['#1d2430', '#243040', '#2a2440', '#1f3330'];
  private static readonly BG: [string, string][] = [
    ['#3d4a8f', '#6d4f86'],
    ['#1d6f7a', '#2f9a86'],
    ['#7a4a5e', '#c1795c'],
    ['#3f5a8a', '#4f86b8'],
    ['#6a5330', '#a88450'],
    ['#2f5f4a', '#6f9a58'],
  ];

  protected readonly bgId = computed(() => `av-bg-${this.uid()}`);
  protected readonly clipId = computed(() => `av-clip-${this.uid()}`);
  protected readonly skin = computed(() => Avatar.SKIN[this.features().skin]);
  protected readonly shade = computed(() => Avatar.SKIN_SHADE[this.features().skin]);
  protected readonly hairColor = computed(() => Avatar.HAIR[this.features().hairColor]);
  protected readonly bg = computed(() => Avatar.BG[this.features().bg]);
  protected readonly shirt = computed(
    () => Avatar.SHIRT[this.features().skin % Avatar.SHIRT.length],
  );
}
