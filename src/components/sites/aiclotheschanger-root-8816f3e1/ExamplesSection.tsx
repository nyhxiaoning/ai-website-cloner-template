'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";

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
    label: "Featured",
    cards: [
      {
        title: "Logo Hoodie Test",
        description:
          "A bold chest print is where AI distortion shows first. This checks the printed logo survives try-on untouched.",
        badges: ["Logo readable", "Face preserved", "Natural fit"],
        footerText:
          "Unedited output from the AI clothes changer — generated from these two photos",
        personImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp",
        clothImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-1.webp",
        resultImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-result-1.webp",
        resultLabel: "Logo stays readable",
      },
      {
        title: "Floral Dress Test",
        description:
          "A dense ditsy print with dozens of small flowers. This checks pattern density and color balance stay consistent.",
        badges: ["Pattern retained", "Natural drape", "Body shape kept"],
        footerText:
          "Raw virtual try-on result — no retouching or color correction",
        personImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-person-3.webp",
        clothImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-3.webp",
        resultImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-result-3.webp",
        resultLabel: "Print density preserved",
      },
      {
        title: "Flat Lay to Model",
        description:
          "Starts from a top-down flat lay photo — no model, no mannequin — and turns it into a natural worn look.",
        badges: ["Flat lay input", "Fabric texture", "Natural fit"],
        footerText:
          "Unedited outfit swap generated from these two photos",
        personImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp",
        clothImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-5.webp",
        resultImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-result-5.webp",
        resultLabel: "Flat lay becomes worn",
      },
    ],
  },
  // Logos & Text
  {
    label: "Logos & Text",
    cards: [
      {
        title: "Logo Hoodie Test",
        description:
          "A bold chest print is where AI distortion shows first. This checks the printed logo survives try-on untouched.",
        badges: ["Logo readable", "Face preserved", "Natural fit"],
        footerText:
          "Unedited output from the AI clothes changer — generated from these two photos",
        personImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp",
        clothImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-1.webp",
        resultImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-result-1.webp",
        resultLabel: "Logo stays readable",
      },
      {
        title: "Small Text Print Test",
        description:
          "Fine lettering is harder than a big logo. This checks small serif text stays readable after generation.",
        badges: ["Text clear", "Face preserved", "Natural fit"],
        footerText:
          "Unedited output from the AI clothes changer — generated from these two photos",
        personImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp",
        clothImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-1.webp",
        resultImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-result-1.webp",
        resultLabel: "Text stays clear",
      },
    ],
  },
  // Patterns & Prints
  {
    label: "Patterns & Prints",
    cards: [
      {
        title: "Floral Dress Test",
        description:
          "A dense ditsy print with dozens of small flowers. This checks pattern density and color balance stay consistent.",
        badges: ["Pattern retained", "Natural drape", "Body shape kept"],
        footerText:
          "Raw virtual try-on result — no retouching or color correction",
        personImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-person-3.webp",
        clothImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-3.webp",
        resultImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-result-3.webp",
        resultLabel: "Print density preserved",
      },
      {
        title: "Plaid Alignment Test",
        description:
          "Geometric checks expose warping instantly. This verifies the plaid stays aligned across the body and folds.",
        badges: ["Plaid aligned", "Face preserved", "Natural fit"],
        footerText:
          "Raw virtual try-on result — no retouching or color correction",
        personImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp",
        clothImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-1.webp",
        resultImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-result-1.webp",
        resultLabel: "Plaid stays aligned",
      },
    ],
  },
  // Flat Lay to Model
  {
    label: "Flat Lay to Model",
    cards: [
      {
        title: "Flat Lay to Model",
        description:
          "Starts from a top-down flat lay photo — no model, no mannequin — and turns it into a natural worn look.",
        badges: ["Flat lay input", "Fabric texture", "Natural fit"],
        footerText:
          "Unedited outfit swap generated from these two photos",
        personImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp",
        clothImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-5.webp",
        resultImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-result-5.webp",
        resultLabel: "Flat lay becomes worn",
      },
      {
        title: "Catalog Photo to Model",
        description:
          "Uses a plain white-background product photo — the kind already sitting in your store listing.",
        badges: ["Catalog input", "Texture kept", "Natural lighting"],
        footerText:
          "Unedited outfit swap generated from these two photos",
        personImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-person-1.webp",
        clothImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-cloth-5.webp",
        resultImg: "/sites/aiclotheschanger-root-8816f3e1/images/ex-result-5.webp",
        resultLabel: "Catalog becomes worn",
      },
    ],
  },
];

export default function ExamplesSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="bg-[var(--landing-background)] px-4 py-20 text-[var(--landing-foreground)] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          AI Clothes Changer Examples: Real Virtual Try-On Results
        </h2>
        <p className="mt-3 text-[#6e665a]">
          See how AI keeps faces, logos, patterns, product details, and lighting
          true to real life in virtual try-on examples.
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
                "rounded-full px-4.5 py-2 text-sm font-medium transition-all duration-200 active:scale-95",
                activeTab === i
                  ? "bg-[var(--landing-contrast)] text-[var(--landing-contrast-foreground)]"
                  : "border border-[var(--landing-border)] text-[var(--landing-foreground)] hover:bg-[var(--landing-surface-muted)]"
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
                <p className="mt-1 text-sm text-[#6e665a]">
                  {card.description}
                </p>
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
