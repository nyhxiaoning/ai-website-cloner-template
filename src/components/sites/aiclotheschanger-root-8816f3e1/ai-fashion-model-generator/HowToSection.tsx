const STEPS = [
  {
    step: '01',
    imageAlt: 'Flat-lay product photo of a cable-knit sweater',
    image: '/sites/aiclotheschanger-root-8816f3e1/images/howto-garment.webp',
    topLabel: 'YOUR PRODUCT PHOTO',
    heading: 'Upload your garment photo',
    description:
      'A flat-lay, hanger shot, ghost-mannequin image, or a plain product photo all work. One clear, unobstructed garment per image gives the most reliable result.',
    note: 'JPEG, PNG or WebP · up to 4 MB per image',
  },
  {
    step: '02',
    imageAlt: 'Preset model selection in the AI fashion model generator',
    image: '/sites/aiclotheschanger-root-8816f3e1/images/howto-person.webp',
    topLabel: 'PRESET OR YOUR MODEL',
    heading: 'Choose a fashion model',
    description:
      'Pick one of the preset models, or upload your own brand model to keep your existing look. Uploaded model photos need consent from the person in them.',
    note: '3 preset models, or your own model photo',
  },
  {
    step: '03',
    imageAlt: 'AI-generated on-model result',
    image: '/sites/aiclotheschanger-root-8816f3e1/images/howto-result.webp',
    topLabel: 'REAL AI OUTPUT',
    heading: 'Generate and download',
    description:
      'The AI places the garment on the model while keeping the pose and background natural. Download the image without a watermark and review it before publishing.',
    note: '1 credit per image · watermark-free download',
  },
];

export default function HowToSection() {
  return (
    <section className="relative overflow-hidden bg-[#191613] px-4 py-20 text-[#f3efe6] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-4xl leading-[1.08] font-medium tracking-[-0.02em] text-[#f8f5ec] sm:text-5xl lg:text-[56px]">
          How to Put Your Clothes on an AI Fashion Model in 3 Steps
        </h2>
        <p className="mt-3 max-w-2xl text-[#ece7dd]">
          No photoshoot and no model booking. Start from the product photo you
          already have and download an on-model image.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <article key={s.step}>
              {/* Image card */}
              <div className="relative overflow-hidden rounded-[24px] border border-[#3a332b] bg-[#2a251f]">
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  className="aspect-[4/3] h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 text-xs font-semibold text-white">
                  {s.step}
                </span>
              </div>

              {/* Content */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-[#f3efe6]">{s.topLabel}</h3>
                <h4 className="mt-1 font-serif text-2xl leading-snug font-medium text-[#f8f5ec]">
                  {s.heading}
                </h4>
                <p className="mt-2 text-sm text-[#8a8276]">{s.description}</p>
                <p className="mt-1 text-xs text-[#6e665a]">{s.note}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <a
            href="#hero"
            className="inline-flex items-center gap-2 rounded-xl bg-[#191613] px-6 py-3 text-sm font-semibold text-white ring-1 ring-[#3a332b] transition-colors hover:bg-[#2e2820]"
          >
            Generate an on-model photo — first image free
          </a>
          <p className="mt-2 text-xs text-[#8a8276]">
            Try the sample garments above, then use your free generation on your
            own product photo.
          </p>
        </div>
      </div>
    </section>
  );
}
