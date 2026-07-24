'use client';

import { useState } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
  description?: string;
}

function FormField({ label, htmlFor, required, children, description }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor} className="block text-xs font-medium text-studio-text-faint">
        {label}
        {required && <span className="ml-1 text-studio-neg">*</span>}
      </label>
      {description && <p className="text-[10px] text-studio-text-faint">{description}</p>}
      {children}
    </div>
  );
}

export interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: { name: string; description: string; tags: string }) => void;
}

export default function CreateProjectDialog({
  open,
  onOpenChange,
  onConfirm,
}: CreateProjectDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const reset = () => {
    setName('');
    setDescription('');
    setTags('');
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  const handleConfirm = () => {
    if (!name.trim()) return;
    onConfirm({ name: name.trim(), description: description.trim(), tags: tags.trim() });
    reset();
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleConfirm();
    }
  };

  if (!open) return null;

  const inputClass = "w-full rounded-md border border-studio-border bg-studio-field px-3 py-1.5 text-sm text-studio-text outline-none transition placeholder:text-studio-text-faint focus:border-studio-accent";
  const textareaClass = "w-full rounded-md border border-studio-border bg-studio-field px-3 py-2 text-sm text-studio-text outline-none transition placeholder:text-studio-text-faint focus:border-studio-accent resize-y";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm">
      <div className="flex h-full max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-studio-border bg-studio-elev-1 shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-studio-border px-6 py-4">
          <h2 className="text-sm font-semibold text-studio-text">新建项目</h2>
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            className="inline-flex h-6 w-6 items-center justify-center rounded text-studio-text-faint transition hover:bg-studio-elev-2 hover:text-studio-text"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <FormField label="项目名称" htmlFor="proj-name" required>
            <input
              id="proj-name"
              className={inputClass}
              placeholder="输入项目名称"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </FormField>

          <FormField label="描述" htmlFor="proj-desc">
            <textarea
              id="proj-desc"
              className={textareaClass}
              placeholder="可选，描述项目用途"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </FormField>

          <FormField label="标签" htmlFor="proj-tags">
            <input
              id="proj-tags"
              className={inputClass}
              placeholder="标签，多个用逗号分隔"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </FormField>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end gap-2 border-t border-studio-border px-6 py-4">
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            className="rounded-md border border-studio-border px-3 py-1.5 text-xs font-semibold text-studio-text-dim transition hover:bg-studio-elev-2 hover:text-studio-text"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!name.trim()}
            className="rounded-md bg-studio-accent px-4 py-1.5 text-xs font-semibold text-studio-on-accent transition hover:bg-studio-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            创建项目
          </button>
        </div>
      </div>
    </div>
  );
}
