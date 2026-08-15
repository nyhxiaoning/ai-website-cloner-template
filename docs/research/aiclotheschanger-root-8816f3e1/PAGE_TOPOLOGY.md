# Page Topology: https://aiclotheschanger.io

## Normalized Pathname
`/` → route: `src/app/page.tsx`

## Section Map (top to bottom)

| # | Name | Bg color | Has interactions |
|---|---|---|---|
| 0 | Hero / Interactive Demo | `#f3efe6` / `#171412` dark | Yes — upload buttons, clothing tabs, compare slider |
| 1 | Try-On Examples | `#fbfaf6` | Yes — click-tabbed 4-state card grid |
| 2 | Quality / Promises | `#ffffff` | Yes — 3 groups × 3 toggle buttons, stateful content |
| 3 | Use Cases | `#f3efe6` | No — static card links |
| 4 | How-To Steps | `#191613` | No — static 3-step article grid |
| 5 | Pricing | `#f3efe6` | Yes — Monthly/Yearly toggle, 3 plan cards + 1 credit pack |
| 6 | FAQ | `#fbfaf6` | Yes — Radix Accordion, 12 items, first open by default |
| 7 | Footer | transparent (body bg) | No — static links |

## Layout Architecture

- **Max-width container:** `max-w-7xl` (~1280px), centered
- **Hero layout:** `grid lg:grid-cols-[0.9fr_1.1fr]` — left: form, right: before/after result
- **Demo images:** 3-column grid for person/garment thumbnails; result panel is a 2-col border grid (Before / After)
- **Examples:** stacked card grid, 3 per row on desktop
- **Quality:** 2-column grid — left: large visual, right: 9 toggle buttons in 3 groups
- **Use Cases:** 2×2 grid of cards
- **How-to:** 3 equal-width column grid
- **Pricing:** 3-column plan cards; credit pack below; footer links
- **FAQ:** single-column accordion list

## Sticky / Fixed Elements

| Element | Position | Top | Z-Index |
|---|---|---|---|
| Header | `fixed` | `0` | `50` |
| (in-page nav) | `sticky` | `96px` (lg) | `auto` |
| (in-page nav 2) | `sticky` | `112px` (lg) | `auto` |

## Interaction Model Summary

| Section | Model |
|---|---|
| Hero demo | Click-driven: person selection, clothing selection, radio toggle, compare slider |
| Examples | Click-driven: tab/pill buttons with `aria-pressed`, content swaps per tab |
| Quality | Click-driven: 9 toggle buttons with `aria-pressed`, grouped in 3 Radix toggle groups |
| Use Cases | Static |
| How-to | Static |
| Pricing | Click-driven: Monthly/Yearly toggle button (2-state); plan cards are static links |
| FAQ | Click-driven: Radix Accordion; 12 items, first item open on load |
| Footer | Static |

## Z-Index Layers
- Header: `z-50`
- Modals/overlays: `z-50` (header at trigger-open state)
- Content: `auto`
