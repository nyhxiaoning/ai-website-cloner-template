import Header from '@/components/sites/aiclotheschanger-root-8816f3e1/Header';
import HeroSection from '@/components/sites/aiclotheschanger-root-8816f3e1/virtual-try-on-clothes/HeroSection';
import ExamplesSection from '@/components/sites/aiclotheschanger-root-8816f3e1/virtual-try-on-clothes/ExamplesSection';
import QualitySection from '@/components/sites/aiclotheschanger-root-8816f3e1/QualitySection';
import UseCasesSection from '@/components/sites/aiclotheschanger-root-8816f3e1/virtual-try-on-clothes/UseCasesSection';
import HowToSection from '@/components/sites/aiclotheschanger-root-8816f3e1/virtual-try-on-clothes/HowToSection';
import PricingSection from '@/components/sites/aiclotheschanger-root-8816f3e1/PricingSection';
import FaqSection from '@/components/sites/aiclotheschanger-root-8816f3e1/virtual-try-on-clothes/FaqSection';
import Footer from '@/components/sites/aiclotheschanger-root-8816f3e1/Footer';

export const metadata = {
  title: 'Virtual Try On Clothes Online with AI | AI Clothes Changer',
  description:
    'Virtually try on clothes online with AI. Upload your photo and a garment image to preview outfits before you buy — no app download needed.',
};

export default function VirtualTryOnPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ExamplesSection />
        <QualitySection />
        <UseCasesSection />
        <HowToSection />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
