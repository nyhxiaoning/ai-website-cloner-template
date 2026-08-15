'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export default function HeroSection() {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <section className="relative overflow-hidden bg-[#f3efe6] px-4 pb-14 text-[#191613] pt-20 md:pt-24 sm:px-6 lg:pb-20 dark:bg-[#171412] dark:text-[#ece7dd]">
      <div className="relative mx-auto grid max-w-7xl items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        {/* ── LEFT COLUMN: Interactive Demo Form ── */}
        <div>
          {/* Brand mark */}
          <div className="mb-2">
            <span className="font-sans text-[#191613]">fit</span>
            <span className="font-display text-[#191613]">tora</span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-[#191613] md:text-5xl lg:text-6xl">
            AI VIRTUAL TRY-ON
          </h1>
          <p className="mt-2 text-2xl font-medium text-[#191613] md:text-3xl">
            Virtual Try On Clothes Online
          </p>
          <p className="mt-3 text-[#6e665a]">
            Upload a photo of yourself and a garment image to preview clothes on you
            with AI before you buy, style, or share a look. Try different outfits
            online while keeping your face, pose, and background recognizable.
          </p>

          {/* Feature pills */}
          <ul className="mt-4 flex flex-wrap gap-3">
            <li className="flex items-center gap-1.5 text-sm text-[#191613]">
              <span className="text-[#191613]">✓</span> No credit card
            </li>
            <li className="flex items-center gap-1.5 text-sm text-[#191613]">
              <span className="text-[#191613]">✓</span> Up to 3 items, one look
            </li>
            <li className="flex items-center gap-1.5 text-sm text-[#191613]">
              <span className="text-[#191613]">✓</span> Interactive outfit demo
            </li>
          </ul>

          {/* ── Person fieldset ── */}
          <fieldset className="mt-6">
            <legend className="text-sm font-medium text-[#191613]">Person</legend>
            <div className="mt-2 flex items-center gap-2">
              <button className="flex-1 rounded-xl border-2 border-dashed border-[#e5ddcd] py-3 text-sm text-[#6e665a]">
                Upload person photo
              </button>
              <span className="text-xs text-[#8a8276]">PNG / JPG</span>
            </div>
            <p className="mt-2 text-xs text-[#8a8276]">Or try an example</p>

            {/* Person thumbnails */}
            <div className="mt-2 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                {
                  src: '/sites/aiclotheschanger-root-8816f3e1/images/hero-person-1.webp',
                  alt: 'Woman in a white tank top',
                  pressed: true,
                },
                {
                  src: '/sites/aiclotheschanger-root-8816f3e1/images/hero-person-2.webp',
                  alt: 'Man in a white T-shirt',
                  pressed: false,
                },
                {
                  src: '/sites/aiclotheschanger-root-8816f3e1/images/hero-person-3.webp',
                  alt: 'Woman in a beige knit top',
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
          </fieldset>

          {/* ── Radio: clothing photos vs describe ── */}
          <fieldset className="mt-5">
            <legend className="text-sm font-medium text-[#191613]">
              How do you want to change the outfit?
            </legend>
            <div className="mt-2 flex gap-4">
              <label className="flex items-center gap-2 text-sm text-[#191613]">
                <input type="radio" name="outfit-mode" defaultChecked /> Use
                clothing photos
              </label>
              <label className="flex items-center gap-2 text-sm text-[#191613]">
                <input type="radio" name="outfit-mode" /> Describe an outfit
              </label>
            </div>
          </fieldset>

          {/* ── Clothing fieldset ── */}
          <fieldset className="mt-5">
            <legend className="text-sm font-medium text-[#191613]">Clothing</legend>
            <button className="mt-2 flex items-center gap-2 rounded-xl border border-[#e5ddcd] bg-white px-4 py-2.5 text-sm text-[#191613]">
              <Upload className="size-4" />
              Upload clothing image
            </button>
            <p className="mt-2 text-xs text-[#8a8276]">Or try an example</p>

            <div className="mt-2 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                {
                  src: '/sites/aiclotheschanger-root-8816f3e1/images/hero-cloth-1.webp',
                  alt: 'Blue denim jacket',
                  pressed: true,
                },
                {
                  src: '/sites/aiclotheschanger-root-8816f3e1/images/hero-cloth-2.webp',
                  alt: 'White floral dress',
                  pressed: false,
                },
                {
                  src: '/sites/aiclotheschanger-root-8816f3e1/images/hero-cloth-3.webp',
                  alt: 'Black leather biker jacket',
                  pressed: false,
                },
              ].map((c, i) => (
                <button
                  key={i}
                  aria-pressed={c.pressed}
                  className={cn(
                    'relative block overflow-hidden rounded-lg bg-[#efebe2] ring-1 ring-[#e5ddcd] transition',
                    'sm:size-9',
                    'size-7',
                    c.pressed && 'ring-2 ring-[#191613]'
                  )}
                >
                  <img src={c.src} alt={c.alt} className="object-cover" />
                </button>
              ))}
            </div>

            {/* Selected clothing row */}
            <div className="mt-3 flex items-center gap-2">
              <div className="relative block size-7 overflow-hidden rounded-lg bg-[#efebe2] ring-1 ring-[#191613] sm:size-9">
                <img
                  src="/sites/aiclotheschanger-root-8816f3e1/images/hero-cloth-1.webp"
                  alt="Selected"
                  className="object-cover"
                />
              </div>
              <button className="text-xs text-[#6e665a] underline">
                Remove clothing item 1: Clothing 1
              </button>
            </div>
            <button className="mt-2 text-sm font-medium text-[#191613]">
              Add another clothing image
            </button>
            <p className="mt-1 text-xs text-[#8a8276]">
              Add bottoms or an accessory to style a full look
            </p>
          </fieldset>

          {/* ── Optional prompt ── */}
          <div className="mt-5">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-[#191613]">Prompt</label>
              <span className="text-xs text-[#8a8276]">Optional</span>
            </div>
            <textarea
              placeholder="e.g. casual street style, natural lighting, keep the same pose"
              className="mt-1 w-full rounded-xl border border-[#e5ddcd] bg-white px-3 py-2 text-sm text-[#191613] placeholder:text-[#8a8276] focus-visible:ring-2 focus-visible:ring-[#191613] focus-visible:ring-offset-2"
              rows={2}
            />
            <p className="mt-1 text-xs text-[#8a8276]">Leave blank to use the default look.</p>
          </div>

          {/* ── Terms ── */}
          <p className="mt-3 text-xs text-[#6e665a]">
            Use this tool only for lawful virtual try-on and clothing visualization.
            Upload only photos you have the right to use and for which every
            identifiable person has given explicit consent. No photos of minors,
            NSFW, sexually explicit, sexually suggestive, or harmful content.{" "}
            <a href="/acceptable-use-policy" className="text-[#191613] underline hover:no-underline">
              Read the Acceptable Use Policy
            </a>
            .
          </p>

          {/* ── Generate button ── */}
          <button className="mt-4 w-full rounded-xl bg-[#191613] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2e2820]">
            Generate
          </button>

          <p className="mt-2 text-center text-xs text-[#8a8276]">
            Explore the outfit demo, then sign up to change clothes in your own
            photo.
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
            {/* Labels */}
            <span className="absolute left-4 bottom-4 text-xs font-medium uppercase tracking-wide text-white/80">
              Before
            </span>
            <span className="absolute right-4 bottom-4 text-xs font-medium uppercase tracking-wide text-white/80">
              After
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
          <p className="mt-2 text-center text-sm text-[#6e665a]">This look</p>
        </div>
      </div>
    </section>
  );
}
