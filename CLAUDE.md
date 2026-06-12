@AGENTS.md

# SubTrack — Project Notes

## Project
Subscription management web app. Stack: Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4, shadcn/ui, Zustand, Prisma 6, SQLite, Recharts, date-fns.

## Current Status
All phases complete. The app is fully built and polished.

- **Phase 1 (Foundation):** Complete — Next.js app shell, Prisma/SQLite, Zustand, API routes
- **Phase 2 (Dashboard):** Complete — stat cards, donut chart, upcoming renewals at /dashboard
- **Phase 3 (Subscription CRUD):** Complete — grid, filters, form, add modal, delete dialog, detail page at /subscriptions
- **Phase 4 (Calendar):** Complete — monthly grid + renewals sidebar at /calendar
- **Auth:** Complete — Supabase Auth with email/password + Google OAuth, protected routes, session persistence, sign-out
- **Phase 5 (Polish):** Complete — see details below

## Database: PostgreSQL via Supabase
The app uses Supabase PostgreSQL (switched from SQLite for Vercel deployment).
Two env vars required — both from Supabase Dashboard → Project Settings → Database:
- `DATABASE_URL` — Transaction pooler URL (port 6543, `?pgbouncer=true`) — used at runtime
- `DIRECT_URL` — Direct/Session URL (port 5432) — used by Prisma migrations

See `.env.example` for the exact format. If env vars change, fully restart the dev server.

## Prisma client location
Prisma uses `provider = "prisma-client-js"` and generates to the standard `node_modules/@prisma/client` path (required for Vercel compatibility). Import from:
- App code: `@prisma/client`
- Seed script: `@prisma/client` (with `import "dotenv/config"` at top)
Run `npx prisma generate` after any schema changes or clean `npm install`.

## Critical: .env changes require full server restart
`pkill -f "next dev"` then `npm run dev`. Hot reload does not reload env vars.

## Dev commands
```bash
npm run dev          # start dev server
npm run db:seed      # npx tsx prisma/seed.ts (re-seeds with 8 sample subscriptions)
npm run db:studio    # open Prisma Studio
npx prisma generate  # regenerate client after schema changes
```

## Supabase Auth
- Supabase clients: `src/lib/supabase/client.ts` (browser), `src/lib/supabase/server.ts` (server/routes)
- Middleware: `middleware.ts` — refreshes session, redirects unauthenticated → `/sign-in`
- Auth pages: `src/app/(auth)/` — sign-in, sign-up, reset-password, update-password
- OAuth callback: `src/app/auth/callback/route.ts`
- App pages: `src/app/(app)/` — dashboard, subscriptions, calendar (protected)
- User hook: `src/hooks/useUser.ts`
- Requires `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- All API routes check `supabase.auth.getUser()` and return 401 if unauthenticated
- Subscription.userId scopes all DB queries to the authenticated user

## Phase 5 — What was added
- **Toast notifications** — `sonner` toasts on all CRUD + pause/resume actions
- **Pause/Resume toggle** — `isActive: Boolean @default(true)` on Subscription schema; paused subs excluded from dashboard stats; "Active / Paused / All" filter on subscriptions page
- **Monthly budget** — `monthlyBudget` in uiStore (persisted to localStorage via `zustand/middleware` persist, key `"subtrack-ui"`); `BudgetCard` on dashboard with progress bar (amber >80%, red over budget)
- **Keyboard shortcuts** — `Cmd/Ctrl+N` opens Add modal; `?` opens shortcut help overlay; `KeyboardShortcuts` component mounted in AppShell
- **Auth split-screen** — Desktop sign-in/sign-up has branded left panel (dark bg, logo, tagline, feature list)
- **Spinner loading states** — `Loader2 animate-spin` on form submit, sign-in, sign-up buttons
- **Fade-in animation** — `animate-fade-in` (defined in globals.css) on `<main>` in AppShell
- **PATCH API endpoint** — `PATCH /api/subscriptions/[id]` for toggling `isActive`

## Key file locations
- DB schema: `prisma/schema.prisma`
- DB file: `prisma/dev.db`
- Types: `src/types/index.ts`
- Constants (categories/colors): `src/lib/constants.ts`
- Utils (formatCurrency, formatDate, etc): `src/lib/utils.ts`
- Prisma singleton: `src/lib/prisma.ts`
- Zustand stores: `src/store/subscriptionStore.ts`, `src/store/uiStore.ts` (uiStore persists monthlyBudget)
- API routes: `src/app/api/subscriptions/route.ts`, `src/app/api/subscriptions/[id]/route.ts`
- Service layer: `src/services/subscription.service.ts`
- Client fetch wrappers: `src/services/api.ts`
- Hooks: `src/hooks/` (useSubscriptions, useDashboardStats, useCalendarEvents, useDebounce)
- Dashboard components: `src/components/dashboard/` (StatCard, BudgetCard, SpendingChart, UpcomingRenewals)
- Subscription components: `src/components/subscriptions/` (Card, Grid, Filters, Form, Modal, DeleteDialog, EmptyState, Skeleton)
- Calendar components: `src/components/calendar/`
- Layout: `src/components/layout/` (AppShell, Sidebar, TopBar, MobileNav)
- Keyboard shortcuts: `src/components/ui/keyboard-shortcuts.tsx`
