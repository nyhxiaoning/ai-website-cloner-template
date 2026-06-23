# StarMap Specification

## Overview
- **Target file:** `src/components/StarMap.tsx`
- **Screenshot:** `docs/design-references/shiyun.cohenjikan.com/fullpage-desktop.png`
- **Interaction model:** click-driven + scroll-driven (WASD flight)

## DOM Structure
- Full-viewport Three.js `<canvas>` behind all HUD overlays
- Canvas has `cursor: crosshair`, `touch-action: none`
- Contains: star particles (32,657 poets as clusters), glow effects, poet labels

## Computed Styles
### Canvas
- display: block
- cursor: crosshair
- touch-action: none

### Poet Label (`.poet-label`)
- letter-spacing: 0.08em
- white-space: nowrap
- text-shadow: #000 0 0 6px, #000 0 0 2px
- opacity: 0.5
- user-select: none
- font-size: 11px
- transform: translateY(-10px)

### Poet Label Focus (`.poet-label.focus`)
- opacity: 1
- font-size: 15px
- font-weight: 600

## Implementation Approach
Use React Three Fiber (@react-three/fiber) with @react-three/drei.

### 3D Scene:
1. **Background**: Dark void (#04050a)
2. **Stars**: ~50,000 random Points with small size (0.5-2px), white/gold coloring
3. **Poet clusters**: 32,657 clusters represented as larger, brighter star groups with subtle color variation
4. **Glow effect**: Post-processing bloom if possible, or sprite-based glow
5. **Poet labels**: HTML overlays (drei Html component) positioned above large star clusters, fading in/out based on distance
6. **Click interaction**: Raycaster for click detection - click star = show PoetPanel, click void = generate new poem and show PoemPanel
7. **Controls**: OrbitControls with damping, WASD movement (implement with useFrame + keyboard state), scroll to adjust speed
8. **Camera**: PerspectiveCamera, initial position looking at origin

### Controls:
- OrbitControls from drei for mouse drag rotation
- Keyboard WASD for camera movement
- Scroll wheel for speed adjustment
- Custom pointer for crosshair

### Mock Data:
Generate random star positions using a seeded random function. Create "clusters" in specific regions representing dynasties. Each cluster has a name label (HTML overlay).

## States & Behaviors

### Click on void
- Generates a new poem (mock: random characters)
- Opens PoemPanel
- Full panel animate-in (rise animation 0.32s cubic-bezier(0.2,0.7,0.2,1))

### Click on star
- Opens PoetPanel for that poet
- Panel has same rise animation

### WASD Movement
- W/S: move forward/backward
- A/D: move left/right
- Speed displayed in HUD bottom

### Drag rotation
- Mouse drag rotates camera around origin
- OrbitControls with damping

### Scroll
- Adjust movement speed (not camera zoom)
- Speed value displayed in HUD bottom

## Dependencies
- `three` (installed)
- `@react-three/fiber` (installed)
- `@react-three/drei` (installed)
- `@types/three` (installed)

## Responsive Behavior
- Canvas fills entire viewport at all sizes
- On mobile: same 3D scene, touch controls instead of mouse

## Verification
- `npx tsc --noEmit` must pass
- Canvas fills full viewport
- Click on empty space triggers poem callback
- Click on star cluster triggers poet callback
- Controls work smoothly
