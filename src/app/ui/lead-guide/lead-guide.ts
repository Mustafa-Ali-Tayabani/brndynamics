import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  DOCUMENT,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../data/site.data';
import { ImgOk } from '../img-ok';

const DISMISS_KEY = 'brn-guide-dismissed';
const ART_KEY = 'brn-guide-art-missing';

/** Scroll depth at which a reader counts as engaged rather than passing through. */
const SCROLL_TRIGGER = 0.38;

/** Fallback for a reader who is reading rather than scrolling. */
const DWELL_MS = 20_000;

/**
 * The brand character, stepping in to ask for the conversation.
 *
 * Shown on service and case study pages once the reader has actually engaged,
 * never on arrival. It stays out of the way while the page's own call to action
 * is on screen, since asking twice in the same viewport is just noise, and it
 * stays dismissed for the rest of the session once waved off.
 */
@Component({
  selector: 'app-lead-guide',
  imports: [ReactiveFormsModule, RouterLink, ImgOk],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lead-guide.html',
  styleUrl: './lead-guide.scss',
  host: {
    '[class.is-open]': 'open()',
    '[attr.aria-hidden]': 'open() ? null : "true"',
    '[style.visibility]': 'open() ? null : "hidden"',
  },
})
export class LeadGuide {
  /** What the reader is currently looking at, used in the greeting. */
  readonly topic = input.required<string>();

  /** Optional selector for the page's own CTA. While it is on screen, we hold off. */
  readonly deferTo = input('app-cta-band');

  private readonly doc = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });

  private readonly armed = signal(false);
  private readonly dismissed = signal(false);
  private readonly suppressed = signal(false);

  protected readonly sent = signal(false);
  protected readonly showError = signal(false);
  /**
   * The character art is optional and is attached on the client only. Leaving
   * it out of the prerendered HTML means a browser never requests it during
   * parse, so when the file is absent the answer can be remembered and every
   * later page stops asking for it.
   */
  protected readonly showFigure = signal(false);

  protected markFigureMissing(): void {
    this.showFigure.set(false);
    try {
      this.doc.defaultView?.sessionStorage.setItem(ART_KEY, '1');
    } catch {
      /* Storage refused. The figure still stays hidden for this view. */
    }
  }

  protected readonly open = computed(
    () => this.armed() && !this.dismissed() && !this.suppressed(),
  );

  constructor() {
    afterNextRender(() => {
      this.showFigure.set(!this.read(ART_KEY));
      if (this.read(DISMISS_KEY)) {
        this.dismissed.set(true);
        return;
      }
      this.watchEngagement();
      this.watchPageCta();
      this.watchEscape();
    });
  }

  /* ------------------------------------------------------------- triggers */

  private watchEngagement(): void {
    const win = this.doc.defaultView;
    if (!win) return;

    const arm = () => {
      this.armed.set(true);
      stop();
    };

    const onScroll = () => {
      const doc = this.doc.documentElement;
      const max = doc.scrollHeight - win.innerHeight;
      if (max > 0 && win.scrollY / max >= SCROLL_TRIGGER) arm();
    };

    const timer = win.setTimeout(arm, DWELL_MS);
    win.addEventListener('scroll', onScroll, { passive: true });

    const stop = () => {
      win.clearTimeout(timer);
      win.removeEventListener('scroll', onScroll);
    };
    this.destroyRef.onDestroy(stop);
  }

  /** The page already asks for the same thing at the bottom. Defer to it. */
  private watchPageCta(): void {
    const target = this.doc.querySelector(this.deferTo());
    if (!target || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      ([entry]) => this.suppressed.set(entry.isIntersecting),
      { rootMargin: '0px 0px -20% 0px' },
    );
    io.observe(target);
    this.destroyRef.onDestroy(() => io.disconnect());
  }

  private watchEscape(): void {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.open()) this.dismiss();
    };
    this.doc.addEventListener('keydown', onKey);
    this.destroyRef.onDestroy(() => this.doc.removeEventListener('keydown', onKey));
  }

  /* -------------------------------------------------------------- actions */

  protected dismiss(): void {
    this.dismissed.set(true);
    try {
      this.doc.defaultView?.sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* Private browsing refuses the write. Dismissal still holds for this view. */
    }
  }

  /**
   * Hands the address to the team's inbox, matching how the contact form and
   * the estimator submit. Swap for an HTTP POST once an endpoint exists.
   */
  protected submit(): void {
    if (this.email.invalid) {
      this.showError.set(true);
      this.email.markAsTouched();
      this.host.nativeElement.querySelector<HTMLInputElement>('.guide__input')?.focus();
      return;
    }

    const topic = this.topic();
    const body = [
      `Email: ${this.email.value}`,
      `Interested in: ${topic}`,
      '',
      'Sent from the ' + topic + ' page.',
    ].join('\n');

    const href =
      `mailto:${COMPANY.email}` +
      `?subject=${encodeURIComponent(`Enquiry: ${topic}`)}` +
      `&body=${encodeURIComponent(body)}`;

    this.sent.set(true);
    this.doc.defaultView?.setTimeout(() => {
      if (this.doc.defaultView) this.doc.defaultView.location.href = href;
    }, 220);
  }

  private read(key: string): boolean {
    try {
      return this.doc.defaultView?.sessionStorage.getItem(key) === '1';
    } catch {
      return false;
    }
  }
}
