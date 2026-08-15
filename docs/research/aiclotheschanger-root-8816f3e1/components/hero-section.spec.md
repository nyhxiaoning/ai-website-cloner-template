# Hero Section Specification

## Overview
- **Target file:** `src/components/sites/aiclotheschanger-root-8816f3e1/HeroSection.tsx`
- **Screenshot:** `docs/design-references/aiclotheschanger-root-8816f3e1/full-page-desktop-1440.png`
- **Interaction model:** click-driven (person/garment selection, radio toggle, compare slider)

## DOM Structure
```
<section class="relative overflow-hidden bg-[#f3efe6] px-4 pb-14 text-[#191613] pt-20 md:pt-24 sm:px-6 lg:pb-20">
  [decorative absolute overlay div]

  <div class="relative mx-auto grid max-w-7xl items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
    <!-- LEFT COLUMN: Interactive Demo Form -->
    <div>
      <h1>
        <span class="font-sans">fit</span>
        <span class="font-display">tora</span> <!-- styled as inter+fraunces combo -->
      </h1>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
        AI Clothes Changer
      </h1>
      <p>See Yourself in Any Outfit</p>
      <p class="text-muted">Change clothes in photos with AI...</p>

      <!-- Feature pills -->
      <ul>No credit card / Up to 3 items, one look / Interactive outfit demo</ul>

      <!-- Person upload -->
      <fieldset>
        <legend>Person</legend>
        <div class="flex items-center gap-2">
          <button class="border-2 border-dashed ...">Upload person photo</button>
          <span>PNG / JPG</span>
        </div>
        <p>Or try an example</p>
        <div class="grid grid-cols-3 gap-2 sm:gap-3">
          <!-- Person thumbnails: p1, p2, p3 (first has [pressed] state) -->
          <button pressed>
            <img src="hero-person-1.webp" />
          </button>
          <button>
            <img src="hero-person-2.webp" />
          </button>
          <button>
            <img src="hero-person-3.webp" />
          </button>
        </div>
      </fieldset>

      <!-- Radio: clothing photos vs describe -->
      <fieldset>
        <legend>How do you want to change the outfit?</legend>
        <label><input type="radio" name="outfit-mode" checked /> Use clothing photos</label>
        <label><input type="radio" name="outfit-mode" /> Describe an outfit</label>
      </fieldset>

      <!-- Clothing upload -->
      <fieldset>
        <legend>Clothing</legend>
        <button>Upload clothing image</button>
        <div class="grid grid-cols-3 gap-2 sm:gap-3">
          <!-- Clothing thumbnails: c1, c2, c3 -->
          <button pressed>
            <img src="hero-cloth-1.webp" />
          </button>
          ...
        </div>
        <!-- Selected clothing row: shows selected c1 image + remove button -->
        <button>Remove clothing item 1: Clothing 1</button>
        <button>Add another clothing image</button>
      </fieldset>

      <!-- Optional prompt -->
      <div>
        <label>Prompt <span class="text-xs">Optional</span></label>
        <textarea placeholder="e.g. casual street style..." />
        <p class="text-xs">Leave blank to use the default look.</p>
      </div>

      <!-- Terms -->
      <p class="text-xs">Use this tool only for lawful virtual try-on... <a href="/acceptable-use-policy">Read the Acceptable Use Policy</a>.</p>

      <button class="font-semibold">Generate</button>
      <p class="text-xs text-center">Explore the outfit demo, then sign up to change clothes in your own photo.</p>
    </div>

    <!-- RIGHT COLUMN: Before / After Result -->
    <div>
      <div class="relative rounded-[28px] border border-[#e5ddcd] bg-[#f2f0ea] shadow-[0_32px_80px_rgba(25,22,19,0.16)]">
        <!-- Before image (base) -->
        <img src="hero-person-1.webp" class="absolute inset-0" />
        <!-- After image (result, clipped by slider) -->
        <div class="absolute inset-0 overflow-hidden bg-[#172120]" style="clip-path or width controlled by slider">
          <img src="hero-result-p1c1.webp" class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center" />
        </div>
        <!-- Labels -->
        <span class="absolute left-4 bottom-4 text-xs font-medium uppercase tracking-wide">Before</span>
        <span class="absolute right-4 bottom-4 text-xs font-medium uppercase tracking-wide">After</span>
        <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Drag to compare</span>
        <!-- Slider handle -->
        <span class="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <ChevronRight className="size-5" />
        </span>
      </div>
      <p class="mt-2 text-center text-sm">This look</p>
    </div>
  </div>
</section>
```

