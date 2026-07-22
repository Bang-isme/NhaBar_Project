# NHÀ Bar — Website Project

Hub chính thức cho **NHÀ Bar** (Đà Nẵng): giới thiệu không gian, công bố sự kiện & lineup, khuyến mãi, và quản trị nội dung.

> Tagline: *A place called home* — Chillin’ & Warm Space · Good Music · Good Drinks

## Thông tin quán (nguồn thực tế)

| Hạng mục | Giá trị |
| --- | --- |
| Tên | NHÀ Bar |
| Loại | Café & Bar |
| Địa chỉ | 35 Ngõ Thì Sĩ, Mỹ An, Đà Nẵng, Vietnam |
| Giờ mở cửa | 11:00 AM – Late |
| Mức giá | $$ |
| Định vị | Không gian ấm, nhạc sống / hip-hop, sự kiện cộng đồng |

## Stack kỹ thuật (đã chốt trong tài liệu)

- **Frontend:** Next.js (App Router) — `apps/web`
- **Backend:** NestJS — `apps/api`
- **ORM / DB:** Prisma + SQLite local Sprint 1 (`prisma/dev.db`); Docker Compose Postgres sẵn cho khi mạng/registry ổn
- **Quy trình:** Scrum, 3 sprint × ~2 tuần
- **Kế hoạch code Sprint 1:** [nhabar-sprint1.md](nhabar-sprint1.md)

## Chạy local (Sprint 1)

1. Copy env: `Copy-Item .env.example .env`
2. Cài deps: `npm install`
3. Migrate + seed: `npx prisma migrate dev` rồi `npx prisma db seed`
4. API: `npm run dev:api` → http://localhost:3001/health
5. Web: `npm run dev:web` → http://localhost:3000
6. Test: `npm test`
7. Lint: `npm run lint`

Admin seed (local only): email `admin@nhabar.local` — mật khẩu xem trong `prisma/seed.ts` (đổi trước khi deploy chung).

## Bộ 13 tài liệu dự án

| # | Tài liệu | Đường dẫn |
| --- | --- | --- |
| 1 | Project Proposal | [docs/01_Project_Proposal.md](docs/01_Project_Proposal.md) |
| 2 | Project Plan | [docs/02_ProjectPlan.md](docs/02_ProjectPlan.md) |
| 3 | Product Backlog | [docs/03_ProductBacklog.md](docs/03_ProductBacklog.md) |
| 4 | User Story | [docs/04_Project_UserStory.md](docs/04_Project_UserStory.md) |
| 5 | Architecture Design | [docs/05_Project_ArchitectureDesign.md](docs/05_Project_ArchitectureDesign.md) |
| 6 | Database Design | [docs/06_Project_DatabaseDesign.md](docs/06_Project_DatabaseDesign.md) |
| 7 | User Interface | [docs/07_Project_UserInterface.md](docs/07_Project_UserInterface.md) |
| 8 | Test Plan | [docs/08_Project_TestPlan.md](docs/08_Project_TestPlan.md) |
| 9 | Test Case | [docs/09_Project_TestCase.md](docs/09_Project_TestCase.md) |
| 10 | Sprint Backlog | [docs/10_Project_SprintBacklog.md](docs/10_Project_SprintBacklog.md) |
| 11 | Code Standard | [docs/11_Project_Code_Standard.md](docs/11_Project_Code_Standard.md) |
| 12 | Meeting Report | [docs/12_Project_MeetingReport.md](docs/12_Project_MeetingReport.md) |
| 13 | Reflection | [docs/13_Project_Reflection.md](docs/13_Project_Reflection.md) |
| 15 | UI Reasoning Brief | [docs/15_UI_Reasoning_Brief.md](docs/15_UI_Reasoning_Brief.md) |
| 16 | Hub+Atmosphere+Retention Wireframe | [docs/16_Hub_Atmosphere_Wireframe.md](docs/16_Hub_Atmosphere_Wireframe.md) |

**Bảng truy vết AC:** [docs/_traceability.md](docs/_traceability.md)  
**Security review:** [docs/14_Security_Review.md](docs/14_Security_Review.md)

## Quy ước cập nhật xuyên suốt

1. Đổi yêu cầu / AC → cập nhật `_traceability.md` trước.
2. Đồng bộ Product Backlog, User Story, Test Case trong cùng phiên.
3. Đổi thiết kế → cập nhật Architecture / Database / UI.
4. Quyết định lớn → ghi vào Meeting Report hoặc Reflection.

## Trạng thái hiện tại

- **Phase:** Public site Done + **Sprint 2 Admin Done** (JWT login, CRUD event, lineup).
- **Quyết định lộ trình (2026-07-20):** Sync docs → Admin AC-004/005 (hướng C) — đã thực hiện.
- **Admin UI:** `/admin/login` → `/admin/events`
- **DB local:** SQLite (`file:./dev.db`); `docker-compose.yml` giữ cho PostgreSQL.
- **Meta học thuật:** Trường / GVHD / MSSV dùng placeholder `[Điền sau]`.
