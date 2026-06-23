# Design Tokens - colors.ichuantong.cn

## Colors

### Body / Background
- Body background: `#00e09e` (rgb(0, 224, 158))
- Body background image: `url(bg.texture.png), url(bg.top.png)` (layered)
- Text color: `#333333` (rgb(51, 51, 51))
- Secondary text: `#50616d` (rgb(80, 97, 109))
- Page background: `#ffffeb` (rgb(255, 255, 235))

### UI Colors
- White: `#ffffff`
- Light gray: `#f0f0f0` (rgb(240, 240, 240))
- Category label text: `#75878a` (rgb(117, 135, 138))
- Category border: `#d2f0f4` (rgb(210, 240, 244))
- Decorative gold: `#eacd76` (rgb(234, 205, 118))
- Heart/favorite: `#ef7a82` (rgb(239, 122, 130))
- Info button: `#ffb3a7` (rgb(255, 179, 167))
- RGB labels: `#ffd143` (yellow), `#0aa344` (green), `#44cef6` (blue)
- Overlay: `rgba(2, 2, 2, 0.4)`

### Color Swatch Gradients (line1/line2)
- Each color swatch has two gradient lines representing the color
- The swatch uses `rgba(r, g, b, 0.3)` for the color bars

## Typography

### Font Family
- Primary: `"Fangzheng ZY", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei"`
- Numbers: `Arial`
- Base font size (html): `28px` (scaled up for the app)

### Font Sizes
- Chinese color name (H1 in HGROUP): Large display size
- Pinyin (H2): Smaller than color name
- Poem text: Moderate size
- Category label: ~12-14px
- Color param labels: Small
- HEX value: Readable

## Spacing
- Body padding: `0px 0px 154px` (bottom padding for ad banner)
- Section padding: varies by section

## Border Radius
- Color swatches: rounded
- Category items: rounded corners

## Shadows
- Box shadow on various elements

## Breakpoints
- The app appears to be designed for mobile-first with responsive adjustments
- Text scales with html font-size

## Key Assets
- `figure/hehuaqingting.png` - Decorative lotus/dragonfly figure (1200x1734)
- `assets/bg.texture.png` - Background texture overlay
- `assets/bg.top.png` - Top decorative background
- `assets/chinese.circle.border.png` - Color category circle icons
- `bgm.mp3` - Background music
- Logo - inline base64 PNG (192x192)
