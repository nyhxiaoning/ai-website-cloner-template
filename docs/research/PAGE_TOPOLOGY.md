# Page Topology — 表情厨房 (biaoqingchufang.com)

## Site Purpose
AI-powered WeChat sticker (表情包) creation tool. Generate 24-sticker sets with auto-cropping, character customization, and WeChat marketplace submission assets.

## Section Breakdown (top to bottom)

| # | Section Name | Type | Interaction Model | Dependencies |
|---|-------------|------|-------------------|--------------|
| 1 | **Header/Nav** | Sticky overlay | Static (hover on links, click to navigate) | None |
| 2 | **Hero** | Flow content | Static | Fonts, colors |
| 3 | **Steps Flow** | Flow content | Static (1→2→3 indicator) | Hero |
| 4 | **Style Selection** | Flow content | Click-driven (select one) | Steps |
| 5 | **Theme Selection** | Flow content | Click-driven (select 0-3) | Steps |
| 6 | **Custom Text Input** | Flow content | Static (textarea) | Steps |
| 7 | **Custom Character** | Flow content | Static (upload ref, text input) | None |
| 8 | **Generate Button** | Flow content | Static (disabled by default) | Theme selection |
| 9 | **Features Section** | Flow content | Static | None |
| 10 | **FAQ Section** | Flow content | Static (accordion-style expand) | None |
| 11 | **Contact Section** | Flow content | Static | None |

## Page Layout
- **Background:** `#fffbeb` (warm amber-50)
- **Max content width:** 736px centered (in main content area)
- **Header:** Sticky at top, full width, border-bottom amber-200, white/80 backdrop-blur
- **Main wrapper:** Margin-top 64px, centered content at 736px
- **Scroll behavior:** Standard browser scroll (no snap, no smooth scroll library)
- **Z-index layers:** header: 50, content: auto

## Responsive Behavior
- **Desktop (1440px):** Content centered at ~736px, 4 style cards in row, 3-column theme grid
- **Tablet (768px):** Content scales down, likely 2x2 style cards, 2-column theme grid
- **Mobile (390px):** Single column, stacked layout, full-width cards

## Interaction Model Summary
- **Style buttons:** Click to select (border-color changes to amber-400, background amber-50)
- **Theme buttons:** Multi-select (up to 3), each click toggles selection
- **Generate button:** Disabled until at least one theme selected
- **FAQ terms:** Click to expand/collapse answers
- **Header links:** Hover effects, standard navigation
