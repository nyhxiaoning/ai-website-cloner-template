const STEPS = [
  {
    step: '01',
    imageAlt: 'Model photo used as the try-on base',
    image: '/sites/aiclotheschanger-root-8816f3e1/images/howto-person.webp',
    topLabel: 'Your model photo',
    heading: 'Add a person photo',
    description: 'Use your own model shots, a customer photo, or a simple phone picture. A clear half-body or full-body shot with decent lighting is enough for a realistic virtual try-on.',
    note: 'No studio or professional camera needed',
  },
  {
    step: '02',
    imageAlt: 'Flat-lay product photo of a denim jacket',
    image: '/sites/aiclotheschanger-root-8816f3e1/images/howto-garment.webp',
    topLabel: 'Your product photo',
    heading: 'Add the garment you sell',
    description: 'Upload the product image straight from your listing — flat-lay, hanger, or mannequin shots all work. Add a text prompt if you want to fine-tune the styling.',
    note: 'Combine up to 3 pieces — jacket, top, and bottoms — into one look',
  },
  {
    step: '03',
    imageAlt: 'AI-generated try-on result of the model wearing the denim jacket',
    image: '/sites/aiclotheschanger-root-8816f3e1/images/howto-result.webp',
    topLabel: 'Real AI output',
    heading: 'Generate and download',
    description: 'The AI clothing changer puts the garment on your model while keeping the face, pose, and body shape natural. Download and drop it straight into your listing.',
    note: 'Output keeps your original resolution, ready in minutes',
  },
];

export default function HowToSection() {
  return (
    <section className="relative overflow-hidden bg-[#191613] px-4 py-20 text-[#f3efe6] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl text-[#f3efe6]">
          How to Change Clothes in Photos with AI in 3 Steps
        </h2>
        <p className="mt-3 max-w-2xl text-[#ece7dd]">
          No photoshoot, no model booking. Go from product photo to on-model image and download a listing-ready file in minutes.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <article key={s.step}>
              {/* Image card */}
              <div className="relative overflow-hidden rounded-[24px] border border-[#3a332b] bg-[#2a251f]">
                <img src={s.image} alt={s.imageAlt} className="aspect-[4/3] h-full w-full object-cover" />
                <span className="absolute left-4 top-4 text-xs font-semibold text-white">{s.step}</span>
              </div>

              {/* Content */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-[#f3efe6]">{s.topLabel}</h3>
                <h4 className="mt-1 text-lg font-semibold text-[#ece7dd]">{s.heading}</h4>
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
            Change clothes with AI — first image free
          </a>
          <p className="mt-2 text-xs text-[#8a8276]">
            Explore the demo above, then use your free generation on your own person and clothing photos.
          </p>
        </div>
      </div>
    </section>
  );
}
