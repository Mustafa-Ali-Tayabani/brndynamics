# BrnDynamics

Marketing site for BrnDynamics — managed IT, cloud and cyber security engineering.

Angular 21, standalone components, signals, zoneless change detection, SSR with
full static prerendering.

## Running it

```bash
npm install
npm start                 # dev server → http://localhost:4200
npm run build             # production build + prerender → dist/
npm run serve:ssr:brndynamics   # serve the built output
```

## Before this goes live

Four things need real assets or data from you:

0. **Photography and video.** There is none, so nothing on the site uses a photo.
   The generated colour fields (see *Artwork*) are a good stand-in, but they are
   a stand-in: the single biggest upgrade available to this site is photographs
   of the actual engineers, the actual offices, and the actual service desk.
   Nothing drawn substitutes for a face. Send them and I will rebuild the hero,
   the offices section and the case studies around real images.

1. **Estimator pricing.** Every number in
   [`src/app/data/estimator.data.ts`](src/app/data/estimator.data.ts) is a placeholder.
   They are internally consistent and produce plausible ranges, but they are not
   your rate card. Replace `base`, `perUnit`, `add` and `mult` — the UI reads
   entirely from that file and needs no changes.
2. **The client wall.** `CLIENTS` in `site.data.ts` currently lists vendors and
   certification partners taken from the existing site, not customers. Each entry
   accepts an optional `svg: { viewBox, d }` to render a real logo instead of a
   set wordmark.
3. **Office details.** Karachi, Geneva and Riyadh are listed with city-level
   addresses and one shared phone number. Add street addresses and local numbers
   to `OFFICES` when you have them.
4. **Success stories.** The four in `SUCCESS_STORIES` are written to the right
   shape but the specifics are illustrative. Replace them with real engagements,
   or tell me the facts and I will write them.

## Design language

