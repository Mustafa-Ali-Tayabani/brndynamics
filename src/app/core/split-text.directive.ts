import {
  Directive,
  ElementRef,
  DestroyRef,
  afterNextRender,
  inject,
  input,
  numberAttribute,
} from '@angular/core';

/**
 * Reveals a heading word by word as it enters view.
 *
 * The element keeps its plain text in the prerendered HTML — splitting happens
 * on the client only, so crawlers and no-JS readers get an ordinary heading.
 * Words are wrapped in an overflow-hidden span and slid up from below, which
 * reads as the type settling into place rather than fading in.
 */
@Directive({
  selector: '[appSplitText]',
})
export class SplitTextDirective {
  /** Delay between words, in milliseconds. */
  readonly splitStagger = input(34, { transform: numberAttribute });

  /** Delay before the first word, in milliseconds. */
  readonly splitDelay = input(0, { transform: numberAttribute });

  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const el = this.host.nativeElement as HTMLElement;

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('split-ready', 'split-in');
        return;
      }

      const words = (el.textContent ?? '').split(/\s+/).filter(Boolean);
      if (!words.length) return;

      // Rebuild as masked word spans. `inline-block` on the mask would break
      // normal wrapping, so the mask wraps the word and the row handles flow.
      el.textContent = '';
      const frag = document.createDocumentFragment();
      words.forEach((word, i) => {
        const mask = document.createElement('span');
        mask.className = 'split-word';
        const inner = document.createElement('span');
        inner.className = 'split-word__in';
        inner.style.transitionDelay = `${this.splitDelay() + i * this.splitStagger()}ms`;
        inner.textContent = word;
        mask.appendChild(inner);
        frag.appendChild(mask);
        if (i < words.length - 1) frag.appendChild(document.createTextNode(' '));
      });
      el.appendChild(frag);
      el.classList.add('split-ready');

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          el.classList.add('split-in');
          io.disconnect();
        },
        { threshold: 0.2, rootMargin: '0px 0px -6% 0px' },
      );
      io.observe(el);

      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
