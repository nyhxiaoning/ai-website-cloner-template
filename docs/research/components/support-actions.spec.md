# SupportActions Specification

## Overview
- **Target file:** `src/components/SupportActions.tsx`
- **Screenshot:** `docs/design-references/china.zecrs.com/desktop-fullpage.png`
- **Interaction model:** static (fixed position, links open externally)

## DOM Structure
```
div.support-actions.support-map (fixed position, bottom-right)
├── button: "我要反馈" (glass style, border-radius 11px, bg rgba(250,248,244,0.98))
└── a: "请我喝杯咖啡" (Ko-fi link, yellow bg, border-radius 11px)
└── a: "爱发电支持" (ifdian link, purple bg, border-radius 11px)
```

## Computed Styles

### div.support-actions.support-map
- position: fixed
- bottom: ~20px (estimated)
- right: ~20px (estimated)
- display: flex
- flex-direction: row
- gap: 7px
- height: 36px
- z-index: 100

### Buttons/Links
- font-size: 10px
- line-height: 15px
- padding: 0px 12px
- height: 36px
- display: flex
- flex-direction: row
- align-items: center
- gap: 6px
- border-radius: 11px
- border: 1px solid rgba(255, 255, 255, 0.78)
- box-shadow: rgba(56, 45, 32, 0.12) 0px 8px 24px 0px
- cursor: pointer
- text-decoration: none

### "我要反馈" button
- color: rgb(105, 99, 92)
- background-color: rgba(250, 248, 244, 0.98)
- border: 1px solid rgba(255, 255, 255, 0.78)

### "请我喝杯咖啡" (Ko-fi)
- color: rgb(116, 73, 31)
- background-color: rgb(255, 221, 112)
- border: 1px solid rgba(128, 87, 31, 0.12)

### "爱发电支持"
- color: rgb(255, 255, 255)
- background-color: rgb(148, 108, 230)
- border: 1px solid rgba(83, 54, 151, 0.25)

## Text Content
- "我要反馈"
- "请我喝杯咖啡"
- "爱发电支持"

## Links
- Ko-fi: https://ko-fi.com/haloha
- 爱发电: https://ifdian.net/a/haloha