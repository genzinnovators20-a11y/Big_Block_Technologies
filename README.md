# Big Block Technologies — Website

Corporate website for Big Block Technologies, a technology engineering and
consulting practice covering software, cloud, AI and blockchain engineering.

Single-page application built with React and Material UI, compiled by Vite to a
static `dist/` directory and served by Nginx.

---

## Stack

| Layer      | Choice                                        |
| ---------- | --------------------------------------------- |
| UI         | React 19 + TypeScript 5.9                     |
| Components | Material UI v9 (CSS variables, two schemes)   |
| Styling    | Emotion via MUI `sx` + a central theme        |
| Routing    | React Router 7 (`createBrowserRouter`, lazy)  |
| Icons      | lucide-react                                  |
| Fonts      | Space Grotesk · Inter · IBM Plex Mono, self-hosted via Fontsource |
| Build      | Vite 8                                        |
| Deploy     | Static `dist/` behind Nginx on a Contabo VPS  |

No CSS framework, no animation library, no 3D library. The one custom visual —
the isometric block lattice in the hero — is a 2D canvas of roughly 200 shapes.
See `docs/DESIGN_SYSTEM.md` for the reasoning.

---

## Development

Requires Node 20+ (or Bun 1.1+).

```bash
npm install
npm run dev          # http://localhost:5173
```

With Bun:

```bash
bun install
bun run dev
```

Bun works for install and for running the scripts. The build itself is Vite in
both cases, so output is identical.

### Scripts

| Script              | Does                                                |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Dev server with HMR                                 |
| `npm run build`     | Sitemap → typecheck → production build into `dist/` |
| `npm run build:only`| Production build, skipping typecheck and sitemap    |
| `npm run preview`   | Serves `dist/` on port 4173                         |
| `npm run typecheck` | `tsc -b`, no emit                                   |
| `npm run sitemap`   | Regenerates `public/sitemap.xml` and `robots.txt`   |

---

## Environment variables

Copy `.env.example` to `.env` and fill in what applies.

> Everything prefixed `VITE_` is **inlined into the public bundle at build
> time**. It is visible to anyone who opens devtools. Never put an API key, a
> database URL or any other secret in this file — those belong to the backend
> service only.

| Variable                 | Purpose                                                   |
| ------------------------ | --------------------------------------------------------- |
| `VITE_SITE_URL`          | Absolute origin, no trailing slash. Canonical URLs, Open Graph tags, sitemap. |
| `VITE_CONTACT_EMAIL`     | Shown in the footer and contact page. Blank hides the row. |
| `VITE_CONTACT_PHONE`     | As above.                                                  |
| `VITE_CONTACT_LOCATION`  | As above.                                                  |
| `VITE_SOCIAL_LINKEDIN`   | Footer link. Blank hides it.                               |
| `VITE_SOCIAL_GITHUB`     | Footer link. Blank hides it.                               |
| `VITE_SOCIAL_X`          | Footer link. Blank hides it.                               |
| `VITE_API_BASE_URL`      | Backend origin for the contact form and the assistant.     |

**Contact and social values are intentionally empty by default.** The UI hides
those rows rather than showing placeholder details that look real.

**`VITE_API_BASE_URL` being empty is a supported state.** The contact form then
validates as normal and tells the visitor plainly that submissions are not
connected, offering a `mailto:` fallback. It never shows a success message for a
request that was not sent.

---

## Project structure

```
src/
  app/               App shell, router, error and layout boundaries
  components/
    cards/           Content-aware cards: Service, Industry, CaseStudy, Blog,
                     Solution, Numbered, TechGroup, ProcessTimeline
    common/          Reveal, Seo, Logo, SectionHeading, notices
    layout/          Section (tone system), PageHero, Footer
    navigation/      Header, MegaPanel, MobileNav, ThemeToggle
    sections/        Composed page sections (home/* and shared CallToAction)
    ui/              Design primitives: SurfaceCard, TechPanel, GridBackdrop,
                     GlowBackdrop, CornerTicks, Eyebrow, IndexBadge, StatTile,
                     TagRow, ArrowCue
    visual/          BlockLattice canvas, NodeNetwork, CaseStudyGlyph,
                     Web3StackDiagram
  config/            site.ts (env), navigation.ts (IA)
  data/              Structured content: services, solutions, industries,
                     caseStudies, careers, blog, process, technologies
  features/
    assistant/       Nexa: engine, knowledge base, speech input, UI.
                     NOT MOUNTED in V2 — see "Nexa assistant" below.
    contact/         ContactForm
  hooks/             useInView, usePrefersReducedMotion, useScrollProgress
  lib/               api.ts — the only place fetch is called
  theme/             tokens, palette, typography, components, a11y
  types/             content.ts — the content model
```

