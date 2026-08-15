'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export default function HeroSection() {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <section className="relative overflow-hidden bg-[#f3efe6] px-4 pb-14 text-[#191613] pt-20 md:pt-24 sm:px-6 lg:pb-20 dark:bg-[#171412] dark:text-[#ece7dd]">
      <div className="relative mx-auto grid max-w-7xl items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        {/* ── LEFT COLUMN: Interactive Form ── */}
        <div>
          {/* Brand mark */}
          <div className="mb-2">
            <span className="font-sans text-[#191613]">fit</span>
            <span className="font-display text-[#191613]">tora</span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-[#191613] md:text-5xl lg:text-6xl">
            AI FASHION MODEL GENERATOR
          </h1>
          <p className="mt-2 text-2xl font-medium text-[#191613] md:text-3xl">
            Turn Clothing Photos Into On-Model Images
          </p>
          <p className="mt-3 text-[#6e665a]">
            Upload a product photo, choose an AI fashion model, and create on-model
            images for listings, ads, and social content.
          </p>

          <p className="mt-4 text-sm">
            <a
              href="/virtual-try-on-clothes"
              className="font-medium text-[#191613] underline underline-offset-2 hover:no-underline"
            >
              Want to try clothes on yourself? Try Virtual Try-On
            </a>
          </p>

          {/* ── Garment upload fieldset ── */}
          <fieldset className="mt-6">
            <legend className="text-sm font-medium text-[#191613]">
              Upload a garment photo
            </legend>
            <p className="mt-1 text-xs text-[#8a8276]">
              Use a flat-lay, hanger, mannequin, or product image.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <button className="flex-1 rounded-xl border-2 border-dashed border-[#e5ddcd] py-3 text-sm text-[#6e665a]">
                Cable-knit sweater
              </button>
              <button className="text-xs text-[#6e665a] underline">Replace</button>
              <button className="text-xs text-[#6e665a] underline">Remove</button>
            </div>
            <p className="mt-2 text-xs text-[#8a8276]">
              JPEG, PNG or WebP · Max 4 MB
            </p>
            <p className="mt-1 text-xs text-[#8a8276]">
              <span className="font-medium">Or try a sample garment</span>
            </p>
          </fieldset>

          {/* ── Model selection fieldset ── */}
          <fieldset className="mt-5">
            <legend className="text-sm font-medium text-[#191613]">
              Choose a fashion model
            </legend>
            <p className="mt-1 text-xs text-[#8a8276]">
              Use your own brand model to keep your existing brand look.
            </p>
            <p className="mt-1 text-xs text-[#8a8276]">
              <span className="font-medium">PRESET MODELS</span>
            </p>

            <div className="mt-2 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                {
                  src: '/sites/aiclotheschanger-root-8816f3e1/images/hero-person-1.webp',
                  alt: 'Model 1',
                  pressed: true,
                },
                {
                  src: '/sites/aiclotheschanger-root-8816f3e1/images/hero-person-2.webp',
                  alt: 'Model 2',
                  pressed: false,
                },
                {
                  src: '/sites/aiclotheschanger-root-8816f3e1/images/hero-person-3.webp',
                  alt: 'Model 3',
                  pressed: false,
                },
              ].map((p, i) => (
                <button
                  key={i}
                  aria-pressed={p.pressed}
                  className={cn(
                    'relative aspect-square overflow-hidden rounded-2xl bg-[#efebe2] transition outline-none',
                    'focus-visible:ring-2 focus-visible:ring-[#191613] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                    p.pressed
                      ? 'ring-2 ring-[#191613] ring-offset-2 ring-offset-white'
                      : 'ring-1 ring-[#e5ddcd] hover:ring-[#b8ae9b]'
                  )}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            <p className="mt-3 text-xs text-[#8a8276]">
              <span className="font-medium">Upload your own model</span>
            </p>
            <p className="mt-1 text-xs text-[#6e665a]">
              Selected: Model 1
            </p>
          </fieldset>

          {/* ── Optional prompt ── */}
          <div className="mt-5">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-[#191613]">
                Styling instructions
              </label>
              <span className="text-xs text-[#8a8276]">(optional)</span>
            </div>
          </div>

          {/* ── Generate button ── */}
          <button className="mt-4 w-full rounded-xl bg-[#191613] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2e2820]">
            Generate On-Model Photo
          </button>

          <p className="mt-2 text-center text-xs text-[#8a8276]">
            1 image · 1 credit — First generation free after sign-up
          </p>
        </div>

        {/* ── RIGHT COLUMN: Before / After Result ── */}
        <div>
          <div className="relative min-h-[560px] touch-pan-y overflow-hidden rounded-[28px] border border-[#e5ddcd] bg-[#f2f0ea] shadow-[0_32px_80px_rgba(25,22,19,0.16)] select-none sm:min-h-[680px] lg:h-[calc(100vh-8rem)]">
            {/* Before image (base) */}
            <img
              src="/sites/aiclotheschanger-root-8816f3e1/images/hero-person-1.webp"
              alt="Before"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* After image – clipped by slider position */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden bg-[#172120]"
              style={{ width: `${sliderValue}%` }}
            >
              <img
                src="/sites/aiclotheschanger-root-8816f3e1/images/hero-result-p1c1.webp"
                alt="After"
                className="absolute inset-0 h-full w-full object-cover object-center"
                style={{
                  width: `${100 / (sliderValue / 100 || 1)}%`,
                  maxWidth: 'none',
                }}
              />
            </div>
            {/* Section labels */}
            <div className="absolute left-4 top-4 flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wide text-white/80">
                YOUR GARMENT
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-white/80">
                SELECTED MODEL
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-white/80">
                GENERATED RESULT
              </span>
            </div>
            <span className="absolute right-4 bottom-4 text-xs font-medium uppercase tracking-wide text-white/80">
              SAMPLE RESULT
            </span>
            {/* Drag hint + handle */}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-xs text-white/60">
              DRAG TO COMPARE
            </span>
            <span
              className="absolute top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg"
              style={{ left: `${sliderValue}%` }}
            >
              <ChevronRight className="size-5 text-[#191613]" />
            </span>
            {/* Hidden range input for touch/mouse drag */}
            <input
              type="range"
              min={0}
              max={100}
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
              aria-label="Compare before and after"
            />
          </div>
          <p className="mt-2 text-center text-sm text-[#6e665a]">
            Designed to preserve logos, prints, patterns, and garment details.
            Review each result before publishing.
          </p>
        </div>
      </div>
    </section>
  );
}
