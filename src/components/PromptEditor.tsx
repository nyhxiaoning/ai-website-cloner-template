'use client';

import { useState } from 'react';
import type { Prompt, Snippet, Rule, GenerationResult } from '@/types';
import GenerationResults from './GenerationResults';
import ConfirmDialog from './ConfirmDialog';

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
  onImportResult?: () => void;
  onBack?: () => void;
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
}: PromptEditorProps) {
  const [title, setTitle] = useState(prompt.title);
  const [taskLabels, setTaskLabels] = useState(prompt.taskLabels);
  const [generationParams, setGenerationParams] = useState(prompt.generationParams);
  const [positive, setPositive] = useState(prompt.positive);
  const [negative, setNegative] = useState(prompt.negative);
  const [content, setContent] = useState(prompt.content);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const handleSave = async () => {
    setSaving(true);
    await onSave({
      ...prompt,
      title,
      taskLabels,
      generationParams,
      content,
      positive,
      negative,
    });
    setSaving(false);
  };

  const handleDelete = () => {
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setConfirmOpen(false);
    onDelete();
  };

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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        )}

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onImportResult}
            className="rounded-md border border-studio-border px-3 py-1.5 text-xs font-semibold text-studio-text-dim transition hover:border-studio-accent hover:text-studio-accent"
          >
            库 <span className="ml-1 font-mono text-studio-text-faint">⌘K</span>
          </button>
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
            onClick={handleDelete}
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
            <span className="ml-2 font-normal">随「复制给 Agent」输出到 PARAMETERS 段；通用参数建议做成规则</span>
          </span>
          <input
            value={generationParams}
            onChange={(e) => setGenerationParams(e.target.value)}
            placeholder="aspect ratio 2:3, seed fixed, high detail"
            className="w-full rounded-md border border-studio-border bg-studio-field px-3 py-1.5 font-mono text-sm text-studio-text outline-none transition placeholder:text-studio-text-faint focus:border-studio-accent"
          />
        </label>
      </div>

      {/* Editor + Results */}
      <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        {/* Editor */}
        <div className="space-y-6 lg:max-w-[52rem]">
          <div className="flex items-center justify-between gap-3 border-b border-studio-border pb-3">
            <h2 className="text-sm font-semibold text-studio-text">Prompt</h2>
            <button
              type="button"
              onClick={() => setLibraryOpen(!libraryOpen)}
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
            <label className="text-xs font-medium text-studio-text-faint">Prompt 内容</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="编写你的完整 prompt..."
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
                setLibraryOpen(false);
              }}
              onClose={() => setLibraryOpen(false)}
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
            onImport={onImportResult}
            onDelete={() => {}}
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
    </main>
  );
}

function SnippetLibrary({
  snippets,
  rules,
  onInsert,
  onClose,
}: {
  snippets: Snippet[];
  rules: Rule[];
  onInsert: (text: string) => void;
  onClose: () => void;
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
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
