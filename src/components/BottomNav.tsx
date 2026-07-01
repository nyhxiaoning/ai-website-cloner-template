"use client";

import { ScrollIcon, SwordsIcon } from "./icons";

interface BottomNavProps {
  onNavigate?: (section: string) => void;
}

export default function BottomNav({ onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-sm border border-[#D4AF37]/35 shadow-[0_8px_32px_rgba(11,37,69,0.12)] px-5 py-3 rounded-full flex items-center justify-between gap-8 max-w-[92vw] select-none text-slate-700 font-sans transition-all">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <span className="text-gold font-bold text-sm tracking-widest">ΦΙΛΟΣΟΦΙΑ</span>
      </div>

      {/* Center: Nav buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onNavigate?.("scroll")}
          className="flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-serif font-extrabold tracking-widest uppercase transition-all rounded-full hover:bg-slate-100"
        >
          <ScrollIcon className="w-4 h-4 text-gold" />
          <span>思想沿革史卷</span>
        </button>
        <span className="text-[#D4AF37]/30">|</span>
        <button
          onClick={() => onNavigate?.("debate")}
          className="flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-serif font-extrabold tracking-widest uppercase transition-all rounded-full hover:bg-slate-100"
        >
          <SwordsIcon className="w-4 h-4 text-terracotta" />
          <span>众神多边辩论</span>
          <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[8px] px-1.5 py-0.5 rounded-full font-sans font-extrabold animate-pulse">
            NEW
          </span>
        </button>
      </div>

      {/* Right: Hint */}
      <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500">
        <span>💡 双击人物卡片进入手稿生平行卷</span>
      </div>
    </nav>
  );
}
