# (17) Media Library — Image storage & management

| Field | Value |
| --- | --- |
| Product | NHÀ Bar Official Website |
| Date | 2026-07-21 |
| Status | Scaffold Now · Admin upload Later |
| Path | `apps/web/public/uploads/` |

## Folders

| Folder | Purpose |
| --- | --- |
| `uploads/gallery/` | Atmosphere shots (Home gallery, event media) |
| `uploads/posters/` | Event posters |
| `uploads/promos/` | Promotion banners |
| `uploads/venue/` | Address / facade / interior stills |

Mock SVG prototypes remain in `public/gallery/` and `public/posters/` until real photos land.

**Seeded illustrations (Pass 19):** `uploads/gallery/{warm-lights,late-crowd,bar-top,pour-night,door-mark,floor-glow}.svg` + `uploads/venue/ngo-thi-si.svg` — wire Home marquee + event media until photography replaces them.

## Owner workflow (Later)

1. Admin uploads image → stored under matching folder (or object storage).
2. CMS attaches URL to Event / Promotion / Gallery row.
3. Public FE reads URL; empty media uses brand atmospheric fallback (no ghost box).

See `public/uploads/README.md` for naming and size conventions.
