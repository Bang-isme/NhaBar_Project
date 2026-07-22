# NHÀ Bar Sprint 1 Implementation Plan

> **For agentic workers:** Use `$sdd` (codex-subagent-execution) or execute inline.
> Follow `$tdd` (RED-GREEN-REFACTOR) for each implementation step.
> to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the NHÀ Bar monorepo and ship a brand-correct public Home + Contact experience that meets AC-001, AC-007, AC-008, and AC-009.

**Architecture:** npm workspaces monorepo with `apps/web` (Next.js App Router) for public UI and `apps/api` (NestJS) for health/venue APIs; shared Prisma schema at repo root targeting PostgreSQL via Docker Compose. Sprint 1 uses a featured-event mock/API stub so Home can show a featured block before full Events CRUD lands in Sprint 2.

**Tech Stack:** Next.js 15 (App Router), NestJS 10, Prisma 6, PostgreSQL 16, Docker Compose, TypeScript strict, Vitest (API unit), Playwright smoke optional at phase end.

**Scope boundary:** This plan is **Sprint 1 only**. Sprint 2 (Events/Admin/Auth/Lineup) and Sprint 3 (Promo/Gallery) require separate plans after Sprint 1 DoD passes.

**Spec source:** `docs/_traceability.md`, `docs/07_Project_UserInterface.md`, `docs/10_Project_SprintBacklog.md` § Sprint 1, `docs/11_Project_Code_Standard.md`.

---

## 1. Overview

Build the first runnable vertical slice of the NHÀ Bar official website:

- Monorepo scaffolding with lint/format scripts
- PostgreSQL + Prisma schema (full MVP models from DB design; Sprint 1 only seeds venue admin + featured event stub)
- NestJS `GET /health` and `GET /venue`
- Next.js shell with dark bronze/gold tokens, responsive nav, Home hero, Contact page

This matters because the bar currently depends on Facebook feed for discovery; Sprint 1 proves the brand hub and location path before investing in event CMS complexity.

## 2. Success Criteria

- [ ] `docker compose up -d` starts Postgres; `npx prisma migrate deploy` applies schema
- [ ] `npm run dev:api` serves `GET http://localhost:3001/health` → `{ "data": { "status": "ok" } }`
- [ ] `npm run dev:web` serves `/` and `/contact` on `http://localhost:3000`
- [ ] Home shows NHÀ Bar brand hero, one primary CTA “Xem sự kiện”, featured event title + date (AC-001, AC-008)
- [ ] Contact shows address `35 Ngõ Thì Sĩ, Mỹ An, Đà Nẵng`, hours `11:00 AM – Late`, Maps link, Facebook link (AC-007)
- [ ] Viewport 375px and 1280px: nav usable, no horizontal content overflow on Home/Contact (AC-009)
- [ ] CSS tokens match UI doc (`--bg-base`, `--accent-bronze`, …); no purple/cream theme (AC-008)
- [ ] `npm run lint` exits 0; API Vitest health test passes
- [ ] `docs/09_Project_TestCase.md` Result column updated for TC-001, TC-007, TC-008, TC-017, TC-018, TC-019, TC-020 (manual Pass/Fail)
- [ ] No secrets committed; `.env.example` present

## 3. Tech Stack

| Layer | Choice | Rationale |
| --- | --- | --- |
| Web | Next.js App Router | SSR/SSG for public pages; matches Architecture doc |
| API | NestJS | Modular admin/public APIs for Sprint 2+ |
| DB | PostgreSQL + Prisma | Matches Database Design; typed migrations |
| Local DB | Docker Compose | Reproducible without cloud account |
| Fonts | Syne (display) + DM Sans (body) via `next/font/google` | Geometric brand sans; avoid Inter/Roboto default |
| Test | Vitest for API | Fast unit gate for health/venue |

## 4. File Structure

```text
NhaBar_Project/
  package.json                 # workspaces + scripts
  .gitignore
  .env.example
  docker-compose.yml           # postgres:16
  prisma/
    schema.prisma              # full MVP models
    seed.ts                    # admin + featured event stub
  apps/
    api/
      package.json
      tsconfig.json
      nest-cli.json
      vitest.config.ts
      src/
        main.ts
        app.module.ts
        health/
          health.controller.ts
          health.controller.spec.ts
        venue/
          venue.controller.ts
          venue.constants.ts
          venue.controller.spec.ts
        prisma/
          prisma.module.ts
          prisma.service.ts
    web/
      package.json
      tsconfig.json
      next.config.ts
      app/
        layout.tsx
        page.tsx                 # Home
        contact/page.tsx
        events/page.tsx          # placeholder link target for CTA
        globals.css              # design tokens
      components/
        SiteHeader.tsx
        SiteFooter.tsx
        BrandHero.tsx
        FeaturedEvent.tsx
        PrimaryButton.tsx
      lib/
        venue.ts
        featured-event.ts
        api.ts
  docs/                        # existing (update TestCase results only)
  nhabar-sprint1.md            # this plan
```

**Responsibility rules**

