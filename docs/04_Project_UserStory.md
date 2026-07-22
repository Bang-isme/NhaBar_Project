# (4) Project User Story — Website NHÀ Bar

| Trường | Giá trị |
| --- | --- |
| Sản phẩm | NHÀ Bar Official Website |
| Phiên bản | 1.0 |
| Ngày | 2026-07-20 |

## 1. Mục đích

Mô tả nhu cầu theo góc nhìn người dùng và admin. Mỗi story có **Acceptance Criteria** đo được và map tới `AC-xxx` trong [`_traceability.md`](_traceability.md).

## 2. Actors

| Actor | Mô tả |
| --- | --- |
| Khách (Guest) | Người xem site, chưa đăng nhập |
| Admin | Nhân sự quán quản lý nội dung |
| Hệ thống | Backend/API, lưu trữ media |

## 3. User Stories

### US-01 — Xem trang chủ nhanh và rõ thương hiệu

**As a** khách,  
**I want** mở trang chủ và nhận ra ngay NHÀ Bar cùng hướng đi tiếp (xem sự kiện / liên hệ),  
**so that** tôi biết đây là hub chính thức của quán, không phải landing generic.

**Priority:** Must | **PBI:** PBI-02 | **AC:** AC-001, AC-008

**Acceptance Criteria**

1. **Given** tôi mở `/` trên mobile (~375px), **When** trang tải xong, **Then** tôi thấy logo/tên NHÀ Bar ở mức hero, một câu hỗ trợ, và một nhóm CTA (tối thiểu “Xem sự kiện”).
2. **Given** có ít nhất một sự kiện `published` được đánh dấu featured, **When** tôi xem Home, **Then** khối sự kiện nổi bật hiển thị tiêu đề + ngày.
3. **Given** mạng 4G thông thường, **When** tôi tải Home, **Then** nội dung chính (brand + CTA) xuất hiện trong cảm nhận ≤3 giây (đo bằng Lighthouse/manual timing ở Test Case).

---

### US-02 — Cảm nhận đúng không khí quán (dark + gold)

**As a** khách,  
**I want** giao diện tối với accent đồng/vàng tối giản,  
**so that** site khớp logo và vibe “A place called home” / nightlife.

**Priority:** Must | **PBI:** PBI-01 | **AC:** AC-008

**Acceptance Criteria**

1. **Given** tôi duyệt các trang public, **When** quan sát màu nền và accent, **Then** nền là dark; CTA/link active dùng bronze/gold theo design tokens.
2. **Given** checklist UI, **When** reviewer đối chiếu, **Then** không dùng theme purple-on-white hoặc cream/terracotta generic làm theme chính.

---

### US-03 — Xem danh sách sự kiện sắp tới

**As a** khách,  
**I want** xem danh sách sự kiện sắp diễn ra kèm poster,  
**so that** tôi chọn được đêm muốn đến (rap show, battle, xem bóng…).

**Priority:** Must | **PBI:** PBI-05 | **AC:** AC-002

**Acceptance Criteria**

1. **Given** tồn tại ≥1 sự kiện `published` có `startsAt` trong tương lai, **When** tôi mở `/events`, **Then** mỗi item hiện tiêu đề, ngày, giờ, ảnh poster.
2. **Given** sự kiện `hidden` hoặc `draft`, **When** tôi là khách, **Then** tôi không thấy sự kiện đó trên list.
3. **Given** danh sách rỗng, **When** tôi mở `/events`, **Then** tôi thấy trạng thái trống rõ ràng (không lỗi trắng trang).

---

### US-04 — Xem chi tiết sự kiện và lineup

**As a** khách,  
**I want** mở một sự kiện để đọc mô tả, trạng thái và ai biểu diễn,  
**so that** tôi biết lineup trước khi đến.

**Priority:** Must | **PBI:** PBI-06 | **AC:** AC-003

**Acceptance Criteria**

1. **Given** sự kiện published có mô tả và lineup, **When** tôi mở `/events/[slug]`, **Then** tôi thấy mô tả, trạng thái (sắp diễn ra / đã qua), danh sách nghệ sĩ kèm role.
2. **Given** sự kiện đã qua ngày `startsAt`, **When** tôi xem detail, **Then** trạng thái hiển thị “đã qua” (hoặc tương đương) nhưng nội dung vẫn đọc được.
3. **Given** URL sự kiện không tồn tại hoặc không public, **When** tôi truy cập, **Then** tôi nhận 404 thân thiện.

---

### US-05 — Xem ảnh gallery của sự kiện

**As a** khách,  
**I want** xem các ảnh gắn với sự kiện,  
**so that** tôi cảm nhận không khí đêm nhạc.

**Priority:** Should | **PBI:** PBI-12 | **AC:** AC-010

