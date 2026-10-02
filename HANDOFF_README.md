# BioLab Complete Handoff

**Snapshot:** 2026-10-02 22:44 +05:00  
**Release commit:** `a5240a0` — `fix: unify locale translations and mobile UI flows`

## Included

- Full BioLab source (`client`, `server`, `shared`, `mobile`, `scripts`, `docs`)
- Four canonical locale JSON files:
  - `client/src/lib/generated/uz.json`
  - `client/src/lib/generated/en.json`
  - `client/src/lib/generated/ru.json`
  - `client/src/lib/generated/tr.json`
- Production build output under `dist/`
- Translation/UI/UX audit report under `docs/reports/`
- Test and validation scripts
- WebDev route manifest and project logo metadata

## Validation

- TypeScript check: passed
- Production build: passed
- Unit tests: 26 passed
- Browser/regression tests: passed
- BIO-001–BIO-100 learning audit: passed
- Every locale: 100 devices, 16 learning sections, 4 learning stages

## Connected services

- GitHub: https://github.com/uzme/BioLab
- Vercel project: `biolab`
- Vercel production domain: https://biolab-interactive-guide.vercel.app
- Manus Preview: https://8328-id8thaqh8zu27g4r63913-1a846102.us4.manus.computer/
- Google Drive folder: https://drive.google.com/drive/folders/19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV

## Excluded from this handoff archive

Dependency caches (`node_modules`), Git internals (`.git`), temporary Manus logs, and local runtime caches are excluded. Dependencies can be restored with `pnpm install --frozen-lockfile --ignore-scripts`.
