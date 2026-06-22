# v2 Design System

Reference for applying the v2 home page patterns to case-study pages.
**Activate by adding `class="v2-home"` to `<body>`** on any page — most rules below are scoped under `body.v2-home`. (Layout-specific selectors like `.proj-card`, `.hiw-v2-sec` won't fire if the markup isn't there, so the class is harmless on pages that don't need them.)

---

## Global token changes (already live everywhere)

| Token | Before | After | Impact |
|---|---|---|---|
| `--font-serif` | `'DM Serif Display', Georgia, serif` | `'Outfit', system-ui, sans-serif` (alias) | Every `var(--font-serif)` reference (~41) silently becomes Outfit. Kills the serif globally. |
| `--dark` | `#181821` (off-black w/ purple tint) | `#000000` | Every `var(--dark)` reference (~20) becomes pure black. |

These two edits in `tokens.css` propagate to **all pages** instantly. Reverse by reverting the tokens.

---

## Typography scale

All sizes in `pt` because the v2 site is print-leaning. Use `clamp()` for responsive scale.

### Eyebrow / kicker

Tiny uppercase label that sits above a title.

```css
font-family:   var(--font-sans);
font-size:     9pt;
font-weight:   var(--weight-medium);     /* 500 */
letter-spacing: var(--tracking-wider);   /* ≈ 0.16em */
text-transform: uppercase;
color:         rgba(255, 255, 255, 0.55);   /* on dark bg */
/* or */       rgba(0, 0, 0, 0.55);         /* on light bg */
margin-bottom: clamp(1rem, 2vh, 1.5rem);
```

**Examples in v2 source**: `.hiw-v2-kicker`, `.impact-v2-kicker`, `.breaker-v2-kicker`, `.cz-kicker .ch`, `.cz-ai-label`, `.proj-card-type`.

### Section title

The big italic-em-accent title. Thin weight + tight tracking.

```css
font-family:    var(--font-sans);
font-size:      clamp(28pt, 4.4vw, 56pt);
font-weight:    var(--weight-thin);       /* 200 */
line-height:    1.1;
letter-spacing: -0.012em;
color:          #fff;                     /* on dark */
margin:         0 0 clamp(1rem, 2vh, 1.4rem);

/* italic accent inside */
em {
  font-style:  italic;
  font-weight: var(--weight-light);       /* 300 */
}
```

**Examples**: `.hiw-v2-title`, `.impact-v2-title`, `.breaker-v2-title`, `.cz-title`, `.proj-card-title`.

### Lede / blurb

Body paragraph. Regular weight, comfortable reading line-height.

```css
font-family:    var(--font-sans);
font-size:      clamp(11pt, 1vw, 13.5pt);
font-weight:    var(--weight-regular);    /* 400 */
line-height:    1.6;
color:          rgba(255, 255, 255, 0.65);  /* on dark */
/* or */        rgba(0, 0, 0, 0.65);        /* on light */
max-width:      none | 32rem | 48rem;      /* per context */
margin:         0 0 clamp(3rem, 6vh, 5rem);
```

**Examples**: `.hiw-v2-lede`, `.impact-v2-lede`, `.breaker-v2-lede`, `.cz-sub`, `.cz-ai-body`.

### Card-sized title

For titles inside cards (smaller than section titles).

```css
font-family:    var(--font-sans);
font-size:      clamp(16pt, 2.2vw, 26pt);
font-weight:    var(--weight-thin);
line-height:    1.2;
letter-spacing: -0.008em;
color:          #fff;
```

**Examples**: `.cz-ai-title`.

### Statement number (big metric)

For "10+ / 40+ / 100M+" style digits.

```css
font-family:    var(--font-sans);
font-size:      clamp(52pt, 8vw, 110pt);
font-weight:    var(--weight-thin);
line-height:    0.95;
letter-spacing: -0.03em;
color:          #fff;
```

### Page-index (small statement)

For "02 / 04" style indices on project cards.

```css
font-family:    var(--font-sans);
font-size:      clamp(28pt, 3.6vw, 44pt);
font-weight:    var(--weight-light);
letter-spacing: -0.015em;
line-height:    1;
color:          rgba(0, 0, 0, 0.42);     /* muted */

/* current page number — bold */
strong {
  font-weight: var(--weight-semibold);
  color:       #000;
}
```

---

## Section padding

| Pattern | CSS | Used by |
|---|---|---|
| **Standard symmetric** | `padding: clamp(5rem, 9vh, 8rem) 0;` | IMPACT |
| **Extra breathing room (the "+200px" pattern)** | `padding: calc(clamp(5rem, 9vh, 8rem) + 200px) 0;` | IMPACT (after bump) |
| **HIW-style generous** | `padding: calc(clamp(9.5rem, 15.5vh, 14.5rem) + 200px) 0;` | HOW I WORK |
| **Inner content column** | `max-width: 88rem; margin: 0 auto; padding: 0 clamp(1.25rem, 5vw, 4rem);` | `.hiw-v2-inner`, `.impact-v2-inner` |
| **Wide content column** | `max-width: 100rem; margin: 0 auto; padding: clamp(2.5rem, 5vh, 4rem) clamp(1.25rem, 5vw, 4rem);` | `.impact-block-inner` |
| **Pre-pinned breaker buffer** | `padding-top: 600px;` (atop a sticky/runway section) | `.quote-sec` |

**Horizontal padding `clamp(1.25rem, 5vw, 4rem)`** is the global v2 standard — matches `nav` padding so left/right edges align across sections.

---

## Color palette (per-section theme)

For project cards, each scene has its own primary text hue keyed off the scene's dominant background:

| Card / theme | Primary | Body (×0.82) | Muted (×0.42) | Tag bg |
|---|---|---|---|---|
| Cream/beige (VZ Home App) | `#3D2817` (dark coffee brown) | `rgba(61, 40, 23, 0.82)` | `rgba(61, 40, 23, 0.42)` | `rgba(255, 250, 240, 0.25)` |
| Light blue (BlueJeans) | `#0F2244` (deep navy) | `rgba(15, 34, 68, 0.82)` | `rgba(15, 34, 68, 0.42)` | `rgba(220, 232, 255, 0.25)` |
| Dark scene (VZ Identity, Iconmobile) | `#ffffff` | `rgba(255, 255, 255, 0.82)` | `rgba(255, 255, 255, 0.42)` | `rgba(0, 0, 0, 0.22)` |

**General rule**: pick a tone in the same hue family as the bg, dark enough for **≥ 4.5:1 contrast** (WCAG AA body). Use `0.82` for body, `0.55–0.78` for kickers, `0.42` for dim/muted.

---

## Reusable components

### 1. `.glass-cta` — Liquid glass pill button

Drop in any element (anchor, button, span) for the v2 CTA look.

```html
<!-- Dark backgrounds (translucent white) -->
<a class="glass-cta" href="...">Book a Call</a>

<!-- Light backgrounds (translucent black) -->
<a class="glass-cta glass-cta--dark" href="...">Learn More</a>
```

What's included:
- Pill shape, translucent fill, backdrop blur + saturate, inset top-rim sheen, soft drop shadow.
- Hover: brightens, rises 2px, shadow deepens.
- **Auto-picks up `.spotlight-glow`** — the cursor-tracked accent halo + animated 1.5px border ring fire on hover. No JS hook required.

### 2. `.glass-tile` — Liquid glass card

Drop in any div for a glass card surface (like the "Ask AI" card).

```html
<!-- Dark bg -->
<div class="glass-tile">
  <h3>Title</h3>
  <p>Body text…</p>
</div>

<!-- Light bg -->
<div class="glass-tile glass-tile--dark">…</div>
```

What's included:
- Translucent fill, stronger backdrop blur (22px), rounded corners, inset highlight + drop shadow.
- Larger spotlight halo (460/600px) tuned to card footprint.
- Same auto-glow as `.glass-cta`.

### 3. `.spotlight-glow` — Cursor-tracked hover halo

The base hover-glow effect used by every interactive surface on v2 (nav dropdown cards, HIW principle rows, AI card, CTA, tags). Adds **two layered glows** to any element:

- `::before` — soft inner accent spotlight that follows the cursor (radial gradient at cursor position).
- `::after` — masked 1.5px border ring that lights up the element's edge under the cursor.

```html
<div class="spotlight-glow">…</div>
```

Or, more commonly, **add via JS** so it's automatic across many elements:

```js
document.querySelectorAll('.your-tile, .your-card')
  .forEach(el => el.classList.add('spotlight-glow'));
```

Then the global `spotlightGlow()` IIFE already wired up in `index-v2.html` handles `pointermove` and writes per-element `--x` / `--y` for the CSS to consume.

**Tunable** via two CSS variables on the element:

```css
.your-tile {
  --spot-inner: 320px;  /* default — radius of the soft inner glow */
  --spot-outer: 420px;  /* default — radius of the border ring glow */
}
```

Lower for buttons (`160 / 220` px), higher for wide cards (`460 / 600` px).

### 4. `.anim-divider` — Animated hairline divider

Section break: 2px gradient line with a traveling dot.

```html
<div class="anim-divider">
  <div class="anim-divider-line"></div>
  <div class="anim-divider-dot"></div>
</div>
```

No JS required — keyframes are global. Lives anywhere; uses parent's width.

### 5. VCR entry animation

Per-word vertical-cut reveal. JS wraps each word in `<span class="vcr-word"><span class="vcr-inner">word</span></span>`, then adds `.is-vcr-active` to a parent when it enters viewport. CSS does the rest.

**To use on a new section**, add to the existing `hiwVerticalCutReveal` IIFE in `index-v2.html`:

```js
var mySection = document.querySelector('.your-section');
if (mySection) {
  var idx = 0;
  ['.your-kicker', '.your-title', '.your-lede'].forEach(function (sel) {
    wrapWords(mySection.querySelector(sel), function () { return idx++; });
  });
  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      mySection.classList.add('is-vcr-active');
    }
  }, { threshold: 0.15 }).observe(mySection);
}
```

Then in CSS, scope the reveal to your selector:

```css
body.v2-home .your-section.is-vcr-active .vcr-inner {
  transform: translateY(0);
  transition-delay: calc(var(--word-i, 0) * 70ms);
}
```

### 6. Custom cursor states

The cursor is global. To trigger a specific state on hover, add the matching selector to the `mouseover` handler in `index-v2.html`:

```js
if (t.closest('input, textarea'))             return setCursorState('text');
if (t.closest('.proj-card[data-href]'))       return setCursorState('card');
if (t.closest('a, button, [role="button"]'))  return setCursorState('hover');
```

States: `default`, `hover`, `text`, `card`, `image`. The `card` state is the "VIEW" label-in-pill that flips theme per `data-card-theme` on `body`.

### 7. 6-line vertical background

The shared chrome that runs through every dark v2 section.

```css
body.v2-home .your-section::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:    var(--bg-lines-image);
  background-position: var(--bg-lines-position);
  background-repeat:   no-repeat;
  background-size:     1px 100%;
}

/* For dark sections (white lines) */
body.v2-home .your-section { --bg-line-color: rgba(255, 255, 255, 0.40); }

/* For light sections (black lines) */
body.v2-home .your-section { --bg-line-color: rgba(0, 0, 0, 0.10); }
```

Note the section needs `position: relative` for `::before` to anchor.

---

## Migration checklist for a case study page

When porting a `cs-*.html` page to v2 styling, do these in order:

1. **Add `class="v2-home"` to `<body>`.** Activates all `body.v2-home` selectors. Layout-specific ones (e.g. `.proj-card`) won't fire if the markup isn't there.
2. **Sanity-check the page renders**. No broken layouts? Good.
3. **Swap legacy class typography**. For each section title / kicker / body block, either:
   - Apply the v2 selectors directly (use `.hiw-v2-kicker` recipe in your CSS), or
   - Rename the existing class to a v2-friendly name (rare).
4. **Replace heritage tokens**:
   - `font-family: var(--font-serif)` — already aliases to sans globally; can be removed entirely.
   - `background: var(--dark)` — already aliases to `#000`; nothing to do.
5. **Update CTAs**: replace `.cz-book-btn` or other legacy CTA classes with `.glass-cta` (or add it as a secondary class).
6. **Update interactive tiles**: add `.glass-tile` or just `.spotlight-glow` to cards so they pick up the hover halo.
7. **Visual QA**: scroll through the page; flag any leftover serif glyphs (they shouldn't exist after step 4) or off-black backgrounds (same).

---

## Quick CSS recipes (copy-paste)

### Standard dark section (HIW style)

```css
.your-sec {
  position: relative;
  background-color: #000;
  color: #fff;
  padding: calc(clamp(9.5rem, 15.5vh, 14.5rem) + 200px) 0;
  font-family: var(--font-sans);
  --bg-line-color: rgba(255, 255, 255, 0.40);
}
.your-sec::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:    var(--bg-lines-image);
  background-position: var(--bg-lines-position);
  background-repeat:   no-repeat;
  background-size:     1px 100%;
}
.your-sec-inner {
  position: relative;
  z-index: 1;
  max-width: 88rem;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 4rem);
}
```

### Standard light section (IMPACT style)

```css
.your-sec {
  position: relative;
  background-color: #fff;
  color: var(--ink);
  padding: calc(clamp(5rem, 9vh, 8rem) + 200px) 0;
  font-family: var(--font-sans);
  --bg-line-color: rgba(0, 0, 0, 0.10);
}
/* + same ::before vertical lines as above */
```

---

## Files to reference

| File | What |
|---|---|
| `tokens.css` | Global color/font/spacing tokens. |
| `styles.css` (line ~7250+) | All `body.v2-home`-scoped rules. |
| `index-v2.html` | v2 home — reference HTML structure for every component. |
| `COMPONENTS.txt` | v1 design-system doc (still authoritative for v1 case study pages). |
