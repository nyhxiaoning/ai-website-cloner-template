# How-To Steps Section Specification

## Overview
- **Target file:** `src/components/sites/aiclotheschanger-root-8816f3e1/HowToSection.tsx`
- **Screenshot:** `docs/design-references/aiclotheschanger-root-8816f3e1/full-page-desktop-1440.png`
- **Interaction model:** static

## DOM Structure
```
<section class="relative overflow-hidden bg-[#191613] px-4 py-20 text-[#f3efe6] sm:px-6 lg:py-28">
  <div class="mx-auto max-w-7xl">
    <h2 class="text-[#f3efe6]">How to Change Clothes in Photos with AI in 3 Steps</h2>
    <p class="text-[#ece7dd]">No photoshoot, no model booking...</p>

    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Step 1 -->
      <article>
        <div class="relative overflow-hidden rounded-[24px] border border-[#3a332b] bg-[#2a251f]">
          <img src="howto-person.webp" class="object-cover" />
          <span class="absolute top-4 left-4 text-xs font-semibold">01</span>
        </div>
        <div>
          <h3 class="text-[#f3efe6]">Your model photo</h3>
          <h4 class="text-[#ece7dd]">Add a person photo</h4>
          <p class="text-[#8a8276]">Use your own model shots, a customer photo, or a simple phone picture...</p>
          <p class="text-xs text-[#6e665a]">No studio or professional camera needed</p>
        </div>
      </article>

      <!-- Step 2 -->
      <article>
        <div class="...">
          <img src="howto-garment.webp" />
          <span class="absolute top-4 left-4">02</span>
        </div>
        <div>
          <h3 class="text-[#f3efe6]">Your product photo</h3>
          <h4 class="text-[#ece7dd]">Add the garment you sell</h4>
          <p class="text-[#8a8276]">Upload the product image straight from your listing...</p>
          <p class="text-xs text-[#6e665a]">Combine up to 3 pieces...</p>
        </div>
      </article>

      <!-- Step 3 -->
      <article>
        <div class="...">
          <img src="howto-result.webp" />
          <span class="absolute top-4 left-4">03</span>
        </div>
        <div>
          <h3 class="text-[#f3efe6]">Real AI output</h3>
          <h4 class="text-[#ece7dd]">Generate and download</h4>
          <p class="text-[#8a8276]">The AI clothing changer puts the garment on your model...</p>
          <p class="text-xs text-[#6e665a]">Output keeps your original resolution, ready in minutes</p>
        </div>
      </article>
    </div>

    <div class="mt-10 text-center">
      <a href="#hero" class="inline-flex items-center gap-2 ...">Change clothes with AI — first image free</a>
      <p class="mt-2 text-xs text-[#8a8276]">Explore the demo above, then use your free generation on your own person and clothing photos.</p>
    </div>
  </div>
</section>
```

## Computed Styles

### Section
- background: `rgb(25, 22, 19)` = `#191613`
- color: `rgb(243, 239, 230)` = `#f3efe6`

### Step card image
- borderRadius: `24px`
- border: `1px solid #3a332b`
- background: `#2a251f`
- Step number (01, 02, 03): absolute, top: `16px`, left: `16px`, fontSize: `12px`, fontWeight: `600`

### Step content
- Step label (h3): "Your model photo", color: `#f3efe6`
- Step heading (h4): "Add a person photo", color: `#ece7dd`
- Body (p): color: `#8a8276`
- Note (p.text-xs): color: `#6e665a`

## Text Content (verbatim)
- H2: "How to Change Clothes in Photos with AI in 3 Steps"
- Sub: "No photoshoot, no model booking. Go from product photo to on-model image..."
- Step 1 label: "Your model photo" / "Add a person photo"
- Step 2 label: "Your product photo" / "Add the garment you sell"
- Step 3 label: "Real AI output" / "Generate and download"
- CTA link: "Change clothes with AI — first image free"
- Footer: "Explore the demo above, then use your free generation on your own person and clothing photos."

## Assets
- `public/sites/aiclotheschanger-root-8816f3e1/images/howto-person.webp`
- `public/sites/aiclotheschanger-root-8816f3e1/images/howto-garment.webp`
- `public/sites/aiclotheschanger-root-8816f3e1/images/howto-result.webp`

## Responsive Behavior
- **Desktop:** 3-column grid `lg:grid-cols-3`
- **Tablet:** 2-column grid `sm:grid-cols-2`
- **Mobile:** 1-column stack
- **Breakpoint:** `sm` (640px), `lg` (1024px)
