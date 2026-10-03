# BioLab Complete Handoff

**Snapshot:** 2026-10-04
**Release scope:** Tasdiqlangan Scientific Editorial Dashboard dizayni asosiy loyihaga birlashtirildi.

## Included

- Full BioLab source (`client`, `server`, `shared`, `mobile`, `scripts`, `docs`)
- Four canonical locale JSON files:
  - `client/src/lib/generated/uz.json`
  - `client/src/lib/generated/en.json`
  - `client/src/lib/generated/ru.json`
  - `client/src/lib/generated/tr.json`
- Translation/UI/UX audit reports under `docs/reports/`
- Approved design specification: `docs/reports/DESIGN_APPROVED_2026-10-04.md`
- Bookmark Sheet light/dark and mobile layout fixes
- WebDev route manifest and project logo metadata
- Test and validation scripts
- Next handoff creation guide: `HANDOFF_NEXT_ZIP_INSTRUCTIONS.md`

## Latest changes

- Scientific Editorial Dashboard visual layer added to `client/src/index.css`.
- Bookmark Sheet theme mixing, mobile overflow, safe-area and overlay z-index issues fixed.
- Bookmark import error fallback corrected from a literal string to `settings.importError`.
- Sheet overlay now exposes `data-sheet-overlay` for scoped styling.
- Device data, learning data and all four locale JSON files were preserved unchanged.

## Validation

- TypeScript check: passed
- Production build: passed
- Full regression suite: passed (26 unit tests plus browser/device audits)
- `git diff --check`: passed
- Locale/data integrity: passed

The build may report the existing large JavaScript chunk advisory; it does not fail the build.

## Connected services

- GitHub: https://github.com/uzme/BioLab
- Vercel project: `biolab`
- Vercel production domain: https://biolab-interactive-guide.vercel.app
- Google Drive folder: https://drive.google.com/drive/folders/19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV

## Restore and run

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm run dev
```

For a new handoff ZIP, follow `HANDOFF_NEXT_ZIP_INSTRUCTIONS.md`. Never delete an older handoff before verifying the new ZIP with `zip -T`.

## Archive variants

A source-only archive excludes `dist` and dependency caches. A `_FULL` archive includes the current production `dist` build as well. Both variants include the source, data, translations and handoff instructions.

## Excluded from source-only archive

`node_modules`, `dist`, `.git`, temporary Manus logs and local runtime caches are excluded from the source-only archive. The FULL archive includes `dist` but still excludes dependency caches and Git internals.
