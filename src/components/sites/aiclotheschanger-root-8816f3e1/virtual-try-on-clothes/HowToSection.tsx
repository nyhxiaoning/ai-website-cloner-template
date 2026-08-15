const STEPS = [
  {
    step: '01',
    imageAlt: 'Clear half-body photo of a person facing the camera',
    image: '/sites/aiclotheschanger-root-8816f3e1/images/howto-person.webp',
    topLabel: 'YOUR PHOTO',
    heading: 'Upload a clear photo of yourself',
    description:
      'Use a photo with only one person in it, facing the camera or close to it, in a half-body or full-body framing. Good lighting and an unobstructed clothing area give the most reliable result.',
    note: 'One person, front-facing, clear lighting, nothing covering the clothes',
  },
  {
    step: '02',
    imageAlt: 'Flat-lay product photo of a garment',
    image: '/sites/aiclotheschanger-root-8816f3e1/images/howto-garment.webp',
    topLabel: 'YOUR GARMENT PHOTO',
    heading: 'Add the clothes you want to try',
    description:
      'Upload a flat-lay, hanger shot, store product image, or a photo of a garment worn by a model. Clean, unobstructed images with one clear garment work best. You can also describe an outfit in words instead.',
    note: 'Combine up to 3 pieces — for example a jacket, a top, and bottoms',
  },
  {
    step: '03',
    imageAlt: 'AI-generated try-on result',
    image: '/sites/aiclotheschanger-root-8816f3e1/images/howto-result.webp',
    topLabel: 'REAL AI OUTPUT',
    heading: 'Generate your virtual try-on',
    description:
      'The AI generates a visual preview of the outfit on you and aims to keep your face, pose, and background recognizable. Download the result without a watermark. It is a visual preview, not a guarantee of size or fit.',
    note: 'Watermark-free download — a visual preview, not a sizing measurement',
  },
];

export default function HowToSection() {
  return (
    <section className="relative overflow-hidden bg-[#191613] px-4 py-20 text-[#f3efe6] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-4xl leading-[1.08] font-medium tracking-[-0.02em] text-[#f8f5ec] sm:text-5xl lg:text-[56px]">
          How to Virtually Try On Clothes Online in 3 Steps
        </h2>
        <p className="mt-3 max-w-2xl text-[#ece7dd]">
          No fitting room and no photoshoot. Add your photo, add the clothes, and get
          a virtual try-on preview you can download.
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
            Try clothes on online — first image free
          </a>
          <p className="mt-2 text-xs text-[#8a8276]">
            Explore the sample try-on above, then use your free generation on your
            own photos.
          </p>
        </div>
      </div>
    </section>
  );
}
