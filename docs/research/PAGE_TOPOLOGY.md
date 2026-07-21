# Page Topology — china.zecrs.com (华夏迹)

## Layout Overview
- **App shell:** `<main class="app">` with 18px padding, overflow hidden, min-height 100vh
- **Two-panel layout:** Grid with `gridTemplateColumns: 1000px 390px`, gap 14px
- **Background:** `#e8e4dc` (light) / `#191816` (dark), with radial gradient overlay on map area

## Sections (top to bottom, z-index order)

### 1. TopBar (z-index: 20, position: relative)
- Glass morphism header, 68px tall, rounded 22px
- `background: rgba(250, 248, 244, 0.72)` with `backdrop-filter: blur`
- `border: 1px solid rgba(255, 255, 255, 0.78)`
- `box-shadow: rgba(68, 54, 37, 0.09) 0px 16px 45px 0px`
- Grid: `427px | 520px | 427px`
- Left: Brand button (39px icon + "华夏迹" title + "山河有迹，文明有声" subtitle)
- Center: Search input with search icon, rounded 14px, bg `rgba(78, 66, 52, 0.055)`
- Right: Action buttons (footprint count, collection count, login, EN, dark mode)
- **Interaction model:** Static (no scroll behavior on the topbar itself)

### 2. View Switcher (part of mobile-view-switch, desktop shows as nav tabs)
- Three tabs: 精选 (Featured), 地图 (Map - active), 中国 (China)
- Glass morphism background, similar to topbar
- **Interaction model:** Click-driven tab switching

### 3. Map Area (left panel, ~1000px wide)
- Container with `background: radial-gradient(circle at 65% 48%, rgba(220,203,177,0.22), transparent 30%), linear-gradient(145deg, #f5f1e8, #ebe5d9)`
- Contains SVG map of China with province borders
- Province fill colors: heatmap gradient from light beige to dark terracotta
- **Sub-components:**
  - Province labels (text on each province)
  - Map info card (top-right): "全国地图 11,850 景点"
  - Map controls (bottom-right): +, −, ↻ buttons
  - Map tooltip (bottom-center): "放大 · 深入了解"
  - Heatmap legend (bottom-left): "景点 全部 ⇢ 热门" gradient bar
- **Interaction model:** Scroll-driven (map zoom), click-driven (province selection)

### 4. Right Panel (~390px wide, scrollable)
- **Header area:** "全国探索" overline, "今日精选" heading, "11,850 处" count, green dot + "点击景点查看详情", checkmark + "14/31 个省级名录达到完整口径"
- **Filter row 1:** Rating buttons: 全部等级 (active), 5A, 4A, 3A
- **Filter row 2:** Type buttons: 全部 (active), 人文古迹, 自然名胜, 博物馆, 主题乐园, 文化场馆, 休闲度假, 城市地标
- **Sort dropdown:** "推荐目的地" label + sort select (综合推荐, 热门优先, 等级优先, 省时优先)
- **Card list:** Scrollable list of destination cards
- **Interaction model:** Click-driven (filter buttons, sort dropdown, card clicks)

### 5. Destination Card
- Horizontal layout: gradient cover (left ~60px) + text content (right)
- Cover: 60x60px rounded gradient, with level badge (5A/4A/3A) overlay
- Content: H3 title, location span, type tag (i), trend tag (i.trend-tag), description (small), meta row (time + price), action row (like/dislike counts, heart icon, arrow)
- **Interaction model:** Static (hover effects on buttons)

### 6. Bottom Bar (fixed, z-index high)
- "我要反馈" (feedback), "请我喝杯咖啡" (coffee), "爱发电支持" (support)
- **Interaction model:** Static

## Global Design Tokens
- **Colors:** `#25221e` (text), `#69635c` (muted), `#989087` (placeholder), `#eee9df` (bg), `#e8e4dc` (bg alt), `rgba(78, 66, 52, 0.055)` (button bg), `rgba(250, 248, 244, 0.72)` (glass bg), `rgba(255, 255, 255, 0.78)` (glass border)
- **Accent colors:** `#b85a4e` (terracotta, for 5A badges, active states), `#4e6b5a` (green, for checkmarks), gradient heatmap
- **Fonts:** `-apple-system, "system-ui", "SF Pro Display", "SF Pro Text", "PingFang SC", "Helvetica Neue", Arial, sans-serif` (primary), `"Songti SC", STSong, serif` (secondary/decorative)
- **Border radius:** 22px (topbar), 14px (search), 12px (buttons), 8px (cards), 13px (brand icon)
