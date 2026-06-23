"use client";

import { useState } from "react";
import { COLOR_CATEGORIES, type ColorData } from "@/types/colors";

// Icons
const MusicBtn = () => (
  <svg stroke="currentColor" fill="#333" strokeWidth="0" viewBox="0 0 17 17" height="24" width="24"><path d="M15.981 8.085c-0.192-4.493-3.469-8.085-7.481-8.085s-7.289 3.592-7.481 8.085c-0.59 0.201-1.019 0.756-1.019 1.415v4c0 0.827 0.67 1.5 1.494 1.5h1.506v-1h1v-5h-1v-1h-0.978c0.225-3.902 3.040-7 6.478-7s6.253 3.098 6.478 7h-0.978v1h-1v5h1v1h1.506c0.824 0 1.494-0.673 1.494-1.5v-4c0-0.659-0.429-1.214-1.019-1.415zM2 14h-0.506c-0.272 0-0.494-0.225-0.494-0.5v-4c0-0.275 0.222-0.5 0.494-0.5h0.506v5zM16 13.5c0 0.275-0.222 0.5-0.494 0.5h-0.506v-5h0.506c0.272 0 0.494 0.225 0.494 0.5v4z"/></svg>
);

const HeartBtn = () => (
  <svg stroke="currentColor" fill="#fff" strokeWidth="0" viewBox="0 0 512 512" height="20" width="20"><path d="M256 448l-30.164-27.211C118.718 322.442 48 258.61 48 179.095 48 114.221 97.918 64 162.4 64c36.399 0 70.717 16.742 93.6 43.947C278.882 80.742 313.199 64 349.6 64 414.082 64 464 114.221 464 179.095c0 79.516-70.719 143.348-177.836 241.694L256 448z"/></svg>
);

const DownloadBtn = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20" width="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>
);

