import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

const USE_CASES = [
  {
    number: '01',
    heading: 'Preview clothes before buying',
    description:
      'Upload a product image from a store page and see the piece on your own photo first. It is a visual preview of the look, colour, and styling — not a size or fit measurement.',
    platforms: ['Online shopping', 'Wishlist'],
    cta: 'Preview an item',
    href: '#hero',
  },
  {
    number: '02',
    heading: 'Try outfits from your own wardrobe',
    description:
      'Photograph clothes you already own and test combinations you have not worn yet. Mix a top, bottoms, and outerwear to see how a pairing reads before you get dressed.',
    platforms: ['Wardrobe', 'Styling'],
    cta: 'Mix an outfit',
    href: '#hero',
  },
  {
    number: '03',
    heading: 'Plan looks for events',
    description:
      'Preview a few options for a party, trip, date, or holiday in one sitting, then compare them side by side instead of trying everything on in person.',
    platforms: ['Events', 'Travel'],
    cta: 'Plan a look',
    href: '#hero',
  },
  {
    number: '04',
    heading: 'Create outfit content',
    description:
      'Generate outfit visuals for social posts, profile pictures, or personal style inspiration, using your own photo as the base so the result still looks like you.',
    platforms: ['Social media', 'Inspiration'],
    cta: 'Create a look',
    href: '#hero',
  },
];

export default function UseCasesSection() {
  return (
    <section className="bg-[#f3efe6] px-4 py-20 text-[#191613] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-4xl leading-[1.08] font-medium tracking-[-0.02em] text-[#191613] sm:text-5xl lg:text-[52px]">
          What You Can Do with a Virtual Fitting Room
        </h2>
        <p className="mt-3 max-w-2xl text-[#6e665a]">
          Try clothes online on your own photo — for shopping decisions, wardrobe
          planning, event styling, or the outfit content you post.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {USE_CASES.map((uc) => (
            <a
              key={uc.number}
              href={uc.href}
              className={cn(
                'group relative block overflow-hidden rounded-[24px] border border-[#e5ddcd] bg-white p-8',
                'transition-all duration-200 hover:shadow-md'
              )}
            >
              {/* Number overlay */}
              <span className="absolute left-6 top-6 text-xs font-semibold text-[#191613]/40">
                {uc.number}
              </span>

              <div>
                <h3 className="font-serif text-2xl leading-snug font-medium text-[#191613]">
                  {uc.heading}
                </h3>
                <p className="mt-2 text-sm text-[#6e665a]">{uc.description}</p>
                <div className="mt-3 flex gap-2">
                  {uc.platforms.map((p) => (
                    <span
                      key={p}
                      className="inline-flex rounded-md bg-[#f3efe6] px-2.5 py-1 text-xs font-medium text-[#191613]"
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
          Pick a scenario, then upload your photo and a garment image to try it on.
        </p>
      </div>
    </section>
  );
}
