import { cn } from "@/lib/utils";
import { useState } from "react";
import type { Philosopher } from "@/types/philosophy";

interface PhilosopherCardProps {
  philosopher: Philosopher;
  isVisible: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const BORDER_PALETTE = [
  "#D4AF37",
  "#C2593F",
  "#0D5C75",
  "#8B5CF6",
  "#059669",
  "#D97706",
  "#DC2626",
  "#2563EB",
  "#DB2777",
  "#7C3AED",
  "#0891B2",
  "#84CC16",
];

function getSchoolColor(school: string): string {
  let hash = 0;
  for (let i = 0; i < school.length; i++) {
    hash = school.charCodeAt(i) + ((hash << 5) - hash);
  }
  return BORDER_PALETTE[Math.abs(hash) % BORDER_PALETTE.length];
}

export default function PhilosopherCard({
  philosopher,
  isVisible,
  isSelected,
  onClick,
}: PhilosopherCardProps) {
  const borderColor = philosopher.color ?? getSchoolColor(philosopher.school);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "absolute rounded-xl bg-white/95 shadow-xs border cursor-pointer transition-all duration-200",
        "w-[114px] h-[42px] max-sm:w-[100px] max-sm:h-[38px]",
        !isVisible && "opacity-30 pointer-events-none",
        isSelected ? "border-gold shadow-lg" : "border-[#D4AF37]/45",
      )}
      style={{
        left: philosopher.position.left,
        top: philosopher.position.top,
        borderLeft: isSelected
          ? "3px solid #D4AF37"
          : `3px solid ${borderColor}`,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`${philosopher.chineseName} (${philosopher.englishName})`}
    >
      <div className="flex flex-col justify-center h-full px-2 overflow-hidden">
        <span className="font-mono text-[7.5px] uppercase tracking-wider opacity-85 leading-tight truncate">
          {philosopher.school}
        </span>
        <span className="text-xs font-bold tracking-tight leading-tight truncate">
          {philosopher.chineseName}
        </span>
        <span className="text-[9px] text-gray-500 leading-tight truncate">
          {philosopher.englishName}
        </span>
      </div>

      {/* Hover tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-48 bg-white/95 backdrop-blur rounded-lg border border-[#D4AF37]/35 shadow-lg p-3 pointer-events-none">
          <div className="text-[10px] font-mono uppercase tracking-wider text-gold/70 mb-0.5">
            {philosopher.school}
          </div>
          <div className="text-sm font-bold text-aegean">
            {philosopher.chineseName}
          </div>
          <div className="text-[10px] text-gray-500 mb-1">
            {philosopher.englishName}
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`text-[10px] ${i < philosopher.rating ? "text-gold" : "text-gray-300"}`}>★</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
