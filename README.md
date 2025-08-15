# Ranandeh — Ready-to-Run (No next-intl)

A working Next.js (App Router) starter with **custom i18n (EN/FA)**, Tailwind, Prisma schema, theme toggle, and NerdWallet-inspired UI.
No `next-intl` is used to avoid config/version pitfalls. Just install and run.

## Quickstart
```bash
npm install
npm run dev
# visit http://localhost:3000/en or /fa
```
(If PowerShell blocks scripts: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`)

## Deploy
- Vercel: import repo, build command `next build`, output `.next`
- DB: use Neon/Supabase, set `DATABASE_URL` in `.env` then run `npx prisma migrate dev`

## Notes
- DVSA content is **not included** (license required).
