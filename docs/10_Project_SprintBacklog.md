# (10) Project Sprint Backlog — Website NHÀ Bar

| Trường | Giá trị |
| --- | --- |
| Dự án | Website NHÀ Bar |
| Số sprint | 3 |
| Độ dài | ~2 tuần / sprint |
| Phiên bản | 1.0 |
| Ngày | 2026-07-20 |

## 1. Mục đích

Phân bổ PBI vào từng sprint với mục tiêu, capacity, task cụ thể và Definition of Done — để nhóm triển khai sau phase tài liệu.

## 2. Capacity giả định

| Vai trò | SP / sprint (ước lượng) |
| --- | --- |
| FE | 13–16 |
| BE | 13–16 |
| QA kiêm | 5 (test + bug verify) |
| **Team** | **~34–40 SP** |

Điều chỉnh theo số thành viên thật `[Điền sau]`.

## 3. Sprint 1 — Nền tảng, Home, Contact, Brand

**Sprint Goal:** Khách mở được site nhận ra NHÀ Bar, liên hệ được quán; UI dark + gold ổn định.

**AC mục tiêu:** AC-001, AC-007, AC-008, AC-009

| Task ID | PBI | Task | Owner | SP | Status |
| --- | --- | --- | --- | --- | --- |
| S1-T01 | — | Scaffold monorepo Next + Nest + Prisma (+ SQLite local) | BE | 5 | Done |
| S1-T02 | PBI-01 | Implement CSS variables / design tokens | FE | 3 | Done |
| S1-T03 | PBI-02 | Home hero brand + CTA + featured placeholder/API | FE | 8 | Done |
| S1-T04 | PBI-03 | Responsive shell nav 375–1280 | FE | 5 | Done |
| S1-T05 | PBI-04 | Contact page: address, hours, map, Facebook | FE | 5 | Done |
| S1-T06 | — | Seed venue constants + health endpoint | BE | 2 | Done |
| S1-T07 | — | Chạy TC-001,002,007,008,017,018,019,020 | QA | 3 | Done |

**DoD Sprint 1**

- `/` và `/contact` demo được trên mobile.
- Tokens đúng checklist UI.
- TC Sprint 1 Must không Fail P0.

## 4. Sprint 2 — Events public + Admin CRUD + Lineup

**Sprint Goal:** Khách xem lịch & lineup; admin đăng nhập, publish/ẩn sự kiện, gắn nghệ sĩ.

**AC mục tiêu:** AC-002, AC-003, AC-004, AC-005

| Task ID | PBI | Task | Owner | SP | Status |
| --- | --- | --- | --- | --- | --- |
| S2-T01 | PBI-07 | Auth login JWT + guard admin | BE | 5 | Done |
| S2-T02 | PBI-05 | API GET events upcoming + FE list | BE/FE | 8 | Done |
| S2-T03 | PBI-06 | API GET event by slug + FE detail | BE/FE | 8 | Done |
| S2-T04 | PBI-08 | Admin CRUD event (create/edit/hide) | BE/FE | 8 | Done |
| S2-T05 | PBI-09 | Artists CRUD + lineup roles/sortOrder | BE/FE | 8 | Done |
| S2-T06 | — | Seed JUMP OUT DA HOUSE + artists | BE | 2 | Done |
| S2-T07 | — | Chạy TC-003…006, TC-010…014 | QA | 5 | Done |

**DoD Sprint 2**

- Public list/detail đúng filter published.
- Admin ẩn event → biến mất public.
- Lineup hiện role trên detail.
- Không P0 mở liên quan auth/events.

## 5. Sprint 3 — Promo, Gallery, Polish, Regression

**Sprint Goal:** Promo active + gallery; polish hiệu năng/UI; regression toàn bộ AC Must.

**AC mục tiêu:** AC-006, AC-010 (+ regression AC-001…009)

| Task ID | PBI | Task | Owner | SP | Status |
| --- | --- | --- | --- | --- | --- |
| S3-T01 | PBI-10, PBI-11 | Promo public + admin CRUD | BE/FE | 8 | Partial (public Done; admin CRUD Todo) |
| S3-T02 | PBI-12, PBI-13 | Media upload + gallery trên detail | BE/FE | 8 | Partial (gallery read Done; upload Todo) |
| S3-T03 | PBI-14 | Image optimize / lazy load Home | FE | 3 | Todo |
| S3-T04 | — | UI polish theo brand test | FE | 3 | Done |
| S3-T05 | — | Full regression TC-001…022 | QA | 5 | In Progress |
| S3-T06 | — | Cập nhật docs + Reflection kết quả demo | All | 2 | In Progress |
| S3-T07 | — | Demo PO / GVHD theo AC | PO | 1 | Todo |

**DoD Sprint 3 / Release MVP**

- AC-006, AC-010 Pass (hoặc P1 được PO chấp nhận có văn bản).
- Regression Must không P0.
- `_traceability.md` và Test Case Result đã cập nhật.
- Reflection ghi bài học.

## 6. Burndown / theo dõi (mẫu)

Mỗi ngày standup cập nhật cột Status: `Todo` → `In Progress` → `Done`.

| Sprint | SP kế hoạch | SP Done | Ghi chú |
| --- | --- | --- | --- |
| 1 | ~31 | ~31 | Done 2026-07-20 — SQLite local fallback |
| 2 | ~44 | ~44 | Admin JWT + CRUD + public events Done |
| 3 | ~30 | ~8 | Promo+gallery public ship sớm; admin promo/upload còn |

*SP Sprint 2 cao hơn capacity → Planning phải cắt hoặc kéo task sang buffer; ưu tiên giữ AC-002…005.*

## 7. Impediment log (mẫu trống)

| ID | Mô tả | Impact | Owner | Trạng thái |
| --- | --- | --- | --- | --- |
| — | — | — | — | — |

## 8. Tham chiếu

- Product Backlog: [`03_ProductBacklog.md`](03_ProductBacklog.md)
- Project Plan: [`02_ProjectPlan.md`](02_ProjectPlan.md)
- Test Case: [`09_Project_TestCase.md`](09_Project_TestCase.md)
