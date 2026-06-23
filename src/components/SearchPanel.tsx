"use client";

import { cn } from "@/lib/utils";
import type { Dynasty, SearchTab } from "@/types";

export interface SearchPanelProps {
  activeTab: SearchTab;
  onTabChange: (tab: SearchTab) => void;
  collapsed: boolean;
  onCollapse: () => void;
  dynasties: Dynasty[];
  onDynastyToggle: (id: string) => void;
  onPresetClick: (preset: "all" | "major" | "tang-song") => void;
}

const TABS: SearchTab[] = ["诗人", "寻诗", "探诗", "朝代"];

const MAJOR_DYNASTIES = new Set([
  "tang",
  "song",
  "yuan",
  "ming",
  "qing",
  "xianqin",
  "weijin",
]);

const TANG_SONG = new Set(["tang", "song"]);

export function SearchPanel({
  activeTab,
  onTabChange,
  collapsed,
  onCollapse,
  dynasties,
  onDynastyToggle,
  onPresetClick,
}: SearchPanelProps) {
  const isDynastyTab = activeTab === "朝代";

  return (
    <div className={cn("search", collapsed && "collapsed")}>
      <div className="search-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={cn("stab", activeTab === tab && "on")}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
        <button className="stab collapse" title="收起" onClick={onCollapse}>
          ▴
        </button>
      </div>

      {!collapsed && (
        <>
          {isDynastyTab && (
            <div className="line-results">
              <div className="lr-section">
                <div className="legend-presets">
                  <button onClick={() => onPresetClick("all")}>全部</button>
                  <button onClick={() => onPresetClick("major")}>主要</button>
                  <button onClick={() => onPresetClick("tang-song")}>
                    唐宋
                  </button>
                </div>
                <div className="legend-list">
                  {dynasties.map((d) => (
                    <button
                      key={d.id}
                      className={cn("legend-row", !d.visible && "off")}
                      title={d.visible ? "隐藏" : "显示"}
                      onClick={() => onDynastyToggle(d.id)}
                    >
                      <span
                        className="dot"
                        style={{ background: d.color }}
                      />
                      <span className="legend-label">{d.name}</span>
                    </button>
                  ))}
                  <div className="legend-row note">
                    <span
                      className="dot"
                      style={{
                        background: "rgb(255, 172, 90)",
                        opacity: 0.4,
                      }}
                    />
                    <span className="legend-label">
                      五代十国 · 已并入唐
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "诗人" && (
            <div className="line-results">
              <div className="lr-section" style={{ padding: "16px 14px" }}>
                <div className="meta-v muted" style={{ fontSize: 13 }}>
                  输入诗人姓名进行搜索
                </div>
              </div>
            </div>
          )}

          {activeTab === "寻诗" && (
            <div className="line-results">
              <div className="lr-section" style={{ padding: "16px 14px" }}>
                <div className="meta-v muted" style={{ fontSize: 13 }}>
                  输入诗句或关键词搜索
                </div>
              </div>
            </div>
          )}

          {activeTab === "探诗" && (
            <div className="line-results">
              <div className="lr-section" style={{ padding: "16px 14px" }}>
                <div className="meta-v muted" style={{ fontSize: 13 }}>
                  探索诗云星图
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
