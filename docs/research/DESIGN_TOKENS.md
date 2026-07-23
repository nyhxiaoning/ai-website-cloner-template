# Prompt Studio Design Tokens

## Fonts
- Primary: Geist (Google Fonts, weights 400/500/600)
- CJK: Noto Sans SC (weights 400/500/600)
- Mono: Geist Mono (weights 400/500)
- Base: 16px / 400 / 24px line-height

## Colors (Dark mode - default)

### Surfaces
| Token | Value |
|-------|-------|
| --studio-bg | rgb(14, 14, 16) |
| --studio-elev-1 | rgb(22, 22, 24) |
| --studio-elev-2 | rgb(29, 29, 32) |
| --studio-elev-3 | rgb(37, 37, 42) |
| --studio-field | rgb(14, 14, 16) |

### Text
| Token | Value |
|-------|-------|
| --studio-text | rgb(237, 237, 237) |
| --studio-text-dim | rgb(170, 170, 179) |
| --studio-text-faint | rgb(140, 140, 149) |
| --studio-on-accent | rgb(9, 9, 11) |

### Semantic
| Token | Value |
|-------|-------|
| --studio-border | rgb(42, 42, 47) |
| --studio-border-strong | rgb(58, 58, 66) |
| --studio-accent | rgb(244, 162, 97) |
| --studio-neg | rgb(217, 119, 87) |
| --studio-ok | rgb(122, 184, 122) |
| --studio-warn | rgb(175, 57, 31) |
| --studio-info | rgb(107, 155, 209) |

### Accent Colors
| Token | Value |
|-------|-------|
| --studio-rule | rgb(178, 148, 214) |
| --studio-style | rgb(233, 196, 106) |
| --studio-char | rgb(200, 156, 184) |
| --studio-compo | rgb(107, 155, 209) |

## Colors (Light mode)
| Token | Dark | Light |
|-------|------|-------|
| --studio-bg | 14 14 16 | 243 241 236 |
| --studio-elev-1 | 22 22 24 | 249 248 244 |
| --studio-elev-2 | 29 29 32 | 252 251 249 |
| --studio-elev-3 | 37 37 42 | 255 255 255 |
| --studio-text | 237 237 237 | 35 34 31 |
| --studio-text-dim | 170 170 179 | 82 80 74 |
| --studio-text-faint | 140 140 149 | 110 108 101 |
| --studio-accent | 244 162 97 | 159 74 12 |
| --studio-border | 42 42 47 | 220 217 209 |
| --studio-on-accent | 9 9 11 | 255 255 255 |

## Spacing
- 4px base (Tailwind default)
- Common: p-8 (32px), p-4 (16px), p-3 (12px), p-2 (8px), p-1.5 (6px)
- Section padding: px-8 py-10 (32px 40px)
- Card padding: 32px (setup), 12px (board cards)

## Typography Scale
| Element | Size | Weight | Line-height |
|---------|------|--------|-------------|
| Brand label | 10px | 600 | 14px |
| Body text | 12px | 400 | 24px |
| Button text | 12px | 600 | 16px |
| H1 | 24px | 500 | 32px |
| H2 | 18px | 600 | 28px |
| Card title | 14px | 500 | 20px |
| Caption | 10px | 500 | 14px |

## Border Radius
| Class | Value | Used for |
|-------|-------|---------|
| --radius / rounded-lg | 8px | Cards, sections |
| --radius-md / rounded-md | 6.4px (calc 0.8×) | Buttons, inputs |
| rounded-full | 9999px | Pills, badges |

## Shadows
- Card: `rgba(0,0,0,0.25) 0px 25px 50px -12px` (shadow-2xl)
- Modal: `shadow-2xl`
- Popover: `shadow-xl`
