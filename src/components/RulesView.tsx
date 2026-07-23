'use client';

import type { Snippet, Rule } from '@/types';
import CreateRuleDialog from './CreateRuleDialog';

interface RulesViewProps {
  snippets: Snippet[];
  rules: Rule[];
  onCreateOpen?: boolean;
  onCreateChange?: (open: boolean) => void;
  onCreateRule?: (data: { key: string; title: string; content: string; description: string; tags: string }) => void;
}

export default function RulesView({
  snippets,
  rules,
  onCreateOpen = false,
  onCreateChange = () => {},
  onCreateRule,
}: RulesViewProps) {
  return (
    <main className="min-h-0 bg-studio-bg px-8 py-10 text-studio-text">
      <div className="px-8 py-10 flex items-center justify-between">
        <div>
          <h1 className="font-sans text-2xl font-medium text-studio-text">规则库</h1>
          <p className="mt-2 text-sm text-studio-text-dim">
            可复用的规则。在 Prompt 中使用{" "}
            <code className="rounded bg-studio-elev-2 px-1 py-0.5 font-mono text-xs text-studio-text">
              {'{{rule:id}}'}
            </code>{" "}
            引用。
          </p>
        </div>
        <button
          type="button"
          onClick={() => onCreateChange(true)}
          className="shrink-0 rounded-md border border-studio-border px-3 py-1.5 text-xs font-semibold text-studio-text-dim transition hover:border-studio-accent hover:text-studio-accent"
        >
          + 新建全局规则
        </button>
      </div>

      <div className="grid gap-4 px-8 pb-10 lg:grid-cols-2 xl:grid-cols-3">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="rounded-lg border border-studio-border bg-studio-elev-1 p-4 transition hover:border-studio-border-strong"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-studio-text">{rule.title}</h3>
              <code className="text-[10px] font-mono text-studio-text-faint">
                {rule.id}
              </code>
            </div>
            <pre className="mt-2 whitespace-pre-wrap break-words rounded-md bg-studio-field p-3 text-xs font-mono text-studio-text-dim">
              {rule.content}
            </pre>
            <p className="mt-2 text-[10px] text-studio-text-faint">
              {new Date(rule.createdAt).toLocaleDateString('zh-CN')}
            </p>
          </div>
        ))}

        {rules.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed border-studio-border p-12 text-center">
            <p className="text-sm text-studio-text-faint">暂无规则</p>
            <p className="mt-1 text-xs text-studio-text-dim">
              规则在 Prompt 编辑器中使用
            </p>
          </div>
        )}
      </div>

      <CreateRuleDialog
        open={onCreateOpen}
        onOpenChange={onCreateChange}
        onConfirm={(data) => {
          onCreateRule?.(data);
          onCreateChange(false);
        }}
      />
    </main>
  );
}