**Acceptance Criteria**

1. **Given** sự kiện có ≥1 media ảnh, **When** tôi xem trang detail, **Then** tôi thấy list/grid ảnh.
2. **Given** sự kiện chưa có ảnh, **When** tôi xem detail, **Then** khu gallery ẩn hoặc hiện empty state, không vỡ layout.

---

### US-06 — Điều hướng mobile dễ dùng

**As a** khách dùng điện thoại,  
**I want** mở menu và bấm CTA bằng ngón tay,  
**so that** tôi thao tác được khi đang di chuyển tới quán.

**Priority:** Must | **PBI:** PBI-03 | **AC:** AC-009

**Acceptance Criteria**

1. **Given** viewport 375px, **When** tôi dùng nav, **Then** các mục Home / Events / Promos / Contact truy cập được.
2. **Given** CTA chính, **When** đo vùng chạm, **Then** kích thước tối thiểu khoảng 44×44 CSS px (hoặc tương đương dễ bấm).

---

### US-07 — Xem khuyến mãi đang chạy

**As a** khách,  
**I want** thấy promo đang active (ví dụ Buy 2 Get 1 / World Cup),  
**so that** tôi biết ưu đãi trước khi order.

**Priority:** Must | **PBI:** PBI-10 | **AC:** AC-006

**Acceptance Criteria**

1. **Given** promo có `isActive=true` và trong khung thời gian, **When** tôi mở trang Promos (hoặc block Home), **Then** tôi thấy tiêu đề + mô tả ngắn ưu đãi.
2. **Given** promo hết hạn hoặc inactive, **When** tôi là khách, **Then** promo đó không hiển thị.

---

### US-08 — Tìm địa chỉ, giờ mở cửa và Facebook

**As a** khách (đặc biệt khách mới / du lịch Đà Nẵng),  
**I want** xem map, giờ 11:00–Late và link Facebook,  
**so that** tôi đến đúng quán và follow kênh chính thức.

**Priority:** Must | **PBI:** PBI-04 | **AC:** AC-007

**Acceptance Criteria**

1. **Given** trang Contact, **When** tôi xem, **Then** địa chỉ hiển thị “35 Ngõ Thì Sĩ, Mỹ An, Đà Nẵng”.
2. **Given** cùng trang, **When** tôi xem giờ, **Then** thấy 11:00 AM – Late (hoặc “11:00 – Late”).
3. **Given** link Facebook, **When** tôi bấm, **Then** mở trang NHÀ Bar (tab/cửa sổ mới hoặc deep link).
4. **Given** map nhúng hoặc link Google Maps, **When** tôi tương tác, **Then** tôi có thể mở chỉ đường.

---

### US-09 — Trải nghiệm nhất quán trên desktop

**As a** khách trên máy tính,  
**I want** layout không vỡ ở ~1280px,  
**so that** tôi duyệt sự kiện thoải mái trước khi đi với bạn bè.

**Priority:** Must | **PBI:** PBI-03 | **AC:** AC-008, AC-009

**Acceptance Criteria**

1. **Given** viewport 1280px, **When** tôi duyệt Home/Events/Contact, **Then** không có overflow ngang spoiling nội dung chính.
2. **Given** cùng breakpoint, **When** đối chiếu brand, **Then** vẫn dark + gold theo tokens.

---

### US-10 — Admin đăng nhập

**As an** admin,  
**I want** đăng nhập khu vực quản trị,  
**so that** chỉ người được phép sửa nội dung quán.

**Priority:** Must | **PBI:** PBI-07 | **AC:** AC-004

**Acceptance Criteria**

1. **Given** tài khoản hợp lệ, **When** tôi submit form login, **Then** tôi vào được dashboard admin.
2. **Given** sai mật khẩu, **When** tôi submit, **Then** tôi thấy lỗi rõ, không vào được admin.
3. **Given** chưa đăng nhập, **When** tôi gọi API/admin route được bảo vệ, **Then** hệ thống từ chối (401/redirect login).

---

### US-11 — Admin tạo / sửa / ẩn sự kiện

**As an** admin,  
**I want** tạo sự kiện mới, sửa thông tin và ẩn khỏi public,  
**so that** lịch trên web khớp thực tế quán (ví dụ hủy show, đổi giờ).

**Priority:** Must | **PBI:** PBI-08 | **AC:** AC-004

**Acceptance Criteria**

1. **Given** tôi đã login, **When** tôi tạo sự kiện với tiêu đề + startsAt + poster + publish, **Then** khách thấy sự kiện trên `/events`.
2. **Given** sự kiện đã publish, **When** tôi sửa tiêu đề/giờ, **Then** public phản ánh giá trị mới sau refresh.
3. **Given** sự kiện publish, **When** tôi đặt trạng thái ẩn/`hidden`, **Then** khách không còn thấy trên list/Home.

