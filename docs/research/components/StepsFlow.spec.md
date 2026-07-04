# Steps Flow Specification

## Overview
- **Target file:** `src/components/StepsFlow.tsx`
- **Screenshot:** `docs/design-references/desktop-fullpage.png`
- **Interaction model:** Static

## DOM Structure
```
div (flex, items-center, justify-center)
  div (flex, items-center, gap-2)
    span → "1"
    text → "生成表情"
    > →
    span → "2"
    text → "切割表情"
    > →
    span → "3"
    text → "下载打包"
```

## Computed Styles

### Container
- Display: flex, flex-direction: row, align-items: center
- Justify-content: center
- Gap: 8px between children
- Margin-bottom: 32px

### Step Items
- Background: #fef3c7 (amber-100)
- Border-radius: 9999px (pill)
- Padding: 6px 12px
- Font-size: 14px, font-weight: 600
- Color: #92400e (amber-800)

### Arrow Separators (→)
- Font-size: 14px
- Color: #d4d4d4 (gray-300)
- No special styling

## States & Behaviors
- None (fully static)

## Assets
- None needed

## Text Content (verbatim)
- 1 生成表情
- →
- 2 切割表情
- →
- 3 下载打包

## Responsive Behavior
- **Desktop:** Three pills with arrows between
- **Mobile:** Side by side, may wrap if needed, smaller pills
