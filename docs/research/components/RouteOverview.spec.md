# RouteOverview Specification

## Overview
- **Target file:** `src/components/RouteOverview.tsx`
- **Screenshot:** `docs/design-references/desktop-full.png`
- **Interaction model:** Static

## DOM Structure
```
div.p-6.md:p-8.bg-amber-50.border-t-4.border-orange-300
  div.max-w-6xl.mx-auto
    h2.text-3xl.font-bold.text-center.mb-8.text-gray-800 "西游取经路线概览"
    div.grid.grid-cols-1.md:grid-cols-5.gap-4
      // Card 1: Start
      div.bg-white.rounded-xl.shadow-lg.p-6.text-center
        div.w-16.h-16.mx-auto.rounded-full.flex.items-center.justify-center...(gradient)
          i.fas.fa-home.text-2xl or emoji 🏠
        h3.text-lg.font-semibold "起点"
        p.text-gray-600 "长安城"

      // Card 2: End
      div.bg-white.rounded-xl.shadow-lg.p-6.text-center
        ...mountain icon
        h3 "终点"
        p "灵山圣地"

      // Card 3: Stations
      div.bg-white.rounded-xl.shadow-lg.p-6.text-center
        ...map-marker icon
        h3 "站点"
        p "81难地点"

      // Card 4: Achievement
      div.bg-white.rounded-xl.shadow-lg.p-6.text-center
        ...trophy icon
        h3 "成就"
        p "功德圆满"

      // Card 5: Cultural
      div.bg-white.rounded-xl.shadow-lg.p-6...(special highlight)
        ...scroll icon
        p cultural text
```

## Computed Styles

### Section Container
- padding: 24px (mobile) / 32px (desktop)
- background: rgb(255, 251, 235) (bg-amber-50)
- border-top: 4px solid rgb(251, 146, 60) (border-orange-300)

### Cards
- background: white
- border-radius: 12px (rounded-xl)
- box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1)
- padding: 24px
- text-align: center
- transition: hover:shadow-xl

### Icon circles
- width/height: 64px (w-16 h-16)
- border-radius: 9999px
- gradient backgrounds:
  - Start: from-red-500 to-red-600
  - End: from-teal-500 to-green-500
  - Stations: from-blue-500 to-indigo-600
  - Achievement: from-yellow-500 to-orange-500

### Font Awesome icons
- fa-home, fa-mountain, fa-map-marker-alt, fa-trophy, fa-scroll
- All: text-2xl, text-white

## States & Behaviors
- Hover: cards get hover:shadow-xl transition (0.3s)

## Text Content (verbatim)
- "西游取经路线概览"
- "起点" / "长安城"
- "终点" / "灵山圣地"
- "站点" / "81难地点"
- "成就" / "功德圆满"
- Icon card with scroll and cultural text about Journey to the West

## Responsive Behavior
- **Desktop (1440px):** 5-column grid (md:grid-cols-5), horizontal layout
- **Tablet (768px):** may wrap to 3 columns
- **Mobile (390px):** single column (grid-cols-1), stacked cards
