# TimelineGrid Specification

## Overview
- **Target file:** `src/components/TimelineGrid.tsx`
- **Interaction model:** scroll-driven + click-driven

## DOM Structure
Container (relative, bg-alabaster)
  → Meander decoration (absolute positioned Greek key pattern)
  → Column decorations (left and right decorative elements)
  → Timeline area
    → For each era:
      → Era label (left side, vertical or styled text, 10px, font-bold, serif)
      → Sub-period markers (absolute positioned text labels)
      → Connection lines (SVG overlay)
      → Philosopher nodes (absolute positioned PhilosopherCard components)
    → AcademicSeal decorations

## Computed Styles
- Container: relative, w-full, overflow-hidden, bg-[#FAF8F5]/80
- Era label area: absolute, left-0, w-[80px] md:w-[100px], border-r, font-serif, bg-gradient, select-none
- Era label text: 10px, font-bold (first era) or font-normal, serif, text-[#0B2545] or text-gray
- Period markers: absolute positioned, 16px, text-[#0B2545], font-medium

## Key Design Details
- Era dividers with gold (#D4AF37) accents
- Left sidebar era labels - vertical text or rotated
- Sub-period markers above the philosopher rows
- School labels positioned between philosopher rows
- Connection lines showing academic succession (SVG arrows)
- Decorative top and bottom borders with gold trim
- Corner decorations (gold squares at corners)
- Dark gradient section backgrounds for certain eras
