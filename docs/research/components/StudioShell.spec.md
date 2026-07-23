# StudioShell Specification

## Overview
- **Target file:** `src/components/StudioShell.tsx`
- **Screenshot:** `docs/design-references/prompt-studio/qa-workspace-desktop.png`
- **Interaction model:** static layout with click-driven navigation

## DOM Structure
```
<div class="min-h-screen bg-studio-bg">
  <aside class="border-b border-studio-border bg-studio-elev-1/95 px-4 py-4 md:sticky md:top-0 md:flex md:h-screen md:w-60 md:shrink-0 md:flex-col md:border-b-0 md:border-r">
    <div>
      <p class="text-[10px] font-semibold uppercase tracking-wider text-studio-accent">Prompt Studio</p>
      <p class="mt-0.5 text-[10px] text-studio-text-faint">本地工作台</p>
    </div>
    <div class="mt-6 min-w-0 md:flex md:min-h-0 md:flex-1 md:flex-col">
      <!-- Projects nav -->
      <Link href="/" class="...text-studio-text-faint...">项目</Link>
      <div class="mt-1 space-y-1 md:min-h-0 md:flex-1 md:overflow-y-auto">
        <!-- Project links -->
      </div>
      <!-- Library nav -->
      <nav class="mt-4 space-y-1 border-t border-studio-border pt-4">
        <Link href="/snippets">片段库</Link>
        <Link href="/rules">规则库</Link>
        <button>从 Agent 导入结果</button>
      </nav>
    </div>
  </aside>
  <div class="min-w-0 flex-1">{children}</div>
</div>
```

## Computed Styles

### aside
- backgroundColor: rgb(var(--studio-elev-1)) with 0.95 opacity
- border-bottom: 1px solid rgb(var(--studio-border))
- border-right: 1px solid rgb(var(--studio-border)) on md+
- padding: 16px (px-4 py-4)
- md: sticky, top: 0, height: 100vh, width: 15rem (240px)

### Brand label
- fontSize: 10px, fontWeight: 600
- textTransform: uppercase, letterSpacing: wider
- color: rgb(var(--studio-accent))

### "本地工作台"
- fontSize: 10px, color: rgb(var(--studio-text-faint))

### Nav items (projects)
- fontSize: 12px (text-xs), fontWeight: 600, textTransform: uppercase
- Active: color: rgb(var(--studio-accent))
- Inactive: color: rgb(var(--studio-text-faint)) → hover: rgb(var(--studio-text))

### Nav items (library)
- fontSize: 12px, color: rgb(var(--studio-text-dim))
- Hover: bg-studio-elev-2, text-studio-text

## Responsive Behavior
- **Mobile (< 768px):** Sidebar becomes a horizontal top bar (border-b only, no border-r, no sticky). Projects and library stacked vertically.
- **Desktop (≥ 768px):** Sidebar is sticky, full-height, 240px wide, with border-right.

## Text Content (verbatim)
- Brand: "Prompt Studio"
- Subtitle: "本地工作台"
- Nav: "项目", "片段库", "规则库", "从 Agent 导入结果"
