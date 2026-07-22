# Reasoning Brief: NHÀ Bar underground UI prototype

## Goal

Rebuild public FE visual system into a balanced hiphop/underground/modern promo site for NHÀ Bar venue and events; fix logo fringe artifacts

## Constraints

- Keep Next.js app router and existing routes
- keep bronze brand color #C59D73
- no admin redesign
- Vietnamese+English brand copy from venue facts
- mobile-first 375-1280
- Display font must render Vietnamese (NHÀ, Sự kiện, Liên hệ)

## Non-Goals

- Admin CMS restyle
- payment/tickets
- replacing Nest API contracts
- inventing fake menu prices

## Evidence Required

- Clean logo PNG without checkerboard fringe on dark bg
- Home/Events/Contact/Promotions share one token system
- hero brand-first with logo+tagline+CTA
- vibe pillars Chillin/Music/Drinks
- npm run build -w @nhabar/web passes

## Quality Bar

Looks like a Da Nang underground bar promo site, not a generic SaaS dark theme; logo usable; pages feel intentional and balanced

## Monitoring Signals

- Logo edges look clean on #0A0A0A (true alpha, not baked black)
- first viewport has one composition
- section spacing 64-96px rhythm
- no leftover espresso-cream hospitality look
- horizontal overflow absent at 375 and 1280
- Vietnamese glyphs render (no tofu boxes on NHÀ / Sự kiện)

## Major Risks

- Overdoing neon purple (banned)
- logo auto-mask may eat thin strokes
- content still thin if copy blocks not added
- Bebas Neue / Impact fonts break Vietnamese → mitigated with Be Vietnam Pro

## Expected Deliverable

Processed logo assets + redesigned globals/components/pages for public FE

## Decision Surface

- Option A: Polish Espresso hospitality (Syne/Manrope, warm brown) — low cost, fails underground ask
- Option B: Underground street (black + bronze + signal red, poster type, ticker, denser promo copy) — matches venue+events promo
- Option C: Full neon nightlife (Ultraviolet Punch) — high “club” energy, fails anti-purple / generic AI look
- Recommended path: **B** → evolved to **B+ Kinetic 2026** (grain, oversized type, asymmetric events wall, GSAP)

## Pass 4 (soft-skill full-bleed)

- Variance: Ethereal Glass (bronze OLED) + Editorial Split
- Full-bleed hero (no side gutters), floating island nav, double-bezel
- Macro whitespace `stack-page` ~72–120px; nested CTA icons
- Ticker + dock remain inside hero bleed footer

## Pass 10 (chrome seam + clip)

- Navbar compact (island ~3.6rem); solid `#050505` chrome kills 2-tone bg seam
- Hero bleed: `overflow-y: visible` so địa chỉ / Chỉ đường not clipped between frames
- Base dock: ticker + facts as one `#050505` unit with hairline separator

## Pass 11 (editorial nav + chill vibe)

- Drop pill island nav → hairline sticky chrome; underline hover / active bronze
- Lang as text underline (not pill); mobile menu list rules + staggered appear
- `SmoothScroll` + `scroll-snap-type: y proximity` on sections; stronger GSAP Reveal timing
- Featured poster wash + scale hover; vibe tiles bronze rule (no 01/02/03); gallery hover

## Pass 12 (VN tracking + mobile chrome)

- Kill hover `letter-spacing` stretch (VN reflow / push); fixed locale tracking; 3-col rail grid
- Mobile: brand left / utilities right; borderless menu toggle; overlay kicker + venue meta
- Section heads: bronze lead-in rule for quieter taste

## Pass 13 (lang control + mobile drawer)

- Lang: segment control with bronze fill active (clear EN/VN), no slash underline
- Mobile menu: solid `#050505` full-viewport drawer; drop header `backdrop-filter` (was trapping fixed)
- Animate drawer via transform/visibility (not panel opacity); touch-safe hover for links

## Pass 14 (brand watermark + EN/VN/RU)

- Hero: large centered NHÀ logo watermark (`object-fit: contain`, soft blur/opacity) — brand recognition without crushing UI
- Locale switch: EN · VN · RU segment; full UI copy dictionary; dates/status badges follow locale
- RU uses Noto Sans (Cyrillic); brand wordmark stays Be Vietnam Pro

## Verification

- [x] Pass 4–9 build + vitest
- [x] Pass 10 build + vitest
- [x] Pass 11 build (clear `.next` if /500 Html prerender flake)
- [x] Pass 12 build + vitest
- [x] Pass 13 build + vitest
- [x] Pass 14 build + vitest

## Pass 15 (Retention Lite — dual persona)

