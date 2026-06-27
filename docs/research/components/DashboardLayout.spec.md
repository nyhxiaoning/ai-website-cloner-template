# DashboardLayout Specification

## Overview
- **Target file:** `src/components/DashboardLayout.tsx`
- **Interaction model:** click-driven (sidebar navigation), scroll-driven (content)
- **Components needed:** Sidebar, Toolbar, Tabbar, Content area

## DOM Structure
```
DashboardLayout (full-height flex container)
├── Sidebar (fixed left, 240px wide, dark background)
│   ├── Logo area (64px height, centered)
│   │   ├── Logo icon (size-6)
│   │   └── App name "Fantastic-admin"
│   ├── Navigation menu (scrollable)
│   │   └── Menu items with icons, labels, badges
│   └── Collapse toggle (bottom)
├── Main area (flex-1, overflow hidden)
│   ├── Toolbar (56px height, top fixed)
│   │   ├── Sidebar toggle + Breadcrumb
│   │   ├── Search
│   │   ├── Notification bell (with badge)
│   │   ├── Fullscreen toggle
│   │   ├── Theme toggle (light/dark)
│   │   └── User avatar dropdown
│   ├── Tabbar (42px height)
│   │   └── Open tabs with close buttons
│   └── Content (flex-1, scrollable)
│       └── {children}
```

## Design Tokens (from globals.css)
- `--g-header-height: 56px`
- `--g-toolbar-height: 56px`
- `--g-tabbar-height: 42px`
- `--g-sidebar-width: 240px`
- `--g-sidebar-collapsed-width: 64px`
- `--g-toolbar-bg: oklch(var(--background))`

## Sidebar Details
- Width: 240px (expanded), 64px (collapsed)
- Background: oklch(var(--sidebar))
- Border-right: 1px solid oklch(var(--sidebar-border))
- Navigation items: flex items-center, padding, hover:bg-sidebar-accent
- Active item: highlighted with primary color
- Menu item icon: 20px (size-5), margin-right
- Badge: small rounded pill (px-2 py-0.5 rounded-full)
- Submenu: indented, collapsible with chevron
- Logo area: 56px height, flex-center, border-bottom

## Toolbar Details
- Height: 56px
- Background: oklch(var(--background))
- Border-bottom: 1px solid oklch(var(--border))
- Flex, items-center, justify-between
- Left section: sidebar toggle (Menu icon) + breadcrumb
- Right section: search icon, bell icon (with red badge), fullscreen, theme toggle, user avatar

## Tabbar Details
- Height: 42px
- Background: oklch(var(--background))
- Border-bottom: 1px solid oklch(var(--border))
- Horizontal scrollable tabs
- Each tab: name + X close button
- Active tab: primary color bottom border

## Responsive Behavior
- **Desktop (1440px):** Full sidebar visible, toolbar with all controls
- **Tablet (768px):** Sidebar collapsed by default, overlay when expanded
- **Mobile (390px):** Sidebar hidden (drawer/modal), toolbar simplified

## Implementation Notes
- Use React context for sidebar collapse state
- Accept `children` prop for content area
- Use `'use client'`
- Import from @/components/icons: Menu, Bell, Search, Sun, Moon, Maximize2, User, ChevronLeft, ChevronDown, LogOut, Settings, Sidebar
- Import shadcn components: Button, Avatar, AvatarImage, AvatarFallback, Badge, ScrollArea
- Dark mode: use a ThemeProvider context that toggles .dark class on html element
- Verify with `npx tsc --noEmit` before finishing
