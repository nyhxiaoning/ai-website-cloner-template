# TopBar Specification

## Overview
- **Target file:** `src/components/TopBar.tsx`
- **Screenshot:** `docs/design-references/desktop-viewport.png`
- **Interaction model:** Static

## DOM Structure
header.topbar.glass > [grid: 427px | 520px | 427px]
  - button.brand (img.brand-mark + span > strong + small)
  - div.search-wrap (svg + input)
  - div.top-actions (button.footprint-count, button.collection-count, button.account-button, button.icon-button[EN], button.icon-button[moon], div.mobile-menu-wrap)

## Computed Styles

### Container (header.topbar.glass)
- display: grid
- gridTemplateColumns: 427px 520px 427px
- alignItems: center
- height: 68px
- padding: 0 14px
- marginBottom: 14px
- maxWidth: 1480px
- width: 100%
- borderRadius: 22px
- background: rgba(250, 248, 244, 0.72)
- border: 1px solid rgba(255, 255, 255, 0.78)
- boxShadow: rgba(68, 54, 37, 0.09) 0px 16px 45px 0px
- position: relative
- zIndex: 20

### Brand button
- display: flex, alignItems: center, gap: 11px
- cursor: pointer
- No background/border

### Brand icon (img.brand-mark)
- width: 39px, height: 39px
- borderRadius: 13px
- boxShadow: rgba(37, 34, 30, 0.16) 0px 8px 18px 0px
- objectFit: cover
- src: /images/app-icon.png

### Brand text
- strong: fontSize 16px (inherits), fontWeight 700
- small: fontSize 11px, color #988f87, display block

### Search wrap
- display: flex, alignItems: center, gap: 9px
- padding: 0 13px
- height: 42px
- width: 520px
- borderRadius: 14px
- backgroundColor: rgba(78, 66, 52, 0.055)
- transition: box-shadow 0.18s, background 0.18s

### Search input
- fontSize: 13px
- color: #25221e
- placeholder color: #988f87
- No border, no outline

### Action buttons (footprint-count, collection-count, account-button)
- fontSize: 11-12px
- color: #69635c
- backgroundColor: rgba(78, 66, 52, 0.055)
- padding: 0 10-11px
- height: 38px
- borderRadius: 12px
- display: flex, alignItems: center, gap: 5-6px
- cursor: pointer

### Icon buttons (EN, moon, settings)
- width: 38px, height: 38px
- backgroundColor: rgba(78, 66, 52, 0.055)
- borderRadius: 12px
- display: flex, justifyContent: center, alignItems: center
- transition: transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)

## Text Content (verbatim)
- Brand: "华夏迹" / "山河有迹，文明有声"
- Placeholder: "搜索景点、省份或城市"
- Buttons: footprint "0", "收藏 0", "登录", "EN"

## Assets
- App icon: /images/app-icon.png
- Icons: SearchIcon (lucide-search), FootprintsIcon (lucide-footprints), HeartIcon (lucide-heart), UserIcon (lucide-user-round), MoonIcon (lucide-moon)

## Responsive Behavior
- **Desktop (1440px):** Full 3-column grid layout
- **Mobile (390px):** Brand + search + hamburger menu; action buttons hidden (desktop-only-action class)
