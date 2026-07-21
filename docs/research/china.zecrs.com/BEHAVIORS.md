# 华夏迹 — Behavior Findings

## Scroll Sweep
- No page-level scroll (workspace height = viewport height - topbar)
- No scroll-triggered header changes
- Place list scrolls internally (overflow-y: auto, scrollHeight: 3550, clientHeight: 483)
- No scroll-snap anywhere
- No smooth scroll library (no Lenis, no Locomotive)

## Click Sweep
- **Map controls:** Zoom +/−, reset, and "深入了解" link
- **Category chips:** 全部 (active, red), 热门 (inactive) — click to filter
- **Level filters:** 全部等级, 5A, 4A, 3A — click to filter by rating
- **Type filters:** 全部, 人文古迹, 自然名胜, 博物馆, 主题乐园, 文化场馆, 休闲度假, 城市地标 — click to filter by type
- **Sort dropdown:** 综合推荐, 热门优先, 等级优先, 省时优先
- **Place cards:** Click to open detail view
- **Card reactions:** Heart button, visited button
- **Header actions:** Footprint count, favorites, login, EN toggle, dark mode toggle
- **Support buttons:** 我要反馈 (modal?), Ko-fi link, 爱发电 link

## Hover Sweep
- **Header action buttons:** transform transition on hover (0.18s cubic-bezier)
- **Place cards:** transform, border-color, background, box-shadow transition (0.2s cubic-bezier)
- **Card arrow icon:** color and transform transition (0.16s)
- **Filter chips:** background/color transition (0.16s-0.18s)

## Responsive Sweep
- **Desktop (1440px):** Full layout — 3-column header, 2-column workspace (1000px + 390px)
- **Tablet (768px):** `.mobile-map` class suggests map goes full-width, sidebar becomes overlay or bottom sheet
- **Mobile (390px):** `.mobile-view-switch` visible, map likely full-width, sidebar is mobile drawer
- **Breakpoint:** Not explicitly determined but likely around 1024px or 768px

## Dark Mode
- Toggle button exists in header
- `.dark` class likely toggled on `<html>`
- CSS variables in `:root` and `.dark` blocks