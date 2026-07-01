# Footer Specification

## Overview
- **Target file:** `src/components/SiteFooter.tsx`
- **Interaction model:** static

## Content
- Logo image: decorative image at top of footer
- Text line 1: —— L O G O S · A C A D E M Y ——
- Text line 2: 西方哲学思想库交互史迹脉络图谱 © 2026. Designed with Athens Alabaster Marble & Mediterranean Aegean Blue Palette

## Styling
- Container: text-center, py-10 px-4, bg-gradient-to-b from-alabaster to-[#F2EDE2]/30
- Logo text: text-[10px] tracking-[0.3em] text-gold/60 font-mono mb-1
- Copyright text: text-[9px] tracking-wide text-aegean/40 font-serif leading-relaxed

## Structure
```
<footer class="text-center py-10 px-4 bg-gradient-to-b from-alabaster to-[#F2EDE2]/30">
  <p class="text-[10px] tracking-[0.3em] text-gold/60 font-mono mb-1">
    —— L O G O S · A C A D E M Y ——
  </p>
  <p class="text-[9px] tracking-wide text-aegean/40 font-serif leading-relaxed">
    西方哲学思想库交互史迹脉络图谱 © 2026. Designed with Athens Alabaster Marble & Mediterranean Aegean Blue Palette
  </p>
</footer>
```

## Props
- None (static content)
