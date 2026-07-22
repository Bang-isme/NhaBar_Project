# (3) Product Backlog — Website NHÀ Bar

| Trường | Giá trị |
| --- | --- |
| Product | NHÀ Bar Official Website |
| PO | [Điền sau] |
| Phiên bản | 1.0 |
| Ngày | 2026-07-20 |

## 1. Mục đích

Danh sách ưu tiên các hạng mục sản phẩm (PBI) để đạt MVP website quán bar có quản lý sự kiện. Ưu tiên theo **MoSCoW** và ước lượng **story points** (Fibonacci).

## 2. Epics

| Epic ID | Tên | Mô tả ngắn |
| --- | --- | --- |
| E-01 | Public Site & Brand | Home, layout, design tokens, responsive |
| E-02 | Events (Public) | List, detail, trạng thái, featured |
| E-03 | Artists & Lineup | Hồ sơ nghệ sĩ, gắn role vào sự kiện |
| E-04 | Promotions | Promo active trên site |
| E-05 | Admin Auth & CMS | Đăng nhập, CRUD nội dung |
| E-06 | Contact & Location | Map, giờ, Facebook, liên hệ |
| E-07 | Media Gallery | Ảnh theo sự kiện |

## 3. Product Backlog Items

| PBI | Epic | Mô tả | MoSCoW | SP | AC | Sprint |
| --- | --- | --- | --- | --- | --- | --- |
| PBI-01 | E-01 | Thiết lập design tokens dark + bronze/gold; layout shell | Must | 5 | AC-008 | 1 |
| PBI-02 | E-01 | Trang Home: brand hero, 1 CTA, block sự kiện nổi bật | Must | 8 | AC-001, AC-008 | 1 |
| PBI-03 | E-01 | Responsive nav + CTA 375–1280px | Must | 5 | AC-009 | 1 |
| PBI-04 | E-06 | Trang Contact: địa chỉ, giờ 11:00–Late, map, link FB | Must | 5 | AC-007 | 1 |
| PBI-05 | E-02 | API + UI danh sách sự kiện sắp tới (ngày, giờ, tiêu đề, poster) | Must | 8 | AC-002 | 2 |
| PBI-06 | E-02 | Trang chi tiết sự kiện: mô tả, trạng thái, lineup | Must | 8 | AC-003 | 2 |
| PBI-07 | E-05 | Admin đăng nhập (JWT/session) | Must | 5 | AC-004 | 2 |
| PBI-08 | E-05 | Admin tạo / sửa / ẩn sự kiện | Must | 8 | AC-004 | 2 |
| PBI-09 | E-03 | Admin CRUD nghệ sĩ + gắn vào sự kiện với role | Must | 8 | AC-005 | 2 |
| PBI-10 | E-04 | Hiển thị promo đang active (public) | Must | 5 | AC-006 | 3 |
| PBI-11 | E-05 | Admin CRUD promo (active/inactive, thời hạn) | Must | 5 | AC-006 | 3 |
| PBI-12 | E-07 | Gallery ảnh theo sự kiện (public list) | Should | 5 | AC-010 | 3 |
| PBI-13 | E-05 | Admin upload media gắn event | Should | 5 | AC-010 | 3 |
| PBI-14 | E-01 | Tối ưu ảnh / lazy load / cảm nhận hiệu năng Home | Should | 3 | AC-001 | 3 |
| PBI-15 | E-02 | Lọc sự kiện đã qua / sắp tới | Could | 3 | AC-002, AC-003 | — |
| PBI-16 | E-06 | Form “Đặt chỗ / Liên hệ” gửi email hoặc deep-link Messenger | Could | 5 | — | — |
| PBI-17 | E-03 | Trang hồ sơ nghệ sĩ riêng (bio + social) | Could | 5 | — | — |
| PBI-18 | E-05 | Phân quyền Admin / Editor | Won’t (MVP) | — | — | — |
| PBI-19 | E-02 | Bán vé / cổng thanh toán | Won’t (MVP) | — | — | — |
| PBI-20 | E-01 | Menu public tĩnh: Home teaser + `/menu` + nav | Must | 5 | AC-011 | 3 |
| PBI-21 | E-02/E-04 | Event↔Promotion M:N + public offer chips (schema/API/FE; Admin UI Next) | Must | 5 | AC-012 | 3 |
| PBI-22 | E-05 | Admin gắn promo↔event + Menu CMS | Should | 8 | AC-011, AC-012 | Later |

**Tổng SP Must+Should trong 3 sprint:** 5+8+5+5+8+8+5+8+8+5+5+5+5+3+5+5 = **93 SP** (ước lượng; capacity thực tế điều chỉnh ở Sprint Planning).

## 4. Thứ tự ưu tiên (Ordered Backlog — Must trước)

1. PBI-01 Design tokens  
2. PBI-02 Home  
3. PBI-03 Responsive  
4. PBI-04 Contact  
5. PBI-07 Admin auth  
6. PBI-05 Events list  
7. PBI-08 Admin CRUD event  
8. PBI-06 Event detail  
9. PBI-09 Artists + roles  
10. PBI-10 / PBI-11 Promo  
11. PBI-12 / PBI-13 Gallery  
12. PBI-14 Performance polish  
13. PBI-20 Menu public (static)  
14. PBI-21 Event–Promo link (public read)  
15. PBI-22 Admin attach / Menu CMS (Later) 

## 5. Định nghĩa Ready (DoR) cho PBI

- Có User Story hoặc mô tả rõ actor + outcome.
- Có AC ID hoặc AC viết được Given/When/Then.
- Không phụ thuộc hạng mục Won’t.
- Ước lượng SP đã thảo luận.

## 6. Ghi chú nghiệp vụ sự kiện

Mỗi sự kiện MVP tối thiểu gồm:

- `title`, `startsAt`, `endsAt` (optional), `posterUrl`, `description`, `status` (`draft` | `published` | `hidden`), `visibility` trên public chỉ khi `published` và không `hidden`.
- Lineup: nhiều nghệ sĩ, mỗi dòng có `roleLabel` (DJ, Rapper, Guest, Host…).
- Featured flag để hiện trên Home (AC-001).

## 7. Tham chiếu

- User Stories: [`04_Project_UserStory.md`](04_Project_UserStory.md)
- Sprint Backlog: [`10_Project_SprintBacklog.md`](10_Project_SprintBacklog.md)
- Trace: [`_traceability.md`](_traceability.md)
