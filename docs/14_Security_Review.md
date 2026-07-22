# Security Review — NHÀ Bar (2026-07-20)

**Loaded refs:** `owasp-top10-deep`, `api-security-advanced`, `secret-management`, `supply-chain-security`  
**Skipped (not justified yet):** Vault, WAF, SIEM, mTLS, zero-trust mesh, formal compliance packs.

## Scope

Public Next.js + NestJS read API (no admin auth shipped yet). Threat model: scrape/abuse public API, secret leakage, XSS via SVG/iframes, misconfigured CORS/OG in production.

## Findings

| ID | Severity | OWASP | Finding | Status |
| --- | --- | --- | --- | --- |
| S-01 | Medium | A05 | `metadataBase` hardcode `localhost` → OG/canonical sai khi deploy | Fixed → `SITE_URL` env |
| S-02 | Medium | A01/A05 | CORS chỉ `localhost:3000` (dev port 3002 fail; prod cần allowlist) | Fixed → `WEB_ORIGIN` |
| S-03 | Medium | A05 | Thiếu security headers trên web | Fixed → Next `headers()` CSP/nosniff/Referrer/Permissions |
| S-04 | Medium | A04 | Public API không rate-limit → dễ scrape/DoS nhẹ | Fixed → `@nestjs/throttler` 120/min |
| S-05 | Low | A05 | API thiếu Helmet baseline | Fixed → `helmet` |
| S-06 | Low | A02 | bcrypt cost 10 | Fixed → cost 12 in seed |
| S-07 | Low | A02 | README in mật khẩu seed | Fixed → không echo password trong README |
| S-08 | Info | A03 | `dangerouslyAllowSVG` | Accepted — CSP `script-src 'none'; sandbox` trên image optimizer |
| S-09 | Info | A01 | Admin JWT chưa có | Expected Sprint 2 — hiện không expose admin routes |
| S-10 | Pass | — | `.env` gitignored, không tracked | OK |
| S-11 | DX | — | TS không resolve `*.css` | Fixed → `types/css.d.ts` |

## Residual risk (chấp nhận đến Sprint 2 / deploy)

- JWT auth + admin CRUD chưa có → khi thêm phải: httpOnly cookie hoặc Bearer + guard, không trả `passwordHash`, rate-limit login riêng (ví dụ 5/15 phút).
- CSP web còn `'unsafe-inline'`/`'unsafe-eval'` vì Next/dev — siết khi có nonce pipeline production.
- Map iframe third-party Google — giữ `frame-src` hẹp.
- `npm audit` định kỳ trước release; pin lockfile đã commit.

## Verification

```powershell
npm run test -w @nhabar/api
npm run build -w @nhabar/web
# Headers (khi web chạy):
# Invoke-WebRequest http://localhost:3002 -Method Head | Select -Expand Headers
```

## Stop / escalate

Escalate to heavier controls (WAF/Vault) only if: public production traffic + admin exposed + regulated data. Hiện tại proportional hardening đủ.
