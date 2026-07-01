import HeroSection from "@/components/HeroSection";
import TimelineGrid from "@/components/TimelineGrid";
import DebateArena from "@/components/DebateArena";
import BottomNav from "@/components/BottomNav";
import LegendSection from "@/components/LegendSection";
import SiteFooter from "@/components/SiteFooter";
import VersionBar from "@/components/VersionBar";
import { philosophers } from "@/data/philosophers";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-alabaster">
      <HeroSection />
      <TimelineGrid philosophers={philosophers} />
      <DebateArena philosophers={philosophers} />
      <LegendSection />
      <SiteFooter />
      <VersionBar />
      <BottomNav />
    </main>
  );
}
