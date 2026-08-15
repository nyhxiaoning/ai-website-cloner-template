import Header from '@/components/sites/aiclotheschanger-root-8816f3e1/Header';
import HeroSection from '@/components/sites/aiclotheschanger-root-8816f3e1/ai-fashion-model-generator/HeroSection';
import ExamplesSection from '@/components/sites/aiclotheschanger-root-8816f3e1/ai-fashion-model-generator/ExamplesSection';
import QualitySection from '@/components/sites/aiclotheschanger-root-8816f3e1/ai-fashion-model-generator/QualitySection';
import UseCasesSection from '@/components/sites/aiclotheschanger-root-8816f3e1/ai-fashion-model-generator/UseCasesSection';
import HowToSection from '@/components/sites/aiclotheschanger-root-8816f3e1/ai-fashion-model-generator/HowToSection';
import PricingSection from '@/components/sites/aiclotheschanger-root-8816f3e1/PricingSection';
import FaqSection from '@/components/sites/aiclotheschanger-root-8816f3e1/ai-fashion-model-generator/FaqSection';
import Footer from '@/components/sites/aiclotheschanger-root-8816f3e1/Footer';

export const metadata = {
  title: 'AI Fashion Model Generator for Brands | AI Clothes Changer',
  description:
    'Turn product photos into on-model images. Upload a garment, choose a fashion model, and generate listing-ready on-model photos with AI.',
};

export default function AiFashionModelPage() {
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
