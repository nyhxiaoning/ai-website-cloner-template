"use client";

import { useState, useMemo, useCallback } from "react";
import type { Philosopher } from "@/types/philosophy";
import { eras, starLabels } from "@/data/philosophers";
import PhilosopherCard from "./PhilosopherCard";
import PhilosopherSidePanel from "./PhilosopherSidePanel";
import PhilosopherScrollView from "./PhilosopherScrollView";
import { MeanderPattern, ColumnDecoration, AcademicSeal } from "./icons";

interface TimelineGridProps {
  philosophers: Philosopher[];
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M18 7a4 4 0 0 0-4-4" />
      <circle cx="9" cy="9" r="4" />
    </svg>
  );
}

const eraLabelMap: Record<string, string> = {
  ancient: "古希腊罗马",
  medieval: "中世纪与经",
  renaissance: "文艺复兴与",
  enlightenment: "法兰西启蒙",
  german: "德意志古典",
  transition: "过渡时期与",
  modern: "现代派、英",
};

export default function TimelineGrid({ philosophers }: TimelineGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>("p15"); // Default to Socrates
  const [visibleRatings, setVisibleRatings] = useState<number[]>([5, 4, 3, 2, 1]);
  const [scrollViewId, setScrollViewId] = useState<string | null>(null);
  const [lastClickTime, setLastClickTime] = useState(0);

  const selected = philosophers.find((p) => p.id === selectedId) ?? null;
  const scrollViewPhilosopher = philosophers.find((p) => p.id === scrollViewId) ?? null;

  const toggleRating = (rating: number) => {
    setVisibleRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const setAllVisible = () => setVisibleRatings([5, 4, 3, 2, 1]);
  const setTopOnly = () => setVisibleRatings([5, 4]);

  const philosophersByEra = useMemo(() => {
    const grouped: Record<string, Philosopher[]> = {};
    for (const era of eras) {
      grouped[era.id] = philosophers.filter((p) => p.era === era.id);
    }
    return grouped;
  }, [philosophers]);

  // Era section heights based on philosopher positions
  const eraSectionData = useMemo(() => {
    const data: Array<{ eraId: string; height: number }> = [];
    for (const era of eras) {
      const eraPhilosophers = philosophersByEra[era.id] || [];
      let maxTop = 0;
      for (const p of eraPhilosophers) {
        const topVal = parseFloat(p.position.top);
        if (topVal > maxTop) maxTop = topVal;
      }
      const height = Math.max(200, Math.round((maxTop + 8) * 7));
      data.push({ eraId: era.id, height });
    }
    return data;
  }, [philosophersByEra]);

  const handleCardClick = useCallback((id: string) => {
    const now = Date.now();
    if (id === selectedId && now - lastClickTime < 500) {
      // Double-click: open scroll view
      setScrollViewId(id);
    } else {
      setSelectedId(id);
    }
    setLastClickTime(now);
  }, [selectedId, lastClickTime]);

  const handleSelectPhilosopher = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleOpenDetail = useCallback((id: string) => {
    setScrollViewId(id);
  }, []);

  const handleCloseScrollView = useCallback(() => {
    setScrollViewId(null);
  }, []);

  // Cumulative top offsets for each era
  const eraCumulativeTops = useMemo(() => {
    let cum = 0;
    return eras.map((era) => {
      const section = eraSectionData.find((d) => d.eraId === era.id);
      const top = cum;
      cum += section?.height || 300;
      return { eraId: era.id, top, height: section?.height || 300 };
    });
  }, [eraSectionData]);

  const totalHeight = eraCumulativeTops.reduce((sum, e) => sum + e.height, 0);

  return (
    <>
      <div className="relative w-full bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] font-serif">
        {/* Meander Pattern */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <MeanderPattern className="text-[#D4AF37] opacity-[0.04] w-full h-full" />
        </div>

        {/* Column Decorations */}
        <div className="hidden xl:block absolute left-10 top-6 bottom-6 opacity-[0.12] select-none z-20">
          <ColumnDecoration className="text-[#D4AF37] h-[140px]" />
        </div>
        <div className="hidden xl:block absolute right-10 top-6 bottom-6 opacity-[0.12] select-none z-20">
          <ColumnDecoration className="text-[#D4AF37] h-[140px]" />
        </div>

        {/* Header */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 pt-10 pb-2 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <AcademicSeal className="w-5 h-5 text-gold/50" />
            <h2 className="text-sm font-bold text-aegean tracking-tight">
              传承图谱流层 · 史学罗盘
            </h2>
            <AcademicSeal className="w-5 h-5 text-gold/50" />
          </div>
          <p className="text-[10px] text-aegean/60 tracking-wide font-serif">
            滑动页面即时光穿梭 · 双击卡片开启详细生平
          </p>
        </div>

        {/* Filter Bar */}
        <div className="relative z-30 max-w-6xl mx-auto px-4 pt-6 pb-4">
          <div className="bg-alabaster rounded-xl border border-[#D4AF37]/35 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3 font-sans">
              <UsersIcon className="w-4 h-4 text-aegean" />
              <span className="text-[11px] tracking-wide text-aegean/70">
                谱系学等阶筛选 (Academic Pedigree Selector)
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-[10px] text-gray-500 font-sans">快速预设:</span>
              <button onClick={setAllVisible} className="text-[10px] px-2.5 py-1 rounded border border-[#D4AF37]/35 bg-white hover:bg-[#EBF5F8] text-aegean font-sans transition-colors cursor-pointer" type="button">显示全部</button>
              <button onClick={setTopOnly} className="text-[10px] px-2.5 py-1 rounded border border-[#D4AF37]/35 bg-white hover:bg-[#EBF5F8] text-aegean font-sans transition-colors cursor-pointer" type="button">仅看特级/一级</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <button key={rating} onClick={() => toggleRating(rating)} className={`text-[10px] px-2 py-1 rounded-full border font-sans transition-all cursor-pointer ${visibleRatings.includes(rating) ? "border-[#D4AF37] bg-white text-aegean shadow-xs" : "border-gray-200 bg-gray-50 text-gray-400"}`} type="button">
                  {"★".repeat(rating)}{"☆".repeat(5 - rating)} <span className="opacity-60">{starLabels[rating]?.split("·")[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline + Side Panel Grid */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 pb-32">
          <div className="absolute inset-x-0 top-1/4 flex items-center justify-center opacity-[0.008] pointer-events-none select-none z-0">
            <AcademicSeal className="text-aegean w-[450px] h-[450px]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative mt-4">
            {/* Left Column: Timeline (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              {/* Timeline Header Row */}
              <div className="flex items-center justify-between border-b border-[#0B2545]/20 pb-2">
                <div className="flex items-center gap-2">
                  <AcademicSeal className="w-5 h-5 text-gold/50" />
                  <h2 className="text-sm font-bold text-aegean tracking-tight">传承图谱流层 · 史学罗盘</h2>
                </div>
                <span className="text-[10px] font-mono text-[#0D5C75] font-semibold hidden sm:inline">
                  滑动页面即时光穿梭 · 双击卡片开启详细生平
                </span>
              </div>

              {/* Timeline Container */}
              <div className="relative w-full h-[3200px] md:h-[3500px] bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] rounded-xl border border-[#D4AF37]/25 overflow-hidden">
                {/* Era sidebar */}
                <div className="absolute left-0 top-0 bottom-0 w-[80px] md:w-[100px] border-r border-[#D4AF37]/25 bg-gradient-to-r from-[#FAF8F5] to-[#F3EDE0]/50 select-none z-20 font-serif">
                  <div className="absolute inset-y-0 right-0 w-[1.5px] bg-gradient-to-b from-[#D4AF37]/50 via-[#D4AF37]/15 to-[#D4AF37]/50" />
                  {eraCumulativeTops.map((era) => (
                    <div
                      key={era.eraId}
                      className="absolute left-1 md:left-2 pl-1 border-l-2 border-[#D4AF37] max-w-[70px] md:max-w-[85px]"
                      style={{ top: Math.min(era.top + 16, totalHeight - 30) }}
                    >
                      <span className="text-sm font-serif text-aegean leading-tight">
                        {eraLabelMap[era.eraId] || ""}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Content area */}
                <div className="absolute left-[80px] md:left-[100px] top-0 right-0 bottom-0">
                  <div className="absolute inset-y-0 right-0 w-[1.5px] bg-gradient-to-b from-[#D4AF37]/50 via-[#D4AF37]/20 to-[#D4AF37]/50" />

                  {eraCumulativeTops.map((era, eraIndex) => {
                    const eraPhilosophers = philosophersByEra[era.eraId] || [];
                    const eraData = eras.find((e) => e.id === era.eraId);

                    return (
                      <div
                        key={era.eraId}
                        className="absolute left-0 right-0 overflow-visible"
                        style={{ top: era.top, height: era.height }}
                      >
                        {eraIndex % 2 === 0 && (
                          <div className="absolute inset-0 bg-[#F8F6F1]/30 pointer-events-none" />
                        )}

                        {eraIndex > 0 && (
                          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />
                        )}

                        {/* Sub-period labels */}
                        {eraData?.subPeriods.map((period, periodIndex) => {
                          const periodTop = ((periodIndex + 0.5) / eraData.subPeriods.length) * 100;
                          return (
                            <div key={period} className="absolute pointer-events-none select-none" style={{ left: 0, right: 0, top: `${periodTop}%` }}>
                              <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent" />
                              <span className="absolute right-2 md:right-3 top-0 -translate-y-1/2 text-[9px] font-mono text-[#D4AF37]/40 whitespace-nowrap">
                                {period}
                              </span>
                            </div>
                          );
                        })}

                        {/* Philosopher cards */}
                        {eraPhilosophers.map((p) => {
                          const isVisible = visibleRatings.includes(p.rating);
                          return (
                            <PhilosopherCard
                              key={p.id}
                              philosopher={p}
                              isVisible={isVisible}
                              isSelected={selectedId === p.id}
                              onClick={() => handleCardClick(p.id)}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Side Panel (4 cols) */}
            <PhilosopherSidePanel
              philosopher={selected}
              allPhilosophers={philosophers}
              onSelectPhilosopher={handleSelectPhilosopher}
              onOpenDetail={handleOpenDetail}
            />
          </div>
        </div>
      </div>

      {/* Scroll View (full page detail) */}
      {scrollViewPhilosopher && (
        <PhilosopherScrollView
          philosopher={scrollViewPhilosopher}
          onBack={handleCloseScrollView}
        />
      )}
    </>
  );
}