function CircleProgress({ percent }: { percent: number }) {
  return (
    <svg viewBox="0 0 36 36" width="60" height="60">
      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(80,97,109,0.15)" strokeWidth="3"/>
      <path strokeDasharray={`${percent}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(80,97,109,0.5)" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

const CopyIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="18" width="18"><rect width="336" height="336" x="128" y="128" fill="none" strokeLinejoin="round" strokeWidth="32" rx="57" ry="57"/><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="m383.5 128 .5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"/></svg>
);

function getAllColors(): ColorData[] {
  return COLOR_CATEGORIES.flatMap((cat) => cat.colors);
}

function getCategoryColors(categoryName: string): ColorData[] {
  const cat = COLOR_CATEGORIES.find((c) => c.name === categoryName);
  return cat ? cat.colors : [];
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("绿");
  const [selectedColor, setSelectedColor] = useState<ColorData>(
    COLOR_CATEGORIES.find((c) => c.name === "绿")?.colors[0] ?? getAllColors()[0]
  );
  const [copied, setCopied] = useState(false);

  const displayedColors =
    selectedCategory === "全部" ? getAllColors() : getCategoryColors(selectedCategory);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    const catColors = getCategoryColors(category);
    if (catColors.length > 0) setSelectedColor(catColors[0]);
  };

  const handleSelectColor = (color: ColorData) => {
    setSelectedColor(color);
  };

  const copyHex = () => {
    navigator.clipboard.writeText(selectedColor.hex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {});
  };

  const hexToRgba = (hex: string, alpha = 0.3) => {
    const c = hex.replace("#", "");
    return `rgba(${parseInt(c.substring(0,2),16)}, ${parseInt(c.substring(2,4),16)}, ${parseInt(c.substring(4,6),16)}, ${alpha})`;
  };

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Background - body level */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1,
        backgroundColor: selectedColor.hex,
        backgroundImage: 'url(/images/bg-texture.png), url(/images/bg-top.png)',
        backgroundRepeat: 'repeat, repeat-x',
        backgroundSize: 'auto, auto 42px',
        transition: 'background-color 1.6s ease',
      }} />

      {/* Music Player - fixed bottom left */}
      <div style={{
        position: 'fixed', left: 11, bottom: 11, zIndex: 50,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer'
      }}>
        <div style={{
          padding: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(8px)'
        }}>
          <MusicBtn />
        </div>
        <span style={{ fontSize: 10, color: 'rgba(255,255,235,0.5)' }}>👈 点击播放</span>
      </div>

      {/* Main Content Area */}
      <main style={{
        display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
        justifyContent: 'space-evenly', width: '100%', height: '100vh',
        padding: '56px 14px',
      }}>
        {/* 1. Color Nav - Left scrollable panel */}
        <nav style={{
          width: 330, height: 788, overflowY: 'auto', marginRight: 0,
        }} className="color-nav">
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}>
            {displayedColors.map((color, i) => (
              <li key={i} onClick={() => handleSelectColor(color)}
                style={{
                  display: 'flex', flexDirection: 'row',
                  width: 84, height: 417,
                  padding: '14px 5.6px 11.2px', margin: '11.2px',
                  backgroundColor: hexToRgba(color.hex, 0.3),
                  borderRadius: '0 0 6px 6px',
                  cursor: 'pointer', transition: 'all 0.5s',
                  opacity: selectedColor.name === color.name ? 1 : 0.8,
                  transform: selectedColor.name === color.name ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <div style={{
                  flex: 1, borderRadius: 3,
                  backgroundColor: color.hex, opacity: 0.7,
                }} />
                <div style={{
                  flex: 1, borderRadius: 3,
                  backgroundColor: color.hex, opacity: 0.5,
                }} />
              </li>
            ))}
          </ul>
        </nav>

        {/* 2. Color Params - CMYK + RGB + HEX */}
        <div style={{
          width: 138, marginTop: 16.8, marginRight: 28,
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {/* CMYK - C */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,235,0.7)', width: 12 }}>C</span>
            <CircleProgress percent={selectedColor.cmyk.c} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,235,0.7)', width: 28, textAlign: 'right' }}>{selectedColor.cmyk.c}%</span>
          </div>
          {/* M */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,235,0.7)', width: 12 }}>M</span>
            <CircleProgress percent={selectedColor.cmyk.m} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,235,0.7)', width: 28, textAlign: 'right' }}>{selectedColor.cmyk.m}%</span>
          </div>
          {/* Y */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,235,0.7)', width: 12 }}>Y</span>
            <CircleProgress percent={selectedColor.cmyk.y} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,235,0.7)', width: 28, textAlign: 'right' }}>{selectedColor.cmyk.y}%</span>
          </div>
          {/* K */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,235,0.7)', width: 12 }}>K</span>
            <CircleProgress percent={selectedColor.cmyk.k} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,235,0.7)', width: 28, textAlign: 'right' }}>{selectedColor.cmyk.k}%</span>
          </div>

          {/* RGB bars */}
          <div style={{ marginTop: 12 }}>
            {[
              { label: 'R', val: selectedColor.rgb.r, pct: Math.round(selectedColor.rgb.r/255*100), color: '#ffd143' },
              { label: 'G', val: selectedColor.rgb.g, pct: Math.round(selectedColor.rgb.g/255*100), color: '#0aa344' },
              { label: 'B', val: selectedColor.rgb.b, pct: Math.round(selectedColor.rgb.b/255*100), color: '#44cef6' },
            ].map(({ label, val, pct, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color, width: 10 }}>{label}</span>
                <div style={{
                  flex: 1, height: 8, borderRadius: 4, overflow: 'hidden',
                  background: 'rgba(255,255,255,0.12)',
                }}>
                  <div style={{
                    height: '100%', borderRadius: 4, transition: 'width 0.5s',
                    width: `${pct}%`,
                    background: `linear-gradient(to right, ${color} 0%, ${color} ${pct}%, rgba(80,97,109,0.3) ${pct}%, rgba(80,97,109,0.3) 100%)`,
                  }} />
                </div>
                <span style={{ fontSize: 10, color: 'rgba(255,255,235,0.5)', width: 22, textAlign: 'right' }}>{val}</span>
              </div>
            ))}
          </div>

          {/* HEX Copy */}
          <div style={{ marginTop: 8 }}>
            <button onClick={copyHex} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 12px', borderRadius: 6,
              background: 'rgba(255,255,255,0.08)',
              border: 'none', cursor: 'pointer', color: 'rgba(255,255,235,0.8)',
              fontSize: 12, fontFamily: 'monospace',
            }}>
              <CopyIcon />
              <span>{selectedColor.hex}</span>
            </button>
            {copied && <span style={{ fontSize: 10, color: 'rgba(255,255,235,0.6)', marginLeft: 8 }}>已复制</span>}
          </div>
        </div>

        {/* 3. Color Display - Name + Pinyin + Poem + Figure */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', position: 'relative', width: 200, marginTop: 60,
        }}>
          {/* Decorative figure */}
          <img src="/images/figure-hehuaqingting.png" alt="" style={{
            position: 'absolute', zIndex: -1, width: 180, opacity: 0.5,
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          }} />

          {/* Color name (Chinese) */}
          <h1 style={{
            fontSize: 80, fontWeight: 400, color: '#50616d',
            fontFamily: '"TChinese","SimSun","FangSong","STSong","STZhongsong","LiSu","KaiTi","Microsoft YaHei"',
            margin: 0, lineHeight: 1.1, transition: 'transform 0.4s ease-in',
          }}>
            {selectedColor.name}
          </h1>

          {/* Fav + Download */}
          <div style={{ display: 'flex', gap: 12, marginTop: 12, marginBottom: 16 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,235,0.5)' }}>
              <HeartBtn />
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,235,0.5)' }}>
              <DownloadBtn />
            </button>
          </div>

          {/* Pinyin */}
          <h2 style={{
            fontSize: 18, fontWeight: 800, color: '#50616d',
            margin: 0, marginBottom: 20,
          }}>
            {selectedColor.pinyin}
          </h2>

          {/* Poem */}
          <div style={{ textAlign: 'center' }}>
            {selectedColor.poemLines.map((line, i) => (
              <p key={i} style={{
                margin: 0, fontSize: 12, lineHeight: 1.8,
                color: 'rgba(80,97,109,0.7)',
              }}>{line}</p>
            ))}
            <p style={{
              margin: '8px 0 0', fontSize: 10,
              color: 'rgba(80,97,109,0.4)',
            }}>{selectedColor.poemAuthor}</p>
          </div>
        </div>

        {/* 4. Header - Logo + Title */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', width: 78, marginTop: 20,
        }}>
          <img src="data:image/png;base64,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" alt="logo"
            style={{ width: 56, height: 56, objectFit: 'contain', marginBottom: 8 }}
          />
          <span style={{
            fontSize: 15, fontWeight: 500, color: 'rgba(255,255,235,0.7)',
            writingMode: 'vertical-rl',
          }}>chinese color</span>
        </div>
      </main>

      {/* Color Categories - Fixed bottom right */}
      <div style={{
        position: 'fixed', bottom: 56, right: 100, zIndex: 40,
        display: 'flex', alignItems: 'center', gap: 4,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 8, padding: '6px 12px',
        backdropFilter: 'blur(8px)',
      }}>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="18" width="18" style={{ color: 'rgba(255,255,235,0.5)' }}>
          <path d="M19 10H5c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2zM5 20v-8h14l.002 8H5zM5 6h14v2H5zm2-4h10v2H7z"/>
        </svg>
        <div style={{ display: 'flex', gap: 2 }}>
          {COLOR_CATEGORIES.map((cat) => (
            <button key={cat.name} onClick={() => handleSelectCategory(cat.name)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '2px 6px', borderRadius: 4, fontSize: 12,
                fontFamily: '"Fangzheng ZY","Hiragino Sans GB","Heiti SC","Microsoft YaHei",sans-serif',
                color: selectedCategory === cat.name ? 'rgba(255,255,235,0.95)' : 'rgba(255,255,235,0.5)',
                fontWeight: selectedCategory === cat.name ? 700 : 400,
                transition: 'all 0.2s',
              }}
            >{cat.name}</button>
          ))}
        </div>
      </div>

      {/* Action Buttons - Fixed far right */}
      <div style={{
        position: 'fixed', right: 14, top: 56, zIndex: 40,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {[
          <svg key="info" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="22" width="22"><path d="M13 7.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-3 3.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v4.25h.75a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5h.75V12h-.75a.75.75 0 0 1-.75-.75Z"/><path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1ZM2.5 12a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5 9.5 9.5 0 0 0 2.5 12Z"/></svg>,
          <svg key="img" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24"><path d="M4.75 3h14.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0 1 19.25 21H4.75A1.75 1.75 0 0 1 3 19.25V4.75C3 3.784 3.784 3 4.75 3Zm14.5 1.5H4.75a.25.25 0 0 0-.25.25v14.5c0 .138.112.25.25.25h.19l9.823-9.823a1.75 1.75 0 0 1 2.475 0l2.262 2.262V4.75a.25.25 0 0 0-.25-.25Zm.25 9.56-3.323-3.323a.25.25 0 0 0-.354 0L7.061 19.5H19.25a.25.25 0 0 0 .25-.25ZM8.5 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm0-1.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>,
          <svg key="ss" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="22" width="22"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zm-5.55-8h-2.9v3H8l4 4 4-4h-2.55z"/></svg>,
          <svg key="x" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="20" width="20"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>,
        ].map((icon, i) => (
          <button key={i} style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,235,0.7)',
          }}>{icon}</button>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        position: 'fixed', bottom: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 10,
      }}>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 10, color: 'rgba(255,255,235,0.25)', textDecoration: 'none' }}>
          京ICP备16015459号-1
        </a>
      </div>
    </div>
  );
}
