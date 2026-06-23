'use client';

import type { TabView } from "@/types";

interface TabNavigationProps {
  activeTab: TabView;
  onTabChange: (tab: TabView) => void;
}

const tabs: { id: TabView; icon: string; label: string }[] = [
  { id: "map", icon: "fa-map", label: "地图视图" },
  { id: "timeline", icon: "fa-scroll", label: "时间轴视图" },
  { id: "mindmap", icon: "fa-brain", label: "思维导图" },
  { id: "support", icon: "fa-heart", label: "赞赏支持" },
];

export default function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <div className="flex justify-center gap-4 p-4 bg-amber-50 border-b border-amber-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            activeTab === tab.id
              ? "bg-orange-400 text-white shadow-lg border-2 border-orange-500"
              : "bg-white text-orange-700 hover:bg-orange-100 border-2 border-orange-300"
          }`}
        >
          <i className={`fas ${tab.icon} mr-2`}></i>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
