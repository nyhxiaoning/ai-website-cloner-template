# Use Cases Section Specification

## Overview
- **Target file:** `src/components/sites/aiclotheschanger-root-8816f3e1/UseCasesSection.tsx`
- **Screenshot:** `docs/design-references/aiclotheschanger-root-8816f3e1/full-page-desktop-1440.png`
- **Interaction model:** static — links, no state

## DOM Structure
```
<section class="bg-[var(--landing-background-muted)] px-4 py-20 ...">
  <div class="mx-auto max-w-7xl">
    <h2>AI Outfit Changer Use Cases: From Product Photo to Publish-Ready Content</h2>
    <p>Built for Shopify stores, Etsy shops, TikTok Shop sellers...</p>

    <div class="grid gap-6 sm:grid-cols-2">
      <!-- Card 1 -->
      <a href="/ai-fashion-model-generator" class="group relative block overflow-hidden rounded-[24px] border border-[var(--landing-border)] bg-[var(--landing-surface)] p-8">
        <span class="absolute left-6 top-6 text-xs font-semibold opacity-40">01</span>
        <div>
          <h3>Listing photos without a photoshoot</h3>
          <p>Turn flat-lay or hanger shots into on-model photos...</p>
          <div class="flex gap-2">
            <span class="badge">Shopify</span>
            <span class="badge">Etsy</span>
          </div>
        </div>
        <span class="mt-4 inline-flex items-center gap-1 text-sm font-medium">
          Create a listing photo <ChevronRight />
        </span>
      </a>
      <!-- Cards 2–4 similar -->
    </div>

    <p class="mt-6 text-center text-sm">Choose a use case, then upload a person and garment photo...</p>
  </div>
</section>
```

## Computed Styles

### Cards
- borderRadius: `24px`
- border: `1px solid var(--landing-border)`
- background: `var(--landing-surface)` = `#ffffff`
- padding: `32px` (p-8)
- overflow: `hidden`
- position: `relative`

### Card number (01–04)
- fontSize: `12px`
- fontWeight: `600`
- opacity: `0.4`
- position: absolute, top/left

### Badges (platform tags)
- borderRadius: `6px` to `8px`
- background: `var(--landing-surface-subtle)`
- fontSize: `12px`
- padding: `4px 10px`

### CTA link
- fontSize: `14px`
- fontWeight: `500`
- color: `var(--landing-foreground)`
- hover: `underline`

## Cards Data

| # | Heading | Platforms | CTA |
|---|---|---|---|
| 01 | Listing photos without a photoshoot | Shopify, Etsy | Create a listing photo |
| 02 | Create outfit content at scale | TikTok Shop, Instagram | Change an outfit |
| 03 | Style complete outfits | Lookbooks, Outfit bundles | Style a full look |
| 04 | Test looks before you spend | Ad creatives, A/B variants | Generate ad variants |

## Text Content (verbatim)
- H2: "AI Outfit Changer Use Cases: From Product Photo to Publish-Ready Content"
- Sub: "Built for Shopify stores, Etsy shops, TikTok Shop sellers, and independent brands..."
- Card 1: "Turn flat-lay or hanger shots into on-model photos for your product pages. Logos, prints, and patterns stay exactly as they appear on the garment."
- Card 2: "Reuse one person photo across outfits and scenes..."
- Card 3: "Combine a top, bottoms, and accessories on one model..."
- Card 4: "Change clothes in photos for cents each..."
- Footer note: "Choose a use case, then upload a person and garment photo to change the outfit with AI."

## Assets
No images in this section.

## Responsive Behavior
- **Desktop:** 2-column grid `sm:grid-cols-2`
- **Mobile:** 1-column stack
- **Breakpoint:** `sm` (640px)
