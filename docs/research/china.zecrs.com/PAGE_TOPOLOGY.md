# 华夏迹 (china.zecrs.com) — Page Topology

## Overview
A Chinese scenic spots discovery platform with an interactive map of China and a sidebar of curated attractions. Single-page app layout with a fixed toolbar, workspace grid, and floating support actions.

## Page Layout
- **Total sections:** 3
- **Scroll behavior:** No page-level scroll. Workspace has internal scroll for the place list sidebar.
- **Smooth scroll:** None (no Lenis/Locomotive)
- **Scroll snap:** None
- **Dark mode:** Toggle available

## Sections (top to bottom)

### 1. Header / Topbar (`.topbar.glass`)
- **Position:** relative, in flow
- **Layout:** 3-column grid (427px 520px 427px), height 68px
- **Background:** rgba(250, 248, 244, 0.72) with glass effect
- **Interaction model:** static
- **Children:**
  - **Brand** (`.brand`) — Logo icon + "华夏迹" + "山河有迹，文明有声"
  - **Search** (`.search-wrap`) — Search input with icon
  - **Actions** (`.top-actions`) — Footprint count, favorites, login, EN toggle, dark mode toggle
- **Hover states:** Action buttons have transform transition on hover

### 2. Workspace (`.workspace.mobile-map`)
- **Position:** relative, in flow
- **Layout:** 2-column grid (1000px 390px), gap 14px, height 782px
- **Interaction model:** static (map has internal pan/zoom, sidebar scrolls)

#### 2a. Map Area (`.map-area`)
- **Position:** relative, overflow hidden
- **Background:** radial gradient + linear gradient (warm beige tones)
- **Border radius:** 30px
- **Children:**
  - **Map Heading** (`.map-heading`) — Overlay text: "发现中国" / "在地图上，遇见华夏"
  - **Map Shell** (`.map-shell`) — The interactive SVG map of China with:
    - Map stats overlay (全国地图, 11,850 景点)
    - Category chips (全部, 热门)
    - Map controls (zoom +, zoom −, reset ↻, "放大 · 深入了解")
    - The actual SVG map

#### 2b. Explore Panel / Sidebar (`.explore-panel.glass`)
- **Position:** relative, z-index 6
- **Layout:** flex column, padding 24px 18px 12px
- **Background:** rgba(250, 248, 244, 0.72) with glass effect
- **Border radius:** 30px
- **Children:**
  - **Panel Header** (`.panel-header`) — "全国探索" subtitle, "今日精选" heading, "11,850 处" count
  - **Map Link Hint** (`.map-link-hint`) — "点击景点查看详情" with icon
  - **Coverage Note** (`.coverage-note`) — "14/31 个省级名录达到完整口径" (amber warning style)
  - **Explore Controls** (`.explore-controls`) — Two rows of filter buttons:
    - Level: 全部等级, 5A, 4A, 3A
    - Type: 全部, 人文古迹, 自然名胜, 博物馆, 主题乐园, 文化场馆, 休闲度假, 城市地标
  - **List Divider** (`.list-divider`) — "推荐目的地" + sort dropdown (综合推荐, 热门优先, 等级优先, 省时优先)
  - **Place List** (`.place-list`) — Scrollable list of place cards (scrollHeight: 3550, clientHeight: 483)
    - Each card: `article.place-card` with grid layout, 137px height
    - Card structure: cover image placeholder + title + meta + description + decision facts + reactions
    - "加载更多" button at bottom (24 / 11,850)

### 3. Support Actions (`.support-actions.support-map`)
- **Position:** fixed
- **Layout:** flex row, gap 7px, height 36px
- **Children:**
  - "我要反馈" button (glass style)
  - "请我喝杯咖啡" link (Ko-fi, yellow)
  - "爱发电支持" link (purple)

## Interaction Model Summary
| Section | Model | Details |
|---------|-------|---------|
| Header | Static | No scroll-triggered changes |
| Map Area | Static + SVG hover | Map pan/zoom on click, SVG regions hover |
| Explore Panel | Scroll-driven | Place list scrolls internally |
| Place Cards | Click-driven | Click to open detail, hover effects |
| Support Actions | Static | Fixed position, links open externally |

## Color Palette
- Background: rgb(250, 248, 244) — warm off-white
- Text primary: rgb(37, 34, 30) — dark brown
- Text secondary: rgb(152, 144, 135) — medium brown
- Text muted: rgb(105, 99, 92) — gray-brown
- Accent red: rgb(182, 51, 44)
- Accent red light: rgba(182, 51, 44, 0.09)
- Green: rgb(87, 160, 109)
- Amber/coverage: rgb(149, 101, 34) / rgba(183, 132, 52, 0.09)
- Card bg: rgba(255, 255, 255, 0.59)
- Surface bg: rgba(250, 248, 244, 0.72)
- Search bg: rgba(78, 66, 52, 0.055)
- Badge bg: rgba(255, 246, 217, 0.9)
- Badge text: rgb(122, 42, 32)
- Ko-fi: rgb(255, 221, 112)
- 爱发电: rgb(148, 108, 230)
- Border: rgba(75, 63, 48, 0.08)
- Shadow: rgba(68, 54, 37, 0.09)

## Fonts
- Primary: -apple-system, system-ui, SF Pro Display, SF Pro Text, PingFang SC, Helvetica Neue, Arial, sans-serif
- Secondary: Songti SC, STSong, serif (used sparsely)
- No external font loading — all system fonts

## Assets
- 1 image: `/assets/app-icon.svg-Ca62YEq5.png` (1024x1024, app icon)
- 253 inline SVGs (Lucide icons)
- 0 videos
- Gradients used for card cover backgrounds (4 variants cycling through cards)