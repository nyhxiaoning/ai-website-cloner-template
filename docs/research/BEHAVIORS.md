# Behaviors - colors.ichuantong.cn

## Page-Level Behaviors

### Background Color Transition
- **Trigger**: Clicking a different color swatch
- **What changes**: Body `background-color` transitions from current to the selected color
- **Transition**: `background-color 1.6s` (CSS transition on body element)
- **Body bg layers**: Texture overlay (bg.texture.png repeated) + top decorative bar (bg.top.png repeated-x at top)

### Page Layout
- **Orientation**: Fixed-width horizontal layout (viewport height: 900px)
- **Scroll**: Color nav panel is scrollable vertically (`overflow: auto scroll`)
- **Responsive**: Not tested at mobile yet but the 28px base font suggests the app uses `rem` scaling

## Interactive Behaviors

### Color Category Selection
- **Trigger**: Click on category label (红, 黄, 绿, 蓝, 苍, 水, 灰白, 黑, 金银)
- **What changes**: Selected state toggled (`.selected` class), color swatch list updates to show colors in that category
- **Transition**: Not observed - appears to re-render the list

### Color Swatch Selection
- **Trigger**: Click on individual color swatch from the nav list
- **What changes**:
  - Color swatch gets `.curr` class
  - Color detail panel updates: color name, pinyin, poem changes
  - Body background transitions to new color
  - CMYK/RGB/HEX values update
  - Figure image may change
- **Transition**: `opacity 0.5s`, body bg `1.6s`

### Music Player Toggle
- **Trigger**: Click on the aside with music icon
- **What changes**:
  - SVG animation state
  - `.paused` class toggled on the aside element
  - AUDIO element play/pause
- **Tip text**: "👈 点击播放" (click to play)

### Favorite Button
- **Trigger**: Click on heart icon
- **What changes**: Heart fill state toggles

### Download Button
- **Trigger**: Click on download icon
- **What changes**: Triggers download/save of current color

### Info Button
- **Trigger**: Click on info icon
- **What changes**: Opens/shows additional info

### Screenshot Button
- **Trigger**: Click on screenshot icon
- **What changes**: Captures the current color display

## Hover States
- Color swatch items have opacity changes
- Interactive elements likely have hover cursor changes

## Static Elements (No Interactivity)
- Header (logo + "chinese color" title) - static display
- Footer ICP link - static link
- Poem text - static display
- Color name and pinyin - static display (updated on selection)
- CMYK/RGB/HEX values - static display (updated on selection)

## Color Data
- The app contains color data for ~9 categories: 红, 黄, 绿, 蓝, 苍, 水, 灰白, 黑, 金银
- Each category contains multiple individual colors
- Each color has: name (Chinese), pinyin, CMYK values, RGB values, HEX value, related poem, and figure image
