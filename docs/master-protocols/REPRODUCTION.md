# BioLab Interactive Guide — Reproduction Guide

This guide details how to reproduce the BioLab Interactive Guide from the canonical sanitised archive in the `uzme/BioLab` repository without relying on the original working directory or committed secrets.

## Step 1: Clone the Canonical Biotexnologiya Repository

```bash
git clone https://github.com/uzme/BioLab.git
cd biolab-interactive-guide
```

The BioLab project is the root of the `uzme/BioLab` repository. It has its own `package.json` and lockfile, so dependency installation runs directly from this repository root.

## Step 2: Install Runtime and Dependencies

Ensure Node.js v22 or newer and pnpm are installed. Run the following command from `biolab-interactive-guide/biolab-interactive-guide`:

```bash
pnpm install --frozen-lockfile --ignore-scripts
```

The frozen lockfile ensures reproducible dependency resolution, and `--ignore-scripts` avoids executing arbitrary package lifecycle scripts during the initial audit install.

## Step 3: Configure Environment Without Committing Secrets

The sanitised archive intentionally excludes `.env` files and secret values. Configure required runtime variables through the local environment or the hosting platform’s secret manager, using `SECRETS_REQUIRED.md` as the reference. Never commit `DATABASE_URL`, OAuth values, API keys, tokens, passwords, PATs, or service-role keys.

```bash
# Create a local, untracked environment file only when the deployment requires it.
# Do not copy it into the repository or the release archive.
touch .env
```

## Step 4: Configure Database When Required

If a local database is required, provide `DATABASE_URL` through the untracked environment and apply the project’s schema workflow. Do not place database credentials in source files, fixtures, snapshots, or documentation.

```bash
pnpm db:push
```

## Step 5: Run Deterministic Verification

Run these commands from `biolab-interactive-guide/biolab-interactive-guide`:

```bash
pnpm run check
pnpm build
pnpm test
```

The release workflow also runs `node scripts/tests/test_carousel_pagination_browser.mjs` against the running development server and performs a secret scan before creating a snapshot. For a manual browser verification, start the server in a separate terminal:

```bash
pnpm dev
node scripts/tests/test_device_viewer.mjs
```

The current clean-clone verification passed with the nested install command above, TypeScript check, and production build. The production build continues to report only non-blocking large-chunk and CSS gradient-syntax warnings; these warnings do not prevent compilation.

## Step 6: Safe Release Synchronisation

From the original working project, after tests and production build pass, run:

```bash
node scripts/release/sync_release.mjs --check
node scripts/release/sync_release.mjs --publish
```

The release script creates a sanitised archive, excludes `.env*`, `.git`, runtime logs, dependency folders, build outputs, and archive files, scans source text for common secret formats, pushes the verified BioLab source under `biolab-interactive-guide` to `uzme/BioLab` `main`, and creates or updates the single BioLab snapshot inside the configured Biotexnologiya Drive parent. It writes only to the canonical Biotexnologiya Drive root and never to unrelated Drive folders.
