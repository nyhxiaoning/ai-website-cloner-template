# Design Tokens: aiclotheschanger.io

## CSS Custom Properties
```css
--landing-background:     #fbfaf6;
--landing-background-muted: #f3efe6;
--landing-surface:        #ffffff;
--landing-surface-muted:  #faf8f3;
--landing-surface-subtle: #efebe2;
--landing-foreground:     #191613;
--landing-muted-foreground: #6e665a;
--landing-subtle-foreground: #8a8276;
--landing-contrast:       #191613;
--landing-contrast-foreground: #ffffff;
--landing-contrast-tint:  #f8f5ec;
--landing-border:         #e5ddcd;
--landing-divider:        #c9c0ac;
```

## Typography

| Role | Value |
|---|---|
| Body font | Inter, "Inter Fallback" |
| Display font | Fraunces, "Fraunces Fallback" |
| Base font size | 16px |
| Body color | `#191613` (light) / `#ece7dd` (dark) |
| Muted text | `#6e665a` |
| Subtle text | `#8a8276` |

## Colors (exact values from getComputedStyle)

| Token | Light | Dark |
|---|---|---|
| Background | `rgb(251, 250, 246)` (#fbfaf6) | — |
| Background muted | `rgb(243, 239, 230)` (#f3efe6) | `rgb(23, 20, 18)` (#171412) |
| Surface | `rgb(255, 255, 255)` (#ffffff) | — |
| Surface muted | `rgb(250, 248, 243)` (#faf8f3) | — |
| Surface subtle | `rgb(239, 235, 226)` (#efebe2) | `rgb(42, 37, 31)` (#2a251f) |
| Foreground | `rgb(25, 22, 19)` (#191613) | `rgb(236, 231, 221)` (#ece7dd) |
| Muted foreground | `rgb(110, 102, 90)` (#6e665a) | — |
| Subtle foreground | `rgb(138, 130, 118)` (#8a8276) | — |
| Contrast | `rgb(25, 22, 19)` (#191613) | — |
| Border | `rgb(229, 221, 205)` (#e5ddcd) | `rgb(58, 51, 43)` (#3a332b) |
| Divider | `rgb(201, 192, 172)` (#c9c0ac) | — |

## Spacing Patterns

| Pattern | Value |
|---|---|
| Section padding-y (sm) | `80px` (`py-20` at sm) |
| Section padding-y (lg) | `112px` (`lg:py-28`) |
| Section padding-x | `24px` (`px-4`), `40px` (`sm:px-6`) |
| Hero top padding | `96px` (`pt-20`), `112px` (`md:pt-24`) — accounts for fixed header |
| Grid gap (hero) | `8px` (`gap-8` lg) |
| Grid gap (hero lg) | `12px` (`lg:gap-12`) |
| Grid gap (thumbnails) | `8px` (`gap-2` sm `gap-3`) |
| Card border radius | `24px` (`rounded-[24px]`) |
| Card image border radius | `2px` smaller (`rounded-2xl` = 16px) |
| Thumbnail border radius | `16px` (`rounded-2xl`) |

## Font Weights & Sizes
- Headings: see component specs (Fraunces for display, Inter for body)
- Body: 16px, line-height normal
- Button text: `text-sm font-semibold`

## Border & Shadow
- Card border: `border-[var(--landing-border)]` = `#e5ddcd`
- Card shadow: `shadow-[0_32px_80px_rgba(25,22,19,0.16)]` (hero result panel)
- Card shadow subtle: `shadow-[0_2px_8px_rgba(25,22,19,0.08)]`
