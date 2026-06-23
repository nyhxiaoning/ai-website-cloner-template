# HudTop Specification

## Overview
- **Target file:** `src/components/HudTop.tsx`
- **Screenshot:** `docs/design-references/shiyun.cohenjikan.com/fullpage-desktop.png`
- **Interaction model:** static layout with button clicks

## DOM Structure
```
.hud-top (fixed, top:0, z-index:20)
  .title (cursor:pointer) "诗云"
    .title-en "Poetry Cloud"
  .seg (Poem type selector, border: 1px solid rgba(255,255,255,0.12), border-radius:8px)
    .seg-btn "五绝"
    .seg-btn "七绝"
    .seg-btn.on "五律"  ← active
    .seg-btn "七律"
    .seg-btn "自由"
  .filter.on "常用字"  ← active filter with gold border
  .filter "格律"
  .filter "更多"
  .filter "画质·低"
  .stat "32,657 诗人 · 933,857 首"
  .ui-hide-btn "隐藏界面 · H"
```

## Props
```typescript
interface HudTopProps {
  poetryType: PoetryType;
  onPoetryTypeChange: (type: PoetryType) => void;
  commonChars: boolean;
  onCommonCharsToggle: () => void;
  metered: boolean;
  onMeteredToggle: () => void;
  onMoreClick: () => void;
  onHideClick: () => void;
}
```

## Computed Styles

### .hud-top
- position: fixed
- top: 0, left: 0, right: 0
- z-index: 20
- pointer-events: none
- display: flex
- align-items: center
- gap: 18px
- padding: 16px 20px
- Children: pointer-events: auto

### .title
- letter-spacing: 0.18em
- color: #ffd27a (--gold)
- font-size: 20px
- font-weight: 600
- cursor: pointer

### .title-en
- letter-spacing: 0.25em
- color: #8b93a7 (--muted)
- margin-left: 6px
- font-size: 11px

### .seg
- border: 1px solid rgba(255, 255, 255, 0.12)
- border-radius: 8px
- display: flex
- overflow: hidden

### .seg-btn
- color: #8b93a7 (--muted)
- cursor: pointer
- background: none
- border: none
- padding: 6px 13px
- font-size: 13px

### .seg-btn.on
- color: #ffd27a (--gold)
- background: rgba(255, 210, 122, 0.16)

### .filter
- color: #8b93a7 (--muted)
- cursor: pointer
- background: rgba(255, 255, 255, 0.04)
- border: 1px solid rgba(255, 255, 255, 0.12)
- border-radius: 8px
- padding: 6px 14px
- font-size: 13px

### .filter.on
- color: #ffd27a (--gold)
- background: rgba(255, 210, 122, 0.1)
- border-color: rgba(255, 210, 122, 0.5)

### .stat
- color: #8b93a7 (--muted)
- letter-spacing: 0.05em
- margin-left: auto
- font-size: 12px

### .ui-hide-btn
- color: #8b93a7 (--muted)
- cursor: pointer
- background: rgba(255, 255, 255, 0.04)
- border: 1px solid rgba(255, 255, 255, 0.12)
- border-radius: 8px
- padding: 6px 12px
- font-size: 12px
- hover: color: var(--gold), border-color: rgba(255,210,122,0.4)

## States & Behaviors

### Active poetry type
- The selected type button has class .on → gold text on gold-tinted background
- Clicking changes the active type
- All available types: "五绝", "七绝", "五律", "七律", "自由"
- "自由" has title attr: "词 / 自由诗:任意长度、换行也由编号决定;新诗/古体的编号也在这套目录里"

### Active filter
- "常用字" and "格律" are toggle filters with .on state
- "常用字" title: "只用最常见的字,避开生僻乱码"
- "格律" title: "只捕捉合平仄、押韵的诗（平水韵）"
- "更多" title: "更多：指引 / 行星 / 赠诗 / 引力 / 关于 / 反馈"
- "画质·低" title: "画质：高=16万粒子+辉光；低=更少粒子、关闭辉光（弱显卡更流畅）"

## Responsive Behavior
### Mobile (≤600px)
- .hud-top padding: calc(8px + env(safe-area-inset-top)) 10px 8px
- flex-wrap: wrap, gap: 8px
- .title font-size: 17px, letter-spacing: 0.1em
- .title-en, .stat, .ui-hide-btn display: none
- .seg-btn, .filter padding: 7px 11px

## Verification
- `npx tsc --noEmit` must pass
- All buttons render with correct text
- Active state toggle works
- Responsive: title-en hides on mobile
