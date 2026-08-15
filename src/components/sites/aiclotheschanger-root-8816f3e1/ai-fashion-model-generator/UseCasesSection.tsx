import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

const USE_CASES = [
  {
    number: '01',
    heading: 'Listing photos without a photoshoot',
    description:
      'Turn a flat-lay, hanger, or mannequin shot into an on-model image for your product page, without booking a model, a studio, or a photographer.',
    platforms: ['Product pages', 'Catalogue'],
    cta: 'Create a listing photo',
    href: '#hero',
  },
  {
    number: '02',
    heading: 'Show every colourway you stock',
    description:
      'Generate an on-model image for each colour or print you sell, one garment photo at a time, so a shopper sees the exact variant instead of guessing from a swatch.',
    platforms: ['Variants', 'Colourways'],
    cta: 'Generate a variant',
    href: '#hero',
  },
  {
    number: '03',
    heading: 'Keep one model across your store',
    description:
      'Upload your own brand model and use it for your garments so your storefront keeps a consistent look. Results vary between generations, so review each image before publishing.',
    platforms: ['Brand look', 'Storefront'],
    cta: 'Use your own model',
    href: '#hero',
  },
  {
    number: '04',
    heading: 'Test creative before you spend on ads',
    description:
      'Produce on-model variants of the same garment for social posts and ad creative, and find the image that performs before committing a shoot budget.',
    platforms: ['Ad creative', 'Social'],
    cta: 'Create ad creative',
    href: '#hero',
  },
];

export default function UseCasesSection() {
  return (
    <section className="bg-[var(--landing-background)] px-4 py-20 text-[var(--landing-foreground)] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-4xl leading-[1.08] font-medium tracking-[-0.02em] text-[var(--landing-foreground)] sm:text-5xl lg:text-[52px]">
          What Clothing Sellers Use On-Model Images For
        </h2>
        <p className="mt-3 max-w-2xl text-[#6e665a]">
          For independent labels and Shopify, Etsy, Amazon, and TikTok Shop sellers:
          turn the garment photos you already have into images you can publish.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {USE_CASES.map((uc) => (
            <a
              key={uc.number}
              href={uc.href}
              className="group relative block overflow-hidden rounded-[24px] border border-[var(--landing-border)] bg-[var(--landing-surface)] p-8 transition-all duration-200 hover:shadow-md"
            >
              {/* Number overlay */}
              <span className="absolute left-6 top-6 text-xs font-semibold text-[#191613]/40">
                {uc.number}
              </span>

              <div>
                <h3 className="font-serif text-2xl leading-snug font-medium text-[var(--landing-foreground)]">
                  {uc.heading}
                </h3>
                <p className="mt-2 text-sm text-[#6e665a]">{uc.description}</p>
                <div className="mt-3 flex gap-2">
                  {uc.platforms.map((p) => (
                    <span
                      key={p}
                      className="inline-flex rounded-md bg-[var(--landing-surface-subtle)] px-2.5 py-1 text-xs font-medium text-[#191613]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#191613] group-hover:underline">
                {uc.cta} <ChevronRight className="size-4" />
              </span>
            </a>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-[#6e665a]">
          Pick a scenario, then upload a garment photo and choose a model.
        </p>
      </div>
    </section>
  );
}
