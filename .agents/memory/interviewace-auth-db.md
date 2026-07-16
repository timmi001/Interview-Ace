---
name: InterviewAce auth + DB setup
description: Key decisions for Clerk auth integration and PostgreSQL schema in the InterviewAce app.
---

## Clerk wiring

- `@clerk/react` v6, `@clerk/themes` v2 installed in `artifacts/interviewace`
- `@clerk/express`, `@clerk/shared`, `http-proxy-middleware` installed in `artifacts/api-server`
- `publishableKeyFromHost` from `@clerk/react/internal` IS available (v6 exports `./internal`)
- `@clerk/themes/shadcn.css` IS available as a CSS export — resolves to `dist/themes/shadcn.css` inside pnpm store
- CSS layer order in `index.css`: `@layer theme, base, clerk, components, utilities;` BEFORE `@import 'tailwindcss'`
- `vite.config.ts` requires `tailwindcss({ optimize: false })` for Clerk CSS to survive prod builds

## API routing

- API server artifact slug: `api-server`, preview path `/api-server`
- Frontend calls API at `/api-server/api/...` (Replit proxy strips `/api-server` prefix before forwarding to Express)
- Clerk proxy middleware at `/api/__clerk` in Express → browser hits `/api-server/api/__clerk`
- Auth is cookie-based for web; no bearer token needed in fetch calls

**Why:** pnpm workspace monorepo; each artifact gets its own Replit proxy path equal to its slug.

## Database schema

Tables: `users` (clerk_user_id UNIQUE), `practice_sessions`, `daily_challenge_progress`, `user_streaks`
- `getOrCreateUser(clerkUserId)` in `api-server/src/lib/db.ts` handles JIT provisioning
- Streak logic is in a single UPSERT inside the sessions POST route

## App routing

- `/` → LandingPage (signed-out) or Dashboard (signed-in) via `<Show when="signed-in/out">`
- `/sign-in/*?` and `/sign-up/*?` — the `/*?` optional wildcard is required for Clerk OAuth sub-paths
- `stripBase()` strips BASE_URL prefix from Clerk's routerPush/routerReplace paths (wouter adds it)
