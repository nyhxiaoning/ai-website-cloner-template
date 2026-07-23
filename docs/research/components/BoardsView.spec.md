# BoardsView Specification

## Overview
- **Target file:** `src/components/BoardsView.tsx`
- **Screenshot:** `docs/design-references/prompt-studio/qa-workspace-desktop.png`
- **Interaction model:** click-driven (clicking a prompt card navigates to editor)

## DOM Structure
```
<main class="min-h-screen bg-studio-bg px-8 py-10 text-studio-text">
  <div class="px-8 py-10">
    <h1 class="font-sans text-2xl font-medium text-studio-text">看板</h1>
    <p class="mt-2 text-sm text-studio-text-dim">X 个看板 · Y 个 Prompt</p>
  </div>
  <div class="grid gap-6 px-8 pb-10 sm:grid-cols-2 lg:grid-cols-3">
    <!-- Board cards -->
    <div class="rounded-lg border border-studio-border bg-studio-elev-1 overflow-hidden">
      <div class="border-b border-studio-border px-4 py-3">
        <h2 class="text-sm font-semibold text-studio-text">{name}</h2>
        <p class="text-xs text-studio-text-faint">{count} 个 Prompt</p>
      </div>
      <div class="p-3 space-y-2">
        <!-- Prompt cards -->
        <button class="block w-full rounded-md border border-studio-border bg-studio-field p-3 text-left transition hover:border-studio-border-strong">
          <p class="text-sm font-medium text-studio-text truncate">{title}</p>
          <p class="mt-1 text-xs text-studio-text-faint line-clamp-2">{content}</p>
        </button>
      </div>
    </div>
  </div>
</main>
```

## Computed Styles

### main
- padding: 40px 32px (px-8 py-10)
- backgroundColor: rgb(var(--studio-bg))

### Board card
- borderRadius: 8px (rounded-lg)
- border: 1px solid rgb(var(--studio-border))
- backgroundColor: rgb(var(--studio-elev-1))

### Board header
- border-bottom: 1px solid rgb(var(--studio-border))
- padding: 12px 16px (px-4 py-3)

### Prompt card
- borderRadius: 6px (rounded-md)
- border: 1px solid rgb(var(--studio-border))
- backgroundColor: rgb(var(--studio-field))
- padding: 12px (p-3)
- Hover: border-studio-border-strong

## Responsive Behavior
- **Desktop:** 3 columns (lg:grid-cols-3)
- **Tablet:** 2 columns (sm:grid-cols-2)
- **Mobile:** 1 column (default)
