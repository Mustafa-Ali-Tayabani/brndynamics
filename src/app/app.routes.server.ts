import { RenderMode, ServerRoute } from '@angular/ssr';
import { CAPABILITIES, CASE_STUDIES } from './data/site.data';

/**
 * Parameterised routes have to enumerate their params, otherwise the prerender
 * skips them and they fall back to client rendering — which would leave the
 * detail pages invisible to crawlers.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'services/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => CAPABILITIES.map((c) => ({ slug: c.id })),
  },
  {
    path: 'work/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => CASE_STUDIES.map((c) => ({ slug: c.slug })),
  },
  {
    path: 'legal/:doc',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [{ doc: 'privacy' }, { doc: 'terms' }],
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
