# Design System: NHÀ Bar

> Single source of truth for Google Stitch + Cursor FE agents.
> Brand: underground café/bar · Mỹ An, Đà Nẵng · bronze stamp on OLED charcoal.
> Goal: every public screen feels **modern, responsive, and compositionally distinct** — same DNA, different panels.

## 1. Visual Theme & Atmosphere

A cinematic lounge interface — warm bronze stamped onto near-black charcoal, film grain in the air, architectural frames instead of soft SaaS cards. The room feels intimate and intentional: like a well-lit speakeasy door mark, not a nightlife neon club and not a cream hospitality brochure.

- **Density:** 5 — Daily App Balanced with gallery breathing room between sections
- **Variance:** 8 — Offset Asymmetric layouts; each route owns a unique panel grammar
- **Motion:** 7 — Fluid spring choreography on enter; perpetual micro-loops only on living rails (ticker, marquee, auto-rail)

Philosophy: **one job per section**, **one primary CTA per viewport**, brand-first heroes, no filler chrome. Panels are smart frames (stamp edge, hairline, wash) — never nested card-in-card stacks.

## 2. Color Palette & Roles

- **OLED Charcoal** (`#050505`) — Primary canvas / body background
- **Deep Lounge** (`#0a0908`) — Recessed wells, hero stage depth
- **Elevated Ember** (`#100e0c`) — Raised panel fill, sticky chrome
- **Wash Smoke** (`#161310`) — Soft inset wash / secondary surface
- **Ivory Signal** (`#f3ebe0`) — Primary text, wordmarks
- **Sand Secondary** (`#c8b9a6`) — Supporting copy, list body
- **Muted Ash** (`#95897a`) — Meta, captions, quiet leads
- **Hairline Mist** (`rgba(243, 235, 224, 0.07)`) — Structural 1px rules
- **Lounge Bronze** (`#c19a6b`) — **Single accent** for CTAs, active nav, focus, stamp edges (saturation < 80%)
- **Bronze Hover** (`#d4b088`) — Primary button / link hover
- **Signal Crimson** (`#a33a3a`) — Rare urgency only (live status, danger) — not a second brand accent
- **Bronze Glow** (`rgba(193, 154, 107, 0.22)`) — Soft radial atmosphere only; never neon outer glow on buttons

**Banned colors:** pure black `#000000`, purple/indigo neon, cool blue SaaS accents, warm cream `#F4F1EA` hospitality washes.

## 3. Typography Rules

- **Display:** Be Vietnam Pro (700–900) — Track-tight (`letter-spacing: -0.02em to -0.04em`), uppercase for brand/section stamps, Vietnamese-safe. Hierarchy via weight + bronze color, not screaming size alone.
- **Chrome / EN UI:** Outfit (400–700) — Nav, locale, English meta labels.
- **Body:** Work Sans (400–700) — Relaxed leading `1.55–1.65`, max ~65ch for readable leads.
- **Cyrillic:** Noto Sans when `locale=ru`.
- **Mono:** JetBrains Mono or Geist Mono — timestamps, menu prices, event counts only.
- **Banned:** Inter, Roboto, Arial, system-ui as hero voice. Generic serifs (`Georgia`, `Times`, `Garamond`) banned in UI chrome. No gradient fill text on large headers.

Scale anchors:
- Hero brand stack: `clamp(2.4rem, 8vw, 5.5rem)`
- Page H1: `clamp(2.4rem, 7vw, 4.2rem)`
- Section H2: `clamp(1.55rem, 3.2vw, 2.15rem)`
- Body: `clamp(1.05rem, 0.98rem + 0.35vw, 1.2rem)` — never below `1rem` / 16px equivalent

## 4. Component Stylings

### Buttons
- Primary: Lounge Bronze fill, Ivory text, radius `0.45rem`, tactile `translateY(1px)` on active. No outer neon glow.
- Ghost: hairline bronze border, transparent fill, bronze text → soft bronze wash on hover.
- Max **one** primary CTA in a hero/viewport. Secondary is ghost only — never dual filled buttons.

### Smart Panels (not generic cards)
Use panels only when elevation communicates hierarchy:
- **Stamp Panel** — 1px bronze-tint border (`--border-subtle`), inset hairline, radial bronze wash at corner, radius `0.45–0.65rem`
- **Ledger Panel** — top index number + hairline rules; used on Menu
- **Ticket Panel** — dashed/perforated edge cue + kicker; used on Promotions
- **Wayfind Panel** — map-dominant frame with grayscale map grade; used on Contact
- **Poster Panel** — media-led with wash gradient; used on Events / Event Detail
- High-density lists replace cards with border-top dividers and negative space

