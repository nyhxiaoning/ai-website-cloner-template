# Contact Section Specification

## Overview
- **Target file:** `src/components/ContactSection.tsx`
- **Screenshot:** `docs/design-references/desktop-fullpage.png`
- **Interaction model:** Static

## DOM Structure
```
div
  h2 → "联系我"
  p → "有使用问题、Bug 反馈、功能建议或合作咨询..."
  p → "如果你想进交流群，也可以先加我微信..."
  div (flex, items-center, gap-8)
    div (QR card)
      img → contact QR code
      p → "微信联系"
      p → "扫码添加微信，备注"表情包"我会更快处理。"
```

## Computed Styles

### Section Container
- Text-align: start (left aligned)
- Padding: 0

### Section Heading (h2)
- Font-size: 24px, font-weight: 700, color: #111827 (gray-900)
- Margin-bottom: 12px
- Text-align: center

### Description Paragraphs
- Font-size: 14px, color: #6b7280 (gray-500)
- Line-height: 20px
- Margin-bottom: 12px
- Text-align: center

### QR Code Card (wrapper)
- Display: inline-flex, flex-direction: column, align-items: center
- Background: rgba(255, 255, 255, 0.6) (white/60)
- Padding: 20px
- Border-radius: 16px
- Border: 1px solid #fef3c7 (amber-100)
- Box-shadow: none

### QR Image
- Width: 280px
- Height: auto (~381px)
- Border-radius: 12px
- Object-fit: fill

### QR Card Text
- "微信联系": font-size 16px, font-weight 600, color: #374151 (text-center)
- Helper: font-size 14px, color: #6b7280 (text-center)

## States & Behaviors
- None (static section)

## Assets
- QR code image: `public/images/contact-qr.jpg` (download from https://biaoqingchufang.com/_next/image?url=%2Fcontactme.jpg&w=640&q=75)

## Text Content (verbatim)
- 联系我
- 有使用问题、Bug 反馈、功能建议或合作咨询，都可以直接加我微信。
- 如果你想进交流群，也可以先加我微信，我会拉你进群。
- 微信联系
- 扫码添加微信，备注"表情包"我会更快处理。

## Responsive Behavior
- **Desktop:** Text above, then flex row with QR card centered
- **Mobile:** Text stacked, QR card full width or centered
