# Page Topology — china.zecrs.com (华夏迹)

## Layout Overview
- **App shell:** `<main class="app">` with 18px padding, overflow hidden, min-height 100vh
- **Two-panel layout:** Grid with `gridTemplateColumns: 1000px 390px`, gap 14px
- **Background:** `#faf8f4` (light) / `#1a1815` (dark), with radial gradient overlay on map area

## Sections (top to bottom, z-index order)

### 1. TopBar (z-index: 20, position: relative)
- Glass morphism header, 68px tall, rounded 22px
- `background: rgba(250, 248, 244, 0.72)` with `backdrop-filter: blur(20px)`
- `border: 1px solid rgba(255, 255, 255, 0.78)`
- `box-shadow: rgba(68, 54, 37, 0.09) 0px 16px 45px 0px`
- Grid: `427px | 520px | 427px`
- Left: Brand button (39px icon + "华夏迹" title + "山河有迹，文明有声" subtitle)
- Center: Search input with search icon, rounded 14px, bg `rgba(78, 66, 52, 0.055)`
- Right: Action buttons (footprint count, collection count, login, EN, dark mode)
- **Interaction model:** Static (no scroll behavior on the topbar itself)

### 2. Map Area (left panel, 1000px wide)
- Container with `background: radial-gradient(circle at 65% 48%, rgba(220,203,177,0.22), transparent 30%), linear-gradient(145deg, #f5f1e8, #ebe5d9)`
- Contains SVG map of China with province borders
- Province fill colors: heatmap gradient from light beige to dark terracotta
- **Sub-components:**
  - Breadcrumbs (top-left): `nav.breadcrumbs` with "中国" button
  - Map heading (overlay): "发现中国" eyebrow, "在地图上，遇见华夏" h1, subtitle
  - Map insight card (top-right): "全国地图" / "11,850" / "景点"
  - Map density legend (bottom-left): "景点" / "全部" / gradient bar / "热门"
  - Map controls (bottom-right): +, −, ↻ buttons
  - Map tooltip (bottom-center): "放大 · 深入了解"
- **Interaction model:** Static (no real interactivity in clone)

### 3. Explore Panel (right panel, 390px wide)
- Container with `background: rgba(250, 248, 244, 0.72)`, border, shadow, rounded 30px
- `padding: 24px 18px 12px`
- **Header:** "全国探索" overline, "今日精选" heading, "11,850 处" count badge
- **Map link hint:** Map icon + "点击景点查看详情"
- **Coverage note:** Amber/gold colored note with "14/31 个省级名录达到完整口径"
- **Rating filters:** "全部等级", "5A", "4A", "3A" — pill-shaped buttons, active state has shadow
- **Type filters:** "全部", "人文古迹", "自然名胜", "博物馆", "主题乐园", "文化场馆", "休闲度假", "城市地标" — pill-shaped chips with rounded-full borders
- **Sort row:** "推荐目的地" label + select (综合推荐, 热门优先, 等级优先, 省时优先)
- **Card list:** Scrollable list of destination cards (article.place-card)
- **Load more:** "加载更多 24 / 11,850" button at bottom
- **Interaction model:** Click-driven (filter buttons, sort dropdown, load more)

### 4. Destination Card
- `article.place-card` with grid layout: 68px cover + content
- Cover: 68x68px rounded gradient with level badge (5A/4A/3A) overlay
- Content: h3 title, location/tag row, description, meta (duration+price), action row (upvote/downvote, chevron)
- Cover gradient cycles through: `cover-0`, `cover-1`, `cover-2`, `cover-3`
- **Interaction model:** Click-driven, hover effects on card

### 5. Support Actions (fixed, bottom-right)
- `div.support-actions.support-map` — position fixed, bottom-right
- Support toggle button (ellipsis icon, hidden on desktop, visible on mobile)
- Menu: "我要反馈" button, "请我喝杯咖啡" (Ko-fi link, yellow), "爱发电支持" (Afdian link, purple)
- **Interaction model:** Static links

## Global Design Tokens
- **Colors:** `#25221e` (text), `#69635c` (muted), `#988f87` (placeholder), `#faf8f4` (bg), `#988f87` (secondary text)
- **Accent colors:** `#b6332c` (primary red, for 5A badges, active states), `#956522` (amber/gold), gradient `linear-gradient(90deg, #ede9e1, #dfb9aa, #b85a4e)` (heatmap)
- **Fonts:** `-apple-system, "system-ui", "SF Pro Display", "SF Pro Text", "PingFang SC", "Helvetica Neue", Arial, sans-serif` (primary), `"Songti SC", STSong, serif` (secondary)
- **Border radius:** 22px (topbar), 30px (map/panel), 16px (insight/legend/card), 14px (search), 12px (buttons), 13px (brand icon), 999px (pill chips)
- **Glass effect:** `rgba(250, 248, 244, 0.72)` bg, `rgba(255, 255, 255, 0.78)` border, `blur(20px)` backdrop filter, shadow `rgba(68, 54, 37, 0.09) 0px 16px 45px 0px`
- **Transitions:** Default 0.18s, cards use `0.2s cubic-bezier(0.2, 0.8, 0.2, 1)` for transform

## Implementation Status
- ✅ TopBar — complete
- ✅ MapArea (with breadcrumbs, map insight, density legend) — complete
- ✅ ExplorePanel (with filters, sort, load-more) — complete
- ✅ PlaceCard (grid layout, correct styling) — complete
- ✅ Support Actions (bottom-right fixed bar) — complete
- ✅ Icons (SVG components) — complete
- ✅ Types (Place interfaces) — complete
- ✅ CSS foundation (globals.css with design tokens) — complete
