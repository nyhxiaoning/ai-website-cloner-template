# PhilosopherCard Specification

## Overview
- **Target file:** `src/components/PhilosopherCard.tsx`
- **Interaction model:** click-driven

## DOM Structure
Container (absolute positioned) → flex-col items-center
  - School label span (mono, 7.5px, uppercase)
  - Chinese name h3 (font-bold, ~12px)
  - English name span (text-[9px] or similar)

## Computed Styles
- Container: absolute, cursor-pointer, w-[100px] md:w-[114px] h-[38px] md:h-[42px], rounded, shadow-xs, flex flex-col items-center justify-center, border-l-[3px] with school color, bg-white/95, border border-[#D4AF37]/45
- School: text-[7.5px], tracking-wider, uppercase, font-mono, opacity-85, truncate, max-w-full
- Chinese name: tracking-tight, font-bold, text-xs (~12px)
- English name: text-[9px], text-gray-500

## States
- Default: opacity varies (0.88 for visible, lower for faded)
- Hover: border color changes to school accent
- Visible state changes based on filter selection

## Props
- philosopher: Philosopher
- isVisible: boolean
- onClick: () => void
