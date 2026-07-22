# Bảng truy vết Acceptance Criteria — NHÀ Bar

**Mục đích:** Một nguồn sự thật cho mọi AC. Đổi AC tại đây trước, rồi sync các tài liệu liên quan.

**Cập nhật lần cuối:** 2026-07-20

## Trạng thái triển khai

| ID | Trạng thái code | Ghi chú |
| --- | --- | --- |
| AC-001 | Done | Home brand + CTA + featured |
| AC-002 | Done | `/events` list + posters (public sớm hơn Sprint 2 gốc) |
| AC-003 | Done | Detail + lineup + status |
| AC-004 | Done | Admin JWT + CRUD event |
| AC-005 | Done | Lineup roles admin |
| AC-006 | Done | `/promotions` + Home promo block |
| AC-007 | Done | Contact + map embed |
| AC-008 | Done | Espresso Ember + bronze logo |
| AC-009 | Done | Responsive + mobile nav |
| AC-010 | Done (public read) | Gallery trên detail; upload admin = TC-022 còn mở |
| AC-011 | Done | Menu teaser Home + `/menu` (static Now) |
| AC-012 | Done (public read) | Event night offers via EventPromotion; Admin attach = Later |

## Danh sách AC

| ID | Mô tả | Ưu tiên | Sprint mục tiêu |
| --- | --- | --- | --- |
| AC-001 | Khách xem trang chủ mobile-first; nội dung chính: brand, 1 CTA, sự kiện nổi bật; cảm nhận tải nhanh (mục tiêu ≤3s trên mạng thường) | Must | Sprint 1 |
| AC-002 | Khách xem danh sách sự kiện sắp tới: ngày, giờ, tiêu đề, ảnh poster | Must | Sprint 2 |
| AC-003 | Khách mở chi tiết sự kiện: mô tả, lineup nghệ sĩ, trạng thái (sắp diễn ra / đã qua) | Must | Sprint 2 |
| AC-004 | Admin đăng nhập và tạo / sửa / ẩn sự kiện | Must | Sprint 2 |
| AC-005 | Admin gắn nghệ sĩ vào sự kiện với role (DJ, Rapper, Guest, …) | Must | Sprint 2 |
| AC-006 | Trang hiển thị promo đang active (ví dụ Buy 2 Get 1) | Must | Sprint 3 (ship sớm) |
| AC-007 | Trang Contact/Location: map + giờ 11:00–Late + link Facebook | Must | Sprint 1 |
| AC-008 | UI dark mode, accent bronze/gold, typography tối giản; tránh purple/cream generic | Must | Sprint 1–3 |
| AC-009 | Responsive 375px–1280px; nav + CTA dùng được trên mobile | Must | Sprint 1–3 |
| AC-010 | Gallery / ảnh sự kiện xem được (ít nhất list ảnh theo sự kiện) | Should | Sprint 3 (read sớm) |
| AC-011 | Home có Menu teaser (≥3 nhóm) + trang `/menu` + mục Menu trên nav | Must | Sprint 3 |
| AC-012 | Featured / list / detail hiện ưu đãi gắn event khi promo active trong cửa sổ ngày | Must | Sprint 3 |

## Trace: AC ↔ User Story ↔ Test Case ↔ Tài liệu

| AC | User Story | Test Case | Tài liệu chính |
| --- | --- | --- | --- |
| AC-001 | US-01, US-02 | TC-001, TC-002 | Proposal, UI, Sprint 1 |
| AC-002 | US-03 | TC-003, TC-004 | Backlog, UserStory, DB |
| AC-003 | US-04 | TC-005, TC-006 | UserStory, Architecture |
| AC-004 | US-10, US-11 | TC-010, TC-011, TC-012 | Architecture, Sprint 2 |
| AC-005 | US-12 | TC-013, TC-014 | DB, UserStory |
| AC-006 | US-07 | TC-015, TC-016 | Backlog, Sprint 3 |
| AC-007 | US-08 | TC-007, TC-008 | Proposal, UI |
| AC-008 | US-02, US-09 | TC-017, TC-018 | UI, Code Standard |
| AC-009 | US-09 | TC-019, TC-020 | UI, Test Plan |
| AC-010 | US-05 | TC-021, TC-022 | DB, Sprint 3 |
| AC-011 | US-15 | — | Wireframe 16, Backlog PBI-20 |
| AC-012 | US-16 | — | Wireframe 16, Backlog PBI-21 |

## Quy trình khi thay đổi

```text
Thay đổi yêu cầu/code
  → Cập nhật bảng AC ở file này
  → Sync 03 ProductBacklog + 04 UserStory + 09 TestCase
  → Nếu ảnh hưởng thiết kế: sync 05 / 06 / 07
  → Ghi quyết định vào 12 hoặc 13 / 14 Security
  → Đối chiếu lại cột Trace ở trên
```

## Version

| Phiên bản | Ngày | Ghi chú |
| --- | --- | --- |
| 1.0 | 2026-07-20 | Khởi tạo 10 AC lõi cho MVP tài liệu |
| 1.1 | 2026-07-20 | Sync trạng thái public FE + security; admin in progress |
| 1.2 | 2026-07-21 | AC-011 Menu · AC-012 Event offers (Retention Lite) |
