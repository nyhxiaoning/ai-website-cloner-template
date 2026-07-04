# Design Tokens — 表情厨房

## Colors

| Token | CSS Variable | Value | Purpose |
|-------|-------------|-------|---------|
| Background | `--background` | `#fffbeb` | Page background (amber-50) |
| Foreground | `--foreground` | `#1f2937` | Body text (gray-800) |
| Primary | `--primary` | `oklch(0.727183 0.318672 0.979407)` | Amber-500 — buttons, active states |
| Primary hover | — | `oklch(0.603514 0.405624 0.871228)` | Amber-600 |
| Muted | `--muted` | `#f3f4f6` | Gray-100 — card backgrounds |
| Card bg | `--card` | `#ffffff` | White cards |
| Border | `--border` | `oklch(0.859236 -0.14301 0.374849)` | Gray-300 |
| Headings | — | `oklch(0.0811897 0.00811279 -0.12254)` | Gray-900 |
| Nav text | — | `oklch(0.356337 -0.0158697 -0.108425)` | Gray-600 |
| Badge text | — | `oklch(0.472709 0.429082 0.692966)` | Amber-700 |
| Badge bg | — | `#ffffff` | White |
| Selected btn | — | `oklch(0.986252 -0.00635922 0.0842309)` | Amber-50 bg |
| Selected border | — | `oklch(0.801641 0.166016 0.992089)` | Amber-400 |
| Unselected border | — | `oklch(0.916229 -0.00159115 -0.0226791)` | Gray-200 |
| Disabled btn | — | `oklch(0.659269 -0.00832707 -0.0817473)` | Gray-400 |
| Disabled bg | — | `oklch(0.916229 -0.00159115 -0.0226791)` | Gray-200 |
| Link active bg | — | `oklch(0.95916 -0.0121653 0.23111)` | Amber-100 |
| Subtitle | — | `oklch(0.603514 0.405624 0.871228)` | Amber-600 |
| Heading color | — | `oklch(0.0811897 0.00811279 -0.12254)` | Gray-900 |

## Typography

| Token | Element | Font Family | Size | Weight | Line Height |
|-------|---------|------------|------|--------|-------------|
| h1 | Main heading | Geist / PingFang SC / Microsoft YaHei | 36px | 800 | 40px |
| h2 | Section heading | Geist / PingFang SC / Microsoft YaHei | 24px | 700 | 32px |
| h3 | Card title | Geist / PingFang SC / Microsoft YaHei | 16px | 600 | 24px |
| Body | Paragraphs | Geist / PingFang SC / Microsoft YaHei | 16px | 400 | 24px |
| Small | Caption/subtitle | Geist / PingFang SC / Microsoft YaHei | 14px | 500 | 20px |
| Badge | Feature badges | Geist / PingFang SC / Microsoft YaHei | 14px | 400 | 20px |
| Button | Buttons | Geist / PingFang SC / Microsoft YaHei | 14-18px | 600-700 | 20-28px |
| Logo | Brand text | Geist / PingFang SC / Microsoft YaHei | 18px | 700 | 28px |

## Spacing Scale
- 4px (p-1), 8px (p-2), 12px (p-3), 16px (p-4), 20px (p-5), 32px (p-8)

## Border Radius
- Buttons/cards: 12px (rounded-xl)
- Steps/badges: 9999px (rounded-full / pill)
- Feature cards: 12px (rounded-xl)
- QR card: 16px (rounded-2xl)

## Shadows
- Selected style card: `0 4px 6px -1px rgba(0,0,0,0.06), 0 2px 4px -2px rgba(0,0,0,0.06)`
- Feature cards, theme cards: no shadow (flat)

## Breakpoints
- Desktop: 1440px (content ~736px)
- Tablet: 768px (content narrower)
- Mobile: 390px (full width)
