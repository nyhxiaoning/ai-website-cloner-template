import type { Prompt, Snippet, Rule } from '@/types';

export interface SearchResult {
  type: 'prompt' | 'snippet' | 'rule';
  id: string;
  title: string;
  snippet: string;
}

export function searchAll(
  query: string,
  prompts: Prompt[],
  snippets: Snippet[],
  rules: Rule[],
): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const p of prompts) {
    const titleMatch = p.title.toLowerCase().includes(q);
    const contentMatch = p.content.toLowerCase().includes(q);
    const positiveMatch = p.positive.toLowerCase().includes(q);
    const negativeMatch = p.negative.toLowerCase().includes(q);
    if (titleMatch || contentMatch || positiveMatch || negativeMatch) {
      const text = p.content || p.positive || p.title;
      results.push({
        type: 'prompt',
        id: p.id,
        title: p.title,
        snippet: highlightMatch(text.slice(0, 120), q),
      });
    }
  }

  for (const s of snippets) {
    if (s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)) {
      results.push({
        type: 'snippet',
        id: s.id,
        title: s.title,
        snippet: highlightMatch(s.content.slice(0, 120), q),
      });
    }
  }

  for (const r of rules) {
    if (r.title.toLowerCase().includes(q) || r.content.toLowerCase().includes(q)) {
      results.push({
        type: 'rule',
        id: r.id,
        title: r.title,
        snippet: highlightMatch(r.content.slice(0, 120), q),
      });
    }
  }

  return results;
}

export function findDuplicateFragments(prompts: Prompt[]): { content: string; promptIds: string[]; count: number }[] {
  const fragmentMap = new Map<string, string[]>();

  for (const p of prompts) {
    // Split content into lines and find non-empty lines
    const lines = p.content.split('\n').map((l) => l.trim()).filter(Boolean);
    for (const line of lines) {
      // Only consider lines that look like fragment references or substantial content
      if (line.length < 10) continue;
      const existing = fragmentMap.get(line) ?? [];
      if (!existing.includes(p.id)) {
        existing.push(p.id);
        fragmentMap.set(line, existing);
      }
    }
  }

  return [...fragmentMap.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([content, promptIds]) => ({ content, promptIds, count: promptIds.length }))
    .sort((a, b) => b.count - a.count);
}

function highlightMatch(text: string, query: string): string {
  const idx = text.toLowerCase().indexOf(query);
  if (idx === -1) return text;
  const start = Math.max(0, idx - 20);
  const end = Math.min(text.length, idx + query.length + 40);
  let result = '';
  if (start > 0) result += '...';
  result += text.slice(start, idx);
  result += `\x1b[7m${text.slice(idx, idx + query.length)}\x1b[0m`;
  result += text.slice(idx + query.length, end);
  if (end < text.length) result += '...';
  return result;
}
