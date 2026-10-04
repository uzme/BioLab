# ARCHITECTURE.md — BioLab Interactive Guide System Architecture

## System Architecture

BioLab Interactive Guide is a professional biotechnology learning platform built with React 19, TypeScript, Vite 7, and Tailwind CSS 4. The frontend delivers an interactive equipment catalog, an original horizontal Pure CSS 3D carousel, 16-section learning dossiers, a bookmarks sidebar, and PWA offline capabilities. The backend relies on Express, tRPC 11, Drizzle ORM, and MySQL/TiDB database integration.

## Frontend Architecture

`client/src/pages/Home.tsx` manages the catalog shell, search/filter controls, and learning modal triggers. `Pure3DCarousel.tsx` preserves the original `.pure3d-carousel`, `.scene`, `.a3d`, and `.card` 3D geometry. `DeviceViewer.tsx` renders the 16-stage learning dossier, `EquipmentCard.tsx` handles equipment metadata, `BookmarksSidebar.tsx` manages browser `localStorage` bookmarks, and `OfflineManager.tsx` provides PWA status and offline caching controls.

## Backend, Data & Storage

The server provides type-safe contracts via tRPC. Drizzle schema and migrations reside under `drizzle/`; production database records are never committed to version control. The equipment catalog and learning curriculum originate from structured TypeScript datasets. Media assets reside in S3 and Drive canonical folders.

## PWA & Client Persistence

`manifest.webmanifest` provides installable PWA metadata, while `sw.js` handles navigation and asset caching strategies. Bookmarks persist in browser `localStorage`. Offline status and package management are exposed through localized Uzbek UI components.

## Deployment & Synchronization Flow

`node scripts/release/sync_release.mjs --check` validates typecheck, production build, catalog/device regression tests, and sanitisation fingerprints. `--publish` executes these checks and pushes a sanitised snapshot without secrets to the canonical GitHub repository `uzme/BioLab` on the `main` branch, as well as updating the canonical BioLab Google Drive root folder `Biotexnologiya` (`19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`).

## Reproducibility Boundary

Source code, schema, tests, and documentation reside on GitHub. Images, screenshots, PDFs, and large reference archives reside on Google Drive. Real credentials remain in secure environment storage. `DRIVE_INDEX.md`, `GITHUB_INDEX.md`, and `RESTORATION_MAP.md` cross-link these layers for seamless project restoration.
