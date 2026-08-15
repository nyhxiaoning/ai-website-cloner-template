import Header from '@/components/sites/aiclotheschanger-root-8816f3e1/Header';
import HeroSection from '@/components/sites/aiclotheschanger-root-8816f3e1/HeroSection';
import ExamplesSection from '@/components/sites/aiclotheschanger-root-8816f3e1/ExamplesSection';
import QualitySection from '@/components/sites/aiclotheschanger-root-8816f3e1/QualitySection';
import UseCasesSection from '@/components/sites/aiclotheschanger-root-8816f3e1/UseCasesSection';
import HowToSection from '@/components/sites/aiclotheschanger-root-8816f3e1/HowToSection';
import PricingSection from '@/components/sites/aiclotheschanger-root-8816f3e1/PricingSection';
import FaqSection from '@/components/sites/aiclotheschanger-root-8816f3e1/FaqSection';
import Footer from '@/components/sites/aiclotheschanger-root-8816f3e1/Footer';

export default function Home() {
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