- `venue.constants.ts` / `lib/venue.ts` — single source for address/hours/Facebook
- `globals.css` — only place for color tokens
- `featured-event.ts` — Sprint 1 stub; replace with API client in Sprint 2
- Controllers stay thin; no business logic in React pages

## 5. Task Breakdown

### Task 1: Root workspace + ignore + env example

**Domain:** backend | **Priority:** P0  
**Dependencies:** none  
**Input:** empty repo (docs only)  
**Output:** root tooling files  
**Verify:** files exist; `git status` shows them untracked  
**Rollback:** delete created root files

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `docker-compose.yml`

- [ ] **Step 1: Write root `package.json`**

```json
{
  "name": "nhabar-project",
  "private": true,
  "workspaces": ["apps/*"],
  "scripts": {
    "dev:web": "npm run dev -w @nhabar/web",
    "dev:api": "npm run start:dev -w @nhabar/api",
    "lint": "npm run lint -w @nhabar/web && npm run lint -w @nhabar/api",
    "test": "npm run test -w @nhabar/api",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:seed": "prisma db seed"
  },
  "devDependencies": {
    "prisma": "^6.5.0",
    "tsx": "^4.19.3",
    "typescript": "^5.8.2"
  },
  "dependencies": {
    "@prisma/client": "^6.5.0"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

- [ ] **Step 2: Write `.gitignore`**

```gitignore
node_modules
.next
dist
coverage
.env
.env.local
uploads
*.log
.DS_Store
```

- [ ] **Step 3: Write `.env.example`**

```env
DATABASE_URL="postgresql://nhabar:nhabar@localhost:5432/nhabar?schema=public"
API_PORT=3001
NEXT_PUBLIC_API_URL="http://localhost:3001"
JWT_SECRET="change-me-in-local-only"
```

- [ ] **Step 4: Write `docker-compose.yml`**

```yaml
services:
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: nhabar
      POSTGRES_PASSWORD: nhabar
      POSTGRES_DB: nhabar
    ports:
      - "5432:5432"
    volumes:
      - nhabar_pg:/var/lib/postgresql/data

volumes:
  nhabar_pg:
```

- [ ] **Step 5: Verify files exist**

```powershell
Test-Path package.json, .gitignore, .env.example, docker-compose.yml
```

Expected: all `True`

---

### Task 2: Prisma schema + seed stub

**Domain:** backend | **Priority:** P0  
**Dependencies:** Task 1  
**Input:** Database Design §6  
**Output:** `prisma/schema.prisma`, `prisma/seed.ts`  
**Verify:** `npx prisma validate`  
**Rollback:** remove `prisma/`

**Files:**
- Create: `prisma/schema.prisma`
- Create: `prisma/seed.ts`

- [ ] **Step 1: Write failing validate expectation (schema missing)**

```powershell
npx prisma validate
```

Expected before schema: FAIL / error finding schema

- [ ] **Step 2: Write `prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum EventStatus {
  draft
  published
  hidden
}

model User {
  id           String      @id @default(uuid())
  email        String      @unique
  passwordHash String
  displayName  String
  role         String      @default("ADMIN")
  createdAt    DateTime    @default(now())
  events       Event[]
  promotions   Promotion[]
  media        MediaAsset[]
}

