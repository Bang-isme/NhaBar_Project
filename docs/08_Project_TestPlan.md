# (8) Project Test Plan — Website NHÀ Bar

| Trường | Giá trị |
| --- | --- |
| Dự án | Website NHÀ Bar |
| Phiên bản | 1.0 |
| Ngày | 2026-07-20 |
| QA lead | [Điền sau] |

## 1. Mục đích

Định nghĩa chiến lược kiểm thử để chứng minh hệ thống đáp ứng AC-001 … AC-010 trước khi bàn giao bản mẫu.

## 2. Phạm vi kiểm thử

### Trong phạm vi

- Chức năng public: Home, Events list/detail, Promos, Contact.
- Chức năng admin: login, CRUD event, lineup roles, promo, upload media.
- UI brand tokens và responsive 375px / 768px / 1280px.
- API public không lộ draft/hidden.
- Hiệu năng cảm nhận Home (timing thủ công hoặc Lighthouse).

### Ngoài phạm vi (MVP)

- Penetration test đầy đủ, load test cao tải.
- Thanh toán / vé / POS.
- Tương thích trình duyệt legacy (IE).
- Automated E2E đầy đủ (có thể bổ sung sau; MVP ưu tiên manual theo Test Case).

## 3. Tài liệu tham chiếu

| Tài liệu | Vai trò |
| --- | --- |
| [`_traceability.md`](_traceability.md) | Nguồn AC |
| [`04_Project_UserStory.md`](04_Project_UserStory.md) | Hành vi mong đợi |
| [`09_Project_TestCase.md`](09_Project_TestCase.md) | Bước kiểm thử chi tiết |
| [`07_Project_UserInterface.md`](07_Project_UserInterface.md) | Checklist UI |

## 4. Loại kiểm thử

| Loại | Mục tiêu | Khi nào |
| --- | --- | --- |
| Functional | Đúng nghiệp vụ theo AC | Mỗi PBI Done |
| UI / Visual | Tokens dark+gold; brand-first Home | Sprint 1 và regression |
| Responsive | 375–1280 | Sprint 1–3 |
| API / Auth | 401 khi chưa login; public filter status | Sprint 2 |
| Regression | Không phá AC đã pass | Cuối mỗi sprint |
| Smoke | Build chạy được, `/` và `/health` OK | Mỗi deploy staging |

## 5. Môi trường

| Môi trường | Mục đích | Dữ liệu |
| --- | --- | --- |
| Local | Dev + test nhanh | Seed JUMP OUT DA HOUSE |
| Staging | Demo / regression | Clone gần production |
| Production | Sau MVP code | Dữ liệu thật quán |

**Trình duyệt tối thiểu:** Chrome và Safari iOS (hoặc Chrome Android) — vì khách bar chủ yếu mobile.

## 6. Entry criteria

- Build web + API chạy được trên môi trường test.
- Seed có: 1 admin, ≥1 event published featured, ≥1 draft/hidden, lineup ≥3 artists, ≥1 promo active, ≥1 promo inactive, ≥1 media.
- Test Case đã map AC.

## 7. Exit criteria (sprint / release)

- 100% test case **Must** (gắn AC Must) = Pass hoặc Fail đã có defect P0/P1 được xử lý.
- Không còn defect **P0** mở.
- Defect **P1** còn lại có quyết định PO (fix hoặc chấp nhận rủi ro ghi rõ).
- `_traceability.md` và kết quả test được cập nhật.

## 8. Mức ưu tiên defect

| Mức | Định nghĩa | Ví dụ |
| --- | --- | --- |
| P0 | Chặn demo / mất chức năng Must | Không login admin; list events trống dù có data published |
| P1 | Sai AC quan trọng nhưng có workaround | Lineup sai role; Contact thiếu map |
| P2 | UI lệch tokens nhẹ | Hover màu lệch |
| P3 | Cosmetics | Copy thừa dấu câu |

## 9. Vai trò

| Vai trò | Trách nhiệm |
| --- | --- |
| QA / Dev kiêm | Viết/chạy TC, ghi kết quả |
| Dev | Fix defect, cung cấp build |
| PO | Chấp nhận sprint theo AC |

## 10. Lịch kiểm thử theo sprint

| Sprint | Trọng tâm test |
| --- | --- |
| 1 | AC-001, AC-007, AC-008, AC-009 |
| 2 | AC-002, AC-003, AC-004, AC-005 |
| 3 | AC-006, AC-010 + full regression |

## 11. Rủi ro kiểm thử

| Rủi ro | Mitigation |
| --- | --- |
| Thiếu thiết bị iOS | Dùng browser DevTools + 1 máy Android thật tối thiểu |
| Poster ảnh lớn làm chậm | TC hiệu năng đo sau khi có compress |
| Múi giờ startsAt sai | Seed ghi rõ +07; TC kiểm tra hiển thị giờ Việt Nam |

## 12. Deliverable kiểm thử

- Kết quả từng TC trong [`09_Project_TestCase.md`](09_Project_TestCase.md) (cột Result cập nhật khi chạy).
- Danh sách defect (có thể file riêng sau khi có code).
- Báo cáo ngắn trong Sprint Review (Meeting Report).
