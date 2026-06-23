# Page Topology - colors.ichuantong.cn

## Overview
A Chinese traditional color reference SPA (Single Page Application) built with React + Vite + styled-components. Users browse colors by category, select a color to view its details (CMYK/RGB/HEX values, name, pinyin), and see related poetry.

## Sections (top to bottom)

### 1. Background Music Player
- Fixed-position aside on the left side
- SVG music note icon (animated when playing), AUDIO element, and click tip
- Click to toggle play/pause of bgm.mp3

### 2. Color Category Selector (aside.colorSet)
- Vertical list of color family categories: 红, 黄, 绿, 蓝, 苍, 水, 灰白, 黑, 金银
- Current selection is highlighted ("selected" class)
- Each category has a decorative circle icon (chinese.circle.border.png)
- Collapse button at bottom

### 3. Color Navigation Bar (nav.colorNav)
- Horizontal scrollable row of individual color swatches
- Each swatch (LI) has two colored lines (line1, line2) showing the color
- Current color has "curr" class
- ~32+ individual colors visible

### 4. Color Detail Panel (HGROUP)
- Large Chinese color name (e.g., "青色")
- Favorite (heart) button
- Download button
- Pinyin romanization (e.g., "qīng sè")
- Poem excerpt related to the color
- Decorative figure image (hehuaqingting.png - lotus with dragonfly)

### 5. Color Parameters (section.params)
- CMYK values: C, M, Y, K with progress bars (SVG circle progress)
- RGB values: R, G, B (numeric)
- HEX value display with copy button

### 6. Header (HEADER)
- Logo image (inline base64)
- Title: "chinese color"

### 7. Action Buttons (section.btns)
- Info button
- Image/gallery button
- Screenshot button
- External link to Unsplash wallpaper
- External link to another tool

### 8. Footer (ASIDE)
- ICP备案号 link: "京ICP备16015459号-1"

## Fixed/Sticky Elements
- Music player is fixed-position on the left
- Color category selector appears to scroll with content on the left

## Dependencies
- Music player uses AUDIO element with bgm.mp3
- Figure image: figure/hehuaqingting.png
- Background textures: bg.texture.png, bg.top.png
- Color category icons: chinese.circle.border.png
- Logo: inline base64 PNG
- Wallpaper link: external image

## Interaction Model
- **Click-driven**: clicking a color category filters the color swatches below
- **Click-driven**: clicking a color swatch updates the detail panel (name, pinyin, poem, params)
- **Click-driven**: music player toggle
- **Click-driven**: favorite, download, info, screenshot buttons
