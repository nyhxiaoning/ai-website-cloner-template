"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Philosopher } from "@/types/philosophy";

interface PhilosopherDetailPanelProps {
  philosopher: Philosopher | null;
  onClose: () => void;
  allPhilosophers: Philosopher[];
  onSelectPhilosopher: (id: string) => void;
}

export default function PhilosopherDetailPanel({
  philosopher,
  onClose,
  allPhilosophers,
  onSelectPhilosopher,
}: PhilosopherDetailPanelProps) {
  const [isAnimatedIn, setIsAnimatedIn] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (philosopher) {
      const frame = requestAnimationFrame(() => setIsAnimatedIn(true));
      return () => cancelAnimationFrame(frame);
    }
    setIsAnimatedIn(false);
  }, [philosopher]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (philosopher) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [philosopher, onClose]);

  useEffect(() => {
    if (philosopher) {
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [philosopher]);

  if (!philosopher) return null;

  const philosopherById = new Map(allPhilosophers.map((p) => [p.id, p]));
  const starDisplay = Array.from({ length: 5 }, (_, i) => i < philosopher.rating);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/20 transition-opacity duration-300",
          isAnimatedIn ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md z-50",
          "bg-white/95 backdrop-blur shadow-xl border-l-4 border-gold",
          "flex flex-col",
          "transition-transform duration-300 ease-out",
          isAnimatedIn ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={`${philosopher.chineseName} details`}
      >
        <div className="relative px-6 pt-8 pb-4 border-b border-[#D4AF37]/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#D4AF37]/10 transition-colors text-aegean"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <span className="font-mono text-[10px] uppercase tracking-widest text-gold/70">
            {philosopher.school}
          </span>
          <h2 className="text-2xl font-bold text-aegean tracking-tight mt-1">
            {philosopher.chineseName}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {philosopher.englishName}
          </p>
          <div className="mt-3 inline-block px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/25 text-[10px] font-mono uppercase tracking-wider text-gold/80">
            {philosopher.school}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <div className="flex items-center gap-1">
            {starDisplay.map((filled, i) => (
              <span key={i} className={cn("text-lg", filled ? "text-gold" : "text-gray-300")}>★</span>
            ))}
          </div>

          {philosopher.coreTenets && philosopher.coreTenets.length > 0 && (
            <section>
              <h3 className="text-sm font-bold text-aegean tracking-tight mb-2">核心命题与学说</h3>
              <ul className="space-y-1.5">
                {philosopher.coreTenets.map((tenet, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-aegean/80 leading-relaxed">
                    <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {tenet}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {philosopher.summary && (
            <section>
              <h3 className="text-sm font-bold text-aegean tracking-tight mb-2">思想史综述</h3>
              <p className="text-xs text-aegean/70 leading-relaxed">{philosopher.summary}</p>
            </section>
          )}

          {philosopher.connections && philosopher.connections.length > 0 && (
            <section>
              <h3 className="text-sm font-bold text-aegean tracking-tight mb-2">历史脉络学术关联</h3>
              <div className="flex flex-wrap gap-2">
                {philosopher.connections.map((connectionId) => {
                  const connected = philosopherById.get(connectionId);
                  if (!connected) return null;
                  return (
                    <button
                      key={connectionId}
                      onClick={() => onSelectPhilosopher(connectionId)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#D4AF37]/25 bg-gold/5 text-[10px] text-aegean/80 hover:bg-gold/15 hover:border-gold/40 transition-colors"
                    >
                      <span className="font-bold">{connected.chineseName}</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-gray-500">{connected.englishName}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
