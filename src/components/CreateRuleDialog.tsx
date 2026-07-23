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

export interface CreateRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: { key: string; title: string; content: string; description: string; tags: string }) => void;
}

export default function CreateRuleDialog({
  open,
  onOpenChange,
  onConfirm,
}: CreateRuleDialogProps) {
  if (!open) return null;

  const handleConfirm = () => {
    const key = (document.getElementById('rule-key') as HTMLInputElement)?.value.trim();
    const title = (document.getElementById('rule-title') as HTMLInputElement)?.value.trim();
    const content = (document.getElementById('rule-content') as HTMLTextAreaElement)?.value;
    const description = (document.getElementById('rule-desc') as HTMLInputElement)?.value.trim();
    const tags = (document.getElementById('rule-tags') as HTMLInputElement)?.value.trim();

    if (!key || !content) return;
    onConfirm({ key, title, content, description, tags });
    onOpenChange(false);
  };

  const inputClass = "w-full rounded-md border border-studio-border bg-studio-field px-3 py-1.5 text-sm text-studio-text outline-none transition placeholder:text-studio-text-faint focus:border-studio-accent";
  const textareaClass = "w-full rounded-md border border-studio-border bg-studio-field px-3 py-2 text-sm text-studio-text outline-none transition placeholder:text-studio-text-faint focus:border-studio-accent resize-y";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm">
      <div className="flex h-full max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-studio-border bg-studio-elev-1 shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-studio-border px-6 py-4">
          <h2 className="text-sm font-semibold text-studio-text">新建全局规则</h2>
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
          <FormField label="key" htmlFor="rule-key" required description="规则通过 key 引用">
            <input id="rule-key" className={inputClass} placeholder="PLATFORM_RULES" />
          </FormField>

          {/* 显示名 */}
          <FormField label="显示名" htmlFor="rule-title" description="可选">
            <input id="rule-title" className={inputClass} placeholder="可选" />
          </FormField>

          {/* 描述 */}
          <FormField label="描述" htmlFor="rule-desc" description="一句话说明这个规则的用途">
            <input id="rule-desc" className={inputClass} placeholder="可选，描述规则用途" />
          </FormField>

          {/* 内容 */}
          <FormField label="内容" htmlFor="rule-content" required description="写入会附加到 prompt 的规则文本">
            <textarea id="rule-content" className={textareaClass} placeholder="写入会附加到 prompt 的规则文本" rows={6} />
          </FormField>

          {/* 标签 */}
          <FormField label="标签" htmlFor="rule-tags" description="以逗号分隔">
            <input id="rule-tags" className={inputClass} placeholder="标签，多个用逗号分隔" />
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
            创建规则
          </button>
        </div>
      </div>
    </div>
  );
}
