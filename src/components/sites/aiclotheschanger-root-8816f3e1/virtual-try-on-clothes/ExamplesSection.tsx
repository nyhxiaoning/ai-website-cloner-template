'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type ExampleTab = {
  label: string;
  cards: {
    title: string;
    description: string;
    badges: string[];
    footerText: string;
    personImg: string;
    clothImg: string;
    resultImg: string;
    resultLabel: string;
  }[];
};

const TABS: ExampleTab[] = [
  // Featured (default)
  {
    label: 'Featured',
    cards: [
      {
        title: 'Preview a Denim Jacket Before Buying',
        description:
          'See how a denim jacket looks over your own outfit before ordering it online, and check the wash, hardware, and overall silhouette on your body instead of on a product page.',
        badges: ['Shopping preview', 'Denim details kept', 'Face preserved'],
        footerText:
          'Unedited output generated from these two photos — a visual preview, not a size or fit guarantee',
        personImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp',
        clothImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-1.webp',
        resultImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-result-1.webp',
        resultLabel: 'Denim details kept',
      },
      {
        title: 'Try an Emerald Dress for an Event',
        description:
          'Preview a formal dress for a party, date, wedding you are attending as a guest, or another dressed-up occasion without changing clothes in person.',
        badges: ['Event outfit', 'Satin sheen kept', 'Natural drape'],
        footerText:
          'Raw virtual try-on result — no retouching or colour correction',
        personImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-person-3.webp',
        clothImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-3.webp',
        resultImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-result-3.webp',
        resultLabel: 'Satin sheen retained',
      },
      {
        title: 'See a Flat-Lay Sweater on You',
        description:
          'Turn a flat-lay sweater photo into an on-body preview so you can judge the colour, knit texture, and overall outfit before wearing or buying it.',
        badges: ['Flat-lay garment', 'Cable-knit texture', 'Personal styling'],
        footerText:
          'Unedited outfit swap generated from these two photos — a visual preview, not a size or fit guarantee',
        personImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp',
        clothImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-5.webp',
        resultImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-result-5.webp',
        resultLabel: 'Flat-lay becomes on-body',
      },
    ],
  },
  // Shopping Preview
  {
    label: 'Shopping Preview',
    cards: [
      {
        title: 'Preview a Denim Jacket Before Buying',
        description:
          'See how a denim jacket looks over your own outfit before ordering it online, and check the wash, hardware, and overall silhouette on your body instead of on a product page.',
        badges: ['Shopping preview', 'Denim details kept', 'Face preserved'],
        footerText:
          'Unedited output generated from these two photos — a visual preview, not a size or fit guarantee',
        personImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp',
        clothImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-1.webp',
        resultImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-result-1.webp',
        resultLabel: 'Denim details kept',
      },
    ],
  },
  // Event Looks
  {
    label: 'Event Looks',
    cards: [
      {
        title: 'Try an Emerald Dress for an Event',
        description:
          'Preview a formal dress for a party, date, wedding you are attending as a guest, or another dressed-up occasion without changing clothes in person.',
        badges: ['Event outfit', 'Satin sheen kept', 'Natural drape'],
        footerText:
          'Raw virtual try-on result — no retouching or colour correction',
        personImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-person-3.webp',
        clothImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-3.webp',
        resultImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-result-3.webp',
        resultLabel: 'Satin sheen retained',
      },
    ],
  },
  // Wardrobe Styling
  {
    label: 'Wardrobe Styling',
    cards: [
      {
        title: 'See a Flat-Lay Sweater on You',
        description:
          'Turn a flat-lay sweater photo into an on-body preview so you can judge the colour, knit texture, and overall outfit before wearing or buying it.',
        badges: ['Flat-lay garment', 'Cable-knit texture', 'Personal styling'],
        footerText:
          'Unedited outfit swap generated from these two photos — a visual preview, not a size or fit guarantee',
        personImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp',
        clothImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-5.webp',
        resultImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-result-5.webp',
        resultLabel: 'Flat-lay becomes on-body',
      },
    ],
  },
];

export default function ExamplesSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="bg-[var(--landing-background)] px-4 py-20 text-[var(--landing-foreground)] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-4xl leading-[1.08] font-medium tracking-[-0.02em] text-[var(--landing-foreground)] sm:text-5xl lg:text-[52px]">
          Virtual Try-On Examples with Real AI Results
        </h2>
        <p className="mt-3 max-w-2xl text-[#6e665a]">
          Compare the original person photo, garment reference, and generated result
          to see how AI handles different outfits, patterns, fabrics, and poses.
        </p>

        {/* Tab bar */}
        <div className="mt-6 flex flex-wrap gap-2" role="tablist">
          {TABS.map((tab, i) => (
            <button
              key={tab.label}
              role="tab"
              aria-pressed={activeTab === i}
              onClick={() => setActiveTab(i)}
              className={cn(
                'rounded-full px-4.5 py-2 text-sm font-medium transition-all duration-200 active:scale-95',
                activeTab === i
                  ? 'bg-[var(--landing-contrast)] text-[var(--landing-contrast-foreground)]'
                  : 'border border-[var(--landing-border)] text-[var(--landing-foreground)] hover:bg-[var(--landing-surface-muted)]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TABS[activeTab].cards.map((card, i) => (
            <article key={i} className="group">
              <div>
                <h3 className="text-lg font-semibold text-[#191613]">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm text-[#6e665a]">{card.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {card.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-md bg-[#f3efe6] px-2.5 py-1 text-xs font-medium text-[#191613]"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs text-[#8a8276]">{card.footerText}</p>
                <button className="mt-3 text-sm font-medium text-[#191613] underline underline-offset-2">
                  View details
                </button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-1 rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface-subtle)] p-1.5">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={card.personImg}
                    alt="Person"
                    className="aspect-[3/4] w-full object-cover transition duration-300 group-hover/image:scale-[1.02]"
                  />
                  <p className="absolute bottom-1 left-1 text-[10px] font-medium text-white drop-shadow">
                    Person
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={card.clothImg}
                    alt="Reference"
                    className="aspect-[3/4] w-full object-contain p-2 transition duration-300 group-hover/image:scale-[1.02]"
                  />
                  <p className="absolute bottom-1 left-1 text-[10px] font-medium text-white drop-shadow">
                    Reference
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-xl ring-2 ring-[var(--landing-contrast)] ring-offset-2 ring-offset-[var(--landing-surface)]">
                  <img
                    src={card.resultImg}
                    alt="Result"
                    className="aspect-[3/4] w-full object-cover transition duration-300 group-hover/image:scale-[1.02]"
                  />
                  <p className="absolute bottom-1 left-1 text-[10px] font-medium text-white drop-shadow">
                    Result
                  </p>
                  <p className="absolute bottom-5 left-1 text-[10px] font-medium text-white drop-shadow">
                    {card.resultLabel}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
