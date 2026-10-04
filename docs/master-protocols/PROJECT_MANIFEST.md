# BioLab Interactive Guide — Project Manifest

## Overview

BioLab Interactive Guide — 100 ta biotexnologiya qurilmasini 10 kategoriya va 16 bosqichli o‘quv dosyesi orqali o‘rgatuvchi, qidiruv/filtr, original horizontal Pure CSS 3D carousel, Saralanganlar, PWA offline rejimi va modelga asoslangan workflow talqinini birlashtirgan professional ta’lim platformasi.

| Ko‘rsatkich | Joriy holat |
|---|---|
| Project name | BioLab Interactive Guide |
| Current version | `1.0.0` |
| Verified application/source release | GitHub `uzme/BioLab` `main` repository root; final commit recorded after release verification |
| Deployment | Vercel project `biolab` — `https://biolab-interactive-guide.vercel.app` (`READY`) |
| Language | Professional Uzbek (`uz`) |
| Archive status | Sanitised canonical archive workflow verified; final archive commit and Drive modified time are recorded by each release run and state metadata |

## Technology Stack

- **Frontend:** React 19, TypeScript, Vite 7, Tailwind CSS 4, shadcn/ui, Wouter.
- **Backend:** Node.js 22, Express 4, tRPC 11, Drizzle ORM, MySQL/TiDB compatibility.
- **Authentication:** Manus OAuth session cookies.
- **Storage:** S3 storage helpers and browser-side PWA cache where applicable.
- **Testing:** TypeScript check, Vitest configuration, Playwright browser regression scripts.
- **Package manager:** pnpm.

## Runtime & Environment

Required runtime services and environment contracts are documented in `SECRETS_REQUIRED.md`. Real secret values are supplied only through the secure environment; `.env*`, tokens, passwords, API keys, PATs and runtime outputs are excluded from GitHub and Drive snapshots. The repository intentionally contains no `.env` file or real secret value. The complete variable-name contract is maintained in `SECRETS_REQUIRED.md`; runtime values are injected only through the secure environment.

## Available Commands

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm run check
pnpm build
pnpm test
node scripts/tests/test_catalog_controls.mjs
node scripts/tests/test_device_viewer.mjs
node scripts/release/sync_release.mjs --check
node scripts/release/sync_release.mjs --publish
```

## Directory Structure

```text
client/       React frontend, pages, components, hooks, PWA integration
server/       Express, tRPC, authentication and database helpers
drizzle/      Schema and migration metadata
scripts/      Data import, regression tests, utilities, and release automation
shared/       Shared types and constants
storage/      S3 storage helpers
docs/         Project reference documentation, when present
```

## Canonical Archive

- **GitHub:** `https://github.com/uzme/BioLab`, branch `main`, project path repository root.
- **Google Drive:** BioLab `Biotexnologiya` root ID `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`; canonical snapshot ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`, file name `BioLab_Interactive_Guide_source.tar.gz`.
- **Cross-links:** `DRIVE_INDEX.md`, `GITHUB_INDEX.md`, and `RESTORATION_MAP.md`.
- **Excluded locations:** only the canonical `Biotexnologiya` BioLab root is used; `Second Brain`, `Kodlar`, `PUBG`, and `Skills` Drive folders are not modified.
