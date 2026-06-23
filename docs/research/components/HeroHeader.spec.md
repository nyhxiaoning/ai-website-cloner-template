# HeroHeader Specification

## Overview
- **Target file:** `src/components/HeroHeader.tsx`
- **Screenshot:** `docs/design-references/desktop-full.png`
- **Interaction model:** Static (no interaction)

## DOM Structure
```
div.relative.bg-gradient-to-br.from-blue-600.via-teal-600.to-cyan-700.text-white.p-8.text-center.overflow-hidden
  div.absolute.inset-0.opacity-10
    div.absolute.top-0.left-0.w-full.h-full.animate-float
      div.w-full.h-full.opacity-20 (SVG cloud pattern background)
  div.relative.z-10
    h1.text-4xl.md:text-5xl.font-bold.mb-3.text-shadow-lg "🐒 西游记取经路线图 🏛️"
    p.text-lg.md:text-xl.opacity-90 "跟随唐僧师徒四人的传奇西行之路，体验八十一难的奇幻冒险"
```

## Computed Styles

### Container
- background: linear-gradient(135deg, #2563eb, #0d9488, #0891b2)
- padding: 32px (p-8)
- text-align: center
- color: white
- position: relative
- overflow: hidden

### Cloud overlay
- position: absolute, inset-0
- opacity: 0.10
- SVG pattern with circles (rgba(255,255,255,0.3)), repeated
- animation: float 6s ease-in-out infinite

### Title (h1)
- font-size: 48px (desktop) / 36px (tablet)
- font-weight: 700
- margin-bottom: 12px
- text-shadow: 0 2px 10px rgba(0,0,0,0.3)

### Subtitle (p)
- font-size: 20px (desktop) / 18px (tablet)
- opacity: 0.9

## States & Behaviors
N/A (static)

## Assets
- No external images needed
- Uses inline SVG cloud pattern (data URI)

## Text Content (verbatim)
- "🐒 西游记取经路线图 🏛️"
- "跟随唐僧师徒四人的传奇西行之路，体验八十一难的奇幻冒险"

## Responsive Behavior
- **Desktop (1440px):** heading text-5xl (48px), subtitle text-xl (20px), padding p-8
- **Tablet (768px):** heading md:text-5xl, subtitle md:text-xl
- **Mobile (390px):** heading text-4xl (36px), subtitle text-lg (18px), padding p-6
