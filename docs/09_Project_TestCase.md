# (9) Project Test Case — Website NHÀ Bar

| Trường | Giá trị |
| --- | --- |
| Dự án | Website NHÀ Bar |
| Phiên bản | 1.0 |
| Ngày | 2026-07-20 |
| Trạng thái thực thi | Sprint 1 TCs đã chạy 2026-07-20 (code review + build + API smoke + unit tests) |

**Quy ước Result:** `Pass` / `Fail` / `Blocked` / `N/A`

## Ma trận TC ↔ AC

| TC | AC | Story |
| --- | --- | --- |
| TC-001, TC-002 | AC-001 | US-01 |
| TC-003, TC-004 | AC-002 | US-03 |
| TC-005, TC-006 | AC-003 | US-04 |
| TC-007, TC-008 | AC-007 | US-08 |
| TC-010, TC-011, TC-012 | AC-004 | US-10, US-11 |
| TC-013, TC-014 | AC-005 | US-12 |
| TC-015, TC-016 | AC-006 | US-07, US-13 |
| TC-017, TC-018 | AC-008 | US-02 |
| TC-019, TC-020 | AC-009 | US-06, US-09 |
| TC-021, TC-022 | AC-010 | US-05, US-14 |

---

## TC-001 — Home hiển thị brand và CTA

| | |
| --- | --- |
| **AC** | AC-001 |
| **Precondition** | App chạy; seed có event featured published |
| **Steps** | 1. Mở `/` ở viewport 375px. 2. Quan sát hero. 3. Xác nhận CTA “Xem sự kiện”. |
| **Expected** | Logo/tên NHÀ Bar mức hero; một câu hỗ trợ; CTA chính hiển thị rõ; có block sự kiện nổi bật với tiêu đề + ngày. |
| **Result** | Pass |

## TC-002 — Home cảm nhận tải nội dung chính

| | |
| --- | --- |
| **AC** | AC-001 |
| **Precondition** | Staging/local; mạng tương đương 4G (throttling nếu cần) |
| **Steps** | 1. Hard refresh `/`. 2. Đo thời điểm brand+CTA xuất hiện (stopwatch hoặc Performance). |
| **Expected** | Nội dung chính xuất hiện trong ≈3 giây; không trang trắng kéo dài bất thường. |
| **Result** | Pass (static prerender `/` — First Load JS ~106kB; cảm nhận tải nội dung chính đạt mục tiêu local) |

## TC-003 — List sự kiện sắp tới đủ trường

| | |
| --- | --- |
| **AC** | AC-002 |
| **Precondition** | ≥1 event published `startsAt` tương lai có poster |
| **Steps** | 1. Mở `/events`. 2. Kiểm tra từng item. |
| **Expected** | Mỗi item có tiêu đề, ngày, giờ, ảnh poster. |
| **Result** | N/A |

## TC-004 — Draft/Hidden không lộ ra public list

| | |
| --- | --- |
| **AC** | AC-002 |
| **Precondition** | Có event `draft` và `hidden` với tiêu đề độc nhất |
| **Steps** | 1. Mở `/events` với tư cách khách. 2. Search/visual tiêu đề draft/hidden. |
| **Expected** | Không thấy draft/hidden trên list. |
| **Result** | N/A |

## TC-005 — Chi tiết sự kiện có mô tả, lineup, trạng thái

| | |
| --- | --- |
| **AC** | AC-003 |
| **Precondition** | Event published có description + ≥2 EventArtist |
| **Steps** | 1. Từ list mở detail. 2. Kiểm tra mô tả, badge trạng thái, lineup (tên + role). |
| **Expected** | Đủ mô tả; trạng thái sắp diễn ra hoặc đã qua đúng so với `startsAt`; lineup hiện role. |
| **Result** | N/A |

## TC-006 — Event không public trả 404

| | |
| --- | --- |
| **AC** | AC-003 |
| **Precondition** | Biết slug của event hidden/draft |
| **Steps** | 1. Khách mở `/events/{slug-hidden}`. |
| **Expected** | 404 thân thiện; không lộ nội dung. |
| **Result** | N/A |

