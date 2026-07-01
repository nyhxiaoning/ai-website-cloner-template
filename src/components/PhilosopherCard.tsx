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

const schoolBorderColorMap: Record<string, string> = {
  "teal-500": "teal-500",
  "sky-500": "sky-500",
  "amber-500": "amber-500",
  "gray-400": "gray-400",
};

function getSchoolColor(school: string): string {
  let hash = 0;
  for (let i = 0; i < school.length; i++) {
    hash = school.charCodeAt(i) + ((hash << 5) - hash);
  }
  return BORDER_PALETTE[Math.abs(hash) % BORDER_PALETTE.length];
}

function hexToTailwindBorder(hex: string): string {
  // Map common hex colors to Tailwind border color classes
  const map: Record<string, string> = {
    "#D4AF37": "amber-500",
    "#C2593F": "red-600",
    "#0D5C75": "teal-500",
    "#8B5CF6": "violet-500",
    "#059669": "emerald-600",
    "#D97706": "amber-600",
    "#DC2626": "red-600",
    "#2563EB": "blue-600",
    "#DB2777": "pink-600",
    "#7C3AED": "violet-600",
    "#0891B2": "cyan-600",
    "#84CC16": "lime-500",
  };
  return map[hex.toUpperCase()] || "teal-500";
}

const ratingConfig = {
  5: {
    containerClass:
      "gilded-shimmer-border bg-gradient-to-b from-[#FFFDF0] via-[#FCF9EC] to-[#FAF3E0] text-amber-950 border-t border-r border-b border-[#D4AF37] z-25 shadow-[0_2px_8px_rgba(212,175,55,0.25)] saturate-100",
    schoolClass: "text-amber-800 font-semibold",
    nameClass: "font-black text-amber-950 text-[12px] filter drop-shadow-[0_0.2px_0.5px_rgba(212,175,55,0.15)]",
    nameTag: "h3" as const,
    nameStyle: "normal" as const,
    englishClass: "text-gray-400",
    hoverClass: "",
  },
  4: {
    containerClass:
      "bg-[#FFFDF9] hover:bg-[#FAF5EB] text-gray-900 border-t border-r border-b border-[#D4AF37]/65 z-18 shadow-[0_1.5px_4px_rgba(212,175,55,0.08)] hover:border-[#D4AF37] saturate-100",
    schoolClass: "text-amber-800 font-semibold",
    nameClass: "font-bold text-amber-900",
    nameTag: "h3" as const,
    nameStyle: "normal" as const,
    englishClass: "text-gray-400",
    hoverClass: "hover:bg-[#FAF5EB]",
  },
  3: {
    containerClass:
      "bg-[#F2FAF9] text-[#0D5C75] border-t border-r border-b border-gray-300 hover:border-[#0D5C75] shadow-xs z-15 saturate-100",
    schoolClass: "text-gray-500",
    nameClass: "font-medium text-gray-850",
    nameTag: "h3" as const,
    nameStyle: "normal" as const,
    englishClass: "text-gray-400",
    hoverClass: "",
  },
  2: {
    containerClass:
      "bg-[#FAFAFA] text-slate-500 border-t border-r border-b border-gray-200 border-dashed hover:border-gray-400 z-10 saturate-100",
    schoolClass: "text-gray-500",
    nameClass: "font-medium italic text-gray-850",
    nameTag: "h3" as const,
    nameStyle: "italic" as const,
    englishClass: "text-gray-400",
    hoverClass: "",
  },
  1: {
    containerClass:
      "bg-[#FAFAFA] text-slate-400 border-t border-r border-b border-gray-200 border-dashed hover:border-gray-400 z-5 saturate-50",
    schoolClass: "text-gray-400",
    nameClass: "font-normal italic text-gray-500",
    nameTag: "h3" as const,
    nameStyle: "italic" as const,
    englishClass: "text-gray-400",
    hoverClass: "",
  },
};

const ratingLabels: Record<number, string> = {
  5: "★★★★★ 巨擘宗师",
  4: "★★★★☆ 传世先驱",
  3: "★★★☆☆ 核心贤哲",
  2: "★★☆☆☆ 沿袭学者",
  1: "★☆☆☆☆ 界外探索者",
};

export default function PhilosopherCard({
  philosopher,
  isVisible,
  isSelected,
  onClick,
}: PhilosopherCardProps) {
  const borderColor = philosopher.color ?? getSchoolColor(philosopher.school);
  const tailwindBorderColor = hexToTailwindBorder(borderColor);
  const config = ratingConfig[philosopher.rating] || ratingConfig[3];
  const [isHovered, setIsHovered] = useState(false);

  const NameTag = config.nameTag;

  return (
    <div
      id={`philosopher-card-${philosopher.id}`}
      className={cn(
        "absolute cursor-pointer transition-all duration-300 rounded shadow-xs py-0.5 px-1 md:px-1.5 select-none flex flex-col items-center justify-center w-[100px] md:w-[114px] h-[38px] md:h-[42px] border-l-[3.5px]",
        `border-l-${tailwindBorderColor}`,
        config.containerClass,
        !isVisible && "opacity-30 pointer-events-none",
        isSelected && "ring-2 ring-gold ring-offset-1",
      )}
      style={{
        left: philosopher.position.left,
        top: philosopher.position.top,
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0.3,
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
      title={`${philosopher.chineseName} (${philosopher.school}) • 【学术定位】${ratingLabels[philosopher.rating]}`}
      aria-label={`${philosopher.chineseName} (${philosopher.englishName})`}
    >
      <div className="flex flex-col items-center text-center w-full truncate">
        <span className={cn("text-[7.5px] tracking-wider uppercase font-mono scale-90 pb-0.2 opacity-85 truncate max-w-full", config.schoolClass)}>
          {philosopher.school}
        </span>
        <NameTag
          className={cn("tracking-tight text-xs truncate max-w-full", config.nameClass)}
          style={{ fontStyle: config.nameStyle }}
        >
          {philosopher.chineseName}
        </NameTag>
        <span className={cn("text-[8px] tracking-tight scale-90 opacity-80 font-serif font-light leading-none truncate max-w-full", config.englishClass)}>
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
