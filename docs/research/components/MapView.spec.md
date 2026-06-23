# MapView Specification

## Overview
- **Target file:** `src/components/MapView.tsx`
- **Screenshot:** `docs/design-references/desktop-full.png`
- **Interaction model:** Click-driven + scroll-driven (Leaflet map with interactive markers, navigation buttons)

## DOM Structure
```
div.relative.h-[750px]
  div.relative.w-full.h-full
    // Cloud decorations
    div.map-clouds
      div.cloud.cloud-1 ☁️
      div.cloud.cloud-2 ☁️
      div.cloud.cloud-3 ☁️
      div.cloud.cloud-4 ☁️
      div.cloud.cloud-5 ☁️

    // Character icons (top-right)
    div.absolute.top-4.right-4.flex.items-center.gap-2.z-20
      // Sun Wukong SVG
      svg.w-6.h-6.animate-bounce (gold monkey SVG)
      // Zhu Bajie SVG
      svg.w-5.h-5.animate-bounce.-ml-1 (pink pig SVG)
      // Sha Wujing SVG
      svg.w-5.h-5.animate-bounce.-ml-1 (brown monk SVG)
      // Tang Sanzang SVG
      svg.w-5.h-5.animate-bounce.-ml-1 (blue monk SVG)

    // Navigation controls (bottom-center)
    div.absolute.bottom-4.left-1/2.-translate-x-1/2.flex.items-center.gap-2.z-20
      button "开始" (start)
      button "重置" (reset)
      button "上一难" (previous)
      button "下一难" (next)
      button 🔊 (sound toggle)

    // Leaflet Map (full size)
    div.w-full.h-full.z-10.leaflet-container (id=map)
      // Route path SVG overlay
      path.route-animation (stroke="#ff6b6b", stroke-dasharray)
      path.river-flow (stroke="#4FC3F7")
      // 81 tribulation markers
      div.custom-marker markers for each of 81 locations
```

## Computed Styles

### Map Container
- height: 750px
- position: relative
- z-index: 10

### Character Bouncing SVGs
- Sun Wukong: w-6 h-6, animate-bounce, animation-delay: 0s
- Zhu Bajie: w-5 h-5, animate-bounce -ml-1, delay: 0.1s
- Sha Wujing: w-5 h-5, animate-bounce -ml-1, delay: 0.2s
- Tang Sanzang: w-5 h-5, animate-bounce -ml-1, delay: 0.3s

### Marker Styling
- width: 48px, height: 48px
- border-radius: 9999px (rounded-full)
- border: 4px solid white
- display: flex, align-items: center, justify-content: center
- font-size: 24px (text-2xl)
- box-shadow (shadow-lg)
- gradient backgrounds:
  - Chang'an (0): from-red-400 to-orange-400
  - Various: from-indigo-500 to-purple-600, from-red-600 to-red-800, from-blue-400 to-cyan-400, etc.
- hover: scale-110, -translate-y-1
- trial-number: absolute -top-2 -right-2, w-6 h-6, bg-red-500, text-white, rounded-full, text-xs, font-bold

### Navigation Buttons
- "开始": px-3 py-2 text-sm, text-white, rounded-full, gradient (from-green-500 to-emerald-600)
- "重置": px-3 py-2 text-sm, gradient (from-red-500 to-pink-500), text-white, rounded-full
- "上一难"/"下一难": px-3 py-2 text-sm, text-white, rounded-full, gradient (from-blue-500 to-indigo-600)
- "🔊": p-2, rounded-full, bg-green-500, text-white

### Cloud Styles
- See globals.css `.cloud` animations
- font-size: 1.5rem-2.5rem, opacity: 0.15
- cloudDrift animation (varying durations: 18s-28s)

## SVG Character Data

### Sun Wukong (金色猴子) - animation-delay: 0s
SVG 24x24 viewBox 0 0 64 64: circle gold face, gold crown circle, dark eyes, gold headband

### Zhu Bajie (粉色猪) - animation-delay: 0.1s
SVG 20x20 viewBox 0 0 64 64: pink pig face with blush, dark eyes

### Sha Wujing (棕色僧) - animation-delay: 0.2s
SVG 20x20 viewBox 0 0 64 64: brown face, dark eyes

### Tang Sanzang (红色僧) - animation-delay: 0.3s
SVG 20x20 viewBox 0 0 64 64: golden/red face, dark eyes

## Route Path Data
The route path is a complex SVG path with points connecting Chang'an to the Western Paradise. The main path:
M809 393L799 402L970 518...(81 connected points)

Route is drawn with:
- stroke: #ff6b6b (red), stroke-opacity: 0.5, stroke-width: 3
- dasharray animation: drawRoute 8s ease-in-out

River flows:
- stroke: #4FC3F7 (blue), stroke-opacity: 0.4, stroke-width: 2
- dasharray: 10 15, flow animation 3s linear infinite

## Implementation Notes
- Use Leaflet (react-leaflet or vanilla Leaflet) for the map
- Initialize map centered on China (lat: 35, lng: 108, zoom: 5)
- Use OpenStreetMap tiles
- Create custom markers for each tribulation
- Pre-create marker data with all 81 entries (emoji, gradient, position)
- Markers are interactive (clickable) with hover effects
- Navigation buttons cycle through markers
- The route path is drawn as an SVG overlay on the map

## Assets
- OpenStreetMap tiles (external CDN)
- Leaflet CSS (external CDN)
- Font Awesome icons (external CDN)
