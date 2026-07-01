"use client";

import { cn } from "@/lib/utils";
import type { Philosopher } from "@/types/philosophy";
import { eras } from "@/data/philosophers";

interface PhilosopherSidePanelProps {
  philosopher: Philosopher | null;
  allPhilosophers: Philosopher[];
  onSelectPhilosopher: (id: string) => void;
  onOpenDetail: (id: string) => void;
}

const ratingLabels: Record<number, { stars: string; title: string }> = {
  5: { stars: "★★★★★", title: "巨擘宗师" },
  4: { stars: "★★★★☆", title: "传世先驱" },
  3: { stars: "★★★☆☆", title: "核心贤哲" },
  2: { stars: "★★☆☆☆", title: "沿袭学者" },
  1: { stars: "★☆☆☆☆", title: "界外探索者" },
};

export default function PhilosopherSidePanel({
  philosopher,
  allPhilosophers,
  onSelectPhilosopher,
  onOpenDetail,
}: PhilosopherSidePanelProps) {
  const philosopherById = new Map(allPhilosophers.map((p) => [p.id, p]));

  return (
    <aside className="lg:col-span-4 sticky top-6 flex flex-col gap-6 z-20 lg:max-h-[calc(100vh-60px)] lg:overflow-y-auto pr-1">
      {/* Philosopher Detail Card */}
      <div className="hidden lg:flex bg-gradient-to-b from-[#FDFDFB] to-[#F5F2EA] rounded-xl border-x-4 border-y border-double border-[#D4AF37] shadow-xl p-5 overflow-hidden relative min-h-[410px] flex-col justify-between">
        {/* Gold edge gradients */}
        <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#D4AF37] to-transparent opacity-50 mr-[1px]" />
        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#D4AF37] to-transparent opacity-50 ml-[1px]" />

        {philosopher ? (
          <div className="flex flex-col h-full justify-between gap-4 z-10 relative">
            {/* Header: School badge + Century */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold font-sans uppercase tracking-widest text-[#D4AF37] bg-[#0D5C75] px-1.5 py-0.5 rounded shadow-xs">
                  {philosopher.school}
                </span>
                {philosopher.century && (
                  <span className="text-[9.5px] font-mono text-gray-500 font-bold bg-white px-1.5 py-0.5 rounded border border-gray-200">
                    {philosopher.century}
                  </span>
                )}
              </div>
              <h2 className="font-serif font-extrabold text-xl text-gray-900 tracking-wide mt-2 text-center border-b border-double border-[#D4AF37]/40 pb-1.5">
                {philosopher.chineseName}
              </h2>
              <p className="text-[9.5px] text-gray-400 uppercase tracking-widest text-center mt-1 block font-serif font-light">
                {philosopher.englishName}
              </p>
            </div>

            {/* Core Tenets */}
            {philosopher.coreTenets && philosopher.coreTenets.length > 0 && (
              <div>
                <h4 className="text-[10px] font-bold font-sans uppercase text-amber-800 tracking-wider border-b border-[#D4AF37]/20 pb-0.5 mb-1.5">
                  📜 核心命题与学说
                </h4>
                <div className="flex flex-col gap-1.5 max-h-[120px] overflow-y-auto pr-1 animate-fadeIn">
                  {philosopher.coreTenets.map((tenet, i) => (
                    <div
                      key={i}
                      className="bg-white border-l-4 border-[#0D5C75] rounded p-2 shadow-xs text-[11px] font-serif text-gray-700 leading-relaxed"
                    >
                      {tenet}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            {philosopher.summary && (
              <div className="bg-[#FAF8F5] border border-[#D4AF37]/20 rounded p-2.5 text-[11px] leading-relaxed font-serif text-gray-650 italic max-h-[110px] overflow-y-auto">
                <span className="font-bold text-[#0D5C75] not-italic block mb-0.5 font-sans text-[9px] tracking-wider uppercase">
                  📖 思想史综述
                </span>
                “ {philosopher.summary} ”
              </div>
            )}

            {/* Deep Dive Button */}
            <div className="text-center pt-2">
              <button
                onClick={() => onOpenDetail(philosopher.id)}
                className="w-full py-1.5 bg-[#FAF8F5] hover:bg-white text-[#0D5C75] text-[10px] font-serif font-bold border border-[#D4AF37] rounded shadow-xs tracking-wider uppercase transition-colors duration-250 cursor-pointer"
              >
                双击人物卡 或【点击此处】深入主卷生平
              </button>
            </div>

            {/* Connections */}
            {philosopher.connections && philosopher.connections.length > 0 && (
              <div className="border-t border-[#D4AF37]/20 pt-2">
                <h4 className="text-[9.5px] font-bold font-sans uppercase text-gray-500 tracking-wide mb-1.5 font-serif">
                  ⚡ 历史脉络学术关联：
                </h4>
                <div className="flex flex-wrap gap-1 max-h-[80px] overflow-y-auto pr-1">
                  {philosopher.connections.map((connectionId) => {
                    const connected = philosopherById.get(connectionId);
                    if (!connected) return null;
                    return (
                      <button
                        key={connectionId}
                        onClick={() => onSelectPhilosopher(connectionId)}
                        className="bg-white hover:bg-[#EBF5F8] text-[9.5px] text-[#0D5C75] border border-[#0D5C75]/20 hover:border-[#D4AF37] rounded px-1.5 py-0.5 tracking-wide font-serif transition-colors duration-200 cursor-pointer"
                      >
                        {connected.chineseName}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Rating display */}
            <div className="flex items-center justify-center gap-0.5 pt-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-[11px]",
                    i < philosopher.rating ? "text-gold" : "text-gray-300"
                  )}
                >
                  ★
                </span>
              ))}
              <span className="text-[7.5px] text-gray-400 ml-1 font-sans font-bold uppercase tracking-wider">
                {ratingLabels[philosopher.rating]?.title}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full z-10 relative">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border-2 border-[#D4AF37]/30 flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#D4AF37]/50">
                <circle cx="12" cy="8" r="4" />
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              </svg>
            </div>
            <h4 className="text-sm font-serif text-gray-500 text-center">
              请在传承图上挑选贤哲
            </h4>
            <p className="text-[10px] text-gray-400 text-center mt-1">
              点击节点可快速锁定，双击则能开启功勋卓越的个人行卷。
            </p>
          </div>
        )}
      </div>

      {/* Temporal Axis */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#D4AF37]/35 p-3.5 shadow-md font-serif text-xs">
        <span className="text-[9.5px] tracking-wider text-amber-800 font-mono font-bold border-b border-[#D4AF37]/20 pb-1 mb-2 block uppercase">
          ⏱️ 历史时空定位 (Temporal Axis)
        </span>
        <div className="flex flex-col gap-2 relative animate-fadeIn">
          {/* Vertical timeline line */}
          <div className="absolute left-[5px] top-1 bottom-1 w-[1px] bg-[#D4AF37]/25" />

          {eras.map((era, index) => {
            const isActive = philosopher?.era === era.id;
            return (
              <button
                key={era.id}
                className="flex items-start gap-2 text-left group cursor-pointer"
                onClick={() => {
                  const firstInEra = allPhilosophers.find((p) => p.era === era.id);
                  if (firstInEra) onSelectPhilosopher(firstInEra.id);
                }}
              >
                <div className="relative flex items-center justify-center mt-1">
                  <div
                    className={cn(
                      "w-2.5 h-2.5 rounded-full border transition-all duration-300 flex items-center justify-center",
                      isActive
                        ? "bg-[#D4AF37] border-white scale-120"
                        : "bg-white border-[#D4AF37]/35 group-hover:border-[#0D5C75]"
                    )}
                  >
                    {isActive && (
                      <div className="w-1 h-1 bg-[#051726] rounded-full" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "text-[8.5px] font-bold font-sans transition-colors duration-200",
                      isActive ? "text-[#0D5C75]" : "text-gray-400 group-hover:text-amber-800"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}·{era.dateRange}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] leading-tight transition-colors duration-200 line-clamp-1",
                      isActive ? "text-gray-900 font-bold" : "text-gray-500 group-hover:text-[#0D5C75]"
                    )}
                  >
                    {era.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
