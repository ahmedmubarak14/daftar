# Daftar

**Your CFO and accountant in a box** — a finance OS demo for Saudi founders and SMEs.

This is the MVP demo for a product that replaces the junior-accountant role for Saudi companies in their first two years: guided SOCPA-aligned setup, plain-language transaction logging with automated double-entry bookkeeping, a VAT threshold tracker, a regulatory calendar (ZATCA, GOSI, WPS, Zakat, CR/MISA renewals), monthly close reports, and an "explain this" layer in Arabic and English.

**[Open the live demo →](https://ahmedmubarak14.github.io/daftar/)**

## What's here

- `/` — Landing page (bilingual, RTL-aware)
- `/dashboard` — Cash, runway, obligations, recent activity
- `/setup` — Completed guided-setup review
- `/log` — Free-text → classification proposal flow
- `/ledger` — Journal, Chart of Accounts (SOCPA-aligned), Trial Balance
- `/compliance` — VAT threshold tracker + regulatory calendar
- `/reports` — P&L, Balance Sheet, plain-language monthly summary
- `/explain` — Bilingual glossary (SOCPA, ZATCA, VAT, GOSI, WPS, MISA, CR, etc.)

## Demo data

The demo seeds **Mithaq Technologies LLC**, an SaaS startup with:

- 3 founders, 300,000 SAR paid-in capital (50/25/25 split)
- MISA license + legal fees classified as Organization Costs
- Pre-incorporation items paid by founders, owed as "Due to Founders"
- 2 MacBooks capitalized (IT Equipment, 48-month depreciation)
- Zoho annual subscription booked as Prepaid, amortized 1/12 monthly
- First revenue (Al Nahdi pilot), salaries, marketing, co-working rent
- 13 journal entries across setup, Jan, and Feb — trial balance = 0

## What's mocked

- **No real backend** — data lives in `lib/seed.ts`
- **No real auth** — one seeded workspace
- **No real OCR / LLM** — the Log page returns a canned classification proposal; the `ClassificationProposal` shape in `lib/types.ts` is the real contract a production rules engine + LLM will fill in

Everything else (double-entry integrity, SOCPA-aligned numbering, bilingual Arabic/RTL, the "Why?" explainer pattern, VAT threshold math, regulatory calendar) reflects how the production MVP is meant to be built.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build     # static export to ./out
```

## Deploy

Pushes to `main` auto-deploy to GitHub Pages via `.github/workflows/deploy.yml`.

## Stack

- Next.js 15 (App Router, static export)
- TypeScript (strict)
- Tailwind CSS
- No runtime backend — pure static site