model Event {
  id           String        @id @default(uuid())
  slug         String        @unique
  title        String
  description  String?
  startsAt     DateTime
  endsAt       DateTime?
  posterUrl    String?
  status       EventStatus   @default(draft)
  isFeatured   Boolean       @default(false)
  collaborator String?
  createdById  String
  createdBy    User          @relation(fields: [createdById], references: [id])
  lineup       EventArtist[]
  media        MediaAsset[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt

  @@index([status, startsAt])
}

model Artist {
  id        String        @id @default(uuid())
  stageName String        @unique
  bio       String?
  socialUrl String?
  avatarUrl String?
  events    EventArtist[]
  createdAt DateTime      @default(now())
}

model EventArtist {
  id        String @id @default(uuid())
  eventId   String
  artistId  String
  roleLabel String
  sortOrder Int    @default(0)
  event     Event  @relation(fields: [eventId], references: [id], onDelete: Cascade)
  artist    Artist @relation(fields: [artistId], references: [id])

  @@unique([eventId, artistId])
  @@index([eventId, sortOrder])
}

model Promotion {
  id          String    @id @default(uuid())
  title       String
  description String?
  isActive    Boolean   @default(true)
  startsAt    DateTime
  endsAt      DateTime?
  bannerUrl   String?
  createdById String
  createdBy   User      @relation(fields: [createdById], references: [id])
}

model MediaAsset {
  id           String   @id @default(uuid())
  eventId      String
  url          String
  altText      String?
  sortOrder    Int      @default(0)
  uploadedById String
  event        Event    @relation(fields: [eventId], references: [id], onDelete: Cascade)
  uploadedBy   User     @relation(fields: [uploadedById], references: [id])
  createdAt    DateTime @default(now())
}
```

- [ ] **Step 3: Write `prisma/seed.ts`**

```typescript
import { PrismaClient, EventStatus } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@nhabar.local" },
    update: {},
    create: {
      email: "admin@nhabar.local",
      passwordHash,
      displayName: "NHÀ Bar Admin",
      role: "ADMIN",
    },
  });

  await prisma.event.upsert({
    where: { slug: "jump-out-da-house-rapshow" },
    update: {
      isFeatured: true,
      status: EventStatus.published,
    },
    create: {
      slug: "jump-out-da-house-rapshow",
      title: "JUMP OUT DA HOUSE // RAPSHOW",
      description: "Freestyle Rap Battle & Rap Show by Midside Hustlers.",
      startsAt: new Date("2026-07-10T19:00:00+07:00"),
      status: EventStatus.published,
      isFeatured: true,
      collaborator: "By Midside Hustlers",
      posterUrl: "/posters/jump-out-da-house.svg",
      createdById: admin.id,
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

- [ ] **Step 4: Add bcrypt dependency at root and validate**

```powershell
Copy-Item .env.example .env
npm install
npm install bcryptjs
npm install -D @types/bcryptjs
npx prisma validate
```

Expected: `The schema at prisma/schema.prisma is valid 🚀`

---

### Task 3: Start Postgres and migrate

**Domain:** backend | **Priority:** P0  
**Dependencies:** Task 2  
**Input:** `docker-compose.yml`, schema  
**Output:** running DB + migration  
**Verify:** migrate succeeds; seed inserts featured event  
**Rollback:** `docker compose down -v`

**Evidence:** migrate stdout shows `Applied`; `npx prisma studio` optional

- [ ] **Step 1: Start database**

```powershell
docker compose up -d
docker compose ps
```

Expected: `db` state running/healthy

- [ ] **Step 2: Create and apply initial migration**

```powershell
npx prisma migrate dev --name init
npx prisma db seed
```

Expected: migration applied; seed completes without error

- [ ] **Step 3: Verify featured event exists**

```powershell
npx prisma db execute --stdin
```

Use Prisma Studio or:

```powershell
node -e "const {PrismaClient}=require('@prisma/client'); const p=new PrismaClient(); p.event.findFirst({where:{isFeatured:true}}).then(e=>{console.log(e.title); return p.$disconnect()})"
```

Expected stdout contains: `JUMP OUT DA HOUSE // RAPSHOW`

---

### Task 4: NestJS API scaffold + failing health test

**Domain:** backend | **Priority:** P0  
**Dependencies:** Task 1  
**Input:** Architecture § Health  
**Output:** `apps/api` package with failing health spec  
**Verify:** `npm run test -w @nhabar/api` fails (controller missing or assertion fail)  
**Rollback:** delete `apps/api`

**Files:**
- Create: `apps/api/package.json`
- Create: `apps/api/tsconfig.json`
- Create: `apps/api/nest-cli.json`
- Create: `apps/api/vitest.config.ts`
- Create: `apps/api/src/health/health.controller.spec.ts`

- [ ] **Step 1: Write `apps/api/package.json`**

```json
{
  "name": "@nhabar/api",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "start:dev": "nest start --watch",
    "build": "nest build",
    "lint": "eslint \"src/**/*.ts\"",
    "test": "vitest run"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.12",
    "@nestjs/core": "^11.0.12",
    "@nestjs/platform-express": "^11.0.12",
    "@prisma/client": "^6.5.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.2"
  },
  "devDependencies": {
    "@nestjs/cli": "^11.0.5",
    "@nestjs/testing": "^11.0.12",
    "@types/node": "^22.13.10",
    "eslint": "^9.22.0",
    "typescript": "^5.8.2",
    "typescript-eslint": "^8.26.1",
    "vitest": "^3.0.8"
  }
}
```

- [ ] **Step 2: Write Vitest config + failing health spec**

`apps/api/vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
});
```

`apps/api/src/health/health.controller.spec.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { HealthController } from "./health.controller";

describe("HealthController", () => {
  it("returns ok payload", () => {
    const controller = new HealthController();
    expect(controller.getHealth()).toEqual({
      data: { status: "ok" },
    });
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```powershell
cd d:\NhaBar_Project
npm install
npm run test -w @nhabar/api
```

Expected: FAIL — cannot find module `./health.controller` or similar

---

### Task 5: Implement NestJS health + venue + Prisma module (GREEN)

**Domain:** backend | **Priority:** P0  
**Dependencies:** Task 4, Task 3  
**Input:** failing health test; venue constants from UI/Proposal  
**Output:** runnable API on port 3001  
**Verify:** health test PASS; curl health + venue  
**Rollback:** revert `apps/api/src`

**Files:**
- Create: `apps/api/tsconfig.json`
- Create: `apps/api/nest-cli.json`
- Create: `apps/api/src/main.ts`
- Create: `apps/api/src/app.module.ts`
- Create: `apps/api/src/health/health.controller.ts`
- Create: `apps/api/src/venue/venue.constants.ts`
- Create: `apps/api/src/venue/venue.controller.ts`
- Create: `apps/api/src/venue/venue.controller.spec.ts`
- Create: `apps/api/src/prisma/prisma.service.ts`
- Create: `apps/api/src/prisma/prisma.module.ts`

- [ ] **Step 1: Minimal Nest config files**

`apps/api/tsconfig.json`:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

`apps/api/nest-cli.json`:

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}
```

- [ ] **Step 2: Implement health controller**

```typescript
import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  getHealth() {
    return { data: { status: "ok" } };
  }
}
```

- [ ] **Step 3: Implement venue constants + controller**

`apps/api/src/venue/venue.constants.ts`:

```typescript
export const VENUE = {
  name: "NHÀ Bar",
  tagline: "A place called home",
  address: "35 Ngõ Thì Sĩ, Mỹ An, Đà Nẵng, Vietnam",
  hours: "11:00 AM – Late",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=35+Ngo+Thi+Si+My+An+Da+Nang",
  facebookUrl: "https://www.facebook.com/nhabar",
  priceRange: "$$",
} as const;
```

`apps/api/src/venue/venue.controller.ts`:

```typescript
import { Controller, Get } from "@nestjs/common";
import { VENUE } from "./venue.constants";

@Controller("venue")
export class VenueController {
  @Get()
  getVenue() {
    return { data: VENUE };
  }
}
```

`apps/api/src/venue/venue.controller.spec.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { VenueController } from "./venue.controller";

describe("VenueController", () => {
  it("returns Da Nang address and late hours", () => {
    const controller = new VenueController();
    const { data } = controller.getVenue();
    expect(data.address).toContain("35 Ngõ Thì Sĩ");
    expect(data.hours).toContain("11:00");
    expect(data.hours).toContain("Late");
    expect(data.facebookUrl).toContain("facebook.com");
  });
});
```

- [ ] **Step 4: Prisma service + app module + main**

`apps/api/src/prisma/prisma.service.ts`:

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

`apps/api/src/prisma/prisma.module.ts`:

```typescript
import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

`apps/api/src/app.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { HealthController } from "./health/health.controller";
import { VenueController } from "./venue/venue.controller";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [HealthController, VenueController],
})
export class AppModule {}
```

`apps/api/src/main.ts`:

```typescript
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://localhost:3000"],
  });
  const port = Number(process.env.API_PORT ?? 3001);
  await app.listen(port);
}

