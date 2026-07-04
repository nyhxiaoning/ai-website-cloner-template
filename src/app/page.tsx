"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StepsFlow from "@/components/StepsFlow";
import StyleSelector from "@/components/StyleSelector";
import ThemeSelector from "@/components/ThemeSelector";
import CustomInputs from "@/components/CustomInputs";
import GenerateButton from "@/components/GenerateButton";
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl space-y-12 px-4 pb-24 pt-16 text-gray-700">
        <HeroSection />
        <StepsFlow />

        <div className="space-y-8 rounded-2xl bg-white p-8">
          <StyleSelector />
          <ThemeSelector onSelectionChange={setSelectedThemes} />
          <CustomInputs />
          <GenerateButton disabled={selectedThemes.length === 0} />
        </div>

        <FeaturesSection />
        <FAQSection />
        <ContactSection />
      </main>
    </>
  );
}
