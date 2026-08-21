# Design System — Big Block Technologies

The visual system for the corporate site. Everything documented here is
implemented in `src/theme/` and is changeable from a small number of files.

**Positioning statement:** serious engineering for modern technology. The
interface should read as *precise* rather than *impressive*. Where there was a
choice between complexity and restraint, restraint won.

---

## 1. Design decisions

Derived using the UI/UX Pro Max design-decision engine, then adjusted where its
generic recommendation conflicted with this brand.

| Dimension       | Decision                       | Why |
| --------------- | ------------------------------ | --- |
| Product category | B2B technology consultancy — not SaaS, not agency | Buyer is a technical decision-maker evaluating competence |
| Page pattern    | Enterprise Gateway             | Mega-menu IA, path selection, prominent enquiry CTA |
| Visual style    | Structural / technical-drawing | Hairlines, engineered grid, isometric geometry, square corners |
| Colour          | Brand-derived navy + azure     | Sampled from the logo rather than invented |
| Type            | Space Grotesk / Inter / IBM Plex Mono | Engineered display, neutral body, genuine technical labelling |
| Motion          | Restrained, 150–420ms          | Communicates hierarchy and state, never decorates |
| Icons           | lucide-react, 1.75 stroke      | One coherent set, no emoji, no mixed metaphors |
| 3D              | 2D canvas isometric lattice    | Brand-native (the mark is a cube) at a fraction of WebGL's cost |

### Two engine recommendations were overridden

1. **Typography.** The engine returned *Orbitron / Exo 2* for the blockchain
   keywords. Orbitron is a futurist display face that reads as crypto-novelty —
   precisely the register a serious engineering firm must avoid. Replaced with
   Space Grotesk (engineered geometry, no novelty) over Inter.

2. **Motion easing.** The engine suggested `back.out(1.4)` for staggered
   entrances. Its own guidance notes the overshoot "reads as sloppy on
   informational UI", which describes this site. Replaced with a long-settle
   ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`).

### Anti-patterns explicitly avoided

Giant gradient headline text · glassmorphism as a default surface · floating
blobs · neon glow · AI purple-pink gradients · pill-shaped everything ·
repeating three-card sections · fabricated metrics and testimonials · vendor
logo walls · emoji as icons · crypto imagery (coins, rockets, chain graphics) ·
Material ripple.

---

## 2. Colour

Sampled from the brand artwork, not chosen abstractly:

| Source             | Hex       | Role |
| ------------------ | --------- | ---- |
| "BLOCK" wordmark   | `#0079F0` | Brand azure — solid shapes |
| Cube face          | `#064DB5` | Brand depth, light-scheme accent |
| "BIG" wordmark     | `#C8CACE` | Steel / chrome detail |

### Scheme architecture

Two schemes are generated from one token set and emitted as CSS custom
properties scoped to `[data-color-scheme="…"]`. Dark is the default. **Any
element can flip the scheme for its subtree by setting that attribute** — which
is exactly what `Section` does. MUI components inside a light section pick up
light colours automatically: no nested `ThemeProvider`, no colour props, and no
possibility of a dark input landing on a white card.

### Section tones

The page alternates tone deliberately. A long corporate page that is uniformly
dark has no hierarchy.

| Tone    | Scheme | Surface              | Used for |
| ------- | ------ | -------------------- | -------- |
| `ink`   | dark   | `#060B14`            | Heroes, closing CTA, high-impact sections |
| `deep`  | dark   | `#0E1729`            | Secondary dark sections |
| `panel` | dark   | `#131F35`            | Contrast blocks inside dark runs |
| `light` | light  | `#F0F4F9`            | Reading-dense sections |
| `paper` | light  | `#FFFFFF`            | Highest-contrast light sections |

The homepage runs `ink → light → deep → panel → light → deep → paper → ink →
panel → light → deep → ink`, so no two adjacent sections read the same.

### Accessible pairs

Every combination in use was measured in the live DOM, not estimated.

| Pair                         | Ratio  | Verdict |
| ---------------------------- | ------ | ------- |
| `#F2F6FC` on `#060B14`       | 17.4:1 | AAA |
| `#A9B6CB` on `#060B14`       | 9.6:1  | AAA |
| `#7C8CA6` on `#060B14`       | 5.8:1  | AA |
| `#4DA3FF` on `#060B14`       | 7.6:1  | AAA |
| `#0A1220` on `#FFFFFF`       | 17.2:1 | AAA |
| `#47576E` on `#FFFFFF`       | 7.4:1  | AAA |
| `#5A6B85` on `#F0F4F9`       | 4.9:1  | AA |
| `#FFFFFF` on `#0062CC`       | 5.9:1  | AA |

**Two tokens exist for azure, and the distinction matters:**

