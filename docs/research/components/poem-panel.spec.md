# PoemPanel Specification

## Overview
- **Target file:** `src/components/PoemPanel.tsx`
- **Screenshot:** `docs/design-references/shiyun.cohenjikan.com/fullpage-desktop.png`
- **Interaction model:** static display with click actions

## DOM Structure
```
.poem-panel (fixed, top:50%, right:24px, transform:translateY(-50%), z-index:25)
  ::before (gold gradient line at top)
  .panel-close "×" (aria-label="关闭")
  .poem-body (lang="zh")
    .poem-line (×8 for 五律, variable for other forms)
  .poem-meta
    .meta-row
      .meta-k "诗体"
      .meta-v "五言律诗"
    .meta-row.col
      .meta-k "全集编号"
        .meta-sub "唯一 · 跨诗体 · 193 位"
        .copy-btn "复制"
      .meta-v.idx.full (full decimal index)
    .meta-row
      .meta-k "格律编号"
      .meta-v.muted "非格律 · 虚空目录"
  .poem-foot
    "这首诗一直在诗云里，编号 193 位长 —— 地址几乎和诗本身一样长。"
    .poem-share
      .copy-btn.share "分享"
      .cinema-btn "留影"
      .cinema-btn.shiyi "收进拾遗"
```

## Props
```typescript
interface PoemPanelProps {
  poem: Poem;
  onClose: () => void;
  onShare: () => void;
  onCinema: () => void;
  onSave: () => void;
}
```

## Computed Styles

### .poem-panel
- backdrop-filter: blur(16px)
- z-index: 25
- background: radial-gradient(120% 60% at 50% 0, rgba(255,210,122,0.07), transparent 60%), linear-gradient(rgba(14,16,26,0.94), rgba(7,8,15,0.92))
- border: 1px solid rgba(255, 210, 122, 0.18)
- border-radius: 16px
- width: 340px
- max-height: 82vh
- padding: 26px 24px 22px
- position: fixed
- top: 50%
- right: 24px
- transform: translateY(-50%)
- box-shadow: rgba(0,0,0,0.55) 0 18px 60px, rgba(255,255,255,0.06) 0 1px inset
- animation: rise 0.32s cubic-bezier(0.2,0.7,0.2,1)

### ::before pseudo-element
- content: ""
- background: linear-gradient(90deg, transparent, #ffd27a, transparent)
- opacity: 0.55
- height: 1px
- position: absolute
- top: 0
- left: 22%
- right: 22%

### .panel-close
- color: #8b93a7
- cursor: pointer
- background: none
- border: none
- font-size: 22px
- line-height: 1
- position: absolute
- top: 10px
- right: 12px

### .poem-body
- font-family: var(--font-serif) — "Kaiti SC", STKaiti, KaiTi, etc.
- letter-spacing: 0.18em
- text-align: center
- color: #f6f2e6
- text-shadow: rgba(255,210,122,0.12) 0 1px 18px
- margin: 4px 0 20px
- font-size: 25px
- line-height: 2.05
- ::after: gold gradient divider line (38px wide, 1px tall, centered)

### .poem-line
- white-space: nowrap
- position: relative

### .poem-meta
- border-top: 1px solid rgba(255,255,255,0.08)
- flex-direction: column
- gap: 10px
- padding-top: 14px
- display: flex

### .meta-k
- color: var(--muted) #8b93a7
- letter-spacing: 0.1em
- font-size: 11px

### .meta-v
- color: var(--fg) #e8ecf4
- font-size: 13px

### .meta-v.idx
- word-break: break-all
- color: #b9c2d6
- max-height: 4.6em
- font-family: var(--font-mono)
- font-size: 11px
- line-height: 1.5
- overflow: auto

### .meta-v.idx.full
- max-height: none
- color: var(--gold) #ffd27a

### .copy-btn
- color: #ffd27a
- cursor: pointer
- vertical-align: middle
- white-space: nowrap
- background: rgba(255,210,122,0.12)
- border: 1px solid rgba(255,210,122,0.4)
- border-radius: 5px
- margin-left: 8px
- padding: 1px 7px
- font-size: 10px
- hover: background rgba(255,210,122,0.22)

### .copy-btn.share
- color: #bcd4ff
- background: rgba(130,180,255,0.14)
- border-color: rgba(130,180,255,0.42)
- border-radius: 6px
- padding: 3px 10px
- font-size: 11px
- hover: background rgba(130,180,255,0.24)

### .poem-foot
- color: var(--muted) #8b93a7
- margin-top: 16px
- font-size: 11px
- line-height: 1.6

### .cinema-btn
- Same as copy-btn base but margin-left: 8px
- padding: 3px 10px
- font-size: 11px

## Responsive Behavior
### Mobile (≤600px)
- max-height: 82dvh
- padding-bottom: calc(18px + env(safe-area-inset-bottom))
- border-radius: 16px 16px 0 0
- animation: sheet-up 0.28s (slide up from bottom)
- transform: none
- width: auto !important
- max-width: none !important
- inset: auto 0 0 !important
- .poem-body font-size: 22px

## Verification
- `npx tsc --noEmit` must pass
- Panel animates in with rise effect
- Close button works
- Copy button copies full index to clipboard
- Share/cinema/save buttons trigger callbacks
- Responsive: becomes bottom sheet on mobile
