# DRIVE_INDEX.md — Canonical Google Drive Asset Index

Ushbu hujjat protokol talabiga binoan GitHub ↔ Google Drive cross-linking va binary asset xaritasini ta’minlaydi.

## Canonical Drive Locations

| Asset | Purpose | Drive Folder | Actual Drive URL / ID | File Type | Version | Date | Canonical Source | Used By |
|---|---|---|---|---|---|---|---|---|
| `BioLab_Handoff_2026-10-04_13-56.zip` | Complete BioLab source, build and handoff snapshot | `Biotexnologiya` BioLab Root (`19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`) | ID: `1q3PT-h_0FOHSoTIRMfQ6IOaRqHYkrgjh`; modified va checksum Drive metadata’da tashqi verifikatsiya qilinadi | ZIP Archive (.zip) | GitHub `main` `f8c173e` | 2026-10-04 | User handoff archive | BioLab archive; rootda bitta active handoff snapshot |
| `BioLab_Interactive_Guide_images.zip` | Equipment images reference archive | `Biotexnologiya` BioLab Root (`19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`) | ID: `1QuDHKjR8FuMz72en8wjOudrk1Quj0dqk` | ZIP Archive (.zip) | v1.0.0 | 2026-08-16 | Static Asset Vault | BioLab Equipment Catalog & Carousel |
| Uploaded Master Protocols | Master protocol reference texts | `Biotexnologiya` BioLab Root (`19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV`) | Sandbox Local Uploads | Markdown (.md) | v1.0.0 | 2026-08-17 | User Uploads | Audit & Continuity Workflow |

## Classification Rules
- **CURRENT**: Active snapshot `BioLab_Handoff_2026-10-04_13-56.zip` and active image vault in `Biotexnologiya` BioLab root; canonical-name snapshot count must remain `1`. Current ID, modified time and MD5 are recorded in the latest handoff audit.
- **SUPERSEDED**: Older local zips and historical tarballs; do not delete them without explicit user approval.
- **ARCHIVED**: Historical snapshots in auxiliary folders.
