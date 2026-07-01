"use client";

import { useState } from "react";
import type { Philosopher } from "@/types/philosophy";
import { debatePresets } from "@/data/philosophers";
import { SwordsIcon, UsersIcon } from "./icons";

interface DebateArenaProps {
  philosophers: Philosopher[];
}

interface DialogueLine {
  speaker: string;
  text: string;
  isPhilosopherA: boolean;
}

interface DebateContent {
  question: string;
  dialogues: DialogueLine[];
}

const debateContents: Record<string, DebateContent> = {
  essence: {
    question: "世界的终极绝对本质，究竟是理念实体还是客观事物本身？",
    dialogues: [
      { speaker: "柏拉图", text: "贤徒，你看看这世间的大理石柱。每一根石柱都会风化、残损，因为它们只是物质界的影子。唯有\u201c石柱的理念\u201d（Idea）在纯粹的智慧界永恒不灭，物质世界只是不完美摹本。", isPhilosopherA: true },
      { speaker: "亚里士多德", text: "吾师，我敬爱您，但更爱真理。如果理念脱离了具体的石柱而单独存在，那理念就毫无用处，也无法解释万物的运动。质料与形式结合，才构成了具体的\u201c第一实体（ousia）\u201d！", isPhilosopherA: false },
      { speaker: "柏拉图", text: "但如果灵魂不在出生前就见过那完美的绝对真善美，我们如何能在不完美的经验世界中，回忆起并辨认出哪怕一丁点的正义和圆满？", isPhilosopherA: true },
      { speaker: "亚里士多德", text: "灵魂不是回忆，而是人心灵通过对多根大理石柱的经验观察，进而抽象概括出其共性形式。认识世界必须自具体的\u201c质料\u201d向\u201c形式目的\u201d演进。", isPhilosopherA: false },
    ],
  },
  knowledge: {
    question: "人类知识获取的绝对基石，是灵性中的天赋观念还是感官白板的描记？",
    dialogues: [
      { speaker: "笛卡尔", text: "我即便将万物甚至神鬼、自己的身体尽数怀疑，依然能确证\u201c我在思考本身\u201d。数学与逻辑真理是上帝在造人时，就已经深深铭刻在我们灵魂深处的\u201c天赋观念\u201d。", isPhilosopherA: true },
      { speaker: "洛克", text: "笛卡尔先生，你若看看刚诞生的婴儿，或者未开化的野蛮人，他们的灵魂中何尝闪现过哪怕一条数学公理？没有！人心灵最初只是一张空无一物的\u201c白板（Tabula Rasa）\u201d。", isPhilosopherA: false },
      { speaker: "笛卡尔", text: "诚然，白板可以描记感觉，但感官经验是如此容易欺骗和不确定。试问若无天赋的\u201c无限与完美\u201d理念，我们如何能凭有限、残缺的感官去触碰无限完美的上帝之证明？", isPhilosopherA: true },
      { speaker: "洛克", text: "我们从外部世界的各种有限事物感觉中，通过\u201c内省（reflection）\u201d不断反思、提炼、聚合。我们的认识是由\u201c简单观念\u201d层层复合为高塔的，无需任何神授的天赋观念。", isPhilosopherA: false },
    ],
  },
  salvation: {
    question: "既然生命本质充斥痛苦与挣扎，我们应当以消极寂灭求得解脱，还是以酒神秘义超越悲剧？",
    dialogues: [
      { speaker: "叔本华", text: "生命本身即是由盲目、永不知足的生命意志（Will）所编织的罗网。欲望得不到满足便痛苦，满足了则无聊。人生如同在痛苦与无聊间钟摆。最好的救赎是彻底平息意志，走向佛教般的寂灭。", isPhilosopherA: true },
      { speaker: "尼采", text: "噢！我伟大的先驱！您指出了意志的在场，却因懦弱而逃避它。意志并非盲目的痛苦，而是渴望超越自身、追求更强、更高贵的\u201c权力意志（Will to Power）\u201d！痛苦是生命高唱的伴奏！", isPhilosopherA: false },
      { speaker: "叔本华", text: "尼采，狂热高唱只会让权力意志更深长地灼烧你。唯有在纯粹的艺术审视审美，或是圣徒般的无欲无求中，人类才能暂时休兵，在残酷的世界里求得一片宁静的避难所。", isPhilosopherA: true },
      { speaker: "尼采", text: "宁静是\u201c末人\u201d的平庸奢望。我们应该效法酒神巴克斯，在极度醉享与生命的惨烈破碎中，向深渊大笑，宣告\u201c上帝已死\u201d，重估一切价值，依靠我们自身的意志自我塑造为光耀的超人！", isPhilosopherA: false },
    ],
  },
  history: {
    question: "人类文明与历史长河的发展动力，究竟是普遍理性的\u201c绝对精神\u201d演进，还是现实阶级的\u201c物质生产\u201d实践？",
    dialogues: [
      { speaker: "黑格尔", text: "历史是一出宏伟的宿命戏剧。那是\u201c绝对精神\u201d（Absolute Spirit）在漫长的时间中不断外化自身，并在各民族、国家的代兴冲突中，逐步达成自我认识、回归理性终极王国的过程。", isPhilosopherA: true },
      { speaker: "马克思", text: "黑格尔老师，您的辩证法令人敬佩，但它是被倒着放倒在空中的。其实，历史绝不是神秘主义的绝对精神散步，历史的真正引擎是活生生的人为了吃穿住行而进行的\u201c物质生产实践\u201d！", isPhilosopherA: false },
      { speaker: "黑格尔", text: "但是，唯有理性才是真正的宰制力量。那些英雄或者普通劳动者，其实不过是在为\u201c理性的狡计\u201d（Cunning of Reason）服务，不知不觉中推进着世界秩序和法权自由的理性大厦。", isPhilosopherA: true },
      { speaker: "马克思", text: "所谓的理性大厦和法律，不过是掌握了\u201c生产资料\u201d的统治阶级，用来维护自身利益的\u201c上层建筑\u201d。是生产力与生产关系的辩证运动、是阶级对抗，才是历史不断车轮向前的根本动力！", isPhilosopherA: false },
    ],
  },
};

