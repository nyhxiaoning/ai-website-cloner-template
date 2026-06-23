# TabNavigation Specification

## Overview
- **Target file:** `src/components/TabNavigation.tsx`
- **Screenshot:** `docs/design-references/desktop-full.png`
- **Interaction model:** Click-driven (switches between 4 views)

## DOM Structure
```
div.flex.justify-center.gap-4.p-4.bg-amber-50.border-b.border-amber-200
  button (active tab - 地图视图)
    i.fas.fa-map.mr-2
    "地图视图"
  button (inactive - 时间轴视图)
    i.fas.fa-scroll.mr-2
    "时间轴视图"
  button (inactive - 思维导图)
    i.fas.fa-brain.mr-2
    "思维导图"
  button (inactive - 赞赏支持)
    i.fas.fa-heart.mr-2
    "赞赏支持"
```

## Computed Styles

### Container
- display: flex
- justify-content: center
- gap: 16px
- padding: 16px (p-4)
- background: rgb(255, 251, 235) (bg-amber-50)
- border-bottom: 1px solid rgb(253, 230, 138) (border-amber-200)

### Active Tab Button
- padding: 8px 24px (px-6 py-2)
- border-radius: 9999px (rounded-full)
- font-weight: 500 (font-medium)
- background: rgb(251, 146, 60) (bg-orange-400)
- color: white (text-white)
- box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1) (shadow-lg)
- border: 2px solid rgb(249, 115, 22) (border-orange-500)
- transition: all 0.3s

### Inactive Tab Button
- padding: 8px 24px
- border-radius: 9999px
- font-weight: 500
- background: white (bg-white)
- color: rgb(194, 65, 12) (text-orange-700)
- border: 2px solid rgb(253, 186, 116) (border-orange-300)
- hover: bg-orange-100

## States & Behaviors

### Tab switching
- **Interaction model:** Click-driven
- Active tab gets orange bg + white text + shadow
- Inactive tabs get white bg + orange text
- Font Awesome icons: fa-map, fa-scroll, fa-brain, fa-heart

## Icons Used
- fas fa-map mr-2
- fas fa-scroll mr-2
- fas fa-brain mr-2
- fas fa-heart mr-2

## Text Content (verbatim)
- "地图视图"
- "时间轴视图"
- "思维导图"
- "赞赏支持"

## Responsive Behavior
- **Desktop (1440px):** horizontal flex, gap-4
- **Mobile (390px):** wrap if needed (flex-wrap), smaller padding
