# Header / Navigation Specification

## Overview
- **Target file:** `src/components/sites/aiclotheschanger-root-8816f3e1/Header.tsx`
- **Screenshot:** `docs/design-references/aiclotheschanger-root-8816f3e1/full-page-desktop-1440.png`
- **Interaction model:** static (no scroll-driven state change detected)

## DOM Structure
```
<header class="fixed inset-x-0 top-0 z-50 ...">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <nav class="flex h-16 items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center space-x-3">
        <img src="logo.png" alt="AI Clothes Changer logo" width="32" height="32" />
        <span class="text-base font-medium">AI Clothes Changer</span>
      </a>

      <!-- Desktop nav -->
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/virtual-try-on-clothes">
              <Shirt className="size-4" />
              Virtual Try-On
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/ai-fashion-model-generator">
              <Sparkles className="size-4" />
              AI Fashion Models
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/pricing">
              <DollarSign className="size-4" />
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <button class="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border">
          <Moon className="size-5" />
        </button>
        <button class="rounded-full px-5 py-2 text-sm font-semibold">Sign In</button>
      </div>
    </nav>
  </div>
</header>
```

## Computed Styles

### Header
- position: `fixed`
- top: `0`
- insetX: `0`
- zIndex: `50`
- background: `rgba(0,0,0,0)` (transparent — no scroll state change)
- backdropFilter: `none`
- height: `64px` (h-16)

### Nav height
- height: `64px`

### Logo
- img: width `32px`, height `32px`
- text: fontSize `16px`, fontWeight `500`, color `#191613`

### Nav links
- fontSize: `14px`
- fontWeight: `500`
- color: `#191613`
- gap between icon and text: `8px`

### Dark mode toggle button
- width/height: `36px` (size-9)
- borderRadius: `50%`
- border: `1px solid #e5ddcd`
- background: `transparent`

### Sign In button
- borderRadius: `9999px`
- padding: `8px 20px` (py-2 px-5)
- fontSize: `14px`
- fontWeight: `600`

## States
- **Header at scroll 0:** transparent background, no backdrop blur
- **Header at scroll 300px:** same (no state change detected)
- The header does NOT change appearance on scroll in this page implementation

## Icons
- `Shirt` from lucide-react (Virtual Try-On nav link)
- `Sparkles` from lucide-react (AI Fashion Models nav link)
- `DollarSign` from lucide-react (Pricing nav link)
- `Moon` from lucide-react (dark mode toggle button)

## Text Content (verbatim)
- Logo: "AI Clothes Changer"
- Nav: "Virtual Try-On" / "AI Fashion Models" / "Pricing"
- Button: "Sign In"

## Assets
- `public/sites/aiclotheschanger-root-8816f3e1/images/logo.png`

## Responsive Behavior
- **Desktop (≥1024px):** Full nav visible
- **Mobile (<1024px):** Hamburger menu (Menu + X icons), NavigationMenu collapses
- Use Radix NavigationMenu for desktop and collapsible drawer on mobile
