<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Auth & database

- better-auth with the MongoDB adapter (`@better-auth/mongo-adapter`), connected to MongoDB **Atlas** via the `MONGO_DB_URL` env var (required — `src/lib/auth.ts` throws at import time if missing; db name `studiospace`). A driver auth failure (`MongoServerError: bad auth`) only surfaces as an *empty-body 500* on sign-up/sign-in requests — verify connectivity with `node --env-file=.env diag-auth.mjs`.
- `.env` needs `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` (better-auth reads these by convention; there is no `.env.example`).
- All auth endpoints are handled by the catch-all route `src/app/api/auth/[...all]/route.ts` (`toNextJsHandler`); don't create individual `/api/auth/*` handlers.
- Login/register pages live in the route group `src/app/(author)/` — the group stays out of the URL, so paths are `/login` and `/register`. Client-side auth calls use `src/lib/auth-client.ts` (`authClient`, `signIn`, `signUp`, `useSession`).

# Commands

- `npm run dev` — dev server (Turbopack). `npm run build` / `npm start` — production build/serve.
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`). No test framework exists.
- `npx tsc --noEmit` — typecheck (not an npm script; run this before finishing type-heavy changes).

# Stack

- Next.js 16 (App Router) + React 19 with **React Compiler enabled** (`reactCompiler: true` in `next.config.ts`) — no manual `useMemo`/`useCallback` needed for re-render tuning.
- Tailwind CSS v4 via `@tailwindcss/turbopack` — **no `tailwind.config`**; theme tokens are CSS variables in `src/app/globals.css` (`@theme inline`).
- shadcn/ui components live in `src/components/ui`; app-level/generic components in `src/components/shared`.
- Remote `<Image>`/`<img>` hosts must be whitelisted in `next.config.ts` `images.remotePatterns` — only `images.unsplash.com` and `assets.mixkit.co` currently are. A new host needs a new entry or the build/render fails.

# shadcn/ui quirks (base-nova style, NOT stock shadcn)

- This project's "shadcn" is the **base-nova style built on Base UI (`@base-ui/react`), not Radix**. There is no `asChild`; pass links through the `render` prop instead: `<Button render={<Link href="..." />}>Label</Button>`.
- Class merging uses the `cn` npm package — `src/lib/utils.ts` is just `export { cn } from "cn"`, so `import { cn } from "cn"` and `@/lib/utils` both work (`components.json` lists the alias).
- Icons: `lucide-react` (installed via `dependencies`, not `devDependencies`).

# Dark mode

- Class-based: `dark` variant means an ancestor has `.dark` (`@custom-variant dark` in `globals.css`), not a media query.
- No-flash inline script in `src/app/layout.tsx` reads `localStorage["theme"]` before paint; `ThemeToggle.tsx` toggles the class and persists to that key. Keep both in sync if touching theme logic.

# Conventions

- Path alias `@/*` → `src/*`.
- Use client components (`"use client"`) only where interactivity is needed (e.g. local state) — the App Router + RSC setup here renders server components by default.
- Swiper slides import their own CSS inside the component (`swiper/css`, `swiper/css/effect-fade`, …) plus `src/styles/hero-slider.css` — don't move these into `globals.css`.
- Site header component is `src/components/shared/Navber.tsx` (misspelled "Navber" — searching "Navbar" won't find it).
