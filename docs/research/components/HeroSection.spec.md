# Hero Section Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Screenshot:** `docs/design-references/desktop-fullpage.png`
- **Interaction model:** Static

## DOM Structure
```
div
  p → "表情厨房" (subtitle label)
  h1 → "AI 微信表情包制作工具"
  p → description text
  div (flex, gap-3, justify-center)
    span → "24 张表情自动生成"
    span → "自动切割 240×240"
    span → "聊天自用可直接下载"
  link → "/guide" "先看案例教程"
```

## Computed Styles

### Section Container
- Text-align: center
- Margin-bottom: 48px

### Subtitle "表情厨房"
- Font-size: 14px, font-weight: 600, color: #d97706 (amber-600)
- Text-align: center, margin-bottom: 12px

### Main Heading (h1)
- Font-size: 36px, font-weight: 800, color: #111827 (gray-900)
- Line-height: 40px, text-align: center
- Margin-bottom: 12px

### Description Paragraph
- Font-size: 14px, color: #6b7280 (gray-500)
- Line-height: 20px, text-align: center
- Max-width: none (but constrained by parent's 736px)

### Feature Badges
- Padding: 4px 12px
- Font-size: 14px, color: #b45309 (amber-700)
- Background: white
- Border-radius: 9999px (full pill)
- Display: inline-block

### CTA Button "先看案例教程"
- Display: inline-block, margin-top: 12px
- Font-size: 14px, font-weight: 600
- Color: #d97706 (amber-600)
- Text-decoration: none
- Hover: text-decoration: underline (standard link)

## Assets
- No images needed

## Text Content (verbatim)
- 表情厨房
- AI 微信表情包制作工具
- 在线生成 24 张微信表情包主图，自动切割后可直接下载聊天表情。注册赠送 4 credits，可免费生成 1 次主图；横幅、封面、图标等上架素材需充值后按需生成。
- 24 张表情自动生成
- 自动切割 240×240
- 聊天自用可直接下载
- 先看案例教程

## Responsive Behavior
- **Desktop (1440px):** Centered, max-width 736px, badges side by side
- **Mobile (390px):** Smaller text (h1 ~28px), badges stack or wrap