---

### US-12 — Admin gắn nghệ sĩ và role vào sự kiện

**As an** admin,  
**I want** chọn nghệ sĩ và gắn role (DJ, Rapper, Guest…),  
**so that** lineup trên poster được thể hiện có cấu trúc trên web.

**Priority:** Must | **PBI:** PBI-09 | **AC:** AC-005

**Acceptance Criteria**

1. **Given** đã có nghệ sĩ trong hệ thống, **When** tôi gắn vào sự kiện với role “DJ”, **Then** trang detail public hiện tên + role.
2. **Given** nhiều nghệ sĩ, **When** tôi lưu lineup, **Then** thứ tự hiển thị khớp thứ tự admin đặt (nếu có sortOrder).
3. **Given** tôi gỡ một nghệ sĩ khỏi sự kiện, **When** khách xem detail, **Then** nghệ sĩ đó không còn trong lineup.

---

### US-13 — Admin quản lý promo

**As an** admin,  
**I want** bật/tắt và đặt thời hạn promo,  
**so that** chỉ ưu đãi còn hiệu lực hiện ra ngoài.

**Priority:** Must | **PBI:** PBI-11 | **AC:** AC-006

**Acceptance Criteria**

1. **Given** tôi tạo promo active trong hạn, **When** khách mở Promos, **Then** promo xuất hiện.
2. **Given** tôi tắt `isActive`, **When** khách xem, **Then** promo biến mất.

---

### US-14 — Admin upload ảnh gallery cho sự kiện

**As an** admin,  
**I want** tải ảnh lên và gắn vào sự kiện,  
**so that** khách xem được gallery (AC-010).

**Priority:** Should | **PBI:** PBI-13 | **AC:** AC-010

**Acceptance Criteria**

1. **Given** tôi đã login và chọn sự kiện, **When** tôi upload ảnh hợp lệ (định dạng/dung lượng trong giới hạn), **Then** ảnh xuất hiện trong gallery public của sự kiện.
2. **Given** file không hợp lệ, **When** upload, **Then** hệ thống báo lỗi và không lưu.

---

### US-15 — Xem menu quán (teaser Home + trang đầy đủ)

**As a** khách,  
**I want** thấy gợi ý đồ uống/ăn trên Home và mở `/menu` để xem danh sách đầy đủ,  
**so that** tôi biết NHÀ phục vụ gì trước khi tới.

**Priority:** Must | **PBI:** PBI-20 | **AC:** AC-011

**Acceptance Criteria**

1. **Given** tôi mở `/`, **When** cuộn tới Menu teaser, **Then** tôi thấy ≥3 nhóm món và CTA tới `/menu`.
2. **Given** tôi mở `/menu`, **When** trang tải, **Then** tôi thấy danh sách theo category (không trang trắng).
3. **Given** nav desktop/mobile, **When** chọn Menu, **Then** tôi tới `/menu`.

---

### US-16 — Thấy ưu đãi gắn với sự kiện

**As a** khách,  
**I want** khi xem show nổi bật / list / chi tiết thì thấy ưu đãi áp dụng cho đêm đó (nếu có),  
**so that** tôi biết lợi ích khi tới sàn (ví dụ Buy 2 Get 1).

**Priority:** Must | **PBI:** PBI-21 | **AC:** AC-012

**Acceptance Criteria**

1. **Given** sự kiện có ≥1 promo active được gắn, **When** tôi xem Featured hoặc detail, **Then** tôi thấy tiêu đề ưu đãi (và mô tả ngắn nếu có).
2. **Given** promo hết hạn / inactive, **When** tôi xem sự kiện, **Then** ưu đãi đó không hiện.
3. **Given** admin chưa có UI gắn (Now), **When** seed/API có link, **Then** public vẫn đọc được offers (Admin UI = Later).

## 4. Ma trận Story ↔ AC

| Story | AC |
| --- | --- |
| US-01 | AC-001, AC-008 |
| US-02 | AC-008 |
| US-03 | AC-002 |
| US-04 | AC-003 |
| US-05 | AC-010 |
| US-06 | AC-009 |
| US-07 | AC-006 |
| US-08 | AC-007 |
| US-09 | AC-008, AC-009 |
| US-10 | AC-004 |
| US-11 | AC-004 |
| US-12 | AC-005 |
| US-13 | AC-006 |
| US-14 | AC-010 |
| US-15 | AC-011 |
| US-16 | AC-012 |

## 5. Out of scope (không viết story MVP)

- Thanh toán vé, seat map, loyalty điểm thưởng, chat inbox nội bộ.
