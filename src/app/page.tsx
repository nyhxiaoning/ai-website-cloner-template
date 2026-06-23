"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { StarMap } from "@/components/StarMap";
import { HudTop } from "@/components/HudTop";
import { HudBottom } from "@/components/HudBottom";
import { PoemPanel } from "@/components/PoemPanel";
import { SearchPanel } from "@/components/SearchPanel";
import { LoadingScreen } from "@/components/LoadingScreen";
import type { Poem, PoetryType, SearchTab, Dynasty } from "@/types";

// --- Mock data generation ---

const DEFAULT_DYNASTIES: Dynasty[] = [
  { id: "xianqin", name: "先秦", color: "rgb(47, 214, 207)", visible: true },
  { id: "qinhan", name: "秦汉", color: "rgb(54, 208, 154)", visible: false },
  { id: "weijin", name: "魏晋", color: "rgb(73, 192, 110)", visible: true },
  { id: "nanbei", name: "南北朝", color: "rgb(124, 186, 82)", visible: true },
  { id: "sui", name: "隋", color: "rgb(168, 184, 74)", visible: true },
  { id: "tang", name: "唐", color: "rgb(255, 210, 122)", visible: true },
  { id: "song", name: "宋", color: "rgb(110, 231, 168)", visible: true },
  { id: "liao", name: "辽", color: "rgb(143, 208, 192)", visible: true },
  { id: "jin", name: "金", color: "rgb(176, 201, 138)", visible: true },
  { id: "yuan", name: "元", color: "rgb(183, 148, 246)", visible: true },
  { id: "ming", name: "明", color: "rgb(246, 117, 154)", visible: true },
  { id: "qing", name: "清", color: "rgb(255, 140, 90)", visible: true },
  {
    id: "jinxiandai",
    name: "近现代",
    color: "rgb(255, 111, 145)",
    visible: true,
  },
  { id: "dangdai", name: "当代", color: "rgb(217, 111, 176)", visible: true },
];

const WUYAN_CHARS = [
  "谪",
  "玕",
  "骄",
  "宙",
  "焰",
  "惆",
  "尽",
  "撑",
  "槎",
  "欹",
  "党",
  "蓉",
  "楫",
  "引",
  "涯",
  "瓯",
  "友",
  "铜",
  "蚁",
  "馨",
  "翛",
  "韶",
  "真",
  "萍",
  "沼",
  "迎",
  "眼",
  "玲",
  "湛",
  "苑",
  "勿",
  "藩",
  "瓦",
  "择",
  "沼",
  "迢",
  "浅",
  "琅",
  "摩",
  "目",
];

function generateMockPoem(): Poem {
  const lines: string[] = [];
  for (let i = 0; i < 8; i++) {
    const line = Array.from({ length: 5 }, () =>
      WUYAN_CHARS[Math.floor(Math.random() * WUYAN_CHARS.length)]
    ).join("");
    lines.push(line);
  }

  return {
    id: `poem-${Date.now()}`,
    lines,
    form: { id: "wuyan-lvshi", label: "五言律诗" },
    fullIndex:
      "2033974040876044701247986084483953285172564211433398884852774679623300919294027824618238670408495433682468922579100044607118944536577882169120940283986437549246374914463928353471175049912849733",
    meterIndex: "",
    isMetered: false,
    isVoid: true,
  };
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [poetryType, setPoetryType] = useState<PoetryType>("五律");
  const [commonChars, setCommonChars] = useState(true);
  const [metered, setMetered] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [activeTab, setActiveTab] = useState<SearchTab>("朝代");
  const [searchCollapsed, setSearchCollapsed] = useState(false);
  const [dynasties, setDynasties] = useState(DEFAULT_DYNASTIES);
  const [currentPoem, setCurrentPoem] = useState<Poem | null>(null);
  const [uiHidden, setUiHidden] = useState(false);
  const [quality, setQuality] = useState<"high" | "low">("high");
  const velocityRef = useRef(140);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleVoidClick = useCallback(() => {
    const poem = generateMockPoem();
    setCurrentPoem(poem);
  }, []);

  const handleStarClick = useCallback((_poetId: string) => {
    // For now, generate a poem on star click too
    const poem = generateMockPoem();
    setCurrentPoem(poem);
  }, []);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
    velocityRef.current = Math.round(newSpeed * 140);
  }, []);

  const handleDynastyToggle = useCallback((id: string) => {
    setDynasties((prev) =>
      prev.map((d) => (d.id === id ? { ...d, visible: !d.visible } : d))
    );
  }, []);

  const handlePresetClick = useCallback(
    (preset: "all" | "major" | "tang-song") => {
      setDynasties((prev) => {
        const major = new Set(["tang", "song", "yuan", "ming", "qing", "xianqin", "weijin"]);
        const tangSong = new Set(["tang", "song"]);
        const visible =
          preset === "all"
            ? new Set(prev.map((d) => d.id))
            : preset === "major"
              ? major
              : tangSong;
        return prev.map((d) => ({
          ...d,
          visible: visible.has(d.id),
        }));
      });
    },
    []
  );

  const toggleSearchCollapse = useCallback(() => {
    setSearchCollapsed((prev) => !prev);
  }, []);

  const handleHide = useCallback(() => {
    setUiHidden((prev) => !prev);
  }, []);

  const handleShare = useCallback(() => {
    if (currentPoem) {
      navigator.clipboard.writeText(
        `${window.location.origin}?p=${currentPoem.fullIndex}`
      );
    }
  }, [currentPoem]);

  const handleQualityToggle = useCallback(() => {
    setQuality((p) => (p === "high" ? "low" : "high"));
  }, []);

  return (
    <div className="app">
      <LoadingScreen isLoading={loading} />

      {!loading && (
        <StarMap
          onVoidClick={handleVoidClick}
          onStarClick={handleStarClick}
          onSpeedChange={handleSpeedChange}
          speed={speed}
          quality={quality}
        />
      )}

      {!uiHidden && (
        <>
          <HudTop
            poetryType={poetryType}
            onPoetryTypeChange={(t) => setPoetryType(t as PoetryType)}
            commonChars={commonChars}
            onCommonCharsToggle={() => setCommonChars((p) => !p)}
            metered={metered}
            onMeteredToggle={() => setMetered((p) => !p)}
            onMoreClick={() => {}}
            onHideClick={handleHide}
            quality={quality}
            onQualityToggle={handleQualityToggle}
          />

          <HudBottom speed={speed} velocity={velocityRef.current} />

          {currentPoem && (
            <PoemPanel
              poem={currentPoem}
              onClose={() => setCurrentPoem(null)}
              onShare={handleShare}
              onCinema={() => {}}
              onSave={() => {}}
            />
          )}

          <SearchPanel
            activeTab={activeTab}
            onTabChange={(t) => setActiveTab(t as SearchTab)}
            collapsed={searchCollapsed}
            onCollapse={toggleSearchCollapse}
            dynasties={dynasties}
            onDynastyToggle={handleDynastyToggle}
            onPresetClick={handlePresetClick}
          />
        </>
      )}
    </div>
  );
}
