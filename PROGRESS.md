# Portfolio Build Progress
**Project:** Refaeli Ma — Principal Product Designer Portfolio
**Stack:** Vanilla HTML / CSS / JS — no frameworks
**Files:** `index.html`, `styles.css`, `tokens.css`, `assets/`

---

## Session Log

| Sessions | Work Done |
|----------|-----------|
| 1–2 | Design tokens, hero section, nav, cursor, scroll reveal, skills marquee |
| 3 | Philosophy section, kicker rules, animated dividers |
| 4 | Experience timeline — sticky two-column layout (built, then replaced) |
| 5 | Experience timeline — horizontal scroll rebuild with SVG thread |
| 5 | Scroll bug fixed: snap vs. scrollLeft conflict resolved with goTo() chapter-jump pattern |
| 6 | Unified sticky scroll: wsb-breaker + ob-breaker merged into work-stage and gal-stage; HIW orb component reused; canvas ripple replaced with CSS dot-grid on breakers; company logos added |
| 7 | Animated SVG card visuals: all 4 cards replaced with inline SMIL SVG |
| 8 | Card visual consistency pass across all 4 cards |
| 9 | VZ Identity card: date corrected; pointer-events bug fixed; dark redesign reverted; git initialized |
| 10 | Object Gallery: LEIRA content timing fixed — 3-pronged fix: static pre-seed, early overlay trigger (bFadeT>0.5), LEIRA_HOLD added |
| 10 | Footer: white background, dark text |
| 10 | Typography: global body +2pt, hero-location matches typewriter size, Ask AI body +1pt |
| 10 | VZ Identity card body copy merged to single paragraph |
| 10 | Project card UI: floating index repositioned, logo/eyebrow middle-aligned, tag pill padding |
| 10 | Object breaker body max-width matched to MADE REAL breaker (640px) |
| 10 | HOW I WORK grid: `auto-fit minmax(500px, 1fr)` — body no longer wraps to 2 lines |
| 10 | Philosophy layout: metrics below text, horizontal display, regular weight numbers |
| 11 | Animation overhaul: stagger delays widened (d1=0.12s…d6=1.24s), title 1.9s ease-reveal, body blur-to-clear 1.7s, eyebrow clip-path left-to-right, tiles bottom-to-top |
| 11 | Philosophy: tighter eyebrow gap, more space below metrics, section bottom padding |
| 11 | Tiles: delay classes bumped (d3–d6 for HOW I WORK, d4–d6 for Philosophy stats) to reveal after section text |
| 11 | Hover lift reduced: hiw-tile -6px→-3px, phi-stat-card -3px→-2px |
| 11 | Tile reveal trigger: `.r-late` class + separate `obsTile` observer with `-12%` rootMargin — tiles only animate when scrolled into view |
| 11 | Tile reveal animation: switched from transition to `@keyframes tile-reveal` (opacity+translateY) with `fill-mode: backwards` — separates reveal from hover transition |
| 11 | Hero page-load sequence: nav (0.1s) → typewriter (0.55s) → location (0.95s) — all use `@keyframes fu` |
| 11 | Typewriter JS delayed 550ms to sync with container visibility |
| 11 | Hero orbit: removed orbit2; orbit1 wrapped in `.orbit-shell` — CSS `@keyframes orbit-shell-in` handles scale(1.28→1) + opacity; JS handles rotation only |
| 11 | Hero marquee: `@keyframes marquee-in` clip-path reveal right→left (1.2s, 1.1s delay) |
| 11 | Hero photo: delay bumped 0.5s→2.3s — appears last in sequence |
| 11 | Breaker title/body spacing: `margin-bottom` 1.3rem→2rem on both MADE REAL and OBJECT breakers |
| 11 | Hero location letter-spacing: `--tracking-normal`→`--tracking-wider` (matches nav links) |
| 11 | HOW I WORK hover face: padding-left/right 1.2rem→2.2rem; expand text 13pt→12pt |
| 11 | Project card copy: VZ Home, BlueJeans, Iconmobile — body, tags, title updated; CTAs and NDA line removed |

---

## Completed

### Infrastructure
- [x] **`tokens.css`** — Full design token system
- [x] **`styles.css`** — 21-section CSS architecture
- [x] **Global reset & base**
- [x] **Layout scaffolding** — `.sec`, `.sec-inner`, `.sec-wide`, grid utilities

### Components
- [x] **Custom cursor** — 5 states, lerp ring
- [x] **Frosted-glass nav** — scroll-triggered, mobile burger overlay, page-load animation
- [x] **Scroll progress bar**
- [x] **Scroll reveal system** — `.r` / `.r-late` / `.on`, d1–d6 stagger, variant rules (title/body/eyebrow/tile), two observers
- [x] **Animated divider** — gradient line + traveling dot
- [x] **Footer** — white background, dark text

### Sections (index.html)
- [x] **Hero** — full sequence: orbit-shell → marquee → nav → typewriter → location → photo
- [x] **Skills marquee** — infinite horizontal scroll
- [x] **Philosophy** — dark section, serif statement, pullquote, metrics horizontal, scroll reveal
- [x] **Experience** — horizontal scroll timeline, 6 chapters
- [x] **Principles** — 4 principle cards (needs design pass)
- [x] **HOW I WORK** — 4 two-face glass tiles, staggered reveal, hover content
- [x] **MADE REAL breaker** — dark, full-viewport, dot-grid, glow, canvas ripple
- [x] **Work cards** — 4 cards with SVG animated visuals, updated copy for all 4
- [x] **OBJECT breaker** — light, full-viewport, clip-path marquee reveal
- [x] **Object gallery** — sticky scroll, 4 slides, overlay with title/year/awards, LEIRA timing fixed
- [x] **Contact** — dark section, email copy, Ask AI launcher, resume download
- [x] **Footer** — white

---

## In Progress / Needs Work

- [ ] **Principles** (`#principles`) — Uses wrong section class. Needs proper layout redesign.
- [ ] **Ask AI** — Overlay exists, real API not wired.
- [ ] **Contact form** — Endpoint not wired.

---

## Not Started

### Case Study Pages
- [ ] **`cs-vz-home.html`** — Verizon Home App. Reference: `casestudy_verizon_home.html`
- [ ] **`cs-bluejeans.html`** — BlueJeans by Verizon. Reference: `casestudy_vz_fromchaosfinal.html`
- [ ] **`cs-vz-id-arch.html`** — Verizon Identity Architecture
- [ ] **`cs-iconmobile.html`** — Iconmobile In-Car Experience

### Outstanding Design Decisions
- [ ] Work card imagery — final visuals for each card
- [ ] Object Gallery — final curation of objects
- [ ] Principles section direction

---

## Global Rules (do not break these)

- No em dashes anywhere — use commas
- Date ranges use en dash: `2011–2013`
- No orphan text
- No comments in code unless the WHY is non-obvious
- All design tokens from `tokens.css` — no hardcoded values in CSS
- Logos at `assets/logo/*.svg`
- Fonts: `Outfit` (sans) + `DM Serif Display` (serif)
- Dark background: `#181821` (`--dark`)
- Accent: `#3C49FF` (`--accent`)

---

## File Map

```
refaeli-portfolio/
├── index.html
├── styles.css
├── tokens.css
├── PROGRESS.md
├── COMPONENTS.txt
└── assets/
    ├── logo/
    ├── objects/
    ├── profile-related/
    ├── project-card/
    ├── how-i-work/
    ├── verizon-home-app/
    ├── bluejeans-by-verizon/
    ├── verizon-identity-architecture/
    └── iconmobile/
```
