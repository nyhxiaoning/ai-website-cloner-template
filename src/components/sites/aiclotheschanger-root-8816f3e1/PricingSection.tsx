'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const PLANS = [
  {
    name: 'Starter',
    popular: false,
    description: 'For personal try-on, avatars, and a small batch of content images.',
    price: '$9.9',
    period: '/ month',
    credits: '100 credits per month',
    features: ['HD download, no watermark', 'Commercial use license', 'About $0.10 per image'],
    cta: 'Get Starter',
  },
  {
    name: 'Creator',
    popular: true,
    description: 'For TikTok, Instagram, Xiaohongshu, and ad creative testing.',
    price: '$19.9',
    period: '/ month',
    credits: '250 credits per month',
    features: ['HD download, no watermark', 'Commercial use license', 'About $0.08 per image', 'Email support'],
    cta: 'Choose Creator',
  },
  {
    name: 'Seller',
    popular: false,
    description: 'For Shopify, Etsy, Amazon, and independent store product images.',
    price: '$39.9',
    period: '/ month',
    credits: '580 credits per month',
    features: ['HD download, no watermark', 'Commercial use license', 'About $0.07 per image', 'Priority email support'],
    cta: 'Choose Seller',
  },
];

const CREDIT_PACK = {
  name: 'Mini',
  price: '$5.9',
  credits: '40 credits',
  perCredit: '$0.15 / credit',
};

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="bg-[var(--landing-background-muted)] px-4 py-20 text-[var(--landing-foreground)] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Pricing</h2>
          <p className="mt-3 max-w-2xl mx-auto text-[#6e665a]">
            Choose how many AI outfit images you need. Every plan includes high-quality virtual try-on results, HD downloads, and commercial use.
          </p>
          <p className="mt-2 text-sm text-[#6e665a]">Create your first AI outfit image free before choosing a plan.</p>
          <a href="#hero" className="mt-2 inline-flex text-sm font-medium text-[#191613] underline underline-offset-2">Try 1 image free</a>
        </div>

        {/* Billing toggle */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center rounded-full bg-[var(--landing-surface-subtle)] p-1">
            <button
              onClick={() => setYearly(false)}
              className={cn('rounded-full px-5 py-2 text-sm font-semibold transition-colors', !yearly && 'bg-[var(--landing-contrast)] text-[var(--landing-contrast-foreground)]')}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn('rounded-full px-5 py-2 text-sm font-semibold transition-colors', yearly && 'bg-[var(--landing-contrast)] text-[var(--landing-contrast-foreground)]')}
            >
              Yearly
              <span className="ml-1.5 text-xs font-normal opacity-80">2 months free</span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <article key={plan.name} className="relative rounded-[24px] border border-[var(--landing-border)] bg-[var(--landing-surface)] p-6">
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--landing-contrast)] px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <p className="text-sm text-[#6e665a]">{plan.description}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold">{plan.price}</span>
                <span className="text-sm text-[#6e665a]">{plan.period}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-[#191613]">{plan.credits}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#6e665a]">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-[#191613]" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full rounded-xl bg-[var(--landing-contrast)] py-3 text-sm font-semibold text-[var(--landing-contrast-foreground)] transition-colors hover:opacity-90">
                {plan.cta}
              </button>
            </article>
          ))}
        </div>

        {/* Credit pack */}
        <div className="mt-10 rounded-2xl border border-[#ddd5c4] bg-white/60 p-6 text-center">
          <h3 className="text-lg font-semibold">Not ready to subscribe?</h3>
          <p className="mt-1 text-sm text-[#6e665a]">
            Best for occasional projects. Pay once, keep credits for 12 months, and subscribe anytime for a lower per-image price.
          </p>
          <button className="mt-4 inline-flex items-center gap-3 rounded-2xl border border-[#ddd5c4] bg-white/80 px-6 py-4 text-sm font-semibold text-[#191613] transition-colors hover:bg-white">
            <span className="flex items-center gap-1.5">
              <span className="flex size-5 items-center justify-center rounded-md bg-[#f3efe6] text-[#191613]">📦</span>
              {CREDIT_PACK.name}
            </span>
            <span className="text-lg font-bold">{CREDIT_PACK.price}</span>
            <span className="text-[#6e665a]">{CREDIT_PACK.credits}</span>
            <span className="text-[#6e665a]">{CREDIT_PACK.perCredit}</span>
          </button>
        </div>

        {/* Fine print */}
        <div className="mt-10 space-y-2 text-center">
          <p className="text-xs text-[#8a8276]">
            Auto-renewal: Subscription plans renew automatically at the end of each billing period until you cancel. You can cancel at any time in Settings → Billing; your plan and remaining credits stay available until the end of the current period. One-time credit packs are a single payment and do not renew.
          </p>
          <p className="text-xs text-[#8a8276]">
            Refunds: If you have consumed no credits from a purchase, you may request a full refund within 7 days at support@aiclotheschanger.io. Credits that have already been consumed are non-refundable.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-[#8a8276]">
            <a href="/terms-of-service" className="text-[#191613] underline hover:no-underline">Terms of Service</a>
            <span>·</span>
            <a href="/privacy-policy" className="text-[#191613] underline hover:no-underline">Privacy Policy</a>
            <span>·</span>
            <a href="/acceptable-use-policy" className="text-[#191613] underline hover:no-underline">Acceptable Use Policy</a>
          </div>
        </div>
      </div>
    </section>
  );
}
