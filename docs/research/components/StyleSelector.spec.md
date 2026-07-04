# Style Selector Specification

## Overview
- **Target file:** `src/components/StyleSelector.tsx`
- **Screenshot:** `docs/design-references/desktop-fullpage.png`
- **Interaction model:** Click-driven (single select)

## DOM Structure
```
div
  h3 → "选择角色风格"
  div (grid, 4 columns)
    button (Q版可爱)
    button (像素风)
    button (手绘涂鸦)
    button (3D毛绒)
```

## Computed Styles

### Section Header "选择角色风格"
- Font-size: 14px, font-weight: 600, color: #374151 (gray-700)
- Margin-bottom: 12px

### Card Grid
- Display: grid, 4 columns (grid-cols-4)

### Style Card (selected/Q版可爱)
- Width: 158px
- Background: #fffbeb (amber-50)
- Border: 2px solid #fbbf24 (amber-400)
- Border-radius: 12px
- Padding: 16px
- Box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.06)
- Display: block
- Cursor: pointer

### Style Card (unselected)
- Background: white
- Border: 2px solid #e5e7eb (gray-200)
- Same border-radius, padding, width

### Emoji Icon
- No specific computed style info — rendered as emoji text
- Approximately 28-32px font-size implicitly

### Card Title
- Font-size: 14px, font-weight: 600
- Color: #1f2937 (gray-800)

### Card Description
- Font-size: 12px, color: #6b7280 (gray-500)

## States & Behaviors

### Selected state
- **Trigger:** Click on the card
- **Unselected → Selected:** Background: white → #fffbeb, Border: gray-200 → amber-400, Adds subtle shadow
- Only one card can be selected at a time (radio-style)

## Data
```typescript
const styles = [
  { emoji: "🥰", title: "Q版可爱", description: "圆润可爱的Q版风格，大头小身体" },
  { emoji: "👾", title: "像素风", description: "复古像素游戏风格" },
  { emoji: "✏️", title: "手绘涂鸦", description: "随性手绘涂鸦风格" },
  { emoji: "🧸", title: "3D毛绒", description: "3D毛绒玩具质感" },
];
```

## Assets
- None (emoji + text only)

## Responsive Behavior
- **Desktop:** 4 in a row (grid-cols-4)
- **Tablet:** 2x2 grid (grid-cols-2)
- **Mobile:** Single column (grid-cols-1 or 2)
