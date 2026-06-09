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
| 12 | cs-vz-home.html: full Verizon Home App case study built — 2-part structure, 15+ sections, all assets wired, cinematic quote moments, product pillars, IA viz, phone frames, videos |
| 13 | MADE REAL + OTHER THINGS I MAKE breakers: text left-aligned, content-default gutter matched to Design Philosophy, h2 max-width 600→900, kicker inline `justify-content:center` removed, h2 font scale matched to var(--text-heading) |
| 13 | Section-header rhythm tokenized: `--gap-eyebrow` 0.7rem→1.75rem, `--gap-heading` 1.3rem→0; applied home-wide (Philosophy, How I Work, breakers, Impact, Contact); `.cs-sec` re-scopes back to 0.7/1.3rem so CS pages are untouched |
| 13 | Custom-class consumers refactored to reference tokens: `.phi-kicker`, `.phi-statement-wrap`, `.cz-kicker`, `.cz-title`; redundant breaker margin overrides removed |
| 13 | Breaker blueprint illustration explored (wsb-bp wireframe + ob-bp contour stack, 18s loop, scroll-synced play-state) — built then removed at user request (positioning too off) |
| 13 | COMPONENTS.txt refreshed: §3 breakers rewritten (`.wsb-breaker`/`.ob-breaker`, not `.philosophy-sec`); §16 tokens — new section-header rhythm block + CS scope note; §18 case studies updated to "all four built" + shared CS components inventory |
| 13 | COMPONENTS.txt §19 added — Case Study Pattern Recipes: 11 reusable recipes (hero stage, marquee, overview grid w/ hover-flip, scroll-cover stacked chapters, sidenav dot rail, image frame, stat/quote, dashboard showcase, orbit rings, pull-quote, standard `.cs-sec`) with skeleton HTML + slots + JS hooks + extraction criteria |
| 13 | Rhythm tokens unified across all four CS pages: `.cs-sec` re-scope removed (whole site shares 1.75rem / 0); bespoke CS classes refactored to consume the tokens — BJ (.bj-eyebrow, .bj-overview-eyebrow, .bj-h1), VZ Home (.vzh-kicker, .vzh-title, .chap-eyebrow, .chap-h), VZ-ID-Arch (.ia-eyebrow), Iconmobile (.kia/.ford/.bmw-kicker via replace_all). Hero h1s already at margin:0 (matches gap-heading), left as-is |
| 14 | CS hero kicker / title order flipped — all 6 heroes (BJ, VZ Home, VZ-ID-Arch, KIA/Ford/BMW in Iconmobile) now render `h1` on top and eyebrow below as a subtitle (~1rem gap, descender-safe). VZ Home hero refactored: CTAs moved into a right column with `align-items: flex-end` so download badges bottom-align with the title's baseline |
| 14 | cs-vz-home Chapter One overhauled — new editorial flow inserted after metrics strip: CONTEXT (orbs bg, 7rem padding, single pullquote) → CHAPTER NAVIGATOR (`.chap-break` rebuilt: 2-block layout with leading + center divider, hover-flip face reveals description + jump link via `.cb-jump` / `.cb-jump-back`, active-side number shimmers via `cb-shimmer` keyframe sweeping linear-gradient over `background-clip: text`) → SUMMARY (token rhythm + `vz-home-summery.png` full-width) → CHALLENGE (3 `.hiw-tile` reuse w/ line icons + `.hiw-bullets` dot-list inside hover face, bg-warm, 11rem bottom padding) → MY ROLE (Venn diagram: 2 `.role-orbit` rings reuse `.hiw-dot-arm` + `hiw-spin-cw/ccw`, scroll-triggered convergence over 4s cubic-bezier, 3-staged label fade — "Design Craft" left of left orb, "Leadership & Strategy" right of right orb, "Bridge<br>&<br>Alignment" stacked in overlap; dark mode w/ accent-mid labels) |
| 14 | cs-vz-home APPROACH → 4 MOVES multi-level parallax cover stack: APPROACH = sticky overview w/ static 4-step visual stepper (flex `space-between`, circles at 10%/36%/63%/89%, connector line gradient `slide` keyframe + 6px traveling dot `travel` keyframe both on 5s loop, sub-text 2-line). 4 MOVE sections (`.vzh-stack-cover` z-index 2/3/4/5, alternating bg-warm/page, border-radius top + shadow) each render eyebrow `0N · Verb` + sentence-case title + `.move-grid` of 3 tiles (Problem/Action/Result; Move 4 uses "Insight"). Each tile has content-specific transparent line icon (~200px, opacity 0.10) top-right + accent dot bullet list (body-sm font for action density). Tab system retired |
| 14 | cs-vz-home OUTCOME section: dark `cs-sec bg-dark`, 6-card grid (`grid-template-columns: repeat(6, 1fr)`); cards 1-3 span 2, cards 4-5 span 3 (`.oc-half`), card 6 full-width (`.outcome-card-full`). Card 3 (Unusable Tickets) renders inline `<polyline>` line chart w/ stroke-dash draw-in + side-by-side metric/sub layout (`.oc-bottom-row`). Cards 4-5 show "before → after" ratings w/ Android + Apple SVG glyphs (opacity 0.22 backdrop). Card 6 renders 15-marker release timeline w/ staggered fade-up (each `style="--idx:N"` cascades via transition-delay). Counter parser extended in `vzStatObs` to strip commas before regex and re-format via `toLocaleString()` so "28,398,237" type figures tick up cleanly |
| 14 | cs-vz-home VERIZON 1.0 video section refined: bg-dark → bg-warm, color-alternating w/ neighboring dark sections; new eyebrow/title/body copy. Auto-play on scroll wired via new `csVideoObs` IntersectionObserver (`threshold: 0.5`, plays on enter / pauses on exit; mute attr kept so browsers honor autoplay). Native browser controls preserved. `.cs-video-wrap` lost its `border-radius` + black background + 1px dark border (eliminated black-corner artifact reported on warm bg) |
| 14 | Orbs (`.hiw-orbs` reused from `#how-i-work`) added to backgrounds of MOVE 1/2/3/4 + CONTEXT + VERIZON 1.0; `.vzh-stack-cover` got `overflow: hidden; isolation: isolate` so orbs stay within each sticky cover. Legacy "03 · Operational Moves" + "04 · Sequence Timeline" sections removed — Chapter One now ends at VERIZON 1.0 then transitions straight into Chapter Two via existing chap-break navigator |
| 14 | Bridge of token / stylesheet integrity: tokens.css (`--gap-eyebrow: 1.75rem`, `--gap-heading: 0`) and styles.css shared rhythm rules unchanged today — all cs-vz-home additions are page-scoped inline CSS, so no drift; COMPONENTS.txt §16 token block still describes truth. New cs-vz-home page-scoped patterns (chap-break navigator w/ hover-reveal, role-venn orbits, apr-stepper, vzh-stack-cover multi-level, outcome-grid + oc-tl timeline) are candidates for future §19 promotion if they get reused on another CS page |
| 15 | MADE REAL + OTHER THINGS I MAKE breakers rebuilt with HERO solar-system pattern (ported from cs-vz-id-arch). Old tilted-ellipse / Saturn-ring / camera-zoom attempt thrown out entirely. Both breakers now share `.solar-breaker` markup: top-down circular orbits (4 concentric rings × 4 nodes each = 16 dots), center orb, chaos words (phase 1), connection spokes + data pulses + outer celestial orbits (phase 4). Generic class names (`.ring`/`.arm`/`.node`/`.dot`/`.label`/`.orbit-path`/etc.) all scoped under `.solar-breaker` so they don't leak. OBJECT breaker uses `.solar-breaker.is-light` color overrides (off-white dots w/ stronger purple glow, transparent orb-core w/ `var(--accent)` outer outline + lavender inner outline, dark labels w/ warm halo) |
| 15 | Solar-breaker label batch cycle: every 6s once rings are visible, all 16 labels swap to the next batch of 4 from their ring's pool. Staggered across the 16 labels (80ms each → ~1.3s wave) with 0.6s opacity fade + 3px blur during swap. `startSolarLabelCycle(rootEl, POOLS)` helper shared by both breakers; two named pools (`DIGITAL_POOLS`, `OBJECT_POOLS`) each with 4 ring keyword arrays. Cycle pauses on `document.hidden`, resumes on focus. Center orb labels: "Digital Experience" (work) + "Object" (object) — `text-align: center` + `line-height: 1.25` + `letter-spacing: 0.18em` on `.orb-label` so 2-word labels stack inside the 11vmin orb without overflowing |
| 15 | IMPACT & RECOGNITION — logo block ↔ metrics tiles swapped (recog grid now on top, 3 stat cards below). Stat cards stripped of bg fill (`background: transparent`); numbers desaturated to `rgba(24, 24, 32, 0.5)` then color-transition to `var(--accent)` on card hover. Existing border + hover lift + shadow preserved |
| 15 | Design Philosophy — pullquote ("Most products fail not in execution…") moved from between statement+body to the END of the left column (delay class `d2` → `d5`). Text broken into 2 lines via `<br>` after "definition,". Container gained `var(--accent-mid-a08)` background, 1.1rem/1.5rem padding, and right-side `border-radius: var(--radius-card-sm)`. Pullquote text bumped from `clamp(12pt, 1.4vw, 15pt)` → `clamp(16pt, 2vw, 20pt)`, line-height 1.6 → 1.5. `.phi-statement-wrap` got `margin-top: -8px` (nudges title closer to kicker) + `margin-bottom: 2.5rem` (restores breathing room the pullquote used to provide) |
| 15 | Work card feed — `var(--dot-grid-white-sm)` added to `.work-stage` so the dot pattern extends behind the entire sticky card stack, matching the breaker surface once the breaker overlay fades out |
| 15 | Vimeo embed URLs swapped + behavior simplified. cs-vz-id-arch: `idarch-mission-vimeo` 1199080100 → 1199585967, `idarch-solution-vimeo` 1199080737 → 1199586256. cs-vz-home: `vz1-vimeo` (Verizon 1.0) 1198892283 → 1199586918 w/ `controls=0` → `controls=1`. cs-vz-home "From Reactive to Proactive" was a local mp4 (`assets/verizon-home-app/from-reactive-to-proactive-vision-video.mp4`) — now a Vimeo iframe `vz2-vision-vimeo` pointing to 1199586482. All four embeds: `muted=1` URL param, autoplay-when-in-view, pause-when-out, native Vimeo controls expose play/pause + volume. Old click-to-unmute button overlays removed. `setupVimeoEmbed` (id-arch) + `setupMutedVimeo` (vz-home) both reduced to ~15 lines |
| 15 | cs-bluejeans YouTube embeds (`rl-yt`, `mt-yt`): `mute=0` → `mute=1`. Nothing else touched per request |
| 15 | Token integrity: tokens.css unchanged today — solar-breaker color values were ported faithfully from cs-vz-id-arch inline CSS (which uses one-off rgba); fresh code that had a clean token equivalent (`var(--accent-mid-a08)` on the pullquote bg) was tokenized rather than inlined. The off-white dot fill, the center-orb glow values, and the `.is-light` color overrides are all `.solar-breaker`-scoped one-offs — candidates for token promotion only if the solar pattern shows up on another page |

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
- [x] **Philosophy** — dark section, serif statement, pullquote at end of column w/ translucent purple wash + 2-line break + `clamp(16pt, 2vw, 20pt)` text, metrics horizontal, scroll reveal
- [x] **Experience** — horizontal scroll timeline, 6 chapters
- [x] **Principles** — 4 principle cards (needs design pass)
- [x] **HOW I WORK** — 4 two-face glass tiles, staggered reveal, hover content
- [x] **MADE REAL breaker** — dark, full-viewport, dot-grid, solar-system animation (`.solar-breaker`): chaos words → DESIGN orb → 4 concentric orbits w/ 16 orbiting nodes → text overlay + connection spokes + outer celestial orbits. Labels batch-cycle every 6s from `DIGITAL_POOLS`
- [x] **Work cards** — 4 cards with SVG animated visuals, updated copy for all 4
- [x] **OBJECT breaker** — light, full-viewport, same solar-system animation as MADE REAL via `.solar-breaker.is-light` variant: off-white dots w/ stronger purple glow, transparent orb-core w/ purple outer outline, dark labels. Labels batch-cycle every 6s from `OBJECT_POOLS`
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
- [x] **`cs-vz-home.html`** — Verizon Home App. Full 2-chapter build: Part 1 (From Chaos to Cadence) + Part 2 (From Reactive to Proactive). All assets wired. Videos, phone frames, pillar cards, IA visualization, cinematic sections.
- [x] **`cs-bluejeans.html`** — BlueJeans by Verizon. Built; most pattern-rich CS page (hero stage, three-block overview w/ hover-flip, sticky-cover stacked chapters, quote grid, partner logos, FTU stage). See COMPONENTS.txt §19 for the recipes derived from this page.
- [x] **`cs-vz-id-arch.html`** — Verizon Identity Architecture. Built.
- [x] **`cs-iconmobile.html`** — Iconmobile In-Car Experience. Built; three brand showcases (KIA, Ford, BMW) using full-bleed dashboard showcase pattern.

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
