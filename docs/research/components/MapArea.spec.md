# MapArea Specification

## Overview
- **Target file:** `src/components/MapArea.tsx`
- **Screenshot:** `docs/design-references/desktop-viewport.png`
- **Interaction model:** Static (visual clone — no real map interactivity needed)

## DOM Structure
div.map-area
  - div.map-heading
    - p.eyebrow: "发现中国"
    - h1: "在地图上，遇见华夏"
    - p.map-subtitle: "点击一片区域，从省份到城市，发现山河与文明留下的印记。"
  - div.map-shell (position: relative)
    - div.map-stats.glass: "全国地图" / strong "11,850" / small "景点"
    - div.category-chips: button "景点" (with icon), small "全部", small "热门"
    - div.map-controls: button "+", button "−", button "↻"
    - div.map-tip: "放大 · 深入了解"
    - div.heatmap-bar: span "景点", span "全部", i (gradient bar), span "热门"
  - SVG (China map with province paths)

## Computed Styles

### Container (div.map-area)
- position: relative
- borderRadius: 24px
- overflow: hidden
- background: radial-gradient(circle at 65% 48%, rgba(220,203,177,0.22), transparent 30%), linear-gradient(145deg, #f5f1e8, #ebe5d9)
- height: 100% (fills grid cell)

### Map heading
- position: absolute, top: 24px, left: 28px, zIndex: 5
- p.eyebrow: fontSize 10px, textTransform uppercase, letterSpacing 0.12em, color #988f87
- h1: fontSize 28px, fontWeight 700, color #25221e, lineHeight 1.3
- p.map-subtitle: fontSize 12px, color #695f5c, maxWidth 260px, lineHeight 1.6, marginTop 8px

### Map stats card
- position: absolute, top: 20px, right: 20px
- glass styling (rgba(250,248,244,0.72) bg, white border, shadow)
- padding: 12px 16px, borderRadius: 14px
- strong: fontSize 20px, fontWeight 700
- small: fontSize 11px, color #988f87

### Category chips
- position: absolute, top: 70px, right: 20px
- display: flex, gap: 6px

### Map controls
- position: absolute, bottom: 20px, right: 20px
- display: flex, flexDirection: column, gap: 4px
- button: width 34px, height 34px, borderRadius 10px, glass bg, cursor pointer

### Map tip
- position: absolute, bottom: 20px, left: 50%, transform translateX(-50%)
- glass bg, padding 6px 14px, borderRadius 10px
- fontSize 12px, color #69635c

### Heatmap bar
- position: absolute, bottom: 20px, left: 20px
- display: flex, alignItems: center, gap: 8px
- glass bg, padding 6px 12px, borderRadius 10px
- i (gradient): width 80px, height 6px, borderRadius 3px
- background: linear-gradient(90deg, #ede9e1, #dfb9aa, #b85a4e)

## SVG Map
- The SVG map of China is extracted to docs/research/china-map.svg
- It uses path elements for each province
- Province fill colors range from light beige to dark terracotta (heatmap)
- Province labels are text elements within the SVG

## Text Content
- "发现中国"
- "在地图上，遇见华夏"
- "点击一片区域，从省份到城市，发现山河与文明留下的印记。"
- "全国地图"
- "11,850"
- "景点"
- "全部", "热门"
- "+", "−", "↻"
- "放大 · 深入了解"

## Responsive Behavior
- **Desktop (1440px):** Full size, all overlays visible
- **Mobile (390px):** Map fills width, heading may be hidden or smaller, controls repositioned