Rules that keep this maintainable:

- **Content is data, not JSX.** Anything repeated lives in `src/data` as typed
  objects. Pages map over them.
- **Colour, spacing, type and motion come from `src/theme/tokens.ts`.** No
  component invents a hex value.
- **`Section` owns page background.** Nothing else sets one.
- **Cards are `SurfaceCard`.** No page hand-rolls a border, fill and hover
  treatment; changing the card language is a one-file change.
- **Three layers, one direction of dependency.** `ui/` knows nothing about the
  content model, `cards/` maps content onto `ui/`, and pages compose `cards/`.

### Theming

Dark is the default and the primary brand experience; light is the alternate.
The choice lives on `<html data-color-scheme>`, is persisted by MUI's
`useColorScheme` to `localStorage` under `mui-mode`, and is applied before first
paint by a small inline script in `index.html`.

- `Section`'s `tone` selects a **surface step**, never a colour scheme. Adding a
  section that ignores the theme is therefore not possible through `tone`.
- Header, footer and the closing CTA panel are the only surfaces that pin a
  scheme. They stay dark in both themes because the logo lockup is unreadable on
  white — see `docs/DESIGN_SYSTEM.md`.
- Colours come from semantic palette tokens (`surfaceCanvas`, `surfaceBand`,
  `cardSurface`, `gridLine`, `chromeScrim`, …), defined once per scheme in
  `src/theme/palette.ts`. Components never hardcode a hex value.

### Nexa assistant

The assistant under `src/features/assistant/` is intact but **not mounted**.
It was taken out of scope for V2 and will return as a separate phase with a
more capable architecture behind it. Because nothing imports it, none of it
reaches the bundle.

To bring it back, render `<NexaAssistant />` in `src/app/RootLayout.tsx`.

---

## Common tasks

### Add a page

1. Create `src/pages/Thing.tsx` with a default export, opening with `<Seo>` and
   a `<PageHero>`.
2. Register a lazy route in `src/app/router.tsx`.
3. Add it to `src/config/navigation.ts` (`primaryNav`, `mobileNav`, `footerNav`
   as appropriate).
4. Add it to `staticRoutes` in `scripts/generate-sitemap.mjs`.

### Add a service

Append to `services` in `src/data/services.ts`. Pick a `group`
(`build` | `run` | `specialised`) and a lucide `Icon`. It appears automatically
on the homepage capability index, the services page, the mega menu (add the
link there too) and in Nexa's knowledge base.

### Add a case study

Append to `caseStudies` in `src/data/caseStudies.ts`. The list page, detail
route and sitemap all pick it up from the `slug`.

> These records are **representative engagement patterns**, not client case
> studies, and every surface that renders them also renders
> `IllustrativeNotice`. If real, approved case studies replace them, remove that
> notice and drop `isIllustrative` from the type.

### Add a job

Append to `openRoles` in `src/data/careers.ts` — the file documents the shape.
The array ships empty on purpose: the careers page renders a designed empty
state rather than inventing vacancies. Adding one entry switches it to the
listing view with no component changes. To load from an ATS instead, replace the
module with a fetch and keep the same shape.

### Add a blog post

Append to `blogPosts` in `src/data/blog.ts`. The body is an array of blocks
(`paragraph`, `heading`, `list`, `callout`) so it can move to a CMS later.
`publishedAt` is optional — the UI renders a date only when one exists, rather
than fabricating one.

---

## Production build

```bash
npm run build     # → dist/
npm run preview   # verify the built output locally
```

The build emits fingerprinted assets in `dist/assets`, plus `index.html`,
`robots.txt`, `sitemap.xml` and `brand/`. Vendor code is split into stable
chunks (`vendor-react`, `vendor-mui`, `vendor-router`, `vendor-icons`) so a
content-only release does not invalidate the framework cache. Every route
except the homepage is a separate lazily-loaded chunk.

