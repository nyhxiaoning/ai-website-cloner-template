# Theme Selector Specification

## Overview
- **Target file:** `src/components/ThemeSelector.tsx`
- **Screenshot:** `docs/design-references/desktop-fullpage.png`
- **Interaction model:** Click-driven (multi-select, max 3)

## DOM Structure
```
div
  div (flex, justify-between)
    h3 → "选择表情主题"
    p → "最多选择 3 个主题，已选 0/3"
  div (grid, 3 columns)
    button (日常问候)
    button (搞笑沙雕)
    button (职场打工)
    button (恋爱甜蜜)
    button (吃货日常)
    button (节日祝福)
```

## Computed Styles

### Section Header "选择表情主题"
- Font-size: 14px, font-weight: 600, color: #374151 (gray-700)
- Margin-bottom: 12px

### Counter Text
- Font-size: 14px, color: #6b7280 (gray-500)

### Theme Grid
- Display: grid, 3 columns

### Theme Buttons (unselected/default)
- Background: white
- Border: 2px solid #e5e7eb (gray-200)
- Border-radius: 12px
- Padding: 12px
- Width: ~215px (based on grid)
- Display: block
- Cursor: pointer

### Theme Button Emoji
- Font-size: ~20-24px

### Theme Title
- Font-size: 14px, font-weight: 600, color: #1f2937

### Theme Description
- Font-size: 12px, color: #6b7280 (gray-500)

## States & Behaviors

### Selected state
- **Trigger:** Click to toggle selection
- Max 3 themes can be selected
- When 3 selected, remaining buttons show as unclickable (or cursor changes)
- **Unselected → Selected:** Background: white → amber-50 (#fffbeb), Border: gray-200 → amber-400 (#fbbf24)

### Counter
- Always shows: "最多选择 3 个主题，已选 X/3"
- X = current count of selected themes

## Data
```typescript
const themes = [
  { emoji: "👋", title: "日常问候", description: "你好、谢谢、再见、早安..." },
  { emoji: "🤪", title: "搞笑沙雕", description: "哈哈哈、笑死、裂开、社死..." },
  { emoji: "💼", title: "职场打工", description: "收到、好的、已阅、加油..." },
  { emoji: "💕", title: "恋爱甜蜜", description: "爱你、想你了、亲亲、抱抱..." },
  { emoji: "🍜", title: "吃货日常", description: "干饭、好饿、奶茶!、加鸡腿..." },
  { emoji: "🎉", title: "节日祝福", description: "新年好、恭喜发财、生日快乐、中秋快乐..." },
];
```

## Assets
- None (emoji + text only)

## Responsive Behavior
- **Desktop:** 3 columns x 2 rows
- **Tablet:** 2 columns x 3 rows
- **Mobile:** Single column