bootstrap();
```

- [ ] **Step 5: Run tests and smoke HTTP**

```powershell
npm run test -w @nhabar/api
npm run start:dev -w @nhabar/api
```

In a second shell:

```powershell
Invoke-RestMethod http://localhost:3001/health
Invoke-RestMethod http://localhost:3001/venue
```

Expected: `data.status = ok`; venue address contains `Ngõ Thì Sĩ`

---

### Task 6: Next.js app scaffold + token CSS (RED visual contract via snapshot file)

**Domain:** frontend | **Priority:** P0  
**Dependencies:** Task 1  
**Input:** UI design tokens  
**Output:** `apps/web` with `globals.css` tokens  
**Verify:** Next builds; CSS file contains exact token hex values  
**Rollback:** delete `apps/web`

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/next.config.ts`
- Create: `apps/web/app/globals.css`
- Create: `apps/web/app/layout.tsx`
- Create: `apps/web/lib/tokens.test.ts` (node assert script via vitest optional — use simple node test)

- [ ] **Step 1: Write token contract test file first**

`apps/web/lib/tokens.test.ts`:

```typescript
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect } from "vitest";

describe("design tokens", () => {
  it("defines NHÀ Bar dark bronze palette", () => {
    const css = readFileSync(
      resolve(__dirname, "../app/globals.css"),
      "utf8",
    );
    expect(css).toContain("--bg-base: #0B0B0C");
    expect(css).toContain("--accent-bronze: #B08D57");
    expect(css).toContain("--accent-bronze-hover: #C9A66B");
    expect(css).not.toContain("#7C3AED");
  });
});
```

- [ ] **Step 2: Run to verify fail**

After creating web package with vitest, run:

```powershell
npm run test -w @nhabar/web
```

Expected: FAIL — missing `globals.css` or tokens

- [ ] **Step 3: Write `apps/web/package.json` and configs**

```json
{
  "name": "@nhabar/web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "^15.2.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.13.10",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "eslint": "^9.22.0",
    "eslint-config-next": "^15.2.2",
    "typescript": "^5.8.2",
    "vitest": "^3.0.8"
  }
}
```

`apps/web/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`apps/web/next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

`apps/web/vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
});
```

- [ ] **Step 4: Write `globals.css` tokens + base layout shell**

`apps/web/app/globals.css`:

