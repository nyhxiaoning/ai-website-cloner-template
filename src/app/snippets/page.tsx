'use client';

import { useState } from 'react';
import type { Snippet, Rule } from '@/types';
import StudioShell from '@/components/StudioShell';
import SnippetsView from '@/components/SnippetsView';
import { mockSnippets, mockRules, mockProjects } from '@/data/mock-data';

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>(mockSnippets);
  const [rules] = useState<Rule[]>(mockRules);
  const [createOpen, setCreateOpen] = useState(false);
  const projects = mockProjects;

  const handleCreate = (data: {
    key: string;
    title: string;
    content: string;
    type: string;
    suggestedPosition: string;
    tags: string;
  }) => {
    const newSnippet: Snippet = {
      id: data.key,
      title: data.title || data.key,
      content: data.content,
      createdAt: new Date().toISOString(),
    };
    setSnippets((prev) => [...prev, newSnippet]);
  };

  return (
    <StudioShell projects={projects} activeProjectId={projects[0]?.id}>
      <SnippetsView
        snippets={snippets}
        rules={rules}
        onCreateOpen={createOpen}
        onCreateChange={setCreateOpen}
        onCreateSnippet={handleCreate}
      />
    </StudioShell>
  );
}