---

## Deploying to a Contabo VPS

One-time server setup:

```bash
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx
sudo mkdir -p /var/www/bigblock
sudo chown -R "$USER":"$USER" /var/www/bigblock

sudo cp deploy/nginx.conf /etc/nginx/sites-available/bigblock.conf
sudo ln -s /etc/nginx/sites-available/bigblock.conf /etc/nginx/sites-enabled/
# Replace the server_name values with the real domain first.
sudo nginx -t && sudo systemctl reload nginx

sudo certbot --nginx -d example.com -d www.example.com
```

Each release:

```bash
./deploy/deploy.sh user@your-server
```

That builds locally, rsyncs to `dist.incoming/` and moves it into place, so the
served directory is never half-written. The previous build is kept at
`dist.previous/` for a quick rollback:

```bash
ssh user@your-server 'cd /var/www/bigblock && rm -rf dist && mv dist.previous dist'
```

`deploy/nginx.conf` covers the SPA fallback, immutable caching for fingerprinted
assets, a no-cache rule for `index.html`, gzip, and security headers including a
CSP that the build satisfies without `unsafe-inline` for scripts.

---

## Adding a backend

The frontend already assumes one exists and degrades cleanly when it does not.

```
browser → VITE_API_BASE_URL → your service → provider (mail, CRM, model API)
```

`src/lib/api.ts` is the only module that calls `fetch`. Two endpoints are
expected:

| Endpoint     | Method | Body                                                            |
| ------------ | ------ | --------------------------------------------------------------- |
| `/contact`   | POST   | `{ name, email, company, projectType, budget, preferredContact, message }` |
| `/assistant` | POST   | `{ message, history: [{ role, text }] }` → `{ text, link?, suggestions? }` |

To wire it up:

1. Run the service on the VPS (for example on `127.0.0.1:3001`).
2. Uncomment the `/api/` proxy block in `deploy/nginx.conf` and reload.
3. Set `VITE_API_BASE_URL=https://yourdomain.com/api` and rebuild.

Secrets — SMTP credentials, CRM tokens, model provider keys — live in the
service's own environment. They must never appear in a `VITE_` variable.

Until `/assistant` exists, Nexa answers from `src/features/assistant/assistantKnowledge.ts`,
which is derived from the same structured content the site renders. It cannot
state anything the site does not already state, and it refuses to quote prices
or invent company facts. Keep that constraint in the backend prompt.

---

## Notes on content

The site deliberately contains **no** client names, logos, testimonials,
headcounts, revenue figures, award claims, years-in-business or project metrics,
because none have been supplied or verified. Where a conventional corporate site
would show those, this one shows verifiable engineering practice instead. Replace
with real, approved material when it is available — the components are already
in place.

---

## Verification

The V2 work was checked against a real browser rather than by eye. Chrome runs
headless with `--remote-debugging-port=9222` and is driven over the DevTools
Protocol from a dependency-free Node script (Node 24 ships a global
`WebSocket`). The checks were:

| Check | How |
| --- | --- |
| Horizontal overflow | Every element's `getBoundingClientRect` compared to the viewport at 375 / 768 / 1024 / 1440 |
| Console errors | `Log.entryAdded` and `Runtime.exceptionThrown` collected per route |
| Heading order | `h1`–`h6` walked for level skips and multiple `h1`s |
| Text contrast | Foreground composited against the *actual painted* background, including translucent card fills, then measured against WCAG AA |
| Reduced motion | `Emulation.setEmulatedMedia` with `prefers-reduced-motion: reduce`, then a count of live animations and transitions |
| Focus visibility | Synthetic `Tab` presses, checking `outline` on each stop |
| Dead links | Every `href` on every page resolved against the route table |
| Theme coverage | Every `main > section`, header and footer sampled in both themes; any surface on the wrong side of the luminance midpoint that was not deliberately pinned is flagged |
| Theme persistence | Fresh visit, click, reload, cross-route navigation and keyboard activation driven through the real toggle |

No test dependency was added to the project for this; the scripts live outside
the repository.

---

## Documentation

- `docs/DESIGN_SYSTEM.md` — colour, type, spacing, motion, components, a11y
- `deploy/nginx.conf` — annotated server configuration
- `deploy/deploy.sh` — build and release script
