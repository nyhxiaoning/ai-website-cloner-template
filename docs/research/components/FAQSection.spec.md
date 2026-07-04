# FAQ Section Specification

## Overview
- **Target file:** `src/components/FAQSection.tsx`
- **Screenshot:** `docs/design-references/desktop-fullpage.png`
- **Interaction model:** Click-driven (accordion toggle)

## DOM Structure
```
div
  h2 → "微信表情包制作常见问题"
  div (accordion container)
    div (item)
      dt/term → "微信表情包怎么制作？"
      dd/definition → "在表情厨房选择风格和主题后..."
    div (item)
      dt → "上传微信表情开放平台需要哪些素材？"
      dd → "上架需要表情单图 + 横幅、封面..."
    div (item)
      dt → "微信表情包尺寸是多少？"
      dd → "单张表情为 240×240 像素..."
    div (item)
      dt → "不会画画也能做微信表情包吗？"
      dd → "可以。你只需要选择风格、主题..."
    div (item)
      dt → "生成一套微信表情包要多久？"
      dd → "通常 1-2 分钟即可完成 24 张表情主图..."
```

## Computed Styles

### Section Heading (h2)
- Font-size: 24px, font-weight: 700, color: #111827 (gray-900)
- Line-height: 32px
- Margin-bottom: 16px

### Question (dt/term) — visible always
- Font-size: 14px, font-weight: 600
- Color: #1f2937 (gray-800)
- Cursor: pointer
- Padding: 16px 0
- Border-bottom: 1px solid #f3f4f6 (gray-100)

### Answer (dd/definition) — initially hidden
- Font-size: 14px
- Color: #6b7280 (gray-500)
- Padding: 0 0 16px 0
- Display: none (hidden by default)
- Line-height: 1.625 (relaxed)

## States & Behaviors

### Open state
- **Trigger:** Click on any question
- The answer for that question becomes visible
- All other answers close (single-item accordion)
- Transition: smooth expand/collapse (max-height or height transition)

### FAQ Accordion behavior
- Click toggles visibility of answer text
- Only one answer open at a time
- Arrow/chevron indicator on the question when open

## Text Content (verbatim)

1. **Q:** 微信表情包怎么制作？
   **A:** 在表情厨房选择风格和主题后，AI 会先生成 24 张表情合集主图，并自动切割成单张表情。聊天自用可直接下载；要上传微信平台，再按需生成横幅、封面和图标。

2. **Q:** 上传微信表情开放平台需要哪些素材？
   **A:** 上架需要表情单图 + 横幅、封面、图标。开通赞赏还需要赞赏引导图、致谢图，以及艺术家头像和主页横幅。表情厨房可以一站式生成全部素材。

3. **Q:** 微信表情包尺寸是多少？
   **A:** 单张表情为 240×240 像素，横幅为 750×400，封面为 240×240，图标为 50×50，均按微信表情开放平台常用规格生成。

4. **Q:** 不会画画也能做微信表情包吗？
   **A:** 可以。你只需要选择风格、主题，或者上传参考图和输入角色描述，AI 就能生成整套微信表情包，适合没有绘画基础的用户。

5. **Q:** 生成一套微信表情包要多久？
   **A:** 通常 1-2 分钟即可完成 24 张表情主图的生成。注册即赠送 4 credits，可免费生成 1 次主图并切图下载聊天表情；平台素材需充值后继续生成。

## Assets
- None

## Responsive Behavior
- **All devices:** Full width, single column accordion
- Breakpoints affect only max-width of the container
