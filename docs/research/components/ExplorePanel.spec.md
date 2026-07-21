# ExplorePanel Specification

## Overview
- **Target file:** `src/components/ExplorePanel.tsx`
- **Screenshot:** `docs/design-references/desktop-viewport.png`
- **Interaction model:** Click-driven (filter buttons switch active state)

## DOM Structure
aside.explore-panel.glass
  - div.panel-header
    - div: p.panel-overline "全国探索", h2 "今日精选"
    - span.result-count "11,850 处"
  - p.map-link-hint: "点击景点查看详情"
  - div.coverage-note: svg(check) + "14/31 个省级名录达到完整口径"
  - div.filter-group (rating buttons)
    - button.active "全部等级"
    - button "5A"
    - button "4A"
    - button "3A"
  - button.filter-more-toggle "类型筛选" (expandable)
  - div.category-chips (type buttons)
    - button.active "全部"
    - button "人文古迹"
    - button "自然名胜"
    - button "博物馆"
    - button "主题乐园"
    - button "文化场馆"
    - button "休闲度假"
    - button "城市地标"
  - div.sort-row
    - span "推荐目的地"
    - select: 综合推荐, 热门优先, 等级优先, 省时优先
  - div.place-list (scrollable)
    - PlaceCard × N (see PlaceCard spec)

## Computed Styles

### Container (aside.explore-panel.glass)
- width: 390px (grid cell)
- height: 100% (fills grid cell)
- background: rgba(250, 248, 244, 0.72)
- border: 1px solid rgba(255, 255, 255, 0.78)
- boxShadow: rgba(68, 54, 37, 0.09) 0px 16px 45px 0px
- borderRadius: 24px
- padding: 20px
- display: flex, flexDirection: column
- overflow: hidden

### Panel header
- display: flex, justifyContent: space-between, alignItems: flex-start
- marginBottom: 8px

### Panel overline
- fontSize: 10px, textTransform uppercase, letterSpacing 0.12em, color #988f87

### Heading h2
- fontSize: 20px, fontWeight 700, color #25221e, marginTop 2px

### Result count
- fontSize: 11px, color #988f87, padding 4px 10px, borderRadius 8px, border 1px solid rgba(75,63,48,0.08)

### Coverage note
- fontSize: 11px, color #4e6b5a (green), display flex, alignItems center, gap 6px
- background: rgba(78, 107, 90, 0.06), padding 6px 10px, borderRadius 8px

### Filter buttons (rating)
- display: flex, gap: 4px, marginBottom 8px
- button: fontSize 12px, padding 6px 14px, borderRadius 8px
- button.active: background #25221e, color #faf8f4
- button:not(.active): background rgba(78,66,52,0.055), color #69635c

### Category chips (type)
- display: flex, flexWrap: wrap, gap: 4px, marginBottom 12px
- Same styling as rating buttons

### Sort row
- display: flex, justifyContent: space-between, alignItems: center
- marginBottom: 10px
- span: fontSize 13px, fontWeight 600
- select: fontSize 12px, color #69635c, border none, background transparent

### Place list
- flex: 1, overflowY: auto
- display: flex, flexDirection: column, gap: 8px
- scrollbar-width: none (hidden)

## Per-State Content

### Default filter state
- Rating: "全部等级" active
- Type: "全部" active
- Sort: "综合推荐"

## Text Content (verbatim)
- "全国探索"
- "今日精选"
- "11,850 处"
- "点击景点查看详情"
- "14/31 个省级名录达到完整口径"
- Filter labels as listed above
- "推荐目的地"

## Responsive Behavior
- **Desktop (1440px):** 390px width, full height
- **Mobile (390px):** Full width, may stack below map
