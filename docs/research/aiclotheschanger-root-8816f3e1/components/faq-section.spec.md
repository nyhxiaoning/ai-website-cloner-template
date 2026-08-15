# FAQ Section Specification

## Overview
- **Target file:** `src/components/sites/aiclotheschanger-root-8816f3e1/FaqSection.tsx`
- **Screenshot:** `docs/design-references/aiclotheschanger-root-8816f3e1/full-page-desktop-1440.png`
- **Interaction model:** click-driven (Radix Accordion, 12 items, first open by default)

## DOM Structure
```
<section class="bg-[var(--landing-background)] px-4 py-20 ...">
  <div class="mx-auto max-w-7xl">
    <h2>Questions before you change clothes with AI</h2>
    <p>Learn how the AI clothes changer handles garments...</p>

    <div class="flex justify-center">
      <p class="text-sm">Ready to change an outfit? Try the AI clothes changer with your own photo.</p>
      <a href="#hero">Change an outfit free</a>
    </div>

    <!-- Radix Accordion -->
    <div class="w-full">
      <!-- Item 1 (open by default) -->
      <div data-state="open" class="border-b border-[var(--landing-border)]">
        <h3>
          <button
            id="radix-1"
            aria-expanded="true"
            aria-controls="radix-content-1"
            class="flex w-full items-center justify-between py-5 text-left text-base font-medium"
          >
            What is an AI Clothes Changer?
            <ChevronDown class="size-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
          </button>
        </h3>
        <div
          id="radix-content-1"
          data-state="open"
          class="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        >
          <div class="pb-5">
            <p>An AI Clothes Changer is an online tool that changes or replaces clothing in a photo using AI...</p>
          </div>
        </div>
      </div>

      <!-- Items 2–12 (closed) -->
      <div data-state="closed" class="border-b border-[var(--landing-border)]">
        <h3>
          <button aria-expanded="false" ...>Is this tool affiliated with an AI model provider?</button>
        </h3>
        <!-- content hidden when closed -->
      </div>
      <!-- ... more items -->
    </div>
  </div>
</section>
```

## Accordion Item States

### State: open
- Parent div: `data-state="open"`
- Button: `aria-expanded="true"`, content div `data-state="open"`
- Chevron: `data-[state=open]:rotate-180`
- Content div: `overflow-hidden`, animated with `data-[state=open]:animate-accordion-down`
- Content visible (no height: 0)

### State: closed
- Parent div: `data-state="closed"`
- Button: `aria-expanded="false"`
- Chevron: no rotation
- Content div: `data-[state=closed]:animate-accordion-up`, height: 0

## All 12 Questions (verbatim)
1. "What is an AI Clothes Changer?" — (open on load)
2. "Is this tool affiliated with an AI model provider?"
3. "How does the AI Clothes Changer work?"
4. "Is AI Clothes Changer free to use?"
5. "Do generated images have a watermark?"
6. "Can I use the generated images for Shopify, Etsy, or TikTok Shop listings?"
7. "What kinds of photos work best?"
8. "What clothing can I change?"
9. "Will the face, body, and background stay the same?"
10. "Why did my outfit change not look realistic?"
11. "What happens if a generation fails? Do credits expire?"
12. "Is my uploaded photo safe?"

## Computed Styles

### Section heading
- fontSize: `36px` to `48px` (text-3xl to text-4xl)
- fontWeight: `600`

### Accordion item
- borderBottom: `1px solid var(--landing-border)`
- padding top/bottom: `20px` (py-5)

### Button
- width: `100%`
- padding: `20px 0`
- textAlign: `left`
- fontSize: `16px`
- fontWeight: `500`

### Chevron
- width/height: `16px` (size-4)
- transition: `transform duration-200`
- When open: `rotate(180deg)`

### Content paragraph
- fontSize: `14px`
- color: `var(--landing-foreground)`

## Animation
- **Open:** `data-[state=open]:animate-accordion-down` — slides content open
- **Close:** `data-[state=closed]:animate-accordion-up` — slides content closed
- Duration: `200ms`
- Easing: see `tw-animate-css` accordion animations (imported globally)

## Assets
None in this section.

## Responsive Behavior
- Single column at all widths
- Max-width constrained by container
