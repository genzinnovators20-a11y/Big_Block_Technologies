# Page override — Home

Overrides `MASTER.md` where noted. Everything unstated inherits the master.

The homepage is the visual benchmark for the site. Every other page borrows its
components; none exceeds its density.

## First viewport must answer

1. **What Big Block does** — headline + eyebrow (`SOFTWARE · BLOCKCHAIN · AI · PRODUCT ENGINEERING`)
2. **Who it serves** — lede names startups, growth companies, enterprises
3. **Why it is different** — three differentiator tiles below the fold line
4. **What it builds with** — the technology rail in the hero panel
5. **What to do next** — two CTAs, primary filled, secondary outlined

The hero carries business information, not only artwork. The visual sits beside
the copy, never behind it.

## Section order and tone

Follows the reference sequence rather than V1's, so proof arrives before the ask.

| # | Section | Tone | Construction |
| --- | --- | --- | --- |
| — | Hero | `ink` | Split grid; canvas lattice + two floating `TechPanel`s |
| 01 | Positioning / Who we are | `light` | 2-col editorial + Mission / Vision / Values cards |
| 02 | Capabilities / What we do | `paper` | 12 `ServiceCard`s in a 4-col grid, grouped by Build / Run / Specialised |
| 03 | Blockchain & Web3 | `ink` | `NodeNetwork` SVG panel + 10 `NumberedCard`s |
| 04 | Technology stack | `deep` | 7 `TechGroupCard`s, mono chips |
| 05 | Industries | `light` | 10 `IndustryCard`s, 3-col |
| 06 | Process | `paper` | `ProcessTimeline` — connected rail, scroll-progressive |
| 07 | Why Big Block | `panel` | Sticky left column + 6 `NumberedCard`s |
| 08 | Selected work | `light` | 6 `CaseStudyCard`s with `CaseStudyGlyph` headers |
| 09 | Careers | `deep` | Split: message + discipline tiles |
| 10 | Insights | `ink` | 3 `BlogCard`s with generated technical headers |
| — | CTA | `light` | Inset dark panel on a light section |

No two adjacent sections share a tone. No two adjacent sections share a
construction (grid / rail / split / timeline rotate).

## Deviations from master

- **Hero grid** is `80px`, not the standard `72px`, and is masked to the upper
  left so it never runs behind the headline's descenders.
- **Hero panels** are the only place a `TechPanel` floats over another element.
  Elsewhere they sit in the flow.
- **Careers tiles carry no numbers.** The reference mosaic shows `50+`, `4.8/5`,
  `12`, `100%` — all fabricated. Replaced with the six real recruiting
  disciplines and the five real hiring stages.
- **Case-study cards carry no metric chips.** The reference shows
  `60% faster operations` / `99.9% uptime`. No verified figures exist, so the
  cards show qualitative outcome tags and the `IllustrativeNotice` sits above
  the grid.

## Motion budget for this page

- One continuous animation total: the hero `BlockLattice` sweep, paused when
  scrolled out of view.
- Everything else is a one-shot entrance reveal, 420ms, staggered 60ms, capped
  at six items per group.
- The process timeline's progress rail animates on scroll position but never
  captures the scroll.
