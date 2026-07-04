# CustomInput Sections Specification

## Overview
- **Target file:** `src/components/CustomInputs.tsx`
- **Screenshot:** `docs/design-references/desktop-fullpage.png`
- **Interaction model:** Static (text input, button click for upload)

## DOM Structure
```
div
  // Custom Text Section
  div
    h3 → "自定义表情文字（可选）"
    p → "输入你想要的表情文字，用逗号或换行分隔。"
    textarea → placeholder: "例如：哈哈哈，谢谢，辛苦了，下班啦，摸鱼中，好的收到"

  // Custom Character Section
  div
    h3 → "自定义角色（可选）"
    div (flex)
      button → "📷 上传参考"
      div
        input → placeholder: "例如：一个短发女生，圆脸，戴眼镜..."
        p → "无需上传参考图，...建议描述：..."
        p → "推荐写法：一个短发女生，..."
```

## Computed Styles

### Section Headers (h3)
- Font-size: 14px, font-weight: 600, color: #374151 (gray-700)
- Margin-bottom: 8px

### Helper Text (p)
- Font-size: 13px, color: #6b7280 (gray-500)

### Textarea
- Font-size: 16px
- Padding: 12px 16px
- Border-radius: 12px
- Border: 2px solid #e5e7eb (gray-200)
- Background: white
- Width: 100% (668px)
- Outline: 1.5px solid #1f2937 (on focus)
- Min-height: ~80px

### Character Input
- Same styling as textarea
- Width: 100%

### "上传参考" Button
- Border: 2px dashed #d1d5db (gray-300)
- Border-radius: 12px
- Background: #f9fafb (gray-50)
- Padding: 8px 16px
- Display: flex, align-items: center, gap: 4px
- Cursor: pointer
- Font-size: 16px

## States & Behaviors
- None (static inputs, no validation display)

## Text Content (verbatim)
- 自定义表情文字（可选）
- 输入你想要的表情文字，用逗号或换行分隔。
- 例如：哈哈哈，谢谢，辛苦了，下班啦，摸鱼中，好的收到
- 自定义角色（可选）
- 📷 上传参考
- 例如：一个短发女生，圆脸，戴眼镜，穿黄色卫衣，整体可爱活泼，保持人物形象一致
- 无需上传参考图，直接输入角色描述也可以生成。
- 建议描述：角色身份、外观特征、服装配饰和整体气质，并说明保持形象一致。
- 推荐写法：一个短发女生，圆脸，戴眼镜，穿黄色卫衣，整体可爱活泼，保持人物形象一致。

## Assets
- None needed

## Responsive Behavior
- **Desktop:** Side-by-side or stacked, inputs full width
- **Mobile:** Full width, stacked layout
