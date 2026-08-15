# Quality / Promises Section Specification

## Overview
- **Target file:** `src/components/sites/aiclotheschanger-root-8816f3e1/QualitySection.tsx`
- **Screenshot:** `docs/design-references/aiclotheschanger-root-8816f3e1/full-page-desktop-1440.png`
- **Interaction model:** click-driven (9 toggle buttons in 3 groups, mutually exclusive per group)

## DOM Structure
```
<section class="bg-[var(--landing-surface)] px-4 py-20 ...">
  <div class="mx-auto max-w-7xl">
    <h2>Publish-ready AI outfit changes, every time</h2>
    <p>Every virtual try-on preserves the details shoppers notice...</p>

    <div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <!-- Left: large visual panel -->
      <div class="relative rounded-[24px] border border-[var(--landing-border)] bg-[var(--landing-surface-muted)] p-4 shadow-[0_2px_8px_rgba(25,22,19,0.08)]">
        <div class="relative aspect-[4/3] overflow-hidden">
          <img src="quality-inspection-logo.webp" class="absolute inset-0 object-cover" />
        </div>
        <div>
          <p class="text-sm">Logo clarity</p>
          <h3>Logo stays readable</h3>
          <p class="text-sm">Small logos, printed text, and patterns remain clear after try-on.</p>
        </div>
      </div>

      <!-- Right: toggle groups -->
      <div class="space-y-10">
        <!-- Group 1: Image fidelity -->
        <div>
          <h3>1. Image fidelity</h3>
          <div class="flex flex-wrap gap-2">
            <button aria-pressed="true"  class="rounded-full px-5 py-2 ...">Keep logos and prints sharp</button>
            <button aria-pressed="false" ...>Preserve fabric texture</button>
            <button aria-pressed="false" ...>Match body pose and lighting</button>
          </div>
        </div>

        <!-- Group 2: Reference flexibility -->
        <div>
          <h3>2. Reference flexibility</h3>
          <div class="flex flex-wrap gap-2">
            <button aria-pressed="true" ...>Flat lay clothing references</button>
            <button aria-pressed="false" ...>On-model clothing references</button>
            <button aria-pressed="false" ...>One model across your catalog</button>
          </div>
        </div>

        <!-- Group 3: What you download -->
        <div>
          <h3>3. What you download</h3>
          <div class="flex flex-wrap gap-2">
            <button aria-pressed="true" ...>Your framing, preserved</button>
            <button aria-pressed="false" ...>Full quality on every plan</button>
            <button aria-pressed="false" ...>Commercial usage</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Toggle Button States

### Group 1: Image Fidelity
| State | Label | Short label (badge below) |
|---|---|---|
| Active | "Keep logos and prints sharp" | "Logo readable" / "Print clarity" |
| Inactive | "Preserve fabric texture" | "Texture retained" / "Material detail" |
| Inactive | "Match body pose and lighting" | "Lighting matched" / "Pose and shadows" |

### Group 2: Reference Flexibility
| State | Label |
|---|---|
| Active | "Flat lay clothing references" |
| Inactive | "On-model clothing references" |
| Inactive | "One model across your catalog" |

### Group 3: What You Download
| State | Label |
|---|---|
| Active | "Your framing, preserved" |
| Inactive | "Full quality on every plan" |
| Inactive | "Commercial usage" |

## Computed Styles

### Toggle buttons
- padding: `20px 20px` (px-5 ≈ 20px) / `8px 16px` (py-2 px-4)
- fontSize: `14px`
- fontWeight: `600`
- borderRadius: `9999px`
- Active: `bg-[var(--landing-contrast)]` / `text-[var(--landing-contrast-foreground)]`
- Inactive: `text-[var(--landing-foreground)]` / transparent or light background
- Transition: `transition-colors duration-200`
- Hover/active: `active:scale-95`

### Visual panel
- borderRadius: `24px`
- border: `1px solid var(--landing-border)`
- background: `var(--landing-surface-muted)`
- boxShadow: `0 2px 8px rgba(25,22,19,0.08)`
- image aspect: `aspect-[4/3]`

## Text Content (verbatim)
- H2: "Publish-ready AI outfit changes, every time"
- Sub: "Every virtual try-on preserves the details shoppers notice..."
- Group 1 label: "1. Image fidelity"
- Group 2 label: "2. Reference flexibility"
- Group 3 label: "3. What you download"
- Button labels: see table above
- Badge labels: "Logo clarity", "Logo stays readable", "Small logos, printed text, and patterns remain clear after try-on."

## Assets
- `public/sites/aiclotheschanger-root-8816f3e1/images/quality-inspection-logo.webp`

## Responsive Behavior
- **Desktop:** 2-column grid (`lg:grid-cols-2`)
- **Tablet (768px):** 2-column, gap reduces
- **Mobile (390px):** 1-column stack
- **Breakpoint:** `lg` (1024px)
