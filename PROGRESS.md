# Portfolio Build Progress
**Project:** Refaeli Ma — Principal Product Designer Portfolio
**Stack:** Vanilla HTML / CSS / JS — no frameworks
**Files:** `index.html`, `styles.css`, `tokens.css`, `assets/`

---

## Session Log

| Date | Work Done |
|------|-----------|
| Session 1–2 | Design tokens, hero section, nav, cursor, scroll reveal, skills marquee |
| Session 3 | Philosophy section, kicker rules, animated dividers |
| Session 4 | Experience timeline — sticky two-column layout (built, then replaced) |
| Session 5 | Experience timeline — horizontal scroll rebuild with SVG thread |
| Session 5 | Scroll bug fixed: snap vs. scrollLeft conflict resolved with goTo() chapter-jump pattern |
| Session 6 | Unified sticky scroll: wsb-breaker + ob-breaker merged into work-stage and gal-stage; HIW orb component reused; canvas ripple replaced with CSS dot-grid on breakers; company logos added; logo size doubled to 36px |
| Session 7 | Animated SVG card visuals: all 4 cards replaced with inline SMIL SVG on light backgrounds (#eaebff/#eef1ff/#ecefff/#f0eeff) — VZ Identity (radar sweep+concentric rings+orbit nodes), VZ Home (bar chart+looping trend line), BlueJeans (meeting grid+waveform+controls), In-Car (animated speedometer+climate arc+nav route+accessibility symbol) |
| Session 8 | Card visual consistency pass: VZ Identity — added 3 fixed identity nodes (profile glyphs) with dashed spokes + inter-node lines + animateMotion data packets; VZ Home — replaced bar chart with 3×3 smart home tile grid (9 unique animated tiles: ring gauge, wifi arcs, IoT star, house icon, metric bars, neural net, shield/checkmark, router+signal, donut ring); BlueJeans — replaced blob silhouettes with geometric profile icon glyphs (head+shoulders clipPath) + per-tile desynchronized bobbing animateTransform; In-Car — rebuilt speedometer only (removed sub-panels), r=95, 7 major ticks + 12 minor ticks, continuous 4s ease-in-out needle bounce 225°–315° + matching active arc |

---

## Completed

### Infrastructure
- [x] **`tokens.css`** — Full design token system: typography scale, color palette, alpha variants, spacing, layout, radii, shadows, animation durations/easings, decorative patterns (dot grids, glows, divider gradients)
- [x] **`styles.css` skeleton** — 21-section CSS architecture, table of contents
- [x] **Global reset & base** — box-sizing, font-smoothing, `text-wrap: pretty/balance`, scroll-behavior
- [x] **Layout scaffolding** — `.sec`, `.sec-inner`, `.sec-wide`, `.sec-narrow`, grid utilities

### Components
- [x] **Custom cursor** — 5 states: default, hover, card, image, text. Lerp ring with mix-blend. `data-cursor` state machine via JS
- [x] **Frosted-glass nav** — scroll-triggered `.scrolled` state, logo + links + CTA, mobile burger overlay
- [x] **Scroll progress bar** — thin top rule filling on page scroll
- [x] **Scroll reveal** — `.r` → `.on` via IntersectionObserver, stagger delay classes `.d1`–`.d6`
- [x] **Animated divider** — gradient line + traveling dot between sections
- [x] **Cursor orbit rings** — decorative rings that animate on cursor idle

### Sections (index.html)
- [x] **Hero** — full-viewport layout, hero photo (distortion fixed), typewriter role, serif name, stat strip (10+ yrs / 40+ products / 20M+ users), floating particle canvas, hero-location dot
- [x] **Skills marquee** — infinite horizontal scroll, separators, `mix-blend-mode: difference` on dark strip
- [x] **Philosophy** — dark section (`#181821`), serif statement, pullquote with left border, two body paragraphs. Thin divider replacing spacer-dot-runner above it.
- [x] **Experience** — horizontal scroll timeline, 6 chapters (intro + 5 career stops), scroll-snap, chapter counter, progress bar, nav dots, scroll hint, SVG thread (wavy path + dashoffset + 6 nodes + 5 float dots). Wheel → chapter-jump via `goTo()`. Mobile: vertical stack fallback.

### Chapter content (Experience)
- [x] Ch 01 — Intro: headline + metrics strip (10+/40+/20M+)
- [x] Ch 02 — 2011–2013: Product Management
- [x] Ch 03 — 2013–2018: ArtCenter College of Design + award logos (EPDA, A' Design, ICFF)
- [x] Ch 04 — 2018–2021: 13 Orphans Studio + In-Car Experience + brand logos (Kia, BMW, Ford, Porsche)
- [x] Ch 05 — 2021–2023: BlueJeans by Verizon, 900+ design system components
- [x] Ch 06 — 2023–Present: Verizon Home App, 1.7 → 4.5 App Store rating

---

## In Progress / Placeholder State

These sections exist in `index.html` with content but have not been designed or refined:

- [ ] **Principles** (`#principles`) — Uses `philosophy-sec` class (wrong). Has 4 principle cards (P>S, O>O, E>O, + one more). Needs redesign from scratch, proper section class, visual treatment.
- [ ] **How I Work** (`#how-i-work`) — Saved after principles. Has tile grid structure. Needs layout and visual polish. Content needs review against PRD.
- [ ] **Made Real breaker** (`#work-intro`) — One-line section break before Work. Needs editorial layout, not just a sentence.
- [ ] **Work section** (`#work`) — 3 case study cards exist with placeholder/partial content. Cards have image areas, titles, tags. Need proper featured-card layout and real imagery.
- [ ] **Object Gallery** (`#object`) — Exists with items. Needs layout polish and curated content.
- [ ] **Contact** (`#contact`) — Form UI exists (name, email, message + submit). Endpoint not wired. Needs visual polish. Left column (contact info) needs content.
- [ ] **Ask AI** (`#askai-launcher`) — Sticky launcher button exists. Overlay panel exists. Real AI integration not wired (no API call). UX flow incomplete.
- [ ] **Footer** — Exists but needs content review and visual refinement.

---

## Not Started

### Case Study Pages (separate HTML files)
Each is its own page linked from the Work cards:

- [ ] **`cs-bluejeans.html`** — BlueJeans by Verizon. Remote Learning platform, 900+ component design system. PRD reference: `casestudy_vz_fromchaosfinal.html` (partial).
- [ ] **`cs-vz-home.html`** — Verizon Home App. Full systems leadership story. PRD reference: `casestudy_verizon_home.html`.
- [ ] **`cs-vz-id-arch.html`** — Verizon Identity Architecture. No reference file yet.

### Outstanding Design Decisions
- [ ] **Work card imagery** — What visuals go in each card? Mockups, screenshots, or abstract editorial?
- [ ] **Object Gallery curation** — Final list of objects and why each one
- [ ] **Principles section direction** — Dark like Philosophy or light? Same card layout or something different?
- [ ] **Made Real breaker** — Typographic only or has a visual element?

---

## Global Rules (do not break these)

- No em dashes anywhere in visible content — use commas instead
- Date ranges use en dash: `2011–2013`
- No orphan text (single word on last line of paragraph)
- No comments in code unless the WHY is non-obvious
- All design tokens from `tokens.css` only — no hardcoded values in CSS
- Logos at `assets/logo/*.svg` — grayscale default, color on hover
- Fonts: `Outfit` (sans) + `DM Serif Display` (serif)
- Dark background color: `#181821` (`--dark`)
- Accent: `#3C49FF` (`--accent`)

---

## File Map

```
refaeli-portfolio/
├── index.html          — main portfolio page
├── styles.css          — all component + section CSS (21 sections)
├── tokens.css          — design system tokens (single source of truth)
├── PROGRESS.md         — this file
├── assets/
│   └── logo/           — SVG logos (art-center, bluejeans, verizon, kia, bmw, ford, porsche, 13-orphan, epda, a-design-award, icff, + others)
└── style-guide-reference/
    ├── portfolio_refaeli_v1.html
    ├── prototype_sticky_askai.html
    ├── casestudy_verizon_home.html
    ├── casestudy_verizon_home_v2.html
    ├── casestudy_verizon_home_v2_1.html
    └── casestudy_vz_fromchaosfinal.html
```
