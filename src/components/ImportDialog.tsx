'use client';

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ImportDialog({ open, onOpenChange }: ImportDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-lg border border-studio-border bg-studio-elev-1 p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-studio-text">从 Agent 导入结果</h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-6 w-6 items-center justify-center rounded text-studio-text-faint transition hover:bg-studio-elev-2 hover:text-studio-text"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-4 rounded-md border border-dashed border-studio-border p-8 text-center">
          <p className="text-sm text-studio-text-dim">拖放 Agent 输出包到此处</p>
          <p className="mt-1 text-xs text-studio-text-faint">或点击选择文件夹</p>
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
            onClick={() => onOpenChange(false)}
            className="rounded-md bg-studio-accent px-3 py-1.5 text-xs font-semibold text-studio-on-accent transition hover:bg-studio-accent/90"
          >
            选择文件夹
          </button>
        </div>
      </div>
    </div>
  );
}
