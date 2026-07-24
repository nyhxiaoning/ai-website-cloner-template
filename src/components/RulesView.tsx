'use client';

import type { Snippet, Rule } from '@/types';
import { useState } from 'react';
import CreateRuleDialog from './CreateRuleDialog';

interface RulesViewProps {
  snippets: Snippet[];
  rules: Rule[];
  onCreateRule?: (data: { key: string; title: string; content: string; description: string; tags: string }) => void;
  onUpdateRule?: (rule: Rule) => void;
  onDeleteRule?: (id: string) => void;
}

export default function RulesView({
  snippets,
  rules,
  onCreateRule,
  onUpdateRule,
  onDeleteRule,
}: RulesViewProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleStartEdit = (r: Rule) => {
    setEditingId(r.id);
    setEditTitle(r.title);
    setEditContent(r.content);
  };

  const handleSaveEdit = (id: string) => {
    if (onUpdateRule && editTitle.trim() && editContent.trim()) {
      onUpdateRule({ id, title: editTitle.trim(), content: editContent.trim(), createdAt: new Date().toISOString() });
    }
    setEditingId(null);
  };

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
          onClick={() => setCreateOpen(true)}
          className="shrink-0 rounded-md border border-studio-border px-3 py-1.5 text-xs font-semibold text-studio-text-dim transition hover:border-studio-accent hover:text-studio-accent"
        >
          + 新建全局规则
        </button>
      </div>

      <div className="grid gap-4 px-8 pb-10 lg:grid-cols-2 xl:grid-cols-3">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="rounded-lg border border-studio-border bg-studio-elev-1 p-4 transition hover:border-studio-border-strong relative"
          >
            {editingId === rule.id ? (
              <div className="space-y-2">
                <input
                  autoFocus
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(rule.id); if (e.key === 'Escape') setEditingId(null); }}
                  className="w-full rounded-md border border-studio-accent bg-studio-field px-2 py-1 text-sm text-studio-text outline-none"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-studio-border bg-studio-field px-2 py-1 text-xs font-mono text-studio-text outline-none focus:border-studio-accent"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleSaveEdit(rule.id)}
                    className="text-xs text-studio-accent font-semibold"
                  >
                    保存
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="text-xs text-studio-text-faint"
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <h3 className="text-sm font-semibold text-studio-text truncate">{rule.title}</h3>
                    <code className="text-[10px] font-mono text-studio-text-faint shrink-0">
                      {rule.id}
                    </code>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(rule)}
                      className="text-studio-text-faint hover:text-studio-text"
                      title="编辑"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteRule?.(rule.id)}
                      className="text-studio-text-faint hover:text-studio-neg"
                      title="删除"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
                <pre className="mt-2 whitespace-pre-wrap break-words rounded-md bg-studio-field p-3 text-xs font-mono text-studio-text-dim">
                  {rule.content}
                </pre>
                <p className="mt-2 text-[10px] text-studio-text-faint">
                  {new Date(rule.createdAt).toLocaleDateString('zh-CN')}
                </p>
              </>
            )}
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
        open={createOpen}
        onOpenChange={setCreateOpen}
        onConfirm={(data) => {
          onCreateRule?.(data);
          setCreateOpen(false);
        }}
      />
    </main>
  );
}
