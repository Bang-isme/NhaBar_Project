# (1) Project Proposal — Website NHÀ Bar

| Trường | Giá trị |
| --- | --- |
| Đề tài | Xây dựng website chính thức NHÀ Bar (Đà Nẵng) kèm quản lý sự kiện |
| Đơn vị | [Điền sau] |
| GVHD | [Điền sau] |
| Nhóm | [Điền sau] |
| Ngày | 2026-07-20 |
| Phiên bản | 1.0 |

## 1. Mục đích tài liệu

Tài liệu này giải thích **vì sao NHÀ Bar cần website**, website **làm gì**, **trông như thế nào**, và **quản lý sự kiện ra sao**, để người duyệt phê duyệt phạm vi MVP và acceptance criteria.

## 2. Hiện trạng

NHÀ Bar đang truyền thông chủ yếu qua Facebook:

- Cover/event poster (ví dụ *JUMP OUT DA HOUSE // RAPSHOW*) thông báo ngày giờ, lineup DJ/rapper.
- Thông tin quán: địa chỉ 35 Ngõ Thì Sĩ, Mỹ An, Đà Nẵng; giờ 11:00–Late; Café & Bar; mức giá $$.
- Brand: logo nhà + ly cocktail (đồng/vàng), vibe “A place called home”, đồng thời visual sự kiện mang tính urban/hip-hop (đen–đỏ–trắng, checkerboard).

**Hạn chế hiện trạng**

| Vấn đề | Tác động |
| --- | --- |
| Sự kiện cũ bị trôi feed | Khách khó tìm lại lịch sử / lineup |
| Không có trang “chính thức” tách khỏi MXH | Khách mới / khách du lịch thiếu điểm đến ổn định |
| Promo (World Cup, Buy 2 Get 1…) lẫn với post thường | Khó nổi bật ưu đãi đang active |
| Admin quản lý bằng đăng bài thủ công | Không có CRUD có cấu trúc (ngày, nghệ sĩ, trạng thái, ẩn/hiện) |

## 3. Đề xuất

Xây dựng **website hub** của NHÀ Bar (không thay Facebook) với hai mặt:

1. **Public:** Home, Events, Event Detail + lineup, Promotions, About/Contact (map, giờ, Facebook).
2. **Admin:** Đăng nhập, CRUD sự kiện, gắn nghệ sĩ theo role, quản lý promo và media.

### 3.1. Website quán bar cần làm rõ điều gì?

| Nhu cầu quán bar | Cách website đáp ứng |
| --- | --- |
| “Quán ở đâu, mở lúc nào?” | Contact + map + giờ cố định |
| “Tối nay / tuần này có gì?” | Danh sách sự kiện sắp tới + poster |
| “Ai biểu diễn?” | Chi tiết sự kiện + lineup có role |
| “Có ưu đãi không?” | Promo đang active |
| “Không khí quán thế nào?” | Brand dark + gold + gallery sự kiện |
| “Chủ quán cập nhật nhanh?” | Admin CRUD không phụ thuộc thuật toán feed |

### 3.2. Website trông như thế nào?

- **Nền:** dark (gần đen), không gian “đêm quán bar”.
- **Accent:** bronze / muted gold theo logo; đỏ/trắng dùng có kiểm soát cho poster sự kiện.
- **Typography:** sans-serif mỏng, tối giản; tên thương hiệu là tín hiệu hero, không bị headline át.
- **Home (viewport đầu):** brand NHÀ Bar + một câu hỗ trợ + một nhóm CTA + một visual chủ đạo (không nhồi stats/schedule vào hero).
- **Mobile-first:** khách check sự kiện trên điện thoại trước khi đến quán.

### 3.3. Quản lý sự kiện ra sao?

```text
Admin đăng nhập
  → Tạo sự kiện (tiêu đề, ngày giờ, poster, mô tả, trạng thái)
  → Gắn nghệ sĩ + role (DJ / Rapper / Guest…)
  → Publish / Ẩn
  → Khách thấy trên Events & Home (featured)
  → Sau ngày diễn ra: trạng thái “đã qua”; vẫn xem được chi tiết + gallery
```

Ví dụ dữ liệu mẫu: *JUMP OUT DA HOUSE // RAPSHOW* — 10/07, 19:00 — By Midside Hustlers — lineup PINTEERROR, RHIN, RECKO, …

## 4. Mục tiêu

**Mục tiêu tổng quát:** Có bản mẫu website chuẩn cho NHÀ Bar giúp khách tìm sự kiện và thông tin quán dễ hơn Facebook feed.

**Mục tiêu cụ thể**

1. Public site đạt AC-001, AC-002, AC-003, AC-007, AC-008, AC-009.
2. Admin quản lý sự kiện & nghệ sĩ đạt AC-004, AC-005.
3. Promo + gallery đạt AC-006, AC-010 trong Sprint 3.
4. Tài liệu dự án đủ 13 loại và có bảng truy vết AC.

## 5. Phạm vi

| Trong phạm vi (MVP) | Ngoài phạm vi |
| --- | --- |
| Public: Home, Events, Detail, Promo, Contact | Thanh toán / bán vé online |
| Admin: auth, CRUD event/artist/promo/media | App mobile native |
| Map nhúng + link Facebook | Chat realtime / inbox thay Messenger |
| Responsive web | Đa chi nhánh / franchise |
| Stack Next.js + NestJS + Prisma + PostgreSQL | Tích hợp POS / kho rượu |

## 6. Lợi ích kỳ vọng

- Khách có URL ổn định để xem lịch sự kiện và lineup.
- Admin cập nhật có cấu trúc (ẩn sự kiện hết hạn, tái sử dụng nghệ sĩ).
- Brand nhất quán hơn chuỗi poster rời trên Facebook.
- Nhóm có bộ tài liệu + AC để triển khai và kiểm thử có kiểm soát.

## 7. Rủi ro và giảm thiểu

| Rủi ro | Mức | Giảm thiểu |
| --- | --- | --- |
| Brand “elegant gold” lệch visual “street poster” | Trung bình | UI token: nền dark + gold cho chrome; poster sự kiện giữ đỏ/đen trong khung media |
| Scope phình (đặt bàn phức tạp, loyalty…) | Cao | MoSCoW; Must chỉ 10 AC lõi |
| Chậm upload ảnh / poster lớn | Trung bình | Giới hạn dung lượng; tối ưu ảnh; CDN sau MVP |
| Admin quên cập nhật → site lỗi thời | Trung bình | DoD Sprint: mọi event demo có ngày + trạng thái rõ |

## 8. Tiêu chí thành công (Acceptance Criteria)

Xem chi tiết và trace tại [`_traceability.md`](_traceability.md).

Tóm tắt: AC-001 … AC-010 phải có User Story và Test Case tương ứng trước khi coi MVP tài liệu hoàn tất; khi có code, mỗi AC phải có bằng chứng test pass.

## 9. Phương pháp và lịch

- **Phương pháp:** Scrum, 3 sprint × ~2 tuần (chi tiết [`02_ProjectPlan.md`](02_ProjectPlan.md)).
- **Deliverable phase này:** bộ 13 tài liệu Markdown trong `docs/`.
- **Deliverable phase sau:** scaffold và triển khai theo Sprint Backlog.

## 10. Khuyến nghị

Phê duyệt proposal này để khóa phạm vi MVP và 10 AC. Mọi thay đổi scope sau đó phải cập nhật `_traceability.md` trước khi sửa backlog/test.

## 11. Phê duyệt

| Vai trò | Họ tên | Chữ ký / ngày |
| --- | --- | --- |
| Product Owner | [Điền sau] | |
| Scrum Master | [Điền sau] | |
| GVHD | [Điền sau] | |