Synthesised from three references the client picked — [zig.ai](https://zig.ai),
[botblox.com](https://botblox.com) and
[pensatori-irrazionali.com](https://pensatori-irrazionali.com). Their shared DNA:

- Near-black canvas with a single saturated signal colour
- A distinct, tracked face for metadata — eyebrows, indices, labels, spec values
- Numbered modules (`01`–`06`) and hairline technical grid rules
- Oversized display type with tight negative tracking
- Generous vertical whitespace pacing the scroll

Applied here as **Space Grotesk** (display *and* metadata) with **Inter** for
body copy, on `#08090A`, and the brand blue `#010ED0` brightened to `#2E5BFF`
so it reads as a signal colour on a dark canvas.

There is deliberately **no monospace**. Eyebrows, indices and spec values are
Space Grotesk at 500, uppercase, tracked to `0.13em`. One typeface across the
whole page reads warmer and more deliberate than a display face bolted to a
borrowed mono, and Space Grotesk's `font-variant-numeric` handles the columns
that need aligned figures.

### The logo

`Logo-11.jpg` was the only master available, so the wordmark is **traced to
vector** in [`ui/brand-logo/logo.paths.ts`](src/app/ui/brand-logo/logo.paths.ts):
the JPEG mask is blurred to drop compression ringing, contours are extracted and
simplified, then fitted with a corner-preserving quadratic spline so bowls stay
smooth while stem junctions stay square. The type takes `currentColor` and the
dot keeps the brand blue, so one asset covers every context — no separate
light/dark files. `favicon.svg` and `og-card.svg` are generated from the same
geometry. **If you have the original vector (AI/SVG/EPS), send it and I will
swap it in** — a trace is faithful but it is still a trace.

### Themes

Dark is the brand default and lives on bare `:root`. Light is an explicit choice
via `[data-theme="light"]`, remembered in `localStorage` and applied by an inline
script in `index.html` **before first paint**, so there is no flash of the wrong
palette. Both palettes are defined once in
[`_tokens.scss`](src/styles/_tokens.scss) — no component contains a literal
colour, so the two themes can never drift apart.

Light is not an inversion. Surfaces go white and lift off a grey canvas (the
reverse of dark, where surfaces lighten off black), and the signal returns to the
true brand blue `#010ED0`, which is too dark to carry a near-black background but
is the strongest value on light. Body text measures 6.7–7.7:1 contrast in both
themes; the faintest metadata 4.8:1.

To make the OS preference decide on first visit instead of always opening dark,
there is a commented block at the foot of `_tokens.scss`.

### Artwork

With no photography available, imagery is generated —
[`ui/visual`](src/app/ui/visual/visual.ts) renders abstract colour fields: four
large, heavily blurred blobs layered into a gradient with film grain over the
top, so the result has some tooth instead of looking like synthetic mesh. Six
palettes (`dusk`, `ember`, `tide`, `signal`, `sand`, `moss`) give each case study
and discipline its own mood; assign them in `site.data.ts`.

An earlier version drew schematic diagrams — network topologies, stacks, radar
sweeps. They were accurate and completely cold, which is the wrong register for
a company whose pitch is that a person answers the phone. Colour and texture do
more for that than a wireframe does.

Motion is a drift measured in tens of seconds — noticeable if you sit with it,
invisible while reading. It stops under `prefers-reduced-motion`.

[`ui/flow-diagram`](src/app/ui/flow-diagram/flow-diagram.ts) renders the
engagement process. Stages are real DOM — selectable, responsive, correctly
ordered for screen readers — and only the connectors are SVG, so it reflows to a
vertical rail on narrow screens without redrawing.

### Motion

Scroll is driven by [Lenis](https://github.com/darkroomengineering/lenis) for
inertial weight, with a reading-progress rail in the header, a header that
retracts on the way down, word-by-word reveals on section titles, cursor-tracking
spotlights on cards, a trailing cursor ring on fine pointers, and live local
clocks per office. Every one of these is browser-only and no-ops under
`prefers-reduced-motion`.

Every token lives in [`src/styles/_tokens.scss`](src/styles/_tokens.scss) — change
the palette, type scale or spacing rhythm there and the whole site follows.

## Structure

```
src/
  styles/       tokens · reset · typography · utilities
  app/
    data/       site.data.ts (all copy) · estimator.data.ts (pricing model)
    core/       smooth-scroll · reveal · split-text · parallax · spotlight
                magnetic · count-up · SEO
    ui/         brand-logo · cursor · local-time · section-head · page-hero
                cta-band · marquee · grid-lines
    layout/     header (progress rail, mobile drawer) · footer
    pages/      home (11 sections) · solutions · solutions/:slug
                work · work/:slug · estimate · company · contact
                legal/:doc · 404
```

18 routes prerender to static HTML, including every solution and case-study
detail page.

**All copy lives in [`src/app/data/site.data.ts`](src/app/data/site.data.ts).** Services,
case studies, stats, testimonials, FAQ, contact details and nav are typed
constants — edit that one file to change site content, no template edits needed.

## Notes

- **Prerendering.** All 18 routes emit static HTML at build time, including every
  discipline, case study and legal document (params enumerated in
  [`app.routes.server.ts`](src/app/app.routes.server.ts)). Output is deployable
  to any static host; the Express server in `src/server.ts` is only needed if
  you later add dynamic routes.
- **SEO.** Per-route title, description, canonical and OG tags via `SeoService`,
  plus `ProfessionalService` JSON-LD on the shell. `robots.txt` and
  `sitemap.xml` are in `public/` — update the sitemap when routes change.
- **Motion.** Reveal, magnetic and count-up effects are all browser-only
  (`afterNextRender`) and all no-op under `prefers-reduced-motion`. Prerendered
  HTML carries final values, so no-JS and crawler output is complete.
- **Contact form.** There is no backend, so submitting composes a prefilled
  message to `hello@brndynamics.com`. The form value shape is already what an
  API should receive — swap the `submit()` body in
  [`contact.ts`](src/app/pages/contact/contact.ts) for an HTTP POST when an
  endpoint exists.
- **Fonts** load from Google Fonts. Self-host via `@fontsource` if you want to
  drop the third-party request.
