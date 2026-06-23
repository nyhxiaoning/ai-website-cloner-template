# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Screenshot:** `docs/design-references/desktop-full.png`
- **Interaction model:** Static (with link hovers)

## DOM Structure
```
footer.bg-gradient-to-br.from-orange-100.via-green-100.to-blue-100.text-gray-700.py-6
  div.max-w-6xl.mx-auto.px-4.md:px-6
    div.grid.grid-cols-1.md:grid-cols-3.gap-8
      // Column 1: About
      div
        h3.font-bold.text-lg.mb-4 "🐒西游记81难"
        p.text-sm.text-gray-600 "..."
        p.text-sm.text-gray-500.mt-2 🌐 trial81.toolooz.com

      // Column 2: Quick Links
      div
        h3.font-bold.text-lg.mb-4 "🔗快速链接"
        ul.space-y-2
          li a with icons about us, privacy, terms

      // Column 3: Contact
      div
        h3.font-bold.text-lg.mb-4 "📧联系我们"
        p.text-sm.text-gray-600 "如有问题或建议，欢迎联系我们"

    div.border-t.border-gray-300.mt-8.pt-6.text-center.text-sm.text-gray-500
      p "© 2024 trial81.toolooz.com 西游记取经路线图"
```

## Computed Styles

### Container
- background: linear-gradient(135deg, #fff7ed, #ecfdf5, #eff6ff)
- color: rgb(55, 65, 81) (text-gray-700)
- padding: 24px vertical

### Column Headings
- font-weight: 700
- font-size: 18px
- margin-bottom: 16px

### Links
- color: rgb(71, 85, 105) (text-slate-600)
- hover: text-slate-800
- display: flex, align-items: center, gap: 2
- transition: all 0.2s

### Divider
- border-top: 1px solid rgb(209, 213, 219) (border-gray-300)

## States & Behaviors
- Link hover: text color darkens from slate-600 to slate-800

## Text Content (verbatim)
- "🐒西游记81难" (h3)
- "互动式取经路线图，体验师徒四人的传奇西行之路"
- "🌐 trial81.toolooz.com"
- "🔗快速链接"
- "👨‍💻关于我们"
- "🛡️隐私政策"
- "📜使用条款"
- "📧联系我们"
- "如有问题或建议，欢迎联系我们"
- "© 2024 trial81.toolooz.com 西游记取经路线图"

## Responsive Behavior
- **Desktop (1440px):** 3-column grid
- **Mobile (390px):** single column, stacked sections
