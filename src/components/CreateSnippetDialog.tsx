'use client';

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

export interface CreateSnippetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: { key: string; title: string; content: string; type: string; suggestedPosition: string; tags: string }) => void;
}

export default function CreateSnippetDialog({
  open,
  onOpenChange,
  onConfirm,
}: CreateSnippetDialogProps) {
  if (!open) return null;

  const handleConfirm = () => {
    const key = (document.getElementById('snip-key') as HTMLInputElement)?.value.trim();
    const title = (document.getElementById('snip-title') as HTMLInputElement)?.value.trim();
    const content = (document.getElementById('snip-content') as HTMLTextAreaElement)?.value;
    const type = (document.getElementById('snip-type') as HTMLSelectElement)?.value || '自定义';
    const suggestedPosition = (document.getElementById('snip-position') as HTMLSelectElement)?.value || '中段';
    const tags = (document.getElementById('snip-tags') as HTMLInputElement)?.value.trim();

    if (!key || !content) return;
    onConfirm({ key, title, content, type, suggestedPosition, tags });
    onOpenChange(false);
  };

  const inputClass = "w-full rounded-md border border-studio-border bg-studio-field px-3 py-1.5 text-sm text-studio-text outline-none transition placeholder:text-studio-text-faint focus:border-studio-accent";
  const textareaClass = "w-full rounded-md border border-studio-border bg-studio-field px-3 py-2 text-sm text-studio-text outline-none transition placeholder:text-studio-text-faint focus:border-studio-accent resize-y";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm">
      <div className="flex h-full max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-studio-border bg-studio-elev-1 shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-studio-border px-6 py-4">
          <h2 className="text-sm font-semibold text-studio-text">新建全局片段</h2>
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Key */}
          <FormField label="key" htmlFor="snip-key" required description="在 prompt 里用 {key} 引用，建议全大写英文">
            <input id="snip-key" className={inputClass} placeholder="STYLE_ROOT" />
          </FormField>

          {/* 显示名 */}
          <FormField label="显示名" htmlFor="snip-title" description="可选，给 key 起个易读别名，只在列表显示">
            <input id="snip-title" className={inputClass} placeholder="可选" />
          </FormField>

          {/* 类型 */}
          <FormField label="类型" htmlFor="snip-type">
            <select id="snip-type" className={inputClass} defaultValue="自定义">
              <option value="自定义">自定义</option>
            </select>
          </FormField>

          {/* 建议位置 */}
          <FormField label="建议位置" htmlFor="snip-position">
            <select id="snip-position" className={inputClass} defaultValue="中段">
              <option value="开头">开头</option>
              <option value="中段">中段</option>
              <option value="末尾">末尾</option>
            </select>
          </FormField>

          {/* 内容 */}
          <FormField label="内容" htmlFor="snip-content" required description="写入可复用的 prompt 内容">
            <textarea id="snip-content" className={textareaClass} placeholder="写入可复用的 prompt 内容" rows={6} />
          </FormField>

          {/* 标签 */}
          <FormField label="标签" htmlFor="snip-tags" description="以逗号分隔">
            <input id="snip-tags" className={inputClass} placeholder="标签，多个用逗号分隔" />
          </FormField>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end gap-2 border-t border-studio-border px-6 py-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-md border border-studio-border px-3 py-1.5 text-xs font-semibold text-studio-text-dim transition hover:bg-studio-elev-2 hover:text-studio-text"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-md bg-studio-accent px-4 py-1.5 text-xs font-semibold text-studio-on-accent transition hover:bg-studio-accent/90"
          >
            创建片段
          </button>
        </div>
      </div>
    </div>
  );
}
