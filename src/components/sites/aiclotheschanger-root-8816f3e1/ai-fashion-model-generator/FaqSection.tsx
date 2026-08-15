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
    question: 'What is an AI fashion model generator?',
    answer:
      'It is an online tool that takes a clothing product image and generates a photo of that garment worn by a fashion model. You upload the garment photo, choose a model, and get an on-model image you can use in listings, ads, and social content — without booking a model or a studio.',
  },
  {
    question: 'Can I use a flat-lay or hanger photo?',
    answer:
      'Yes. Flat-lay, hanger shots, ghost-mannequin images, and plain product photos all work. One clear, unobstructed garment per image gives the most reliable result.',
  },
  {
    question: 'Do I need to upload a model photo?',
    answer:
      'No. You can use one of the preset models without uploading anything. If you want to keep a consistent brand look, you can upload your own brand model instead.',
  },
  {
    question: 'Can I upload my own brand model?',
    answer:
      'Yes. Upload your own brand model photo and use it across all your garment generations so your storefront keeps a consistent look. You need explicit consent from every identifiable person in any photo you upload.',
  },
  {
    question: 'How consistent are generated models?',
    answer:
      'Results vary between generations even with the same model photo. Review each image before publishing, especially if you are building a consistent catalog.',
  },
  {
    question: 'Is the first generation free?',
    answer:
      'Yes. Sign up and generate one on-model image free before choosing a plan. Every new account gets one free test generation.',
  },
  {
    question: 'Can I use results for product listings?',
    answer:
      'Yes. All paid plans include a commercial use licence. You may use generated images in product listings, ads, social posts, and client work.',
  },
  {
    question: 'Which image formats are supported?',
    answer:
      'JPEG, PNG, and WebP are supported. Maximum file size is 4 MB per image.',
  },
  {
    question: 'How are uploaded photos handled?',
    answer:
      'Uploaded photos are processed securely and are not shared with third parties. We do not use your images to train public models. You retain full ownership of everything you upload.',
  },
];

export default function FaqSection() {
  return (
    <section className="bg-[var(--landing-background)] px-4 py-20 text-[var(--landing-foreground)] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-4xl leading-[1.08] font-medium tracking-[-0.02em] text-[var(--landing-foreground)] sm:text-5xl">
          AI Fashion Model Generator, Answered
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[#6e665a]">
          What the tool does with a garment photo, which images work, how models
          are chosen, and how your uploads are handled.
        </p>

        {/* CTA strip */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <p className="text-sm text-[#6e665a]">
            Ready to try it? Upload a garment photo above.
          </p>
          <a
            href="#hero"
            className="text-sm font-medium text-[#191613] underline underline-offset-2"
          >
            Generate an on-model photo
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
