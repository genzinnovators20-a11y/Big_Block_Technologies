# MASTER — Big Block Technologies V2

Global source of truth for the V2 visual system. Generated with the UI/UX Pro Max
design-decision engine (`--design-system --persist --stack react`, dials
`--variance 7 --motion 5 --density 5`), then adjusted where the engine's generic
recommendation conflicts with this brand.

Everything here is implemented in `src/theme/` and `src/components/ui/`.
Page-level deviations live in `pages/`. If a page file exists it overrides this
file; otherwise this file governs.

**Positioning:** premium engineering, not premium marketing. The interface should
read as *built* — precise, layered, systematic — rather than *decorated*.

V1 was correct and under-designed: excellent content on a nearly flat typographic
canvas. V2 keeps the content spine and adds the visual system it was missing.

---

## 1. Engine output and overrides

| Dimension | Engine returned | V2 decision |
| --- | --- | --- |
| Landing pattern | Enterprise Gateway + Trust & Authority | **Accepted.** Mega-menu IA, prominent enquiry CTA, proof before CTA. |
| Style category | Soft UI Evolution | **Partially rejected.** Soft shadows read as consumer SaaS. Adopted instead: Swiss/structural base + Feature-Rich Showcase card system + heavily dampened HUD/FUI detailing. |
| Colour | `#0F172A` navy / `#0369A1` accent | **Rejected as source.** Palette stays derived from the brand artwork (`#0079F0`, `#064DB5`, `#C8CACE`). The engine's navy is a generic corporate navy; ours is sampled from the logo. |
| Typography | Orbitron / Exo 2 | **Rejected.** Orbitron is futurist display type that reads as crypto novelty — the precise register a serious engineering firm must avoid. Retained Space Grotesk / Inter / IBM Plex Mono. |
| Motion easing | `back.out(1.4)` | **Rejected.** The engine's own note says overshoot "reads as sloppy on informational UI", which describes this site. Retained `cubic-bezier(0.16, 1, 0.3, 1)`. |
| Stagger | 60ms per item | **Accepted.** Matches the existing `motion.stagger` token. |
| Motion library | GSAP / ScrollTrigger | **Rejected.** ~70 kB gzipped for entrance reveals that IntersectionObserver + CSS transforms already deliver at zero bundle cost. The engine's own accessibility rule flags `ScrollTrigger.create()` as an anti-pattern for motion sensitivity. |
| Icons | Phosphor | **Rejected.** `lucide-react` is already installed, tree-shakes per icon, and is stylistically identical. Adding a second icon set would be pure bundle cost. |
| Dark theme | "Dark Mode (OLED)": `#000000` / `#121212` grounds, vibrant neon accents, checklist item *"No white (#FFFFFF) background"* | **Rejected.** The engine's own entry rates neon-on-black accessibility poorly, and black-plus-neon is a gaming aesthetic, not a deep-navy engineering brand. The dark theme is built from the existing ink scale instead — darkest step `#060B14`, which still carries blue — with the brand azure as the only accent. |

### Anti-patterns explicitly avoided

Playful design · AI purple-pink gradients · neon glow · glassmorphism as a default
surface · giant gradient headline text · floating blobs · pill-shaped everything ·
repeating identical three-card sections · fabricated metrics, ratings and
testimonials · vendor logo walls · crypto imagery (coins, rockets, chains) ·
emoji as icons · Material ripple · scroll hijacking · WebGL for decoration.

---

## 2. Visual language

The three sources, synthesised:

| Source | What is taken | What is discarded |
| --- | --- | --- |
| Swiss / Minimalism | Grid discipline, type hierarchy, square corners, generous measure | Its emptiness — V2 is layered, not sparse |
| Feature-Rich Showcase | Card grids, hover lift, icon containers, alternating section tone | Bright multi-colour feature cards |
| HUD / Sci-Fi FUI | 1px rules, corner ticks, monospace micro-labels, status dots, technical panels | Neon cyan, glow text, transparency stacking, thin-line illegibility |

### Surface hierarchy

Depth comes from **border, tone and a single hairline top-highlight** — not from
drop shadows. A card is a plate of material with a lit edge, not a floating sheet.

```
base surface  ->  bordered card  ->  card + top highlight  ->  card + azure border on hover
```

### The recurring devices

1. **Monospace eyebrow** with a 22–26px azure rule before it. Labels every section.
2. **Numbered index** (`01`–`10`) in mono, azure, for any ordered system.
3. **Corner ticks** — 14px L-shaped marks at the corners of technical figures.
4. **Status row** — mono label + 6px dot, used on dashboard-style panels.
5. **Hairline grid** backdrop, radially masked so it never tiles to the edge.

---

## 3. Colour

Unchanged from V1 — it was already brand-derived and contrast-verified.

| Source | Hex | Role |
| --- | --- | --- |
| "BLOCK" wordmark | `#0079F0` | Brand azure — solid shapes, rules, borders |
| Cube face | `#064DB5` | Brand depth, light-scheme accent |
| "BIG" wordmark | `#C8CACE` | Steel / chrome detail |
| Interactive | `#0062CC` | Filled buttons (5.86:1 on white — the pure azure fails AA at 4.25:1) |

