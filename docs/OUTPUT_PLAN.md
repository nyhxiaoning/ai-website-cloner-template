# Clone Output Plan: https://aiclotheschanger.io

## URL Normalization
- **Source URL:** https://aiclotheschanger.io
- **Normalized pathname:** /
- **App root:** `.` (this repository)
- **Existing routes at start:** `src/app/page.tsx` — untouched template scaffold (replaced by this clone)

## Key Assignment
- **Site key:** `aiclotheschanger-root-8816f3e1`
- **Page key:** `root-8fdef828`
- **Origin hash:** `8816f3e1` (first 8 hex chars of SHA-256 over `https://aiclotheschanger.io`)
- **Pathname hash:** `8fdef828` (first 8 hex chars of SHA-256 over `https://aiclotheschanger.io/`)

## Destination Route
- **Route:** `/` → `src/app/page.tsx` (replaces the template scaffold)

## Artifact Roots
| Purpose | Path |
|---|---|
| Component specs | `docs/research/aiclotheschanger-root-8816f3e1/components/` |
| Screenshots | `docs/design-references/aiclotheschanger-root-8816f3e1/` |
| Research docs | `docs/research/aiclotheschanger-root-8816f3e1/` |
| Shared site components | `src/components/sites/aiclotheschanger-root-8816f3e1/shared/` |
| Page components | `src/components/sites/aiclotheschanger-root-8816f3e1/` |
| Asset root | `public/sites/aiclotheschanger-root-8816f3e1/` |
| Asset download script | `scripts/download-assets-aiclotheschanger-root-8816f3e1.mjs` |

## Foundation Files to Merge (not replace)
- `src/app/globals.css` — merge target colors/fonts into existing Tailwind v4 tokens
- `src/app/layout.tsx` — add fonts, metadata for aiclotheschanger
- `src/components/sites/aiclotheschanger-root-8816f3e1/shared/icons.tsx` — extracted SVG icons

## Sections (to be confirmed after reconnaissance)
TBD after PAGE_TOPOLOGY.md is written.

## Collision Check
- No existing clone directories found under `docs/research/` or `src/components/sites/` that conflict with `aiclotheschanger-root-8816f3e1`
- No existing pages under `src/app/**/page.tsx` other than the template scaffold
- Asset download script uses a unique name: `download-assets-aiclotheschanger-root-8816f3e1.mjs`
