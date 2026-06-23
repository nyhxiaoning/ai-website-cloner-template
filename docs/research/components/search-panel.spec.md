# SearchPanel Specification (including DynastyLegend)

## Overview
- **Target file:** `src/components/SearchPanel.tsx`
- **Screenshot:** `docs/design-references/shiyun.cohenjikan.com/fullpage-desktop.png`
- **Interaction model:** click-driven tab switching + dynasty legend toggles

## DOM Structure
```
.search (fixed, top:64px, left:20px, z-index:22, width:min(384px, 100vw-36px))
  .search-tabs
    .stab "诗人"
    .stab "寻诗"
    .stab "探诗"
    .stab.on "朝代"  ← active
    .stab.collapse "▴"  (title="收起")
  .line-results (appears when 朝代 or 寻诗 active)
    .lr-section
      .legend-presets
        button "全部"
        button "主要"
        button "唐宋"
      .legend-list
        .legend-row (×15 dynasties)
          .dot (style="background: rgb(47,214,207)")
          .legend-label "先秦"
        .legend-row.note "五代十国 · 已并入唐"
          .dot (style="background: rgb(255,172,90); opacity:0.4")
```

## Props
```typescript
interface SearchPanelProps {
  activeTab: SearchTab;
  onTabChange: (tab: SearchTab) => void;
  collapsed: boolean;
  onCollapse: () => void;
  dynasties: Dynasty[];
  onDynastyToggle: (id: string) => void;
  onPresetClick: (preset: 'all' | 'major' | 'tang-song') => void;
}
```

## Computed Styles

### .search
- z-index: 22
- width: min(384px, calc(100vw - 36px))
- max-width: calc(100vw - 36px)
- position: fixed
- top: 64px
- left: 20px
- .search.collapsed width: auto

### .search-tabs
- gap: 6px
- margin-bottom: 6px
- display: flex

### .stab
- text-align: center
- white-space: nowrap
- color: #8b93a7
- cursor: pointer
- background: rgba(8,10,18,0.72)
- border: 1px solid rgba(255,255,255,0.14)
- border-radius: 8px
- flex: 1
- padding: 5px 4px
- font-size: 13px
- .stab.on: color:#04050a, background:#ffd27a, border-color:#ffd27a, font-weight:600
- .stab.collapse: flex: 0 0 auto, padding: 5px 11px

### .line-results
- backdrop-filter: blur(12px)
- background: rgba(8,10,18,0.92)
- border: 1px solid rgba(255,255,255,0.1)
- border-radius: 10px
- max-height: 56vh
- margin-top: 6px
- overflow: auto

### .lr-section
- border-bottom: 1px solid rgba(255,255,255,0.06)
- padding: 6px 0
- last-child: border-bottom: none

### .legend-presets
- gap: 4px
- display: flex
- padding: 0 14px
- margin-bottom: 6px

### .legend-presets button
- color: #8b93a7
- cursor: pointer
- background: rgba(255,255,255,0.05)
- border: 1px solid rgba(255,255,255,0.1)
- border-radius: 6px
- flex: 1
- padding: 3px 0
- font-size: 11px
- hover: color: var(--fg)

### .legend-list
- flex-direction: column
- gap: 1px
- display: flex

### .legend-row
- cursor: pointer
- color: #e8ecf4 (--fg)
- text-align: left
- background: none
- border: none
- border-radius: 6px
- align-items: center
- gap: 8px
- padding: 4px 14px
- font-size: 13px
- display: flex
- width: 100%
- hover: background rgba(255,255,255,0.05)
- .legend-row.off: opacity 0.32, .legend-label text-decoration: line-through
- .legend-row.note: cursor default, color #8b93a7, no hover bg
- .legend-row.note .dot opacity 0.4

### .dot
- border-radius: 50%
- flex: 0 0 auto
- width: 9px
- height: 9px
- box-shadow: 0 0 6px

## Dynasty Colors
| Dynasty | Color |
|---------|-------|
| 先秦 | rgb(47, 214, 207) |
| 秦汉 | rgb(54, 208, 154) |
| 魏晋 | rgb(73, 192, 110) |
| 南北朝 | rgb(124, 186, 82) |
| 隋 | rgb(168, 184, 74) |
| 唐 | rgb(255, 210, 122) - gold |
| 宋 | rgb(110, 231, 168) |
| 辽 | rgb(143, 208, 192) |
| 金 | rgb(176, 201, 138) |
| 元 | rgb(183, 148, 246) |
| 明 | rgb(246, 117, 154) |
| 清 | rgb(255, 140, 90) |
| 近现代 | rgb(255, 111, 145) |
| 当代 | rgb(217, 111, 176) |

Note: 五代十国 is shown as a non-interactive note row with muted gold dot.

## States & Behaviors
- Clicking a dynasty row toggles its visibility (adds/removes .off class)
- Clicking presets (全部/主要/唐宋) shows/hides groups of dynasties
- Tab switching: 诗人/寻诗/探诗/朝代 tabs switch what's shown in .line-results
- Collapse button hides the search panel to just the tab bar
- "诗人" tab: show search input + poet results
- "寻诗" tab: show search input + poem search
- "探诗" tab: show explore interface
- "朝代" tab: show dynasty legend (default)

## Responsive Behavior
### Mobile (≤600px)
- top: calc(var(--hud-h, 104px) + 8px)
- width: auto, max-width: none
- left: 8px, right: 8px
- .line-results max-height: 52dvh

## Verification
- `npx tsc --noEmit` must pass
- All dynasty buttons render with correct colors
- Toggle visibility works (off class toggle)
- Preset buttons work
- Collapse button works
- Tab switching works
