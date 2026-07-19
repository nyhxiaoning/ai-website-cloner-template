# Behaviors — 大宁的阅读档案

## Interaction Model
- **Click-driven** — tabs, year buttons, book cards, tag filters
- **Scroll-driven** — year sidebar and inspector panel are sticky
- **Time-driven** — rotating reading quotes (7s interval)

## Quote Rotation
- **Trigger:** Timer (7000ms)
- **Animation:** Fade out (opacity: 1 → 0 over 180ms), swap text, fade in (0 → 1 over 180ms)
- **CSS class:** `.is-changing` sets `opacity: 0` on both blockquote and figcaption

## Theme Switching
- **Trigger:** Select dropdown change
- **Effect:** Sets `data-theme` attribute on `<html>` element
- **Persistence:** Saved to localStorage key `books-ledger:theme`
- **Themes:** github-light, vscode-dark, monokai, dracula, solarized-light, night-owl

## Book Card Selection
- **Trigger:** Click on book card
- **Effect:** Card gets `.is-selected` class, inspector panel updates
- **Transition:** background 0.18s, border-color 0.18s, box-shadow 0.18s, transform 0.18s
- **Hover:** translateY(-1px), border-color change

## Filtering
- **View tabs:** Filter books by status/ownership
- **Year buttons:** Filter books by year
- **Search:** Real-time filter by title, author, tags (case-insensitive)
- **Tag cloud:** Click tag to filter by tag, click again to remove

## Year List Overflow
- **Trigger:** Click "更多年份 +N" button
- **Effect:** Shows hidden years in separate grid, expands year list
- **Toggle:** Click again to collapse

## Data Sync
- **Status display:** Shows sync status when data is loaded/changed
- **Loading animation:** Infinite horizontal bar animation
- **Auto-hide:** After 4.2 seconds (configurable)