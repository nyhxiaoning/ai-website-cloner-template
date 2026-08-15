'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export default function QualitySection() {
  const [active, setActive] = useState([0, 0, 0]);

  function toggle(group: number, index: number) {
    setActive((prev) => {
      const next = [...prev];
      next[group] = index;
      return next;
    });
  }

  const GROUP_1 = [
    { key: 'logo', label: 'Keep logos and prints sharp', desc: 'Small logos, printed text, graphics, and repeated patterns remain readable after try-on.' },
    { key: 'texture', label: 'Preserve fabric texture', desc: 'Denim grain, knit structure, folds, and material details stay visible.' },
    { key: 'pose', label: 'Match body pose and lighting', desc: 'The outfit follows body angle, shadows, highlights, and scene lighting.' },
  ];

  const GROUP_2 = [
    { key: 'flat', label: 'Flat lay clothing references', desc: 'Turn clean garment photos into natural on-model try-ons.' },
    { key: 'onmodel', label: 'On-model clothing references', desc: 'Use an existing model photo as the clothing reference.' },
    { key: 'catalog', label: 'One model across your catalog', desc: 'Reuse the same person photo for every garment, so your whole catalog gets a consistent model.' },
  ];

  const GROUP_3 = [
    { key: 'framing', label: 'Your framing, preserved', desc: 'Output follows your uploaded photo\'s aspect ratio, ready for listings and social formats.' },
    { key: 'quality', label: 'Full quality on every plan', desc: 'Your free test image runs the same model at the same quality as paid generations. Nothing held back.' },
    { key: 'commercial', label: 'Commercial usage', desc: 'Use paid outputs for listings, ads, content, and client work. Usage rights are spelled out in our terms.' },
  ];

  return (
    <section className="bg-[var(--landing-surface)] px-4 py-20 text-[var(--landing-foreground)] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-3xl font-serif text-4xl leading-[1.08] font-medium tracking-[-0.02em] text-[var(--landing-foreground)] sm:text-5xl lg:text-[56px]">
          What to review before you publish a listing photo
        </h2>
        <p className="mt-3 max-w-2xl text-[#6e665a]">
          Generated on-model images are designed to preserve logos, prints, patterns,
          and garment details — but you are the one publishing them. Check the
          garment, the model, and the final image before it goes on a product page.
        </p>

        {/* Top label bar */}
        <div className="mt-8 flex items-center gap-3">
          <span className="text-sm font-bold text-[var(--landing-foreground)]">
            PUBLISH-READY INSPECTION
          </span>
        </div>

        <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: large visual panel */}
          <div className="relative rounded-[24px] border border-[var(--landing-border)] bg-[var(--landing-surface-muted)] p-4 shadow-[0_2px_8px_rgba(25,22,19,0.08)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src="/sites/aiclotheschanger-root-8816f3e1/images/quality-inspection-logo.webp"
                alt="Quality inspection"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="mt-3">
              <h3 className="text-base font-bold text-[var(--landing-foreground)]">
                Logo clarity check
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {['Logo readable', 'Print clarity', 'Texture retained', 'Material detail', 'Lighting matched', 'Pose and shadows'].map((b) => (
                  <span
                    key={b}
                    className="rounded-md bg-[var(--landing-surface-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--landing-foreground)]"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: toggle panels */}
          <div className="space-y-8">
            {/* Group 1 */}
            <div>
              <h3 className="font-serif text-2xl font-medium text-[var(--landing-foreground)]">
                1. Image fidelity
              </h3>
              <div className="mt-2 space-y-1">
                {GROUP_1.map((item, i) => (
                  <button
                    key={item.key}
                    onClick={() => toggle(0, i)}
                    className={cn(
                      'group w-full border-l-2 border-transparent px-3 py-3 text-left transition duration-150',
                      'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--landing-contrast)]',
                      active[0] === i
                        ? 'border-l-[#d51e0e] bg-[var(--landing-surface-muted)] text-[var(--landing-foreground)]'
                        : 'text-[var(--landing-muted-foreground)] hover:bg-[var(--landing-surface-muted)] hover:text-[var(--landing-foreground)]'
                    )}
                  >
                    <p className="text-sm font-medium">{item.label}</p>
                    {active[0] === i && (
                      <p className="mt-1 text-xs text-[var(--landing-muted-foreground)]">
                        {item.desc}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Group 2 */}
            <div>
              <h3 className="font-serif text-2xl font-medium text-[var(--landing-foreground)]">
                2. Reference flexibility
              </h3>
              <div className="mt-2 space-y-1">
                {GROUP_2.map((item, i) => (
                  <button
                    key={item.key}
                    onClick={() => toggle(1, i)}
                    className={cn(
                      'group w-full border-l-2 border-transparent px-3 py-3 text-left transition duration-150',
                      'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--landing-contrast)]',
                      active[1] === i
                        ? 'border-l-[#d51e0e] bg-[var(--landing-surface-muted)] text-[var(--landing-foreground)]'
                        : 'text-[var(--landing-muted-foreground)] hover:bg-[var(--landing-surface-muted)] hover:text-[var(--landing-foreground)]'
                    )}
                  >
                    <p className="text-sm font-medium">{item.label}</p>
                    {active[1] === i && (
                      <p className="mt-1 text-xs text-[var(--landing-muted-foreground)]">
                        {item.desc}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Group 3 */}
            <div>
              <h3 className="font-serif text-2xl font-medium text-[var(--landing-foreground)]">
                3. What you download
              </h3>
              <div className="mt-2 space-y-1">
                {GROUP_3.map((item, i) => (
                  <button
                    key={item.key}
                    onClick={() => toggle(2, i)}
                    className={cn(
                      'group w-full border-l-2 border-transparent px-3 py-3 text-left transition duration-150',
                      'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--landing-contrast)]',
                      active[2] === i
                        ? 'border-l-[#d51e0e] bg-[var(--landing-surface-muted)] text-[var(--landing-foreground)]'
                        : 'text-[var(--landing-muted-foreground)] hover:bg-[var(--landing-surface-muted)] hover:text-[var(--landing-foreground)]'
                    )}
                  >
                    <p className="text-sm font-medium">{item.label}</p>
                    {active[2] === i && (
                      <p className="mt-1 text-xs text-[var(--landing-muted-foreground)]">
                        {item.desc}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
