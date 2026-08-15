# Behavior Inventory: https://aiclotheschanger.io

## Smooth Scroll / Libraries
- **None detected.** No Lenis, Locomotive Scroll, or custom smooth-scroll wrapper. Native scroll.

## Hero Section (Section 0)

### Person Photo Selection
- **Trigger:** Click on person thumbnail button
- **Active:** button gets `pressed` (aria-pressed), shows selected indicator (small border)
- **Content swap:** Result image updates (`p1c1.webp`, `p2c1.webp`, `p3c1.webp`) in the Before/After panel
- **Transition:** CSS transition on image opacity

### Clothing Photo Selection
- **Trigger:** Click on clothing thumbnail button (pressed=true)
- **Active clothing shows:** displayed in a removed item row + result image

### Person/Garment Mode Radio
- **Trigger:** Radio button toggle between "Use clothing photos" and "Describe an outfit"
- **Behavior:** Shows/hides clothing upload area

### Compare Slider
- **Structure:** Two overlapping images in a container; left = Before, right = After
- **Trigger:** Drag input range slider (or touch)
- **State:** Slider position 0 → 100 clips the After image

## Examples Section (Section 1) — Click-Driven Tab Switching

### Tab Buttons
- **4 buttons:** Featured, Logos & Text, Patterns & Prints, Flat Lay to Model
- **Property:** `aria-pressed` toggles between `true` / `false`
- **Style (active):** `bg-[var(--landing-contrast)] text-[var(--landing-contrast-foreground)]`
- **Style (inactive):** `border border-[var(--landing-border)] text-[var(--landing-foreground)]`

### Tab: Featured (default)
- Cards: Logo Hoodie Test, Floral Dress Test, Flat Lay to Model

### Tab: Logos & Text
- Cards: Logo Hoodie Test, Small Text Print Test

### Tab: Patterns & Prints
- Cards: Floral Dress Test, Plaid Alignment Test

### Tab: Flat Lay to Model
- Cards: Flat Lay to Model, Catalog Photo to Model

## Quality / Promises Section (Section 2) — 3 Toggle Groups

### Group 1: Image Fidelity (3 buttons)
- Keep logos and prints sharp / Preserve fabric texture / Match body pose and lighting
- One `pressed=true` at a time

### Group 2: Reference Flexibility (3 buttons)
- Flat lay clothing references / On-model clothing references / One model across your catalog

### Group 3: What You Download (3 buttons)
- Your framing, preserved / Full quality on every plan / Commercial usage

All 9 buttons use `aria-pressed`, `active:scale-95` on press, `transition-colors`.

## Pricing Section (Section 5) — Monthly/Yearly Toggle

### Toggle
- **2 buttons:** Monthly, Yearly 2 months free
- **Active (Monthly):** `bg-[var(--landing-contrast)] text-[var(--landing-contrast-foreground)]`
- **Inactive (Yearly):** text only, no fill
- Both styles: `rounded-full`, `font-semibold`, `transition-colors`

### Plans (unchanged between Monthly/Yearly — prices are constant in this page)
- Starter: $9.9/mo, 100 credits
- Creator: $19.9/mo, 250 credits (Most Popular badge)
- Seller: $39.9/mo, 580 credits

### Credit Pack
- Mini: $5.9, 40 credits

## FAQ Section (Section 6) — Radix Accordion

- **12 items**, first item open on page load (`aria-expanded="true"`)
- **Trigger:** button click, `aria-expanded` toggles
- **Animation:** `data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down`
- `overflow-hidden` on content container
- Single `Accordion` container with nested `AccordionItem` per question

## Header Behavior
- Fixed at top, `z-50`
- No scroll-driven state change detected (background stays transparent at scroll 0 and 300px)
- Uses Radix NavigationMenu for main nav links

## Hover States
- Cards: `group-hover/image:scale-[1.02]` on example images
- Buttons: `transition-colors`, `active:scale-95` on toggle buttons
- Links: standard color transitions

## Dark Mode
- Site has `dark:` class variants in Tailwind (e.g. `dark:bg-[#171412]`, `dark:text-[#ece7dd]`)
- System/dark mode toggle button in header (not extracted behavior)
- Primary site is light-mode; dark theme is a parallel variant
