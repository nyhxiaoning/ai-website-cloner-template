# GenerateButton Specification

## Overview
- **Target file:** `src/components/GenerateButton.tsx`
- **Screenshot:** `docs/design-references/desktop-fullpage.png`
- **Interaction model:** Static (disabled, enabled when theme selected)

## DOM Structure
```
button → "生成表情包"
  p (below) → "请选择表情主题或输入自定义表情文字"
```

## Computed Styles

### Button
- Font-size: 18px, font-weight: 700, line-height: 28px
- Width: 100% (668px in container, but can be full width)
- Padding: 16px 0px
- Border-radius: 12px
- **Enabled:** background: #f59e0b (amber-500), color: white, cursor: pointer
- **Disabled:** background: #e5e7eb (gray-200), color: #9ca3af (gray-400), cursor: not-allowed
- Display: inline-block (or block)
- Text-align: center
- Border: none

### Helper Text Below
- Font-size: 14px, color: #6b7280 (gray-500)
- Text-align: center
- Margin-top: 8px

## States & Behaviors

### Enabled condition
- At least one theme must be selected
- OR text must be entered in the custom text field

### Disabled state
- Gray background, gray text
- Show: "请选择表情主题或输入自定义表情文字"

## Text Content (verbatim)
- 生成表情包
- 请选择表情主题或输入自定义表情文字

## Assets
- None

## Responsive Behavior
- Full width on all devices
