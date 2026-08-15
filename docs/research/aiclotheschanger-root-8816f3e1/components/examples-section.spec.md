# Examples Section Specification

## Overview
- **Target file:** `src/components/sites/aiclotheschanger-root-8816f3e1/ExamplesSection.tsx`
- **Screenshot:** `docs/design-references/aiclotheschanger-root-8816f3e1/full-page-desktop-1440.png`
- **Interaction model:** click-driven tab switching (4 tabs)

## DOM Structure
```
<section class="bg-[var(--landing-background)] px-4 py-20 text-[var(--landing-foreground)] sm:px-6 lg:py-28">
  <div class="mx-auto max-w-7xl">
    <h2>AI Clothes Changer Examples: Real Virtual Try-On Results</h2>
    <p>See how AI keeps faces, logos, patterns, product details, and lighting true to real life in virtual try-on examples.</p>

    <!-- Tab bar -->
    <div class="flex flex-wrap gap-2">
      <button aria-pressed="true"  class="rounded-full border bg-[var(--landing-contrast)] text-[var(--landing-contrast-foreground)] ...">Featured</button>
      <button aria-pressed="false" class="rounded-full border border-[var(--landing-border)] ...">Logos & Text</button>
      <button aria-pressed="false" class="rounded-full border border-[var(--landing-border)] ...">Patterns & Prints</button>
      <button aria-pressed="false" class="rounded-full border border-[var(--landing-border)] ...">Flat Lay to Model</button>
    </div>

    <!-- Content area (changes per tab) -->
    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Each card: -->
      <article>
        <div>
          <h3>Logo Hoodie Test</h3>
          <p>A bold chest print is where AI distortion shows first...</p>
          <div class="flex gap-2">
            <span class="badge">Logo readable</span>
            <span class="badge">Face preserved</span>
            <span class="badge">Natural fit</span>
          </div>
          <p class="text-sm">Unedited output from the AI clothes changer — generated from these two photos</p>
          <button>View details</button>
        </div>
        <div>
          <div class="grid grid-cols-3 gap-1">
            <div><img src="ex-person-1.webp" /><p>Person</p></div>
            <div><img src="ex-cloth-1.webp" /><p>Reference</p></div>
            <div class="ring-2 ring-[var(--landing-contrast)] ring-offset-2">
              <img src="ex-result-1.webp" /><p>Result</p><p>Logo stays readable</p>
            </div>
          </div>
        </div>
      </article>
      <!-- more articles... -->
    </div>
  </div>
</section>
```

## Tab States

### Featured (default, pressed=true)
| Article | H3 | Person img | Ref img | Result img |
|---|---|---|---|---|
| 1 | Logo Hoodie Test | ex-person-1 | ex-cloth-1 | ex-result-1 |
| 2 | Floral Dress Test | ex-person-3 | ex-cloth-3 | ex-result-3 |
| 3 | Flat Lay to Model | ex-person-1 | ex-cloth-5 | ex-result-5 |

### Logos & Text (pressed=true)
| Article | H3 | Person img | Ref img | Result img |
|---|---|---|---|---|
| 1 | Logo Hoodie Test | ex-person-1 | ex-cloth-1 | ex-result-1 |
| 2 | Small Text Print Test | (small-text-person) | (small-text-cloth) | (small-text-result) |

### Patterns & Prints (pressed=true)
| Article | H3 | Person img | Ref img | Result img |
|---|---|---|---|---|
| 1 | Floral Dress Test | ex-person-3 | ex-cloth-3 | ex-result-3 |
| 2 | Plaid Alignment Test | (plaid-person) | (plaid-cloth) | (plaid-result) |

### Flat Lay to Model (pressed=true)
| Article | H3 | Person img | Ref img | Result img |
|---|---|---|---|---|
| 1 | Flat Lay to Model | ex-person-1 | ex-cloth-5 | ex-result-5 |
| 2 | Catalog Photo to Model | (catalog-person) | (catalog-cloth) | (catalog-result) |

## Computed Styles

### Tab buttons
- padding: `18px 18px` (px-4.5 ≈ 18px) / `8px 16px` (py-2 px-4)
- fontSize: `14px`
- fontWeight: `500`
- borderRadius: `9999px` (rounded-full)
- Active: `bg-[var(--landing-contrast)]` / `text-[var(--landing-contrast-foreground)]`
- Inactive: `border border-[var(--landing-border)]` / transparent background
- Transition: `all 0.2s ease`

### Example cards
- image wrapper: `grid grid-cols-3 gap-1 rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface-subtle)]`
- result panel: `ring-2 ring-[var(--landing-contrast)] ring-offset-2 ring-offset-[var(--landing-surface)]`
- image: `aspect-[3/4] w-full object-cover rounded-2xl`
- hover: `group-hover/image:scale-[1.02] duration-300 transition`

### Badges (quality indicators)
- fontSize: `12px`
- color: `#191613`
- font-weight: `500`

## Assets
- `public/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp`
- `public/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-1.webp`
- `public/sites/aiclotheschanger-root-8816f3e1/images/ex-result-1.webp`
- `public/sites/aiclotheschanger-root-8816f3e1/images/ex-person-3.webp`
- `public/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-3.webp`
- `public/sites/aiclotheschanger-root-8816f3e1/images/ex-result-3.webp`
- `public/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-5.webp`
- `public/sites/aiclotheschanger-root-8816f3e1/images/ex-result-5.webp`

## Text Content (verbatim)
- H2: "AI Clothes Changer Examples: Real Virtual Try-On Results"
- Sub: "See how AI keeps faces, logos, patterns, product details, and lighting true to real life in virtual try-on examples."
- Tabs: "Featured" / "Logos & Text" / "Patterns & Prints" / "Flat Lay to Model"
- Card H3s: "Logo Hoodie Test", "Floral Dress Test", "Flat Lay to Model" (per tab)
- Badges: "Logo readable", "Face preserved", "Natural fit", "Pattern retained", etc.
- Button: "View details"
- Panel labels: "Person", "Reference", "Result"
- Result sub-label: e.g. "Logo stays readable"

## Responsive Behavior
- **Desktop (1440px):** 3-column grid `lg:grid-cols-3`
- **Tablet (768px):** 2-column grid `sm:grid-cols-2`
- **Mobile (390px):** 1-column stack
- **Breakpoint:** `sm` (640px) and `lg` (1024px)
