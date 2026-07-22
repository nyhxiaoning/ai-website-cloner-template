"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import * as echarts from "echarts/core";
import { GeoComponent, TooltipComponent, VisualMapComponent } from "echarts/components";
import { MapChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useAppContext } from "@/lib/AppContext";
import { findProvinceByName, PROVINCE_PLACE_COUNTS } from "@/data/provinces";

echarts.use([GeoComponent, TooltipComponent, VisualMapComponent, MapChart, CanvasRenderer]);

export default function MapArea() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { selectedProvince, setSelectedProvince, resetSelection } = useAppContext();

  // Load GeoJSON and create chart
  useEffect(() => {
    let cancelled = false;

    async function initMap() {
      try {
        const res = await fetch("/data/china.json");
        const geoJson = await res.json();
        if (cancelled) return;

        echarts.registerMap("china", geoJson as any);
        setMapLoaded(true);
      } catch (e) {
        console.error("Failed to load China map:", e);
      }
    }

    initMap();
    return () => { cancelled = true; };
  }, []);

  // Initialize ECharts instance
  useEffect(() => {
    if (!mapLoaded || !chartRef.current) return;

    const instance = echarts.init(chartRef.current, null, { renderer: "canvas" });
    chartInstance.current = instance;

    // Handle click on province
    instance.on("click", (params: any) => {
      if (params.name) {
        const province = findProvinceByName(params.name);
        if (province) {
          setSelectedProvince(province);
        }
      }
    });

    // Handle resize
    const handleResize = () => instance.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      instance.dispose();
      chartInstance.current = null;
    };
  }, [mapLoaded, setSelectedProvince]);

  // Update chart options when selection changes
  useEffect(() => {
    const instance = chartInstance.current;
    if (!instance) return;

    const placeCounts = PROVINCE_PLACE_COUNTS;
    const maxCount = Math.max(1, ...Object.values(placeCounts));

    const geoData = Object.entries(placeCounts).map(([name, value]) => ({
      name,
      value,
      selected: selectedProvince ? name === selectedProvince.name : false,
      itemStyle: {
        areaColor: selectedProvince
          ? name === selectedProvince.name
            ? "#b85a4e"
            : "#e8d5c4"
          : undefined,
      },
    }));

    const option: echarts.EChartsCoreOption = {
      geo: {
        map: "china",
        roam: true,
        zoom: selectedProvince ? 1.2 : 1,
        center: selectedProvince ? undefined : [104, 36],
        label: {
          show: true,
          color: "#695f5c",
          fontSize: 9,
        },
        itemStyle: {
          areaColor: "#ede9e1",
          borderColor: "#d4c4b0",
          borderWidth: 1,
        },
        emphasis: {
          itemStyle: {
            areaColor: "#dfb9aa",
          },
          label: {
            color: "#25221e",
            fontWeight: "bold" as const,
          },
        },
        regions: geoData.map((d) => ({
          name: d.name,
          itemStyle: d.itemStyle,
        })),
      },
      visualMap: {
        show: false,
        min: 0,
        max: maxCount,
        inRange: {
          color: ["#ede9e1", "#dfb9aa", "#b85a4e"],
        },
        calculable: false,
        seriesIndex: 0,
      },
      series: [
        {
          type: "map",
          map: "china",
          geoIndex: 0,
          data: geoData.map((d) => ({ name: d.name, value: d.value })),
        },
      ],
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          if (!params.data) return params.name;
          const count = params.data.value ?? 0;
          return `<strong>${params.name}</strong><br/>景点: ${count} 处`;
        },
      },
    };

    instance.setOption(option, true);
  }, [mapLoaded, selectedProvince]);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    chartInstance.current?.dispatchAction({ type: "geoZoomIn", geoIndex: 0 });
  }, []);

  const handleZoomOut = useCallback(() => {
    chartInstance.current?.dispatchAction({ type: "geoZoomOut", geoIndex: 0 });
  }, []);

  const handleReset = useCallback(() => {
    resetSelection();
    chartInstance.current?.dispatchAction({ type: "restore", geoIndex: 0 });
  }, [resetSelection]);

  return (
    <div className="map-area">
      {/* Heading overlay */}
      <div className="map-heading">
        <nav className="breadcrumbs" aria-label="地图层级">
          <button type="button" onClick={resetSelection}>中国</button>
          {selectedProvince && (
            <>
              <span style={{ color: "#988f87", fontSize: 11, alignSelf: "center" }}>/</span>
              <button
                type="button"
                style={{ color: "#25221e", fontWeight: 600 }}
                onClick={() => {}}
              >
                {selectedProvince.fullName}
              </button>
            </>
          )}
        </nav>
        <div>
          <p className="eyebrow">{selectedProvince ? selectedProvince.fullName : "发现中国"}</p>
          <h1>{selectedProvince ? `${selectedProvince.name} · 景点与人文` : "在地图上，遇见华夏"}</h1>
          <p className="map-subtitle">
            {selectedProvince
              ? `浏览${selectedProvince.fullName}的自然名胜与人文古迹。`
              : "点击一片区域，从省份到城市，发现山河与文明留下的印记。"}
          </p>
        </div>
      </div>

      {/* ECharts container */}
      <div className="map-shell">
        <div className="echarts-container" ref={chartRef} />

        {/* Stats card */}
        <div className="map-insight glass">
          <span>{selectedProvince ? selectedProvince.fullName : "全国地图"}</span>
          <strong>{selectedProvince ? PROVINCE_PLACE_COUNTS[selectedProvince.name] ?? 0 : 11_850}</strong>
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
          <button aria-label="放大" onClick={handleZoomIn}>+</button>
          <button aria-label="缩小" onClick={handleZoomOut}>−</button>
          <button aria-label="重置地图" onClick={handleReset}>↻</button>
        </div>

        {/* Tooltip */}
        <div className="map-tip">{selectedProvince ? "滚动缩放 · 点击城市" : "放大 · 深入了解"}</div>
      </div>
    </div>
  );
}