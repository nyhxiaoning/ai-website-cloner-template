# Page Topology — 罗杰的阅读档案

## Structure (top to bottom)

1. **Topbar** — Fixed-position header with brand, search, theme selector
2. **View Tabs** — 全部/读过/在读/想读/已拥有/已购买
3. **Hero/Manifesto** — Tagline + rotating quote block
4. **Stats Strip** — 7 stat cards in 8-column grid
5. **Workspace** — 3-column layout:
   - Year sidebar (sticky, scrollable)
   - Book list panel (scrollable, grouped by year)
   - Inspector panel (sticky, shows selected book details)
6. **Lower Grid** — 2-column:
   - Tag Cloud (主题索引)
   - Recent Notes (最近归档)

## Scroll behavior
- Year sidebar: sticky with `max-height: calc(100vh - 32px)`, independently scrollable
- Inspector panel: sticky with `top: 16px`
- Book list: normal flow

## State management
- View mode (全部/读过/在读/想读/已拥有/已购买)
- Year filter (all or specific year)
- Search query (filters by title, author, tags)
- Tag filter (click tag to filter)
- Selected book (for inspector panel)
- Theme (6 themes, stored in localStorage)
- Year list expansion (show/hide overflow years)

## Responsive breakpoints
- Desktop (max-width: 1080px): 3-column → single column
- Tablet (max-width: 720px): Major layout changes, sticky panels become static
- Small mobile (max-width: 390px): Further compaction