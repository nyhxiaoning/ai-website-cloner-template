# DebateArena Specification

## Overview
- **Target file:** `src/components/DebateArena.tsx`
- **Interaction model:** click-driven (tab switching, dropdown selection)

## DOM Structure
Section container (bg-white/rounded-xl/border-gold)
  → Header: "对话广场 · 雅典论辩 (Symposium Arena)" + "THE PALESTRA symposium"
  → Description paragraph
  → Preset tabs (精选思想公案) — 4 debate topics as clickable pills
  → Philosopher comparison display (2 philosopher cards side by side)
  → Custom selection area (自定义群星对照) — 2 dropdowns
  → Action buttons

## Computed Styles
- Container: bg-white, rounded-xl, border-2 border-[#D4AF37], shadow-xl, p-5 sm:p-6, font-serif
- Header: text-lg, font-bold, text-[#0B2545]
- Preset pills: bg-white, hover:bg-[#EBF5F8], text-[9.5px], text-[#0D5C75], border, rounded, px-1.5 py-0.5, tracking-wide, font-serif, cursor-pointer
- Selected pill: active/highlighted state with [#D4AF37] border
- Select dropdowns: styled native selects

## Props
- philosophers: Philosopher[] (for dropdown options)
- debatePresets: DebatePreset[]
