"use client";

export default function MapArea() {
  return (
    <div className="map-area">
      {/* Heading overlay */}
      <div className="map-heading">
        <nav className="breadcrumbs" aria-label="地图层级">
          <button type="button">中国</button>
        </nav>
        <div>
          <p className="eyebrow">发现中国</p>
          <h1>在地图上，遇见华夏</h1>
          <p className="map-subtitle">
            点击一片区域，从省份到城市，发现山河与文明留下的印记。
          </p>
        </div>
      </div>

      {/* Map shell with controls */}
      <div className="map-shell">
        {/* Stats card */}
        <div className="map-insight glass">
          <span>全国地图</span>
          <strong>11,850</strong>
          <small>景点</small>
        </div>

        {/* Density legend */}
        <div className="map-density-legend glass">
          <span>景点</span>
          <small>全部</small>
          <i />
          <small>热门</small>
        </div>

        {/* Zoom controls */}
        <div className="map-controls">
          <button aria-label="放大">+</button>
          <button aria-label="缩小">−</button>
          <button aria-label="重置地图">↻</button>
        </div>

        {/* Tooltip */}
        <div className="map-tip">放大 · 深入了解</div>
      </div>

      {/* China map SVG */}
      <div className="china-map-container">
        <ChinaMap />
      </div>
    </div>
  );
}

