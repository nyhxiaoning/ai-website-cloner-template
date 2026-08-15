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
        title: 'Flat-Lay Sweater to On-Model Photo',
        description:
          'A top-down flat lay is the cheapest product photo a store can make, and the hardest to sell from. This turns one into a worn look.',
        badges: ['Flat lay input', 'Knit texture kept', 'Listing ready'],
        footerText:
          'Unedited output generated from these two photos',
        personImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp',
        clothImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-5.webp',
        resultImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-result-5.webp',
        resultLabel: 'Flat lay becomes worn',
      },
      {
        title: 'Printed Logo Hoodie on a Model',
        description:
          'A bold chest print is where AI distortion shows first, and where a shopper looks first. This checks the print survives.',
        badges: ['Print readable', 'Ghost mannequin input', 'Face natural'],
        footerText:
          'Unedited output generated from these two photos',
        personImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp',
        clothImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-1.webp',
        resultImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-result-1.webp',
        resultLabel: 'Print stays readable',
      },
      {
        title: 'Hanger Dress to Catalogue Shot',
        description:
          'A dense ditsy print on a hanger shot. This checks pattern density and colour balance hold up on a body.',
        badges: ['Hanger input', 'Pattern retained', 'Natural drape'],
        footerText:
          'Raw result — no retouching or colour correction',
        personImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-person-3.webp',
        clothImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-3.webp',
        resultImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-result-3.webp',
        resultLabel: 'Pattern retained on model',
      },
    ],
  },
  // Flat lay & hanger
  {
    label: 'Flat lay & hanger',
    cards: [
      {
        title: 'Flat-Lay Sweater to On-Model Photo',
        description:
          'A top-down flat lay is the cheapest product photo a store can make, and the hardest to sell from. This turns one into a worn look.',
        badges: ['Flat lay input', 'Knit texture kept', 'Listing ready'],
        footerText:
          'Unedited output generated from these two photos',
        personImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp',
        clothImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-5.webp',
        resultImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-result-5.webp',
        resultLabel: 'Flat lay becomes worn',
      },
      {
        title: 'Hanger Dress to Catalogue Shot',
        description:
          'A dense ditsy print on a hanger shot. This checks pattern density and colour balance hold up on a body.',
        badges: ['Hanger input', 'Pattern retained', 'Natural drape'],
        footerText:
          'Raw result — no retouching or colour correction',
        personImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-person-3.webp',
        clothImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-3.webp',
        resultImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-result-3.webp',
        resultLabel: 'Pattern retained on model',
      },
    ],
  },
  // Logos & prints
  {
    label: 'Logos & prints',
    cards: [
      {
        title: 'Printed Logo Hoodie on a Model',
        description:
          'A bold chest print is where AI distortion shows first, and where a shopper looks first. This checks the print survives.',
        badges: ['Print readable', 'Ghost mannequin input', 'Face natural'],
        footerText:
          'Unedited output generated from these two photos',
        personImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp',
        clothImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-1.webp',
        resultImg: '/sites/aiclotheschanger-root-8816f3e1/images/ex-result-1.webp',
        resultLabel: 'Print stays readable',
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
          Real On-Model Results from Product Photos
        </h2>
        <p className="mt-3 max-w-2xl text-[#6e665a]">
          Each example shows the garment image that went in, the model photo it was
          placed on, and the AI result — so you can judge print, pattern, and fabric
          detail before you use it in a listing.
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
                  ? 'border border-[var(--landing-contrast)] bg-[var(--landing-contrast)] text-[var(--landing-contrast-foreground)] shadow-[0_4px_14px_rgba(25,22,19,0.18)]'
                  : 'border border-[var(--landing-border)] bg-[var(--landing-surface)] text-[var(--landing-muted-foreground)] hover:border-[var(--landing-contrast)]/35 hover:text-[var(--landing-foreground)]'
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
                <h3 className="font-serif text-[26px] leading-tight font-medium text-[var(--landing-foreground)]">
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
