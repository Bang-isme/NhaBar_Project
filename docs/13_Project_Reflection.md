# (13) Project Reflection — Website NHÀ Bar

| Trường | Giá trị |
| --- | --- |
| Dự án | Website NHÀ Bar |
| Giai đoạn | Public FE Done → đang Admin Sprint 2 |
| Phiên bản | 1.1 |
| Ngày | 2026-07-20 |

## 1. Mục đích

Ghi lại bài học, khó khăn và hướng cải thiện quy trình — đặc biệt việc **cập nhật tài liệu xuyên suốt** đến khi sản phẩm hoàn thiện.

## 2. Tóm tắt giai đoạn này

Nhóm đã khóa đề xuất website cho NHÀ Bar (Đà Nẵng) với trọng tâm:

- Làm rõ **mục đích** trang web quán bar (hub sự kiện + thông tin quán, không thay Facebook).
- Làm rõ **look & feel** (dark + bronze/gold; poster urban nằm trong khung media).
- Làm rõ **quản lý sự kiện** (publish/ẩn, lineup + role, featured, gallery, promo).
- Định nghĩa **10 acceptance criteria** và truy vết sang User Story / Test Case / Sprint.

Deliverable: README + `_traceability.md` + đủ 13 tài liệu trong `docs/`.

## 3. Điều làm tốt

| Điểm | Vì sao hữu ích |
| --- | --- |
| AC có ID và bảng trace tập trung | Tránh mỗi tài liệu mô tả yêu cầu một kiểu |
| Tách chrome UI khỏi artwork sự kiện | Giải được mâu thuẫn logo elegant vs poster hip-hop |
| User Story viết Given/When/Then | QA viết Test Case ít phải đoán |
| MoSCoW + Won’t rõ (vé, RBAC phức tạp) | Giảm scope creep sớm |
| Seed nghiệp vụ thật (JUMP OUT DA HOUSE, địa chỉ quán) | Tài liệu bám thực tế, không generic “Bar XYZ” |

## 4. Khó khăn và cách xử lý

| Khó khăn | Hiện trạng xử lý | Bài học |
| --- | --- | --- |
| Brand có hai tầng thẩm mỹ (minimal gold vs street poster) | Tokens cho hệ thống; poster giữ năng lượng riêng trong media | Ghi quyết định design sớm trong UI + Proposal |
| DB local | Docker Hub pull Postgres lỗi mạng; không dò password Postgres local | Dùng SQLite `file:./dev.db` cho Sprint 1; giữ `docker-compose.yml` cho PostgreSQL | Document fallback rõ trong README; Sprint 2 chuyển lại Postgres khi sẵn |
| Meta học thuật (MSSV, GVHD) chưa có | Placeholder `[Điền sau]` | Không bịa thông tin hành chính |
| Ước lượng SP Sprint 2 cao | Ghi chú cắt scope trong Sprint Backlog | Planning phải đối chiếu capacity thật |

## 5. Phản ánh theo góc nhìn sản phẩm

**Website quán bar “chuẩn” với nhóm nghĩa là gì sau khi làm tài liệu?**

1. Khách trả lời được trong <1 phút: quán ở đâu, mở lúc nào, tối nay/tuần này có show gì, ai diễn, có ưu đãi không.
2. Chủ quán cập nhật show mà không phụ thuộc thuật toán feed.
3. Giao diện nhớ được là NHÀ Bar — không phải template bar tối màu chung chung.

Các AC-001…010 chính là phiên bản đo được của ba ý trên.

## 6. Quy trình cập nhật xuyên suốt (cam kết tiếp)

```text
Mỗi khi đổi yêu cầu hoặc sau mỗi Sprint Review:
1) Sửa docs/_traceability.md
2) Sync 03 ProductBacklog + 04 UserStory + 09 TestCase
3) Nếu đổi cấu trúc hệ thống/data/UI → sync 05, 06, 07
4) Ghi quyết định vào 12 MeetingReport
5) Cuối milestone: bổ sung mục mới vào Reflection này
```

**Không** sửa AC chỉ trong đầu hoặc chỉ trong chat — luôn có file trace.

## 7. Kế hoạch cải thiện khi sang phase code

| Hạng mục | Hành động |
| --- | --- |
| Bằng chứng test | Điền cột Result TC; gắn bug ID |
| Hiệu năng Home | Đo thật TC-002 trên thiết bị; điều chỉnh lazy-load |
| Nội dung | Lấy poster/logo chính thức từ quán; thay ảnh placeholder |
| Retro | Mỗi cuối sprint thêm 5–10 dòng vào §8 bên dưới |

## 8. Nhật ký reflection theo sprint (điền sau)

### Sau Sprint 1

- Đạt Sprint Goal? `[x]`
- AC pass/fail: AC-001/007/008/009 Pass; public Events/Promo ship sớm
- Điều bất ngờ: Docker Hub pull Postgres fail → SQLite local
- Việc sẽ làm khác ở Sprint 2: ưu tiên Admin JWT sớm; public events đã xong trước

### Sau Sprint 2

- Đạt Sprint Goal? `[x]`
- AC pass/fail: AC-002/003/004/005 Pass
- Điều bất ngờ: Promo/gallery public đã làm sớm trong Sprint 3 partial
- Việc sẽ làm khác ở Sprint 3: admin promo CRUD + media upload (TC-022)

### Sau Sprint 3 / bàn giao mẫu

- MVP có đủ Must AC?
- Feedback PO / quán / GVHD:
- Nợ kỹ thuật còn lại:
- Đề xuất phase sau (Could đã trì hoãn):

## 9. Kết luận giai đoạn tài liệu

Bộ 13 tài liệu đã đủ để:

- Giải thích vì sao NHÀ Bar cần website và website phải trông/hoạt động thế nào.
- Hướng dẫn thiết kế kiến trúc, DB, UI.
- Kiểm thử và triển khai theo sprint có acceptance criteria rõ.

**Bước tiếp theo:** Bắt đầu Sprint 1 theo [`10_Project_SprintBacklog.md`](10_Project_SprintBacklog.md) — scaffold code và hiện thực Home/Contact/brand tokens — đồng thời giữ kỷ luật cập nhật `_traceability.md`.

## 10. Tham chiếu

- Trace: [`_traceability.md`](_traceability.md)
- Proposal: [`01_Project_Proposal.md`](01_Project_Proposal.md)
- Meeting: [`12_Project_MeetingReport.md`](12_Project_MeetingReport.md)