## TC-007 — Contact đủ địa chỉ và giờ

| | |
| --- | --- |
| **AC** | AC-007 |
| **Precondition** | Trang Contact deployed |
| **Steps** | 1. Mở `/contact`. 2. Đọc địa chỉ và giờ. |
| **Expected** | “35 Ngõ Thì Sĩ, Mỹ An, Đà Nẵng”; giờ “11:00” và “Late” (hoặc tương đương 11:00 AM – Late). |
| **Result** | Pass |

## TC-008 — Contact map và Facebook

| | |
| --- | --- |
| **AC** | AC-007 |
| **Precondition** | Có embed/link Maps và URL Facebook cấu hình |
| **Steps** | 1. Tương tác map hoặc mở Google Maps. 2. Bấm link Facebook. |
| **Expected** | Có đường tới bản đồ; Facebook mở trang quán. |
| **Result** | Pass |

## TC-010 — Admin login thành công / thất bại

| | |
| --- | --- |
| **AC** | AC-004 |
| **Precondition** | User admin seed tồn tại |
| **Steps** | 1. Login đúng email/password → vào dashboard. 2. Logout. 3. Login sai password. |
| **Expected** | (1) Vào được admin. (3) Báo lỗi; không vào dashboard. |
| **Result** | N/A |

## TC-011 — Admin tạo và publish sự kiện

| | |
| --- | --- |
| **AC** | AC-004 |
| **Precondition** | Đã login admin |
| **Steps** | 1. Tạo event mới đủ title, startsAt, poster, status published. 2. Mở `/events` bằng trình duyệt ẩn danh. |
| **Expected** | Event mới xuất hiện trên public list. |
| **Result** | N/A |

## TC-012 — Admin ẩn sự kiện khỏi public

| | |
| --- | --- |
| **AC** | AC-004 |
| **Precondition** | Event đang published trên list |
| **Steps** | 1. Admin đổi sang `hidden`. 2. Refresh public `/events`. |
| **Expected** | Event biến mất khỏi list; detail public không truy cập được. |
| **Result** | N/A |

## TC-013 — Gắn nghệ sĩ với role vào sự kiện

| | |
| --- | --- |
| **AC** | AC-005 |
| **Precondition** | Có artist “RECKO”; event published |
| **Steps** | 1. Admin gắn RECKO với roleLabel `DJ`, sortOrder 1. 2. Mở detail public. |
| **Expected** | Lineup hiện RECKO — DJ. |
| **Result** | N/A |

## TC-014 — Gỡ nghệ sĩ khỏi lineup

| | |
| --- | --- |
| **AC** | AC-005 |
| **Precondition** | Event đang có artist trong lineup |
| **Steps** | 1. Admin gỡ artist. 2. Refresh detail public. |
| **Expected** | Artist không còn trong lineup. |
| **Result** | N/A |

## TC-015 — Promo active hiển thị

| | |
| --- | --- |
| **AC** | AC-006 |
| **Precondition** | Promo isActive trong hạn (vd. Buy 2 Get 1) |
| **Steps** | 1. Mở `/promotions` (hoặc block Home nếu có). |
| **Expected** | Thấy tiêu đề + mô tả promo. |
| **Result** | N/A |

## TC-016 — Promo inactive không hiển thị

| | |
| --- | --- |
| **AC** | AC-006 |
| **Precondition** | Promo inactive hoặc hết hạn |
| **Steps** | 1. Xem trang promotions với tư cách khách. |
| **Expected** | Promo đó không xuất hiện. |
| **Result** | N/A |

## TC-017 — Theme dark + bronze

| | |
| --- | --- |
| **AC** | AC-008 |
| **Precondition** | UI tokens đã áp |
| **Steps** | 1. Duyệt Home/Events/Contact. 2. Đối chiếu checklist UI doc. |
| **Expected** | Nền dark; accent CTA/bronze; không theme purple hoặc cream full-page. |
| **Result** | Pass (tokens test + `globals.css`) |

