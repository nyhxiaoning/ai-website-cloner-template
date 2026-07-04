# Behaviors — 表情厨房

## Interaction Sweep Results

### Scroll Sweep
- **Header:** Sticky at top. No change on scroll — keeps white/80 backdrop-blur at all scroll positions.
- **Content:** No scroll-driven animations, no fade-in effects, no parallax.
- **No smooth scroll library** detected (no `.lenis` class, native scroll behavior).

### Click Sweep

**Style buttons (4):**
- Each click selects that style (amber border + amber-50 background). Only one can be selected at a time.
- Previously selected style becomes unselected (back to gray border + white bg).

**Theme buttons (6):**
- Click toggles selection. Up to 3 can be selected.
- When 3 are selected, remaining become unclickable (or show "已选 3/3" counter).
- Selected theme gets amber border + amber bg.
- Counter updates: "最多选择 3 个主题，已选 X/3"

**Generate button:**
- Disabled (gray, cursor not-allowed) until at least one theme is selected.
- Text: "生成表情包"

**FAQ items:**
- Click on a question (dt/term) toggles the answer (dd/definition).
- Only one answer open at a time (accordion pattern).
- Transition: smooth expand/collapse.

**Login button:**
- Navigates to login page.
- Amber-500 background, white text.

### Hover Sweep

| Element | Change | Transition |
|---------|--------|------------|
| Nav links (AI制作, 案例教程, 联系我) | Background amber-100 on hover | 0.15s ease |
| Login button | Background amber-600 on hover | 0.15s ease |
| Any theme/style card | Border-color slight darkening, cursor: pointer | 0.15s ease |
| Upload reference button | Dashed border, subtle bg change | 0.15s ease |

### Responsive Sweep

| Section | Desktop (1440px) | Tablet (~768px) | Mobile (390px) |
|---------|-----------------|-----------------|----------------|
| Header | Logo left, nav center, login right | Same, narrower | Logo left, hamburger or condensed |
| Style cards | 4 in a row | 2x2 grid | Single column |
| Theme buttons | 3 columns x 2 rows | 2 columns x 3 rows | Single column |
| Features | 2x2 grid | 2x2 grid | 1 column |
| FAQ | Full width | Full width | Full width |
| Contact | Text + QR side by side | Stacked | Stacked |

## State Changes Summary

### Default → Selected (Style Buttons)
- Background: white → amber-50
- Border color: gray-200 → amber-400
- Shadow: none → subtle shadow

### Default → Selected (Theme Buttons)
- Background: white → amber-50
- Border color: gray-200 → amber-400

### Enabled → Disabled (Generate Button)
- Background: amber-500 → gray-200
- Text color: white → gray-400
- Cursor: pointer → not-allowed
