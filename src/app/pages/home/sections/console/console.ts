import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../../../data/site.data';
import { SectionHead } from '../../../../ui/section-head/section-head';
import { ScrollRevealDirective } from '../../../../core/scroll-reveal.directive';

interface Line {
  /** cmd = prompt, in = assistant, out = returned value, stat = metric row. */
  kind: 'cmd' | 'in' | 'out' | 'stat';
  text: string;
  value?: string;
}

interface PanelFile {
  id: string;
  name: string;
  lines: Line[];
}

/**
 * The assistant panel.
 *
 * An editor-shaped introduction: file rail, tab bar, line gutter, and a
 * transcript that types itself in when the section scrolls into view. Files are
 * clickable and each replays its own transcript.
 *
 * It is a presentation device, not a live chat, and the status bar says so
 * rather than implying a bot is listening.
 *
 * Lines reveal on a timer rather than character by character: a full crawl of
 * this much copy would be slower than anyone is willing to sit through.
 */
@Component({
  selector: 'app-console',
  imports: [RouterLink, SectionHead, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './console.html',
  styleUrl: './console.scss',
})
export class Console {
  protected readonly company = COMPANY;

  protected readonly shown = signal(0);
  protected readonly done = signal(false);
  protected readonly activeId = signal('welcome');

  protected readonly files: PanelFile[] = [
    {
      id: 'welcome',
      name: 'welcome.ts',
      lines: [
        { kind: 'cmd', text: 'brn --introduce' },
        {
          kind: 'in',
          text: 'Hello. I am the BrnDynamics assistant. Here is who you would be working with.',
        },
        { kind: 'out', text: 'Founded in Karachi in 2019. Offices in Karachi, Riyadh and Geneva.' },
        {
          kind: 'out',
          text: 'UI/UX, SaaS, CRM and ERP, AI, web and mobile, engineering, security.',
        },
        { kind: 'cmd', text: 'brn team --size' },
        { kind: 'in', text: 'Twenty plus designers, engineers, QA specialists and consultants.' },
        {
          kind: 'out',
          text: 'The people who scope your work are the people who build it.',
        },
      ],
    },
    {
      id: 'record',
      name: 'track-record.json',
      lines: [
        { kind: 'cmd', text: 'brn record --summary' },
        { kind: 'stat', text: 'Years delivering', value: '6+' },
        { kind: 'stat', text: 'Projects shipped', value: '80+' },
        { kind: 'stat', text: 'Specialists on the team', value: '20+' },
        { kind: 'stat', text: 'Industries served', value: '9' },
        { kind: 'stat', text: 'Clutch rating, 31 reviews', value: '5.0' },
        { kind: 'stat', text: 'Google rating', value: '4.9' },
        { kind: 'in', text: 'Clients who joined in our first year are still with us.' },
      ],
    },
    {
      id: 'how',
      name: 'how-we-work.md',
      lines: [
        { kind: 'cmd', text: 'brn process --stages' },
        { kind: 'out', text: '01  Discover   requirements, research, fixed-fee quote' },
        { kind: 'out', text: '02  Design     architecture, prototypes, definition of done' },
        { kind: 'out', text: '03  Go/no-go   you approve, or you keep the specification' },
        { kind: 'out', text: '04  Build      two-week increments, deployed and reviewable' },
        { kind: 'out', text: '05  Support    retainer, or a clean handover to your team' },
        {
          kind: 'in',
          text: 'Stage three is a real gate. Walk away with the spec and owe us nothing further.',
        },
      ],
    },
    {
      id: 'contact',
      name: 'contact.ts',
      lines: [
        { kind: 'cmd', text: 'brn contact --all' },
        { kind: 'out', text: 'hello@brndynamics.com' },
        { kind: 'out', text: '+92 324 923 5848' },
        { kind: 'stat', text: 'Karachi, Pakistan', value: 'HQ' },
        { kind: 'stat', text: 'Riyadh, Saudi Arabia', value: 'GCC' },
        { kind: 'stat', text: 'Geneva, Switzerland', value: 'EU' },
        { kind: 'in', text: 'Tell us what you are building and we will send a scope and a price.' },
      ],
    },
  ];

  protected readonly active = computed(
    () => this.files.find((f) => f.id === this.activeId()) ?? this.files[0],
  );

  private timer?: ReturnType<typeof setTimeout>;
  private reduced = false;
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const el = this.host.nativeElement as HTMLElement;
      this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (this.reduced) {
        this.revealAll();
        return;
      }

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          this.play();
        },
        { threshold: 0.25 },
      );
      io.observe(el);

      destroyRef.onDestroy(() => {
        io.disconnect();
        clearTimeout(this.timer);
      });
    });
  }

  protected select(id: string): void {
    if (id === this.activeId()) return;
    this.activeId.set(id);
    clearTimeout(this.timer);
    if (this.reduced) {
      this.revealAll();
      return;
    }
    this.shown.set(0);
    this.done.set(false);
    this.play();
  }

  private revealAll(): void {
    this.shown.set(this.active().lines.length);
    this.done.set(true);
  }

  private play(): void {
    const step = () => {
      this.shown.update((n) => n + 1);
      const lines = this.active().lines;
      if (this.shown() >= lines.length) {
        this.done.set(true);
        return;
      }
      // Commands land fast; prose needs a beat to read.
      this.timer = setTimeout(step, lines[this.shown()]?.kind === 'cmd' ? 380 : 230);
    };
    step();
  }
}