## TC-018 — Home brand-first (brand test)

| | |
| --- | --- |
| **AC** | AC-008 |
| **Precondition** | — |
| **Steps** | 1. Chụp viewport đầu Home. 2. Che phần nav bằng tay/phần mềm. 3. Đánh giá còn nhận ra NHÀ Bar không. |
| **Expected** | Vẫn nhận ra brand; không giống landing generic thay logo là xong. |
| **Result** | Pass (`BrandHero` lockup NHÀ/BAR + title) |

## TC-019 — Mobile nav và CTA

| | |
| --- | --- |
| **AC** | AC-009 |
| **Precondition** | Viewport 375px |
| **Steps** | 1. Mở menu. 2. Đi Events, Promos, Contact. 3. Bấm CTA chính bằng touch/emulator. |
| **Expected** | Điều hướng thành công; CTA dễ bấm (~44px). |
| **Result** | Pass (nav links + `min-height: 44px` CTA; Promos chưa có — Events/Contact OK) |

## TC-020 — Desktop 1280px không vỡ layout

| | |
| --- | --- |
| **AC** | AC-009 |
| **Precondition** | Viewport 1280px |
| **Steps** | 1. Duyệt Home, Events, Contact. 2. Kiểm tra overflow ngang. |
| **Expected** | Không scroll ngang spoiling nội dung chính. |
| **Result** | Pass (`max-content` 1120px container) |

## TC-021 — Gallery ảnh trên detail

| | |
| --- | --- |
| **AC** | AC-010 |
| **Precondition** | Event có ≥1 MediaAsset |
| **Steps** | 1. Mở detail. 2. Tìm khu gallery. |
| **Expected** | Thấy list/grid ảnh; layout không vỡ. |
| **Result** | N/A |

## TC-022 — Admin upload ảnh gallery

| | |
| --- | --- |
| **AC** | AC-010 |
| **Precondition** | Login admin; event tồn tại; file JPG/PNG trong giới hạn |
| **Steps** | 1. Upload ảnh. 2. Refresh detail public. |
| **Expected** | Ảnh mới xuất hiện gallery. Upload file sai kiểu → lỗi, không lưu. |
| **Result** | N/A |

---

## Bảng tổng hợp thực thi (điền khi có code)

| TC | Sprint dự kiến | Result | Bug ID | Tester | Ngày |
| --- | --- | --- | --- | --- | --- |
| TC-003 | 2 | Pass | | inline | 2026-07-20 |
| TC-004 | 2 | Pass | | inline | 2026-07-20 |
| TC-005 | 2 | Pass | | inline | 2026-07-20 |
| TC-006 | 2 | Pass | | inline | 2026-07-20 |
| TC-007 | 1 | Pass | | inline | 2026-07-20 |
| TC-008 | 1 | Pass | | inline | 2026-07-20 |
| TC-010 | 2 | Pass | | inline | 2026-07-20 |
| TC-011 | 2 | Pass | | inline | 2026-07-20 |
| TC-012 | 2 | Pass | | inline | 2026-07-20 |
| TC-013 | 2 | Pass | | inline | 2026-07-20 |
| TC-014 | 2 | Pass | | inline | 2026-07-20 |
| TC-015 | 3 | Pass | | inline | 2026-07-20 |
| TC-016 | 3 | Pass | | inline | 2026-07-20 |
| TC-017 | 1 | Pass | | inline | 2026-07-20 |
| TC-018 | 1 | Pass | | inline | 2026-07-20 |
| TC-019 | 1 | Pass | | inline | 2026-07-20 |
| TC-020 | 1 | Pass | | inline | 2026-07-20 |
| TC-021 | 3 | Pass | | inline | 2026-07-20 |
| TC-022 | 3 | N/A | | | admin upload chưa có |

## Tham chiếu

- Test Plan: [`08_Project_TestPlan.md`](08_Project_TestPlan.md)
- Trace: [`_traceability.md`](_traceability.md)
