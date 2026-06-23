# LoadingScreen Specification

## Overview
- **Target file:** `src/components/LoadingScreen.tsx`
- **Screenshot:** `docs/design-references/shiyun.cohenjikan.com/fullpage-desktop.png`
- **Interaction model:** static, auto-dismisses when 3D scene loads

## DOM Structure
```
.loading-screen (fixed, inset:0, z-index:50)
  .ls-title "诗云"
  .ls-sub "Poetry Cloud"
```

## Computed Styles

### .loading-screen
- z-index: 50
- background: #03040a
- flex-direction: column
- justify-content: center
- align-items: center
- gap: 10px
- display: flex
- position: fixed
- inset: 0

### .ls-title
- letter-spacing: 0.4em
- color: #ffd27a (--gold)
- font-size: 40px
- font-family: system serif stack

### .ls-sub
- color: #8b93a7 (--muted)
- letter-spacing: 0.2em
- font-size: 13px

## States & Behaviors
- Visible on initial load
- Hidden/faded out when 3D scene is ready
- Single state (no interactions)

## Props
```typescript
interface LoadingScreenProps {
  isLoading: boolean;
}
```

## Verification
- `npx tsc --noEmit` must pass
- Shows centered title + subtitle
- Auto-hides when isLoading=false
