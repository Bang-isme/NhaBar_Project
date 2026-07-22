# (11) Project Code Standard — Website NHÀ Bar

| Trường | Giá trị |
| --- | --- |
| Stack | Next.js + NestJS + Prisma + PostgreSQL |
| Phiên bản | 1.0 |
| Ngày | 2026-07-20 |

## 1. Mục đích

Thống nhất cách viết code để nhiều người làm việc trên cùng repo mà API, UI tokens và bảo mật không lệch — phục vụ AC và review nhanh.

## 2. Nguyên tắc chung

1. Đọcability trước “thông minh”: tên rõ, hàm ngắn, một việc một hàm.
2. Không commit secret (`.env`, key, password).
3. Mọi thay đổi hành vi user-facing phải có AC/Story liên quan hoặc cập nhật docs.
4. Prefer sửa đúng chỗ; không refactor lớn ngoài scope sprint.
5. Tiếng Việt cho tài liệu; **tiếng Anh** cho identifier code (biến, hàm, bảng).

## 3. Cấu trúc thư mục đề xuất

```text
/
  apps/
    web/                 # Next.js
      app/
      components/
      lib/
      styles/
    api/                 # NestJS
      src/
        auth/
        events/
        artists/
        promotions/
        media/
        common/
  packages/              # optional shared types
  prisma/
    schema.prisma
    seed.ts
  docs/                  # 13 tài liệu dự án
  .env.example
  README.md
```

## 4. Naming

| Thành phần | Quy ước | Ví dụ |
| --- | --- | --- |
| Biến / hàm TS | camelCase | `getUpcomingEvents` |
| Component React | PascalCase | `EventPosterCard` |
| File component | PascalCase hoặc kebab theo convention Next đã chọn — **một kiểu duy nhất trong repo** | `EventList.tsx` |
| Nest module | kebab folder + Pascal class | `events/events.service.ts` |
| Prisma model | PascalCase | `EventArtist` |
| DB table | Prisma default / snake map nhất quán | |
| CSS variables | `--accent-bronze` | theo UI doc |
| Env vars | SCREAMING_SNAKE | `DATABASE_URL` |
| Branch | `feat/`, `fix/`, `docs/` | `feat/events-list` |

**Slug sự kiện:** `kebab-case`, ASCII hoặc slugify tiếng Việt có quy tắc thống nhất (vd. `jump-out-da-house-rapshow`).

## 5. TypeScript

- `strict` bật.
- Không dùng `any` trừ khi có comment lý do và ticket.
- DTO API dùng class-validator (Nest) hoặc zod (shared) — chọn **một** và giữ suốt dự án.
- Enum status event khớp DB: `draft | published | hidden`.

## 6. API conventions

### Response thành công

```json
{
  "data": { }
}
```

List:

```json
{
  "data": [ ],
  "meta": { "total": 0 }
}
```

### Response lỗi

```json
{
  "error": {
    "code": "EVENT_NOT_FOUND",
    "message": "Event not found"
  }
}
```

- HTTP status đúng nghĩa (401, 403, 404, 422, 500).
- Không trả `passwordHash`.
- Public endpoints không nhận/trả field admin-only không cần thiết.

## 7. Frontend conventions

- Design tokens chỉ định nghĩa một nơi (`styles/tokens.css` hoặc theme object) — **không hardcode** màu purple/random.
- Server/Client Component: mặc định Server; thêm `"use client"` khi cần tương tác.
- Gọi API qua `lib/api.ts` — không fetch rải URL string khắp component.
- Ảnh poster: `next/image` khi có thể; luôn có `alt`.
- Không thêm card/shadow/glow trừ khi UI doc yêu cầu cho tương tác.

## 8. Prisma / Database

- Mọi đổi schema qua migration — không sửa tay DB staging.
- Seed idempotent càng tốt (upsert admin, upsert event mẫu).
- Query public luôn filter `status: published`.

## 9. Auth & bảo mật

- Hash mật khẩu bằng bcrypt (cost factor hợp lý, vd. 10–12).
- JWT secret chỉ trong env.
- Validate kích thước/MIME upload ảnh.
- Rate-limit login (có thể đơn giản sau MVP; ghi nợ kỹ thuật nếu chưa làm).

## 10. Lint, format, test

| Công cụ | Quy tắc |
| --- | --- |
| ESLint | Bắt buộc pass trước merge |
| Prettier | Format on save / CI |
| Unit | Ưu tiên service/util thuần |
| Manual TC | Bắt buộc theo [`09_Project_TestCase.md`](09_Project_TestCase.md) trước demo |

Script gợi ý trong root `package.json`: `lint`, `format`, `test`, `prisma:migrate`, `prisma:seed`.

## 11. Git commit

Dùng Conventional Commits:

```text
feat(events): add public upcoming list endpoint
fix(ui): correct bronze CTA hover token
docs(trace): sync AC-006 test mapping
chore(repo): add env example
```

- Một commit = một ý.
- Không `--no-verify` trừ khi PO yêu cầu rõ.
- Không force-push `main`.

## 12. Pull request checklist

- [ ] Liên kết Story/PBI/AC
- [ ] Screenshot UI nếu đổi public look
- [ ] Đã chạy lint
- [ ] Không có secret trong diff
- [ ] Cập nhật docs nếu đổi hành vi / schema

## 13. Những việc không làm

- Commit `node_modules`, `.env`, dump DB có PII.
- Copy-paste component từ template tím/indigo rồi “đổi tên quán”.
- Thêm thanh toán / chat phức tạp ngoài backlog Won’t.
- Viết exploit/PoC trong repo.

## 14. Tham chiếu

- Architecture: [`05_Project_ArchitectureDesign.md`](05_Project_ArchitectureDesign.md)
- UI tokens: [`07_Project_UserInterface.md`](07_Project_UserInterface.md)
- Database: [`06_Project_DatabaseDesign.md`](06_Project_DatabaseDesign.md)
