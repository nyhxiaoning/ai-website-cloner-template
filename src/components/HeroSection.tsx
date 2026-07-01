import { PhilosopiaBadge } from "./icons";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-alabaster/80 pt-16 pb-8">
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/75 mt-2 ml-2" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/75 mt-2 mr-2" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/75 mb-2 ml-2" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/75 mb-2 mr-2" />

      <div className="relative flex flex-col items-center select-none text-center max-w-3xl mx-auto px-4">
        {/* Greek decorative element */}
        <div className="mb-3">
          <PhilosopiaBadge className="w-full text-gold max-w-[280px]" />
        </div>

        {/* Greek title */}
        <p className="text-gold font-bold text-xs tracking-[0.3em] uppercase mb-4">
          ΦΙΛΟΣΟΦΙΑ
        </p>

        {/* Main title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-aegean tracking-tight leading-tight mb-3">
          西方哲学发展脉络交互图谱
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gold/80 font-medium tracking-wide mb-6">
          西方哲学思想沿革史卷
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-aegean/70 leading-relaxed max-w-2xl font-serif mb-8">
          本图谱真实精确地还原了六大黄金断代时期的哲学主干网络。
          采用古希腊经典神庙美学设计，通过向下流动模拟历史纪元的演进，
          在 Alabaster 细砂大理石廊底与 Aegean 爱琴海深蓝间优雅流转。
        </p>

        {/* Hint */}
        <p className="text-xs sm:text-sm text-aegean/50 font-serif flex items-center gap-2">
          <span>💡 双击任何人物卡片，可以直接进入该圣哲的精细生平行卷</span>
        </p>
      </div>
    </section>
  );
}
