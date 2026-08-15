# Pricing Section Specification

## Overview
- **Target file:** `src/components/sites/aiclotheschanger-root-8816f3e1/PricingSection.tsx`
- **Screenshot:** `docs/design-references/aiclotheschanger-root-8816f3e1/full-page-desktop-1440.png`
- **Interaction model:** click-driven (Monthly/Yearly toggle)

## DOM Structure
```
<section class="bg-[var(--landing-background-muted)] px-4 py-20 ...">
  <div class="mx-auto max-w-7xl">
    <h2>Pricing</h2>
    <p>Choose how many AI outfit images you need...</p>
    <a href="#hero" class="text-sm">Create your first AI outfit image free before choosing a plan.</a>
    <a href="#hero" class="text-sm">Try 1 image free</a>

    <!-- Billing toggle -->
    <div class="inline-flex items-center rounded-full bg-[var(--landing-surface-subtle)] p-1">
      <button aria-pressed="true"  class="rounded-full px-5 py-2 text-sm font-semibold bg-[var(--landing-contrast)] text-[var(--landing-contrast-foreground)]">Monthly</button>
      <button aria-pressed="false" class="rounded-full px-5 py-2 text-sm font-semibold text-[var(--landing-foreground)]">
        Yearly <span class="text-xs font-normal">2 months free</span>
      </button>
    </div>

    <!-- Plan cards -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Starter -->
      <article>
        <p class="text-sm">For personal try-on, avatars...</p>
        <div>
          <span class="text-4xl font-semibold">$9.9</span>
          <span class="text-sm">/ month</span>
        </div>
        <p class="text-sm">100 credits per month</p>
        <ul>
          <li>HD download, no watermark</li>
          <li>Commercial use license</li>
          <li>About $0.10 per image</li>
        </ul>
        <button>Get Starter</button>
      </article>

      <!-- Creator (Most Popular) -->
      <article>
        <span class="absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-[var(--landing-contrast)] text-white text-xs px-3 py-1">Most Popular</span>
        <p class="text-sm">For TikTok, Instagram, Xiaohongshu...</p>
        <div>
          <span class="text-4xl font-semibold">$19.9</span>
          <span class="text-sm">/ month</span>
        </div>
        <p class="text-sm">250 credits per month</p>
        <ul>
          <li>HD download, no watermark</li>
          <li>Commercial use license</li>
          <li>About $0.08 per image</li>
          <li>Email support</li>
        </ul>
        <button>Choose Creator</button>
      </article>

      <!-- Seller -->
      <article>
        <p class="text-sm">For Shopify, Etsy, Amazon...</p>
        <div>
          <span class="text-4xl font-semibold">$39.9</span>
          <span class="text-sm">/ month</span>
        </div>
        <p class="text-sm">580 credits per month</p>
        <ul>
          <li>HD download, no watermark</li>
          <li>Commercial use license</li>
          <li>About $0.07 per image</li>
          <li>Priority email support</li>
        </ul>
        <button>Choose Seller</button>
      </article>
    </div>

    <!-- Credit pack -->
    <div class="mt-10">
      <h3>Not ready to subscribe?</h3>
      <p>Best for occasional projects...</p>
      <button class="rounded-2xl border border-[#ddd5c4] bg-white/60 ...">
        <span>Mini</span>
        <span>$5.9</span>
        <span>40 credits</span>
        <span>$0.15 / credit</span>
      </button>
    </div>

    <!-- Fine print -->
    <p class="text-xs text-center">Auto-renewal: Subscription plans renew automatically...</p>
    <p class="text-xs text-center">Refunds: If you have consumed no credits...</p>
    <div class="flex justify-center gap-2">
      <a href="/terms-of-service">Terms of Service</a>
      <span>·</span>
      <a href="/privacy-policy">Privacy Policy</a>
      <span>·</span>
      <a href="/acceptable-use-policy">Acceptable Use Policy</a>
    </div>
  </div>
</section>
```

## Toggle Button States

### Monthly (active)
- `bg-[var(--landing-contrast)]`
- `text-[var(--landing-contrast-foreground)]`
- `rounded-full px-5 py-2 text-sm font-semibold`

### Yearly (inactive)
- `text-[var(--landing-foreground)]`
- `rounded-full px-5 py-2 text-sm font-semibold`
- `transition-colors`

Note: Pricing values ($9.9/$19.9/$39.9) are the same for both Monthly and Yearly in this page render; the "2 months free" is the stated Yearly benefit.

## Computed Styles

### Plan cards
- borderRadius: `24px`
- border: `1px solid var(--landing-border)`
- background: `var(--landing-surface)` = `#ffffff`
- padding: `24px`
- gap within card: `16px`

### Price
- fontSize: `36px`
- fontWeight: `600`

### CTA buttons
- width: `100%`
- padding: `12px 16px`
- borderRadius: `12px`
- background: `var(--landing-contrast)`
- color: `var(--landing-contrast-foreground)`
- fontWeight: `600`

### Credit pack button
- borderRadius: `16px` (rounded-2xl)
- border: `1px solid #ddd5c4`
- background: `rgba(255,255,255,0.6)`
- inline-flex, gap between label/price/credits/cost

## Text Content (verbatim)
- H2: "Pricing"
- Sub: "Choose how many AI outfit images you need..."
- Link: "Create your first AI outfit image free before choosing a plan."
- Toggle: "Monthly" / "Yearly 2 months free"
- Plan headings: Starter / Creator / Seller
- Plan prices: $9.9 / $19.9 / $39.9
- Credit pack: "Not ready to subscribe?", "Mini", "$5.9", "40 credits", "$0.15 / credit"
- Fine print text (verbatim)

## Assets
None in this section.

## Responsive Behavior
- **Desktop:** 3-column grid `lg:grid-cols-3`
- **Tablet:** 2-column grid `sm:grid-cols-2`
- **Mobile:** 1-column stack
- **Breakpoint:** `sm` (640px), `lg` (1024px)
