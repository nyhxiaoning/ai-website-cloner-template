'use client';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is an AI Clothes Changer?',
    answer:
      'An AI Clothes Changer is an online tool that changes or replaces clothing in a photo using AI. Upload a person image, then either describe the outfit in words or upload a garment reference photo, and generate a realistic virtual try-on preview without manual photo editing.',
  },
  {
    question: 'Is this tool affiliated with an AI model provider?',
    answer:
      'No. AI Clothes Changer is an independent tool. We do not share your data with model providers beyond what is needed to run the generation.',
  },
  {
    question: 'How does the AI Clothes Changer work?',
    answer:
      "Upload a person photo and a garment photo (or describe an outfit in words). Our AI analyzes the person's pose, body shape, and lighting, then generates a photoreal image with the new outfit applied while keeping the face, background, and body proportions intact.",
  },
  {
    question: 'Is AI Clothes Changer free to use?',
    answer:
      'Yes. Every new account gets one free generation so you can try the tool before choosing a plan. After that, credits are required for each generation.',
  },
  {
    question: 'Do generated images have a watermark?',
    answer:
      'No. All generations — free and paid — are delivered without a watermark. You can download and use them directly.',
  },
  {
    question: 'Can I use the generated images for Shopify, Etsy, or TikTok Shop listings?',
    answer:
      'Yes. All paid plans include a commercial use license. You may use generated images in product listings, ads, social posts, and client work.',
  },
  {
    question: 'What kinds of photos work best?',
    answer:
      'A clear half-body or full-body shot with decent lighting works best. Front-facing poses give the most consistent results. Very loose or very tight crops, extreme angles, and heavily filtered photos tend to produce lower-quality results.',
  },
  {
    question: 'What clothing can I change?',
    answer:
      'You can change tops, bottoms, outerwear, dresses, and accessories. Upload up to 3 garment images per generation to style a full look in one pass.',
  },
  {
    question: 'Will the face, body, and background stay the same?',
    answer:
      "The AI preserves the person's face, body shape, pose, and the original background. Results vary depending on photo quality and outfit complexity, but identity is maintained in the vast majority of cases.",
  },
  {
    question: 'Why did my outfit change not look realistic?',
    answer:
      'Common causes include low-quality input photos, extreme poses, heavily cropped images, or garments with complex patterns. Try a clearer photo with good lighting and a straightforward pose for better results.',
  },
  {
    question: 'What happens if a generation fails? Do credits expire?',
    answer:
      'Failed generations automatically return the credit to your account so you are not charged. Credits do not expire while your account is active.',
  },
  {
    question: 'Is my uploaded photo safe?',
    answer:
      'Uploaded photos are processed securely and are not shared with third parties. We do not use your images to train public models. You retain full ownership of everything you upload.',
  },
];

export default function FaqSection() {
  return (
    <section className="bg-[var(--landing-background)] px-4 py-20 text-[var(--landing-foreground)] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
          Questions before you change clothes with AI
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[#6e665a]">
          Learn how the AI clothes changer handles garments, photo quality, watermarks,
          privacy, and commercial use.
        </p>

        {/* CTA strip */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <p className="text-sm text-[#6e665a]">
            Ready to change an outfit? Try the AI clothes changer with your own photo.
          </p>
          <a
            href="#hero"
            className="text-sm font-medium text-[#191613] underline underline-offset-2"
          >
            Change an outfit free
          </a>
        </div>

        {/* Accordion */}
        <Accordion.Root type="single" collapsible defaultValue="item-0" className="mt-10 w-full">
          {FAQ_ITEMS.map((item, i) => (
            <Accordion.Item key={item.question} value={`item-${i}`} className="border-b border-[var(--landing-border)]">
              <Accordion.Header>
                <Accordion.Trigger
                  className={cn(
                    'flex w-full items-center justify-between py-5 text-left text-base font-medium text-[#191613]',
                    'transition-colors hover:text-[#6e665a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#191613] focus-visible:ring-offset-2'
                  )}
                >
                  {item.question}
                  <ChevronDown className="size-4 shrink-0 text-[#6e665a] transition-transform duration-200 data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content
                className={cn(
                  'overflow-hidden text-sm text-[#6e665a]',
                  'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
                )}
              >
                <div className="pb-5">
                  <p>{item.answer}</p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
