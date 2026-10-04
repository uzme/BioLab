# BioLab Interactive Guide

BioLab Interactive Guide is a professional biotechnology learning platform featuring 100 devices across 10 categories, real-time search and filters, an original horizontal Pure CSS 3D carousel, and 16-stage learning dossiers for every instrument. The interface includes browser-based localStorage bookmarks, a responsive bookmarks sidebar, PWA offline capabilities, and verified equipment image licenses.

## Current Source of Truth

The active canonical source repository is [`uzme/BioLab`](https://github.com/uzme/BioLab) on the `main` branch. Complete binary and sanitised application snapshots reside in the canonical Google Drive root folder **Biotexnologiya** (`19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`). The separate **Second Brain** Drive root is not a BioLab write destination. Real credentials and secrets remain strictly in secure environment storage.

## Live deployment and current handoff

- Production website: https://biolab-interactive-guide.vercel.app/
- Vercel project: `biolab`, latest production deployment `READY`
- Current GitHub commit: `f8c173ee545c0f0ddbc174ddfad0f3f0af8f868c`
- Current Drive handoff: `BioLab_Handoff_2026-10-04_13-56.zip`, file ID `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`
- Drive handoff checksum: Drive file metadata orqali tashqi verifikatsiya qilinadi.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 7, Tailwind CSS 4, shadcn/ui, Wouter.
- **Backend:** Node.js 22, Express 4, tRPC 11, Drizzle ORM, MySQL/TiDB compatibility.
- **PWA:** `manifest.webmanifest`, `sw.js`, `OfflineManager`.
- **Testing:** TypeScript check, production build, and Playwright regression scripts.
- **Package Manager:** pnpm.

## Installation and Validation

To run or validate the project locally:

```bash
pnpm install --frozen-lockfile
pnpm run check
pnpm build
pnpm test
node scripts/tests/test_catalog_controls.mjs
node scripts/tests/test_device_viewer.mjs
```

Development server:

```bash
pnpm dev
```

Release validation and sanitisation:

```bash
node scripts/release/sync_release.mjs --check
node scripts/release/sync_release.mjs --publish
```

`--check` validates integrity without publishing; `--publish` executes tests, builds, secret sanitisation checks, and synchronises the sanitised snapshot to GitHub and Google Drive. Snapshots exclude `.env*`, tokens, API keys, passwords, PATs, `node_modules`, `dist`, and runtime logs.

## Project Structure

```text
client/       React frontend, pages, components, hooks, and PWA integration
server/       Express, tRPC, authentication, and database helpers
scripts/      Data import, release sync, verification, utilities, and regression tests
drizzle/      Database schema and migrations
```
