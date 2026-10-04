# BioLab Interactive Guide — AI Handoff Document

## Project Purpose

BioLab Interactive Guide is a professional Uzbek-language learning platform for 100 biotechnology devices. It combines the original horizontal Pure CSS 3D carousel, 16-section learning dossiers, SOP-oriented workflows, localStorage bookmarks, responsive navigation, PDF export, and PWA offline support.

## Current Source of Truth

The working project at `/home/ubuntu/biolab-guide` is the source of truth during development. The sanitised archival copy is stored at the root of the `uzme/BioLab` GitHub repository. The only Drive destination for release snapshots is the BioLab **Biotexnologiya** root folder with ID `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`. The separate `Second Brain` root is never a BioLab write destination.

## Current Verified State

The latest verified release includes the transition-safe catalog regression assertions, modern button and page loading interactions, PWA offline shell and status handling, bookmarks sidebar, 100-device catalog, 16-section dossiers, and the sanitised release workflow. Local typecheck, production build, Vitest command, browser regressions, and clean-clone typecheck/build have passed. The build still emits non-blocking large-chunk and CSS gradient-syntax warnings.

## Do Not Change Without Explicit Requirement

Do not alter the original Pure CSS 3D carousel geometry (`.pure3d-carousel`, `.scene`, `.a3d`, and `.card`) while fixing unrelated issues. Do not remove or reorder the 16 educational sections, change the science-first visual language, fabricate reviews or testimonials, or place assets and secrets in the source tree. Write release snapshots only to the single canonical Biotexnologiya root folder; do not modify Kodlar, PUBG, Skills, or any unrelated Drive folder.

## Architecture

The frontend uses React 19, Vite 7, Tailwind CSS 4, shadcn/ui components, Framer Motion, and Wouter routing. The backend scaffold uses Express, tRPC, and Drizzle-compatible project infrastructure. PWA behavior is managed through `manifest.webmanifest`, `sw.js`, `OfflineManager.tsx`, and `useOfflinePack.ts`. Equipment data and image presentation metadata are maintained in `client/src/lib/equipmentData.ts`, `equipmentImages.ts`, and `equipmentImagePresentation.ts`.

## Safe Reproduction, Version Identification, and Release Flow

In accordance with the **GitHub + Google Drive Continuity & Reproducibility Master Protocol**, every stable archive and release must preserve the exact version identification, cross-linking, and reproducible execution flow without relying on old chat memory.

### Version Identification
- **Project Version:** 1.0.0 (Canonical stable release)
- **Git Branch:** `main`
- **GitHub Repository:** `https://github.com/uzme/BioLab`
- **Google Drive Root Folder:** `Biotexnologiya` (ID: `19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`)
- **Canonical Drive Snapshot:** `BioLab_Interactive_Guide_source.tar.gz`
- **Synchronization State:** `READY` (Verified via `verify_continuity_docs.mjs` and `sync_release.mjs --check`)

### Clean-Clone and Reproduction Workflow
A clean archive clone must be installed and verified from the repository root:
```bash
git clone https://github.com/uzme/BioLab.git biolab-guide
cd biolab-guide
pnpm install --frozen-lockfile --ignore-scripts
pnpm run check
pnpm build
pnpm test
node scripts/release/sync_release.mjs --check
```

### Secret Exclusion & Security
Secrets are supplied only through an untracked local environment or hosting secret manager; `.env*`, tokens, API keys, passwords, PATs, service-role keys, logs, dependency directories, and build outputs are strictly excluded from GitHub and Google Drive release snapshots.

### Synchronization Execution
From the working project, use `node scripts/release/sync_release.mjs --check` before `node scripts/release/sync_release.mjs --publish`. The release script re-runs verification, scans source files for common secret formats, pushes the verified BioLab repository root to `uzme/BioLab` `main`, and updates `BioLab_Interactive_Guide_source.tar.gz` in the Biotexnologiya Drive root without creating duplicate superseded files.

## Development Rules

Maintain professional Uzbek for UI and documentation. Prefer focused changes, preserve existing working features, run tests and a production build after every material change, and update `PROJECT_STATE.md` and `todo.md` after each verified milestone. Before checkpointing, ensure every completed item is marked `[x]` and unresolved warnings or limitations are recorded explicitly.