export default function DebateArena({ philosophers }: DebateArenaProps) {
  const [selectedPreset, setSelectedPreset] = useState(debatePresets[0].id);
  const [customA, setCustomA] = useState("");
  const [customB, setCustomB] = useState("");

  const findByName = (name: string) => philosophers.find((p) => p.chineseName === name) ?? null;

  const getActivePhilosophers = () => {
    const preset = debatePresets.find((p) => p.id === selectedPreset);
    if (preset) {
      return { a: findByName(preset.philosopherA), b: findByName(preset.philosopherB) };
    }
    return {
      a: customA ? findByName(customA) : null,
      b: customB ? findByName(customB) : null,
    };
  };

  const { a: philosopherA, b: philosopherB } = getActivePhilosophers();
  const activeContent = selectedPreset ? debateContents[selectedPreset] : null;
  const sortedPhilosophers = [...philosophers].sort((a, b) =>
    a.chineseName.localeCompare(b.chineseName)
  );

  const handleStartDebate = () => {
    if (customA && customB) {
      setSelectedPreset("");
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl border-2 border-gold shadow-xl overflow-hidden p-5 sm:p-6 relative font-serif">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/75 mt-2 ml-2" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/75 mt-2 mr-2" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/75 mb-2 ml-2" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/75 mb-2 mr-2" />

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <SwordsIcon className="w-5 h-5 text-gold" />
            <h2 className="text-lg sm:text-xl font-bold text-aegean tracking-tight">
              对话广场 · 雅典论辩
            </h2>
            <SwordsIcon className="w-5 h-5 text-gold" />
          </div>
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold/70 font-mono mb-3">
            THE PALESTRA symposium
          </p>
          <h3 className="text-sm sm:text-base font-bold text-aegean/80 mb-2">
            雅典学园之辩 · 思想交锋
          </h3>
          <p className="text-xs sm:text-sm text-aegean/60 leading-relaxed max-w-2xl mx-auto">
            将两位先哲并置于思想沙龙之中。通过极具张力的虚拟对话与辩证对比，
            洞若观火地解析心物、理路与救赎之争的异同。
          </p>
        </div>

        {/* Preset Pills */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-aegean/70 mb-3 flex items-center gap-2">
            <span>👑</span> 精选思想公案 (Presets)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {debatePresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPreset(preset.id)}
                className={`text-[10px] sm:text-[11px] px-3 py-2 rounded-lg border font-serif transition-all text-left cursor-pointer ${
                  selectedPreset === preset.id
                    ? "border-gold bg-gold/10 text-aegean shadow-xs"
                    : "border-[#D4AF37]/25 bg-white text-aegean/70 hover:bg-[#EBF5F8] hover:border-gold/40"
                }`}
                type="button"
              >
                <span className="font-bold block">{preset.title}</span>
                <span className="text-gold/70 text-[9px]">
                  {preset.philosopherA} vs {preset.philosopherB}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Debate Display */}
        {(philosopherA || philosopherB) && (
          <div className="mb-6 bg-[#FDFDFB] rounded-xl border border-gold/35 p-4">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
              {/* Philosopher A */}
              <div className="text-center p-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-gold/60">
                  {philosopherA?.school}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-aegean mt-1">
                  {philosopherA?.chineseName}
                </h3>
                <p className="text-[10px] text-gray-500 italic">
                  {philosopherA?.englishName}
                </p>
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`text-[10px] ${i < (philosopherA?.rating ?? 0) ? "text-gold" : "text-gray-300"}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* VS Divider */}
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center">
                  <span className="text-xs font-bold text-gold">VS</span>
                </div>
              </div>

              {/* Philosopher B */}
              <div className="text-center p-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-gold/60">
                  {philosopherB?.school}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-aegean mt-1">
                  {philosopherB?.chineseName}
                </h3>
                <p className="text-[10px] text-gray-500 italic">
                  {philosopherB?.englishName}
                </p>
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`text-[10px] ${i < (philosopherB?.rating ?? 0) ? "text-gold" : "text-gray-300"}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Debate Dialogue Section */}
        {activeContent && philosopherA && philosopherB && (
          <div className="mb-6 bg-[#FDFDFB] rounded-xl border border-[#D4AF37]/25 p-4">
            {/* Debate topic */}
            <div className="mb-4">
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 font-mono">
                公案辩题
              </span>
              <h4 className="text-sm sm:text-base font-bold text-[#0D5C75] mt-0.5 leading-relaxed">
                &ldquo;{activeContent.question}&rdquo;
              </h4>
            </div>

            {/* Dialogue bubbles */}
            <div className="flex flex-col gap-4 overflow-y-auto pr-1 max-h-[300px]">
              {activeContent.dialogues.map((line, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${line.isPhilosopherA ? "items-start" : "items-end"}`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase font-mono px-1.5 py-0.5 rounded ${
                        line.isPhilosopherA
                          ? "bg-[#0D5C75] text-white"
                          : "bg-[#D4AF37] text-white"
                      }`}
                    >
                      {line.speaker}
                    </span>
                  </div>
                  <div
                    className={`max-w-[85%] text-xs rounded-lg p-3 shadow-xs border leading-relaxed ${
                      line.isPhilosopherA
                        ? "bg-[#EBF5F8] text-[#0A4A5E] border-[#0D5C75]/25 rounded-tl-none"
                        : "bg-[#FFF9E6] text-[#8B6914] border-[#D4AF37]/25 rounded-tr-none"
                    }`}
                  >
                    {line.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Host & actions */}
            <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between text-[10px]">
              <span className="text-aegean/50 font-serif italic">
                主持：古希腊阿卡德米学院秘书处
              </span>
              <div className="flex items-center gap-2 text-aegean/60">
                <button
                  className="hover:text-gold transition-colors cursor-pointer font-serif"
                  type="button"
                >
                  查阅 {philosopherA.chineseName}
                </button>
                <span className="text-gold/30">|</span>
                <button
                  className="hover:text-gold transition-colors cursor-pointer font-serif"
                  type="button"
                >
                  查阅 {philosopherB.chineseName}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom Selection */}
        <div className="border-t border-gold/20 pt-4">
          <h4 className="text-xs font-bold text-aegean/70 mb-3 flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-aegean" /> 自定义群星对照
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-aegean/60 mb-1.5 font-sans">
                选择哲学家一：
              </label>
              <select
                value={customA}
                onChange={(e) => setCustomA(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#D4AF37]/35 rounded-lg bg-white font-serif text-aegean focus:outline-none focus:border-gold transition-colors"
              >
                <option value="">-- 请选择贤哲 --</option>
                {sortedPhilosophers.map((p) => (
                  <option key={p.id} value={p.chineseName}>
                    {p.chineseName} ({p.englishName}) — {p.school}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-aegean/60 mb-1.5 font-sans">
                选择哲学家二：
              </label>
              <select
                value={customB}
                onChange={(e) => setCustomB(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#D4AF37]/35 rounded-lg bg-white font-serif text-aegean focus:outline-none focus:border-gold transition-colors"
              >
                <option value="">-- 请选择贤哲 --</option>
                {sortedPhilosophers.map((p) => (
                  <option key={p.id} value={p.chineseName}>
                    {p.chineseName} ({p.englishName}) — {p.school}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleStartDebate}
              disabled={!customA || !customB}
              className="px-6 py-2 text-xs font-bold tracking-wider uppercase rounded-full bg-gold text-white hover:bg-gold/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-sans cursor-pointer"
              type="button"
            >
              开始论辩
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
