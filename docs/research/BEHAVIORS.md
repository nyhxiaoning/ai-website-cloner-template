# Behaviors — china.zecrs.com (华夏迹)

## Scroll Behaviors
- **No smooth scroll library:** No Lenis, Locomotive Scroll, or custom scroll libraries detected
- **No scroll snap:** Default browser scroll behavior throughout
- **No scroll-driven animations:** The map heading has a fade-in on load, but no scroll-triggered animations
- **No sticky header:** The TopBar is position: relative, not fixed or sticky
- **Place list scrolls internally:** The explore panel's place-list scrolls independently with hidden scrollbar

## Hover Behaviors
- **Place cards:** `transform: translateY(-1px)`, `border-color: rgba(75, 63, 48, 0.16)`, `background: rgba(255, 255, 255, 0.75)`, `box-shadow: 0 4px 12px rgba(68, 54, 37, 0.12)` — transition: `transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)`, other props `0.18s`
- **Filter buttons:** Background color changes via transition 0.18s
- **Type filter chips:** Background/color/border changes via transition 0.16s
- **Support action buttons:** Background color darkens via transition 0.18s
- **Breadcrumb button:** Background appears on hover via transition 0.18s
- **Zoom controls:** Background becomes more opaque via transition 0.18s

## Click Behaviors
- **Filter buttons (rating/type):** Click to toggle active state (visual change only — no data loading)
- **Sort dropdown:** Click to change sort option (no data loading)
- **Load more button:** Click to load more cards (visual only)
- **Place cards:** Click to open detail view (not implemented in clone)
- **Footprint button in card:** Click to toggle visited state
- **Heart button in card:** Click to toggle liked state
- **Vote buttons:** Click to upvote/downvote
- **Brand button:** Click to go to homepage
- **Support actions:** "我要反馈" (button), "请我喝杯咖啡" (Ko-fi link), "爱发电支持" (Afdian link)

## Responsive Changes
- **Desktop (1440px):** Full 3-column TopBar, 2-panel workspace (1000px map + 390px panel)
- **Tablet (768px):** Workspace stacks to single column, TopBar simplifies
- **Mobile (390px):** TopBar shows brand+search+hamburger, action buttons hidden, support actions show toggle button
- **Breakpoint:** Layout changes at ~900px and ~600px

## States
- **Search input:** Focused state shows `box-shadow: 0 0 0 2px rgba(182, 51, 44, 0.15)`, background darkens slightly
- **Filter buttons:** Active state shows `background: rgba(250, 248, 244, 0.98)`, `color: #25221e`, `box-shadow: rgba(45, 39, 31, 0.08) 0px 3px 10px`
- **Type chips:** Active state shows `color: #b6332c`, `background: rgba(182, 51, 44, 0.09)`, `border-color: rgba(182, 51, 44, 0.25)`
- **Support toggle:** Hidden on desktop (`display: none`), visible on mobile