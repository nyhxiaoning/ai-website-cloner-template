"use client";

import { useState, useMemo } from "react";
import type { Philosopher } from "@/types/philosophy";
import { eras, starLabels } from "@/data/philosophers";
import PhilosopherCard from "./PhilosopherCard";
import PhilosopherDetailPanel from "./PhilosopherDetailPanel";
import { MeanderPattern, ColumnDecoration, AcademicSeal, ConnectionLines } from "./icons";

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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [visibleRatings, setVisibleRatings] = useState<number[]>([5, 4, 3, 2, 1]);

  const selected = philosophers.find((p) => p.id === selectedId) ?? null;

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

  const connectionLines = useMemo(() => {
    const lines: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
    const posMap = new Map(philosophers.map((p) => [p.id, p.position]));
    for (const p of philosophers) {
      if (p.connections) {
        for (const connId of p.connections) {
          const conn = posMap.get(connId);
          if (conn && p.era === philosophers.find((c) => c.id === connId)?.era) {
            lines.push({
              x1: parseFloat(p.position.left) + 5,
              y1: parseFloat(p.position.top) + 2,
              x2: parseFloat(conn.left) + 5,
              y2: parseFloat(conn.top) + 2,
            });
          }
        }
      }
    }
    return lines;
  }, [philosophers]);

  // Compute era section heights based on philosophers positions
  const eraSectionData = useMemo(() => {
    const data: Array<{ eraId: string; height: number }> = [];
    for (const era of eras) {
      const eraPhilosophers = philosophersByEra[era.id] || [];
      let maxTop = 0;
      for (const p of eraPhilosophers) {
        const topVal = parseFloat(p.position.top);
        if (topVal > maxTop) maxTop = topVal;
      }
      // Use a base height plus room for the philosopher cards
      const height = Math.max(160, Math.round((maxTop + 5) * 8));
      data.push({ eraId: era.id, height });
    }
    return data;
  }, [philosophersByEra]);

  return (
    <div className="relative w-full bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] font-serif">
      {/* Meander Pattern Decorations */}
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

      {/* Timeline Header */}
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
            <button
              onClick={setAllVisible}
              className="text-[10px] px-2.5 py-1 rounded border border-[#D4AF37]/35 bg-white hover:bg-[#EBF5F8] text-aegean font-sans transition-colors cursor-pointer"
              type="button"
            >
              显示全部
            </button>
            <button
              onClick={setTopOnly}
              className="text-[10px] px-2.5 py-1 rounded border border-[#D4AF37]/35 bg-white hover:bg-[#EBF5F8] text-aegean font-sans transition-colors cursor-pointer"
              type="button"
            >
              仅看特级/一级
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => toggleRating(rating)}
                className={`text-[10px] px-2 py-1 rounded-full border font-sans transition-all cursor-pointer ${
                  visibleRatings.includes(rating)
                    ? "border-[#D4AF37] bg-white text-aegean shadow-xs"
                    : "border-gray-200 bg-gray-50 text-gray-400"
                }`}
                type="button"
              >
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)}{" "}
                <span className="opacity-60">{starLabels[rating]?.split("·")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Area */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 pb-32">
        {/* Academic Seals background */}
        <div className="absolute inset-x-0 top-1/4 flex items-center justify-center opacity-[0.008] pointer-events-none select-none z-0">
          <AcademicSeal className="text-aegean w-[450px] h-[450px]" />
        </div>

        {/* Timeline Outer Container */}
        <div className="relative">
          {/* Era sidebar - spans full height */}
          <div className="absolute left-0 top-0 bottom-0 w-[80px] md:w-[100px] border-r border-[#D4AF37]/25 bg-gradient-to-r from-alabaster to-[#F3EDE0]/50 select-none z-20 font-serif" />

          {/* Content area */}
          <div className="relative ml-[80px] md:ml-[100px]">
            {/* Right gold edge line */}
            <div className="absolute inset-y-0 right-0 w-[1.5px] bg-gradient-to-b from-[#D4AF37]/50 via-[#D4AF37]/20 to-[#D4AF37]/50" />

            {/* Era sections */}
            {eras.map((era, eraIndex) => {
              const eraPhilosophers = philosophersByEra[era.id] || [];
              const sectionHeight = eraSectionData.find((d) => d.eraId === era.id)?.height || 300;

              return (
                <div key={era.id} className="relative border-b border-[#D4AF37]/10" style={{ minHeight: sectionHeight }}>
                  {/* Era label (positioned absolutely on the left sidebar) */}
                  <div
                    className="absolute left-[-80px] md:left-[-100px] w-[80px] md:w-[100px] flex items-center justify-center pointer-events-none"
                    style={{ top: 0, height: sectionHeight }}
                  >
                    <div className="absolute left-1 md:left-2 transform -translate-y-1/2 flex flex-col pl-1 border-l-2 border-[#D4AF37] max-w-[70px] md:max-w-[85px]">
                      <span className="text-base font-serif text-aegean leading-tight">
                        {eraLabelMap[era.id] || era.name.slice(0, 5)}
                      </span>
                    </div>
                  </div>

                  {/* Gold divider at top of era section (except first) */}
                  {eraIndex > 0 && (
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />
                  )}

                  {/* Philosopher cards */}
                  {eraPhilosophers.map((p) => {
                    const isVisible = visibleRatings.includes(p.rating);
                    return (
                      <PhilosopherCard
                        key={p.id}
                        philosopher={p}
                        isVisible={isVisible}
                        isSelected={selectedId === p.id}
                        onClick={() => setSelectedId(p.id === selectedId ? null : p.id)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <PhilosopherDetailPanel
        philosopher={selected}
        onClose={() => setSelectedId(null)}
        allPhilosophers={philosophers}
        onSelectPhilosopher={(id) => setSelectedId(id)}
      />
    </div>
  );
}
