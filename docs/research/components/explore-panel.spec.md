# ExplorePanel Specification

## Overview
- **Target file:** `src/components/ExplorePanel.tsx`
- **Screenshot:** `docs/design-references/china.zecrs.com/desktop-fullpage.png`
- **Interaction model:** static (place list scrolls internally)

## DOM Structure
```
aside.explore-panel.glass
├── div.panel-handle (mobile drag handle, hidden on desktop)
├── div.panel-header (flex row, justify-between, padding 0 4px)
│   ├── div
│   │   ├── p: "全国探索"
│   │   └── h2: "今日精选"
│   └── div: "11,850 处"
├── div.map-link-hint (flex row, align-items center, gap 7px, font-size 10px, color #988f87)
│   ├── svg (Map icon, 15px)
│   └── text: "点击景点查看详情"
├── div.coverage-note (flex row, padding 8px 9px, border-radius 10px, bg rgba(183,132,52,0.09))
│   ├── svg (Alert/Info icon)
│   └── text: "14/31 个省级名录达到完整口径"
├── div.explore-controls
│   ├── nav[aria-label="景区等级筛选"]
│   │   ├── button: "全部等级" (active)
│   │   ├── button: "5A"
│   │   ├── button: "4A"
│   │   └── button: "3A"
│   └── nav[aria-label="景点类型筛选"]
│       ├── button: "全部" (active)
│       ├── button: "人文古迹"
│       ├── button: "自然名胜"
│       ├── button: "博物馆"
│       ├── button: "主题乐园"
│       ├── button: "文化场馆"
│       ├── button: "休闲度假"
│       └── button: "城市地标"
├── div.list-divider (flex row, justify-between, padding 0 4px 10px)
│   ├── text: "推荐目的地"
│   └── select.sort-combo
│       ├── option: "综合推荐" (selected)
│       ├── option: "热门优先"
│       ├── option: "等级优先"
│       └── option: "省时优先"
└── div.place-list (scrollable, hides scrollbar)
    ├── article.place-card × N
    └── button.load-more: "加载更多" + "24 / 11,850"
```

## Computed Styles

### aside.explore-panel.glass
- display: flex
- flex-direction: column
- padding: 24px 18px 12px
- width: 390px
- height: 782px
- border-radius: 30px
- background-color: rgba(250, 248, 244, 0.72)
- border: 1px solid rgba(255, 255, 255, 0.78)
- box-shadow: rgba(68, 54, 37, 0.09) 0px 16px 45px 0px
- overflow: hidden
- position: relative
- z-index: 6

### .panel-header
- display: flex
- flex-direction: row
- justify-content: space-between
- align-items: center
- gap: 14px
- padding: 0px 4px
- height: 47px

### .panel-header h2
- font-size: 20px (estimated — "今日精选")
- font-weight: 600 (estimated)

### .panel-header p
- font-size: 10px (estimated — "全国探索")
- color: #988f87

### .map-link-hint
- display: flex
- flex-direction: row
- align-items: center
- gap: 7px
- font-size: 10px
- line-height: 15px
- color: rgb(152, 144, 135)
- margin: 13px 4px 9px

### .coverage-note
- display: flex
- flex-direction: row
- align-items: flex-start
- gap: 7px
- padding: 8px 9px
- margin: 0px 0px 14px
- border-radius: 10px
- font-size: 9px
- line-height: 13.05px
- color: rgb(149, 101, 34)
- background-color: rgba(183, 132, 52, 0.09)

### Level filter buttons (default)
- font-size: 11px
- line-height: 16.5px
- color: rgb(152, 144, 135)
- padding: 0px 6px
- width: 86px
- height: 32px
- border-radius: 9px
- cursor: pointer
- transition: 0.18s
- background: transparent

### Level filter button (active — "全部等级")
- color: rgb(37, 34, 30)
- background-color: rgba(250, 248, 244, 0.98)
- box-shadow: rgba(45, 39, 31, 0.08) 0px 3px 10px 0px

### Type filter chips (default)
- font-size: 10px
- line-height: 15px
- color: rgb(152, 144, 135)
- padding: 0px 10px
- height: 28px
- border-radius: 999px
- border: 1px solid rgba(75, 63, 48, 0.08)
- cursor: pointer
- transition: 0.16s

### Type filter chip (active — "全部")
- color: rgb(182, 51, 44)
- background-color: rgba(182, 51, 44, 0.09)
- border: 1px solid rgba(182, 51, 44, 0.25)

### .list-divider
- display: flex
- flex-direction: row
- justify-content: space-between
- align-items: center
- padding: 0px 4px 10px

### select.sort-combo
- font-size: 10px
- color: #695f5c
- background: transparent
- border: none
- cursor: pointer

### .place-list
- padding: 2px 4px 14px
- overflow-y: auto
- scrollbar-width: none
- height: auto

### .load-more
- font-size: 10px (estimated)
- color: rgb(105, 99, 92)
- background-color: rgba(255, 255, 255, 0.64)
- margin: 3px 0px 8px
- width: 344px
- height: 42px
- border-radius: 13px
- border: 1px solid rgba(75, 63, 48, 0.08)
- cursor: pointer
- display: inline-flex
- align-items: center
- justify-content: center

## States & Behaviors
- **Filter buttons:** Click to toggle active state (background/color/border change)
- **Sort dropdown:** Click to change sort option, triggers re-render of place list
- **Place list:** Scrollable internally with hidden scrollbar
- **Load more:** Click to load more cards

## Per-State Content
N/A — static content with filter-triggered re-rendering

## Text Content
- Panel header: "全国探索" / "今日精选" / "11,850 处"
- Hint: "点击景点查看详情"
- Coverage: "14/31 个省级名录达到完整口径"
- Level filters: "全部等级", "5A", "4A", "3A"
- Type filters: "全部", "人文古迹", "自然名胜", "博物馆", "主题乐园", "文化场馆", "休闲度假", "城市地标"
- Divider: "推荐目的地"
- Sort options: "综合推荐", "热门优先", "等级优先", "省时优先"
- Load more: "加载更多" + "24 / 11,850"

## Responsive Behavior
- **Desktop (1440px):** Full 390px sidebar visible
- **Tablet (768px):** Sidebar may become overlay or bottom sheet
- **Mobile (390px):** Sidebar likely becomes a bottom-drawer, .panel-handle visible
- **Breakpoint:** ~1024px