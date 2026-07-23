'use client';

import type { Prompt, GenerationResult } from '@/types';

interface GenerationResultsProps {
  prompt: Prompt;
  onImport?: () => void;
  onDelete?: (resultId: string) => void;
  getPreviewURL?: (result: GenerationResult) => string;
}

export default function GenerationResults({
  prompt,
  onImport,
  onDelete,
  getPreviewURL,
}: GenerationResultsProps) {
  const results = prompt.results;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-studio-text-faint">
          {results.length} 张图片
        </span>
        {onImport && (
          <button
            type="button"
            onClick={onImport}
            className="text-xs text-studio-accent transition hover:opacity-80"
          >
            + 导入结果
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-studio-border p-6 text-center">
          <p className="text-xs text-studio-text-faint">暂无生成结果</p>
          {onImport && (
            <button
              type="button"
              onClick={onImport}
              className="mt-2 text-xs text-studio-accent transition hover:opacity-80"
            >
              导入结果
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {results.map((result) => {
            const previewUrl = getPreviewURL ? getPreviewURL(result) : result.imageUrl;
            return (
              <div
                key={result.id}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-studio-elev-2"
              >
                <img
                  src={previewUrl}
                  alt={result.id}
                  className="h-full w-full object-cover object-top"
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
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
