# Footer Specification

## Overview
- **Target file:** `src/components/sites/aiclotheschanger-root-8816f3e1/Footer.tsx`
- **Screenshot:** `docs/design-references/aiclotheschanger-root-8816f3e1/full-page-desktop-1440.png`
- **Interaction model:** static

## DOM Structure
```
<footer class="py-8 sm:py-8 overflow-x-hidden">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Brand column -->
      <div>
        <a href="/" class="flex items-center space-x-3">
          <img src="logo.png" alt="AI Clothes Changer logo" />
          <span>AI Clothes Changer</span>
        </a>
        <p class="text-sm text-[var(--landing-muted-foreground)]">
          AI clothes changer for small fashion sellers, creators, and independent brands...
        </p>
        <div class="flex gap-3">
          <a href="https://toolrain.com/item/ai-clothes-changer">
            <img src="toolrain-badge.svg" alt="Listed on ToolRain" />
          </a>
          <a href="https://toolbit.ai/ai-tool/aiclotheschanger-io?ref=embed">
            <img src="toolbit-badge.svg" alt="Featured on ToolBit.ai - AI Clothes Changer" />
          </a>
        </div>
      </div>

      <!-- Product column -->
      <div>
        <h3 class="font-semibold">Product</h3>
        <ul>
          <li><a href="/virtual-try-on-clothes">Virtual Try-On</a></li>
          <li><a href="/ai-fashion-model-generator">AI Fashion Models</a></li>
          <li><a href="/pricing">Pricing</a></li>
        </ul>
      </div>
    </div>

    <!-- Copyright row -->
    <div class="mt-8 border-t border-[var(--landing-border)] pt-6">
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p class="text-sm text-[var(--landing-muted-foreground)]">
          © 2026 <a href="/">AI Clothes Changer</a>, All rights reserved
        </p>
        <div class="flex gap-4">
          <a href="/privacy-policy" class="text-sm">Privacy Policy</a>
          <a href="/terms-of-service" class="text-sm">Terms of Service</a>
          <a href="/acceptable-use-policy" class="text-sm">Acceptable Use Policy</a>
        </div>
        <a href="mailto:support@aiclotheschanger.io" class="text-sm">Email</a>
      </div>
    </div>
  </div>
</footer>
```

## Computed Styles

### Footer
- padding: `32px 24px` (py-8 sm:py-8)
- overflowX: `hidden`

### Brand tagline
- color: `var(--landing-muted-foreground)` = `#6e665a`
- fontSize: `14px`

### Badge images
- max-width: `100%` (inline-block)
- ToolRain badge: `150×44px`
- ToolBit badge: `200×60px`

### Links row
- borderTop: `1px solid var(--landing-border)`
- paddingTop: `24px` (pt-6)
- color: `var(--landing-muted-foreground)`

## Text Content (verbatim)
- Tagline: "AI clothes changer for small fashion sellers, creators, and independent brands. Turn one person photo and a garment reference into publish-ready try-on images."
- Copyright: "© 2026 AI Clothes Changer, All rights reserved"
- Product links: "Virtual Try-On" / "AI Fashion Models" / "Pricing"
- Legal: "Privacy Policy" / "Terms of Service" / "Acceptable Use Policy"
- Contact: "Email" → mailto:support@aiclotheschanger.io

## Assets
- `public/sites/aiclotheschanger-root-8816f3e1/images/logo.png`
- External badges: `https://toolrain.com/badges/badge-listed-light.svg`
- External badges: `https://cdn.toolbit.ai/external-share-img/light-featured.svg`

## Responsive Behavior
- **Desktop:** 3-column grid
- **Tablet:** 2-column grid
- **Mobile:** 1-column stack
- **Breakpoint:** `sm` (640px), `lg` (1024px)