function ChinaMap() {
  return (
    <svg
      viewBox="0 0 900 700"
      xmlns="http://www.w3.org/2000/svg"
      className="china-map-svg"
    >
      {/* Simplified China map with province outlines */}
      {/* Heilongjiang */}
      <path
        d="M680 80 L720 60 L760 80 L780 120 L770 160 L740 180 L700 170 L680 140 L660 120 Z"
        fill="#c4967a"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="720" y="120" fontSize="9" fill="#695f5c" textAnchor="middle">
        黑龙江省
      </text>

      {/* Jilin */}
      <path
        d="M700 170 L740 180 L760 200 L740 230 L700 220 L680 200 Z"
        fill="#c9a088"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="720" y="205" fontSize="9" fill="#695f5c" textAnchor="middle">
        吉林省
      </text>

      {/* Liaoning */}
      <path
        d="M680 200 L700 220 L720 250 L700 280 L660 270 L640 240 L650 210 Z"
        fill="#d4a88c"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="680" y="245" fontSize="9" fill="#695f5c" textAnchor="middle">
        辽宁省
      </text>

      {/* Inner Mongolia */}
      <path
        d="M400 60 L500 40 L600 50 L660 80 L680 120 L660 160 L600 150 L540 140 L480 130 L420 120 L380 100 Z"
        fill="#e8d5c4"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="540" y="100" fontSize="9" fill="#695f5c" textAnchor="middle">
        内蒙古自治区
      </text>

      {/* Xinjiang */}
      <path
        d="M80 80 L200 60 L300 80 L340 140 L320 220 L260 280 L180 300 L100 260 L60 180 Z"
        fill="#dcc8b4"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="200" y="180" fontSize="9" fill="#695f5c" textAnchor="middle">
        新疆维吾尔自治区
      </text>

      {/* Tibet */}
      <path
        d="M100 300 L200 280 L300 300 L340 360 L300 420 L220 440 L140 400 L80 350 Z"
        fill="#e0d0be"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="210" y="360" fontSize="9" fill="#695f5c" textAnchor="middle">
        西藏自治区
      </text>

      {/* Qinghai */}
      <path
        d="M300 260 L380 240 L440 280 L420 340 L360 360 L300 340 L280 300 Z"
        fill="#e4d4c0"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="360" y="300" fontSize="9" fill="#695f5c" textAnchor="middle">
        青海省
      </text>

      {/* Gansu */}
      <path
        d="M340 160 L420 140 L480 180 L460 240 L400 260 L340 240 L320 200 Z"
        fill="#d8c0a8"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="400" y="200" fontSize="9" fill="#695f5c" textAnchor="middle">
        甘肃省
      </text>

      {/* Ningxia */}
      <path
        d="M440 200 L470 190 L480 220 L460 240 L440 230 Z"
        fill="#c8a488"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="460" y="218" fontSize="8" fill="#695f5c" textAnchor="middle">
        宁夏
      </text>

      {/* Shaanxi */}
      <path
        d="M480 200 L520 190 L540 240 L520 300 L480 320 L460 280 L460 240 Z"
        fill="#c49070"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="500" y="260" fontSize="9" fill="#695f5c" textAnchor="middle">
        陕西省
      </text>

      {/* Shanxi */}
      <path
        d="M540 180 L580 170 L600 220 L580 280 L540 280 L520 240 L520 200 Z"
        fill="#c09880"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="560" y="230" fontSize="9" fill="#695f5c" textAnchor="middle">
        山西省
      </text>

      {/* Hebei */}
      <path
        d="M580 160 L640 150 L660 200 L640 260 L600 270 L580 240 L580 200 Z"
        fill="#b8886c"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="620" y="210" fontSize="9" fill="#695f5c" textAnchor="middle">
        河北省
      </text>

      {/* Beijing */}
      <circle cx="610" cy="185" r="12" fill="#a87058" stroke="#d4c4b0" strokeWidth="1" />
      <text x="610" y="188" fontSize="7" fill="#fff" textAnchor="middle">
        北京市
      </text>

      {/* Tianjin */}
      <circle cx="640" cy="215" r="10" fill="#b08068" stroke="#d4c4b0" strokeWidth="1" />
      <text x="640" y="218" fontSize="6" fill="#fff" textAnchor="middle">
        天津市
      </text>

      {/* Shandong */}
      <path
        d="M600 270 L660 260 L700 290 L680 330 L620 340 L580 310 Z"
        fill="#a87860"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="640" y="300" fontSize="9" fill="#695f5c" textAnchor="middle">
        山东省
      </text>

      {/* Henan */}
      <path
        d="M520 300 L580 290 L600 330 L580 370 L520 380 L500 340 Z"
        fill="#c49880"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="550" y="340" fontSize="9" fill="#695f5c" textAnchor="middle">
        河南省
      </text>

      {/* Jiangsu */}
      <path
        d="M620 340 L680 330 L700 370 L680 400 L620 400 L600 370 Z"
        fill="#c09078"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="650" y="370" fontSize="9" fill="#695f5c" textAnchor="middle">
        江苏省
      </text>

      {/* Anhui */}
      <path
        d="M580 370 L620 360 L640 400 L620 440 L580 440 L560 400 Z"
        fill="#c89880"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="600" y="405" fontSize="9" fill="#695f5c" textAnchor="middle">
        安徽省
      </text>

      {/* Shanghai */}
      <circle cx="690" cy="400" r="8" fill="#a07058" stroke="#d4c4b0" strokeWidth="1" />
      <text x="690" y="403" fontSize="6" fill="#fff" textAnchor="middle">
        上海市
      </text>

      {/* Hubei */}
      <path
        d="M480 340 L540 330 L560 380 L540 420 L480 430 L460 390 Z"
        fill="#c49478"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="510" y="385" fontSize="9" fill="#695f5c" textAnchor="middle">
        湖北省
      </text>

      {/* Sichuan */}
      <path
        d="M320 340 L420 320 L460 380 L440 440 L380 460 L320 440 L300 380 Z"
        fill="#c89478"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="380" y="390" fontSize="9" fill="#695f5c" textAnchor="middle">
        四川省
      </text>

      {/* Chongqing */}
      <circle cx="450" cy="410" r="14" fill="#b88068" stroke="#d4c4b0" strokeWidth="1" />
      <text x="450" y="413" fontSize="7" fill="#fff" textAnchor="middle">
        重庆市
      </text>

      {/* Jiangxi */}
      <path
        d="M560 420 L600 410 L620 460 L600 500 L560 500 L540 460 Z"
        fill="#c89880"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="580" y="460" fontSize="9" fill="#695f5c" textAnchor="middle">
        江西省
      </text>

      {/* Zhejiang */}
      <path
        d="M640 400 L680 390 L700 440 L680 470 L640 470 L620 440 Z"
        fill="#c09078"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="660" y="440" fontSize="9" fill="#695f5c" textAnchor="middle">
        浙江省
      </text>

      {/* Fujian */}
      <path
        d="M640 480 L680 470 L700 520 L680 560 L640 560 L620 520 Z"
        fill="#b88870"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="660" y="520" fontSize="9" fill="#695f5c" textAnchor="middle">
        福建省
      </text>

      {/* Hunan */}
      <path
        d="M480 430 L540 420 L560 480 L540 520 L480 520 L460 480 Z"
        fill="#c89480"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="510" y="475" fontSize="9" fill="#695f5c" textAnchor="middle">
        湖南省
      </text>

      {/* Guizhou */}
      <path
        d="M380 440 L440 430 L460 480 L440 520 L380 520 L360 480 Z"
        fill="#c89880"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="410" y="480" fontSize="9" fill="#695f5c" textAnchor="middle">
        贵州省
      </text>

      {/* Yunnan */}
      <path
        d="M280 460 L360 440 L380 500 L360 560 L300 580 L260 540 L260 500 Z"
        fill="#c89078"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="320" y="520" fontSize="9" fill="#695f5c" textAnchor="middle">
        云南省
      </text>

      {/* Guangxi */}
      <path
        d="M380 530 L460 520 L480 570 L460 610 L400 620 L360 580 Z"
        fill="#c09078"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="420" y="570" fontSize="9" fill="#695f5c" textAnchor="middle">
        广西壮族自治区
      </text>

      {/* Guangdong */}
      <path
        d="M480 530 L560 520 L580 570 L560 610 L500 620 L480 580 Z"
        fill="#b88868"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="530" y="570" fontSize="9" fill="#695f5c" textAnchor="middle">
        广东省
      </text>

      {/* Hainan */}
      <ellipse cx="490" cy="650" rx="25" ry="18" fill="#c09878" stroke="#d4c4b0" strokeWidth="1" />
      <text x="490" y="653" fontSize="8" fill="#695f5c" textAnchor="middle">
        海南省
      </text>

      {/* Taiwan */}
      <path
        d="M700 480 L710 470 L720 500 L710 540 L700 530 Z"
        fill="#c8a088"
        stroke="#d4c4b0"
        strokeWidth="1"
      />
      <text x="710" y="510" fontSize="8" fill="#695f5c" textAnchor="middle">
        台湾省
      </text>
    </svg>
  );
}