```css
:root {
  --bg-base: #0B0B0C;
  --bg-elevated: #161618;
  --text-primary: #F4F1EC;
  --text-muted: #A39E96;
  --accent-bronze: #B08D57;
  --accent-bronze-hover: #C9A66B;
  --danger: #C45C4A;
  --border-subtle: #2A2A2E;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 40px;
  --space-6: 64px;
  --max-content: 1120px;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  background: var(--bg-base);
  color: var(--text-primary);
}

body {
  font-family: var(--font-body), system-ui, sans-serif;
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

:focus-visible {
  outline: 2px solid var(--accent-bronze);
  outline-offset: 2px;
}

.container {
  width: min(100% - 2rem, var(--max-content));
  margin-inline: auto;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--border-subtle);
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a[aria-current="page"] {
  color: var(--accent-bronze);
}

.brand-lockup {
  font-family: var(--font-display), sans-serif;
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.05;
  text-transform: uppercase;
}

.brand-lockup span {
  display: block;
}

.hero {
  min-height: calc(100vh - 120px);
  display: grid;
  align-content: center;
  gap: var(--space-4);
  padding: var(--space-5) 0;
  animation: heroFade 0.7s ease-out;
}

@keyframes heroFade {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-family: var(--font-display), sans-serif;
  font-size: clamp(2.75rem, 8vw, 5rem);
  font-weight: 500;
  letter-spacing: 0.06em;
  margin: 0;
  text-transform: uppercase;
}

.hero-support {
  max-width: 28rem;
  color: var(--text-muted);
  font-size: 1.05rem;
  margin: 0;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.25rem;
  background: var(--accent-bronze);
  color: #0B0B0C;
  border: none;
  font-weight: 600;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: var(--accent-bronze-hover);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
}

.featured {
  margin: var(--space-6) 0;
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-subtle);
}

.featured h2 {
  font-family: var(--font-display), sans-serif;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.95rem;
  color: var(--text-muted);
}

.featured-title {
  font-size: clamp(1.4rem, 3vw, 2rem);
  margin: var(--space-2) 0;
}

.site-footer {
  border-top: 1px solid var(--border-subtle);
  padding: var(--space-4) 0;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.contact-grid {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-5) 0;
}

@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: 1.2fr 1fr;
  }
}
```

`apps/web/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "NHÀ Bar — A place called home",
  description: "Café & Bar in Da Nang. Good music, good drinks, warm space.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="container">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Re-run token test**

```powershell
npm install
npm run test -w @nhabar/web
```

Expected: PASS for design tokens (header/footer components may still be missing — create stubs next task if layout import fails; implement header/footer in Task 7 before `next build`).

---

### Task 7: Shared venue lib + shell components

**Domain:** frontend | **Priority:** P0  
**Dependencies:** Task 6  
**Input:** venue constants  
**Output:** header/footer/button; venue lib  
**Verify:** TypeScript resolves imports; unit test for venue address  
**Rollback:** remove components

**Files:**
- Create: `apps/web/lib/venue.ts`
- Create: `apps/web/lib/venue.test.ts`
- Create: `apps/web/components/SiteHeader.tsx`
- Create: `apps/web/components/SiteFooter.tsx`
- Create: `apps/web/components/PrimaryButton.tsx`

- [ ] **Step 1: Write failing venue test**

```typescript
import { describe, it, expect } from "vitest";
import { VENUE } from "./venue";