- `brandAzure` — the saturated brand colour. **Solid shapes only**: rules, bars,
  square bullets, focus rings, diagram strokes.
- `accentText` — **all text and icons**. The pure brand azure measures
  3.9–4.3:1 against the dark surfaces it sits on, which fails AA for the 12px
  monospace labels that use it. `accentText` carries the same hue at a passing
  luminance (`#4DA3FF` dark, `#064DB5` light).

Interactive fills use `primary.main` `#0062CC` rather than `#0079F0`, because
white text on the brand azure measures 4.25:1 — below the 4.5:1 needed for
button labels.

---

## 3. Typography

Three families, each with one job and no overlap.

| Family        | Role | Weights |
| ------------- | ---- | ------- |
| Space Grotesk | Display and headings — engineered geometry | 500 / 600 / 700 |
| Inter         | Body, UI, controls — neutral and legible small | Variable |
| IBM Plex Mono | Technical metadata **only**: eyebrows, section indices, tech names, disciplines | 400 / 500 |

Self-hosted through Fontsource. No Google Fonts request at runtime: one fewer
origin, no third-party dependency, and the files ship from the same Nginx.

### Scale

Fluid via `clamp()`, so there are no breakpoint jumps in heading size.

| Token     | Range              | Line height | Tracking |
| --------- | ------------------ | ----------- | -------- |
| `display` | 2.75 → 4.75rem     | 1.02        | -0.035em |
| `h1`      | 2.25 → 3.5rem      | 1.08        | -0.03em  |
| `h2`      | 1.875 → 2.75rem    | 1.14        | -0.025em |
| `h3`      | 1.375 → 1.875rem   | 1.24        | -0.018em |
| `h4`      | 1.125 → 1.3125rem  | 1.34        | -0.012em |
| `body1`   | 1rem               | 1.65        | 0        |
| `body2`   | 0.9375rem          | 1.62        | 0        |
| `label`   | 0.75rem mono       | 1.4         | 0.14em, uppercase |

Body text is never below 16px on mobile — smaller values trigger iOS Safari's
zoom-on-focus. Long-form article text is constrained to `68ch`.

### The recurring device

A monospace eyebrow above a display heading, preceded by a short azure rule.
It labels what a section *is* before the reader commits to reading it, and
gives long pages a consistent scanning rhythm.

---

## 4. Spacing and layout

8px base grid (`theme.spacing(1) === 8px`).

| Token                  | Value |
| ---------------------- | ----- |
| Container max width    | 1320px |
| Prose measure          | 68ch |
| Page gutter            | `clamp(20px, 4vw, 48px)` |
| Section padding (Y)    | `clamp(72px, 9vw, 140px)` |
| Section padding, compact | `clamp(48px, 6vw, 88px)` |
| Header height          | 72px → 60px condensed |

### Radius

Deliberately tight. Square corners read as engineering precision; pill shapes
read as consumer marketing.

`xs 2px` · `sm 4px` (buttons, inputs) · `md 8px` (cards) · `lg 12px` · `xl 16px`

### Elevation

Depth comes from **borders and tonal shift**, not drop shadows. The shadow ramp
is shallow and used only for genuinely floating surfaces — the assistant panel
and the mobile drawer.

### Z-index

`base 0` · `raised 10` · `sticky 100` · `header 1100` · `drawer 1200` ·
`assistant 1250` · `modal 1300` · `toast 1400`

### Breakpoints

`xs 0` · `sm 600` · `md 900` · `lg 1200` · `xl 1536`

Verified at 375, 390, 430, 768, 1024, 1280, 1440 and 1920.

---

## 5. Motion

One rhythm across the product.

| Purpose               | Duration | Easing |
| --------------------- | -------- | ------ |
| Interaction feedback  | 150ms    | `cubic-bezier(0.16, 1, 0.3, 1)` |
| State change          | 200ms    | same |
| Entrance              | 420ms    | same |
| Exit                  | 150ms    | `cubic-bezier(0.4, 0, 1, 1)` |
| Stagger step          | 60ms     | — |

Rules:

- **Transform and opacity only.** Nothing animates a property that triggers
  layout, so no animation can cause a layout shift.
- **Entrances reveal, they do not perform.** 18px translate plus a fade. No
  scale, no rotation, no overshoot.
- **One moving thing per view.** The hero lattice sweep is the only continuous
  animation on the site, and it pauses when scrolled out of view.
- **`prefers-reduced-motion` is honoured twice**: globally in `CssBaseline`, and
  again in each animated component, which skips the work rather than shortening
  it. The lattice renders one static frame and never starts its loop.

---

## 6. Components

Material UI provides behaviour, accessibility plumbing and composition. The
theme replaces the Material *look*.

Notable overrides:

- **Ripple removed globally.** The ink ripple is the single strongest "stock
  MUI" signal. Feedback comes from precise colour and border changes instead.
