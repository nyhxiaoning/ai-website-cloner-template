'use client';

import type { Prompt, GenerationResult } from '@/types';
import { useRef, useState } from 'react';

interface GenerationResultsProps {
  prompt: Prompt;
  onImport?: (files: File[]) => void;
  onDelete?: (resultId: string) => void;
}

export default function GenerationResults({ prompt, onImport, onDelete }: GenerationResultsProps) {
  const results = prompt.results;
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-studio-text-faint">
          {results.length} 张图片
        </span>
        {onImport && (
          <ImportButton onImport={onImport} />
        )}
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-studio-border p-6 text-center">
          <p className="text-xs text-studio-text-faint">暂无生成结果</p>
          {onImport && <ImportButton onImport={onImport} compact />}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {results.map((result) => (
            <div
              key={result.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-studio-elev-2 cursor-pointer"
              onClick={() => setLightboxId(lightboxId === result.id ? null : result.id)}
            >
              <img
                src={result.imageUrl}
                alt={result.id}
                className="h-full w-full object-cover object-top transition group-hover:scale-105"
                loading="lazy"
              />
              {onDelete && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(result.id);
                  }}
                  className="absolute right-1 top-1 hidden h-5 w-5 items-center justify-center rounded-full bg-black/70 text-xs text-studio-on-scrim transition hover:bg-studio-warn hover:text-studio-on-scrim group-hover:flex"
                  aria-label="删除结果"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8 backdrop-blur-sm"
          onClick={() => setLightboxId(null)}
        >
          {results
            .filter((r) => r.id === lightboxId)
            .map((result) => (
              <img
                key={result.id}
                src={result.imageUrl}
                alt={result.id}
                className="max-h-[80vh] max-w-full rounded-lg object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            ))}
        </div>
      )}
    </div>
  );
}

function ImportButton({ onImport, compact = false }: { onImport: (files: File[]) => void; compact?: boolean }) {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className={compact ? 'text-xs text-studio-accent transition hover:opacity-80' : 'text-xs text-studio-accent transition hover:opacity-80'}
      >
        + 导入结果
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) onImport(Array.from(e.target.files));
        }}
      />
    </>
  );
}
