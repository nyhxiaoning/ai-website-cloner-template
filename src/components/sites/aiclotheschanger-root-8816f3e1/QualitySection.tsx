'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export default function QualitySection() {
  // active index per group
  const [active, setActive] = useState([0, 0, 0]);

  function toggle(group: number, index: number) {
    setActive(prev => {
      const next = [...prev];
      next[group] = index;
      return next;
    });
  }

  return (
    <section className="bg-[var(--landing-surface)] px-4 py-20 text-[var(--landing-foreground)] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Publish-ready AI outfit changes, every time</h2>
        <p className="mt-3 max-w-2xl text-[#6e665a]">Every virtual try-on preserves the details shoppers notice. Check the clothing, person, and final AI outfit image before you publish it to your store, listings, or social channels.</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: large visual panel */}
          <div className="relative rounded-[24px] border border-[var(--landing-border)] bg-[var(--landing-surface-muted)] p-4 shadow-[0_2px_8px_rgba(25,22,19,0.08)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <img src="/sites/aiclotheschanger-root-8816f3e1/images/quality-inspection-logo.webp" alt="Quality inspection" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="mt-3">
              <p className="text-xs font-medium uppercase tracking-wide text-[#6e665a]">{QUALITY_GROUPS[0].toggles[active[0]].badgeLabel}</p>
              <h3 className="mt-1 text-lg font-semibold">{QUALITY_GROUPS[0].toggles[active[0]].badgeSub}</h3>
              <p className="mt-1 text-sm text-[#6e665a]">{QUALITY_GROUPS[0].toggles[active[0]].description}</p>
            </div>
          </div>

          {/* Right: 3 toggle groups */}
          <div className="space-y-10">
            {QUALITY_GROUPS.map((group, gi) => (
              <div key={group.heading}>
                <h3 className="text-lg font-semibold text-[#191613]">{group.heading}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.toggles.map((t, ti) => (
                    <button
                      key={t.label}
                      aria-pressed={active[gi] === ti}
                      onClick={() => toggle(gi, ti)}
                      className={cn(
                        'rounded-full px-5 py-2 text-sm font-semibold transition-colors active:scale-95',
                        active[gi] === ti
                          ? 'bg-[var(--landing-contrast)] text-[var(--landing-contrast-foreground)]'
                          : 'text-[var(--landing-foreground)]'
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type QualityToggle = {
  label: string;
  description: string;
  badgeLabel: string;
  badgeSub: string;
};

type QualityGroup = {
  heading: string;
  toggles: QualityToggle[];
};

const QUALITY_GROUPS: QualityGroup[] = [
  {
    heading: '1. Image fidelity',
    toggles: [
      { label: 'Keep logos and prints sharp', description: 'Small logos, printed text, graphics, and repeated patterns remain readable after try-on.', badgeLabel: 'Logo clarity', badgeSub: 'Logo stays readable' },
      { label: 'Preserve fabric texture', description: 'Denim grain, knit structure, folds, and material details survive generation intact.', badgeLabel: 'Texture detail', badgeSub: 'Texture retained' },
      { label: 'Match body pose and lighting', description: 'The outfit follows body angle, shadows, and the original photo lighting.', badgeLabel: 'Lighting match', badgeSub: 'Lighting matched' },
    ],
  },
  {
    heading: '2. Reference flexibility',
    toggles: [
      { label: 'Flat lay clothing references', description: 'Turn clean garment photos into natural on-model results.', badgeLabel: 'Flat lay input', badgeSub: 'Flat lay works' },
      { label: 'On-model clothing references', description: 'Use an existing model photo as the garment reference.', badgeLabel: 'On-model input', badgeSub: 'On-model works' },
      { label: 'One model across your catalog', description: 'Reuse the same person photo for multiple outfit generations.', badgeLabel: 'Consistent model', badgeSub: 'Same face' },
    ],
  },
  {
    heading: '3. What you download',
    toggles: [
      { label: 'Your framing, preserved', description: 'Output follows your uploaded photo\'s framing and composition.', badgeLabel: 'Framing kept', badgeSub: 'Original framing' },
      { label: 'Full quality on every plan', description: 'Your free test image runs the same high-quality model as paid generations.', badgeLabel: 'Full quality', badgeSub: 'No quality loss' },
      { label: 'Commercial usage', description: 'Use paid outputs for listings, ads, content, and client work.', badgeLabel: 'Commercial use', badgeSub: 'Full license' },
    ],
  },
];