describe("VENUE", () => {
  it("matches NHÀ Bar Da Nang facts", () => {
    expect(VENUE.address).toBe("35 Ngõ Thì Sĩ, Mỹ An, Đà Nẵng, Vietnam");
    expect(VENUE.hours).toBe("11:00 AM – Late");
    expect(VENUE.facebookUrl).toContain("facebook.com");
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

```powershell
npm run test -w @nhabar/web
```

Expected: FAIL module not found `./venue`

- [ ] **Step 3: Implement venue + components**

`apps/web/lib/venue.ts`:

```typescript
export const VENUE = {
  name: "NHÀ Bar",
  tagline: "A place called home",
  supportLine: "Chillin’ · Music · Drinks",
  address: "35 Ngõ Thì Sĩ, Mỹ An, Đà Nẵng, Vietnam",
  addressShort: "35 Ngõ Thì Sĩ, Mỹ An, Đà Nẵng",
  hours: "11:00 AM – Late",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=35+Ngo+Thi+Si+My+An+Da+Nang",
  facebookUrl: "https://www.facebook.com/nhabar",
} as const;
```

`apps/web/components/PrimaryButton.tsx`:

```tsx
import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

export function PrimaryButton({
  href,
  children,
  variant = "primary",
}: Props) {
  const className = variant === "primary" ? "btn-primary" : "btn-ghost";
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}
```

`apps/web/components/SiteHeader.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link href="/" className="brand-lockup" aria-label="NHÀ Bar home">
        <span>NHÀ</span>
        <span>BAR</span>
      </Link>
      <nav aria-label="Primary">
        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

`apps/web/components/SiteFooter.tsx`:

```tsx
import { VENUE } from "@/lib/venue";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>{VENUE.addressShort}</p>
      <p>
        <a href={VENUE.facebookUrl} target="_blank" rel="noreferrer">
          Facebook
        </a>
      </p>
    </footer>
  );
}
```

- [ ] **Step 4: Run tests PASS**

```powershell
npm run test -w @nhabar/web
```

Expected: PASS

---

### Task 8: Home page — BrandHero + FeaturedEvent (AC-001, AC-008)

**Domain:** frontend | **Priority:** P0  
**Dependencies:** Task 7  
**Input:** UI Home wireframe; seed featured event  
**Output:** `/` page  
**Verify:** page renders brand + CTA + featured title; brand test checklist  
**Rollback:** revert `app/page.tsx` and hero components

**Files:**
- Create: `apps/web/lib/featured-event.ts`
- Create: `apps/web/lib/api.ts`
- Create: `apps/web/components/BrandHero.tsx`
- Create: `apps/web/components/FeaturedEvent.tsx`
- Create: `apps/web/app/page.tsx`
- Create: `apps/web/app/events/page.tsx`

- [ ] **Step 1: Write featured-event helper test (RED)**

`apps/web/lib/featured-event.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { formatEventDate, FALLBACK_FEATURED } from "./featured-event";

describe("featured-event", () => {
  it("formats startsAt in vi-VN style with day month", () => {
    const label = formatEventDate("2026-07-10T19:00:00+07:00");
    expect(label).toMatch(/10/);
    expect(label).toMatch(/7|07|tháng/i);
  });

  it("fallback featured keeps JUMP OUT title", () => {
    expect(FALLBACK_FEATURED.title).toContain("JUMP OUT DA HOUSE");
  });
});
```

- [ ] **Step 2: Run test — FAIL**

```powershell
npm run test -w @nhabar/web
```

Expected: FAIL missing module

- [ ] **Step 3: Implement featured helpers + Home UI**

`apps/web/lib/featured-event.ts`:

```typescript
export type FeaturedEventData = {
  slug: string;
  title: string;
  startsAt: string;
};

export const FALLBACK_FEATURED: FeaturedEventData = {
  slug: "jump-out-da-house-rapshow",
  title: "JUMP OUT DA HOUSE // RAPSHOW",
  startsAt: "2026-07-10T19:00:00+07:00",
};

export function formatEventDate(iso: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}
```

`apps/web/lib/api.ts`:

```typescript
import { FALLBACK_FEATURED, type FeaturedEventData } from "./featured-event";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function getFeaturedEvent(): Promise<FeaturedEventData> {
  try {
    const res = await fetch(`${API_URL}/events/featured`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return FALLBACK_FEATURED;
    const json = (await res.json()) as { data: FeaturedEventData };
    return json.data ?? FALLBACK_FEATURED;
  } catch {
    return FALLBACK_FEATURED;
  }
}
```

`apps/web/components/BrandHero.tsx`:

```tsx
import { PrimaryButton } from "@/components/PrimaryButton";
import { VENUE } from "@/lib/venue";

export function BrandHero() {
  return (
    <section className="hero" aria-labelledby="brand-hero-title">
      <p className="brand-lockup" style={{ color: "var(--accent-bronze)" }}>
        <span>NHÀ</span>
        <span>BAR</span>
      </p>
      <h1 id="brand-hero-title" className="hero-title">
        {VENUE.name}
      </h1>
      <p className="hero-support">
        {VENUE.tagline} — {VENUE.supportLine}
      </p>
      <div className="cta-row">
        <PrimaryButton href="/events">Xem sự kiện</PrimaryButton>
        <PrimaryButton href="/contact" variant="ghost">
          Liên hệ
        </PrimaryButton>
      </div>
    </section>
  );
}
```

`apps/web/components/FeaturedEvent.tsx`:

```tsx
import Link from "next/link";
import {
  formatEventDate,
  type FeaturedEventData,
} from "@/lib/featured-event";

export function FeaturedEvent({ event }: { event: FeaturedEventData }) {
  return (
    <section className="featured" aria-labelledby="featured-heading">
      <h2 id="featured-heading">Sắp tới</h2>
      <p className="featured-title">
        <Link href={`/events/${event.slug}`}>{event.title}</Link>
      </p>
      <p style={{ color: "var(--text-muted)" }}>
        {formatEventDate(event.startsAt)}
      </p>
    </section>
  );
}
```

`apps/web/app/page.tsx`:

```tsx
import { BrandHero } from "@/components/BrandHero";
import { FeaturedEvent } from "@/components/FeaturedEvent";
import { getFeaturedEvent } from "@/lib/api";

export default async function HomePage() {
  const featured = await getFeaturedEvent();
  return (
    <>
      <BrandHero />
      <FeaturedEvent event={featured} />
    </>
  );
}
```

`apps/web/app/events/page.tsx`:

```tsx
export default function EventsPlaceholderPage() {
  return (
    <section className="contact-grid">
      <div>
        <h1 className="hero-title" style={{ fontSize: "2rem" }}>
          Sự kiện
        </h1>
        <p className="hero-support">
          Danh sách sự kiện đầy đủ sẽ có ở Sprint 2. Follow Facebook để không bỏ
          lỡ show.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run unit tests + build**

```powershell
npm run test -w @nhabar/web
npm run build -w @nhabar/web
```

Expected: tests PASS; Next build succeeds

---

### Task 9: Contact page (AC-007)

**Domain:** frontend | **Priority:** P0  
**Dependencies:** Task 7  
**Input:** Contact requirements  
**Output:** `/contact`  
**Verify:** manual + optional string test; Maps + Facebook links work  
**Rollback:** delete `app/contact`

**Files:**
- Create: `apps/web/app/contact/page.tsx`

- [ ] **Step 1: Write contact page**

```tsx
import { VENUE } from "@/lib/venue";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function ContactPage() {
  return (
    <section className="contact-grid" aria-labelledby="contact-title">
      <div>
        <h1 id="contact-title" className="hero-title" style={{ fontSize: "2.5rem" }}>
          Liên hệ
        </h1>
        <p className="hero-support">
          Ghé NHÀ Bar — không gian ấm, nhạc hay, đồ uống tử tế.
        </p>
        <dl>
          <dt style={{ color: "var(--text-muted)" }}>Địa chỉ</dt>
          <dd>{VENUE.address}</dd>
          <dt style={{ color: "var(--text-muted)" }}>Giờ mở cửa</dt>
          <dd>{VENUE.hours}</dd>
        </dl>
        <div className="cta-row" style={{ marginTop: "var(--space-4)" }}>
          <PrimaryButton href={VENUE.mapsUrl}>Mở Google Maps</PrimaryButton>
          <PrimaryButton href={VENUE.facebookUrl} variant="ghost">
            Facebook NHÀ Bar
          </PrimaryButton>
        </div>
      </div>
      <div
        style={{
          minHeight: 280,
          border: "1px solid var(--border-subtle)",
          background: "var(--bg-elevated)",
          display: "grid",
          placeItems: "center",
          padding: "var(--space-4)",
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--text-muted)" }}>
          Bản đồ nhúng / chỉ đường qua Google Maps.
          <br />
          <a href={VENUE.mapsUrl} target="_blank" rel="noreferrer">
            {VENUE.addressShort}
          </a>
        </p>
      </div>
    </section>
  );
}
```

Note: `PrimaryButton` uses `next/link`. For external URLs, switch implementation:

Update `PrimaryButton` to support external:

```tsx
import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

export function PrimaryButton({
  href,
  children,
  variant = "primary",
}: Props) {
  const className = variant === "primary" ? "btn-primary" : "btn-ghost";
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 2: Verify page**

```powershell
npm run dev:web
```

Open `http://localhost:3000/contact` — confirm address, hours, Maps, Facebook (AC-007).

---

### Task 10: Optional Sprint-1 featured API endpoint (aligns Home fetch)

**Domain:** backend | **Priority:** P1  
**Dependencies:** Task 5, Task 3  
**Input:** seeded featured event  
**Output:** `GET /events/featured`  
**Verify:** Vitest + HTTP returns JUMP OUT title  
**Rollback:** remove events module

**Files:**
- Create: `apps/api/src/events/events.controller.ts`
- Create: `apps/api/src/events/events.service.ts`
- Create: `apps/api/src/events/events.service.spec.ts`
- Modify: `apps/api/src/app.module.ts`

- [ ] **Step 1: Write failing service test**

```typescript
import { describe, it, expect, vi } from "vitest";
import { EventsService } from "./events.service";

describe("EventsService.getFeatured", () => {
  it("returns published featured event fields", async () => {
    const prisma = {
      event: {
        findFirst: vi.fn().mockResolvedValue({
          slug: "jump-out-da-house-rapshow",
          title: "JUMP OUT DA HOUSE // RAPSHOW",
          startsAt: new Date("2026-07-10T12:00:00.000Z"),
        }),
      },
    };
    const service = new EventsService(prisma as never);
    const result = await service.getFeatured();
    expect(result?.title).toContain("JUMP OUT");
    expect(prisma.event.findFirst).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run FAIL then implement**

```typescript
import { Injectable } from "@nestjs/common";
import { EventStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async getFeatured() {
    return this.prisma.event.findFirst({
      where: { status: EventStatus.published, isFeatured: true },
      orderBy: { startsAt: "asc" },
      select: { slug: true, title: true, startsAt: true },
    });
  }
}
```

```typescript
import { Controller, Get, NotFoundException } from "@nestjs/common";
import { EventsService } from "./events.service";

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get("featured")
  async getFeatured() {
    const event = await this.eventsService.getFeatured();
    if (!event) throw new NotFoundException({
      error: { code: "FEATURED_NOT_FOUND", message: "No featured event" },
    });
    return {
      data: {
        slug: event.slug,
        title: event.title,
        startsAt: event.startsAt.toISOString(),
      },
    };
  }
}
```

Wire providers/controllers into `AppModule`.

- [ ] **Step 3: Verify**

```powershell
npm run test -w @nhabar/api
Invoke-RestMethod http://localhost:3001/events/featured
```

Expected: featured title present

---

### Task 11: Responsive + brand manual verification (AC-009, AC-008)

**Domain:** frontend | **Priority:** P0  
**Dependencies:** Task 8, Task 9  
**Input:** Test cases TC-017…020  
**Output:** updated `docs/09_Project_TestCase.md` results  
**Verify:** checklist below all Pass  
**Rollback:** N/A (docs only)

**Evidence & monitoring**

- Evidence: screenshots at 375px and 1280px for `/` and `/contact`
- Monitor: CTA min height ≥ 44px; no purple background; hero brand readable without nav
- Drift: cream full-page background or Inter-only default stack
- Fallback: fix tokens in `globals.css`; keep fallback featured if API down

- [ ] **Step 1: Manual checklist**

| Check | AC | Pass? |
| --- | --- | --- |
| Home brand-first without nav still reads NHÀ Bar | AC-008 | |
| Dark bg `#0B0B0C`, bronze CTA | AC-008 | |
| Contact address + hours + maps + FB | AC-007 | |
| 375px nav + CTA tappable | AC-009 | |
| 1280px no horizontal overflow | AC-009 | |
| Featured block shows title + date | AC-001 | |

- [ ] **Step 2: Update TestCase results**

Set Result `Pass` or `Fail` for TC-001, TC-007, TC-008, TC-017, TC-018, TC-019, TC-020 in `docs/09_Project_TestCase.md`.

- [ ] **Step 3: Update Sprint Backlog statuses**

Mark S1-T01…S1-T07 Done/In Progress in `docs/10_Project_SprintBacklog.md`.

---

### Task 12: README runbook + lint gate

**Domain:** backend | **Priority:** P1  
**Dependencies:** Tasks 1–10  
**Input:** working scripts  
**Output:** README section How to run; lint clean  
**Verify:** `npm run lint` and `npm test` exit 0  
**Rollback:** revert README

**Files:**
- Modify: `README.md`
- Create: minimal ESLint configs if `next lint` / api lint require them

- [ ] **Step 1: Append runbook to README**

```markdown
## Chạy local (Sprint 1)

1. Copy env: `Copy-Item .env.example .env`
2. Start DB: `docker compose up -d`
3. Migrate + seed: `npx prisma migrate dev` then `npx prisma db seed`
4. API: `npm run dev:api` → http://localhost:3001/health
5. Web: `npm run dev:web` → http://localhost:3000
6. Test: `npm test`
7. Lint: `npm run lint`
```

- [ ] **Step 2: Run gate commands**

```powershell
npm test
npm run lint
npm run build -w @nhabar/web
```

Expected: all exit code 0

- [ ] **Step 3: Commit (only when user asks to commit)**

Do not commit unless the user explicitly requests a git commit. Stage when asked:

```powershell
git add package.json .gitignore .env.example docker-compose.yml prisma apps docs/09_Project_TestCase.md docs/10_Project_SprintBacklog.md README.md nhabar-sprint1.md
```

## 5.5 Evidence & Monitoring

| Signal | Healthy | Red / drift | Fallback |
| --- | --- | --- | --- |
| `/health` | `status: ok` | 5xx / connection refused | Restart API; check port 3001 |
| Home hero | Brand + CTA visible &lt;3s feel | White/purple theme or missing CTA | Restore `globals.css` tokens + `BrandHero` |
| Featured | Title from API or fallback | Empty featured with no fallback | `FALLBACK_FEATURED` always in `getFeaturedEvent` |
| Contact | Address string exact match | Wrong/missing hours | Fix `lib/venue.ts` only |
| Postgres | migrate + seed OK | Auth failed / port busy | `docker compose down -v` then up; free 5432 |

## 6. Phase 1 Verification Checklist

- [ ] Docker Postgres running
- [ ] Prisma migrate + seed applied
- [ ] API health + venue + featured endpoints respond
- [ ] Web `/` and `/contact` match AC-001/007/008/009
- [ ] `npm test` pass (api + web)
- [ ] `npm run lint` pass
- [ ] `npm run build -w @nhabar/web` pass
- [ ] TestCase Results updated for Sprint 1 TCs
- [ ] No `.env` committed
- [ ] `$gate` / `run_gate.py` reviewed on project after code exists

## 7. Self-Review

**Spec coverage (Sprint 1 AC)**

| AC | Tasks |
| --- | --- |
| AC-001 | Task 8, 10, 11 |
| AC-007 | Task 5 venue, Task 9, 11 |
| AC-008 | Task 6, 7, 8, 11 |
| AC-009 | Task 6 CSS 44px CTA, Task 7 header, Task 11 |
| S1 scaffold | Task 1–5 |
| Trace docs update | Task 11–12 |

**Out of this plan (intentional):** AC-002…006, AC-010, admin auth, full events list/detail CRUD, promo, gallery → Sprint 2/3 plans.

**Placeholder scan:** none intentionally left as TBD for Sprint 1 implementation steps.

**Type consistency:** `FeaturedEventData` uses `slug`, `title`, `startsAt: string` on both API response mapping and web fallback.

## 8. Follow-on plans (do not execute here)

1. `nhabar-sprint2.md` — Events list/detail, JWT admin, CRUD, lineup (AC-002…005)
2. `nhabar-sprint3.md` — Promo, gallery, polish, full regression (AC-006, AC-010)

---

**Plan complete and saved to `./nhabar-sprint1.md`. Two execution options:**

**1. Subagent-Driven (`$sdd`)** — dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — execute tasks in this session, batch with checkpoints (run gate every ~3 tasks)

**Which approach?**
