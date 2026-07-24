'use client';

import { useEffect, useCallback } from 'react';

export function useKeyboardShortcuts(handlers: {
  onSave?: () => void;
  onSearch?: () => void;
  onNewPrompt?: () => void;
  onEscape?: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const mod = isMac ? e.metaKey : e.ctrlKey;

      // ⌘S / Ctrl+S → Save
      if (mod && e.key === 's') {
        e.preventDefault();
        handlers.onSave?.();
      }

      // ⌘K / Ctrl+K → Focus search
      if (mod && e.key === 'k') {
        e.preventDefault();
        handlers.onSearch?.();
      }

      // ⌘N / Ctrl+N → New prompt
      if (mod && e.key === 'n') {
        e.preventDefault();
        handlers.onNewPrompt?.();
      }

      // Escape → Close panels / dialogs
      if (e.key === 'Escape') {
        handlers.onEscape?.();
      }
    },
    [handlers],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
