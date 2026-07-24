'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Prompt, Snippet, Rule } from '@/types';
import GenerationResults from './GenerationResults';
import ConfirmDialog from './ConfirmDialog';
import ImportResultsDialog from './ImportResultsDialog';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useToast } from '@/components/ToastProvider';

interface PromptEditorProps {
  prompt: Prompt;
  projectName: string;
  boardName: string;
  snippets: Snippet[];
  rules: Rule[];
  boardPromptIds: string[];
  onSave: (prompt: Prompt) => void;
  onDelete: () => void;
  onNavigate: (direction: -1 | 1) => void;
  onImportResult?: (files: File[]) => void;
  onBack?: () => void;
  onLibraryToggle?: () => void;
  onSnipCreate?: () => void;
  onRuleCreate?: () => void;
  expandPrompt?: (prompt: Prompt, snippets: Snippet[], rules: Rule[]) => string;
}

export default function PromptEditor({
  prompt,
  projectName,
  boardName,
  snippets,
  rules,
  boardPromptIds,
  onSave,
  onDelete,
  onNavigate,
  onImportResult,
  onBack,
  onLibraryToggle,
  onSnipCreate,
  onRuleCreate,
  expandPrompt,
}: PromptEditorProps) {
  const [title, setTitle] = useState(prompt.title);
  const [taskLabels, setTaskLabels] = useState(prompt.taskLabels);
  const [generationParams, setGenerationParams] = useState(prompt.generationParams);
  const [positive, setPositive] = useState(prompt.positive);
  const [negative, setNegative] = useState(prompt.negative);
  const [content, setContent] = useState(prompt.content);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const currentIndex = boardPromptIds.indexOf(prompt.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < boardPromptIds.length - 1;
  const isDirty =
    title !== prompt.title ||
    taskLabels !== prompt.taskLabels ||
    generationParams !== prompt.generationParams ||
    content !== prompt.content ||
    positive !== prompt.positive ||
    negative !== prompt.negative;

  const assembledPrompt = expandPrompt
    ? expandPrompt({ ...prompt, content, positive, negative, generationParams, title, taskLabels, results: prompt.results, createdAt: prompt.createdAt, updatedAt: prompt.updatedAt }, snippets, rules)
    : '';

  const handleCopy = async () => {
    if (!assembledPrompt) {
      showToast('没有可复制的内容', 'warning');
      return;
    }
    try {
      await navigator.clipboard.writeText(assembledPrompt);
      setCopied(true);
      showToast('完整 Prompt 已复制到剪贴板', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = assembledPrompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      showToast('完整 Prompt 已复制到剪贴板', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = async () => {
    if (saving) {
      showToast('正在保存中，请稍候', 'info');
      return;
    }
    if (!isDirty) {
      showToast('内容没有变化，无需保存', 'info');
      return;
    }
    if (!title.trim()) {
      showToast('请先填写 Prompt 标题', 'warning');
      return;
    }
    setSaving(true);
    try {
      await onSave({
        ...prompt,
        title,
        taskLabels,
        generationParams,
        content,
        positive,
        negative,
      });
      showToast(`Prompt "${title}" 已保存`, 'success');
    } catch {
      showToast('保存失败，请重试', 'error');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = () => {
    setConfirmOpen(false);
    onDelete();
    showToast('Prompt 已删除', 'success');
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSave: handleSave,
    onEscape: () => {
      if (libraryOpen) setLibraryOpen(false);
      if (importOpen) setImportOpen(false);
      if (confirmOpen) setConfirmOpen(false);
    },
  });

  return (
    <main className="min-h-0 bg-studio-bg text-studio-text flex flex-col">
      {/* Toolbar */}
      <div className="sticky top-0 z-20 -mx-8 mb-6 flex flex-wrap items-center gap-3 border-b border-studio-border bg-studio-bg/95 px-8 py-3 backdrop-blur">
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 text-sm font-semibold text-studio-accent transition hover:opacity-80"
        >
          ← {projectName}
        </button>

        {boardPromptIds.length > 1 && (
          <div className="flex shrink-0 items-center gap-1 text-xs text-studio-text-faint">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              disabled={!hasPrev}
              aria-label="上一条 Prompt"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-studio-border transition hover:border-studio-accent hover:text-studio-text disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <span className="font-mono tabular-nums">
              {currentIndex + 1} / {boardPromptIds.length}
            </span>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              disabled={!hasNext}
              aria-label="下一条 Prompt"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-studio-border transition hover:border-studio-accent hover:text-studio-text disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        )}

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => { setLibraryOpen(!libraryOpen); onLibraryToggle?.(); }}
            className="rounded-md border border-studio-border px-3 py-1.5 text-xs font-semibold text-studio-text-dim transition hover:border-studio-accent hover:text-studio-accent"
          >
            库 <span className="ml-1 font-mono text-studio-text-faint">⌘K</span>
          </button>
          {assembledPrompt && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-md border border-studio-border px-3 py-1.5 text-xs font-semibold text-studio-text-dim transition hover:border-studio-ok hover:text-studio-ok"
              title="复制完整 Prompt"
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                  已复制
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  复制
                </>
              )}
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !isDirty}
            className="inline-flex h-9 shrink-0 items-center rounded-md bg-studio-accent px-4 text-sm font-semibold text-studio-on-accent transition hover:bg-studio-accent/90 disabled:cursor-not-allowed disabled:bg-studio-elev-3 disabled:text-studio-text-faint"
          >
            {saving ? '保存中...' : '保存'}
            <span className="ml-1.5 font-mono text-xs opacity-70">⌘S</span>
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            disabled={saving}
            className="inline-flex h-9 shrink-0 items-center rounded-md border border-studio-border px-3 text-sm font-semibold text-studio-text-dim transition hover:border-studio-neg/50 hover:text-studio-neg disabled:cursor-not-allowed disabled:opacity-60"
          >
            删除
          </button>
        </div>
      </div>

      {/* Title input */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Prompt 标题"
        aria-label="Prompt 标题"
        className="w-full rounded-md border border-transparent bg-transparent font-sans text-2xl font-medium text-studio-text outline-none transition placeholder:text-studio-text-faint hover:border-studio-border focus:border-studio-accent focus:bg-studio-field"
      />

      {/* Metadata */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-xs font-medium text-studio-text-faint">任务标签</span>
          <input
            value={taskLabels}
            onChange={(e) => setTaskLabels(e.target.value)}
            placeholder="任务一, 正面立绘"
            className="w-full rounded-md border border-studio-border bg-studio-field px-3 py-1.5 text-sm text-studio-text outline-none transition focus:border-studio-accent"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-medium text-studio-text-faint">
            生成参数
            <span className="ml-2 font-normal">随「复制」输出；通用参数建议做成规则</span>
          </span>
          <input
            value={generationParams}
            onChange={(e) => setGenerationParams(e.target.value)}
            placeholder="aspect ratio 2:3, seed fixed, high detail"
            className="w-full rounded-md border border-studio-border bg-studio-field px-3 py-1.5 font-mono text-sm text-studio-text outline-none transition placeholder:text-studio-text-faint focus:border-studio-accent"
          />
        </label>
      </div>

      {/* Assembled preview (collapsed by default) */}
      {assembledPrompt && (
        <details className="mt-4 rounded-md border border-studio-border bg-studio-elev-1">
          <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-studio-text-faint hover:text-studio-text">
            展开预览（引用已展开）
          </summary>
          <pre className="whitespace-pre-wrap break-words px-3 pb-3 text-xs font-mono text-studio-text-dim">
            {assembledPrompt}
          </pre>
        </details>
      )}

      {/* Editor + Results */}
      <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        {/* Editor */}
        <div className="space-y-6 lg:max-w-[52rem]">
          <div className="flex items-center justify-between gap-3 border-b border-studio-border pb-3">
            <h2 className="text-sm font-semibold text-studio-text">Prompt</h2>
            <button
              type="button"
              onClick={() => { setLibraryOpen(!libraryOpen); onLibraryToggle?.(); }}
              className="rounded-md border border-studio-border px-3 py-1.5 text-xs font-semibold text-studio-text-dim transition hover:border-studio-accent hover:text-studio-accent"
            >
              库 <span className="ml-1 font-mono text-studio-text-faint">⌘K</span>
            </button>
          </div>

          {/* Positive prompt */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-studio-text-faint">正向提示词</label>
            <textarea
              value={positive}
              onChange={(e) => setPositive(e.target.value)}
              placeholder="描述你想要生成的内容..."
              rows={3}
              className="w-full rounded-md border border-studio-border bg-studio-field px-3 py-2 text-sm text-studio-text outline-none transition placeholder:text-studio-text-faint focus:border-studio-accent resize-y"
            />
          </div>

          {/* Negative prompt */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-studio-text-faint">负向提示词</label>
            <textarea
              value={negative}
              onChange={(e) => setNegative(e.target.value)}
              placeholder="描述你不想要的内容..."
              rows={2}
              className="w-full rounded-md border border-studio-border bg-studio-field px-3 py-2 text-sm text-studio-text outline-none transition placeholder:text-studio-text-faint focus:border-studio-accent resize-y"
            />
          </div>

          {/* Main content editor */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-studio-text-faint">Prompt 内容（支持 {'{{snippet:id}}'} / {'{{rule:id}}'} 引用）</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="编写你的完整 prompt... 支持 {{snippet:id}} 和 {{rule:id}} 引用片段和规则"
              rows={10}
              className="w-full rounded-md border border-studio-border bg-studio-field px-3 py-2 font-mono text-sm text-studio-text outline-none transition placeholder:text-studio-text-faint focus:border-studio-accent resize-y"
            />
          </div>

          {/* Snippet library panel */}
          {libraryOpen && (
            <SnippetLibrary
              snippets={snippets}
              rules={rules}
              onInsert={(text) => {
                setContent((prev) => prev + text);
              }}
              onClose={() => setLibraryOpen(false)}
              onSnipCreate={onSnipCreate}
              onRuleCreate={onRuleCreate}
            />
          )}
        </div>

        {/* Results panel */}
        <div className="space-y-4 lg:sticky lg:top-20">
          <div className="flex items-center gap-2 border-b border-studio-border pb-3">
            <h2 className="text-sm font-semibold text-studio-text">生成结果</h2>
            <span className="rounded bg-studio-elev-3 px-2 py-0.5 text-xs text-studio-text-dim">
              {prompt.results.length}
            </span>
          </div>
          <GenerationResults
            prompt={prompt}
            onImport={onImportResult ? (files) => { onImportResult(files); } : undefined}
            onDelete={(id) => {
              // Handled by parent via onSave after mutation
            }}
          />
        </div>
      </section>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="确认删除"
        body="删除后无法撤销。确定要删除这个 Prompt 吗？"
        confirmLabel="删除"
        cancelLabel="取消"
        onConfirm={confirmDelete}
      />

      {/* Import results dialog */}
      {onImportResult && (
        <ImportResultsDialog
          open={importOpen}
          onOpenChange={setImportOpen}
          onImport={onImportResult}
        />
      )}
    </main>
  );
}

function SnippetLibrary({
  snippets,
  rules,
  onInsert,
  onClose,
  onSnipCreate,
  onRuleCreate,
}: {
  snippets: Snippet[];
  rules: Rule[];
  onInsert: (text: string) => void;
  onClose: () => void;
  onSnipCreate?: () => void;
  onRuleCreate?: () => void;
}) {
  return (
    <div className="rounded-md border border-studio-border bg-studio-elev-1 p-3">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-studio-text-faint uppercase tracking-wider">
          片段 & 规则库
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-studio-text-faint hover:text-studio-text"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>
      </div>

      {/* Project snippet / rule creation */}
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={onSnipCreate}
          className="flex-1 rounded border border-dashed border-studio-border px-2 py-1 text-left text-[10px] text-studio-text-faint transition hover:border-studio-accent hover:text-studio-accent"
        >
          + 创建项目片段
        </button>
        <button
          type="button"
          onClick={onRuleCreate}
          className="flex-1 rounded border border-dashed border-studio-border px-2 py-1 text-left text-[10px] text-studio-text-faint transition hover:border-studio-accent hover:text-studio-accent"
        >
          + 创建项目规则
        </button>
      </div>

      {snippets.length > 0 && (
        <div className="mb-3 space-y-1">
          <p className="text-[10px] font-medium text-studio-text-dim uppercase">片段</p>
          {snippets.map((snippet) => (
            <button
              key={snippet.id}
              type="button"
              onClick={() => onInsert(`{{snippet:${snippet.id}}}`)}
              className="block w-full rounded px-2 py-1.5 text-left text-xs text-studio-text-dim transition hover:bg-studio-elev-2 hover:text-studio-text"
            >
              {snippet.title}
            </button>
          ))}
        </div>
      )}

      {rules.length > 0 && (
        <div className="space-y-1">
          <p className="text-[10px] font-medium text-studio-text-dim uppercase">规则</p>
          {rules.map((rule) => (
            <button
              key={rule.id}
              type="button"
              onClick={() => onInsert(`{{rule:${rule.id}}}`)}
              className="block w-full rounded px-2 py-1.5 text-left text-xs text-studio-text-dim transition hover:bg-studio-elev-2 hover:text-studio-text"
            >
              {rule.title}
            </button>
          ))}
        </div>
      )}

      {snippets.length === 0 && rules.length === 0 && (
        <p className="text-xs text-studio-text-faint text-center py-2">暂无片段和规则</p>
      )}
    </div>
  );
}
