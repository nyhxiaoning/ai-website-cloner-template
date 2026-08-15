import Header from '@/components/sites/aiclotheschanger-root-8816f3e1/Header';
import PricingSection from '@/components/sites/aiclotheschanger-root-8816f3e1/PricingSection';
import FaqSection from '@/components/sites/aiclotheschanger-root-8816f3e1/FaqSection';
import Footer from '@/components/sites/aiclotheschanger-root-8816f3e1/Footer';

export const metadata = {
  title: 'Pricing - AI Clothes Changer',
  description: 'Choose how many AI outfit images you need. Every plan includes HD downloads with no watermark and commercial use.',
};

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
