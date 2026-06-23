'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import { tribulations, getMapBounds, getMapCenter, type MarkerData } from "@/data/tribulations";
import { timelineData } from "@/data/timeline-data";
import DetailModal from "@/components/DetailModal";

function createMarkerIcon(marker: MarkerData, isSelected: boolean): L.DivIcon {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div class="relative marker-container" data-location-index="${marker.id - 1}">
        <div class="w-12 h-12 rounded-full border-4 border-white flex items-center justify-center text-2xl shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 bg-gradient-to-br ${marker.gradient} marker-element ${isSelected ? "animate-bounce" : ""}" style="transform: ${isSelected ? "scale(1.15)" : "scale(1)"}; opacity: 1; ${isSelected ? "box-shadow: 0 0 20px rgba(249, 115, 22, 0.6);" : ""}">
          ${marker.emoji}
        </div>
        <div class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md trial-number" style="opacity: 1; transform: scale(1);">
          ${marker.id}
        </div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });
}

export default function MapView() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const markersRef = useRef<L.Marker[]>([]);
  const startIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentTribulation = selectedIndex !== null ? tribulations[selectedIndex] : null;
  const currentDetail = selectedIndex !== null && selectedIndex < timelineData.length ? timelineData[selectedIndex] : null;

  // Update marker icons when selection changes
  const updateMarkerIcons = useCallback((selectedIdx: number) => {
    markersRef.current.forEach((marker, i) => {
      const t = tribulations[i];
      marker.setIcon(createMarkerIcon(t, i === selectedIdx));
    });
  }, []);

  // Initialize map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const bounds = getMapBounds();
      const center = getMapCenter();
      const map = L.map(mapContainerRef.current, {
        center,
        zoom: 5,
        zoomControl: false,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      // Fit map to show the entire route with padding
      map.fitBounds(bounds, { padding: [50, 50] });

      mapRef.current = map;

      // Create markers with click handlers
      const markers = tribulations.map((t, i) => {
        const marker = L.marker([t.lat, t.lng], {
          icon: createMarkerIcon(t, false),
        }).addTo(map);

        marker.on("click", () => {
          setSelectedIndex(i);
          setCurrentIndex(i);
          map.setView([t.lat, t.lng], 6, { animate: true, duration: 0.5 });
          updateMarkerIcons(i);
        });

        return marker;
      });
      markersRef.current = markers;

      // Create route line
      const routeCoords = tribulations.map((t) => [t.lat, t.lng] as [number, number]);
      L.polyline(routeCoords, {
        color: "#ff6b6b",
        weight: 3,
        opacity: 0.5,
        dashArray: "10, 10",
      }).addTo(map);

      return () => {
        if (startIntervalRef.current) clearInterval(startIntervalRef.current);
        map.remove();
        mapRef.current = null;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToMarker = useCallback(
    (index: number) => {
      if (!mapRef.current) return;
      const idx = Math.max(0, Math.min(index, tribulations.length - 1));
      const marker = tribulations[idx];
      mapRef.current.setView([marker.lat, marker.lng], 6, {
        animate: true,
        duration: 0.5,
      });
      setSelectedIndex(idx);
      setCurrentIndex(idx);
      updateMarkerIcons(idx);
    },
    [updateMarkerIcons]
  );

  const goToPrev = useCallback(() => {
    goToMarker(currentIndex - 1);
  }, [currentIndex, goToMarker]);

  const goToNext = useCallback(() => {
    goToMarker(currentIndex + 1);
  }, [currentIndex, goToMarker]);

  const resetView = useCallback(() => {
    if (!mapRef.current) return;
    mapRef.current.fitBounds(getMapBounds(), { padding: [50, 50], animate: true });
    setSelectedIndex(null);
    setCurrentIndex(0);
    // Reset all marker icons
    markersRef.current.forEach((marker, i) => {
      marker.setIcon(createMarkerIcon(tribulations[i], false));
    });
  }, []);

  const startJourney = useCallback(() => {
    if (startIntervalRef.current) {
      clearInterval(startIntervalRef.current);
      startIntervalRef.current = null;
    }
    goToMarker(0);
    let i = 0;
    startIntervalRef.current = setInterval(() => {
      i++;
      if (i >= tribulations.length) {
        if (startIntervalRef.current) clearInterval(startIntervalRef.current);
        startIntervalRef.current = null;
        return;
      }
      goToMarker(i);
    }, 1500);
  }, [goToMarker]);

  const closePanel = useCallback(() => {
    setSelectedIndex(null);
    markersRef.current.forEach((marker, i) => {
      marker.setIcon(createMarkerIcon(tribulations[i], false));
    });
  }, []);

  // Get current detail data for display
  const detail = selectedIndex !== null && selectedIndex < timelineData.length ? timelineData[selectedIndex] : null;

  return (
    <div className="relative h-[750px]">
      <div className="relative w-full h-full">
        {/* Cloud decorations */}
        <div className="map-clouds">
          <div className="cloud cloud-1">☁️</div>
          <div className="cloud cloud-2">☁️</div>
          <div className="cloud cloud-3">☁️</div>
          <div className="cloud cloud-4">☁️</div>
          <div className="cloud cloud-5">☁️</div>
        </div>

        {/* Hint overlay when no marker selected */}
        {selectedIndex === null && (
          <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-4 py-3 border border-amber-200 max-w-xs">
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <span className="text-lg">👆</span>
              <span>点击地图上的标记点查看每一难的详情</span>
            </p>
          </div>
        )}

        {/* Character icons */}
        <div className="absolute top-4 right-4 flex items-center gap-1 z-20">
          <svg width="24" height="24" viewBox="0 0 64 64" className="animate-bounce" style={{ animationDelay: "0s" }}>
            <circle cx="32" cy="28" r="18" fill="#F4C2A1" stroke="#E6A67A" strokeWidth="1" />
            <path d="M14 20 Q32 8 50 20 Q50 15 32 10 Q14 15 14 20" fill="#8B4513" />
            <circle cx="32" cy="15" r="3" fill="#FFD700" />
            <circle cx="26" cy="26" r="2" fill="#2C1810" />
            <circle cx="38" cy="26" r="2" fill="#2C1810" />
            <circle cx="26.5" cy="25.5" r="0.5" fill="#FFFFFF" />
            <circle cx="38.5" cy="25.5" r="0.5" fill="#FFFFFF" />
            <path d="M23 22 Q26 20 29 22" stroke="#8B4513" strokeWidth="1.5" fill="none" />
            <path d="M35 22 Q38 20 41 22" stroke="#8B4513" strokeWidth="1.5" fill="none" />
            <ellipse cx="32" cy="30" rx="1" ry="2" fill="#E6A67A" />
            <path d="M29 34 Q32 36 35 34" stroke="#8B4513" strokeWidth="1.5" fill="none" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 64 64" className="animate-bounce -ml-1" style={{ animationDelay: "0.1s" }}>
            <circle cx="32" cy="30" r="16" fill="#D4AF37" stroke="#B8860B" strokeWidth="1" />
            <ellipse cx="32" cy="18" rx="18" ry="3" fill="#FFD700" />
            <ellipse cx="18" cy="28" rx="4" ry="6" fill="#D4AF37" />
            <ellipse cx="46" cy="28" rx="4" ry="6" fill="#D4AF37" />
            <circle cx="27" cy="28" r="3" fill="#FF4500" />
            <circle cx="37" cy="28" r="3" fill="#FF4500" />
            <circle cx="27" cy="28" r="2" fill="#2C1810" />
            <circle cx="37" cy="28" r="2" fill="#2C1810" />
            <path d="M28 36 Q32 39 36 36" stroke="#8B4513" strokeWidth="2" fill="none" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 64 64" className="animate-bounce -ml-1" style={{ animationDelay: "0.2s" }}>
            <ellipse cx="32" cy="30" rx="18" ry="16" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="1" />
            <ellipse cx="20" cy="22" rx="6" ry="8" fill="#FFB6C1" />
            <ellipse cx="44" cy="22" rx="6" ry="8" fill="#FFB6C1" />
            <circle cx="26" cy="26" r="3" fill="#FFFFFF" />
            <circle cx="38" cy="26" r="3" fill="#FFFFFF" />
            <circle cx="26" cy="26" r="2" fill="#2C1810" />
            <circle cx="38" cy="26" r="2" fill="#2C1810" />
            <ellipse cx="32" cy="32" rx="4" ry="3" fill="#FF69B4" />
            <circle cx="30" cy="32" r="1" fill="#8B0000" />
            <circle cx="34" cy="32" r="1" fill="#8B0000" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 64 64" className="animate-bounce -ml-1" style={{ animationDelay: "0.3s" }}>
            <circle cx="32" cy="30" r="17" fill="#8B4513" stroke="#654321" strokeWidth="1" />
            <circle cx="32" cy="30" r="15" fill="#A0522D" />
            <circle cx="26" cy="20" r="1.5" fill="#654321" />
            <circle cx="32" cy="18" r="1.5" fill="#654321" />
            <circle cx="38" cy="20" r="1.5" fill="#654321" />
            <circle cx="26" cy="28" r="2.5" fill="#FFFFFF" />
            <circle cx="38" cy="28" r="2.5" fill="#FFFFFF" />
            <circle cx="26" cy="28" r="2" fill="#2C1810" />
            <circle cx="38" cy="28" r="2" fill="#2C1810" />
          </svg>
        </div>

        {/* Map */}
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* ===== LEFT SIDEBAR - Route Control ===== */}
        {selectedIndex !== null && (
          <div className="absolute top-16 left-4 z-30 w-64 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-5 border border-orange-200 max-h-[600px] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={closePanel}
              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
            >
              ✕
            </button>

            {/* Progress */}
            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                路线进程
              </h3>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500">
                  {selectedIndex + 1} / {tribulations.length}
                </span>
                <span className="text-xs font-bold text-orange-600">
                  {Math.round(((selectedIndex + 1) / tribulations.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${((selectedIndex + 1) / tribulations.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Route flow mini visualization */}
            <div className="mb-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 border border-orange-100">
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>长安城</span>
                <span className="flex-1 border-t border-dashed border-gray-300 mx-1" />
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>灵山</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>当前：{detail?.title || `第${selectedIndex + 1}难`}</span>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={goToPrev}
                  disabled={currentIndex <= 0}
                  className="px-3 py-2 text-xs text-white rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← 上一难
                </button>
                <button
                  onClick={goToNext}
                  disabled={currentIndex >= tribulations.length - 1}
                  className="px-3 py-2 text-xs text-white rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  下一难 →
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={startJourney}
                  className="px-3 py-2 text-xs text-white rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md"
                >
                  ▶ 开始取经
                </button>
                <button
                  onClick={resetView}
                  className="px-3 py-2 text-xs rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-md"
                >
                  ⟳ 重置
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== RIGHT DETAILS PANEL ===== */}
        {selectedIndex !== null && detail && (
          <div className="absolute top-16 right-4 z-30 w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-5 border border-teal-200 max-h-[600px] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={closePanel}
              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
            >
              ✕
            </button>

            {/* Header with emoji and number */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${tribulations[selectedIndex]?.gradient || detail.gradient} flex items-center justify-center text-3xl shadow-lg shrink-0 border-4 border-white`}
              >
                {detail.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {selectedIndex > 0 && (
                    <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                      第{detail.id}难
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-800 text-lg leading-tight">
                  {detail.title}
                </h3>
                <p className="text-gray-500 text-sm">{detail.subtitle}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 mb-4 border border-blue-100">
              <p className="text-gray-700 text-sm leading-relaxed">
                {detail.description}
              </p>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                关键词
              </h4>
              <div className="flex flex-wrap gap-2">
                {detail.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="bg-gradient-to-r from-red-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button
                onClick={goToPrev}
                disabled={currentIndex <= 0}
                className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← 上一难
              </button>
              <span className="text-xs text-gray-400">
                {selectedIndex + 1}/{tribulations.length}
              </span>
              <button
                onClick={goToNext}
                disabled={currentIndex >= tribulations.length - 1}
                className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                下一难 →
              </button>
            </div>

            <div className="mt-3 text-right">
              <button
                onClick={() => setShowDetail(true)}
                className="text-teal-600 text-xs font-medium hover:text-teal-800 transition-colors"
              >
                点击查看详情 →
              </button>
            </div>
          </div>
        )}

        {/* Bottom Navigation (always visible) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          <button
            onClick={startJourney}
            className="px-3 py-2 text-sm text-white rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md"
          >
            开始
          </button>
          <button
            onClick={resetView}
            className="px-3 py-2 text-sm bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-medium transition-all duration-300 hover:from-red-600 hover:to-pink-600 shadow-md"
          >
            重置
          </button>
          <button
            onClick={goToPrev}
            disabled={currentIndex <= 0}
            className="px-3 py-2 text-sm text-white rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
          >
            上一难
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= tribulations.length - 1}
            className="px-3 py-2 text-sm text-white rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
          >
            下一难
          </button>
          <button className="p-2 rounded-full transition-all duration-300 bg-green-500 text-white hover:bg-green-600 shadow-md">
            🔊
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && selectedIndex !== null && (
        <DetailModal
          selectedIndex={selectedIndex}
          onClose={() => setShowDetail(false)}
          onPrev={currentIndex > 0 ? goToPrev : null}
          onNext={currentIndex < tribulations.length - 1 ? goToNext : null}
        />
      )}
    </div>
  );
}
