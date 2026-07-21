# MapArea Specification

## Overview
- **Target file:** `src/components/MapArea.tsx`
- **Screenshot:** `docs/design-references/china.zecrs.com/desktop-fullpage.png`
- **Interaction model:** static (SVG map with hover/click on regions)

## DOM Structure
```
div.map-area (1000x782px, border-radius 30px, gradient bg, position relative, overflow hidden)
├── div.map-heading (overlay, positioned at top-left)
│   ├── p: "发现中国"
│   ├── h1: "在地图上，遇见华夏"
│   └── p: "点击一片区域，从省份到城市，发现山河与文明留下的印记。"
├── div.map-shell (covers full map area, position absolute)
│   ├── div.map-stats (overlay)
│   │   ├── text: "全国地图"
│   │   └── strong: "11,850"
│   │   └── text: "景点"
│   ├── nav (map controls)
│   │   ├── div.category-chips (horizontal scroll)
│   │   │   ├── button: "全部" (active)
│   │   │   └── button: "热门"
│   │   └── div.map-controls (zoom buttons)
│   │       ├── button: "+" (zoom in)
│   │       ├── button: "−" (zoom out)
│   │       └── button: "↻" (reset)
│   ├── div (SVG map of China - interactive)
│   └── a/link: "放大 · 深入了解"
```

## Computed Styles

### div.map-area
- width: 1000px
- height: 782px
- border-radius: 30px
- background: radial-gradient(...) + linear-gradient(145deg, #f5f1e8, #ebe5d9)
- border: 1px solid rgba(75, 63, 48, 0.08)
- box-shadow: rgba(255, 255, 255, 0.55) 0px 1px 0px 0px inset
- overflow: hidden
- position: relative

### .map-heading
- position: absolute (overlaid on map)
- top: ~35px
- left: ~38px
- z-index: 2

### .map-heading p (first)
- font-size: 10px (estimated)
- color: #988f87
- text-transform: uppercase

### .map-heading h1
- font-size: 28px (estimated)
- font-weight: 700 (estimated)
- color: #25221e
- margin: 4px 0

### .map-heading p (last)
- font-size: 12px (estimated)
- color: #695f5c
- max-width: 260px

### .map-shell
- position: absolute
- inset: 0 (covers full map area)
- z-index: 1

### Category chips (inside map shell)
- display: flex
- flex-direction: row
- gap: 6px (estimated)
- overflow-x: auto
- scrollbar-width: none

### Category chip buttons
- font-size: 10px
- padding: 0px 10px
- height: 28px
- border-radius: 999px
- border: 1px solid rgba(75, 63, 48, 0.08)
- cursor: pointer
- transition: 0.16s

### Active chip ("全部")
- color: rgb(182, 51, 44)
- background-color: rgba(182, 51, 44, 0.09)
- border: 1px solid rgba(182, 51, 44, 0.25)

### Map controls (zoom buttons)
- width: 32px (estimated)
- height: 32px (estimated)
- border-radius: 50%
- background: white
- border: 1px solid rgba(75, 63, 48, 0.08)
- cursor: pointer
- display: flex
- align-items: center
- justify-content: center

## States & Behaviors
- **Map regions:** Hover to highlight, click to drill down
- **Category chips:** Click to toggle filter
- **Zoom controls:** Click to zoom in/out or reset
- **"放大 · 深入了解":** Link to detailed view

## Text Content
- "发现中国"
- "在地图上，遇见华夏"
- "点击一片区域，从省份到城市，发现山河与文明留下的印记。"
- "全国地图" / "11,850" / "景点"
- "全部" / "热门"
- "放大 · 深入了解"

## Responsive Behavior
- **Desktop (1440px):** Full 1000px width
- **Tablet (768px):** Map width may shrink, heading text adjusts
- **Mobile (390px):** Map is full-width, heading may be smaller, controls reposition