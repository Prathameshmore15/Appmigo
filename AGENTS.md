# Agent Rules — Appmigo

## Stack

- **Next.js 16.2.12** (App Router) — breaking changes from earlier versions. Read `node_modules/next/dist/docs/` before modifying routing or config.
- **React 19.2.4**, **Tailwind CSS v4** (PostCSS plugin via `@tailwindcss/postcss`), **TypeScript 5**
- No test runner configured; `package.json` has no `test` script.

## Commands

```bash
npm run dev          # dev server (Turbopack enabled)
npm run build        # production build
npm run lint         # eslint (flat config, eslint-config-next)
```

No typecheck script — run `npx tsc --noEmit` manually to verify types.

## Project structure

```
src/
  app/          # Next.js App Router pages and layouts
  components/   # ui/ (shadcn-style), cards/, layout/, shared
  data/         # Static JSON/TS data (games, news, FAQs, tickets)
  lib/          # design-system.ts, utils.ts (cn helper)
```

Path alias: `@/*` → `./src/*`

## Conventions

- Tailwind v4 — no `tailwind.config.js`. Design tokens live in `src/lib/design-system.ts` and `src/app/globals.css`. Do not create a tailwind config.
- Component utility: `cn()` from `@/lib/utils` (clsx + tailwind-merge).
- Theme: `next-themes` with `class` strategy. Use `dark:` prefix for dark mode.
- Fonts: Sora (headings), Inter (body), JetBrains Mono (code) — loaded via `next/font/google` in layout.
- Static data in `src/data/` — prefer editing existing `.ts`/`.json` files over creating new data sources.

## Gotchas

- `AGENTS.md` and `CLAUDE.md` both enforce these rules. Editing either requires `@AGENTS.md` directive preservation.
- Redirects configured in `next.config.ts` (`/privacy` → `/privacy-policy`).
- `dev-server.log` is untracked — ignore it in git operations.