- Home story arc denser: Featured night offers + Menu teaser + `/menu`
- Event↔Promotion join (public read); media atmospheric fallbacks (no empty black boxes)
- Motion: Premium chill — Reveal stagger menu/offers; hover gated to fine pointer
- Owner path ready for Next: Admin attach promo↔event; Menu CMS Later

## Pass 16 (native feel + brandkit vibe)

- Native chrome: bronze `::selection`, thin bronze scrollbar, no tap-highlight, `touch-action: manipulation`
- Press states everywhere (btn 0.97 / lang 0.94 / card 0.985); route-enter fade+rise via `app/template.tsx`
- Header elevates on scroll (`is-scrolled`); brand logo hover glow; upcoming badge pulse dot
- Event card = stretched link (one tap target); menu teaser tiles link to `/menu`
- Brand kit board generated (bronze/OLED/ivory/crimson) as visual north star

## Pass 17 (redesign polish — data-rich, clean source)

- Mock data thật hơn: menu 16 món giá VND (32k–150k) + `signature` flag; mọi mock event có lineup/media đầy đủ
- Data highlight: date-block chip trên poster; `event-facts` dl (when/where/host); dotted price leaders; superscript counts; `tabular-nums`
- Menu board: category cards 2-col ≥900px, index 01–04, item-count chip, house-pick row highlight
- Footer thêm nav column; VibeStrip tile index; `text-wrap: balance/pretty`
- Admin restyle: dashboard stats/cards, menu CMS table + pill toggles + modal (bỏ inline-style soup, thêm CSS classes)
- Cleanup: xóa logo PNG/SVG không dùng, 4 orphan components, CSS classes chết

## Pass 18 (home density + visual balance + media library)

- Fix poster SVG không render qua `next/image`: `contentDispositionType` "attachment" → "inline"
- Fix PromoCard lặp tiêu đề: typographic poster chỉ khi **không có** banner; mock promo `bannerUrl: null`
- Home **8 section locked**: hero → vibe → featured → upcoming → menu → promo → gallery → quotes → CTA
- Visual balance: section title scale xuống `1.55–2.25rem`; stack gap chặt hơn; vibe tile bỏ min-height rỗng
- Cards: `aspect-ratio` + `Image fill` (hết alt text bleed “Poster …”); quotes 3-col equal
- Media library scaffold: `public/uploads/{gallery,posters,promos,venue}` + `docs/17_Media_Library.md`

## Pass 19 (creative interaction + section framing)

- Fix home section framing: `.home-upcoming` / `.home-quotes` missing grid gap (text “dính”); force left-aligned `section-head` + `section-head__copy` (no accidental center)
- Upcoming → `AutoRail` snap carousel with intentional auto-advance (pause on hover/focus)
- Gallery → `MarqueeGallery` endless bronze-mask drift + 6 atmospheric SVGs in `public/uploads/gallery/`
- Menu teaser → asymmetric lead tile (not equal 3-up center)
- Reveal modes: `rise` / `clip` / `slide` + bronze title highlight sweep on `.is-revealed`
- Route enter: slightly longer + soft blur settle; PageHero / Events heads share slide language

## Pass 20 (anti-generic art direction from screenshots)

- **Layout bug:** `section-head::before` was a flex child → title optically centered between accent + link; now `position: absolute`
- **Empty voids:** live API events/promos without art → `media-fallback` fills posters/promo SVGs (no black holes)
- Drop nested **bezel** on event/promo cards → single editorial frame
- Promo posters fill media plane; quotes = pull-quote + stack (not identical 3-up)
- Event detail: remove duplicate “Ưu đãi đêm này” label (`hideLabel`)
- Menu lead denser (4 items); promo bento slightly asymmetric

## Pass 21 (logo DNA — lounge stamp)

- Creative archetype: **Cinematic lounge** from logo (house+glass mark, stamped bronze `#c19a6b`, broken geometric type)
- Global: film grain overlay, sharper architectural radii (drop SaaS pills), warmer OLED wash
- Hero: logo mark + stacked NHÀ/BAR wordmark + single lounge panel (retire 3-card bezel stack)
- Chrome: stamp CTAs, status badges, nav wordmark BAR in bronze; cards use stamped bronze inset

## Pass 22 (hero rebalance — mid-viewport)

- Root cause of “nghiêng đáy”: `.hero__stage--lounge { align-items: end }` + heavy base + tall panel
- Desktop: 50/50 columns, `align-items: center`, panel height capped; copy gaps tightened
- Mobile: smaller title/mark, shorter 16:9 panel, tighter rhythm so CTA isn’t crushed
- Base compact (A): thinner ticker/facts; hours live in status tag only (no duplicate)

## Verification (Pass 15–22)

- [x] Pass 15–21 build + vitest
- [x] Pass 22 tests; hard-refresh `/` mobile + desktop
