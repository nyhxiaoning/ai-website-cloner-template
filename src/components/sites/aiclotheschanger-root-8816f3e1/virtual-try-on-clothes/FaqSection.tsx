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
    question: 'Can you virtually try on clothes online?',
    answer:
      'Yes. Virtual try-on is an online way to see how a garment looks on you without physically wearing it. You upload a photo of yourself and a garment image, and AI generates a preview of you in that outfit. It is a visual preview for shopping, styling, and content decisions — it does not measure your body or confirm that a size will fit.',
  },
  {
    question: 'How does AI virtual try-on work?',
    answer:
      'Upload a photo of yourself and a garment image (flat-lay, hanger, or product photo). Our AI analyses your pose, body shape, and lighting, then generates a photoreal preview of the outfit on you while keeping your face, background, and body proportions intact.',
  },
  {
    question: 'Can I try on clothes online for free?',
    answer:
      'Yes. Every new account gets one free generation so you can try the tool before choosing a plan. After that, credits are required for each generation.',
  },
  {
    question: 'Do I need to sign up?',
    answer:
      'Yes. Sign up is required to generate and download images. Every new account starts with one free generation.',
  },
  {
    question: 'Do I need a virtual try-on clothes app?',
    answer:
      'No. This is a browser-based tool — no app download needed. Works on desktop and mobile browsers.',
  },
  {
    question: 'What person photos work best?',
    answer:
      'A clear half-body or full-body shot with the person facing the camera works best. Good lighting, a single person in the frame, and nothing covering the garment area give the most reliable result.',
  },
  {
    question: 'What garment photos can I upload?',
    answer:
      'Flat-lay, hanger shots, store product images, and photos of a garment worn by a model all work. Clean, unobstructed images with one clear garment give the best result.',
  },
  {
    question: 'Can virtual try-on tell me the correct clothing size?',
    answer:
      'No. Virtual try-on is a visual preview of how a garment looks on you — it does not measure your body or confirm whether a size will fit. Check the retailer\'s size guide for fit information.',
  },
  {
    question: 'Will your face, body, pose, and background stay the same?',
    answer:
      'The AI aims to preserve your face, body shape, pose, and the original background. Results vary depending on photo quality and outfit complexity, but identity and background are maintained in the vast majority of cases.',
  },
  {
    question: 'Do generated images have a watermark?',
    answer:
      'No. All generations — free and paid — are delivered without a watermark. You can download and use them directly.',
  },
  {
    question: 'Are your uploaded photos private?',
    answer:
      'Uploaded photos are processed securely and are not shared with third parties. We do not use your images to train public models. You retain full ownership of everything you upload.',
  },
  {
    question: 'What happens if a generation fails?',
    answer:
      'Failed generations automatically return the credit to your account so you are not charged.',
  },
  {
    question: 'Can I use the generated images commercially?',
    answer:
      'Yes. All paid plans include a commercial use licence. You may use generated images in product listings, ads, social posts, and client work.',
  },
];

export default function FaqSection() {
  return (
    <section className="bg-[var(--landing-background)] px-4 py-20 text-[var(--landing-foreground)] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-4xl leading-[1.08] font-medium tracking-[-0.02em] text-[var(--landing-foreground)] sm:text-5xl">
          Virtual Try-On Questions, Answered
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[#6e665a]">
          How online clothes try-on works, what photos to use, what it can and
          cannot tell you about fit, and how your uploads are handled.
        </p>

        {/* CTA strip */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <p className="text-sm text-[#6e665a]">
            Ready to see an outfit on yourself? Start with the try-on above.
          </p>
          <a
            href="#hero"
            className="text-sm font-medium text-[#191613] underline underline-offset-2"
          >
            Try clothes on free
          </a>
        </div>

        {/* Accordion */}
        <Accordion.Root
          type="single"
          collapsible
          defaultValue="item-0"
          className="mt-10 w-full"
        >
          {FAQ_ITEMS.map((item, i) => (
            <Accordion.Item
              key={item.question}
              value={`item-${i}`}
              className="border-b border-[var(--landing-border)]"
            >
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
