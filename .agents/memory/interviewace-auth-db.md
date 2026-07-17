---
name: InterviewAce auth + DB setup
description: History of Clerk auth and PostgreSQL being added then removed from InterviewAce.
---

## Current state (Clerk + DB removed)

Clerk auth and PostgreSQL were removed on 2026-07-17 at user request.

The app now renders `<Dashboard />` directly from `App.tsx` — no auth, no routing, no database.
All data in the app is static/mock.

## What was removed

**Frontend (`artifacts/interviewace`):**
- `@clerk/react`, `@clerk/themes` uninstalled
- `src/App.tsx` simplified to a single `<Dashboard />` render
- `src/lib/api.ts` deleted
- `src/index.css` clerk layer (`clerk` in `@layer`) and `@import '@clerk/themes/shadcn.css'` removed
- `public/logo.svg` deleted

**API Server (`artifacts/api-server`):**
- `@clerk/express`, `@clerk/shared`, `http-proxy-middleware`, `pg`, `@types/pg` uninstalled
- `src/middlewares/clerkProxyMiddleware.ts` deleted
- `src/lib/db.ts` deleted
- `src/routes/user.ts` deleted
- `src/routes/index.ts` now only mounts the health router
- `src/app.ts` is plain Express with cors + pino + `/api` router, no Clerk

## Known issue (never resolved)

Google OAuth on the sign-up page was not triggering a redirect. Root cause was not confirmed before removal. Likely culprits:
- The Replit proxy was routing `/api-server/api/...` browser fetches back to the Vite SPA (Vite needed a `server.proxy` config entry to forward those requests to localhost:8080)
- Possible Replit preview iframe sandbox restriction blocking OAuth redirects
