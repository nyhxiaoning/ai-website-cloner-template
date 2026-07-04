# Header Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Screenshot:** `docs/design-references/desktop-fullpage.png`
- **Interaction model:** Static (hover states on nav links)

## DOM Structure
```
header (sticky, top-0, z-50, border-b border-amber-200, bg-white/80, backdrop-blur-sm)
  div (flex, justify-between, items-center, max-w-5xl, mx-auto, px-4)
    link → "/" (logo)
      span → "🍳"
      span → "表情厨房"
    nav
      a → "/" (AI 制作)
      a → "/guide" (案例教程)
      a → "/#contact" (联系我)
    button (登录)
```

## Computed Styles

### Header Container
- Background: rgba(255,255,255,0.8) with backdrop-blur-sm (8px blur)
- Border-bottom: 1px solid #fde68a (amber-200)
- Position: sticky, top: 0, z-index: 50
- Height: 57px
- Width: 100vw (1440px)

### Inner Container
- Display: flex, justify-content: space-between, align-items: center
- Max-width: 1152px
- Padding: 0 16px
- Margin: 0 auto

### Logo Link
- Font-size: 18px, font-weight: 700, color: #1f2937 (gray-800)
- Display: flex, align-items: center, gap: 8px
- Text-decoration: none

### Nav Links (AI制作, 案例教程, 联系我)
- Font-size: 14px, font-weight: 500
- **Default:** color: #4b5563 (gray-600), background: transparent, padding: 8px 16px, border-radius: 8px
- **Hover:** background: #fef3c7 (amber-100), transition: all 0.15s ease

### "AI 制作" Active Link
- color: #92400e (amber-800), background: #fef3c7 (amber-100), border-radius: 8px

### Login Button
- Font-size: 14px, font-weight: 600, font-family: Geist / PingFang SC / Microsoft YaHei
- **Default:** color: white, background: #f59e0b (amber-500), padding: 8px 16px, border-radius: 8px, border: none, cursor: pointer
- **Hover:** background: #d97706 (amber-600), transition: all 0.15s ease

## States & Behaviors

### Hover states
- **Nav links (AI制作, 案例教程, 联系我):** background: transparent → #fef3c7 (amber-100), transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1)
- **Login button:** background: #f59e0b → #d97706, transition: all 0.15s ease

## Assets
- No SVGs or images needed (uses emoji and text)

## Text Content (verbatim)
- 🍳 表情厨房
- AI 制作
- 案例教程
- 联系我
- 登录

## Responsive Behavior
- **Desktop (1440px):** Full width, centered max-w-5xl (1152px), all nav visible
- **Tablet (768px):** Same layout, narrower container
- **Mobile (390px):** On mobile, the nav links might collapse or the layout remains similar but tighter
- Use hidden md:flex for nav on mobile if it hides; otherwise keep visible

## Implementation Notes
- Use Next.js `Link` component for navigation
- Use `usePathname()` to detect active route for "AI 制作" active state
- Import from `next/link` and `next/navigation`
