# HudBottom Specification

## Overview
- **Target file:** `src/components/HudBottom.tsx`
- **Screenshot:** `docs/design-references/shiyun.cohenjikan.com/fullpage-desktop.png`
- **Interaction model:** static display (read-only info bar)

## DOM Structure
```
.hud-bottom (fixed, bottom:0, z-index:20)
  .hint
    "WASD 飞行 · 拖拽转向 · 滚轮调速 · "
    b "点诗星" "看其真作 · "
    b "点虚空" "从噪声里捞诗"
  .speed "速度 ×1.00 · 140 单位/秒"
```

## Props
```typescript
interface HudBottomProps {
  speed: number; // multiplier, e.g. 1.00
  velocity: number; // units/second, e.g. 140
}
```

## Computed Styles

### .hud-bottom
- color: #8b93a7 (--muted)
- pointer-events: none
- z-index: 20
- display: flex
- justify-content: space-between
- align-items: center
- padding: 14px 20px
- font-size: 12px
- position: fixed
- bottom: 0, left: 0, right: 0

### .hint b
- color: #ffd27a (--gold)
- font-weight: 600

### .speed
- color: #ffd27a (--gold)
- font-variant-numeric: tabular-nums

## States & Behaviors
- Speed value updates in real-time as user scrolls
- Hint text is static

## Responsive Behavior
### Mobile (≤600px)
- padding: 8px 12px calc(8px + env(safe-area-inset-bottom))
- .hint display: none
