# Setup Screen Specification

## Overview
- **Target file:** `src/components/SetupScreen.tsx`
- **Screenshots:** `docs/design-references/prompt-studio/desktop-setup.png`, `docs/design-references/prompt-studio/mobile-setup.png`, `docs/design-references/prompt-studio/tablet-setup.png`
- **Interaction model:** click-driven (button triggers `showDirectoryPicker()`)

## DOM Structure
```
<body>
  <div id="root">
    <main class="flex min-h-screen items-center justify-center bg-studio-bg px-6 text-studio-text">
      <section class="w-full max-w-xl rounded-lg border border-studio-border bg-studio-elev-1 p-8 shadow-2xl shadow-black/25">
        <div class="space-y-6">
          <div class="space-y-2">
            <p class="text-xs font-semibold uppercase tracking-wide text-studio-accent">Prompt Studio</p>
            <h1 class="font-sans text-2xl font-medium text-studio-text">选择工作目录</h1>
            <p class="text-sm leading-6 text-studio-text-dim">Prompt Studio 是本地运行的 AIGC 提示词工作台...</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <button class="...">选择工作目录</button>
          </div>
        </div>
      </section>
    </main>
    <div class="pointer-events-none fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-2" aria-live="polite"></div>
  </div>
</body>
```

## Design Tokens (Dark Mode - default)

### Colors (CSS Variables)
- `--studio-bg`: 14 14 16  → rgb(14, 14, 16)
- `--studio-text`: 237 237 237  → rgb(237, 237, 237)
- `--studio-text-dim`: 170 170 179  → rgb(170, 170, 179)
- `--studio-accent`: 244 162 97  → rgb(244, 162, 97)
- `--studio-on-accent`: 9 9 11  → rgb(9, 9, 11)
- `--studio-border`: 42 42 47  → rgb(42, 42, 47)
- `--studio-elev-1`: 22 22 24  → rgb(22, 22, 24)

### Light Mode
- `--studio-bg`: 243 241 236
- `--studio-text`: 35 34 31
- `--studio-text-dim`: 82 80 74
- `--studio-accent`: 159 74 12
- `--studio-on-accent`: 255 255 255
- `--studio-border`: 220 217 209
- `--studio-elev-1`: 249 248 244

## Computed Styles (exact values)

### main
- display: flex, flexDirection: row, justifyContent: center, alignItems: center
- minHeight: 100vh
- padding: 0px 24px
- backgroundColor: rgb(14, 14, 16) [dark] / rgb(243, 241, 236) [light]
- fontFamily: Geist, "Noto Sans SC", system-ui, sans-serif
- fontSize: 16px, fontWeight: 400, lineHeight: 24px

### section (card)
- display: block, maxWidth: 576px, width: 100%
- borderRadius: 8px
- border: 1px solid rgb(42, 42, 47) [dark] / rgb(220, 217, 209) [light]
- backgroundColor: rgb(22, 22, 24) [dark] / rgb(249, 248, 244) [light]
- padding: 32px
- boxShadow: rgba(0,0,0,0.25) 0px 25px 50px -12px

### Brand label (p:first-child)
- fontSize: 10px, fontWeight: 600
- color: rgb(244, 162, 97) [dark] / rgb(159, 74, 12) [light]
- textTransform: uppercase, letterSpacing: 0.25px
- lineHeight: 14px

### h1
- fontSize: 24px, fontWeight: 500
- color: rgb(237, 237, 237) [dark] / rgb(35, 34, 31) [light]
- lineHeight: 32px
- marginTop: 8px

### Description p
- fontSize: 12px, fontWeight: 400
- color: rgb(170, 170, 179) [dark] / rgb(82, 80, 74) [light]
- lineHeight: 24px
- marginTop: 8px

### Button
- fontSize: 12px, fontWeight: 600
- color: rgb(9, 9, 11)
- backgroundColor: rgb(244, 162, 97)
- padding: 8px 16px, borderRadius: 6px
- display: flex, justifyContent: center, alignItems: center
- transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), ... (full transition shorthand)
- cursor: pointer
- Hover: bg-studio-accent/90 (i.e., rgb(244, 162, 97) with 90% opacity)

## Spacing
- Inner content uses space-y-6 (24px gap between text block and button row)
- Text block uses space-y-2 (8px gap between label/heading/description)
- Card padding: 32px
- Label margin-top: 8px (margin on h1)
- Description margin-top: 8px (margin on p)
- Button group uses gap-3 (12px)
- Main padding: 0px 24px (horizontal only)

## Responsive Behavior
- **Desktop (1440px):** Card is 576px max-width, centered. Main has 24px horizontal padding.
- **Tablet (768px):** Card scales down, main padding adjusts.
- **Mobile (390px):** Card fills most width (w-full max-w-xl ≈ 448px), main padding px-6 (24px).

## Text Content (verbatim)
- Brand label: "Prompt Studio"
- Heading: "选择工作目录"
- Description: "Prompt Studio 是本地运行的 AIGC 提示词工作台。你的项目、片段和生成结果都只保存在你选的这个文件夹里，不上传、不联网。选一个文件夹开始。"
- Button: "选择工作目录"

## Fonts
- Primary: Geist (Google Fonts)
- Fallback: Noto Sans SC, system-ui, sans-serif
- Sizes: 10px (label), 12px (body), 16px (base), 24px (h1)

## Assets
- Favicon: `/vite.svg` from `https://prompt-studio-7gh.pages.dev/vite.svg`
- No images on this screen

## Implementation Notes
- Use CSS custom properties for the studio theme colors
- Implement dark/light theme toggle via `data-theme` attribute on `<html>`
- Theme preference stored in localStorage key `prompt-studio-theme`
- Theme values: "dark", "light", "system" (system = prefers-color-scheme)
- The button should call `showDirectoryPicker()` when clicked, but this API requires user gesture + HTTPS
- For the clone, the button can show a simulated "directory selected" flow
