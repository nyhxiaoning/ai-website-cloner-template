# 诗云 · Poetry Cloud - Page Topology

## Overview
A single-page 3D interactive star map for exploring classical Chinese poetry. Built with React Three Fiber + Three.js.

## Page Structure (top to bottom, z-order)

```
z-index 50: LoadingScreen (initial load overlay)
z-index 25: PoemPanel / PoetPanel (right side, poem detail)
z-index 22: SearchPanel (left side, dynasty legend / search)
z-index 21: (reserved for giftroam in original)
z-index 20: HudTop + HudBottom (fixed overlays)
z-index 10: StarMap (Three.js canvas, full viewport)
z-index 0: Background (#04050a dark void)
```

## Components

### 1. LoadingScreen (z-50)
- Full-screen overlay with centered "诗云" title and "Poetry Cloud" subtitle
- Auto-dismisses after scene loads (~1.5s simulated)
- Background: #03040a

### 2. StarMap (z-10)
- Full-viewport Three.js canvas
- Contains:
  - 50,000 background star particles (spherical distribution, r=20-300)
  - 20 poet name labels (HTML overlays via drei Html)
  - Interactive hit areas for poet clusters
- Controls:
  - OrbitControls (drag to rotate)
  - WASD keys for camera movement
  - Scroll wheel for speed adjustment
- Click handlers:
  - Click void → generate poem, open PoemPanel
  - Click star/poet → open PoetPanel

### 3. HudTop (z-20)
- Fixed top bar (position: fixed, top: 0)
- Title: "诗云" + "Poetry Cloud"
- Poetry type segment buttons: 五绝, 七绝, 五律(on), 七律, 自由
- Filter toggles: 常用字(on), 格律, 更多, 画质·低
- Stats: "32,657 诗人 · 933,857 首"
- UI hide button: "隐藏界面 · H"
- Responsive: wraps, hides title-en/stat/hide-btn on mobile

### 4. HudBottom (z-20)
- Fixed bottom bar
- Left: control hints (WASD, drag, scroll, click)
- Right: speed indicator "速度 ×1.00 · 140 单位/秒"
- Responsive: hint hidden on mobile

### 5. SearchPanel (z-22)
- Fixed position (top: 64px, left: 20px)
- Tabs: 诗人, 寻诗, 探诗, 朝代 (default active)
- Collapse button ▴
- When 朝代 tab active:
  - Preset buttons: 全部, 主要, 唐宋
  - Dynasty legend with 15 dynasty rows + color dots + toggle
  - Note row: 五代十国 · 已并入唐
- Other tabs show placeholder text
- Responsive: full-width on mobile

### 6. PoemPanel (z-25)
- Fixed right panel (top: 50%, right: 24px)
- Gradient background with gold accents
- Close button ×
- Poem body (8 lines, serif font, 25px)
- Metadata:
  - 诗体 (form type)
  - 全集编号 (full decimal index, copyable)
  - 格律编号 (meter index)
- Footer text
- Action buttons: 分享, 留影, 收进拾遗
- Animation: rise (0.32s cubic-bezier)
- Responsive: becomes bottom sheet on mobile

## Interaction Summary

| Action | Result |
|--------|--------|
| Click canvas (void) | Generate poem, show PoemPanel |
| Click poet label | Show PoetPanel |
| Drag | Rotate camera (OrbitControls) |
| WASD keys | Move camera through space |
| Scroll wheel | Adjust speed multiplier |
| Click poetry type | Switch active form |
| Toggle 常用字/格律 | Toggle filters |
| Click 朝代 row | Toggle dynasty visibility |
| Click preset (全部/主要/唐宋) | Batch toggle dynasties |
| Click hide UI | Toggle all UI visibility |
| Click poem panel close | Dismiss poem panel |

## Dependencies
- Three.js (@react-three/fiber, @react-three/drei)
- React 19
- Next.js 16
- Tailwind CSS v4
