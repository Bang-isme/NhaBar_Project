# Media library — NHÀ Bar

Thư mục lưu ảnh phục vụ website. Admin upload (Later) sẽ ghi vào đây; hiện tại dùng cho asset tĩnh và placeholder.

## Cấu trúc

```text
public/uploads/
├── gallery/     # Không khí quán (home gallery, event media)
├── posters/     # Poster sự kiện (featured, event cards)
├── promos/      # Banner ưu đãi
└── venue/       # Ảnh địa điểm / exterior / map crop
```

Asset prototype hiện dùng:
- `/public/gallery/` — SVG atmosphere (mock)
- `/public/posters/` — SVG event posters (mock)

Khi có ảnh thật: đặt file vào `uploads/...` rồi cập nhật URL trong CMS / seed / mock (`/uploads/gallery/night-01.jpg`).

## Quy ước đặt tên

| Loại | Pattern | Ví dụ |
| --- | --- | --- |
| Gallery | `yyyy-mm-theme-##.jpg` | `2026-08-late-01.jpg` |
| Poster | `slug.jpg` | `nha-late-session-aug.jpg` |
| Promo | `promo-short-id.jpg` | `buy2get1-watch.jpg` |
| Venue | `venue-##.jpg` | `venue-facade-01.jpg` |

## Spec kỹ thuật

- Format ưu tiên: `.webp` hoặc `.jpg` (poster/gallery), `.png` nếu cần alpha (logo đã ở `/public/logo-nha-bar-clean.png`)
- Poster: tỉ lệ ~ **4:5** (vd. 800×1000)
- Gallery / promo banner: ~ **3:2** hoặc **16:10** (vd. 1200×800)
- Max ~ 1.5 MB / file trước khi optimize
- Không commit ảnh thô chưa nén nếu > 2 MB

## Quyền & an toàn (Later — Admin upload)

- Chỉ role admin được ghi
- Validate MIME + kích thước server-side
- Không cho SVG upload từ user (XSS)
- Serve qua `/uploads/...` dưới `public` hoặc object storage (S3) + CDN

## Liên quan

- Wireframe: `docs/16_Hub_Atmosphere_Wireframe.md`
- Seed / mock URLs: `apps/web/lib/mock-data.ts`
