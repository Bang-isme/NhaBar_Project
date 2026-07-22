# (12) Project Meeting Report — Website NHÀ Bar

| Trường | Giá trị |
| --- | --- |
| Dự án | Website NHÀ Bar |
| Phiên bản | 1.0 |
| Ngày lập mẫu | 2026-07-20 |

Tài liệu gồm **ba biên bản mẫu** (Kickoff, Sprint Planning 1, Sprint Review — khung). Cập nhật danh sách người tham dự `[Điền sau]` khi họp thật.

---

## Biên bản 1 — Kickoff dự án

| Hạng mục | Nội dung |
| --- | --- |
| Thời gian | 2026-07-20 |
| Hình thức | Offline / Online `[Điền sau]` |
| Thành phần | PO, SM, Dev FE, Dev BE, QA `[Điền sau họ tên]` |
| Thư ký | `[Điền sau]` |

### Mục tiêu họp

Khóa mục đích website quán bar, look & feel, cách quản lý sự kiện, và acceptance criteria MVP.

### Nội dung đã thống nhất

1. Website là **hub chính thức**, không thay Facebook.
2. MVP gồm: Home, Events + lineup, Promo, Contact, Admin CRUD.
3. Brand UI: dark + bronze/gold; poster sự kiện được phép đỏ/đen trong khung media.
4. Stack: Next.js + NestJS + Prisma + PostgreSQL.
5. Khóa **10 AC** trong `_traceability.md`.
6. Phase hiện tại: hoàn thiện 13 tài liệu trước khi code.

### Quyết định

| ID | Quyết định | Owner |
| --- | --- | --- |
| D-01 | Phạm vi Won’t: thanh toán vé, multi-role RBAC phức tạp | PO |
| D-02 | Địa chỉ/giờ lấy từ thông tin quán hiện có | PO |
| D-03 | Event mẫu seed: JUMP OUT DA HOUSE // RAPSHOW | BE |

### Action items

| Action | Owner | Hạn |
| --- | --- | --- |
| Hoàn tất 13 docs + README | Nhóm | 2026-07-20 |
| Điền meta trường/GVHD/MSSV | PO | Khi có thông tin |
| Chuẩn bị môi trường Postgres khi bắt đầu Sprint 1 | BE | Trước Sprint 1 |

### Rủi ro nêu trong họp

- Lệch aesthetic logo elegant vs poster street → giải bằng tách chrome UI / media poster.
- Scope creep đặt bàn → giữ Contact + link Messenger ở Could.

---

## Biên bản 2 — Sprint Planning (Sprint 1)

| Hạng mục | Nội dung |
| --- | --- |
| Thời gian | `[Điền ngày bắt đầu Sprint 1]` |
| Sprint Goal | Khách nhận ra NHÀ Bar trên Home và liên hệ được quán (AC-001,007,008,009) |

### Backlog chọn vào sprint

- PBI-01 Design tokens  
- PBI-02 Home  
- PBI-03 Responsive nav  
- PBI-04 Contact  
- Scaffold repo + health + seed constants  

Chi tiết task: [`10_Project_SprintBacklog.md`](10_Project_SprintBacklog.md) § Sprint 1.

### Capacity & cam kết

| Vai trò | SP cam kết |
| --- | --- |
| FE | `[Điền]` |
| BE | `[Điền]` |
| QA | `[Điền]` |

### Quyết định Planning

| ID | Quyết định |
| --- | --- |
| D-10 | Featured event trên Home có thể dùng mock đến khi API events sẵn (Sprint 2), miễn UI đúng brand |
| D-11 | Map dùng Google Maps embed hoặc link mở Maps — chọn phương án ít key hơn nếu chưa có billing |

### Action items

| Action | Owner | Hạn |
| --- | --- | --- |
| Tạo `.env.example` | BE | Ngày 1 sprint |
| Implement tokens + Home | FE | Giữa sprint |
| Viết kết quả TC Sprint 1 | QA | Cuối sprint |

---

## Biên bản 3 — Sprint Review (khung mẫu)

| Hạng mục | Nội dung |
| --- | --- |
| Thời gian | `[Cuối sprint]` |
| Người xem | PO, GVHD (optional), nhóm |

### Demo theo AC

| AC | Demo | Kết quả (Pass/Fail) | Ghi chú |
| --- | --- | --- | --- |
| AC-001 | Home brand + CTA + featured | | |
| AC-007 | Contact địa chỉ/giờ/map/FB | | |
| AC-008 | Tokens dark+gold | | |
| AC-009 | Mobile 375 nav/CTA | | |
| … | Bổ sung theo sprint | | |

### Feedback PO

- `[Ghi nhận]`

### Bug / nợ kỹ thuật mang sang

| ID | Mô tả | Priority |
| --- | --- | --- |
| | | |

### Quyết định Review

| ID | Quyết định |
| --- | --- |
| D-20 | Accept / Reject Sprint Goal |
| D-21 | Có cần cập nhật AC không? Nếu có → sửa `_traceability.md` trong 24h |

### Action items sau Review

| Action | Owner | Hạn |
| --- | --- | --- |
| Cập nhật Test Case Result | QA | +1 ngày |
| Retro notes → Reflection | SM | +2 ngày |

---

## Phụ lục — Checklist họp ngắn

Trước mỗi họp có quyết định scope:

1. Mở `_traceability.md`.
2. Nêu AC bị ảnh hưởng.
3. Ghi quyết định vào biên bản này.
4. Sync Backlog / User Story / Test Case nếu AC đổi.

## Tham chiếu

- Proposal: [`01_Project_Proposal.md`](01_Project_Proposal.md)
- Sprint Backlog: [`10_Project_SprintBacklog.md`](10_Project_SprintBacklog.md)
- Reflection: [`13_Project_Reflection.md`](13_Project_Reflection.md)
- Security: [`14_Security_Review.md`](14_Security_Review.md)

---

## Biên bản 4 — Quyết định lộ trình (docs + Admin)

| Hạng mục | Nội dung |
| --- | --- |
| Thời gian | 2026-07-20 |
| Ngữ cảnh | Public FE đã production-ready; user ủy quyền chọn hướng tốt nhất |

### Quyết định

| ID | Quyết định | Owner |
| --- | --- | --- |
| D-30 | Chọn hướng **C**: sync tài liệu rồi làm Sprint 2 Admin (JWT + CRUD event/lineup) | PO/Agent |
| D-31 | Promo/gallery **public** đã ship sớm; admin promo/upload để sau | Dev |

### Action items

| Action | Owner | Hạn |
| --- | --- | --- |
| Sync `_traceability` + Sprint Backlog + README | Docs | Ngay |
| Implement AC-004/005 | BE/FE | Phiên hiện tại |
| Cập nhật TC-010…014 khi admin xong | QA | Sau merge admin |