- **Buttons**: 4px radius, no uppercase, 46px min height (54 large, 38 small —
  raised to 44 under `@media (pointer: coarse)`, so desktop controls stay
  elegant while touch controls stay reachable).
- **Paper/Card**: no shadow, no gradient overlay; a 1px hairline border.
- **Chips**: square, monospace, transparent — technical labels, not tags.
- **Inputs**: 16px text minimum, 2px azure focus ring, error state on the field.
- **Accordion**: stripped to hairline rules; no card, no elevation.

### Custom primitives

| Component            | Responsibility |
| -------------------- | -------------- |
| `Section`            | Page background, tone, colour scheme, vertical rhythm, optional grid |
| `PageHero`           | Consistent inner-page opening; owns the page's single `h1` |
| `SectionHeading`     | Eyebrow + heading + lede + optional action |
| `Reveal`             | Scroll entrance with stagger and reduced-motion bail-out |
| `Seo`                | Title, description, canonical, OG/Twitter, JSON-LD |
| `Logo`               | Brand lockup with reserved dimensions (no CLS) |
| `IllustrativeNotice` | Disclosure rendered wherever engagement patterns appear |
| `BlockLattice`       | Canvas isometric block field |
| `Web3StackDiagram`   | Inline SVG layered architecture diagram |

---

## 7. Visual language

**The lattice.** The brand mark is an extruded cube and the company is named for
blocks, so the hero visual is a structural lattice of them — not a particle
field, and not a stock 3D scene. Heights are quantised to five discrete storeys
so it reads as architecture rather than terrain. A single slow diagonal sweep
traverses it, which suggests a system being inspected rather than decoration in
motion.

It is a **2D canvas**, not WebGL: roughly 200 filled paths per frame, no shader
compilation, no library, no GPU requirement, and a graceful nothing if the
context is unavailable. Three.js would have added ~150KB gzipped to communicate
the same idea.

**Technical drawing cues.** Corner ticks instead of card borders on the hero
frame; masked engineering grids; hairline rules; monospace indices. These carry
the "precision" message without decoration.

**Diagrams over illustrations.** The Web3 section uses a real layered
architecture diagram with bus-rail connectors. It says something specific — that
on-chain products are three layers of ordinary engineering — where a stock
illustration would say nothing.

---

## 8. Accessibility

Targets WCAG 2.1 AA. Audited by script against the live DOM across ten pages,
in both pointer modes.

- **Contrast**: 0 failures. Every text/background pair meets 4.5:1 (3:1 for
  large text).
- **Touch targets**: 44px minimum on coarse pointers.
- **Focus**: one 2px azure ring, `:focus-visible`, never removed.
- **Semantics**: one `h1` per page, no skipped heading levels, landmark
  elements, `aria-labelledby` on every section.
- **Keyboard**: skip link, full tab access, Escape closes the mega menu,
  assistant and drawer; the closed mega panel and assistant are `inert`, so they
  are not reachable while hidden.
- **Forms**: visible labels, errors adjacent to the field, focus moved to the
  first invalid input on submit, `aria-live` status regions.
- **Colour is never the only signal**: the active nav item carries an underline
  bar, the active mobile row a square marker.
- **Decorative visuals** (`BlockLattice`, rules, bullets) are `aria-hidden`; the
  architecture diagram has a full `aria-label` describing its content.
- **Voice input** appears only where the browser actually supports speech
  recognition, rather than offering a control that cannot work.

---

## 9. Performance

- Route-level code splitting; only the homepage ships in the initial bundle.
- Vendor chunks split so a content release does not invalidate framework cache.
- Self-hosted fonts, subset by Fontsource, `font-display: swap`.
- Logo assets sized to their display size and re-encoded with adaptive PNG
  filtering (43KB for the header lockup, down from 105KB).
- Every image carries explicit `width`/`height` — no layout shift.
- The canvas caps device pixel ratio at 2 and stops its loop via
  `IntersectionObserver` when off-screen.
- Animation is confined to `transform` and `opacity`.
- Scroll listeners are passive.

---

## 10. Content principles

The site publishes **no** client names, logos, testimonials, headcounts,
revenue, awards, certifications, partnership claims, years in business or
project metrics, because none were supplied or verified.

Where a conventional corporate site would place social proof, this one places
verifiable engineering practice: what each delivery phase produces, what the
client owns, how contracts are tested. Those claims are checkable during an
engagement, which makes them stronger than an unverifiable statistic.

Case studies are labelled **representative engagement patterns** and carry a
disclosure wherever they appear. Careers ships with an empty roles array and a
designed empty state. Blog posts carry no author names and no publication dates,
because inventing either would be fabrication — the field exists and renders
when a real value is supplied.
