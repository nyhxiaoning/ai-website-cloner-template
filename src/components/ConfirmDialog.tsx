'use client';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  body: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  body,
  confirmLabel = '确认',
  cancelLabel = '取消',
  onConfirm,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-lg border border-studio-border bg-studio-elev-1 p-6 shadow-2xl">
        <h3 className="text-sm font-semibold text-studio-text">{title}</h3>
        <p className="mt-2 text-sm text-studio-text-dim">{body}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-md border border-studio-border px-3 py-1.5 text-xs font-semibold text-studio-text-dim transition hover:bg-studio-elev-2 hover:text-studio-text"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="rounded-md bg-studio-accent px-3 py-1.5 text-xs font-semibold text-studio-on-accent transition hover:bg-studio-accent/90"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