### Section tones — a surface scale, not a scheme

Five steps of tonal distance from the page canvas, defined once per colour
scheme. `Section` maps `tone` onto them; the colour scheme comes from the root
alone. That decoupling is what allows one set of section tones to produce a
coherent rhythm in **either** theme.

| Tone | Dark | Light | Used for |
| --- | --- | --- | --- |
| `canvas` | `#060B14` | `#FFFFFF` | Page canvas: heroes, insights |
| `alt` | `#0A111E` | `#F7F9FC` | Quiet alternating band |
| `band` | `#0E1729` | `#F0F4F9` | The main "other" surface |
| `raised` | `#131F35` | `#F3F6FB` | A block sitting above its neighbours |
| `contrast` | `#172440` | `#E9EFF7` | Strongest tonal break |

Dark is the default and the primary brand experience. Header, footer and the
closing CTA panel keep the dark chrome in both themes — deliberately; see
`docs/DESIGN_SYSTEM.md` for the artwork constraint that forces it.

V2 adds an optional radial azure wash (`GlowBackdrop`) at 3–6% opacity, positioned
per section so dark runs are not flat, plus a dedicated `gridLine` token so the
engineering grid stays a texture rather than becoming graph paper in the light
theme.

---

## 4. Typography

| Family | Job | Never used for |
| --- | --- | --- |
| Space Grotesk | Display + h1–h4 | Body copy |
| Inter Variable | Body, UI, controls, h5–h6 | Technical labels |
| IBM Plex Mono | Eyebrows, indices, tech names, status | Body copy, headings |

Fluid `clamp()` scale, unchanged.

---

## 5. Motion

| Property | Value |
| --- | --- |
| Interaction feedback | 90–200ms |
| Entrance reveal | 420ms, `cubic-bezier(0.16, 1, 0.3, 1)` |
| Stagger step | 60ms, capped at 6 items |
| Animated properties | `transform`, `opacity`, `clip-path` only |
| Continuous animation | At most one per viewport, paused when off-screen |

### Rules

- No animation gates content. Every reveal is a 420ms entrance, never a sequence
  the reader must wait through.
- No scroll hijacking, no scroll snapping, no pinning.
- `prefers-reduced-motion` renders the final state with zero transition, and
  cancels every `requestAnimationFrame` loop rather than merely shortening it.
- Continuous canvas/SVG animation stops via `IntersectionObserver` when off-screen.

---

## 6. Component inventory

Primitives in `src/components/ui/`, consumed by every page:

| Component | Purpose |
| --- | --- |
| `SurfaceCard` | The card primitive — border, top highlight, hover illumination |
| `TechPanel` | Dashboard-style panel with mono header and status dot |
| `GridBackdrop` | Masked engineering grid, one implementation for the whole site |
| `GlowBackdrop` | Radial azure wash for dark sections |
| `CornerTicks` | Technical-drawing corner marks |
| `Eyebrow` | Mono label with leading rule |
| `IndexBadge` | `01`–`10` numbered marker |
| `StatTile` | Single figure with label |
| `TagRow` | Compact capability tags |
| `ArrowCue` | Hover-reveal arrow used on every card link |

Theme control in `src/components/navigation/`:

| Component | Purpose |
| --- | --- |
| `ThemeToggle` | Light/dark switch. `bar` variant for the header rail, `row` variant for the mobile drawer. Wraps MUI's `useColorScheme`, so persistence and the root attribute have a single owner. |

Domain cards in `src/components/cards/`:
`ServiceCard` · `IndustryCard` · `CaseStudyCard` · `BlogCard` · `SolutionCard` ·
`NumberedCard` · `TechGroupCard` · `ProcessTimeline`

Generated visuals in `src/components/visual/`:
`BlockLattice` (hero canvas) · `NodeNetwork` (blockchain SVG) ·
`CaseStudyGlyph` (per-sector technical header) · `Web3StackDiagram`

---

## 7. Responsive

Tested at **375 / 768 / 1024 / 1440**.

- Mobile is composed, not shrunk: card grids become single column with tighter
  padding; the hero panels reflow below the copy rather than being hidden.
- No horizontal overflow anywhere — `body { overflow-x: hidden }` is a safety net,
  not the mechanism.
- Long mono strings (`Hyperledger Fabric`, `OpenTelemetry`) wrap rather than
  forcing a min-width.

---

## 8. Factual discipline (non-negotiable)

This site publishes **no** invented client names, headcounts, years in business,
uptime figures, project counts, ratings, awards, certifications or partnerships.

- Case studies are **representative engagement patterns**, labelled as such by
  `IllustrativeNotice` on every surface that renders them.
- Careers publishes real vacancies only. With none open, it renders a designed
  empty state — not invented roles or a fabricated team-satisfaction score.
- Outcomes are qualitative wherever no verified metric exists.

The reference screenshots contain figures (`99.98%` uptime, `60% faster
operations`, `4.8/5`, `50+` engineers, `12` open positions, `10+` years,
`100+` projects). **None of these are treated as facts.** They are visual
reference for layout density only.
