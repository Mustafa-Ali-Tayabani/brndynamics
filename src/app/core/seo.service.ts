import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { COMPANY, OFFICES } from '../data/site.data';

export const SITE_URL = 'https://brndynamics.com';

export interface PageMeta {
  title: string;
  description: string;
  path: string;
}

/**
 * Sets per-route title, description, canonical and social cards. Runs on the
 * server too, so the prerendered HTML carries correct tags for crawlers.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  apply({ title, description, path }: PageMeta): void {
    const full = `${title} — ${COMPANY.name}`;
    const url = `${SITE_URL}${path}`;

    this.title.setTitle(full);

    const tags: Record<string, string> = {
      description,
      'og:type': 'website',
      'og:site_name': COMPANY.name,
      'og:title': full,
      'og:description': description,
      'og:url': url,
      'twitter:card': 'summary_large_image',
      'twitter:title': full,
      'twitter:description': description,
    };

    for (const [key, content] of Object.entries(tags)) {
      const selector = key.startsWith('og:') ? `property='${key}'` : `name='${key}'`;
      this.meta.updateTag(
        key.startsWith('og:') ? { property: key, content } : { name: key, content },
        selector,
      );
    }

    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /** Injects a JSON-LD block once, keyed by id so re-navigation replaces it. */
  setJsonLd(id: string, data: unknown): void {
    const existing = this.doc.getElementById(id);
    existing?.remove();

    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }
}

export const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: COMPANY.name,
  url: SITE_URL,
  email: COMPANY.email,
  telephone: COMPANY.phone,
  slogan: COMPANY.tagline,
  description:
    'BrnDynamics is a managed IT, cloud and cyber security engineering firm with offices in Karachi, Geneva and Riyadh. We take operational ownership of your estate so your team can focus on growth.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: COMPANY.hq.city,
    addressCountry: COMPANY.hq.countryCode,
  },
  location: OFFICES.map((o) => ({
    '@type': 'Place',
    name: `${COMPANY.name} — ${o.city}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: o.city,
      addressCountry: o.countryCode,
    },
  })),
  areaServed: ['Pakistan', 'Switzerland', 'Saudi Arabia', 'Europe', 'GCC'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '31',
  },
  sameAs: COMPANY.socials.map((s) => s.url),
};
