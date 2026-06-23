'use client';

import { useState } from "react";
import dynamic from "next/dynamic";
import type { TabView } from "@/types";
import HeroHeader from "@/components/HeroHeader";
import TabNavigation from "@/components/TabNavigation";
import TimelineView from "@/components/TimelineView";
import MindMapView from "@/components/MindMapView";
import SupportView from "@/components/SupportView";
import RouteOverview from "@/components/RouteOverview";
import CulturalSignificance from "@/components/CulturalSignificance";
import Footer from "@/components/Footer";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabView>("map");

  return (
    <div className="min-h-screen">
      <div className="w-full glass-effect shadow-2xl overflow-hidden">
        <HeroHeader />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "map" && (
          <>
            <MapView />
            <RouteOverview />
            <CulturalSignificance />
          </>
        )}
        {activeTab === "timeline" && <TimelineView />}
        {activeTab === "mindmap" && <MindMapView />}
        {activeTab === "support" && <SupportView />}
      </div>
      <Footer />
    </div>
  );
}
