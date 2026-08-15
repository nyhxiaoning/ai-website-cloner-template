import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

const USE_CASES = [
  {
    number: '01',
    heading: 'Listing photos without a photoshoot',
    description: 'Turn flat-lay or hanger shots into on-model photos for your product pages. Logos, prints, and patterns stay exactly as they appear on the garment.',
    platforms: ['Shopify', 'Etsy'],
    cta: 'Create a listing photo',
    href: '/ai-fashion-model-generator',
  },
  {
    number: '02',
    heading: 'Create outfit content at scale',
    description: 'Reuse one person photo across outfits and scenes with the AI outfit changer. A consistent, recognizable face keeps your fashion content looking like one brand.',
    platforms: ['TikTok Shop', 'Instagram'],
    cta: 'Change an outfit',
    href: '#hero',
  },
  {
    number: '03',
    heading: 'Style complete outfits',
    description: 'Combine a top, bottoms, and accessories on one model in a single generation — merchandise full looks instead of single items.',
    platforms: ['Lookbooks', 'Outfit bundles'],
    cta: 'Style a full look',
    href: '#hero',
  },
  {
    number: '04',
    heading: 'Test looks before you spend',
    description: 'Change clothes in photos for cents each and generate outfit swaps and scene variants. Find the winning look before paying for a shoot or an ad budget.',
    platforms: ['Ad creatives', 'A/B variants'],
    cta: 'Generate ad variants',
    href: '#hero',
  },
];

export default function UseCasesSection() {
  return (
    <section className="bg-[var(--landing-background-muted)] px-4 py-20 text-[var(--landing-foreground)] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          AI Outfit Changer Use Cases: From Product Photo to Publish-Ready Content
        </h2>
        <p className="mt-3 max-w-2xl text-[#6e665a]">
          Built for Shopify stores, Etsy shops, TikTok Shop sellers, and independent brands — use the AI clothing changer to turn the garment photos you already have into on-model images, social content, and ad variants.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {USE_CASES.map((uc) => (
            <a
              key={uc.number}
              href={uc.href}
              className="group relative block overflow-hidden rounded-[24px] border border-[var(--landing-border)] bg-[var(--landing-surface)] p-8 transition-all duration-200 hover:shadow-md"
            >
              {/* Number overlay */}
              <span className="absolute left-6 top-6 text-xs font-semibold text-[#191613]/40">{uc.number}</span>

              <div>
                <h3 className="text-lg font-semibold text-[#191613]">{uc.heading}</h3>
                <p className="mt-2 text-sm text-[#6e665a]">{uc.description}</p>
                <div className="mt-3 flex gap-2">
                  {uc.platforms.map(p => (
                    <span key={p} className="inline-flex rounded-md bg-[var(--landing-surface-subtle)] px-2.5 py-1 text-xs font-medium text-[#191613]">
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
          Choose a use case, then upload a person and garment photo to change the outfit with AI.
        </p>
      </div>
    </section>
  );
}
