'use client';

import { useRef, useState } from 'react';

interface ImportResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (files: File[]) => void;
}

export default function ImportResultsDialog({ open, onOpenChange, onImport }: ImportResultsDialogProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  if (!open) return null;

  const handleFiles = (files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith('image/') || f.type.startsWith('video/'));
    if (arr.length > 0) onImport(arr);
    onOpenChange(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm ${dragOver ? 'ring-4 ring-studio-accent/50' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
    >
      <div className="w-full max-w-lg rounded-lg border border-studio-border bg-studio-elev-1 p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-studio-text">导入生成结果</h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-6 w-6 items-center justify-center rounded text-studio-text-faint transition hover:bg-studio-elev-2 hover:text-studio-text"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>

        <div
          onClick={() => fileRef.current?.click()}
          className={`mt-4 cursor-pointer rounded-md border-2 border-dashed p-8 text-center transition ${
            dragOver ? 'border-studio-accent bg-studio-accent/10' : 'border-studio-border hover:border-studio-accent/50'
          }`}
        >
          <p className="text-sm text-studio-text-dim">拖放图片或视频到此处</p>
          <p className="mt-1 text-xs text-studio-text-faint">或点击选择文件（支持 JPG / PNG / WebP / MP4）</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-md border border-studio-border px-3 py-1.5 text-xs font-semibold text-studio-text-dim transition hover:bg-studio-elev-2 hover:text-studio-text"
          >
            取消
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded-md bg-studio-accent px-3 py-1.5 text-xs font-semibold text-studio-on-accent transition hover:bg-studio-accent/90"
          >
            选择文件
          </button>
        </div>
      </div>
    </div>
  );
}
