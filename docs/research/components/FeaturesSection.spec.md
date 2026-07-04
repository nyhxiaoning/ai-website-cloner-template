# Features Section Specification

## Overview
- **Target file:** `src/components/FeaturesSection.tsx`
- **Screenshot:** `docs/design-references/desktop-fullpage.png`
- **Interaction model:** Static

## DOM Structure
```
div
  h2 → "为什么用表情厨房做微信表情包？"
  div (grid 2x2)
    div (card)
      h3 → "AI 生成整套微信表情包"
      p → "支持 Q 版可爱..."
    div (card)
      h3 → "支持自定义角色形象"
      p → "上传参考图片或输入文字描述..."
    div (card)
      h3 → "自动切割微信表情包尺寸"
      p → "自动识别表情边界..."
    div (card)
      h3 → "聊天自用与上架分开走"
      p → "免费先完成主图、切图..."
```

## Computed Styles

### Section Heading (h2)
- Font-size: 24px, font-weight: 700, color: #111827 (gray-900)
- Line-height: 32px
- Margin-bottom: 16px

### Card Container
- Background: white (#ffffff)
- Border: 1px solid #f3f4f6 (gray-100)
- Border-radius: 12px
- Padding: 16px
- Box-shadow: none (flat)

### Card Title (h3)
- Font-size: 16px, font-weight: 600, color: #1f2937 (gray-800)
- Margin-bottom: 4px

### Card Description (p)
- Font-size: 14px, color: #6b7280 (gray-500)
- Line-height: 20px

## States & Behaviors
- None (fully static)

## Text Content (verbatim)
- 为什么用表情厨房做微信表情包？
- AI 生成整套微信表情包
- 支持 Q 版可爱、像素风、手绘涂鸦、3D 毛绒等多种风格，可快速生成 24 张微信表情包，适合做个人 IP、品牌表情或上架作品。
- 支持自定义角色形象
- 上传参考图片或输入文字描述，让 AI 基于你的角色形象生成整套表情包，适合打造个人形象、品牌吉祥物或专属聊天表情。
- 自动切割微信表情包尺寸
- 自动识别表情边界，切割为单张 240×240 标准尺寸，减少手动裁图和排版的时间，适合直接进入上传流程。
- 聊天自用与上架分开走
- 免费先完成主图、切图和聊天表情下载；要上传微信表情开放平台，再按需生成横幅、封面、图标、赞赏图和艺术家资料。

## Assets
- None

## Responsive Behavior
- **Desktop:** 2x2 grid
- **Tablet:** 2x2 grid
- **Mobile:** 1 column, stacked cards
