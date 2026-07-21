# PlaceCard Specification

## Overview
- **Target file:** `src/components/PlaceCard.tsx`
- **Screenshot:** `docs/design-references/china.zecrs.com/desktop-fullpage.png`
- **Interaction model:** click-driven (click to open detail)

## DOM Structure
```
article.place-card (grid, 344x137px, border-radius 16px, bg rgba(255,255,255,0.59), border 1px)
├── div.place-cover.cover-{0|1|2|3} (68x68px, border-radius 14px, position relative, gradient bg)
│   ├── div.image-placeholder (68x68px, flex column, center, with icon)
│   │   └── svg (Landmark/Mountain/City icon, 24px, color rgba(255,255,255,0.88))
│   └── b (absolute, top/left, 5A badge: bg rgba(255,246,217,0.9), color #7a2a20, border-radius 6px, padding 3px 5px, font-size 9px, font-weight 700, box-shadow)
├── div.place-copy (flex column, justify-content center, 224px width)
│   ├── div.place-title (flex row, justify-between, align-items center, gap 5px)
│   │   ├── text: place name
│   │   └── div.place-card-actions (flex row, gap 2px, 56px)
│   │       ├── button.visited-button (27x27px, border-radius 9px, display grid, center)
│   │       │   └── svg (Footprints icon, 15px, color #988f87)
│   │       └── button.heart-button (27x27px, border-radius 9px, display grid, center)
│   │           └── svg (Heart icon, 16px, color #b6332c)
│   ├── div.place-meta (flex row, align-items center, gap 6px, margin 5px 0 4px, 16px height)
│   │   ├── text: city/location
│   │   ├── svg (dot/separator)
│   │   ├── text: category
│   │   └── svg + text: "热门" (if hot)
│   ├── small (description, font-size 9px, line-height 13.05px, color #988f87, overflow hidden, 1 line)
│   ├── div.decision-facts (flex row, align-items center, gap 9px, margin 6px 0 0, 12px height)
│   │   ├── svg (clock icon)
│   │   ├── text: duration (e.g. "1–2 天")
│   │   ├── svg (separator dot)
│   │   ├── svg (ticket icon)
│   │   └── text: price info
│   └── div.card-reactions (flex row, gap 5px, margin 6px 0 0)
│       ├── button (emojis/reactions)
│       └── text: reaction count
└── svg (ChevronRight icon, 15px, color rgba(75,63,48,0.16), transition 0.16s)
```

## Computed Styles

### article.place-card
- display: grid (implicit 2 columns: 68px auto 15px)
- align-items: center
- gap: 10px
- padding: 9px 8px
- width: 344px
- height: 137.047px (auto)
- margin: 0px 0px 8px
- border-radius: 16px
- background-color: rgba(255, 255, 255, 0.59)
- border: 1px solid rgba(75, 63, 48, 0.08)
- position: relative (for badge positioning)
- cursor: pointer
- transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.18s, background 0.18s, box-shadow 0.2s

### .place-cover
- width: 68px
- height: 68px
- border-radius: 14px
- overflow: hidden
- position: relative
- display: grid
- align-items: center

### Rating badge (b inside .place-cover)
- position: absolute
- top: auto (pinned to top-left)
- left: auto
- font-size: 9px
- font-weight: 700
- line-height: 13.5px
- color: rgb(122, 42, 32)
- background-color: rgba(255, 246, 217, 0.9)
- padding: 3px 5px
- border-radius: 6px
- box-shadow: rgba(54, 31, 16, 0.12) 0px 3px 10px 0px

### .place-title
- display: flex
- flex-direction: row
- justify-content: space-between
- align-items: center
- gap: 5px
- font-size: 14px (estimated)
- font-weight: 600 (estimated)

### .place-meta
- display: flex
- flex-direction: row
- align-items: center
- gap: 6px
- margin: 5px 0px 4px
- height: 16px
- font-size: 9px
- color: #988f87

### small (description)
- font-size: 9px
- line-height: 13.05px
- color: rgb(152, 144, 135)
- display: flow-root
- overflow: hidden
- white-space: nowrap
- text-overflow: ellipsis

### .decision-facts
- display: flex
- flex-direction: row
- align-items: center
- gap: 9px
- margin: 6px 0px 0px
- height: 12px
- font-size: 9px
- color: #988f87

### .card-reactions
- display: flex
- flex-direction: row
- gap: 5px
- margin: 6px 0px 0px
- font-size: 9px
- color: #988f87

### .visited-button, .heart-button
- width: 27px
- height: 27px
- display: grid
- align-items: center
- border-radius: 9px
- cursor: pointer
- border: none
- background: transparent

### ChevronRight svg
- width: 15px
- height: 15px
- color: rgba(75, 63, 48, 0.16)
- transition: color 0.16s, transform 0.16s

## States & Behaviors
- **Hover (card):** transform: translateY(-1px), border-color: rgba(75, 63, 48, 0.16), background: rgba(255, 255, 255, 0.75), box-shadow: 0 4px 12px rgba(68, 54, 37, 0.12)
- **Hover (chevron):** color darkens, transform: translateX(2px)
- **Click (card):** Opens detail panel/modal for the place
- **Click (heart):** Toggle liked state
- **Click (visited):** Toggle visited state

## Cover Gradients (cycling)
- cover-0: linear-gradient(145deg, #9e7c5f, #634a3c)
- cover-1: linear-gradient(145deg, #8aa193, #476657)
- cover-2: linear-gradient(145deg, #a58c78, #75564f)
- cover-3: linear-gradient(145deg, #859aab, #4e6576)

## Placeholder Icon
Each cover shows a relevant icon (Landmark for heritage, Mountain for nature, etc.) in white at 24px, opacity 0.88

## Data Shape
```typescript
interface Place {
  id: string;
  name: string;
  location: string;
  category: PlaceCategory;
  rating: PlaceRating;
  description: string;
  duration: string;
  price: string;
  coverIndex: number;
  reactions: number;
  isHot: boolean;
  isVisited: boolean;
  isLiked: boolean;
}
```

## Responsive Behavior
- **Desktop (1440px):** Full card width 344px
- **Tablet (768px):** Card width adjusts to container
- **Mobile (390px):** Card width fills container, cover image may shrink