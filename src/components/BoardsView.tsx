'use client';

import type { Board, Prompt } from '@/types';
import { useState } from 'react';

interface BoardsViewProps {
  boards: Board[];
  prompts: Prompt[];
  onSelectPrompt?: (promptId: string) => void;
  onCreateBoard?: (name: string) => void;
  onRenameBoard?: (boardId: string, name: string) => void;
  onDeleteBoard?: (boardId: string) => void;
  onRemovePromptFromBoard?: (boardId: string, promptId: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  onCreatePrompt?: () => void;
}

export default function BoardsView({
  boards,
  prompts,
  onSelectPrompt,
  onCreateBoard,
  onRenameBoard,
  onDeleteBoard,
  onRemovePromptFromBoard,
  searchQuery = '',
  onSearchChange,
  onCreatePrompt,
}: BoardsViewProps) {
  const [newBoardName, setNewBoardName] = useState('');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renamingValue, setRenamingValue] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCreateBoard = () => {
    const name = newBoardName.trim();
    if (name && onCreateBoard) {
      onCreateBoard(name);
      setNewBoardName('');
    }
  };

  const handleStartRename = (id: string, name: string) => {
    setRenamingId(id);
    setRenamingValue(name);
  };

  const handleConfirmRename = (boardId: string) => {
    if (renamingValue.trim() && onRenameBoard) {
      onRenameBoard(boardId, renamingValue.trim());
    }
    setRenamingId(null);
    setRenamingValue('');
  };

  const handleDeleteBoard = (boardId: string) => {
    if (onDeleteBoard) {
      onDeleteBoard(boardId);
    }
    setDeletingId(null);
  };

  return (
    <main className="min-h-0 bg-studio-bg px-8 py-10 text-studio-text">
      <div className="px-8 py-10 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-medium text-studio-text">看板</h1>
          <p className="mt-2 text-sm text-studio-text-dim">
            {boards.length} 个看板 · {prompts.length} 个 Prompt
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onSearchChange && (
            <input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="搜索 Prompt..."
              className="rounded-md border border-studio-border bg-studio-field px-3 py-1.5 text-xs text-studio-text outline-none transition focus:border-studio-accent w-44"
            />
          )}
          <input
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateBoard();
            }}
            placeholder="新看板名称"
            className="rounded-md border border-studio-border bg-studio-field px-3 py-1.5 text-xs text-studio-text outline-none transition focus:border-studio-accent"
          />
          <button
            type="button"
            onClick={handleCreateBoard}
            disabled={!newBoardName.trim()}
            className="rounded-md border border-studio-border px-3 py-1.5 text-xs font-semibold text-studio-text-dim transition hover:border-studio-accent hover:text-studio-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            + 看板
          </button>
          {onCreatePrompt && (
            <button
              type="button"
              onClick={onCreatePrompt}
              className="rounded-md bg-studio-accent px-3 py-1.5 text-xs font-semibold text-studio-on-accent transition hover:bg-studio-accent/90"
            >
              + Prompt
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6 px-8 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        {boards.map((board) => {
          const boardPrompts = board.promptIds
            .map((id) => prompts.find((p) => p.id === id))
            .filter(Boolean) as Prompt[];

          return (
            <div
              key={board.id}
              className="rounded-lg border border-studio-border bg-studio-elev-1 overflow-hidden"
            >
              <div className="border-b border-studio-border px-4 py-3 flex items-center justify-between">
                {renamingId === board.id ? (
                  <input
                    autoFocus
                    value={renamingValue}
                    onChange={(e) => setRenamingValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleConfirmRename(board.id);
                      if (e.key === 'Escape') setRenamingId(null);
                    }}
                    onBlur={() => handleConfirmRename(board.id)}
                    className="flex-1 text-sm font-semibold text-studio-text bg-studio-field border border-studio-accent rounded px-1 outline-none"
                  />
                ) : (
                  <h2
                    className="text-sm font-semibold text-studio-text cursor-pointer hover:text-studio-accent"
                    onClick={() => handleStartRename(board.id, board.name)}
                    title="点击重命名"
                  >
                    {board.name}
                  </h2>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-studio-text-faint">{boardPrompts.length} 个 Prompt</span>
                  <button
                    type="button"
                    onClick={() => setDeletingId(board.id)}
                    className="text-studio-text-faint hover:text-studio-neg"
                    title="删除看板"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
              <div className="p-3 space-y-2">
                {boardPrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className="group rounded-md border border-studio-border bg-studio-field p-3"
                  >
                    <button
                      type="button"
                      onClick={() => onSelectPrompt?.(prompt.id)}
                      className="block w-full text-left"
                    >
                      <p className="text-sm font-medium text-studio-text truncate">{prompt.title}</p>
                      <p className="mt-1 text-xs text-studio-text-faint line-clamp-2">
                        {prompt.content || '空 Prompt'}
                      </p>
                    </button>
                    {onRemovePromptFromBoard && (
                      <button
                        type="button"
                        onClick={() => onRemovePromptFromBoard(board.id, prompt.id)}
                        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 text-studio-text-faint hover:text-studio-neg transition"
                        title="从看板移除"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                      </button>
                    )}
                  </div>
                ))}
                {boardPrompts.length === 0 && (
                  <p className="text-xs text-studio-text-faint text-center py-4">暂无 Prompt</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete board confirmation */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-lg border border-studio-border bg-studio-elev-1 p-6 shadow-2xl">
            <h3 className="text-sm font-semibold text-studio-text">确认删除看板</h3>
            <p className="mt-2 text-sm text-studio-text-dim">删除后 Prompt 不会被删除，仅从看板中移除。确定要删除吗？</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="rounded-md border border-studio-border px-3 py-1.5 text-xs font-semibold text-studio-text-dim transition hover:bg-studio-elev-2 hover:text-studio-text"
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => handleDeleteBoard(deletingId)}
                className="rounded-md bg-studio-neg px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-studio-neg/90"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