### Inputs / Forms (admin + contact patterns)
- Label above, helper optional, error below
- Focus ring: 2px Lounge Bronze
- No floating labels, no purple focus rings

### Loaders
- Skeletal shimmer matching layout slabs (hero strip, card frame, menu rows)
- No generic circular spinners on public FE

### Empty States
- Composed stamp panel with short copy + one CTA (Facebook / Contact) — never “No data”

## 5. Layout Principles

- Contain content at `--max-content: 1380px` with `--pad-inline: clamp(1.25rem, 5vw, 3.5rem)`
- Section rhythm: `stack-page` gaps `clamp(4rem, 10vw, 7.5rem)`
- CSS Grid first; no `calc()` percentage flex hacks
- Full-height stages use `min-height: 100dvh` — never `h-screen`
- No overlapping text/media; every element owns a clean spatial zone
- Centered heroes **banned** on marketing inner pages (variance 8) — use split / stamp / ledger / wayfind
- Banned: equal 3-column feature card rows as the default composition

### Screen Recipes (mandatory differentiation)

| Screen | Composition DNA | Hero | Panel grammar |
|--------|------------------|------|---------------|
| **Home** | Full-bleed lounge stage → editorial sections | Brand-first 50/50 mid-horizon; logo + NHÀ/BAR stack + one lounge panel | Auto-rail nights, asymmetric menu teaser, editorial quote pull + stack, stamp CTA band |
| **Events** | Magazine poster wall | `page-hero--events` split; aside = vertical stamp meta | Lead event spans 8/12; satellites 4/12; archive denser |
| **Event Detail** | Cinematic poster dossier | No PageHero — poster column + facts column | Facts as definition list; offer strip without duplicate labels |
| **Menu** | Printed board / ledger | `page-hero--menu` oversized title; aside = “board note” | Category index `01/02`; leader-dot price rows; 2-col board ≥900px |
| **Promotions** | Ticket / stamp bento | `page-hero--promos` ticket aside (hours as stub) | Lead promo wide; stamp frames; never identical equal cards |
| **Contact** | Wayfinding split | `page-hero--contact` address-forward | Map-dominant grid; slim fact rail; bottom CTA band |

Home section order (locked): Hero → Vibe → Featured → Upcoming → Menu → Promos → Gallery → Quotes → CTA.

## 6. Responsive Rules

- **Mobile-first (< 768px):** all multi-column grids → single column; no horizontal page scroll
- **Touch targets:** ≥ 44px
- **Typography:** headlines via `clamp()`; body ≥ 1rem
- **Images / inline marks:** stack below headline copy on small screens
- **Nav:** desktop horizontal → solid full-viewport drawer on mobile
- **Section gaps:** reduce with `clamp(3rem, 8vw, 6rem)`
- Breakpoints in use: `640px` (2-up), `900px` (editorial splits), `1024px+` (wide magazine)

## 7. Motion & Interaction

- Spring feel: CSS `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` / `--ease-fluid: cubic-bezier(0.32, 0.72, 0, 1)` approximating stiffness ~100, damping ~20
- Reveal modes: `rise` | `clip` | `slide` — stagger lists `0.05–0.08s` cascade
- Animate **only** `transform` + `opacity`
- Perpetual loops: KineticTicker, MarqueeGallery, AutoRail — pause on `prefers-reduced-motion`
- No bouncing chevrons, no “Scroll to explore”, no custom cursors

## 8. Anti-Patterns (Banned)

- No emojis in UI chrome
- No Inter / Roboto / generic system display
- No pure black `#000000`
- No purple/blue neon glows or outer glow button shadows
- No oversized gradient headline text
- No custom mouse cursors
- No overlapping text on hero media (no floating promo stickers)
- No default equal 3-card feature rows
- No generic placeholder names (“John Doe”, “Acme”)
- No fake round metrics (`99.99%`, `50% OFF` without real promo data)
- No AI copy clichés: Elevate, Seamless, Unleash, Next-Gen, Discover more
- No filler UI: “Scroll to explore”, “Swipe down”, bouncing arrows
- No nested bezel-in-bezel / card-in-card
- No cream hospitality / purple SaaS dark themes
- Admin may stay denser; **do not** force lounge marketing chrome into admin cockpit

## 9. Stitch Prompt Helpers

When generating a new screen in Stitch, prepend:

> Follow DESIGN.md for NHÀ Bar. OLED Charcoal `#050505` + Lounge Bronze `#c19a6b`. Be Vietnam Pro display. Variance 8 asymmetric. Use the screen recipe for [Home|Events|Menu|Promotions|Contact]. One primary CTA. No Inter, no purple neon, no equal 3-card rows, no scroll-to-explore.

Export tokens as CSS variables matching `:root` in `apps/web/app/globals.css`.