## Computed Styles (exact values from getComputedStyle)

### Section container
- padding: `96px 24px 80px` (desktop)
- background: `rgb(243, 239, 230)` = `#f3efe6`
- color: `rgb(25, 22, 19)` = `#191613`

### H1 headline
- fontSize: see font scale
- fontWeight: `600` (font-semibold)
- color: `#191613`

### Upload buttons
- border: `2px dashed #e5ddcd`
- padding: see computed
- borderRadius: `12px`
- background: `transparent`

### Person thumbnail buttons
- background: `#efebe2`
- borderRadius: `16px` (rounded-2xl)
- overflow: `hidden`
- transition: `all 0.2s ease`
- pressed state: `ring-2 ring-[#191613] ring-offset-2 ring-offset-white`

### Clothing thumbnail buttons
- Same as person thumbnails, `ring-1 ring-[#e5ddcd]`

### Before/After panel
- background: `#f2f0ea`
- borderRadius: `28px`
- border: `1px solid #e5ddcd`
- boxShadow: `0 32px 80px rgba(25,22,19,0.16)`
- aspect/min-height: `min-h-[560px]` sm `min-h-[680px]`, lg `h-[calc(100vh-8rem)]`

### "Before" / "After" labels
- fontSize: `12px`
- fontWeight: `500`
- textTransform: `uppercase`
- letterSpacing: `0.1em`

### Slider handle
- width/height: `48px`
- borderRadius: `50%`
- background: `#ffffff`
- boxShadow: see computed
- position: absolute, centered horizontally by slider position, vertically at 50%

## States & Behaviors

### Person thumbnail selection
- **Trigger:** Click on person thumbnail button
- **State A (unselected):** no ring, standard opacity
- **State B (selected):** `ring-2 ring-[#191613] ring-offset-2 ring-offset-white`, scale 1.0
- **Transition:** `transition-all duration-200`

### Clothing thumbnail selection
- **Trigger:** Click on clothing thumbnail button
- **State A (unselected):** no ring
- **State B (selected):** `ring-2 ring-[#191613] ring-offset-2 ring-offset-white`
- **Transition:** `transition-all duration-200`

### Compare slider
- **Trigger:** Drag the slider handle horizontally across the Before/After panel
- **State A (0%):** After image fully hidden (clip width 0%)
- **State B (100%):** After image fully visible (clip width 100%)
- **Implementation approach:** Two layered absolute images. After image inside an overflow-hidden container whose width is controlled by slider position (0–100%). Slider handle follows same x position.

### Generate button
- **Hover:** opacity/background change, `transition-colors duration-200`

## Assets
- Person thumbnails: `public/sites/aiclotheschanger-root-8816f3e1/images/hero-person-{1,2,3}.webp`
- Clothing thumbnails: `public/sites/aiclotheschanger-root-8816f3e1/images/hero-cloth-{1,2,3}.webp`
- Result image: `public/sites/aiclotheschanger-root-8816f3e1/images/hero-result-p1c1.webp`
- Logo: `public/sites/aiclotheschanger-root-8816f3e1/images/logo.png`
- Icons: `ChevronRight` from lucide-react (page-level import; see shared icons)

## Text Content (verbatim)
- Headline: "AI Clothes Changer" / "See Yourself in Any Outfit"
- Subtext: "Change clothes in photos with AI. Upload one photo, add up to 3 pieces — jacket, top, bag — and our AI outfit changer styles them into one photoreal look."
- Pills: "No credit card" / "Up to 3 items, one look" / "Interactive outfit demo"
- Fieldset labels: "Person", "Clothing", "How do you want to change the outfit?"
- Radio: "Use clothing photos", "Describe an outfit"
- Upload: "Upload person photo", "Upload clothing image", "Or try an example"
- Prompt label: "Prompt" / "Optional" / "e.g. casual street style, natural lighting, keep the same pose"
- Button: "Generate"
- Footer note: "Explore the outfit demo, then sign up to change clothes in your own photo."
- After panel labels: "Before", "After", "Drag to compare", "This look"

## Responsive Behavior
- **Desktop (1440px):** 2-column grid `lg:grid-cols-[0.9fr_1.1fr]`, gap 12px
- **Tablet (768px):** Stack to single column
- **Mobile (390px):** Single column, result image below form, thumbnail grid `grid-cols-3 gap-2`
- **Breakpoint:** layout switches at `lg` (1024px)
