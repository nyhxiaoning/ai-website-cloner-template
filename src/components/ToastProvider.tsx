'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type'], duration?: number) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

function ToastIcon({ type }: { type: Toast['type'] }) {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="size-4 text-studio-ok" />;
    case 'error':
      return <AlertCircle className="size-4 text-studio-neg" />;
    case 'warning':
      return <AlertTriangle className="size-4 text-amber-400" />;
    default:
      return <Info className="size-4 text-studio-accent" />;
  }
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const borderColor = {
    success: 'border-studio-ok/40',
    error: 'border-studio-neg/40',
    warning: 'border-amber-500/40',
    info: 'border-studio-accent/40',
  }[toast.type];

  return (
    <div
      role="alert"
      className={`flex items-start gap-2 rounded-md border ${borderColor} bg-studio-elev-2 px-3 py-2.5 text-sm text-studio-text shadow-lg ring-1 ring-black/20 animate-in slide-in-from-top-2 fade-in duration-200`}
      style={{ minWidth: 280, maxWidth: 420 }}
    >
      <ToastIcon type={toast.type} />
      <p className="flex-1 leading-relaxed">{toast.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 rounded p-0.5 text-studio-text-faint transition hover:text-studio-text"
        aria-label="关闭"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: Toast['type'] = 'info', duration = 4000) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { id, message, type, duration }]);
      if (duration > 0) {
        setTimeout(() => dismissToast(id), duration);
      }
    },
    [dismissToast],
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2" aria-live="polite">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
