import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { COMPANY, OFFICES } from '../../data/site.data';
import { SeoService } from '../../core/seo.service';
import { PageHero } from '../../ui/page-hero/page-hero';

interface LegalDoc {
  title: string;
  lede: string;
  sections: { heading: string; body: string[] }[];
}

const DOCS: Record<string, LegalDoc> = {
  privacy: {
    title: 'Privacy policy',
    lede: 'What we collect when you use this site or engage us, why we hold it, and how to have it removed.',
    sections: [
      {
        heading: 'What we collect',
        body: [
          'When you submit an enquiry we receive the name, organisation, email address, phone number and message you provide. We do not collect anything else through this website. There is no analytics tag, no advertising pixel and no third-party session recording.',
          'When you become a client we additionally process the operational data required to deliver the service, which is set out in the data processing schedule attached to your contract rather than here.',
        ],
      },
      {
        heading: 'Why we hold it',
        body: [
          'Enquiry data is used to respond to you and, if an engagement follows, to prepare a scope of work. The lawful basis is legitimate interest in responding to a request you initiated.',
          'We do not sell, rent or share enquiry data with third parties, and we do not add you to a marketing list unless you explicitly ask to be added.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'Enquiries that do not lead to an engagement are deleted after 24 months. Client records are retained for the duration of the contract plus the period required by our professional and tax obligations.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You can request a copy of the data we hold about you, ask us to correct it, or ask us to delete it. Write to the address below and we will respond within 30 days.',
        ],
      },
      {
        heading: 'Cookies',
        body: [
          'This website sets no cookies. Fonts are served from Google Fonts, which receives your IP address as part of that request; no cookie is set by that transaction.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms & conditions',
    lede: 'The terms that apply to your use of this website. Service delivery is governed by your signed agreement, not this page.',
    sections: [
      {
        heading: 'Use of this site',
        body: [
          'This website is provided for information. You may view, download and print its content for your own use, but you may not republish it, sell it, or present it as your own.',
        ],
      },
      {
        heading: 'No warranty on content',
        body: [
          'Case study figures describe outcomes in the specific environments they refer to, and are not a projection of results in yours. Service descriptions on this site are summaries; the definitive scope of any engagement is the statement of work you sign.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'The name, marks, copy, design and code of this site belong to BrnDynamics. Third-party names and logos are the property of their respective owners and appear here to describe platforms we work with, not to imply endorsement.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'Nothing on this website creates a contractual obligation. To the extent permitted by law, we accept no liability for loss arising from reliance on the content of this site alone.',
        ],
      },
      {
        heading: 'Governing law',
        body: [
          'These terms are governed by the laws of Switzerland, and the courts of Geneva have exclusive jurisdiction over any dispute arising from them. Engagements contracted through our Pakistan or Saudi Arabia entities may specify a different governing law in the signed agreement, which takes precedence over this page.',
        ],
      },
    ],
  },
};

@Component({
  selector: 'app-legal',
  imports: [PageHero],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero index="//" label="Legal" [heading]="doc().title" [lede]="doc().lede" />

    <div class="container body">
      <article class="prose">
        @for (section of doc().sections; track section.heading; let i = $index) {
          <section class="block">
            <p class="mono block__num tnum">{{ '0' + (i + 1) }}</p>
            <div class="block__body">
              <h2 class="display-3">{{ section.heading }}</h2>
              @for (para of section.body; track para) {
                <p>{{ para }}</p>
              }
            </div>
          </section>
        }

        <section class="block">
          <p class="mono block__num">✉</p>
          <div class="block__body">
            <h2 class="display-3">Contact</h2>
            <p>
              {{ company.legalName }}:
              @for (office of offices; track office.id; let last = $last) {
                {{ office.city }}, {{ office.country }}{{ last ? '.' : '; ' }}
              }
            </p>
            <p>
              <a class="link" [href]="'mailto:' + company.email">{{ company.email }}</a>
            </p>
          </div>
        </section>

        <p class="mono updated">Last updated January 2026</p>
      </article>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .body {
      padding-block: var(--section-y);
    }

    .prose {
      max-width: 64rem;
    }

    .block {
      display: grid;
      grid-template-columns: 3.5rem minmax(0, 1fr);
      gap: clamp(1rem, 3vw, 2.5rem);
      padding-block: clamp(1.5rem, 3.5vw, 2.5rem);
      border-top: 1px solid var(--line);
    }

    @media (width < 34rem) {
      .block {
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }
    }

    .block__num {
      color: var(--signal-hi);
      padding-top: 0.45em;
    }

    .block__body {
      display: grid;
      gap: var(--s-4);
      align-content: start;
    }

    .block__body p {
      color: var(--text-dim);
      font-size: var(--t-sm);
      line-height: 1.85;
      max-width: 68ch;
    }

    .updated {
      color: var(--text-faint);
      padding-top: var(--s-6);
      border-top: 1px solid var(--line);
    }
  `,
})
export class Legal {
  protected readonly company = COMPANY;
  protected readonly offices = OFFICES;

  private readonly slug = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('doc') ?? 'privacy')),
    { initialValue: 'privacy' },
  );

  protected readonly doc = computed(() => DOCS[this.slug()] ?? DOCS['privacy']);

  constructor() {
    const seo = inject(SeoService);
    // Route params resolve synchronously on first render, so this is correct
    // for the prerendered output as well as client navigation.
    const current = this.doc();
    seo.apply({
      title: current.title,
      description: current.lede,
      path: `/legal/${this.slug()}`,
    });
  }
}

export const LEGAL_SLUGS = Object.keys(DOCS);
